import { useState, useEffect, useCallback } from "react";
import { HERO_SLIDES } from "@/constants/home";
import { MaterialIcon } from "@/components/materialIcon";

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPreviousSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
    );
  }, []);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    const timer = setInterval(goToNextSlide, 6000);
    return () => clearInterval(timer);
  }, [goToNextSlide]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative h-[460px] w-full overflow-hidden bg-surface-container-lowest lg:h-[520px]">
      {/* Background image slider */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div
          className="absolute inset-0 flex transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            width: `${HERO_SLIDES.length * 100}%`,
            transform: `translate3d(-${currentSlide * (100 / HERO_SLIDES.length)}%,0,0)`,
            willChange: "transform",
          }}
        >
          {HERO_SLIDES.map((s) => (
            <div
              key={s.id}
              className="relative h-full flex-none overflow-hidden"
              style={{ width: `${100 / HERO_SLIDES.length}%` }}
            >
              <img
                src={s.image}
                alt={s.highlight}
                width={2000}
                height={1200}
                loading={s.id === 1 ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Light left scrim for basic readability, not a heavy shadow */}
        <div className="absolute inset-0 bg-surface-container-lowest/55" />
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto flex h-full max-w-[1440px] items-center px-4 sm:px-6 md:px-12">
        <div className="w-full max-w-lg md:ml-[8%]">
          <h1
            key={`title-${currentSlide}`}
            className={`font-geist text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl ${
              currentSlide === 0
                ? ""
                : "animate-in fade-in slide-in-from-bottom-4 duration-500"
            }`}
          >
            {slide.title}
            <br />
            <span className="text-brand">{slide.highlight}</span>
          </h1>

          <p
            key={`desc-${currentSlide}`}
            className={`mt-4 max-w-md font-geist text-sm leading-relaxed text-white/80 line-clamp-3 md:text-base ${
              currentSlide === 0
                ? ""
                : "animate-in fade-in slide-in-from-bottom-6 duration-700"
            }`}
          >
            {slide.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#popular"
              className="inline-flex h-11 items-center justify-center gap-2 bg-brand px-6 font-geist text-sm font-bold text-on-brand transition-colors hover:bg-brand-strong"
            >
              Shop Collection
              <MaterialIcon className="text-[18px]" name="arrow_forward" />
            </a>
          </div>
        </div>
      </div>

      {/* Prev / Next */}
      <button
        onClick={goToPreviousSlide}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/30 text-white/90 transition-colors hover:border-brand hover:bg-brand sm:left-5"
      >
        <MaterialIcon className="text-[20px]" name="chevron_left" />
      </button>
      <button
        onClick={goToNextSlide}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/30 text-white/90 transition-colors hover:border-brand hover:bg-brand sm:right-5"
      >
        <MaterialIcon className="text-[20px]" name="chevron_right" />
      </button>

      {/* Pagination dots */}
      <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
        {HERO_SLIDES.map((s, index) => (
          <button
            key={s.id}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}: ${s.highlight}`}
            aria-current={index === currentSlide}
            className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-7 bg-brand"
                : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroBanner;
