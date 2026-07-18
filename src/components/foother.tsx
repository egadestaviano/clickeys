import { Link } from "react-router-dom";
import { MaterialIcon } from "@/components/materialIcon";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-outline-variant bg-surface-container-lowest pt-16 pb-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-24">
          {/* Catalogue */}
          <div className="order-2 space-y-6 md:order-1">
            <h4 className="border-b border-brand/20 pb-2 font-geist text-xs font-black uppercase tracking-[0.3em] text-brand">
              Catalogue
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Barebones Kits", to: "/?category=keyboards#popular" },
                { name: "Switches", to: "/?category=switches#popular" },
                { name: "Keycaps", to: "/?category=keycaps#popular" },
                { name: "Accessories", to: "/?category=accessories#popular" },
                { name: "Desk Mats", to: "/?category=deskmat#popular" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className="group flex items-center gap-2 font-geist text-sm font-medium text-on-surface-variant transition-all duration-200 hover:translate-x-1 hover:text-on-surface"
                  >
                    <span className="h-1 w-1 scale-0 rounded-full bg-brand transition-transform group-hover:scale-100" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand */}
          <div className="order-1 flex flex-col items-center space-y-6 text-center md:order-2">
            <div className="space-y-2">
              <h3 className="inline-block px-4 font-geist text-3xl font-bold italic text-brand">
                CLICKEYS
              </h3>
              <p className="pt-2 font-geist text-xs uppercase tracking-widest text-on-surface-variant">
                Mechanical Excellence
              </p>
            </div>

            <p className="max-w-xs font-geist text-sm leading-relaxed text-on-surface-variant">
              Crafting the ultimate typing experience. Premium enthusiast tools
              for those who demand excellence.
            </p>

            <div className="flex w-full max-w-[200px] flex-col items-center gap-3 border-t border-dashed border-outline-variant pt-4">
              <div className="flex items-center gap-2 font-geist text-[11px] text-on-surface-variant">
                <MaterialIcon className="text-[14px] text-brand" name="location_on" />
                <span>SILICON VALLEY, CA</span>
              </div>
              <div className="flex items-center gap-2 font-geist text-[11px] text-on-surface-variant">
                <MaterialIcon className="text-[14px] text-brand" name="mail" />
                <span>SUPPORT@CLICKEYS.COM</span>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="order-3 space-y-6 text-left md:text-right">
            <h4 className="border-b border-brand/20 pb-2 font-geist text-xs font-black uppercase tracking-[0.3em] text-brand md:ml-auto">
              Support
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Build Guides", to: "#" },
                { name: "Shipping Config", to: "#" },
                { name: "Returns & Refunds", to: "#" },
                { name: "FAQ", to: "#" },
                { name: "Order Tracking", to: "#" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className="group flex items-center justify-start gap-2 font-geist text-sm font-medium text-on-surface-variant transition-all duration-200 hover:-translate-x-1 hover:text-on-surface md:justify-end"
                  >
                    <span className="h-1 w-1 scale-0 rounded-full bg-brand transition-transform group-hover:scale-100" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-center border-t border-outline-variant pt-8">
          <p className="font-geist text-sm text-on-surface-variant">
            &copy; {new Date().getFullYear()} CLICKEYS // ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
