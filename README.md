# Overheadless Website

Public website for Overheadless — synthetic employees for contractors.

Stack: React 19, TypeScript, Vite, Tailwind CSS, Express

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Local dev server with hot reload
npm run build      # Production build
npm start          # Start production server (PORT env var, default 3000)
```

## Contact Form

Submissions POST to `/api/contact` and:
1. Store locally in `data/contact-submissions.json`
2. Forward to GoHighLevel if `GHL_WEBHOOK_URL` env var is set

## Phone

The primary contact number is **(470) 874-1775** — displayed site-wide.

## Domains

- **Primary:** [overheadless.com](https://overheadless.com)
- **Legacy redirect:** getoperatorai.com

## Environment Variables

| Variable | Purpose |
|---|---|
| `PORT` | Server port (default 3000) |
| `GHL_WEBHOOK_URL` | GoHighLevel webhook for contact submissions |

## Deployment

Build: `npm run build`
Start: `PORT=3000 npm start`
