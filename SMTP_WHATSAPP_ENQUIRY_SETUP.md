# Metro Furniture — SMTP Email + WhatsApp Enquiry Delivery

## What is connected
The shared `/api/leads` endpoint now sends a detailed plain-text email through SMTP for every accepted enquiry. It includes the lead type, customer name, phone / WhatsApp, email if supplied, city, product/model, complete submitted form details, page URL, referrer, and campaign/ad attribution where available.

The email path is connected to:
- Product and Facebook/Instagram Ads enquiry popup
- General Contact form
- Custom design request
- Furniture customizer
- Room measurement assistant
- Showroom appointment booking

If Supabase service-role credentials are also configured, the same lead is stored in `metro_marketing_leads`.

## SMTP environment configuration
Set these in `.env.local` for local testing and in Vercel → Project → Settings → Environment Variables for production:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_STARTTLS=true
SMTP_USER=your-sending-mailbox@gmail.com
SMTP_PASS=your-mailbox-app-password
SMTP_FROM=your-sending-mailbox@gmail.com
SMTP_TO=metrodharmapuri@gmail.com
SMTP_EHLO_DOMAIN=metrofurnitures.vercel.app
```

Gmail generally requires an App Password for SMTP. Do not put your normal account password in source control. If using Hostinger Email, set `SMTP_HOST=smtp.hostinger.com`; port 465 uses `SMTP_SECURE=true`, while port 587 uses `SMTP_SECURE=false` and STARTTLS remains enabled. `SMTP_TO` accepts comma- or semicolon-separated recipients.

For multiple recipients, for example:
`SMTP_TO=metrodharmapuri@gmail.com,sales@example.com`

Never commit `.env.local` or real SMTP credentials.

## WhatsApp behaviour
On submit, enquiry forms open the showroom WhatsApp conversation with the submitted customer/product/configuration/measurement/appointment details prefilled. The website cannot send the WhatsApp message silently through a normal `wa.me` link: the customer still needs to press **Send** in WhatsApp. Automatic business-initiated WhatsApp messages require an approved WhatsApp Business Platform/Cloud API setup and its access token/template configuration; that is separate from the prefilled compose flow implemented here.

## API response
`POST /api/leads` returns `emailSent` and `emailConfigured` so integrations can distinguish accepted form details from successful SMTP delivery. When SMTP is not configured, the WhatsApp compose flow still works but automatic email notification is not sent.

## Validation
- SMTP settings are environment-only; no credentials are included.
- Missing SMTP settings return an unconfigured status instead of crashing.
- Email payload contains the full submitted lead details and campaign metadata.
- Full application build/ESLint and real mailbox delivery should be tested after SMTP credentials are configured.


## Latest validation run
- The custom SMTP transport was exercised against a local mock TLS SMTP server using fake credentials; it completed authentication, recipient handling, DATA delivery, and message body decode.
- The SMTP test did not send an email to a real mailbox.
- All 243 JavaScript/JSX/TypeScript files parsed without syntax diagnostics.
- Lead endpoint, accepted lead types, form consent, SMTP environment placeholders, and WhatsApp draft wiring passed static checks.
- Full Next.js production build/ESLint and real mailbox delivery have not been completed in this environment.
