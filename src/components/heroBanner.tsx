import { useState, useEffect, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, Zap, ArrowRight } from "lucide-react";

// Optimized Unsplash URLs: WebP format, q=60, max 1440px wide
// Using fm=webp + auto=format ensures WebP on all supporting browsers
// Reduced from 2042px/2000px which was wasteful for typical viewport widths
const SLIDES = [
  {
    id: 0,
    // Slide 1 has a separate high-res srcset for LCP optimisation
    imageBase: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5",
    badge: "Restocked: Holy Pandas",
    title: "Build Your",
    highlight: "Endgame Keyboard",
    description:
      "Curated components, premium barebone kits, and enthusiast-grade switches. Everything you need to craft the perfect typing experience.",
  },
  {
    id: 1,
    imageBase: "https://images.unsplash.com/photo-1595225476474-87563907a212",
    badge: "New Arrival: GMK Sets",
    title: "Premium",
    highlight: "Keycap Sets",
    description:
      "Elevate your aesthetics with high-quality, double-shot ABS and dye-sub PBT keycaps designed by the community.",
  },
  {
    id: 2,
    imageBase: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
    badge: "Group Buy Live",
    title: "Custom",
    highlight: "Artisan Switches",
    description:
      "Experience unparalleled tactile feedback and smooth linear presses with our exclusive hand-lubed switch collections.",
  },
];

/** Build an Unsplash URL with optimal params for the hero banner */
function buildUrl(base: string, w: number, q = 60) {
  return `${base}?fm=webp&q=${q}&w=${w}&fit=crop&auto=format`;
}

/** Build a srcSet string for responsive delivery */
function buildSrcSet(base: string, q = 60) {
  return [640, 1024, 1440].map((w) => `${buildUrl(base, w, q)} ${w}w`).join(", ");
}

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPreviousSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(goToNextSlide, 6000);
    return () => clearInterval(timer);
  }, [goToNextSlide]);

  // Only render the active slide + adjacent slides (not all 3 at once).
  // This is the key fix for the "Est savings 1,375 KiB" Lighthouse warning.
  // Previously all 3 images were in the DOM at the same time (slider container),
  // so the browser downloaded all of them regardless of loading="lazy".
  const visibleSlides = useMemo(() => {
    const prev = (currentSlide - 1 + SLIDES.length) % SLIDES.length;
    const next = (currentSlide + 1) % SLIDES.length;
    return new Set([prev, currentSlide, next]);
  }, [currentSlide]);

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] lg:h-[650px] overflow-hidden bg-background border-b border-border">
      {/* Background slider */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent z-10 pointer-events-none" />

        {/* Only the active slide image is rendered (+ neighbours for smooth transition) */}
        {SLIDES.map((s, index) =>
          visibleSlides.has(index) ? (
            <img
              key={s.id}
              src={buildUrl(s.imageBase, 1024)}
              srcSet={buildSrcSet(s.imageBase)}
              sizes="(max-width: 640px) 640px, (max-width: 1440px) 1024px, 1440px"
              alt={s.highlight}
              width="1440"
              height="900"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "low"}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-luminosity dark:mix-blend-normal transition-opacity duration-[900ms] ease-in-out"
              style={{ opacity: index === currentSlide ? undefined : 0 }}
            />
          ) : null
        )}
      </div>

      {/* Prev/Next controls */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-30">
        <button
          onClick={goToPreviousSlide}
          aria-label="Previous slide"
          className="group pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-black/30 border border-white/20 hover:bg-emerald-400/90 hover:border-emerald-300 transition-all duration-300"
        >
          <ChevronLeft className="h-6 w-6 text-white transition-transform duration-200 group-hover:-translate-x-0.5" />
        </button>

        <button
          onClick={goToNextSlide}
          aria-label="Next slide"
          className="group pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-black/30 border border-white/20 hover:bg-emerald-400/90 hover:border-emerald-300 transition-all duration-300"
        >
          <ChevronRight className="h-6 w-6 text-white transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-center sm:items-start text-center sm:text-left gap-6 h-full justify-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
          <Zap className="w-4 h-4 fill-current animate-pulse" aria-hidden="true" />
          <span key={`badge-${currentSlide}`}>{slide.badge}</span>
        </div>

        <h1
          key={`title-${currentSlide}`}
          className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-3xl ${currentSlide === 0 ? '' : 'animate-in fade-in slide-in-from-bottom-4 duration-500'
            }`}
        >
          {slide.title}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
            {slide.highlight}
          </span>
        </h1>

        <p
          key={`desc-${currentSlide}`}
          className={`text-lg md:text-xl text-muted-foreground max-w-2xl mt-2 leading-relaxed line-clamp-3 ${currentSlide === 0 ? '' : 'animate-in fade-in slide-in-from-bottom-6 duration-700'
            }`}
        >
          {slide.description}
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

        {/* Pagination dots */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 lg:left-8 flex gap-2"
          role="tablist"
          aria-label="Slide navigation"
        >
          {SLIDES.map((s, index) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={currentSlide === index}
              aria-label={`Go to slide ${index + 1}: ${s.highlight}`}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === index
                ? "w-8 bg-primary"
                : "w-4 bg-muted hover:bg-muted-foreground"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
