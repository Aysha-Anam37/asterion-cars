import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ASTERION_IMAGES, PHILOSOPHY_CHAPTERS } from '../data/asterionData';
import { usePrefersReducedMotion, useSubtleParallax } from '../hooks/useMotionPreferences';
import { PageRoute } from '../components/Navbar';
import { ResilientImage } from '../components/ResilientImage';
import { Reveal } from '../components/Reveal';

interface PhilosophyPageProps {
  onNavigate: (page: PageRoute, sectionId?: string) => void;
}

export const PhilosophyPage: React.FC<PhilosophyPageProps> = ({ onNavigate }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [heroEntered, setHeroEntered] = useState(false);
  const { containerRef: horizonRef, offsetY: horizonOffset } = useSubtleParallax(24);

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
          1. EDITORIAL PHILOSOPHY HERO
         ===================================================================== */}
      <section
        aria-labelledby="philosophy-hero-title"
        className="relative min-h-[84vh] w-full flex items-end overflow-hidden bg-[#08090B] pt-28 pb-20 md:pb-28 border-b border-white/[0.08]"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className={`w-full h-full transition-[opacity,transform] duration-[1250ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              heroEntered ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.04]'
            }`}
          >
            <ResilientImage
              src={ASTERION_IMAGES.philosophyAtelier}
              alt="Satin obsidian hypercar proportion sculpture resting beneath a single linear champagne skylight inside a quiet concrete design atelier"
              fallbackLabel="ASTERION DESIGN ATELIER"
              priority
              className="w-full h-full"
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/52 to-[#08090B]/35 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#08090B]/88 via-[#08090B]/40 to-transparent pointer-events-none"
          />
        </div>

        <div className="relative z-10 max-w-[1380px] w-full mx-auto px-6 lg:px-10">
          <div className="max-w-3xl space-y-6">
            <p
              className={`text-xs tracking-[0.26em] uppercase text-[#C7AD7A] transition-[opacity,transform] duration-700 delay-100 ease-out ${
                heroEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Our Philosophy · Design Ethos & Craft
            </p>

            <h1
              id="philosophy-hero-title"
              className={`font-display text-[clamp(2.5rem,5.5vw,4.8rem)] font-medium tracking-[-0.025em] leading-[1.03] text-[#F4F0E8] transition-[opacity,transform] duration-700 delay-200 ease-out ${
                heroEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              PRECISION IS OUR LANGUAGE.
            </h1>

            <p
              className={`text-lg md:text-xl text-[#F4F0E8]/85 leading-relaxed max-w-xl transition-[opacity,transform] duration-700 delay-300 ease-out ${
                heroEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              Every contour serves a purpose. Every detail has a reason. Every movement begins with
              intention.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. FOUNDING MANIFESTO SPREAD
         ===================================================================== */}
      <section
        aria-labelledby="manifesto-heading"
        className="py-24 md:py-36 bg-[#131519] border-b border-white/[0.08]"
      >
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-4">
              <Reveal>
                <p className="text-xs tracking-[0.24em] uppercase text-[#C7AD7A]">
                  The First Principle
                </p>
                <h2
                  id="manifesto-heading"
                  className="font-display text-[clamp(1.9rem,3.4vw,3rem)] font-medium tracking-[-0.02em] leading-[1.1] text-[#F4F0E8] mt-3"
                >
                  Restraint is the highest expression of confidence.
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-7 space-y-6 text-base md:text-lg text-[#F4F0E8]/88 leading-relaxed">
              <Reveal delayMs={90}>
                <p>
                  ASTERION was conceived around a singular question: what remains when a performance
                  automobile is stripped of every purely decorative gesture? In an era of visual
                  noise, exaggerated creases, and simulated intakes, our studio pursues quiet,
                  sculptural inevitability.
                </p>
              </Reveal>
              <Reveal delayMs={160}>
                <p className="text-[#9A9A96]">
                  We treat engineering and artistic proportion not as competing departments, but as
                  two descriptions of the same truth. When airflow is calm, the silhouette looks
                  poised. When mass is centralised, the stance feels athletic even at standstill.
                  When cabin controls are machined with horological care, the driver trusts the
                  machine before turning the first corner.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. THREE EDITORIAL CHAPTERS OF CRAFT
         ===================================================================== */}
      <section
        aria-label="Design Principles"
        className="py-24 md:py-36 bg-[#08090B] border-b border-white/[0.08]"
      >
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10 space-y-28 md:space-y-36">
          {PHILOSOPHY_CHAPTERS.map((chapter, idx) => {
            const imageFirstOnDesktop = idx % 2 === 1;
            return (
              <article
                key={chapter.index}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
              >
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    imageFirstOnDesktop ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <Reveal>
                    <div className="flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-[#C7AD7A]">
                      <span className="font-mono">{chapter.index}</span>
                      <span aria-hidden="true" className="text-white/25">·</span>
                      <span>{chapter.kicker}</span>
                    </div>

                    <h2 className="font-display text-[clamp(1.9rem,3.4vw,3rem)] font-medium tracking-[-0.02em] leading-[1.08] text-[#F4F0E8] mt-3">
                      {chapter.title}
                    </h2>

                    <p className="text-base sm:text-lg text-[#F4F0E8]/90 leading-relaxed mt-5">
                      {chapter.lead}
                    </p>

                    <p className="text-sm sm:text-base text-[#9A9A96] leading-relaxed mt-4">
                      {chapter.body}
                    </p>
                  </Reveal>
                </div>

                <div
                  className={`lg:col-span-7 ${
                    imageFirstOnDesktop ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <Reveal variant="scale-in" delayMs={110}>
                    <div className="border border-white/[0.09] bg-[#131519] overflow-hidden">
                      <ResilientImage
                        src={chapter.image}
                        alt={chapter.alt}
                        fallbackLabel={chapter.title}
                        className="aspect-[16/10] w-full"
                      />
                      <div className="px-6 py-4 bg-[#0C0E12] border-t border-white/[0.08] flex items-center justify-between gap-4 text-xs text-[#9A9A96]">
                        <span>{chapter.caption}</span>
                        <span className="font-mono text-[#C7AD7A]">Chapter {chapter.index}</span>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          4. APPROACH TO MOBILITY: MOTION AS EMOTION
         ===================================================================== */}
      <section
        ref={horizonRef}
        aria-labelledby="mobility-vision-heading"
        className="relative min-h-[68vh] w-full flex items-end overflow-hidden bg-[#08090B] border-b border-white/[0.08]"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            style={{
              transform: `translate3d(0, ${horizonOffset}px, 0) scale(1.06)`,
            }}
            className="w-full h-full will-change-transform transition-transform duration-150 ease-out"
          >
            <ResilientImage
              src={ASTERION_IMAGES.twilightDrive}
              alt="ASTERION hypercar carving along an elevated mountain pass road at deep twilight with warm rear light signature"
              fallbackLabel="THE EMOTION OF MOTION"
              className="w-full h-full"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/58 to-[#08090B]/28 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#08090B]/85 via-[#08090B]/35 to-transparent pointer-events-none"
          />
        </div>

        <div className="relative z-10 max-w-[1380px] w-full mx-auto px-6 lg:px-10 py-20 md:py-28">
          <Reveal variant="blur-focus">
            <div className="max-w-2xl space-y-5">
              <p className="text-xs tracking-[0.24em] uppercase text-[#C7AD7A]">
                Approach to Mobility
              </p>
              <h2
                id="mobility-vision-heading"
                className="font-display text-[clamp(2.1rem,4.4vw,3.9rem)] font-medium tracking-[-0.02em] leading-[1.06] text-[#F4F0E8]"
              >
                Numbers measure velocity. Proportion creates memory.
              </h2>
              <p className="text-base sm:text-lg text-[#F4F0E8]/85 leading-relaxed">
                Whether exploring mid-engine aerodynamics in Apex, grand-touring calm in Solace, or
                silent electric torque vectoring in Volt, our ambition remains constant: to craft
                machines that move the spirit long before the road unwinds.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================================
          5. ONWARD NAVIGATION
         ===================================================================== */}
      <section aria-labelledby="philosophy-cta-heading" className="py-24 md:py-32 bg-[#131519]">
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="border border-white/[0.1] bg-[#08090B] p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div className="space-y-3 max-w-xl">
                <p className="text-xs tracking-[0.24em] uppercase text-[#C7AD7A]">
                  Philosophy in Practice
                </p>
                <h2
                  id="philosophy-cta-heading"
                  className="font-display text-[clamp(1.9rem,3.4vw,3rem)] font-medium tracking-[-0.02em] leading-[1.08] text-[#F4F0E8]"
                >
                  Encounter these principles in metal and carbon.
                </h2>
                <p className="text-sm sm:text-base text-[#9A9A96] leading-relaxed">
                  Step into the dedicated vehicle studio to inspect Asterion Apex or explore our
                  technical engineering monograph.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 shrink-0">
                <button
                  type="button"
                  onClick={() => onNavigate('vehicle')}
                  className="inline-flex items-center justify-center gap-3 px-6 py-4 text-xs font-medium tracking-[0.18em] uppercase text-[#08090B] bg-[#C7AD7A] hover:bg-[#D5BE90] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E8]"
                >
                  <span>Discover The Machine</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('engineering')}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-xs font-medium tracking-[0.18em] uppercase text-[#F4F0E8] border border-white/18 hover:border-[#C7AD7A] hover:text-[#C7AD7A] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                >
                  <span>Engineering</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-xs font-medium tracking-[0.18em] uppercase text-[#9A9A96] hover:text-[#F4F0E8] border border-white/10 hover:border-white/25 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Home</span>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};
