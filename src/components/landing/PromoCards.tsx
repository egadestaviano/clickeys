import { MaterialIcon } from "@/components/materialIcon";

export function PromoCards() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-8 md:px-12">
      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
        {/* Shipping */}
        <div className="flex flex-col items-center justify-center gap-4 bg-surface-container p-8 text-center">
          <MaterialIcon className="text-5xl text-brand" name="local_shipping" />
          <p className="font-geist font-semibold text-lg text-on-surface">
            Free shipping on every order.
          </p>
        </div>

        {/* Pay later */}
        <div className="flex flex-col items-center justify-center gap-4 bg-surface-container-high p-8 text-center">
          <MaterialIcon className="text-5xl text-brand" name="payments" />
          <h3 className="font-geist text-2xl font-bold uppercase leading-tight text-on-surface">
            Buy Now, Pay Later
          </h3>
          <p className="max-w-[260px] font-geist text-sm text-on-surface-variant">
            Flexible checkout options available on product and cart pages.
          </p>
        </div>

        {/* Pro Series */}
        <div className="relative flex min-h-[220px] flex-col items-center justify-center overflow-hidden bg-surface-container">
          <div className="absolute inset-0 z-10 bg-black/50" />
          <img
            alt="Pro Series promo"
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=2070&auto=format&fit=crop"
            loading="lazy"
            decoding="async"
          />
          <h3 className="relative z-20 font-geist text-3xl font-bold uppercase leading-tight text-white">
            Champion Your
            <br />
            Pro Series
          </h3>
        </div>
      </div>
    </div>
  );
}

export default PromoCards;
