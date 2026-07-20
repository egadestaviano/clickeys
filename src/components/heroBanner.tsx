import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Zap, ArrowRight } from "lucide-react";
import { HERO_SLIDES } from "@/constants/home";

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
    <div className="relative w-full h-[520px] sm:-mt-20 sm:h-[600px] lg:h-[650px] overflow-hidden bg-background border-b border-border">
      {/* Background slider */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/* slider container */}
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
                  className="h-full w-full object-cover brightness-[0.65]"
                  fetchPriority={slide.id === 1 ? "high" : "auto"}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8" />
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
          className="group cursor-pointer pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-black/30 border border-white/20 hover:bg-emerald-400/90 hover:border-emerald-300 transition-all duration-300"
        >
          <ChevronLeft className="h-6 w-6 text-white transition-transform duration-200 group-hover:-translate-x-0.5" />
        </button>

        <button
          onClick={goToNextSlide}
          aria-label="Next slide"
          className="group cursor-pointer pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-black/30 border border-white/20 hover:bg-emerald-400/90 hover:border-emerald-300 transition-all duration-300"
        >
          <ChevronRight className="h-6 w-6 text-white transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-center sm:items-start text-center sm:text-left gap-6 h-full justify-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
          <Zap className="w-4 h-4 fill-current animate-pulse" />
          <span key={`badge-${currentSlide}`}>
            {HERO_SLIDES[currentSlide].badge}
          </span>
        </div>

        <h1
          key={`title-${currentSlide}`}
          className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg max-w-3xl ${
            currentSlide === 0
              ? ""
              : "animate-in fade-in slide-in-from-bottom-4 duration-500"
          }`}
        >
          {HERO_SLIDES[currentSlide].title}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
            {HERO_SLIDES[currentSlide].highlight}
          </span>
        </h1>

        <p
          key={`desc-${currentSlide}`}
          className={`text-lg md:text-xl text-white/85 drop-shadow-md max-w-2xl mt-2 leading-relaxed line-clamp-3 ${
            currentSlide === 0
              ? ""
              : "animate-in fade-in slide-in-from-bottom-6 duration-700"
          }`}
        >
          {HERO_SLIDES[currentSlide].description}
        </p>

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-6">
          <a
            href="#popular"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg font-medium cursor-pointer rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-95 duration-200"
          >
            Shop Collection
            <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
          </a>
        </div>

        {/* Pagination */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 lg:left-8 flex gap-2">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={HERO_SLIDES[index].id}
              role="tab"
              aria-selected={currentSlide === index}
              aria-label={`Go to slide ${index + 1}: ${HERO_SLIDES[index].highlight}`}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                currentSlide === index
                  ? "w-8 bg-primary"
                  : "w-4 bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
