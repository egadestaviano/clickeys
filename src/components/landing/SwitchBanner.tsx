import { Link } from "react-router-dom";
import { MaterialIcon } from "@/components/materialIcon";

export function SwitchBanner() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-16 md:px-12">
      <div className="relative overflow-hidden bg-surface-container">
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
          <div className="p-8 md:p-12">
            <p className="font-geist text-xs uppercase tracking-[0.3em] text-brand">
              Switches
            </p>
            <h2 className="mt-4 font-geist text-3xl font-bold uppercase leading-tight text-on-surface md:text-4xl">
              Switch to a better
              <br />
              typing experience
            </h2>
            <p className="mt-4 font-geist text-sm text-on-surface-variant">
              Discover mechanical switches with the perfect feel and sound for
              your typing style.
            </p>
            <Link
              to="/?category=Switches"
              className="mt-6 inline-flex items-center gap-2 bg-brand px-6 py-3 font-geist text-sm font-bold text-on-brand transition-colors hover:bg-brand-strong"
            >
              Shop Switches
              <MaterialIcon className="text-[18px]" name="arrow_forward" />
            </Link>
          </div>
          <div className="relative h-56 min-h-[220px] w-full md:h-full">
            <img
              alt="Switches"
              className="absolute inset-0 h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=2070&auto=format&fit=crop"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwitchBanner;
