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

  useEffect(() => {
    const timer = setInterval(goToNextSlide, 6000);
    return () => clearInterval(timer);
  }, [goToNextSlide]);

  return (
    <div className="relative w-full h-[520px] overflow-hidden bg-surface-container-lowest border-b border-outline-variant">
      {/* Background slider */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/80 to-transparent" />

        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full bg-brand/10 blur-[120px]" />

        <div
          className="absolute inset-0 flex transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            width: `${HERO_SLIDES.length * 100}%`,
            transform: `translate3d(-${currentSlide * (100 / HERO_SLIDES.length)}%,0,0)`,
            willChange: "transform",
          }}
        >
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className="relative h-full flex-none overflow-hidden"
                style={{ width: `${100 / HERO_SLIDES.length}%` }}
                aria-hidden={!isActive}
              >
                <img
                  src={slide.image}
                  alt={slide.highlight}
                  width={2000}
                  height={1200}
                  loading={slide.id === 1 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Prev/Next controls */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-30">
        <button
          onClick={goToPreviousSlide}
          aria-label="Previous slide"
          className="group pointer-events-auto absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white transition-all duration-300 hover:border-brand hover:bg-brand"
        >
          <MaterialIcon className="text-[26px] transition-transform group-hover:-translate-x-0.5" name="chevron_left" />
        </button>

        <button
          onClick={goToNextSlide}
          aria-label="Next slide"
          className="group pointer-events-auto absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white transition-all duration-300 hover:border-brand hover:bg-brand"
        >
          <MaterialIcon className="text-[26px] transition-transform group-hover:translate-x-0.5" name="chevron_right" />
        </button>
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto flex h-full max-w-[1440px] flex-col items-center justify-center gap-6 px-4 py-20 text-center sm:items-start sm:px-12 sm:text-left md:py-32">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 font-geist text-sm font-medium text-brand">
          <MaterialIcon className="text-[16px]" name="bolt" />
          <span key={`badge-${currentSlide}`}>
            {HERO_SLIDES[currentSlide].badge}
          </span>
        </div>

        <h1
          key={`title-${currentSlide}`}
          className={`max-w-3xl font-geist text-4xl font-bold tracking-tight text-on-surface md:text-6xl lg:text-7xl ${
            currentSlide === 0
              ? ""
              : "animate-in fade-in slide-in-from-bottom-4 duration-500"
          }`}
        >
          {HERO_SLIDES[currentSlide].title}
          <br />
          <span className="text-brand">
            {HERO_SLIDES[currentSlide].highlight}
          </span>
        </h1>

        <p
          key={`desc-${currentSlide}`}
          className={`mt-2 max-w-2xl font-geist text-lg leading-relaxed text-on-surface-variant line-clamp-3 md:text-xl ${
            currentSlide === 0
              ? ""
              : "animate-in fade-in slide-in-from-bottom-6 duration-700"
          }`}
        >
          {HERO_SLIDES[currentSlide].description}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
          <a
            href="#popular"
            className="inline-flex h-14 cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand px-8 font-geist text-lg font-bold text-on-brand transition-all duration-200 hover:bg-brand-strong active:scale-95"
          >
            Belanja Koleksi
            <MaterialIcon className="text-[20px]" name="arrow_forward" />
          </a>
        </div>

        {/* Pagination */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2 sm:left-12 sm:translate-x-0 lg:left-12">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={HERO_SLIDES[index].id}
              role="tab"
              aria-selected={currentSlide === index}
              aria-label={`Go to slide ${index + 1}: ${HERO_SLIDES[index].highlight}`}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "w-8 bg-brand"
                  : "w-4 bg-on-surface-variant hover:bg-on-surface"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
