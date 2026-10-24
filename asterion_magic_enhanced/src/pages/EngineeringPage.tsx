import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  ASTERION_IMAGES,
  DYNAMICS_REGIMES,
  DynamicsRegime,
  ENGINEERING_PRINCIPLES,
  VEHICLE_COLLECTION,
} from '../data/asterionData';
import {
  useAnimatedCounter,
  useInViewOnce,
  usePrefersReducedMotion,
  useSubtleParallax,
} from '../hooks/useMotionPreferences';
import { ResilientImage } from '../components/ResilientImage';
import { Reveal } from '../components/Reveal';
import { PageRoute } from '../components/Navbar';

interface EngineeringPageProps {
  onNavigate: (page: PageRoute, sectionId?: string) => void;
}

export const EngineeringPage: React.FC<EngineeringPageProps> = ({ onNavigate }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [heroEntered, setHeroEntered] = useState(false);
  const [selectedRegime, setSelectedRegime] = useState<DynamicsRegime>(DYNAMICS_REGIMES[1]);
  const { containerRef: heroParallaxRef, offsetY: heroParallaxY } = useSubtleParallax(20);

  useEffect(() => {
    if (prefersReducedMotion) {
      setHeroEntered(true);
      return;
    }
    const id = window.requestAnimationFrame(() => setHeroEntered(true));
    return () => window.cancelAnimationFrame(id);
  }, [prefersReducedMotion]);

  // Restrained Animated Counters for Technical Showcase
  const { ref: techStatsRef, inView: techStatsInView } = useInViewOnce<HTMLElement>(0.25);
  const dryMassCounter = useAnimatedCounter({
    target: 1340,
    decimals: 0,
    durationMs: 1650,
    startWhen: techStatsInView,
  });
  const rotorSizeCounter = useAnimatedCounter({
    target: 390,
    decimals: 0,
    durationMs: 1550,
    startWhen: techStatsInView,
  });
  const rearWeightCounter = useAnimatedCounter({
    target: 58,
    decimals: 0,
    durationMs: 1400,
    startWhen: techStatsInView,
  });

  const formattedDryMass = Number(dryMassCounter).toLocaleString('en-US');

  return (
    <main className="bg-[#08090B]">
      {/* =====================================================================
          A. CINEMATIC ENGINEERING PAGE HERO — CONTINUOUS MOVING STUDIO SCENE
         ===================================================================== */}
      <section
        ref={heroParallaxRef}
        aria-labelledby="engineering-hero-title"
        className="relative min-h-[84vh] lg:min-h-[88vh] w-full flex items-end overflow-hidden bg-[#08090B] pt-28 pb-20 md:pb-28 border-b border-white/[0.08]"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Outer Scroll-Depth Parallax Wrapper */}
          <div
            style={
              prefersReducedMotion
                ? undefined
                : { transform: `translate3d(0, ${heroParallaxY}px, 0)` }
            }
            className="w-full h-full will-change-transform"
          >
            {/* Entrance Reveal Wrapper */}
            <div
              className={`w-full h-full transition-opacity duration-1000 ease-out ${
                heroEntered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Continuous Commercial Camera Push-In + Angled Horizontal Drift */}
              <div
                className={`relative w-full h-full ${
                  prefersReducedMotion ? '' : 'animate-engineering-camera'
                }`}
              >
                <ResilientImage
                  src={ASTERION_IMAGES.windTunnel}
                  alt="Side silhouette of an ASTERION hypercar in a dark wind tunnel with luminous warm champagne airflow streamlines"
                  fallbackLabel="AERODYNAMIC ENGINEERING"
                  priority
                  className="w-full h-full"
                  imgClassName="object-[52%_center] md:object-center"
                />

                {/* Subtle Environmental Laminar Airflow Shimmer Aligned to Wind-Tunnel Streamlines */}
                {!prefersReducedMotion && (
                  <>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 1600 900"
                      preserveAspectRatio="xMidYMid slice"
                      className="absolute inset-0 w-full h-full mix-blend-screen animate-engineering-airflow"
                    >
                      <defs>
                        <linearGradient id="eng-stream-fade" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#C7AD7A" stopOpacity="0" />
                          <stop offset="28%" stopColor="#F4F0E8" stopOpacity="0.42" />
                          <stop offset="68%" stopColor="#C7AD7A" stopOpacity="0.55" />
                          <stop offset="100%" stopColor="#C7AD7A" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M -80 515 C 290 508, 470 432, 760 392 C 1030 356, 1260 398, 1680 382"
                        fill="none"
                        stroke="url(#eng-stream-fade)"
                        strokeWidth="2.2"
                      />
                      <path
                        d="M -60 548 C 320 542, 510 468, 800 422 C 1060 382, 1280 425, 1680 412"
                        fill="none"
                        stroke="url(#eng-stream-fade)"
                        strokeWidth="1.4"
                        opacity="0.7"
                      />
                      <path
                        d="M -40 608 C 360 604, 680 598, 1080 578 C 1320 566, 1490 548, 1680 536"
                        fill="none"
                        stroke="url(#eng-stream-fade)"
                        strokeWidth="1.2"
                        opacity="0.48"
                      />
                    </svg>

                    {/* Controlled Specular Studio Light Sweep Across Roofline & Rear Haunch */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-y-0 -inset-x-[20%] bg-[linear-gradient(102deg,transparent_36%,rgba(199,173,122,0.14)_48%,rgba(244,240,232,0.18)_50%,rgba(199,173,122,0.08)_53%,transparent_64%)] mix-blend-screen animate-engineering-specular"
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Multi-Directional Architectural Contrast Scrims Preserving Crisp Headline Readability */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/58 to-[#08090B]/32"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#08090B]/88 via-[#08090B]/44 to-transparent"
          />
        </div>

        {/* Stable Foreground Editorial Typography */}
        <div className="relative z-10 max-w-[1380px] w-full mx-auto px-6 lg:px-10">
          <div className="max-w-3xl space-y-6">
            <p
              className={`text-xs tracking-[0.24em] uppercase text-[#C7AD7A] transition-[opacity,transform] duration-700 delay-100 ease-out ${
                heroEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Asterion Technical Monograph · Concept Architecture
            </p>

            <h1
              id="engineering-hero-title"
              className={`font-display text-[clamp(2.4rem,5.4vw,4.75rem)] font-medium tracking-[-0.025em] leading-[1.03] text-[#F4F0E8] transition-[opacity,transform] duration-700 delay-200 ease-out ${
                heroEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              ENGINEERING THE EXTRAORDINARY.
            </h1>

            <p
              className={`text-lg md:text-xl text-[#F4F0E8]/85 leading-relaxed max-w-xl transition-[opacity,transform] duration-700 delay-300 ease-out ${
                heroEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              Behind every remarkable form lies a deliberate idea.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          B. DESIGN & ENGINEERING PHILOSOPHY
         ===================================================================== */}
      <section
        aria-labelledby="design-philosophy-heading"
        className="py-24 md:py-32 bg-[#131519] border-b border-white/[0.08]"
      >
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <Reveal>
                <p className="text-xs tracking-[0.22em] uppercase text-[#C7AD7A]">
                  Holistic Integration
                </p>
                <h2
                  id="design-philosophy-heading"
                  className="font-display text-[clamp(1.85rem,3.4vw,3rem)] font-medium tracking-[-0.02em] leading-[1.1] text-[#F4F0E8] mt-3"
                >
                  Form and mechanics conceived as a single gesture.
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <Reveal delayMs={100}>
                <p className="text-base md:text-lg leading-relaxed text-[#F4F0E8]/90">
                  In the Asterion concept studio, stylists and chassis architects work from the same
                  centreline drawing. Rather than disguising mechanical structures beneath decorative
                  cladding, load paths, cooling ducts, and cabin ergonomics define the vehicle’s
                  proportions from day one.
                </p>
              </Reveal>

              <Reveal delayMs={180}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/[0.08]">
                  <div className="space-y-2">
                    <p className="text-xs tracking-[0.18em] uppercase text-[#C7AD7A]">
                      Surface Honesty
                    </p>
                    <p className="text-sm text-[#9A9A96] leading-relaxed">
                      Every intake aperture feeds an active thermal or venturi pathway—zero blanked
                      grilles.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs tracking-[0.18em] uppercase text-[#C7AD7A]">
                      Mass Centralisation
                    </p>
                    <p className="text-sm text-[#9A9A96] leading-relaxed">
                      Heavy powertrain and energy components sit tight within the wheelbase for
                      effortless yaw agility.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs tracking-[0.18em] uppercase text-[#C7AD7A]">
                      Tactile Clarity
                    </p>
                    <p className="text-sm text-[#9A9A96] leading-relaxed">
                      Controls prioritise eyes-up confidence through weighted mechanical feedback.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          C. THREE ENGINEERING PILLARS
         ===================================================================== */}
      <section
        id="pillars"
        aria-label="Three Engineering Pillars"
        className="py-24 md:py-36 bg-[#08090B] border-b border-white/[0.08] scroll-mt-16"
      >
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10 space-y-24 md:space-y-32">
          {ENGINEERING_PRINCIPLES.map((pillar, idx) => {
            const imageFirstOnDesktop = idx % 2 === 1;
            return (
              <div
                key={pillar.number}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                <div
                  className={`lg:col-span-6 ${
                    imageFirstOnDesktop ? 'lg:order-2' : 'lg:order-1'
                  } space-y-6`}
                >
                  <Reveal>
                    <div className="flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-[#C7AD7A]">
                      <span className="font-mono text-sm">{pillar.number}</span>
                      <span aria-hidden="true" className="text-white/25">—</span>
                      <span>Engineering Pillar</span>
                    </div>

                    <h2 className="font-display text-[clamp(1.9rem,3.4vw,3rem)] font-medium tracking-[-0.015em] text-[#F4F0E8] mt-3">
                      {pillar.title}
                    </h2>

                    <p className="text-base md:text-lg text-[#F4F0E8]/90 leading-relaxed mt-4">
                      “{pillar.quote}”
                    </p>

                    <p className="text-sm md:text-base text-[#9A9A96] leading-relaxed mt-4">
                      {pillar.elaboration}
                    </p>

                    <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between text-xs">
                      <span className="tracking-[0.16em] uppercase text-[#9A9A96]">
                        {pillar.metricLabel}
                      </span>
                      <span className="font-mono text-[#C7AD7A]">{pillar.metricValue}</span>
                    </div>
                  </Reveal>
                </div>

                <div
                  className={`lg:col-span-6 ${
                    imageFirstOnDesktop ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <Reveal variant="scale-in" delayMs={100}>
                    <div className="border border-white/[0.09] bg-[#131519] overflow-hidden">
                      <ResilientImage
                        src={pillar.image}
                        alt={pillar.alt}
                        fallbackLabel={pillar.title}
                        className="aspect-[16/10] w-full"
                      />
                    </div>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          D. INTERACTIVE FEATURE: AERODYNAMICS & DYNAMICS REGIME EXPLORER
         ===================================================================== */}
      <section
        id="dynamics-lab"
        aria-labelledby="dynamics-lab-heading"
        className="py-24 md:py-36 bg-[#131519] border-b border-white/[0.08] scroll-mt-16"
      >
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10 space-y-12">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <p className="text-xs tracking-[0.24em] uppercase text-[#C7AD7A]">
                  Interactive Concept Study
                </p>
                <h2
                  id="dynamics-lab-heading"
                  className="font-display text-[clamp(2rem,3.6vw,3.2rem)] font-medium tracking-[-0.02em] text-[#F4F0E8]"
                >
                  Active Aerodynamic Regime Explorer
                </h2>
              </div>
              <p className="text-sm text-[#9A9A96] max-w-md leading-relaxed">
                Select a driving regime below to inspect how the fictional Asterion Apex concept
                recalibrates its front splitter, rear wing camber, and underbody airflow balance.
              </p>
            </div>
          </Reveal>

          <Reveal variant="scale-in" delayMs={80}>
            <div className="border border-white/[0.09] bg-[#08090B]">
              {/* Regime Selector Buttons */}
              <div
                role="tablist"
                aria-label="Aerodynamic operating regimes"
                className="grid grid-cols-1 sm:grid-cols-3 border-b border-white/[0.08]"
              >
                {DYNAMICS_REGIMES.map((regime, idx) => {
                  const active = selectedRegime.id === regime.id;
                  return (
                    <button
                      key={regime.id}
                      role="tab"
                      type="button"
                      aria-selected={active}
                      onClick={() => setSelectedRegime(regime)}
                      className={`p-5 md:p-6 text-left transition-colors duration-150 border-b sm:border-b-0 sm:border-r last:border-r-0 border-white/[0.08] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#C7AD7A] ${
                        active
                          ? 'bg-[#171A20] border-t-2 border-t-[#C7AD7A]'
                          : 'bg-[#0C0E12] hover:bg-[#131519]'
                      }`}
                    >
                      <span className="font-mono text-xs text-[#C7AD7A] block mb-1">
                        0{idx + 1}
                      </span>
                      <span className="font-display text-lg font-medium text-[#F4F0E8] block">
                        {regime.name}
                      </span>
                      <span className="text-xs text-[#9A9A96] mt-1 block line-clamp-1">
                        {regime.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Interactive SVG Laminar Streamline Diagram + Live Telemetry */}
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col justify-between bg-[#090B0E]">
                  <div className="flex items-center justify-between text-xs text-[#9A9A96] mb-6">
                    <span className="tracking-[0.16em] uppercase">
                      Laminar Profile Simulation — {selectedRegime.name}
                    </span>
                    <span className="font-mono text-[#C7AD7A]">
                      {selectedRegime.downforceDistribution}
                    </span>
                  </div>

                  {/* Architectural SVG Wind-Tunnel Vector Graphic */}
                  <div className="my-4">
                    <svg
                      viewBox="0 0 680 230"
                      className="w-full h-auto"
                      role="img"
                      aria-label={`Airflow schematic for ${selectedRegime.name}`}
                    >
                      {/* Subtle Ground Plane */}
                      <line
                        x1="20"
                        y1="192"
                        x2="660"
                        y2="192"
                        stroke="rgba(244,240,232,0.14)"
                        strokeWidth="1"
                      />

                      {/* Dynamic Upper Laminar Streamlines */}
                      {[0, 1, 2].map((lineIdx) => {
                        const baseY = 66 + lineIdx * 20;
                        const lift = selectedRegime.streamlineCurvature + lineIdx * 4;
                        return (
                          <path
                            key={lineIdx}
                            d={`M 24 ${baseY + 42} C 160 ${baseY + 38}, 250 ${baseY - lift}, 390 ${
                              baseY - lift + 6
                            } C 490 ${baseY}, 560 ${baseY - lift * 0.65}, 656 ${
                              baseY - lift * 0.85
                            }`}
                            fill="none"
                            stroke="#C7AD7A"
                            strokeOpacity={0.75 - lineIdx * 0.2}
                            strokeWidth={lineIdx === 0 ? '1.8' : '1.1'}
                          />
                        );
                      })}

                      {/* Underbody Venturi Streamline */}
                      <path
                        d={`M 36 178 L 195 180 Q 340 ${
                          186 - selectedRegime.streamlineCurvature * 0.25
                        } 545 174 L 656 ${168 - selectedRegime.streamlineCurvature * 0.4}`}
                        fill="none"
                        stroke="#F4F0E8"
                        strokeOpacity="0.45"
                        strokeDasharray="5 4"
                        strokeWidth="1.2"
                      />

                      {/* Sculpted Hypercar Concept Profile Silhouette */}
                      <path
                        d="M 118 174 L 154 156 C 195 144, 240 138, 286 116 C 328 97, 388 98, 444 120 C 488 134, 526 132, 566 136 L 574 166 L 540 175 L 132 175 Z"
                        fill="#131519"
                        stroke="#F4F0E8"
                        strokeOpacity="0.65"
                        strokeWidth="1.5"
                      />

                      {/* Active Front Splitter Indicator */}
                      <line
                        x1="106"
                        y1={174 + selectedRegime.streamlineCurvature * 0.12}
                        x2="148"
                        y2="174"
                        stroke="#C7AD7A"
                        strokeWidth="3"
                      />

                      {/* Active Rear Foil Indicator */}
                      <line
                        x1="546"
                        y1={126 - selectedRegime.streamlineCurvature * 0.35}
                        x2="584"
                        y2="132"
                        stroke="#C7AD7A"
                        strokeWidth="3"
                      />

                      {/* Wheels */}
                      <circle
                        cx="212"
                        cy="168"
                        r="22"
                        fill="#08090B"
                        stroke="rgba(244,240,232,0.5)"
                        strokeWidth="1.5"
                      />
                      <circle cx="212" cy="168" r="6" fill="#C7AD7A" />
                      <circle
                        cx="488"
                        cy="168"
                        r="23"
                        fill="#08090B"
                        stroke="rgba(244,240,232,0.5)"
                        strokeWidth="1.5"
                      />
                      <circle cx="488" cy="168" r="6" fill="#C7AD7A" />
                    </svg>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.08]">
                    <div>
                      <p className="text-[11px] tracking-[0.14em] uppercase text-[#9A9A96]">
                        Front Splitter
                      </p>
                      <p className="font-mono text-xs sm:text-sm text-[#F4F0E8] mt-1">
                        {selectedRegime.splitterAngle}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] tracking-[0.14em] uppercase text-[#9A9A96]">
                        Rear Foil Trim
                      </p>
                      <p className="font-mono text-xs sm:text-sm text-[#F4F0E8] mt-1">
                        {selectedRegime.rearWingState}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] tracking-[0.14em] uppercase text-[#9A9A96]">
                        Ride Height Delta
                      </p>
                      <p className="font-mono text-xs sm:text-sm text-[#F4F0E8] mt-1">
                        {selectedRegime.rideHeightDelta}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Regime Engineering Notes */}
                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <p className="text-xs tracking-[0.2em] uppercase text-[#C7AD7A]">
                        Airflow Management
                      </p>
                      <p className="text-sm sm:text-base text-[#F4F0E8]/90 leading-relaxed">
                        {selectedRegime.airflowSummary}
                      </p>
                    </div>

                    <div className="space-y-2 pt-6 border-t border-white/[0.08]">
                      <p className="text-xs tracking-[0.2em] uppercase text-[#C7AD7A]">
                        Chassis Calibration
                      </p>
                      <p className="text-sm text-[#9A9A96] leading-relaxed">
                        {selectedRegime.chassisBehaviour}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#9A9A96]/75 pt-4 border-t border-white/[0.07]">
                    Concept schematic illustrating theoretical active aerodynamic trim states.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================================
          E. TECHNICAL SHOWCASE & COMPARATIVE SPECIFICATION MATRIX
         ===================================================================== */}
      <section
        id="technical-showcase"
        ref={techStatsRef}
        aria-labelledby="tech-showcase-heading"
        className="py-24 md:py-32 bg-[#08090B] border-b border-white/[0.08]"
      >
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10 space-y-16">
          <Reveal>
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs tracking-[0.24em] uppercase text-[#C7AD7A]">
                Concept Architecture Metrics
              </p>
              <h2
                id="tech-showcase-heading"
                className="font-display text-[clamp(2rem,3.6vw,3.1rem)] font-medium tracking-[-0.02em] text-[#F4F0E8]"
              >
                Measured down to the gram.
              </h2>
            </div>
          </Reveal>

          {/* Animated Engineering Counters */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08] border-y border-white/[0.08]">
            <div className="py-9 md:pr-10 space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="font-mono tabular-nums text-4xl md:text-5xl text-[#F4F0E8]">
                  {formattedDryMass}
                </span>
                <span className="text-sm font-mono uppercase text-[#C7AD7A]">KG</span>
              </div>
              <p className="text-xs tracking-[0.18em] uppercase text-[#9A9A96]">
                Apex Concept Dry Mass Target
              </p>
            </div>

            <div className="py-9 md:px-10 space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="font-mono tabular-nums text-4xl md:text-5xl text-[#F4F0E8]">
                  { 100 - Number(rearWeightCounter) } : {rearWeightCounter}
                </span>
                <span className="text-sm font-mono uppercase text-[#C7AD7A]">%</span>
              </div>
              <p className="text-xs tracking-[0.18em] uppercase text-[#9A9A96]">
                Front-to-Rear Static Balance
              </p>
            </div>

            <div className="py-9 md:pl-10 space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="font-mono tabular-nums text-4xl md:text-5xl text-[#F4F0E8]">
                  {rotorSizeCounter}
                </span>
                <span className="text-sm font-mono uppercase text-[#C7AD7A]">MM</span>
              </div>
              <p className="text-xs tracking-[0.18em] uppercase text-[#9A9A96]">
                Front Carbon-Matrix Concept Disc
              </p>
            </div>
          </div>

          {/* Comparative Concept Lineup Table */}
          <Reveal>
            <div className="overflow-x-auto border border-white/[0.08] bg-[#131519]">
              <table className="w-full text-left border-collapse min-w-[620px]">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-[#0C0E12] text-[11px] tracking-[0.18em] uppercase text-[#9A9A96]">
                    <th className="py-4 px-6 font-medium">Concept Model</th>
                    <th className="py-4 px-6 font-medium">Category</th>
                    <th className="py-4 px-6 font-medium">0–100 km/h</th>
                    <th className="py-4 px-6 font-medium">Top Speed</th>
                    <th className="py-4 px-6 font-medium">Concept Output</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.07] text-sm">
                  {VEHICLE_COLLECTION.map((v) => (
                    <tr key={v.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 font-display font-medium text-[#F4F0E8]">
                        {v.name}
                      </td>
                      <td className="py-4 px-6 text-[#9A9A96]">{v.category}</td>
                      <td className="py-4 px-6 font-mono tabular-nums text-[#F4F0E8]">
                        {v.specs[0]?.value}
                      </td>
                      <td className="py-4 px-6 font-mono tabular-nums text-[#F4F0E8]">
                        {v.specs[1]?.value}
                      </td>
                      <td className="py-4 px-6 font-mono tabular-nums text-[#C7AD7A]">
                        {v.specs[2]?.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================================
          F. MATERIALS AND DETAILS
         ===================================================================== */}
      <section
        id="materials"
        aria-labelledby="materials-heading"
        className="py-24 md:py-36 bg-[#131519] border-b border-white/[0.08] scroll-mt-16"
      >
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10 space-y-14">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3">
                <p className="text-xs tracking-[0.24em] uppercase text-[#C7AD7A]">
                  Material Craftsmanship
                </p>
                <h2
                  id="materials-heading"
                  className="font-display text-[clamp(2rem,3.6vw,3.1rem)] font-medium tracking-[-0.02em] text-[#F4F0E8]"
                >
                  Honest materials, machined with precision.
                </h2>
              </div>
              <p className="text-sm text-[#9A9A96] max-w-md leading-relaxed">
                Every visible surface inside and beneath an Asterion concept expresses its true
                structural material—never simulated finishes.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <Reveal className="lg:col-span-7 flex">
              <div className="w-full border border-white/[0.09] bg-[#08090B] flex flex-col justify-between">
                <ResilientImage
                  src={ASTERION_IMAGES.carbonTitanium}
                  alt="Macro detail of matte woven carbon-fibre monocoque joined to a champagne-anodised billet titanium suspension bracket"
                  fallbackLabel="CARBON & BILLET TITANIUM"
                  className="aspect-[16/10] w-full"
                />
                <div className="p-7 sm:p-8 space-y-2 border-t border-white/[0.08]">
                  <p className="text-xs tracking-[0.18em] uppercase text-[#C7AD7A]">
                    01 · Monocoque & Suspension Hardware
                  </p>
                  <h3 className="font-display text-xl font-medium text-[#F4F0E8]">
                    Woven Carbon-Fibre & Anodised Titanium
                  </h3>
                  <p className="text-sm text-[#9A9A96] leading-relaxed">
                    High-modulus twill carbon weave meets 5-axis CNC-milled titanium suspension
                    clevises, uniting torsional rigidity with jewellery-grade mechanical finish.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={120} className="lg:col-span-5 flex">
              <div className="w-full border border-white/[0.09] bg-[#08090B] flex flex-col justify-between">
                <ResilientImage
                  src={ASTERION_IMAGES.driverCockpit}
                  alt="Close-up of bespoke charcoal alcantara cockpit interior and knurled champagne aluminium rotary switchgear"
                  fallbackLabel="CABIN SWITCHGEAR"
                  className="aspect-[4/3] w-full"
                />
                <div className="p-7 sm:p-8 space-y-2 border-t border-white/[0.08]">
                  <p className="text-xs tracking-[0.18em] uppercase text-[#C7AD7A]">
                    02 · Tactile Cabin Architecture
                  </p>
                  <h3 className="font-display text-xl font-medium text-[#F4F0E8]">
                    Charcoal Alcantara & Forged Carbon
                  </h3>
                  <p className="text-sm text-[#9A9A96] leading-relaxed">
                    Non-reflective alcantara eliminates windshield glare while knurled champagne
                    rotary dials offer crisp tactile authority in any driving environment.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* 03 · Optical Lighting & Rear Bodywork Integration */}
          <Reveal delayMs={160}>
            <div className="grid grid-cols-1 lg:grid-cols-12 border border-white/[0.09] bg-[#08090B] items-stretch overflow-hidden">
              <div className="lg:col-span-6 p-7 sm:p-10 flex flex-col justify-center space-y-4 border-b lg:border-b-0 lg:border-r border-white/[0.08]">
                <p className="text-xs tracking-[0.18em] uppercase text-[#C7AD7A]">
                  03 · Optical Engineering & Bodywork
                </p>
                <h3 className="font-display text-2xl font-medium text-[#F4F0E8]">
                  Precision LED Light Blades & Thermal Exit Channels
                </h3>
                <p className="text-sm sm:text-base text-[#9A9A96] leading-relaxed">
                  Rather than treating lighting as surface trim, Asterion recesses ultra-thin solid
                  optical light guides directly within functional trailing-edge cooling apertures—uniting
                  high-contrast nocturnal visibility with clean aerodynamic wake separation.
                </p>
              </div>

              <div className="lg:col-span-6">
                <ResilientImage
                  src={ASTERION_IMAGES.awakenCrimsonRain}
                  alt="Rear three-quarter nocturnal detail showing crimson LED optical blades recessed into sculpted black carbon bodywork"
                  fallbackLabel="OPTICAL SIGNATURE STUDY"
                  className="aspect-[16/9] lg:aspect-auto lg:h-full w-full"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================================
          G. FINAL CALL TO ACTION: THE MACHINE, PHILOSOPHY & HOME
         ===================================================================== */}
      <section
        aria-labelledby="engineering-final-cta"
        className="relative py-24 md:py-32 bg-[#08090B] overflow-hidden"
      >
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
          <Reveal variant="scale-in">
            <div className="relative border border-white/[0.1] bg-[#131519] overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between gap-8">
                  <div className="space-y-4">
                    <p className="text-xs tracking-[0.24em] uppercase text-[#C7AD7A]">
                      Experience The Flagship
                    </p>
                    <h2
                      id="engineering-final-cta"
                      className="font-display text-[clamp(2rem,3.6vw,3.2rem)] font-medium tracking-[-0.02em] leading-[1.08] text-[#F4F0E8]"
                    >
                      Witness these principles united in The Machine.
                    </h2>
                    <p className="text-sm sm:text-base text-[#9A9A96] leading-relaxed max-w-lg">
                      Visit the dedicated Asterion Apex showcase to configure exterior finishes, or
                      explore our design philosophy monograph.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => onNavigate('vehicle')}
                      className="inline-flex items-center justify-center gap-3 px-6 py-4 text-xs font-medium tracking-[0.18em] uppercase text-[#08090B] bg-[#C7AD7A] hover:bg-[#D5BE90] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E8]"
                    >
                      <span>Explore The Machine</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigate('philosophy')}
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-xs font-medium tracking-[0.18em] uppercase text-[#F4F0E8] border border-white/18 hover:border-[#C7AD7A] hover:text-[#C7AD7A] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      <span>Our Philosophy</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigate('home')}
                      className="inline-flex items-center justify-center gap-2.5 px-5 py-4 text-xs font-medium tracking-[0.18em] uppercase text-[#9A9A96] hover:text-[#F4F0E8] border border-white/10 hover:border-white/25 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Home</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 min-h-[260px]">
                  <ResilientImage
                    src={ASTERION_IMAGES.apexObsidian}
                    alt="ASTERION APEX hypercar concept in satin Obsidian Black"
                    fallbackLabel="ASTERION APEX"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};
