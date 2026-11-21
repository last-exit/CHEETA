/**
 * Bespoke procedural audio synthesis for Cheeta Jewels.
 * Zero external audio assets, zero latency, ultra-subtle mechanical and optical haptics.
 * Muted by default on mobile / if AudioContext is unsupported.
 */

let sharedContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!sharedContext) {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (AudioCtx) {
      try {
        sharedContext = new AudioCtx();
      } catch {
        sharedContext = null;
      }
    }
  }
  if (sharedContext && sharedContext.state === "suspended") {
    // Resume context on explicit user gesture
    sharedContext.resume().catch(() => {});
  }
  return sharedContext;
}

/**
 * Ultra-precise mechanical latch / cylinder click.
 * Emulates the tactile indexing of an antique break-action firearm or Leica shutter.
 * 18ms transient burst with a 2.8kHz resonant ring, gain capped at 0.05.
 */
export function playMetallicClick() {
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== "running") return;

  try {
    const now = ctx.currentTime;

    // Transient impulse oscillator (high-frequency ping)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(2800, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.018);

    oscGain.gain.setValueAtTime(0.045, now);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.02);

    // Mechanical snap (filtered noise impulse)
    const bufferSize = Math.floor(ctx.sampleRate * 0.012);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(3200, now);
    filter.Q.setValueAtTime(4.0, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.035, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noiseSource.start(now);
    noiseSource.stop(now + 0.014);
  } catch {
    // Audio synthesis failure should never interrupt UI
  }
}

/**
 * Optical glass resonance.
 * A delicate, crystalline ping when swapping tinted Zeiss lenses or optical filters.
 * 4.2kHz downward glissando with silky velvet decay.
 */
export function playOpticalGlass() {
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== "running") return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(4400, now);
    osc.frequency.exponentialRampToValueAtTime(2200, now + 0.075);

    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.085);
  } catch {
    // Audio synthesis failure should never interrupt UI
  }
}

/**
 * Vault lock bolt engagement.
 * Rich low-frequency mechanical latch for piece acquisition / case open.
 */
export function playVaultAcquisition() {
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== "running") return;

  try {
    const now = ctx.currentTime;

    // Sub-bass thump
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = "triangle";
    subOsc.frequency.setValueAtTime(140, now);
    subOsc.frequency.exponentialRampToValueAtTime(45, now + 0.09);

    subGain.gain.setValueAtTime(0.07, now);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.1);

    // High mechanical catch
    playMetallicClick();
  } catch {
    // Audio synthesis failure should never interrupt UI
  }
}

