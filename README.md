# WhatsApp Order Agent (live sandbox)

A public demo of an AI customer-support agent that answers "where's my order?" from store data **without being able to guess or leak anything**. Chat as a customer on the left, and watch every model pass and tool call in the audit log on the right.

It is a web sandbox of a production agent I built in Laravel on the WhatsApp Cloud API with live WooCommerce stores.

## How it works

```
customer message
   │
   ▼
model, pass 1 ──► may REQUEST get_order_status({ order_number })
                       │
                       ▼
               server code (src/lib/agent.ts → runOrderTool)
                 ✓ validate order number format
                 ✓ order exists
                 ✓ order belongs to this WhatsApp number   ← enforced in code, not the prompt
                 ✂ strip address, email, payment method
                       │
                       ▼
model, pass 2 ──► writes the reply from that result only
```

- **One narrow tool.** The model has no database or store access, only a single strictly-typed function.
- **Ownership is checked on the server.** Someone else's order gets exactly the same answer as a missing one, so the agent can't be used to probe order numbers.
- **Least data out.** Private fields never reach the model, so a jailbreak has nothing to leak.
- **Every step logged** and shown in the UI.
- **Usage limit per visitor** (Upstash Redis when configured, in-memory otherwise) so a public demo can't run up the AI bill.
- **Bounded loop** (max 3 tool rounds) with a safe fallback reply.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · Google Gemini via `@google/genai` · Zod · Vercel

## Run locally

```bash
cp .env.example .env.local   # add GEMINI_API_KEY
npm install
npm run dev
```

Built by [Shah Sawar](https://shahsawar.dev).
