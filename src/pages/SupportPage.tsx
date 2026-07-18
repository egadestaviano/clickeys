import { Link } from "react-router-dom";
import { MaterialIcon } from "@/components/materialIcon";
import SEO from "@/components/SEO";

const supportLinks = [
  {
    icon: "help",
    title: "FAQ",
    desc: "Answers to the most common questions about products, shipping and payments.",
    to: "/faq",
  },
  {
    icon: "local_shipping",
    title: "Order Tracking",
    desc: "Sign in to follow your order through every milestone until delivery.",
    to: "/order-tracking",
  },
  {
    icon: "assignment_return",
    title: "Returns & Refunds",
    desc: "30-day easy returns with a money-back guarantee on every purchase.",
    to: "/faq",
  },
  {
    icon: "build",
    title: "Build Guides",
    desc: "Step-by-step guides for assembling your barebone kit, switches and keycaps.",
    to: "/faq",
  },
];

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-surface-container-lowest pt-24 pb-16">
      <SEO
        title="Support"
        description="Get help with Clickeys orders, shipping, returns and build guides."
      />
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-12">
        <div className="border-b border-outline-variant pb-8">
          <p className="font-geist text-xs uppercase tracking-[0.2em] text-brand">
            Help Center
          </p>
          <h1 className="mt-2 font-geist text-4xl font-bold uppercase tracking-tight text-on-surface md:text-5xl">
            Support
          </h1>
          <p className="mt-3 max-w-xl font-geist text-sm text-on-surface-variant">
            We're here to help you build the perfect setup. Browse the topics below
            or reach our team directly.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {supportLinks.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className="group flex items-start gap-4 border border-outline-variant bg-surface-container p-6 transition-colors hover:border-brand"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-surface text-brand">
                <MaterialIcon className="text-[22px]" name={item.icon} />
              </span>
              <div>
                <h3 className="font-geist text-base font-bold text-on-surface transition-colors group-hover:text-brand">
                  {item.title}
                </h3>
                <p className="mt-1 font-geist text-sm text-on-surface-variant">
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 border border-outline-variant bg-surface-container p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <MaterialIcon className="text-[24px] text-brand" name="mail" />
            <div>
              <p className="font-geist text-sm font-semibold text-on-surface">
                Still need help?
              </p>
              <p className="font-geist text-xs text-on-surface-variant">
                SUPPORT@CLICKEYS.COM
              </p>
            </div>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-brand px-5 py-2.5 font-geist text-sm font-bold text-on-brand transition-colors hover:bg-brand-strong"
          >
            Shop Collection
            <MaterialIcon className="text-[18px]" name="arrow_forward" />
          </Link>
        </div>
      </div>
    </main>
  );
}
