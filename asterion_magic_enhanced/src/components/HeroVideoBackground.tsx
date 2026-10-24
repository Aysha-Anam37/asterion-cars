import React, { useEffect, useRef, useState } from 'react';
import { ASTERION_HERO_MEDIA, ASTERION_IMAGES } from '../data/asterionData';
import { usePrefersReducedMotion } from '../hooks/useMotionPreferences';
import { ResilientImage } from './ResilientImage';

interface HeroVideoBackgroundProps {
  className?: string;
}

export const HeroVideoBackground: React.FC<HeroVideoBackgroundProps> = ({ className = '' }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const [isHeroInView, setIsHeroInView] = useState(true);

  // Pause background video when scrolled completely out of the viewport to conserve GPU resources
  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          setIsHeroInView(entries[0].isIntersecting);
        }
      },
      { threshold: 0.02 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Enforce strict muted inline playback & respect reduced-motion preferences
  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoFailed) return;

    video.defaultMuted = true;
    video.muted = true;
    video.volume = 0;

    if (prefersReducedMotion || !isHeroInView) {
      video.pause();
      return;
    }

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // If autoplay is blocked by strict browser power-saving mode, keep poster cleanly visible
      });
    }
  }, [prefersReducedMotion, isHeroInView, videoFailed]);

  const showVideoElement = !prefersReducedMotion && !videoFailed;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-[#08090B] ${className}`}
    >
      {/* Poster / Fallback Visual Layer (always ready instantaneously before first video frame & on error) */}
      {!posterFailed ? (
        <img
          src={ASTERION_HERO_MEDIA.posterSrc}
          alt="Obsidian black luxury performance coupe illuminated by sculptural studio lighting and warm reflections"
          loading="eager"
          decoding="sync"
          onError={() => setPosterFailed(true)}
          className="absolute inset-0 w-full h-full object-cover object-[62%_52%] md:object-[center_52%] select-none pointer-events-none"
        />
      ) : (
        <ResilientImage
          src={ASTERION_IMAGES.apexObsidian}
          alt="Obsidian black luxury performance coupe in a dark architectural gallery"
          fallbackLabel="ASTERION CAMPAIGN FILM"
          priority
          className="absolute inset-0 w-full h-full"
          imgClassName="object-[62%_52%] md:object-center"
        />
      )}

      {/* Full-Bleed Muted Commercial Automotive Background Video */}
      {showVideoElement && (
        <video
          ref={videoRef}
          src={ASTERION_HERO_MEDIA.videoSrc}
          poster={ASTERION_HERO_MEDIA.posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          tabIndex={-1}
          onLoadedData={() => setIsVideoReady(true)}
          onPlaying={() => setIsVideoReady(true)}
          onError={() => {
            setVideoFailed(true);
            setIsVideoReady(false);
          }}
          className={`absolute inset-0 w-full h-full object-cover object-[62%_52%] md:object-[center_52%] select-none pointer-events-none transition-opacity duration-700 ease-out ${
            isVideoReady ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};
