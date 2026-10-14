import { z } from "zod";
import { runAgent } from "@/lib/agent";
import { aiErrorResponse } from "@/lib/gemini";
import { clientIp, limitResponse, rateLimit } from "@/lib/ratelimit";

export const maxDuration = 30;

const Body = z.object({
  customerId: z.string().max(20),
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), text: z.string().min(1).max(500) }))
    .min(1)
    .max(30),
});

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Invalid request." }, { status: 400 });

  const messages = parsed.data.messages.slice(-12);
  if (messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "The last message must be from the customer." }, { status: 400 });
  }

  const limit = await rateLimit(`wa:${clientIp(req)}`);
  if (!limit.ok) return limitResponse(limit);

  try {
    const out = await runAgent(messages, parsed.data.customerId);
    return Response.json({ ...out, remaining: limit.remaining });
  } catch (err) {
    return aiErrorResponse(err);
  }
}
