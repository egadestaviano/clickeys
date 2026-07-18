import { Link } from "react-router-dom";
import { MaterialIcon } from "@/components/materialIcon";

const showcase = {
  name: "Pro Series",
  tag: "Tournament-grade",
  image:
    "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1400&auto=format&fit=crop",
};

export function NewsletterBar() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-20 md:px-12">
      <div className="flex flex-col bg-surface-container md:flex-row">
        <div className="flex flex-1 flex-col justify-center p-8 md:p-12">
          <p className="font-geist text-xs uppercase tracking-[0.2em] text-brand">
            {showcase.tag}
          </p>
          <h3 className="mt-2 font-geist text-3xl font-bold text-on-surface md:text-4xl">
            {showcase.name}
          </h3>
          <Link
            to="/products"
            className="mt-6 inline-flex w-fit items-center gap-2 bg-brand px-5 py-2.5 font-geist text-sm font-bold text-on-brand transition-colors hover:bg-brand-strong"
          >
            Shop Now
            <MaterialIcon className="text-[18px]" name="arrow_forward" />
          </Link>
        </div>
        <div className="relative h-56 w-full overflow-hidden md:h-auto md:w-[45%]">
          <img
            alt={showcase.name}
            className="h-full w-full object-cover"
            src={showcase.image}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}

export default NewsletterBar;
