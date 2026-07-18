import { Link } from "react-router-dom";
import { MaterialIcon } from "@/components/materialIcon";

const catalogue = [
  { name: "Barebones Kits", to: "/?category=keyboards#popular" },
  { name: "Switches", to: "/?category=switches#popular" },
  { name: "Keycaps", to: "/?category=keycaps#popular" },
  { name: "Accessories", to: "/?category=accessories#popular" },
  { name: "Desk Mats", to: "/?category=deskmat#popular" },
];

const support = [
  { name: "Build Guides", to: "#" },
  { name: "Shipping Config", to: "#" },
  { name: "Returns & Refunds", to: "#" },
  { name: "FAQ", to: "#" },
  { name: "Order Tracking", to: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-surface-container-lowest">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 md:px-12">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-5">
            <h3 className="font-geist text-2xl font-bold text-brand">CLICKEYS</h3>
            <p className="mt-1 font-geist text-xs uppercase tracking-[0.2em] text-on-surface-variant">
              Mechanical Excellence
            </p>
            <p className="mt-4 max-w-sm font-geist text-sm leading-relaxed text-on-surface-variant">
              Crafting the ultimate typing experience. Premium enthusiast tools
              for those who demand excellence.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 font-geist text-xs text-on-surface-variant">
                <MaterialIcon className="text-[16px] text-brand" name="location_on" />
                <span>SILICON VALLEY, CA</span>
              </div>
              <div className="flex items-center gap-2 font-geist text-xs text-on-surface-variant">
                <MaterialIcon className="text-[16px] text-brand" name="mail" />
                <span>SUPPORT@CLICKEYS.COM</span>
              </div>
            </div>
          </div>

          {/* Catalogue */}
          <div className="md:col-span-3 md:col-start-8">
            <h4 className="mb-4 font-geist text-xs font-semibold uppercase tracking-[0.2em] text-on-surface">
              Catalogue
            </h4>
            <ul className="space-y-2.5">
              {catalogue.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className="font-geist text-sm text-on-surface-variant transition-colors hover:text-brand"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-2">
            <h4 className="mb-4 font-geist text-xs font-semibold uppercase tracking-[0.2em] text-on-surface">
              Support
            </h4>
            <ul className="space-y-2.5">
              {support.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className="font-geist text-sm text-on-surface-variant transition-colors hover:text-brand"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-outline-variant pt-6 sm:flex-row">
          <p className="font-geist text-xs text-on-surface-variant">
            &copy; {new Date().getFullYear()} CLICKEYS // ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-1 font-geist text-xs text-brand">
            <MaterialIcon className="text-[14px]" name="keyboard" />
            <span>Built for enthusiasts</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
