import express from "express";
import { createServer } from "http";
import fs from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";

interface ContactSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  revenue?: string;
}

// TODO: Replace with actual GoHighLevel webhook URL
// Find this in GHL: Settings > Workflows or API > Webhooks
const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL || "";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function saveSubmission(submission: ContactSubmission) {
  const dataDir = path.resolve(__dirname, "..", "data");
  const filePath = path.join(dataDir, "contact-submissions.json");

  await fs.mkdir(dataDir, { recursive: true });

  let submissions: Array<ContactSubmission & { submittedAt: string }> = [];

  try {
    const existing = await fs.readFile(filePath, "utf-8");
    submissions = JSON.parse(existing) as Array<ContactSubmission & { submittedAt: string }>;
  } catch {
    submissions = [];
  }

  submissions.push({ ...submission, submittedAt: new Date().toISOString() });
  await fs.writeFile(filePath, JSON.stringify(submissions, null, 2), "utf-8");
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.json());
  app.use(express.static(staticPath));

  app.post("/api/contact", async (req, res) => {
    const submission = req.body as Partial<ContactSubmission>;

    if (!submission.firstName || !submission.lastName || !submission.email) {
      res.status(400).json({ success: false, error: "Missing required fields" });
      return;
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
      // Save locally
      await saveSubmission(data);

      // Forward to GoHighLevel if webhook is configured
      if (GHL_WEBHOOK_URL) {
        try {
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
        } catch (ghlError) {
          console.error("Failed to forward to GHL webhook:", ghlError);
        }
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Failed to save contact submission", error);
      res.status(500).json({ success: false, error: "Failed to save submission" });
    }
  });

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
