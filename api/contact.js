const GHL_BASE_URL = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2023-02-21";
const LOCATION_ID = process.env.GHL_LOCATION_ID || "VXRXDRWUszJpzDJyOXwf";
const PIPELINE_ID = process.env.GHL_PIPELINE_ID || "dX56gU0Fxrpnf2k6Htg5";
const PIPELINE_STAGE_ID = process.env.GHL_PIPELINE_STAGE_ID || "35d31a5b-bc7f-4793-84e6-f4059fb4e138";
const VPS_FALLBACK_URL = "https://srv1556835.hstgr.cloud/api/contact";

function getGhlToken() {
  return (
    process.env.Go_High_Level ||
    process.env.GHL_API_TOKEN ||
    process.env.GHL_PRIVATE_INTEGRATION_TOKEN ||
    process.env.HIGHLEVEL_API_TOKEN ||
    ""
  );
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  if (typeof req.body === "string") {
    return JSON.parse(req.body || "{}");
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function normalizeSubmission(body) {
  const firstName = String(body.firstName || body.first_name || "").trim();
  const lastName = String(body.lastName || body.last_name || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const phone = String(body.phone || "").trim();
  const company = String(body.company || body.companyName || "").trim();
  const revenue = String(body.revenue || body.monthlyRevenue || "").trim();

  return { firstName, lastName, email, phone, company, revenue };
}

function responseJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

async function ghlRequest(path, options = {}) {
  const token = getGhlToken();
  const url = new URL(path, GHL_BASE_URL);

  if (options.query) {
    for (const [key, value] of Object.entries(options.query)) {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const response = await fetch(url, {
    method: options.method || "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      Version: GHL_API_VERSION,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const text = await response.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    const error = new Error(`GHL request failed: ${response.status} ${response.statusText}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

function extractContactId(data) {
  const contact = data?.contact || data?.data || data;
  return contact?.id || contact?.contactId || null;
}

function extractOpportunity(data) {
  return data?.opportunity || data?.data || data || null;
}

async function findExistingContact(submission) {
  if (!submission.email) return null;

  try {
    const data = await ghlRequest("/contacts/search/duplicate", {
      query: { locationId: LOCATION_ID, email: submission.email },
    });
    const contact = data?.contact || data?.data || data;
    const id = extractContactId(data);
    return id ? { id, contact } : null;
  } catch (error) {
    if (error.status === 404) return null;
    throw error;
  }
}

async function createContact(submission) {
  const name = `${submission.firstName} ${submission.lastName}`.trim();
  const payload = {
    locationId: LOCATION_ID,
    firstName: submission.firstName,
    lastName: submission.lastName,
    name,
    email: submission.email,
    phone: submission.phone || undefined,
    companyName: submission.company || undefined,
    source: "overheadless.com contact form",
    tags: ["overheadless", "website-lead"],
  };

  Object.keys(payload).forEach((key) => payload[key] === undefined && delete payload[key]);

  try {
    const data = await ghlRequest("/contacts/", { method: "POST", body: payload });
    const id = extractContactId(data);
    if (!id) {
      throw new Error("GHL create contact response did not include a contact ID");
    }
    return { id, contact: data?.contact || data?.data || data, created: true };
  } catch (error) {
    const duplicateContactId = error.data?.meta?.contactId;
    if (error.status === 400 && duplicateContactId) {
      return { id: duplicateContactId, contact: { id: duplicateContactId }, created: false, duplicateMatched: true };
    }
    throw error;
  }
}

async function updateContact(contactId, submission) {
  const name = `${submission.firstName} ${submission.lastName}`.trim();
  const payload = {
    firstName: submission.firstName,
    lastName: submission.lastName,
    name,
    email: submission.email,
    phone: submission.phone || undefined,
    companyName: submission.company || undefined,
    source: "overheadless.com contact form",
  };

  Object.keys(payload).forEach((key) => payload[key] === undefined && delete payload[key]);

  try {
    await ghlRequest(`/contacts/${contactId}`, { method: "PUT", body: payload });
  } catch (error) {
    // Do not block opportunity creation if contact enrichment fails.
    console.warn("GHL contact update failed; continuing with opportunity creation", {
      status: error.status,
      message: error.message,
      data: error.data,
    });
  }
}

async function findExistingOpportunity(contactId) {
  const data = await ghlRequest("/opportunities/search", {
    query: {
      location_id: LOCATION_ID,
      pipeline_id: PIPELINE_ID,
      contact_id: contactId,
    },
  });

  const opportunities = Array.isArray(data?.opportunities) ? data.opportunities : [];
  return opportunities.find((opportunity) => opportunity.pipelineId === PIPELINE_ID) || opportunities[0] || null;
}

function buildOpportunityName(submission) {
  const person = `${submission.firstName} ${submission.lastName}`.trim();
  if (submission.company && person) return `${submission.company} - ${person}`;
  if (submission.company) return submission.company;
  if (person) return `${person} - Overheadless Website Lead`;
  return `${submission.email} - Overheadless Website Lead`;
}

async function createOpportunity(contactId, submission) {
  const sourceParts = ["overheadless.com contact form"];
  if (submission.revenue) sourceParts.push(`Revenue: ${submission.revenue}`);

  const payload = {
    locationId: LOCATION_ID,
    pipelineId: PIPELINE_ID,
    pipelineStageId: PIPELINE_STAGE_ID,
    status: "open",
    contactId,
    name: buildOpportunityName(submission),
    monetaryValue: 0,
    source: sourceParts.join(" | "),
  };

  const data = await ghlRequest("/opportunities/", { method: "POST", body: payload });
  const opportunity = extractOpportunity(data);
  if (!opportunity?.id && !opportunity?.opportunityId) {
    throw new Error("GHL create opportunity response did not include an opportunity ID");
  }
  return opportunity;
}

async function fallbackToVps(submission) {
  const response = await fetch(VPS_FALLBACK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission),
  });

  const text = await response.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }

  return { ok: response.ok, status: response.status, data };
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    return responseJson(res, 204, {});
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return responseJson(res, 405, { success: false, error: "Method not allowed" });
  }

  let submission;
  try {
    submission = normalizeSubmission(await readJsonBody(req));
  } catch {
    return responseJson(res, 400, { success: false, error: "Invalid JSON request body" });
  }

  if (!submission.firstName || !submission.lastName || !submission.email) {
    return responseJson(res, 400, { success: false, error: "Missing required fields" });
  }

  if (!getGhlToken()) {
    console.error("GHL API token is not configured in the Vercel environment; falling back to VPS contact-only endpoint.");
    try {
      const fallback = await fallbackToVps(submission);
      return responseJson(res, fallback.ok ? 200 : fallback.status, {
        success: fallback.ok,
        message: fallback.ok
          ? "Contact submitted through fallback; opportunity creation requires GHL token configuration."
          : "Fallback contact submission failed.",
        opportunityCreated: false,
        fallback: fallback.data,
      });
    } catch (error) {
      console.error("VPS fallback failed", { message: error.message });
      return responseJson(res, 500, { success: false, error: "GHL token is not configured and fallback failed" });
    }
  }

  try {
    const existingContact = await findExistingContact(submission);
    const contactRecord = existingContact || (await createContact(submission));

    if (existingContact || contactRecord.duplicateMatched) {
      await updateContact(contactRecord.id, submission);
    }

    const existingOpportunity = await findExistingOpportunity(contactRecord.id);
    const opportunity = existingOpportunity || (await createOpportunity(contactRecord.id, submission));

    return responseJson(res, 200, {
      success: true,
      message: existingOpportunity
        ? "Contact processed and existing opportunity found in pipeline"
        : "Contact created and added to pipeline",
      contactId: contactRecord.id,
      opportunityId: opportunity.id || opportunity.opportunityId,
      opportunityCreated: !existingOpportunity,
      pipelineId: PIPELINE_ID,
      pipelineStageId: PIPELINE_STAGE_ID,
    });
  } catch (error) {
    console.error("GHL contact/opportunity processing failed", {
      status: error.status,
      message: error.message,
      data: error.data,
    });

    return responseJson(res, 502, {
      success: false,
      error: "Failed to create contact and opportunity in Go High Level",
      details: error.data?.message || error.message,
    });
  }
}
