import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
import {
  APEX_ANGLE_VIEWS,
  APEX_COLOURS,
  ApexColourOption,
  ConceptVehicle,
  StudioHotspot,
  VEHICLE_COLLECTION,
} from '../data/asterionData';
import { Reveal } from './Reveal';
import { PageRoute } from './Navbar';

interface FeaturedVehicleProps {
  onOpenDossier: (vehicle: ConceptVehicle) => void;
  onNavigate: (page: PageRoute, sectionId?: string) => void;
  sectionId?: string;
}

export const FeaturedVehicle: React.FC<FeaturedVehicleProps> = ({
  onOpenDossier,
  onNavigate,
  sectionId = 'studio-stage',
}) => {
  const [selectedColour, setSelectedColour] = useState<ApexColourOption>(APEX_COLOURS[0]);
  const [angleIndex, setAngleIndex] = useState<number>(0);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [activeHotspot, setActiveHotspot] = useState<StudioHotspot | null>(
    APEX_ANGLE_VIEWS[0].hotspots[0]
  );

  // Pointer drag state for tactile multi-angle scrubbing
  const dragStartXRef = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const currentAngle = APEX_ANGLE_VIEWS[angleIndex];
  const apexConcept = VEHICLE_COLLECTION[0];

  // Preload all colour variants and studio angle images for seamless crossfades
  useEffect(() => {
    const urls = [
      ...APEX_COLOURS.map((c) => c.image),
      ...APEX_ANGLE_VIEWS.map((v) => v.staticImage).filter(Boolean),
    ] as string[];

    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  // Update active hotspot when angle changes
  useEffect(() => {
    setActiveHotspot(APEX_ANGLE_VIEWS[angleIndex].hotspots[0] ?? null);
  }, [angleIndex]);

  const handleColourSelect = (colour: ApexColourOption) => {
    setSelectedColour(colour);
    // Ensure exterior stance is visible when changing exterior paint finish
    if (angleIndex !== 0) {
      setAngleIndex(0);
    }
  };

  const stepAngle = (delta: number) => {
    setAngleIndex((prev) => {
      const total = APEX_ANGLE_VIEWS.length;
      return (prev + delta + total) % total;
    });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Ignore drags starting on interactive hotspot buttons
    if ((e.target as HTMLElement).closest('button')) return;
    dragStartXRef.current = e.clientX;
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartXRef.current === null) return;
    const diff = e.clientX - dragStartXRef.current;
    const threshold = 70;
    if (Math.abs(diff) >= threshold) {
      stepAngle(diff < 0 ? 1 : -1);
      dragStartXRef.current = e.clientX;
    }
  };

  const handlePointerUp = () => {
    dragStartXRef.current = null;
    setIsDragging(false);
  };

  const handleStageKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      stepAngle(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      stepAngle(-1);
    }
  };

  return (
    <section
      id={sectionId}
      aria-labelledby="featured-vehicle-heading"
      className="relative py-24 md:py-36 bg-[#08090B] border-b border-white/[0.08] scroll-mt-16"
    >
      <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
        {/* Editorial Header */}
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-[#C7AD7A]">
                <span>Flagship Concept Study</span>
                <span aria-hidden="true" className="text-white/25">·</span>
                <span className="text-[#9A9A96]">Mid-Engine Architecture</span>
              </div>
              <h2
                id="featured-vehicle-heading"
                className="font-display text-[clamp(2.25rem,4.5vw,4rem)] font-medium tracking-[-0.02em] leading-[1.05] text-[#F4F0E8]"
              >
                ASTERION APEX
              </h2>
            </div>

            <p className="text-base md:text-[17px] leading-relaxed text-[#9A9A96] max-w-md">
              Sculpted around internalised laminar airflow and a single-piece carbon-fibre central
              tub. Every proportion balances dramatic visual poise with mechanical clarity.
            </p>
          </div>
        </Reveal>

        {/* Dominant Interactive Studio Stage */}
        <Reveal variant="scale-in" delayMs={80}>
          <div className="border border-white/[0.09] bg-[#131519]">
            {/* Top Studio Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 px-5 md:px-8 py-4 border-b border-white/[0.08] bg-[#0D0F13]">
              {/* Multi-Angle Selector Tabs */}
              <div
                role="tablist"
                aria-label="Vehicle studio perspectives"
                className="flex items-center gap-1 overflow-x-auto max-w-full py-0.5"
              >
                {APEX_ANGLE_VIEWS.map((view, idx) => {
                  const isActive = idx === angleIndex;
                  return (
                    <button
                      key={view.id}
                      role="tab"
                      type="button"
                      aria-selected={isActive}
                      onClick={() => setAngleIndex(idx)}
                      className={`px-3.5 py-2 text-xs tracking-[0.12em] uppercase transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A] ${
                        isActive
                          ? 'bg-[#1B1E24] text-[#F4F0E8] border-b border-[#C7AD7A]'
                          : 'text-[#9A9A96] hover:text-[#F4F0E8]'
                      }`}
                    >
                      <span className="font-mono text-[11px] text-[#C7AD7A] mr-2">
                        {view.indexLabel}
                      </span>
                      {view.label}
                    </button>
                  );
                })}
              </div>

              {/* Hotspot Toggle & Drag Instruction */}
              <div className="flex items-center gap-5 ml-auto">
                <span className="hidden xl:inline text-xs text-[#9A9A96]">
                  Drag horizontally across stage to change perspective
                </span>
                <button
                  type="button"
                  onClick={() => setShowHotspots((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-xs tracking-[0.12em] uppercase text-[#F4F0E8]/90 hover:text-[#C7AD7A] border border-white/10 bg-[#131519] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                >
                  {showHotspots ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-[#C7AD7A]" />
                      <span>Hide Callouts</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5 text-[#C7AD7A]" />
                      <span>Show Callouts</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Large Visual Viewport */}
            <div
              tabIndex={0}
              role="region"
              aria-label={`ASTERION APEX interactive viewer — ${currentAngle.label}, ${selectedColour.name}. Use Left and Right arrow keys or drag horizontally to switch studio angles.`}
              onKeyDown={handleStageKeyDown}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className={`relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] w-full overflow-hidden bg-[#090A0D] select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#C7AD7A] ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
            >
              {/* Layer 1: All 4 Exterior Colour Variant Frames Crossfaded */}
              {APEX_COLOURS.map((colourOption) => {
                const isVisible =
                  currentAngle.usesSelectedColour && selectedColour.id === colourOption.id;
                return (
                  <img
                    key={colourOption.id}
                    src={colourOption.image}
                    alt={colourOption.alt}
                    referrerPolicy="no-referrer"
                    draggable={false}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
                      isVisible ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-[1.015] z-0'
                    }`}
                  />
                );
              })}

              {/* Layer 2: Multi-Angle Detail Perspectives */}
              {APEX_ANGLE_VIEWS.filter((v) => !v.usesSelectedColour).map((view) => {
                const isVisible = currentAngle.id === view.id;
                return (
                  <img
                    key={view.id}
                    src={view.staticImage}
                    alt={view.alt}
                    referrerPolicy="no-referrer"
                    draggable={false}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
                      isVisible ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-[1.015] z-0'
                    }`}
                  />
                );
              })}

              {/* Measured Vignette Scrim for Caption Contrast */}
              <div
                aria-hidden="true"
                className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-[#08090B]/85 via-transparent to-[#08090B]/25"
              />

              {/* Interactive Engineering Callout Pins */}
              {showHotspots &&
                currentAngle.hotspots.map((spot) => {
                  const isSpotSelected = activeHotspot?.id === spot.id;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      aria-label={`Inspect ${spot.title}`}
                      aria-pressed={isSpotSelected}
                      onClick={() => setActiveHotspot(spot)}
                      style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%` }}
                      className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-transform duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E8] ${
                        isSpotSelected
                          ? 'bg-[#C7AD7A] text-[#08090B] scale-110 shadow-lg'
                          : 'bg-[#08090B]/80 text-[#F4F0E8] border border-[#C7AD7A]/70 hover:scale-105'
                      }`}
                    >
                      <span className="font-mono text-sm leading-none font-medium">+</span>
                    </button>
                  );
                })}

              {/* Previous / Next Angle Controls */}
              <div className="absolute inset-y-0 left-3 md:left-5 z-30 flex items-center pointer-events-none">
                <button
                  type="button"
                  aria-label="Previous vehicle perspective"
                  onClick={() => stepAngle(-1)}
                  className="pointer-events-auto w-10 h-10 md:w-11 md:h-11 flex items-center justify-center bg-[#08090B]/70 hover:bg-[#131519] text-[#F4F0E8] border border-white/15 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-3 md:right-5 z-30 flex items-center pointer-events-none">
                <button
                  type="button"
                  aria-label="Next vehicle perspective"
                  onClick={() => stepAngle(1)}
                  className="pointer-events-auto w-10 h-10 md:w-11 md:h-11 flex items-center justify-center bg-[#08090B]/70 hover:bg-[#131519] text-[#F4F0E8] border border-white/15 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Bottom Stage Caption & Active Hotspot Detail */}
              <div className="absolute bottom-0 inset-x-0 z-30 px-5 md:px-8 py-4 md:py-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs tracking-[0.18em] uppercase text-[#C7AD7A]">
                    {currentAngle.usesSelectedColour
                      ? `Exterior Finish — ${selectedColour.name}`
                      : `Perspective ${currentAngle.indexLabel} — ${currentAngle.label}`}
                  </p>
                  <p className="text-xs md:text-sm text-[#F4F0E8]/85">
                    {currentAngle.usesSelectedColour
                      ? selectedColour.finishNote
                      : currentAngle.caption}
                  </p>
                </div>

                {showHotspots && activeHotspot && (
                  <div className="max-w-sm bg-[#08090B]/88 backdrop-blur-md border border-white/12 px-4 py-3">
                    <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#C7AD7A]">
                      {activeHotspot.title}
                    </p>
                    <p className="text-xs text-[#F4F0E8]/85 mt-1 leading-relaxed">
                      {activeHotspot.detail}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Studio Bar: Colour Selector + Specifications + CTA */}
            <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-white/[0.08]">
              {/* Exterior Colour Selector */}
              <div className="lg:col-span-5 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs tracking-[0.18em] uppercase text-[#9A9A96]">
                      Bespoke Paint Palette
                    </span>
                    <span className="text-xs font-medium text-[#F4F0E8]">
                      {selectedColour.name}
                    </span>
                  </div>

                  <div
                    role="radiogroup"
                    aria-label="Select ASTERION APEX exterior finish"
                    className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                  >
                    {APEX_COLOURS.map((option) => {
                      const isSelected = selectedColour.id === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => handleColourSelect(option)}
                          className={`group flex flex-col items-start gap-2.5 p-3 border text-left transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A] ${
                            isSelected
                              ? 'border-[#C7AD7A] bg-[#191C22]'
                              : 'border-white/[0.08] bg-[#0E1014] hover:border-white/25'
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            style={{
                              background: `linear-gradient(135deg, ${option.swatchHighlight} 0%, ${option.swatchHex} 75%)`,
                            }}
                            className={`w-7 h-7 rounded-full border ${
                              isSelected
                                ? 'border-[#C7AD7A] ring-2 ring-[#C7AD7A]/40'
                                : 'border-white/20'
                            }`}
                          />
                          <span
                            className={`text-xs leading-snug font-medium ${
                              isSelected ? 'text-[#F4F0E8]' : 'text-[#9A9A96] group-hover:text-[#F4F0E8]'
                            }`}
                          >
                            {option.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <p className="text-xs text-[#9A9A96]">
                  Selecting any paint option switches to the studio exterior stance with its matched finish.
                </p>
              </div>

              {/* Key Concept Specifications + Prominent Exploration Action */}
              <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between gap-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {apexConcept.specs.map((spec) => (
                    <div key={spec.label} className="space-y-1.5">
                      <p className="text-[11px] tracking-[0.16em] uppercase text-[#9A9A96]">
                        {spec.label}
                      </p>
                      <p className="font-mono tabular-nums text-xl md:text-2xl font-medium text-[#F4F0E8]">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => onOpenDossier(apexConcept)}
                    className="inline-flex items-center justify-center gap-3 px-6 py-3.5 text-xs font-medium tracking-[0.18em] uppercase text-[#08090B] bg-[#C7AD7A] hover:bg-[#D5BE90] active:scale-[0.99] transition-[background-color,transform] duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E8]"
                  >
                    <span>Explore Concept Dossier</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('engineering')}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-medium tracking-[0.16em] uppercase text-[#F4F0E8] border border-white/15 hover:border-[#C7AD7A] hover:text-[#C7AD7A] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                  >
                    <span>Inspect Engineering</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
