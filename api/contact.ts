import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "node:fs/promises";
import path from "path";

interface ContactSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  revenue?: string;
}

const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL || "";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const submission = req.body as Partial<ContactSubmission>;

  if (!submission.firstName || !submission.lastName || !submission.email) {
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }

  const data = {
    firstName: submission.firstName,
    lastName: submission.lastName,
    email: submission.email,
    phone: submission.phone || "",
    company: submission.company || "",
    revenue: submission.revenue || "",
  };

  try {
    // Forward to GoHighLevel if webhook is configured
    if (GHL_WEBHOOK_URL) {
      const ghlResponse = await fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            companyName: data.company,
          },
          customFields: {
            monthly_revenue: data.revenue,
            source: "overheadless.com",
          },
        }),
      });

      if (!ghlResponse.ok) {
        console.warn("GHL webhook returned non-200:", ghlResponse.status);
      }
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to process contact submission", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
}
