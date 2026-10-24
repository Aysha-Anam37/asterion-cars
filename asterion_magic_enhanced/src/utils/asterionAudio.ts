/**
 * Original browser-native Web Audio sound synthesis for ASTERION.
 * - Never autoplays on page load; AudioContext is created/resumed strictly inside user gestures.
 * - Gracefully handles unsupported or restricted audio environments without throwing errors.
 * - Persists mute preference in sessionStorage for the current session.
 */

const SESSION_MUTE_KEY = 'asterion_audio_muted';

type AudioStateListener = (state: { muted: boolean; rainActive: boolean }) => void;

class AsterionAudioController {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private rainSource: AudioBufferSourceNode | null = null;
  private rainGain: GainNode | null = null;
  private muted: boolean = false;
  private rainActive: boolean = false;
  private listeners: Set<AudioStateListener> = new Set();

  constructor() {
    this.muted = this.readInitialMuteState();
  }

  private readInitialMuteState(): boolean {
    if (typeof window === 'undefined') return false;
    try {
      return window.sessionStorage.getItem(SESSION_MUTE_KEY) === 'true';
    } catch {
      return false;
    }
  }

  private persistMuteState(muted: boolean) {
    if (typeof window === 'undefined') return;
    try {
      window.sessionStorage.setItem(SESSION_MUTE_KEY, muted ? 'true' : 'false');
    } catch {
      // Ignore storage restrictions in private sandboxes
    }
  }

  public getState() {
    return {
      muted: this.muted,
      rainActive: this.rainActive,
    };
  }

  public subscribe(listener: AudioStateListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit() {
    const snapshot = this.getState();
    this.listeners.forEach((fn) => fn(snapshot));
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return null;

        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = this.muted ? 0 : 1;
        this.masterGain.connect(this.ctx.destination);
      }

      if (this.ctx.state === 'suspended') {
        void this.ctx.resume().catch(() => {});
      }

      return this.ctx;
    } catch {
      return null;
    }
  }

  public setMuted(nextMuted: boolean) {
    this.muted = nextMuted;
    this.persistMuteState(nextMuted);

    try {
      if (this.ctx && this.masterGain) {
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.linearRampToValueAtTime(nextMuted ? 0 : 1, now + 0.12);
      }
    } catch {
      // Fail gracefully
    }

    this.emit();
  }

  public toggleMuted() {
    this.setMuted(!this.muted);
  }

  /**
   * Plays a refined, multi-stage luxury vehicle unlock & headlight ignition sequence:
   * 1. Precision solid-state latch relay click
   * 2. Warm two-note crystalline cabin chime (F#4 -> C#5)
   * 3. Restrained optical headlight ballast rise & subtle low-frequency chassis awakening
   */
  public playUnlockSequence() {
    if (this.muted) return;

    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;

      // 1. Tactile Mechanical Latch Click (0.00s)
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      const clickFilter = ctx.createBiquadFilter();

      clickOsc.type = 'triangle';
      clickOsc.frequency.setValueAtTime(1320, now);
      clickOsc.frequency.exponentialRampToValueAtTime(420, now + 0.032);

      clickFilter.type = 'bandpass';
      clickFilter.frequency.setValueAtTime(1100, now);
      clickFilter.Q.setValueAtTime(1.8, now);

      clickGain.gain.setValueAtTime(0.0001, now);
      clickGain.gain.linearRampToValueAtTime(0.075, now + 0.004);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      clickOsc.connect(clickFilter);
      clickFilter.connect(clickGain);
      clickGain.connect(this.masterGain);

      clickOsc.start(now);
      clickOsc.stop(now + 0.045);

      // 2. Refined Two-Pulse Electronic Unlock Chime (0.05s & 0.19s)
      const notes = [
        { freq: 369.99, start: now + 0.055, duration: 0.36, peak: 0.052 }, // F#4
        { freq: 554.37, start: now + 0.195, duration: 0.58, peak: 0.058 }, // C#5
      ];

      notes.forEach((note) => {
        const osc = ctx.createOscillator();
        const subOsc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        const lpFilter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.freq, note.start);

        subOsc.type = 'triangle';
        subOsc.frequency.setValueAtTime(note.freq * 2, note.start);

        const subGain = ctx.createGain();
        subGain.gain.setValueAtTime(0.14, note.start);

        lpFilter.type = 'lowpass';
        lpFilter.frequency.setValueAtTime(2400, note.start);

        noteGain.gain.setValueAtTime(0.0001, note.start);
        noteGain.gain.linearRampToValueAtTime(note.peak, note.start + 0.018);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, note.start + note.duration);

        osc.connect(lpFilter);
        subOsc.connect(subGain);
        subGain.connect(lpFilter);
        lpFilter.connect(noteGain);
        noteGain.connect(this.masterGain!);

        osc.start(note.start);
        subOsc.start(note.start);
        osc.stop(note.start + note.duration + 0.02);
        subOsc.stop(note.start + note.duration + 0.02);
      });

      // 3. Restrained Optical Headlight Activation Sweep (0.30s -> 1.45s)
      const lightOsc = ctx.createOscillator();
      const lightGain = ctx.createGain();
      const lightFilter = ctx.createBiquadFilter();

      lightOsc.type = 'sine';
      lightOsc.frequency.setValueAtTime(185, now + 0.3);
      lightOsc.frequency.exponentialRampToValueAtTime(370, now + 1.35);

      lightFilter.type = 'lowpass';
      lightFilter.frequency.setValueAtTime(900, now + 0.3);

      lightGain.gain.setValueAtTime(0.0001, now + 0.3);
      lightGain.gain.linearRampToValueAtTime(0.026, now + 0.68);
      lightGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

      lightOsc.connect(lightFilter);
      lightFilter.connect(lightGain);
      lightGain.connect(this.masterGain);

      lightOsc.start(now + 0.3);
      lightOsc.stop(now + 1.55);

      // 4. Deep, Controlled Sub-Bass Presence Pulse (0.55s -> 1.90s)
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      const bassFilter = ctx.createBiquadFilter();

      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(62, now + 0.55);
      bassOsc.frequency.exponentialRampToValueAtTime(46, now + 1.85);

      bassFilter.type = 'lowpass';
      bassFilter.frequency.setValueAtTime(120, now + 0.55);

      bassGain.gain.setValueAtTime(0.0001, now + 0.55);
      bassGain.gain.linearRampToValueAtTime(0.055, now + 0.85);
      bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.9);

      bassOsc.connect(bassFilter);
      bassFilter.connect(bassGain);
      bassGain.connect(this.masterGain);

      bassOsc.start(now + 0.55);
      bassOsc.stop(now + 1.95);
    } catch {
      // Fail gracefully without interrupting visual animation
    }
  }

  /**
   * Plays a quiet single confirmation tone when locking/resetting the vehicle scene.
   */
  public playLockCue() {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(369.99, now);
      osc.frequency.exponentialRampToValueAtTime(277.18, now + 0.22);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.038, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.27);
    } catch {
      // Fail gracefully
    }
  }

  /**
   * Starts or stops the optional soft nighttime rain ambience.
   * Disabled by default; only runs when explicitly enabled by the visitor.
   */
  public setRainAmbience(active: boolean) {
    if (active === this.rainActive) return;

    if (!active) {
      this.stopRainInternal();
      this.rainActive = false;
      this.emit();
      return;
    }

    // If user activates rain ambience while muted, unmute automatically so their explicit request is audible
    if (this.muted) {
      this.muted = false;
      this.persistMuteState(false);
    }

    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) {
      this.rainActive = false;
      this.emit();
      return;
    }

    try {
      this.masterGain.gain.setValueAtTime(1, ctx.currentTime);

      const sampleRate = ctx.sampleRate;
      const length = sampleRate * 4;
      const buffer = ctx.createBuffer(2, length, sampleRate);

      // Synthesize smooth pink-contoured stereo rainfall with subtle wet-asphalt micro-patter
      for (let ch = 0; ch < 2; ch++) {
        const data = buffer.getChannelData(ch);
        let b0 = 0,
          b1 = 0,
          b2 = 0,
          b3 = 0,
          b4 = 0,
          b5 = 0,
          b6 = 0;

        for (let i = 0; i < length; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          b6 = white * 0.115926;

          // Seamless loop crossfade envelope at edges
          let edgeFade = 1;
          const fadeSamples = Math.floor(sampleRate * 0.08);
          if (i < fadeSamples) {
            edgeFade = i / fadeSamples;
          } else if (i > length - fadeSamples) {
            edgeFade = (length - i) / fadeSamples;
          }

          data[i] = pink * 0.045 * edgeFade;
        }
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      // Sculpted filtering for warm nocturnal rainfall on tarmac (avoiding harsh high hiss)
      const highpass = ctx.createBiquadFilter();
      highpass.type = 'highpass';
      highpass.frequency.setValueAtTime(240, ctx.currentTime);

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(2150, ctx.currentTime);

      const rainGain = ctx.createGain();
      rainGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      rainGain.gain.linearRampToValueAtTime(0.32, ctx.currentTime + 0.75);

      source.connect(highpass);
      highpass.connect(lowpass);
      lowpass.connect(rainGain);
      rainGain.connect(this.masterGain);

      source.start();

      this.rainSource = source;
      this.rainGain = rainGain;
      this.rainActive = true;
      this.emit();
    } catch {
      this.rainActive = false;
      this.emit();
    }
  }

  public toggleRainAmbience() {
    this.setRainAmbience(!this.rainActive);
  }

  private stopRainInternal() {
    try {
      if (this.ctx && this.rainGain && this.rainSource) {
        const now = this.ctx.currentTime;
        const srcToStop = this.rainSource;
        this.rainGain.gain.cancelScheduledValues(now);
        this.rainGain.gain.setValueAtTime(this.rainGain.gain.value, now);
        this.rainGain.gain.linearRampToValueAtTime(0.0001, now + 0.3);
        window.setTimeout(() => {
          try {
            srcToStop.stop();
            srcToStop.disconnect();
          } catch {
            // Already stopped
          }
        }, 340);
      }
    } catch {
      // Ignore cleanup errors
    } finally {
      this.rainSource = null;
      this.rainGain = null;
    }
  }
}

export const asterionAudio = new AsterionAudioController();
