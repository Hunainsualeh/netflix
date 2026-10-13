/**
 * Tiny synthesized audio engine (no audio files needed).
 * - ambient music beds per profile mood
 * - the "tu-dum" logo sting
 * - the Happy Birthday melody as a music box
 * Browsers only allow audio after a user gesture, so everything lazily creates the context on first call.
 */

export type MusicMood = "warm" | "dreamy" | "fairytale" | "playful";

const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

interface MoodDef {
  /** seconds per step */
  step: number;
  stepsPerBar: number;
  chords: number[][];
  arp: number[][]; // per step, indexes into chord (+12 if >= 10)
  wave: OscillatorType;
  pad: number;
  pluck: number;
  decay: number;
}

const MOODS: Record<MusicMood, MoodDef> = {
  warm: {
    step: 0.46,
    stepsPerBar: 8,
    chords: [
      [48, 52, 55, 59],
      [45, 48, 52, 55],
      [41, 45, 48, 52],
      [43, 47, 50, 52],
    ],
    arp: [[0], [2], [3], [2], [1], [3], [2], [3]],
    wave: "triangle",
    pad: 0.035,
    pluck: 0.07,
    decay: 1.6,
  },
  dreamy: {
    step: 0.5,
    stepsPerBar: 8,
    chords: [
      [50, 53, 57, 60],
      [46, 50, 53, 57],
      [43, 46, 50, 53],
      [45, 49, 52, 55],
    ],
    arp: [[0], [1], [2], [3], [2], [1], [3], [2]],
    wave: "sine",
    pad: 0.04,
    pluck: 0.06,
    decay: 2.1,
  },
  fairytale: {
    step: 0.29,
    stepsPerBar: 6,
    chords: [
      [48, 52, 55, 60],
      [43, 47, 50, 55],
      [45, 48, 52, 57],
      [41, 45, 48, 53],
    ],
    arp: [[3], [1], [2], [3], [2], [1]],
    wave: "sine",
    pad: 0.02,
    pluck: 0.09,
    decay: 1.4,
  },
  playful: {
    step: 0.3,
    stepsPerBar: 8,
    chords: [
      [48, 52, 55, 60],
      [43, 47, 50, 55],
      [45, 48, 52, 57],
      [41, 45, 48, 53],
    ],
    arp: [[0], [2], [1], [2], [3], [2], [1], [2]],
    wave: "triangle",
    pad: 0.015,
    pluck: 0.08,
    decay: 0.7,
  },
};

class Engine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private music: GainNode | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private mood: MusicMood | null = null;
  private nextTime = 0;
  private stepIndex = 0;
  volume = 0.7;
  muted = false;

  private ensure(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : this.volume;
      const comp = this.ctx.createDynamicsCompressor();
      this.master.connect(comp).connect(this.ctx.destination);
      this.music = this.ctx.createGain();
      this.music.gain.value = 1;
      this.music.connect(this.master);
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
    return this.ctx;
  }

  /** Call from a user gesture to unlock audio on iOS/Safari. */
  unlock() {
    this.ensure();
  }

  setVolume(v: number) {
    this.volume = Math.min(1, Math.max(0, v));
    this.applyGain();
  }

  setMuted(m: boolean) {
    this.muted = m;
    this.applyGain();
  }

  private applyGain() {
    if (!this.ctx || !this.master) return;
    this.master.gain.setTargetAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime, 0.05);
  }

  private pluck(freq: number, t: number, gain: number, wave: OscillatorType, decay: number, dest: AudioNode) {
    const ctx = this.ctx!;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
    g.connect(dest);
    const o = ctx.createOscillator();
    o.type = wave;
    o.frequency.value = freq;
    o.connect(g);
    o.start(t);
    o.stop(t + decay + 0.1);
    // soft bell partial
    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0.0001, t);
    g2.gain.exponentialRampToValueAtTime(gain * 0.28, t + 0.01);
    g2.gain.exponentialRampToValueAtTime(0.0001, t + decay * 0.5);
    g2.connect(dest);
    const o2 = ctx.createOscillator();
    o2.type = "sine";
    o2.frequency.value = freq * 3;
    o2.connect(g2);
    o2.start(t);
    o2.stop(t + decay * 0.5 + 0.1);
  }

  private padChord(notes: number[], t: number, dur: number, gain: number) {
    const ctx = this.ctx!;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 900;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(gain, t + dur * 0.35);
    g.gain.linearRampToValueAtTime(0.0001, t + dur + 0.6);
    lp.connect(g).connect(this.music!);
    for (const n of notes) {
      for (const detune of [-5, 5]) {
        const o = ctx.createOscillator();
        o.type = "triangle";
        o.frequency.value = mtof(n);
        o.detune.value = detune;
        o.connect(lp);
        o.start(t);
        o.stop(t + dur + 0.7);
      }
    }
  }

  private schedule() {
    const ctx = this.ctx;
    if (!ctx || !this.mood) return;
    const def = MOODS[this.mood];
    while (this.nextTime < ctx.currentTime + 0.35) {
      const bar = Math.floor(this.stepIndex / def.stepsPerBar);
      const inBar = this.stepIndex % def.stepsPerBar;
      const chord = def.chords[bar % def.chords.length];
      if (inBar === 0) this.padChord(chord, this.nextTime, def.step * def.stepsPerBar, def.pad);
      const pick = def.arp[inBar];
      for (const idx of pick) {
        const note = chord[idx % chord.length] + 12;
        this.pluck(mtof(note), this.nextTime, def.pluck, def.wave, def.decay, this.music!);
      }
      if (inBar === 0) this.pluck(mtof(chord[0] - 12 + 12), this.nextTime, def.pluck * 0.9, "sine", def.decay + 0.6, this.music!);
      this.nextTime += def.step;
      this.stepIndex++;
    }
  }

  startMusic(mood: MusicMood) {
    const ctx = this.ensure();
    if (!ctx) return;
    if (this.mood === mood && this.timer) return;
    this.stopMusic(false);
    this.mood = mood;
    this.stepIndex = 0;
    this.nextTime = ctx.currentTime + 0.1;
    this.music!.gain.cancelScheduledValues(ctx.currentTime);
    this.music!.gain.setValueAtTime(0.0001, ctx.currentTime);
    this.music!.gain.linearRampToValueAtTime(1, ctx.currentTime + 2.5);
    this.timer = setInterval(() => this.schedule(), 120);
    this.schedule();
  }

  stopMusic(fade = true) {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.mood = null;
    if (this.ctx && this.music) {
      const t = this.ctx.currentTime;
      this.music.gain.cancelScheduledValues(t);
      this.music.gain.setValueAtTime(this.music.gain.value, t);
      this.music.gain.linearRampToValueAtTime(0.0001, t + (fade ? 0.8 : 0.05));
    }
  }

  /** Pause/resume the whole audio context (used when the player is paused). */
  suspend() {
    if (this.ctx && this.ctx.state === "running") void this.ctx.suspend();
  }
  resume() {
    if (this.ctx && this.ctx.state === "suspended") void this.ctx.resume();
  }

  /** The "tu-dum" sting for the logo animation. */
  tudum() {
    const ctx = this.ensure();
    if (!ctx || !this.master) return;
    const t0 = ctx.currentTime + 0.05;
    const hit = (t: number, f0: number, f1: number, gain: number) => {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.setValueAtTime(f0, t);
      o.frequency.exponentialRampToValueAtTime(f1, t + 0.5);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(gain, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
      o.connect(g).connect(this.master!);
      o.start(t);
      o.stop(t + 1.5);
    };
    hit(t0, 130, 48, 0.9);
    hit(t0 + 0.42, 150, 55, 1);
    // swell
    const len = ctx.sampleRate * 2.4;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
      data[i] = last * 3.5;
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(200, t0 + 0.4);
    lp.frequency.exponentialRampToValueAtTime(2400, t0 + 1.9);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0 + 0.4);
    g.gain.linearRampToValueAtTime(0.35, t0 + 1.5);
    g.gain.linearRampToValueAtTime(0.0001, t0 + 2.4);
    src.connect(lp).connect(g).connect(this.master);
    src.start(t0 + 0.4);
  }

  /** Happy Birthday on a music box. */
  birthday() {
    const ctx = this.ensure();
    if (!ctx || !this.master) return;
    const beat = 0.5;
    // [midi, beats]
    const tune: [number, number][] = [
      [67, 0.75], [67, 0.25], [69, 1], [67, 1], [72, 1], [71, 2],
      [67, 0.75], [67, 0.25], [69, 1], [67, 1], [74, 1], [72, 2],
      [67, 0.75], [67, 0.25], [79, 1], [76, 1], [72, 1], [71, 1], [69, 1],
      [77, 0.75], [77, 0.25], [76, 1], [72, 1], [74, 1], [72, 2],
    ];
    let t = ctx.currentTime + 0.3;
    for (const [n, b] of tune) {
      this.pluck(mtof(n), t, 0.16, "sine", 1.5, this.master);
      this.pluck(mtof(n - 24), t, 0.05, "triangle", 1.2, this.master);
      t += b * beat;
    }
  }

  /** Little confirmation sparkle for easter eggs. */
  sparkle() {
    const ctx = this.ensure();
    if (!ctx || !this.master) return;
    const t = ctx.currentTime + 0.02;
    [84, 88, 91, 96].forEach((n, i) => this.pluck(mtof(n), t + i * 0.09, 0.1, "sine", 1.1, this.master!));
  }
}

export const audio = new Engine();
