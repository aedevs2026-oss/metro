# Metro Furniture — Environment and No-OpenAI Chatbot Update

## Environment variables
- `NEXT_PUBLIC_SITE_URL`: public canonical website URL.
- `NEXT_PUBLIC_CHATBOT_ENABLED=true`: public flag controlling chatbot widget visibility.
- `CHATBOT_MODE=local`: server-only setting selecting local RAG retrieval and grounded fallback responses.
- `SMTP_*` and `SUPABASE_*` remain private server-only settings; do not prefix secrets with `NEXT_PUBLIC_`.

The `.env.example` intentionally contains no OpenAI key or OpenAI model configuration. Copy it to `.env.local` and leave `CHATBOT_MODE=local` to run without OpenAI.

## Chatbot implementation
- `GET /api/chat` returns a non-secret health/status result including `mode: local-rag` for local operation.
- `POST /api/chat` retrieves from the local catalogue, product details, business/showroom information, and FAQ content.
- In local mode the API skips `generateRagAnswer` and makes no external model call. It uses `buildRetrievalFallback` with the retrieved sources.
- Optional external model generation remains opt-in only when `CHATBOT_MODE=hybrid` is deliberately set and a server-only key is configured. This is not required for the default website chatbot.

## Smoke tests run
The local retriever was executed in a Node smoke test using the current 46-product catalogue data and showroom/FAQ fixtures. Tested:
- Showroom address
- Showroom opening hours
- Contact phone and email
- Alaska Corner Sofa price/detail lookup
- Corner sofa category browsing
- Local mode bypass returns no model-generated answer and doesn't need an OpenAI key

## Validation still required
- Static syntax parsing and configuration assertions passed.
- Full Next.js production build, ESLint and actual browser-to-API runtime tests were not run because dependencies are not installed in this working environment. Run `npm ci`, `npm run lint`, and `npm run build` before deploying.
