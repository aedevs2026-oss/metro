# Local RAG Chatbot / Environment Update

## Result
- Chatbot defaults to local retrieval mode (`CHATBOT_MODE=local`) and uses the local product catalogue, showroom/business content, and FAQ data.
- OpenAI is not required and no OpenAI environment variables are present in `.env.example`.
- `GET /api/chat` returns a readiness response with `mode: local-rag` when local mode is active.
- `POST /api/chat` deliberately skips the external model path in local mode and uses `buildRetrievalFallback` from retrieved catalogue/business documents.
- The client widget is controlled by the public, non-secret `NEXT_PUBLIC_CHATBOT_ENABLED=true` flag.
- `NEXT_PUBLIC_SITE_URL` remains the only public URL setting in the environment template.
- SMTP passwords and the Supabase service-role key remain unprefixed and server-only.

## Known scope
The local retriever uses weighted lexical matching and grounded response templates, not an LLM, embedding model, or vector database. This has no OpenAI usage cost but phrasing and handling of unusual questions are less flexible than a language model.

## Validation
- JavaScript/JSX/TypeScript source parsed without diagnostics.
- Static tests passed for local-mode routing, public widget flag, API readiness GET route and environment-secret boundaries.
- Full Next.js build, ESLint, and browser/API runtime tests still need to be run after dependencies are installed.

## Setup
Copy `.env.example` to `.env.local`, leave `CHATBOT_MODE=local`, and run `npm ci`, `npm run lint`, `npm run build`. Deploy the same environment values in Vercel. No OpenAI key is needed.
