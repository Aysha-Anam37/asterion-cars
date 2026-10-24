import React, { useEffect, useState } from 'react';
import { CloudRain, Volume2, VolumeX } from 'lucide-react';
import { asterionAudio } from '../utils/asterionAudio';

/**
 * Discreet session-persistent floating sound control that appears when optional rain ambience
 * is active, allowing the visitor to pause rain ambience or mute/unmute audio from anywhere
 * on the site without cluttering the primary navigation bar.
 */
export const FloatingAudioControl: React.FC = () => {
  const [audioState, setAudioState] = useState(() => asterionAudio.getState());

  useEffect(() => {
    return asterionAudio.subscribe(setAudioState);
  }, []);

  if (!audioState.rainActive) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Active rain ambience audio controls"
      className="fixed bottom-5 right-5 z-40 flex items-center bg-[#0D0F13]/92 backdrop-blur-md border border-white/15 shadow-lg"
    >
      <button
        type="button"
        aria-pressed={audioState.rainActive}
        onClick={() => asterionAudio.setRainAmbience(false)}
        className="inline-flex items-center gap-2 px-3.5 py-2.5 text-[11px] font-medium tracking-[0.14em] uppercase text-[#F4F0E8] hover:text-[#C7AD7A] transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#C7AD7A]"
      >
        <CloudRain className="w-3.5 h-3.5 text-[#C7AD7A]" />
        <span>Rain On</span>
      </button>

      <button
        type="button"
        aria-pressed={audioState.muted}
        aria-label={audioState.muted ? 'Unmute rain ambience' : 'Mute rain ambience'}
        onClick={() => asterionAudio.toggleMuted()}
        className="inline-flex items-center justify-center w-10 h-10 border-l border-white/12 text-[#F4F0E8] hover:text-[#C7AD7A] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#C7AD7A]"
      >
        {audioState.muted ? (
          <VolumeX className="w-4 h-4 text-[#9A9A96]" />
        ) : (
          <Volume2 className="w-4 h-4 text-[#C7AD7A]" />
        )}
      </button>
    </div>
  );
};
