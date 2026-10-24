import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import {
  ASTERION_IMAGES,
  ConceptVehicle,
  VEHICLE_COLLECTION,
} from '../data/asterionData';
import {
  useAnimatedCounter,
  useInViewOnce,
  usePrefersReducedMotion,
  useSubtleParallax,
} from '../hooks/useMotionPreferences';
import { HeroVideoBackground } from '../components/HeroVideoBackground';
import { NocturneRainScene } from '../components/NocturneRainScene';
import { PageRoute } from '../components/Navbar';
import { ResilientImage } from '../components/ResilientImage';
import { Reveal } from '../components/Reveal';

interface HomePageProps {
  onNavigate: (page: PageRoute, sectionId?: string) => void;
  onOpenDossier: (vehicle: ConceptVehicle) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenDossier }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [heroEntered, setHeroEntered] = useState(false);

  // Trigger sequenced hero reveal immediately after mount without blocking access
  useEffect(() => {
    if (prefersReducedMotion) {
      setHeroEntered(true);
      return;
    }
    const id = window.requestAnimationFrame(() => {
      setHeroEntered(true);
    });
    return () => window.cancelAnimationFrame(id);
  }, [prefersReducedMotion]);

  // Performance Statistics Counter Hook
  const { ref: statsRef, inView: statsInView } = useInViewOnce<HTMLElement>(0.25);
  const accelValue = useAnimatedCounter({
    target: 2.8,
    decimals: 1,
    durationMs: 1550,
    startWhen: statsInView,
  });
  const topSpeedValue = useAnimatedCounter({
    target: 320,
    decimals: 0,
    durationMs: 1700,
    startWhen: statsInView,
  });
  const powerValue = useAnimatedCounter({
    target: 850,
    decimals: 0,
    durationMs: 1850,
    startWhen: statsInView,
  });

  // Subtle Parallax for Full-Width Moment
  const { containerRef: momentParallaxRef, offsetY: momentOffsetY } = useSubtleParallax(28);

  const flagshipVehicle = VEHICLE_COLLECTION[0];

  return (
    <main>
      {/* =====================================================================
          1. HOMEPAGE: CINEMATIC OPENING HERO (HEADLINE & VIDEO PRESERVED)
         ===================================================================== */}
      <section
        id="home"
        aria-label="Asterion Campaign Opening"
        className="relative min-h-[92vh] lg:min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#08090B] pt-24 md:pt-28 pb-10"
      >
        {/* Full-Bleed Commercial Luxury Car Background Video with Subtle Entrance */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className={`w-full h-full transition-[opacity,transform] duration-[1300ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              heroEntered ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.04]'
            }`}
          >
            <HeroVideoBackground className={prefersReducedMotion ? '' : 'asterion-home-film-motion'} />
          </div>

          {/* Carefully Controlled Multi-Directional Contrast Scrims */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#08090B]/90 via-[#08090B]/50 to-[#08090B]/14 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-[#08090B]/55 pointer-events-none"
          />
          {/* Restrained Warm Champagne Atmospheric Glow */}
          <div
            aria-hidden="true"
            className="absolute -top-24 right-[10%] w-[520px] h-[520px] rounded-full bg-[#C7AD7A]/[0.06] blur-[120px] pointer-events-none"
          />
        </div>

        {/* Spacer for balanced vertical framing */}
        <div aria-hidden="true" className="hidden lg:block" />

        {/* Foreground Editorial Copy */}
        <div className="relative z-10 max-w-[1380px] w-full mx-auto px-6 lg:px-10 my-auto pt-8 pb-12">
          <div className="max-w-3xl space-y-7">
            <p
              className={`text-xs md:text-[13px] tracking-[0.26em] uppercase text-[#C7AD7A] transition-[opacity,transform] duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                heroEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              THE NEXT EXPRESSION OF PERFORMANCE
            </p>

            {/* Unchanged Signature Hero Display Headline */}
            <h1
              className={`font-display text-[clamp(2.65rem,6.4vw,5.5rem)] font-medium tracking-[-0.025em] leading-[1.02] text-[#F4F0E8] transition-[opacity,transform] duration-700 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                heroEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <span className="block">THE ART OF</span>
              <span className="block text-[#F4F0E8]/95">MOVING BEYOND.</span>
            </h1>

            <p
              className={`text-base sm:text-lg md:text-xl leading-relaxed text-[#F4F0E8]/80 max-w-xl transition-[opacity,transform] duration-700 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                heroEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              Where precision engineering meets the extraordinary emotion of motion.
            </p>

            {/* Primary & Secondary CTAs -> Dedicated /vehicle and /philosophy Pages */}
            <div
              className={`pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 transition-[opacity,transform] duration-700 delay-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                heroEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              <button
                type="button"
                onClick={() => onNavigate('vehicle')}
                className="asterion-shine-button inline-flex items-center justify-center gap-3 px-7 py-4 text-xs font-medium tracking-[0.2em] uppercase text-[#08090B] bg-[#C7AD7A] hover:bg-[#D5BE90] active:scale-[0.98] transition-[background-color,transform] duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E8]"
              >
                <span>EXPLORE THE MACHINE</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('philosophy')}
                className="inline-flex items-center justify-center px-7 py-4 text-xs font-medium tracking-[0.2em] uppercase text-[#F4F0E8] border border-white/20 bg-[#08090B]/45 hover:border-[#C7AD7A] hover:text-[#C7AD7A] backdrop-blur-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
              >
                DISCOVER OUR PHILOSOPHY
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Tagline & Discreet Looping Scroll Indicator */}
        <div className="relative z-10 max-w-[1380px] w-full mx-auto px-6 lg:px-10 flex items-end justify-between gap-6">
          <p className="hidden sm:block text-[11px] tracking-[0.24em] uppercase text-[#9A9A96]">
            ASTERION · ENGINEERED TO MOVE YOU.
          </p>

          <button
            type="button"
            aria-label="Scroll to performance specifications"
            onClick={() => onNavigate('home', 'performance')}
            className="group ml-auto inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-[#9A9A96] hover:text-[#F4F0E8] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A] py-1"
          >
            <span>Scroll</span>
            <span className="relative w-[1px] h-9 bg-white/15 overflow-hidden">
              <span className="absolute inset-0 bg-[#C7AD7A] animate-scroll-line" />
            </span>
            <ArrowDown className="w-3.5 h-3.5 text-[#C7AD7A] group-hover:translate-y-0.5 transition-transform duration-150" />
          </button>
        </div>
      </section>

      {/* =====================================================================
          2. PERFORMANCE STATISTICS: ANIMATED COUNTERS
         ===================================================================== */}
      <section
        id="performance"
        ref={statsRef}
        aria-label="Concept Performance Specifications"
        className="relative bg-gradient-to-b from-[#08090B] via-[#0E1014] to-[#131519] border-y border-white/[0.08] py-20 md:py-28 scroll-mt-16"
      >
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
          {/* Concise Brand Introduction */}
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 mb-12 border-b border-white/[0.08] items-end">
              <div className="lg:col-span-6 space-y-3">
                <p className="text-xs tracking-[0.24em] uppercase text-[#C7AD7A]">
                  The House of ASTERION
                </p>
                <h2 className="font-display text-[clamp(1.85rem,3.4vw,2.9rem)] font-medium tracking-[-0.02em] leading-[1.08] text-[#F4F0E8]">
                  Precision engineering elevated into sculptural motion.
                </h2>
              </div>
              <div className="lg:col-span-6 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <p className="text-sm sm:text-base text-[#9A9A96] leading-relaxed max-w-xl">
                  ASTERION is an avant-garde luxury performance concept marque uniting aerodynamic
                  purity, tactile cabin craft, and emotionally resonant automotive experiences.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase text-[#C7AD7A] hover:text-[#F4F0E8] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A] py-1"
                >
                  <span>About ASTERION</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-12 border-b border-white/[0.07]">
            <p className="text-xs tracking-[0.22em] uppercase text-[#C7AD7A]">
              Concept Benchmark Envelope
            </p>
            <p className="text-xs text-[#9A9A96]">
              Fictional concept target figures — Asterion Apex Architecture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
            <div className="py-10 md:py-12 md:pr-10 lg:pr-14 space-y-3">
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono tabular-nums text-[clamp(3rem,5.5vw,4.75rem)] font-normal tracking-tight leading-none text-[#F4F0E8]">
                  {accelValue}
                </span>
                <span className="font-display text-xl md:text-2xl font-medium text-[#C7AD7A]">
                  s
                </span>
              </div>
              <p className="text-xs tracking-[0.22em] uppercase text-[#9A9A96] pt-1">
                0–100 KM/H
              </p>
              <p className="text-sm text-[#9A9A96]/80 leading-relaxed max-w-xs">
                Traction-calibrated launch geometry with Rear-Mid weight distribution.
              </p>
            </div>

            <div className="py-10 md:py-12 md:px-10 lg:px-14 space-y-3">
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono tabular-nums text-[clamp(3rem,5.5vw,4.75rem)] font-normal tracking-tight leading-none text-[#F4F0E8]">
                  {topSpeedValue}
                </span>
                <span className="font-display text-lg md:text-xl font-medium tracking-[0.08em] text-[#C7AD7A]">
                  KM/H
                </span>
              </div>
              <p className="text-xs tracking-[0.22em] uppercase text-[#9A9A96] pt-1">
                TOP SPEED
              </p>
              <p className="text-sm text-[#9A9A96]/80 leading-relaxed max-w-xs">
                Achieved in low-drag active aero trim with underbody pressure bleed.
              </p>
            </div>

            <div className="py-10 md:py-12 md:pl-10 lg:pl-14 space-y-3">
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono tabular-nums text-[clamp(3rem,5.5vw,4.75rem)] font-normal tracking-tight leading-none text-[#F4F0E8]">
                  {powerValue}
                </span>
                <span className="font-display text-lg md:text-xl font-medium tracking-[0.08em] text-[#C7AD7A]">
                  HP
                </span>
              </div>
              <p className="text-xs tracking-[0.22em] uppercase text-[#9A9A96] pt-1">
                CONCEPT POWER OUTPUT
              </p>
              <p className="text-sm text-[#9A9A96]/80 leading-relaxed max-w-xs">
                Linear throttle progression tuned for immediate, predictable response.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. "AWAKEN THE SILHOUETTE" — CINEMATIC RAIN & CRIMSON LED ACTIVATION
         ===================================================================== */}
      <NocturneRainScene onNavigate={onNavigate} />

      {/* =====================================================================
          4. THE MACHINE PREVIEW: GATEWAY TO /VEHICLE
         ===================================================================== */}
      <section
        id="machine-preview"
        aria-labelledby="machine-preview-heading"
        className="relative py-24 md:py-36 bg-[#08090B] border-b border-white/[0.08]"
      >
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10 space-y-12">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-[#C7AD7A]">
                  <span>Flagship Concept Preview</span>
                  <span aria-hidden="true" className="text-white/25">·</span>
                  <span className="text-[#9A9A96]">The Machine</span>
                </div>
                <h2
                  id="machine-preview-heading"
                  className="font-display text-[clamp(2.15rem,4.2vw,3.75rem)] font-medium tracking-[-0.02em] leading-[1.06] text-[#F4F0E8]"
                >
                  {flagshipVehicle.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('vehicle')}
                className="inline-flex items-center gap-3 px-6 py-3.5 text-xs font-medium tracking-[0.18em] uppercase text-[#08090B] bg-[#C7AD7A] hover:bg-[#D5BE90] transition-colors duration-150 whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E8]"
              >
                <span>DISCOVER THE MACHINE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>

          <Reveal variant="scale-in" delayMs={80}>
            <article className="grid grid-cols-1 lg:grid-cols-12 border border-white/[0.09] bg-[#131519] items-stretch overflow-hidden group">
              <div className="lg:col-span-7 overflow-hidden bg-[#090B0E]">
                <ResilientImage
                  src={flagshipVehicle.image}
                  alt={flagshipVehicle.alt}
                  fallbackLabel={flagshipVehicle.name}
                  className="aspect-[16/10] lg:aspect-auto lg:h-full w-full"
                  imgClassName="group-hover:scale-[1.025] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
              </div>

              <div className="lg:col-span-5 p-7 sm:p-10 lg:p-12 flex flex-col justify-between gap-8 border-t lg:border-t-0 lg:border-l border-white/[0.08]">
                <div className="space-y-4">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#C7AD7A]">
                    {flagshipVehicle.index} — {flagshipVehicle.category}
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#F4F0E8]">
                    {flagshipVehicle.tagline}
                  </h3>
                  <p className="text-sm sm:text-base text-[#9A9A96] leading-relaxed">
                    {flagshipVehicle.description}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/[0.08]">
                    {flagshipVehicle.specs.map((spec) => (
                      <div key={spec.label}>
                        <p className="text-[11px] tracking-[0.14em] uppercase text-[#9A9A96]">
                          {spec.label}
                        </p>
                        <p className="font-mono tabular-nums text-lg font-medium text-[#F4F0E8] mt-0.5">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => onNavigate('vehicle')}
                      className="inline-flex items-center justify-center gap-3 px-6 py-3.5 text-xs font-medium tracking-[0.18em] uppercase text-[#08090B] bg-[#C7AD7A] hover:bg-[#D5BE90] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E8]"
                    >
                      <span>Enter Vehicle Showcase</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigate('vehicle', 'showroom-3d')}
                      className="inline-flex items-center justify-center px-5 py-3.5 text-xs font-medium tracking-[0.16em] uppercase text-[#C7AD7A] border border-[#C7AD7A]/45 hover:border-[#C7AD7A] hover:bg-[#C7AD7A]/10 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      3D Showroom
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenDossier(flagshipVehicle)}
                      className="inline-flex items-center justify-center px-5 py-3.5 text-xs font-medium tracking-[0.16em] uppercase text-[#F4F0E8] border border-white/15 hover:border-[#C7AD7A] hover:text-[#C7AD7A] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      Quick Dossier
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* =====================================================================
          5. CONCISE PHILOSOPHY & ENGINEERING TEASERS -> /PHILOSOPHY & /ENGINEERING
         ===================================================================== */}
      <section
        aria-label="Philosophy and Engineering Chapters"
        className="py-24 md:py-36 bg-[#131519] border-b border-white/[0.08]"
      >
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Concise Philosophy Teaser -> /philosophy */}
            <Reveal className="lg:col-span-6 flex">
              <article className="w-full border border-white/[0.09] bg-[#08090B] flex flex-col justify-between overflow-hidden group">
                <div>
                  <div className="overflow-hidden bg-[#0A0C0F]">
                    <ResilientImage
                      src={ASTERION_IMAGES.philosophyAtelier}
                      alt="Obsidian hypercar sculpture resting beneath linear architectural lighting inside the Asterion design atelier"
                      fallbackLabel="OUR PHILOSOPHY"
                      className="aspect-[16/10] w-full"
                      imgClassName="group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                  </div>

                  <div className="p-8 sm:p-10 space-y-4">
                    <p className="text-xs tracking-[0.22em] uppercase text-[#C7AD7A]">
                      01 · Design Ethos
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#F4F0E8]">
                      Precision Is Our Language.
                    </h2>
                    <p className="text-sm sm:text-base text-[#9A9A96] leading-relaxed">
                      Every contour serves a purpose. Explore why Asterion rejects decorative excess
                      in favour of disciplined proportion, quiet cabin ergonomics, and honest
                      materials.
                    </p>
                  </div>
                </div>

                <div className="px-8 sm:px-10 pb-9">
                  <button
                    type="button"
                    onClick={() => onNavigate('philosophy')}
                    className="inline-flex items-center gap-3 px-6 py-3.5 text-xs font-medium tracking-[0.18em] uppercase text-[#F4F0E8] border border-white/18 hover:border-[#C7AD7A] hover:text-[#C7AD7A] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                  >
                    <span>Read Our Philosophy</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            </Reveal>

            {/* Concise Engineering Teaser -> /engineering */}
            <Reveal delayMs={120} className="lg:col-span-6 flex">
              <article className="w-full border border-white/[0.09] bg-[#08090B] flex flex-col justify-between overflow-hidden group">
                <div>
                  <div className="overflow-hidden bg-[#0A0C0F]">
                    <ResilientImage
                      src={ASTERION_IMAGES.windTunnel}
                      alt="Side silhouette of an ASTERION hypercar in a dark wind tunnel with warm laminar airflow streamlines"
                      fallbackLabel="ENGINEERING MONOGRAPH"
                      className="aspect-[16/10] w-full"
                      imgClassName="group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                  </div>

                  <div className="p-8 sm:p-10 space-y-4">
                    <p className="text-xs tracking-[0.22em] uppercase text-[#C7AD7A]">
                      02 · Technical Architecture
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#F4F0E8]">
                      Engineering the Extraordinary.
                    </h2>
                    <p className="text-sm sm:text-base text-[#9A9A96] leading-relaxed">
                      Inspect internalised venturi aerodynamics, interactive driving regime
                      calibration, carbon-monocoque construction, and billet titanium suspension
                      hardware.
                    </p>
                  </div>
                </div>

                <div className="px-8 sm:px-10 pb-9">
                  <button
                    type="button"
                    onClick={() => onNavigate('engineering')}
                    className="inline-flex items-center gap-3 px-6 py-3.5 text-xs font-medium tracking-[0.18em] uppercase text-[#F4F0E8] border border-white/18 hover:border-[#C7AD7A] hover:text-[#C7AD7A] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                  >
                    <span>Explore Engineering</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            </Reveal>

            {/* Concise About ASTERION Teaser -> /about */}
            <Reveal delayMs={180} className="lg:col-span-12 flex">
              <article className="w-full grid grid-cols-1 lg:grid-cols-12 border border-white/[0.09] bg-[#08090B] items-stretch overflow-hidden group">
                <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between gap-8">
                  <div className="space-y-4 max-w-2xl">
                    <p className="text-xs tracking-[0.22em] uppercase text-[#C7AD7A]">
                      03 · About ASTERION
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#F4F0E8]">
                      Vision, Mission & The Concept Story.
                    </h2>
                    <p className="text-sm sm:text-base text-[#9A9A96] leading-relaxed">
                      Discover why ASTERION was envisioned as a forward-looking automotive concept
                      marque—bringing together purposeful engineering, distinctive design, and
                      immersive digital experiences.
                    </p>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => onNavigate('about')}
                      className="inline-flex items-center gap-3 px-6 py-3.5 text-xs font-medium tracking-[0.18em] uppercase text-[#F4F0E8] border border-white/18 hover:border-[#C7AD7A] hover:text-[#C7AD7A] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      <span>Discover About ASTERION</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 overflow-hidden bg-[#0A0C0F] border-t lg:border-t-0 lg:border-l border-white/[0.08]">
                  <ResilientImage
                    src={ASTERION_IMAGES.solaceGt}
                    alt="Sculpted ASTERION concept coupe outside a minimalist concrete pavilion at dusk"
                    fallbackLabel="ABOUT ASTERION"
                    className="aspect-[16/10] lg:aspect-auto lg:h-full w-full"
                    imgClassName="group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. FULL-WIDTH CINEMATIC CLOSER: "BUILT FOR THE MOMENT."
         ===================================================================== */}
      <section
        id="moment"
        ref={momentParallaxRef}
        aria-labelledby="moment-heading"
        className="relative w-full min-h-[70vh] lg:min-h-[80vh] flex items-end overflow-hidden bg-[#08090B]"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            style={{
              transform: `translate3d(0, ${momentOffsetY}px, 0) scale(1.07)`,
            }}
            className="w-full h-full will-change-transform transition-transform duration-150 ease-out"
          >
            <ResilientImage
              src={ASTERION_IMAGES.twilightDrive}
              alt="ASTERION hypercar carving along an elevated mountain pass road at deep twilight with warm glowing rear light blade"
              fallbackLabel="BUILT FOR THE MOMENT"
              className="w-full h-full"
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/55 to-[#08090B]/25"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#08090B]/80 via-transparent to-transparent"
          />
        </div>

        <div className="relative z-10 max-w-[1380px] w-full mx-auto px-6 lg:px-10 py-20 md:py-28">
          <Reveal variant="blur-focus">
            <div className="max-w-2xl space-y-6">
              <p className="text-xs tracking-[0.24em] uppercase text-[#C7AD7A]">
                Dynamic Composure
              </p>
              <h2
                id="moment-heading"
                className="font-display text-[clamp(2.4rem,5vw,4.5rem)] font-medium tracking-[-0.02em] leading-[1.04] text-[#F4F0E8]"
              >
                BUILT FOR THE MOMENT.
              </h2>
              <p className="text-lg md:text-xl text-[#F4F0E8]/85 leading-relaxed">
                Where engineering becomes emotion.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('vehicle')}
                  className="inline-flex items-center gap-3 px-7 py-4 text-xs font-medium tracking-[0.2em] uppercase text-[#08090B] bg-[#C7AD7A] hover:bg-[#D5BE90] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E8]"
                >
                  <span>DISCOVER THE MACHINE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-3 px-7 py-4 text-xs font-medium tracking-[0.2em] uppercase text-[#F4F0E8] border border-white/22 bg-[#08090B]/65 hover:border-[#C7AD7A] hover:text-[#C7AD7A] backdrop-blur-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                >
                  <span>PRIVATE CONSULTATION</span>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};
