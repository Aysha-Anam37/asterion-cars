import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, CloudRain, Lock, Unlock, Volume2, VolumeX } from 'lucide-react';
import { ASTERION_IMAGES } from '../data/asterionData';
import { usePrefersReducedMotion } from '../hooks/useMotionPreferences';
import { asterionAudio } from '../utils/asterionAudio';
import { PageRoute } from './Navbar';
import { ResilientImage } from './ResilientImage';
import { Reveal } from './Reveal';

type UnlockStage = 'locked' | 'pulsing' | 'illuminating' | 'unlocked';

interface NocturneRainSceneProps {
  onNavigate: (page: PageRoute, sectionId?: string) => void;
}

interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  thickness: number;
  drift: number;
}

export const NocturneRainScene: React.FC<NocturneRainSceneProps> = ({ onNavigate }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [unlockStage, setUnlockStage] = useState<UnlockStage>('locked');
  const [audioState, setAudioState] = useState(() => asterionAudio.getState());
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [isCoolingDown, setIsCoolingDown] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timersRef = useRef<number[]>([]);
  const unlockStageRef = useRef<UnlockStage>(unlockStage);

  unlockStageRef.current = unlockStage;

  // Preload both pixel-locked nocturnal rain plates so unlocking has zero network latency
  useEffect(() => {
    [ASTERION_IMAGES.awakenDormantRain, ASTERION_IMAGES.awakenCrimsonRain].forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  // Sync with singleton audio state
  useEffect(() => {
    return asterionAudio.subscribe(setAudioState);
  }, []);

  // Clear scheduled sequence timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };
  }, []);

  // Observe viewport visibility so canvas rain only animates when visible
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsSectionVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          setIsSectionVisible(entries[0].isIntersecting);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Physically Plausible Multi-Depth HTML5 Canvas Rainfall (respects reduced motion & off-screen pause)
  useEffect(() => {
    if (prefersReducedMotion || !isSectionVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let drops: RainDrop[] = [];

    const initDrops = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = width < 768;
      const dropCount = isMobile ? 42 : 84;

      drops = Array.from({ length: dropCount }, (_, idx) => {
        const isForeground = idx % 4 === 0;
        return {
          x: Math.random() * (width + 80),
          y: Math.random() * height,
          length: isForeground ? 18 + Math.random() * 16 : 9 + Math.random() * 12,
          speed: isForeground ? 13 + Math.random() * 5 : 8 + Math.random() * 4,
          opacity: isForeground ? 0.11 + Math.random() * 0.11 : 0.05 + Math.random() * 0.07,
          thickness: isForeground ? 1.05 : 0.7,
          drift: 0.09 + Math.random() * 0.03,
        };
      });
    };

    initDrops();

    const handleResize = () => initDrops();
    window.addEventListener('resize', handleResize, { passive: true });

    const renderRain = () => {
      ctx.clearRect(0, 0, width, height);
      const isLit =
        unlockStageRef.current === 'illuminating' || unlockStageRef.current === 'unlocked';

      ctx.lineCap = 'round';

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        const normX = d.x / width;
        const normY = d.y / height;

        // Raindrops passing directly behind the illuminated crimson LED signature catch subtle ruby scatter
        const inCrimsonWake =
          isLit && normX > 0.13 && normX < 0.56 && normY > 0.34 && normY < 0.96;

        ctx.lineWidth = d.thickness;
        if (inCrimsonWake) {
          const alpha = Math.min(d.opacity * 1.65, 0.24);
          ctx.strokeStyle = `rgba(235, 74, 82, ${alpha})`;
        } else {
          ctx.strokeStyle = `rgba(198, 206, 218, ${d.opacity})`;
        }

        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.length * d.drift, d.y + d.length);
        ctx.stroke();

        d.y += d.speed;
        d.x -= d.speed * d.drift;

        if (d.y > height) {
          d.y = -d.length - Math.random() * 24;
          d.x = Math.random() * (width + 90);
        }
      }

      animationFrameId = window.requestAnimationFrame(renderRain);
    };

    animationFrameId = window.requestAnimationFrame(renderRain);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReducedMotion, isSectionVisible]);

  const clearSequenceTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  const handleUnlock = () => {
    // Prevent repeated clicks from stacking audio or interrupting transitions
    if (unlockStage !== 'locked' || isCoolingDown) return;

    clearSequenceTimers();
    asterionAudio.playUnlockSequence();

    if (prefersReducedMotion) {
      setUnlockStage('unlocked');
      return;
    }

    setUnlockStage('pulsing');

    const t1 = window.setTimeout(() => {
      setUnlockStage('illuminating');
    }, 320);

    const t2 = window.setTimeout(() => {
      setUnlockStage('unlocked');
    }, 1480);

    timersRef.current.push(t1, t2);
  };

  const handleResetLock = () => {
    if (unlockStage !== 'unlocked' || isCoolingDown) return;
    clearSequenceTimers();
    setIsCoolingDown(true);
    asterionAudio.playLockCue();
    setUnlockStage('locked');

    const cooldownTimer = window.setTimeout(() => {
      setIsCoolingDown(false);
    }, 380);
    timersRef.current.push(cooldownTimer);
  };

  const isTransitioning = unlockStage === 'pulsing' || unlockStage === 'illuminating';
  const isIlluminated = unlockStage === 'illuminating' || unlockStage === 'unlocked';
  const isPulsing = unlockStage === 'pulsing';

  return (
    <section
      id="nocturne"
      ref={sectionRef}
      aria-labelledby="nocturne-heading"
      className="relative bg-[#08090B] border-b border-white/[0.08] py-24 md:py-32 overflow-hidden scroll-mt-16"
    >
      <div className="max-w-[1380px] mx-auto px-6 lg:px-10 space-y-10">
        {/* Section Editorial Header & Acoustic Controls */}
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-[#C7AD7A]">
                <span>Nocturne Sequence</span>
                <span aria-hidden="true" className="text-white/25">·</span>
                <span className="text-[#9A9A96]">Rear Optical Signature</span>
              </div>
              <h2
                id="nocturne-heading"
                className="font-display text-[clamp(2rem,4vw,3.4rem)] font-medium tracking-[-0.02em] leading-[1.06] text-[#F4F0E8]"
              >
                Awaken the Silhouette.
              </h2>
              <p className="text-sm sm:text-base text-[#9A9A96] leading-relaxed max-w-xl">
                Poised in nocturnal rainfall, moisture beads across obsidian bodywork while every
                optical blade rests in shadow. Unlock the Asterion to ignite its crimson rear LED
                signature across the rain-slicked tarmac.
              </p>
            </div>

            {/* Accessible Sound & Optional Rain Ambience Controls */}
            <div
              role="group"
              aria-label="Scene sound and rain ambience controls"
              className="flex flex-wrap items-center gap-3 self-start lg:self-auto"
            >
              <button
                type="button"
                aria-pressed={audioState.rainActive}
                onClick={() => asterionAudio.toggleRainAmbience()}
                className={`inline-flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium tracking-[0.14em] uppercase border transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A] ${
                  audioState.rainActive && !audioState.muted
                    ? 'border-[#C7AD7A] bg-[#191C22] text-[#F4F0E8]'
                    : 'border-white/12 bg-[#131519] text-[#9A9A96] hover:text-[#F4F0E8] hover:border-white/25'
                }`}
              >
                <CloudRain className="w-3.5 h-3.5 text-[#C7AD7A]" />
                <span>
                  {audioState.rainActive && !audioState.muted
                    ? 'Rain Ambience: On'
                    : 'Rain Ambience: Off'}
                </span>
              </button>

              <button
                type="button"
                aria-pressed={audioState.muted}
                aria-label={audioState.muted ? 'Unmute site audio' : 'Mute all site audio'}
                onClick={() => asterionAudio.toggleMuted()}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium tracking-[0.14em] uppercase border transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A] ${
                  audioState.muted
                    ? 'border-white/15 bg-[#0D0F13] text-[#9A9A96] hover:text-[#F4F0E8]'
                    : 'border-white/15 bg-[#131519] text-[#F4F0E8] hover:border-[#C7AD7A]'
                }`}
              >
                {audioState.muted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-[#9A9A96]" />
                    <span>Muted</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#C7AD7A]" />
                    <span>Sound On</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </Reveal>

        {/* Cinematic Nighttime Rain & Crimson LED Activation Stage */}
        <Reveal variant="scale-in" delayMs={80}>
          <div className="relative border border-white/[0.1] bg-[#08090B] overflow-hidden">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#050608]">
              {/* Layer 1: Pixel-Locked Dormant Nocturnal Rain Plate (Smoked Dark LEDs, Dark Wet Tarmac) */}
              <div className="absolute inset-0 w-full h-full">
                <ResilientImage
                  src={ASTERION_IMAGES.awakenDormantRain}
                  alt="Obsidian black ASTERION performance coupe resting in dark nighttime rain before optical activation"
                  fallbackLabel="ASTERION NOCTURNE SILHOUETTE"
                  className="w-full h-full"
                />
              </div>

              {/* Layer 2: Pixel-Locked Vivid Crimson Rear LED & Wet-Road Reflection Master Plate */}
              <div
                aria-hidden={!isIlluminated}
                className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isIlluminated
                    ? 'opacity-100 duration-[950ms]'
                    : isPulsing
                    ? 'opacity-45 duration-200'
                    : 'opacity-0 duration-700'
                }`}
              >
                <img
                  src={ASTERION_IMAGES.awakenCrimsonRain}
                  alt="Obsidian black ASTERION performance coupe in nocturnal rain with vivid crimson rear LED blades illuminated and reflecting across wet asphalt"
                  referrerPolicy="no-referrer"
                  draggable={false}
                  className="w-full h-full object-cover select-none"
                />
              </div>

              {/* Localized Optical LED Filament Ignition Flash (strictly anchored to the twin LED housings) */}
              <div
                aria-hidden="true"
                className={`absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-500 ease-out ${
                  isPulsing
                    ? 'opacity-90'
                    : unlockStage === 'illuminating'
                    ? 'opacity-45'
                    : unlockStage === 'unlocked'
                    ? 'opacity-20'
                    : 'opacity-0'
                }`}
                style={{
                  background: `
                    radial-gradient(ellipse 6.5% 4.5% at 18.4% 39.0%, rgba(255, 62, 68, 0.72) 0%, rgba(210, 22, 34, 0.28) 52%, transparent 100%),
                    radial-gradient(ellipse 11.5% 5.2% at 44.2% 39.5%, rgba(255, 62, 68, 0.78) 0%, rgba(210, 22, 34, 0.32) 54%, transparent 100%),
                    radial-gradient(ellipse 18% 0.9% at 44.2% 39.5%, rgba(255, 190, 185, 0.45) 0%, transparent 100%)
                  `,
                }}
              />

              {/* Restrained Bodywork Specular Reflection Sweep During Ignition */}
              <div
                aria-hidden="true"
                className={`absolute inset-0 pointer-events-none transition-[transform,opacity] duration-[1250ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isIlluminated
                    ? 'translate-x-[28%] opacity-0'
                    : isPulsing
                    ? '-translate-x-[18%] opacity-55'
                    : '-translate-x-[45%] opacity-0'
                }`}
                style={{
                  background:
                    'linear-gradient(108deg, transparent 36%, rgba(244, 240, 232, 0.09) 48%, rgba(199, 173, 122, 0.11) 51%, transparent 62%)',
                }}
              />

              {/* Physically Plausible Multi-Depth Falling Rain Canvas */}
              {!prefersReducedMotion && (
                <canvas
                  ref={canvasRef}
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                />
              )}

              {/* Subtle Perimeter Vignette Preserving Road Reflections & Crisp Contrast */}
              <div
                aria-hidden="true"
                className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-[#08090B]/70 via-transparent to-[#08090B]/35"
              />
            </div>

            {/* Interactive Unlock Control & Status Bar */}
            <div className="relative z-30 px-6 sm:px-8 py-6 bg-[#0D0F13] border-t border-white/[0.08] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-1.5" aria-live="polite">
                <p className="text-xs tracking-[0.2em] uppercase text-[#C7AD7A]">
                  {unlockStage === 'locked' && 'Rear Optical Signature · Dormant'}
                  {isTransitioning && 'Central Locking Released · Igniting Crimson LED Blades...'}
                  {unlockStage === 'unlocked' && 'Asterion Unlocked · Crimson Signature Active'}
                </p>
                <p className="text-xs sm:text-sm text-[#9A9A96]">
                  {unlockStage === 'locked' &&
                    'Click Unlock Asterion to engage the central-locking cue, rear crimson LED blade signature, and wet-asphalt reflections.'}
                  {isTransitioning &&
                    'Synchronizing acoustic latch release with progressive rear LED illumination.'}
                  {unlockStage === 'unlocked' &&
                    'Rear optical blades illuminated. Inspect The Machine on its dedicated showcase page or lock to replay.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {unlockStage !== 'unlocked' ? (
                  <button
                    type="button"
                    disabled={isTransitioning || isCoolingDown}
                    aria-busy={isTransitioning}
                    onClick={handleUnlock}
                    className={`inline-flex items-center justify-center gap-3 px-7 py-4 text-xs font-medium tracking-[0.2em] uppercase transition-[background-color,transform,opacity] duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E8] ${
                      isTransitioning
                        ? 'bg-[#C7AD7A]/65 text-[#08090B] cursor-wait'
                        : 'bg-[#C7AD7A] text-[#08090B] hover:bg-[#D5BE90] active:scale-[0.98] cursor-pointer'
                    }`}
                  >
                    <Unlock className="w-4 h-4" />
                    <span>{isTransitioning ? 'UNLOCKING...' : 'UNLOCK ASTERION'}</span>
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleResetLock}
                      aria-label="Asterion unlocked. Click to lock vehicle and reset lighting sequence"
                      className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 text-xs font-medium tracking-[0.18em] uppercase text-[#F4F0E8] border border-[#C7AD7A]/65 bg-[#171A20] hover:border-[#C7AD7A] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      <Lock className="w-3.5 h-3.5 text-[#C7AD7A]" />
                      <span>ASTERION UNLOCKED</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigate('vehicle')}
                      className="inline-flex items-center justify-center gap-3 px-6 py-3.5 text-xs font-medium tracking-[0.18em] uppercase text-[#08090B] bg-[#C7AD7A] hover:bg-[#D5BE90] active:scale-[0.98] transition-[background-color,transform] duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E8]"
                    >
                      <span>DISCOVER THE MACHINE</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
