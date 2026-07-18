import { MaterialIcon } from "@/components/materialIcon";

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
];

export function FaqSection() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-20 md:px-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="font-geist text-4xl font-bold uppercase leading-none tracking-tight text-on-surface">
            Frequently
            <br />
            Asked
            <br />
            Questions
          </h2>
        </div>
        <div className="flex flex-col">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group border-b border-outline-variant py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-geist text-lg font-bold text-on-surface">
                {item.q}
                <MaterialIcon className="text-[22px] text-brand transition-transform group-open:rotate-45" name="add" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FaqSection;
