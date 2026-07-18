import { MaterialIcon } from "@/components/materialIcon";
import SEO from "@/components/SEO";

const faqs = [
  {
    q: "What are Clickeys products?",
    a: "Clickeys offers premium mechanical keyboards, switches, keycaps, and accessories for the best typing and gaming experience.",
  },
  {
    q: "How long does shipping take?",
    a: "Free shipping on every order, with an estimated delivery of 2–5 business days depending on your location.",
  },
  {
    q: "Is there a warranty?",
    a: "Yes, every product is covered by a warranty and a 30-day easy return with money-back guarantee.",
  },
  {
    q: "How do I choose a switch?",
    a: "Use our Switches page to compare feel and sound, then pick the one that best matches your typing style.",
  },
  {
    q: "How do I track my order?",
    a: "Head to the Order Tracking page and sign in to view live status, milestones and shipment updates for any order.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept major cards through Stripe and cash-on-delivery depending on your region. All transactions are secure.",
  },
];

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-surface-container-lowest pt-24 pb-16">
      <SEO title="FAQ" description="Frequently asked questions about Clickeys products, shipping, warranty and payments." />
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-12">
        <div className="border-b border-outline-variant pb-8">
          <p className="font-geist text-xs uppercase tracking-[0.2em] text-brand">
            Support
          </p>
          <h1 className="mt-2 font-geist text-4xl font-bold uppercase tracking-tight text-on-surface md:text-5xl">
            Frequently Asked Questions
          </h1>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr]">
          <div className="font-geist text-sm leading-relaxed text-on-surface-variant">
            Can't find what you're looking for? Reach our team at
            <span className="ml-1 font-semibold text-on-surface">SUPPORT@CLICKEYS.COM</span>
            and we'll get back to you within one business day.
          </div>
          <div className="flex flex-col">
            {faqs.map((item) => (
              <details key={item.q} className="group border-b border-outline-variant py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-geist text-lg font-bold text-on-surface">
                  {item.q}
                  <MaterialIcon
                    className="text-[22px] text-brand transition-transform group-open:rotate-45"
                    name="add"
                  />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
