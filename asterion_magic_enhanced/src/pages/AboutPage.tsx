import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ASTERION_IMAGES } from '../data/asterionData';
import { usePrefersReducedMotion, useSubtleParallax } from '../hooks/useMotionPreferences';
import { PageRoute } from '../components/Navbar';
import { ResilientImage } from '../components/ResilientImage';
import { Reveal } from '../components/Reveal';

interface AboutPageProps {
  onNavigate: (page: PageRoute, sectionId?: string) => void;
}

interface CorePrinciple {
  number: string;
  title: string;
  summary: string;
  disciplineNote: string;
  designFocus: string;
}

const ABOUT_PRINCIPLES: CorePrinciple[] = [
  {
    number: '01',
    title: 'Purposeful Design',
    summary:
      'Every line, aperture, and proportion exists for an aerodynamic, structural, or ergonomic reason—never as surface ornament.',
    disciplineNote:
      'By eliminating decorative clutter, light moves cleanly across uninterrupted bodywork, allowing stance and silhouette to speak with quiet authority.',
    designFocus: 'Sculptural Restraint & Aerodynamic Clarity',
  },
  {
    number: '02',
    title: 'Engineering Precision',
    summary:
      'Form and mechanical architecture are conceived from the same centreline drawing rather than assembled as separate disciplines.',
    disciplineNote:
      'From carbon-monocoque load paths to venturi underbody channels, theoretical engineering studies anchor every visual decision in physical logic.',
    designFocus: 'Unified Chassis, Airflow & Packaging Logic',
  },
  {
    number: '03',
    title: 'Continuous Exploration',
    summary:
      'As a concept marque, ASTERION exists to ask forward-looking questions about how performance automobiles should feel, sound, and move.',
    disciplineNote:
      'Across mid-engine, grand touring, and silent electric concept studies, each expression investigates a distinct emotional relationship with motion.',
    designFocus: 'Multi-Architecture Concept Investigation',
  },
  {
    number: '04',
    title: 'Attention to Detail',
    summary:
      'True luxury reveals itself up close: in knurled billet switchgear, optical blade tolerances, and honest structural materials.',
    disciplineNote:
      'Whether inspecting a titanium suspension clevis, an acoustic unlock cue, or a nocturnal light signature, every touchpoint is composed with horological care.',
    designFocus: 'Tactile Cabin Craft & Optical Precision',
  },
  {
    number: '05',
    title: 'Responsible Innovation',
    summary:
      'Future performance demands smarter mass discipline, cleaner aerodynamic efficiency, and technology that respects human attention.',
    disciplineNote:
      'Rather than overwhelming drivers with digital noise or brute excess, innovation is directed toward efficiency, lightweighting, and calm driver clarity.',
    designFocus: 'Lightweight Efficiency & Human-Centric Tech',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [heroEntered, setHeroEntered] = useState(false);
  const [activePrincipleIndex, setActivePrincipleIndex] = useState<number>(0);
  const { containerRef: storyParallaxRef, offsetY: storyParallaxY } = useSubtleParallax(20);

  useEffect(() => {
    if (prefersReducedMotion) {
      setHeroEntered(true);
      return;
    }
    const id = window.requestAnimationFrame(() => setHeroEntered(true));
    return () => window.cancelAnimationFrame(id);
  }, [prefersReducedMotion]);

  const activePrinciple = ABOUT_PRINCIPLES[activePrincipleIndex] ?? ABOUT_PRINCIPLES[0];

  return (
    <main className="bg-[#08090B]">
      {/* =====================================================================
          SECTION A — ABOUT ASTERION (CONCEPT BRAND INTRODUCTION)
         ===================================================================== */}
      <section
        aria-labelledby="about-hero-heading"
        className="relative min-h-[82vh] w-full flex items-end overflow-hidden bg-[#08090B] pt-28 pb-20 md:pb-28 border-b border-white/[0.08]"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className={`w-full h-full transition-[opacity,transform] duration-[1250ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              heroEntered ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.04]'
            }`}
          >
            <ResilientImage
              src={ASTERION_IMAGES.solaceGt}
              alt="Sculpted dark ASTERION coupe poised beside a minimalist architectural pavilion at twilight"
              fallbackLabel="ABOUT ASTERION"
              priority
              className="w-full h-full"
              imgClassName="object-[54%_center] md:object-center"
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/62 to-[#08090B]/40"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#08090B]/92 via-[#08090B]/52 to-transparent"
          />
        </div>

        <div className="relative z-10 max-w-[1380px] w-full mx-auto px-6 lg:px-10">
          <div className="max-w-3xl space-y-6">
            <p
              className={`text-xs tracking-[0.26em] uppercase text-[#C7AD7A] transition-[opacity,transform] duration-700 delay-100 ease-out ${
                heroEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              About ASTERION · Automotive Concept House
            </p>

            <h1
              id="about-hero-heading"
              className={`font-display text-[clamp(2.45rem,5.5vw,4.85rem)] font-medium tracking-[-0.025em] leading-[1.03] text-[#F4F0E8] transition-[opacity,transform] duration-700 delay-200 ease-out ${
                heroEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              A CONCEPT FOR THE FUTURE OF MOTION.
            </h1>

            <p
              className={`text-base sm:text-lg md:text-xl text-[#F4F0E8]/85 leading-relaxed max-w-2xl transition-[opacity,transform] duration-700 delay-300 ease-out ${
                heroEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              ASTERION is an ambitious luxury performance automotive concept brand—created to
              explore where sculptural restraint, purposeful engineering, and immersive digital
              craft converge.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION B — OUR STORY
         ===================================================================== */}
      <section
        id="story"
        ref={storyParallaxRef}
        aria-labelledby="about-story-heading"
        className="py-24 md:py-36 bg-[#131519] border-b border-white/[0.08] scroll-mt-16"
      >
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-7">
              <Reveal>
                <p className="text-xs tracking-[0.24em] uppercase text-[#C7AD7A]">
                  01 · Our Story
                </p>
                <h2
                  id="about-story-heading"
                  className="font-display text-[clamp(2rem,3.6vw,3.2rem)] font-medium tracking-[-0.02em] leading-[1.08] text-[#F4F0E8] mt-3"
                >
                  Born from a single question: what remains when excess is stripped away?
                </h2>
              </Reveal>

              <Reveal delayMs={100}>
                <div className="space-y-5 text-sm sm:text-base text-[#9A9A96] leading-relaxed">
                  <p className="text-[#F4F0E8]/90 text-base sm:text-lg">
                    Modern performance design often equates drama with visual noise—louvers without
                    ducts, creases without airflow, and cabins crowded by competing displays.
                    ASTERION was conceived as a deliberate creative counterpoint.
                  </p>
                  <p>
                    Envisioned from the ground up as a contemporary concept marque, ASTERION unites
                    striking architectural proportion with disciplined aerodynamic logic and a calm,
                    driver-centred sensory experience. Every vehicle study—from the mid-engine Apex
                    flagship to the Solace grand tourer and silent Volt study—treats engineering and
                    emotion as inseparable halves of the same idea.
                  </p>
                  <p>
                    Rather than imitating heritage conventions, ASTERION uses interactive digital
                    storytelling, real-time spatial inspection, and bespoke sound design to invite
                    visitors inside the creative process of modern automotive design.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal variant="scale-in" delayMs={140}>
                <div className="border border-white/[0.09] bg-[#08090B] overflow-hidden">
                  <div className="overflow-hidden">
                    <div
                      style={
                        prefersReducedMotion
                          ? undefined
                          : { transform: `translate3d(0, ${storyParallaxY}px, 0) scale(1.05)` }
                      }
                      className="will-change-transform transition-transform duration-150 ease-out"
                    >
                      <ResilientImage
                        src={ASTERION_IMAGES.philosophyAtelier}
                        alt="ASTERION obsidian concept sculpture resting beneath linear architectural studio lighting"
                        fallbackLabel="ASTERION DESIGN STORY"
                        className="aspect-[16/10] w-full"
                      />
                    </div>
                  </div>
                  <div className="p-6 sm:p-7 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#9A9A96]">
                    <span className="tracking-[0.18em] uppercase text-[#C7AD7A]">
                      Concept Atelier Study
                    </span>
                    <span>Uniting Exterior Form, Aerodynamics & Sensory Craft</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION C — OUR VISION (PROMINENT ARCHITECTURAL STATEMENT)
         ===================================================================== */}
      <section
        id="vision"
        aria-labelledby="about-vision-heading"
        className="relative py-28 md:py-40 bg-[#08090B] border-b border-white/[0.08] overflow-hidden scroll-mt-16"
      >
        <div
          aria-hidden="true"
          className="absolute -right-24 top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-[#C7AD7A]/[0.05] blur-[130px] pointer-events-none"
        />

        <div className="relative z-10 max-w-[1380px] mx-auto px-6 lg:px-10">
          <Reveal variant="blur-focus">
            <div className="max-w-5xl space-y-8">
              <div className="flex items-center gap-4">
                <span className="w-10 h-[1px] bg-[#C7AD7A]" aria-hidden="true" />
                <p
                  id="about-vision-heading"
                  className="text-xs tracking-[0.26em] uppercase text-[#C7AD7A]"
                >
                  02 · Our Vision
                </p>
              </div>

              <blockquote className="font-display text-[clamp(1.95rem,4.3vw,3.75rem)] font-medium tracking-[-0.02em] leading-[1.12] text-[#F4F0E8]">
                “To inspire the next generation of automotive design through a bold vision of
                purposeful engineering, distinctive design, and extraordinary experiences.”
              </blockquote>

              <p className="text-sm sm:text-base text-[#9A9A96] max-w-2xl leading-relaxed pt-2">
                Our vision looks beyond raw numerical escalation toward machines defined by clarity
                of silhouette, aerodynamic intelligence, and memorable human connection.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================================
          SECTION D — OUR MISSION (ASYMMETRIC EDITORIAL COUNTERPOINT)
         ===================================================================== */}
      <section
        id="mission"
        aria-labelledby="about-mission-heading"
        className="py-24 md:py-36 bg-[#131519] border-b border-white/[0.08] scroll-mt-16"
      >
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
          <Reveal variant="scale-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 border border-white/[0.1] bg-[#08090B] items-stretch overflow-hidden">
              <div className="lg:col-span-5 min-h-[280px] border-b lg:border-b-0 lg:border-r border-white/[0.08]">
                <ResilientImage
                  src={ASTERION_IMAGES.aeroSculpture}
                  alt="Close-up architectural study of sculpted black carbon bodywork and warm champagne rim light"
                  fallbackLabel="OUR MISSION"
                  className="w-full h-full aspect-[16/10] lg:aspect-auto"
                />
              </div>

              <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between gap-10">
                <div className="space-y-6">
                  <p
                    id="about-mission-heading"
                    className="text-xs tracking-[0.26em] uppercase text-[#C7AD7A]"
                  >
                    03 · Our Mission
                  </p>

                  <p className="font-display text-[clamp(1.65rem,3.1vw,2.65rem)] font-medium tracking-[-0.02em] leading-[1.16] text-[#F4F0E8]">
                    To explore the possibilities of automotive design by bringing together
                    thoughtful craftsmanship, engineering ambition, and technology-driven
                    experiences.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-white/[0.08]">
                  <div className="space-y-1.5">
                    <p className="text-xs tracking-[0.18em] uppercase text-[#C7AD7A]">
                      Physical Discipline
                    </p>
                    <p className="text-sm text-[#9A9A96] leading-relaxed">
                      Treating every surface, material choice, and cockpit control with cohesive
                      engineering intent.
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-xs tracking-[0.18em] uppercase text-[#C7AD7A]">
                      Experiential Depth
                    </p>
                    <p className="text-sm text-[#9A9A96] leading-relaxed">
                      Pairing sculptural vehicles with interactive 3D exploration, motion, and
                      refined acoustic design.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================================
          SECTION E — OUR PRINCIPLES (INTERACTIVE ARCHITECTURAL LEDGER)
         ===================================================================== */}
      <section
        id="principles"
        aria-labelledby="about-principles-heading"
        className="py-24 md:py-36 bg-[#08090B] border-b border-white/[0.08] scroll-mt-16"
      >
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10 space-y-14">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]">
              <div className="space-y-3 max-w-2xl">
                <p className="text-xs tracking-[0.24em] uppercase text-[#C7AD7A]">
                  04 · Guiding Ethos
                </p>
                <h2
                  id="about-principles-heading"
                  className="font-display text-[clamp(2rem,3.6vw,3.2rem)] font-medium tracking-[-0.02em] text-[#F4F0E8]"
                >
                  Five Principles Shaping Every Study
                </h2>
              </div>
              <p className="text-sm text-[#9A9A96] max-w-md leading-relaxed">
                Internal creative standards guiding every ASTERION concept vehicle, material study,
                and interactive presentation.
              </p>
            </div>
          </Reveal>

          <Reveal delayMs={80}>
            <div className="grid grid-cols-1 lg:grid-cols-12 border border-white/[0.09] bg-[#131519]">
              {/* Left Column: Selectable Principle Ledger */}
              <div
                role="tablist"
                aria-label="ASTERION Core Principles"
                className="lg:col-span-5 divide-y divide-white/[0.08] border-b lg:border-b-0 lg:border-r border-white/[0.08]"
              >
                {ABOUT_PRINCIPLES.map((item, idx) => {
                  const isSelected = idx === activePrincipleIndex;
                  return (
                    <button
                      key={item.number}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActivePrincipleIndex(idx)}
                      className={`w-full px-6 sm:px-8 py-5 sm:py-6 text-left flex items-center justify-between gap-4 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#C7AD7A] ${
                        isSelected
                          ? 'bg-[#191D24] border-l-2 border-l-[#C7AD7A]'
                          : 'bg-[#0E1014] hover:bg-[#14171D]'
                      }`}
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-[#C7AD7A]">{item.number}</span>
                        <span
                          className={`font-display text-lg sm:text-xl font-medium ${
                            isSelected ? 'text-[#F4F0E8]' : 'text-[#F4F0E8]/78'
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
                          isSelected ? 'text-[#C7AD7A] translate-x-0.5' : 'text-white/25'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Expanded Principle Editorial Monograph */}
              <div
                role="tabpanel"
                className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between gap-10 bg-[#0B0D11]"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-[#C7AD7A]">
                    <span className="font-mono">{activePrinciple.number}</span>
                    <span aria-hidden="true" className="text-white/25">
                      —
                    </span>
                    <span>Core Principle</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-[#F4F0E8]">
                    {activePrinciple.title}
                  </h3>

                  <p className="text-base sm:text-lg text-[#F4F0E8]/90 leading-relaxed">
                    {activePrinciple.summary}
                  </p>

                  <p className="text-sm sm:text-base text-[#9A9A96] leading-relaxed">
                    {activePrinciple.disciplineNote}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="tracking-[0.16em] uppercase text-[#9A9A96]">
                    Studio Focus
                  </span>
                  <span className="font-mono text-[#C7AD7A]">{activePrinciple.designFocus}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================================
          SECTION F — RETURN TO THE EXPERIENCE & DISCREET CREATOR CREDIT
         ===================================================================== */}
      <section aria-labelledby="about-onward-heading" className="py-24 md:py-32 bg-[#08090B]">
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10 space-y-12">
          <Reveal variant="scale-in">
            <div className="border border-white/[0.1] bg-[#131519] overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between gap-8">
                  <div className="space-y-4">
                    <p className="text-xs tracking-[0.24em] uppercase text-[#C7AD7A]">
                      Return to the Experience
                    </p>
                    <h2
                      id="about-onward-heading"
                      className="font-display text-[clamp(2rem,3.6vw,3.2rem)] font-medium tracking-[-0.02em] leading-[1.08] text-[#F4F0E8]"
                    >
                      Step inside The Machine and its engineering.
                    </h2>
                    <p className="text-sm sm:text-base text-[#9A9A96] leading-relaxed max-w-lg">
                      Inspect the Asterion Apex in real-time 3D from every perspective, or explore
                      the aerodynamic and material architecture beneath the bodywork.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => onNavigate('vehicle')}
                      className="inline-flex items-center justify-center gap-3 px-7 py-4 text-xs font-medium tracking-[0.18em] uppercase text-[#08090B] bg-[#C7AD7A] hover:bg-[#D5BE90] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E8]"
                    >
                      <span>Explore The Machine</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigate('engineering')}
                      className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-xs font-medium tracking-[0.18em] uppercase text-[#F4F0E8] border border-white/18 hover:border-[#C7AD7A] hover:text-[#C7AD7A] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      <span>Explore Engineering</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 min-h-[260px]">
                  <ResilientImage
                    src={ASTERION_IMAGES.apexObsidian}
                    alt="ASTERION APEX flagship concept hypercar in satin Obsidian Black"
                    fallbackLabel="ASTERION APEX"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Discreet Digital Experience Creator Credit */}
          <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#9A9A96]/75">
            <span>ASTERION · Independent Luxury Automotive Concept Monograph</span>
            <span className="tracking-[0.04em] text-[#9A9A96]">
              Website Concept & Digital Experience by Aysha Anam
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};
