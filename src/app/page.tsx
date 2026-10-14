import { AgentDemo } from "@/components/AgentDemo";
import { Integrate } from "@/components/Integrate";
import { Footer, Header, Hero } from "@/components/Chrome";
import { APP } from "@/app.config";
import { CUSTOMERS, ORDERS } from "@/lib/store";

const statusTone: Record<string, string> = {
  shipped: "bg-accent-soft text-accent-ink",
  processing: "bg-warn-soft text-warn",
  delivered: "bg-good-soft text-good",
  "on-hold": "bg-warn-soft text-warn",
  cancelled: "bg-bad-soft text-bad",
};

export default function Page() {
  return (
    <>
      <Header app={APP.name} repo={APP.repo} />
      <main className="flex-1">
        <Hero kicker="Live demo · AI agent with tool calling" title="A WhatsApp support agent that" accent="can't guess your order.">
          The AI never touches the store. It can only ask for one tool, and server code decides what comes back. Chat as a
          customer on the left and watch every step on the right.
        </Hero>

        <section className="mx-auto max-w-6xl px-4 sm:px-6">
          <AgentDemo customers={CUSTOMERS.map(({ id, name, phone }) => ({ id, name, phone }))} />
        </section>

        <section className="mx-auto mt-14 grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="label">Demo store data</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Orders you can ask about</h2>
            <p className="mt-2 text-muted">
              Each order belongs to one phone number. Ask Ayesha&apos;s chat about Bilal&apos;s order and the agent answers
              exactly as if it didn&apos;t exist, so it can&apos;t be used to probe other customers.
            </p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-line bg-panel">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-left">
                  <th className="label px-4 py-2.5 font-normal">Order</th>
                  <th className="label px-4 py-2.5 font-normal">Owner</th>
                  <th className="label px-4 py-2.5 font-normal">Status</th>
                  <th className="label hidden px-4 py-2.5 font-normal sm:table-cell">Items</th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((o) => (
                  <tr key={o.number} className="border-b border-line last:border-0">
                    <td className="px-4 py-2.5 font-mono">#{o.number}</td>
                    <td className="px-4 py-2.5">{CUSTOMERS.find((c) => c.phone === o.customerPhone)?.name.split(" ")[0]}</td>
                    <td className="px-4 py-2.5">
                      <span className={`rounded-full px-2 py-0.5 font-mono text-[11px] ${statusTone[o.status]}`}>{o.status}</span>
                    </td>
                    <td className="hidden px-4 py-2.5 text-muted sm:table-cell">{o.items[0].name}{o.items.length > 1 ? " +1" : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mx-auto mt-14 mb-16 max-w-6xl px-4 sm:px-6">
          <p className="label">Why it&apos;s built this way</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">The part after the demo works</h2>
          <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["One narrow tool", "The model can request get_order_status and nothing else. No database, no store API key, no free-form queries."],
              ["Ownership checked in code", "The order must match the sender's WhatsApp number. That rule lives on the server, not in the prompt."],
              ["Least data out", "Address, email and payment details are stripped before the model sees the result, so a jailbreak has nothing to leak."],
              ["Every step logged", "Each model pass and tool call is recorded, so any complaint can be traced to exactly what the AI saw and said."],
            ].map(([t, d]) => (
              <div key={t} className="bg-panel p-5">
                <p className="font-medium">{t}</p>
                <p className="mt-1.5 text-sm text-muted">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            The production version runs on Laravel with the WhatsApp Cloud API and live WooCommerce stores, with signed
            webhooks, encrypted per-store credentials and a switchable AI provider. This sandbox swaps WhatsApp for a web
            chat and WooCommerce for fixed demo orders.
          </p>
        </section>
        <Integrate
          c={{
            title: "Put this agent on your own WhatsApp number",
            intro: "Customers keep messaging the number they already use. Behind it, the agent reads your real orders and answers in seconds, day and night, and hands anything else to your team.",
            options: [
              { name: "Connect your WhatsApp Business number", detail: "Through Meta's official WhatsApp Cloud API, not an unofficial app, so your number is not at risk of being banned. Messages arrive by a signed webhook." },
              { name: "Connect your store", detail: "WooCommerce or Shopify with read-only API keys, stored encrypted. Another system, such as a custom backend or ERP, works through its API." },
              { name: "Set your rules", detail: "Your tone, your shipping and return policies, which questions it may answer, and when to hand over to a person. Customers only ever see orders that belong to their own number." },
              { name: "Watch every conversation", detail: "Every AI reply and order lookup is logged, so you can check exactly what the agent saw and said if a customer complains." },
            ],
            needs: ["A Meta Business account (I guide you through verification)", "A phone number for WhatsApp Business", "Admin access to your store to create read-only API keys"],
            timeline: "Live in about a week. Most of the waiting is Meta's business verification.",
          }}
        />
      </main>
      <Footer />
    </>
  );
}
