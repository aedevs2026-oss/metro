# SMTP + WhatsApp Lead Routing — Implementation Notes

The main implementation and deployment requirements are documented in `SMTP_WHATSAPP_ENQUIRY_SETUP.md`.
The server route is `/api/leads`; it sends a detailed SMTP email and also stores the same lead in Supabase when configured.
Do not commit SMTP passwords. Configure the variables in `.env.local` for local testing and in Vercel Environment Variables for production.
Normal `wa.me` links prefill details but do not silently send: the customer needs to press Send inside WhatsApp.
