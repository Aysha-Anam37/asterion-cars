import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import {
  APEX_SPECIFICATION_GROUPS,
  ASTERION_IMAGES,
  ConceptVehicle,
  VEHICLE_COLLECTION,
} from '../data/asterionData';
import { usePrefersReducedMotion, useSubtleParallax } from '../hooks/useMotionPreferences';
import { Asterion3DShowroom } from '../components/Asterion3DShowroom';
import { FeaturedVehicle } from '../components/FeaturedVehicle';
import { PageRoute } from '../components/Navbar';
import { ResilientImage } from '../components/ResilientImage';
import { Reveal } from '../components/Reveal';

interface VehiclePageProps {
  onNavigate: (page: PageRoute, sectionId?: string) => void;
  onOpenDossier: (vehicle: ConceptVehicle) => void;
}

export const VehiclePage: React.FC<VehiclePageProps> = ({ onNavigate, onOpenDossier }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [heroEntered, setHeroEntered] = useState(false);
  const { containerRef: rearStudyRef, offsetY: rearStudyOffset } = useSubtleParallax(20);

  const flagship = VEHICLE_COLLECTION[0];
  const companionConcepts = VEHICLE_COLLECTION.slice(1);

  useEffect(() => {
    if (prefersReducedMotion) {
      setHeroEntered(true);
      return;
    }
    const id = window.requestAnimationFrame(() => setHeroEntered(true));
    return () => window.cancelAnimationFrame(id);
  }, [prefersReducedMotion]);

  return (
    <main className="bg-[#08090B]">
      {/* =====================================================================
          1. IMMERSIVE VEHICLE HERO: THE MACHINE — ASTERION APEX
         ===================================================================== */}
      <section
        aria-labelledby="vehicle-page-title"
        className="relative min-h-[86vh] lg:min-h-[92vh] w-full flex flex-col justify-end overflow-hidden bg-[#08090B] pt-28 pb-14 md:pb-20 border-b border-white/[0.08]"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className={`w-full h-full transition-[opacity,transform] duration-[1250ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              heroEntered ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.04]'
            }`}
          >
            <ResilientImage
              src={ASTERION_IMAGES.apexObsidian}
              alt="ASTERION APEX flagship concept hypercar in satin Obsidian Black with forged champagne wheels in a dark monolithic studio"
              fallbackLabel="ASTERION APEX · THE MACHINE"
              priority
              className="w-full h-full"
              imgClassName="object-[56%_center] md:object-center"
            />
          </div>

          {/* Controlled Contrast Scrims */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/48 to-[#08090B]/45 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#08090B]/90 via-[#08090B]/42 to-transparent pointer-events-none"
          />
        </div>

        <div className="relative z-10 max-w-[1380px] w-full mx-auto px-6 lg:px-10 space-y-12">
          <div className="max-w-3xl space-y-6">
            <p
              className={`text-xs tracking-[0.26em] uppercase text-[#C7AD7A] transition-[opacity,transform] duration-700 delay-100 ease-out ${
                heroEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              The Machine · Flagship Concept Study
            </p>

            <h1
              id="vehicle-page-title"
              className={`font-display text-[clamp(2.6rem,5.8vw,5.1rem)] font-medium tracking-[-0.025em] leading-[1.02] text-[#F4F0E8] transition-[opacity,transform] duration-700 delay-200 ease-out ${
                heroEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              ASTERION APEX.
            </h1>

            <p
              className={`text-base sm:text-lg md:text-xl text-[#F4F0E8]/85 leading-relaxed max-w-xl transition-[opacity,transform] duration-700 delay-300 ease-out ${
                heroEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              {flagship.description}
            </p>

            <div
              className={`pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 transition-[opacity,transform] duration-700 delay-[380ms] ease-out ${
                heroEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              <button
                type="button"
                onClick={() => onNavigate('vehicle', 'showroom-3d')}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 text-xs font-medium tracking-[0.2em] uppercase text-[#08090B] bg-[#C7AD7A] hover:bg-[#D5BE90] active:scale-[0.98] transition-[background-color,transform] duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E8]"
              >
                <span>EXPLORE IN 3D</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('vehicle', 'studio-stage')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-xs font-medium tracking-[0.2em] uppercase text-[#F4F0E8] border border-white/20 bg-[#08090B]/55 hover:border-[#C7AD7A] hover:text-[#C7AD7A] backdrop-blur-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
              >
                <span>BESPOKE STUDIO</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('engineering')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-xs font-medium tracking-[0.2em] uppercase text-[#9A9A96] hover:text-[#F4F0E8] border border-white/12 bg-[#08090B]/45 hover:border-white/30 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
              >
                <span>ENGINEERING</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Full-Width Concept Benchmark Strip */}
          <div className="pt-8 border-t border-white/[0.1] grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {flagship.specs.map((spec) => (
              <div key={spec.label} className="space-y-1">
                <p className="text-[11px] tracking-[0.18em] uppercase text-[#9A9A96]">
                  {spec.label}
                </p>
                <p className="font-mono tabular-nums text-2xl sm:text-3xl font-normal text-[#F4F0E8]">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. INTERACTIVE REAL-TIME 3D SHOWROOM
         ===================================================================== */}
      <Asterion3DShowroom sectionId="showroom-3d" />

      {/* =====================================================================
          3. INTERACTIVE MULTI-ANGLE & BESPOKE FINISH STUDIO STAGE
         ===================================================================== */}
      <FeaturedVehicle
        sectionId="studio-stage"
        onOpenDossier={onOpenDossier}
        onNavigate={onNavigate}
      />

      {/* =====================================================================
          3. EXTERIOR SCULPTURE, OPTICAL LIGHTING & COCKPIT HIGHLIGHTS
         ===================================================================== */}
      <section
        id="design-highlights"
        ref={rearStudyRef}
        aria-labelledby="design-highlights-heading"
        className="py-24 md:py-36 bg-[#131519] border-b border-white/[0.08] scroll-mt-16"
      >
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10 space-y-20">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-white/[0.08]">
              <div className="space-y-3 max-w-2xl">
                <p className="text-xs tracking-[0.24em] uppercase text-[#C7AD7A]">
                  Exterior & Cabin Studies
                </p>
                <h2
                  id="design-highlights-heading"
                  className="font-display text-[clamp(2rem,3.8vw,3.3rem)] font-medium tracking-[-0.02em] leading-[1.08] text-[#F4F0E8]"
                >
                  Every angle composed with architectural restraint.
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#9A9A96] max-w-md leading-relaxed">
                From the razor-edged rear optical blades to the machined cockpit switchgear, each
                detail serves aerodynamic stability and driver clarity.
              </p>
            </div>
          </Reveal>

          {/* Feature Study 01: Crimson Rear Signature & Nocturnal Stance */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <Reveal variant="scale-in">
                <div className="overflow-hidden border border-white/[0.09] bg-[#08090B]">
                  <div
                    style={{
                      transform: `translate3d(0, ${rearStudyOffset}px, 0) scale(1.05)`,
                    }}
                    className="will-change-transform transition-transform duration-150 ease-out"
                  >
                    <ResilientImage
                      src={ASTERION_IMAGES.awakenCrimsonRain}
                      alt="Low rear three-quarter view of the unbadged obsidian ASTERION coupe in nocturnal rain with vivid crimson LED rear light blades"
                      fallbackLabel="CRIMSON REAR SIGNATURE"
                      className="aspect-[16/10] w-full"
                    />
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <Reveal delayMs={100}>
                <p className="text-xs tracking-[0.22em] uppercase text-[#C7AD7A]">
                  01 · Optical Identity
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#F4F0E8] mt-2">
                  Sculpted Crimson Rear Signature
                </h3>
                <p className="text-sm sm:text-base text-[#9A9A96] leading-relaxed mt-4">
                  Recessed within the trailing carbon deck, twin directional crimson LED blades
                  emphasise the vehicle’s planted rear track while venting hot boundary air from the
                  engine bay below.
                </p>
                <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#9A9A96]">
                  <span>Trailing Deck Width</span>
                  <span className="font-mono text-[#C7AD7A]">2,015 mm Concept Stance</span>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Feature Study 02 & 03: Asymmetric Detail Diptych */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <Reveal className="lg:col-span-6 flex">
              <article className="w-full border border-white/[0.09] bg-[#08090B] flex flex-col justify-between overflow-hidden">
                <ResilientImage
                  src={ASTERION_IMAGES.aeroSculpture}
                  alt="Close-up of sculpted carbon-fibre flying buttress and swan-neck rear wing pylon"
                  fallbackLabel="AERODYNAMIC BUTTRESS"
                  className="aspect-[16/10] w-full"
                />
                <div className="p-7 sm:p-9 space-y-3 border-t border-white/[0.08]">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#C7AD7A]">
                    02 · Laminar Bodywork
                  </p>
                  <h3 className="font-display text-xl sm:text-2xl font-medium text-[#F4F0E8]">
                    Flying Buttress & Swan-Neck Foil
                  </h3>
                  <p className="text-sm text-[#9A9A96] leading-relaxed">
                    Top-mounted carbon pylons leave the high-suction underside of the active rear
                    wing undisturbed, feeding clean freestream air toward the diffuser exit.
                  </p>
                </div>
              </article>
            </Reveal>

            <Reveal delayMs={120} className="lg:col-span-6 flex">
              <article className="w-full border border-white/[0.09] bg-[#08090B] flex flex-col justify-between overflow-hidden">
                <ResilientImage
                  src={ASTERION_IMAGES.driverCockpit}
                  alt="Driver-focused hypercar cockpit with charcoal alcantara steering wheel and machined champagne rotary dials"
                  fallbackLabel="DRIVER COCKPIT"
                  className="aspect-[16/10] w-full"
                />
                <div className="p-7 sm:p-9 space-y-3 border-t border-white/[0.08]">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#C7AD7A]">
                    03 · Interior Architecture
                  </p>
                  <h3 className="font-display text-xl sm:text-2xl font-medium text-[#F4F0E8]">
                    Driver-Axis Cockpit & Billet Switchgear
                  </h3>
                  <p className="text-sm text-[#9A9A96] leading-relaxed">
                    Matte charcoal alcantara eliminates windshield reflections at night while
                    knurled champagne-anodised rotary controls deliver crisp mechanical feedback.
                  </p>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. REFINED CONCEPT TECHNICAL SPECIFICATION SECTION
         ===================================================================== */}
      <section
        id="specifications"
        aria-labelledby="vehicle-specs-heading"
        className="py-24 md:py-36 bg-[#08090B] border-b border-white/[0.08] scroll-mt-16"
      >
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10 space-y-14">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]">
              <div className="space-y-3 max-w-2xl">
                <p className="text-xs tracking-[0.24em] uppercase text-[#C7AD7A]">
                  Technical Monograph · Asterion Apex
                </p>
                <h2
                  id="vehicle-specs-heading"
                  className="font-display text-[clamp(2rem,3.6vw,3.2rem)] font-medium tracking-[-0.02em] text-[#F4F0E8]"
                >
                  Concept Specification Architecture
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#9A9A96] max-w-md leading-relaxed">
                Fictional concept design specifications established for the Asterion Apex creative
                engineering study. Not representative of a commercial production vehicle.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {APEX_SPECIFICATION_GROUPS.map((group, idx) => (
              <Reveal key={group.category} delayMs={idx * 80}>
                <div className="h-full border border-white/[0.09] bg-[#131519] p-7 sm:p-9 space-y-6">
                  <h3 className="font-display text-lg sm:text-xl font-medium text-[#C7AD7A]">
                    {group.category}
                  </h3>
                  <dl className="divide-y divide-white/[0.07]">
                    {group.items.map((item) => (
                      <div
                        key={item.label}
                        className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4"
                      >
                        <dt className="text-xs tracking-[0.12em] uppercase text-[#9A9A96]">
                          {item.label}
                        </dt>
                        <dd className="font-mono tabular-nums text-sm text-[#F4F0E8] sm:text-right">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. COMPANION CONCEPT EXPRESSIONS: SOLACE & VOLT
         ===================================================================== */}
      <section
        id="collection"
        aria-labelledby="companion-collection-heading"
        className="py-24 md:py-36 bg-[#131519] border-b border-white/[0.08] scroll-mt-16"
      >
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10 space-y-14">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]">
              <div className="space-y-3">
                <p className="text-xs tracking-[0.24em] uppercase text-[#C7AD7A]">
                  Portfolio Studies · 02 & 03
                </p>
                <h2
                  id="companion-collection-heading"
                  className="font-display text-[clamp(2rem,3.6vw,3.2rem)] font-medium tracking-[-0.02em] text-[#F4F0E8]"
                >
                  Companion Concept Expressions
                </h2>
              </div>
              <p className="text-sm text-[#9A9A96] max-w-md leading-relaxed">
                Alongside the mid-engine Apex flagship, two sibling design studies explore grand
                touring serenity and silent quad-motor propulsion.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {companionConcepts.map((vehicle, idx) => (
              <Reveal key={vehicle.id} delayMs={idx * 110} className="lg:col-span-6 flex">
                <article className="w-full flex flex-col justify-between border border-white/[0.09] bg-[#08090B] overflow-hidden group">
                  <div>
                    <div className="overflow-hidden bg-[#0A0C0F]">
                      <ResilientImage
                        src={vehicle.image}
                        alt={vehicle.alt}
                        fallbackLabel={vehicle.name}
                        className="aspect-[16/10] w-full"
                        imgClassName="group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                    </div>

                    <div className="p-7 sm:p-9 space-y-4">
                      <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-[#C7AD7A]">
                        <span className="font-mono">{vehicle.index}</span>
                        <span aria-hidden="true" className="text-white/25">—</span>
                        <span>{vehicle.category}</span>
                      </div>

                      <h3 className="font-display text-2xl sm:text-[28px] font-medium text-[#F4F0E8]">
                        {vehicle.name}
                      </h3>

                      <p className="text-sm text-[#9A9A96] leading-relaxed">
                        {vehicle.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-7 sm:px-9 pb-8 space-y-6">
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.08]">
                      {vehicle.specs.slice(0, 3).map((spec) => (
                        <div key={spec.label}>
                          <p className="text-[11px] tracking-[0.14em] uppercase text-[#9A9A96]">
                            {spec.label}
                          </p>
                          <p className="font-mono tabular-nums text-base sm:text-lg font-medium text-[#F4F0E8] mt-1">
                            {spec.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenDossier(vehicle)}
                      className="inline-flex items-center gap-2.5 px-5 py-3 text-xs font-medium tracking-[0.18em] uppercase text-[#F4F0E8] border border-white/15 hover:border-[#C7AD7A] hover:text-[#C7AD7A] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      <span>Open Concept Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. PROMINENT RETURN & ONWARD EXPLORATION GATEWAY
         ===================================================================== */}
      <section aria-labelledby="vehicle-onward-heading" className="py-24 md:py-32 bg-[#08090B]">
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
          <Reveal variant="scale-in">
            <div className="border border-white/[0.1] bg-[#131519] p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div className="space-y-4 max-w-xl">
                <p className="text-xs tracking-[0.24em] uppercase text-[#C7AD7A]">
                  Continue the Study
                </p>
                <h2
                  id="vehicle-onward-heading"
                  className="font-display text-[clamp(1.9rem,3.4vw,3rem)] font-medium tracking-[-0.02em] leading-[1.08] text-[#F4F0E8]"
                >
                  Explore the engineering beneath the silhouette.
                </h2>
                <p className="text-sm sm:text-base text-[#9A9A96] leading-relaxed">
                  Examine Asterion’s active aerodynamic trim simulation, composite materials study,
                  or return to the campaign opening.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 shrink-0">
                <button
                  type="button"
                  onClick={() => onNavigate('engineering')}
                  className="inline-flex items-center justify-center gap-3 px-6 py-4 text-xs font-medium tracking-[0.18em] uppercase text-[#08090B] bg-[#C7AD7A] hover:bg-[#D5BE90] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E8]"
                >
                  <span>Explore Engineering</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-xs font-medium tracking-[0.18em] uppercase text-[#F4F0E8] border border-white/18 hover:border-[#C7AD7A] hover:text-[#C7AD7A] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                >
                  <span>Private Inquiry</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-xs font-medium tracking-[0.18em] uppercase text-[#9A9A96] hover:text-[#F4F0E8] border border-white/10 hover:border-white/25 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return Home</span>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};
