import { MaterialIcon } from "@/components/materialIcon";

const highlights = [
  {
    icon: "verified",
    title: "Enthusiast-Grade Quality",
    body: "Hand-picked components and rigorously tested builds for a typing experience that lasts.",
  },
  {
    icon: "tune",
    title: "Fully Customizable",
    body: "Mix switches, keycaps, and builds to match your exact feel, sound, and style.",
  },
  {
    icon: "local_shipping",
    title: "Free Fast Shipping",
    body: "Free shipping on every order with a 30-day easy return and money-back guarantee.",
  },
];

export function NewsletterBar() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-20 md:px-12">
      <div className="rounded-md bg-surface-container-low p-8 md:p-12">
        <div className="mb-8 text-center">
          <p className="font-geist text-xs uppercase tracking-[0.3em] text-brand">
            Why Clickeys
          </p>
          <h2 className="mt-2 font-geist text-3xl font-bold text-on-surface">
            Built for the way you type
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center gap-4 rounded-md bg-surface-container p-8 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10">
                <MaterialIcon className="text-[28px] text-brand" name={item.icon} />
              </span>
              <h3 className="font-geist text-lg font-bold text-on-surface">
                {item.title}
              </h3>
              <p className="font-geist text-sm leading-relaxed text-on-surface-variant">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsletterBar;
