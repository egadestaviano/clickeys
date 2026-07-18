import { Link } from "react-router-dom";
import { MaterialIcon } from "@/components/materialIcon";
import SEO from "@/components/SEO";

const steps = [
  {
    icon: "receipt_long",
    title: "Order Placed",
    desc: "We've received your order and started preparing it.",
  },
  {
    icon: "inventory_2",
    title: "Processing",
    desc: "Items are picked, quality-checked and packed.",
  },
  {
    icon: "local_shipping",
    title: "Shipped",
    desc: "Your parcel is on the way with live carrier updates.",
  },
  {
    icon: "check_circle",
    title: "Delivered",
    desc: "Enjoy your new gear — welcome to the endgame.",
  },
];

export default function OrderTrackingPage() {
  return (
    <main className="min-h-screen bg-surface-container-lowest pt-24 pb-16">
      <SEO
        title="Order Tracking"
        description="Track your Clickeys order through every milestone until delivery."
      />
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-12">
        <div className="border-b border-outline-variant pb-8">
          <p className="font-geist text-xs uppercase tracking-[0.2em] text-brand">
            Support
          </p>
          <h1 className="mt-2 font-geist text-4xl font-bold uppercase tracking-tight text-on-surface md:text-5xl">
            Order Tracking
          </h1>
          <p className="mt-3 max-w-xl font-geist text-sm text-on-surface-variant">
            Sign in to view real-time status, shipment milestones and estimated
            delivery for any of your orders.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-start gap-4 border border-outline-variant bg-surface-container p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <MaterialIcon className="text-[24px] text-brand" name="login" />
            <div>
              <p className="font-geist text-sm font-semibold text-on-surface">
                Have an account?
              </p>
              <p className="font-geist text-xs text-on-surface-variant">
                Track every order in one place.
              </p>
            </div>
          </div>
          <Link
            to="/my/orders"
            className="inline-flex items-center gap-2 bg-brand px-5 py-2.5 font-geist text-sm font-bold text-on-brand transition-colors hover:bg-brand-strong"
          >
            View My Orders
            <MaterialIcon className="text-[18px]" name="arrow_forward" />
          </Link>
        </div>

        <div className="mt-10">
          <h2 className="font-geist text-xl font-bold uppercase tracking-tight text-on-surface">
            How tracking works
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="border border-outline-variant bg-surface-container p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center bg-surface text-brand">
                  <MaterialIcon className="text-[22px]" name={step.icon} />
                </span>
                <p className="mt-4 font-geist text-xs font-semibold uppercase tracking-[0.2em] text-on-surface-variant">
                  Step {i + 1}
                </p>
                <h3 className="mt-1 font-geist text-base font-bold text-on-surface">
                  {step.title}
                </h3>
                <p className="mt-1 font-geist text-sm text-on-surface-variant">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 font-geist text-sm text-on-surface-variant">
          Questions about a specific order? Email{" "}
          <span className="font-semibold text-on-surface">SUPPORT@CLICKEYS.COM</span>{" "}
          and we'll help right away.
        </p>
      </div>
    </main>
  );
}
