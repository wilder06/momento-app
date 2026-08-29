// src/hooks/useBirthdaySong.js
// Synthesizes the "Happy Birthday" melody with the WebAudio API:
//  - No external audio files needed (lightweight, no CORS/autoplay issues)
//  - Loops continuously so the user can enjoy it through the whole experience
//  - Must be started by a user gesture (browsers block autoplay on mobile)
import { useRef, useState, useEffect } from 'react';

// Note frequencies (A4 = 440)
const N = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
  G4: 392.0, A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880,
};

// "Happy Birthday to You" melody: [note, beats]
const MELODY = [
  [N.G4, 0.75], [N.G4, 0.25], [N.A4, 1], [N.G4, 1], [N.C5, 1], [N.B4, 2],
  [N.G4, 0.75], [N.G4, 0.25], [N.A4, 1], [N.G4, 1], [N.D5, 1], [N.C5, 2],
  [N.G4, 0.75], [N.G4, 0.25], [N.G5, 1], [N.E5, 1], [N.C5, 1], [N.B4, 1], [N.A4, 2],
  [N.F4, 0.75], [N.F4, 0.25], [N.E4, 1], [N.C4, 1], [N.D4, 1], [N.C4, 2.5],
];

const BPM = 100; // beats per minute
const BEAT = 60 / BPM;

export const useBirthdaySong = () => {
  const ctxRef = useRef(null);
  const timerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const stop = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (ctxRef.current) {
      ctxRef.current.close().catch(() => {});
      ctxRef.current = null;
    }
    setIsPlaying(false);
  };

  const playNote = (audioCtx, oscType, freq, start, dur, volume) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = oscType;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(start);
    osc.stop(start + dur + 0.05);
  };

  // schedule one full melody pass, then loop
  const scheduleLoop = (audioCtx) => {
    const now = audioCtx.currentTime;
    let t = now + 0.05;
    MELODY.forEach(([freq, beats], i) => {
      playNote(audioCtx, 'triangle', freq, t, beats * BEAT * 0.95, 0.35);
      // soft accompaniment
      if (i % 2 === 0) {
        playNote(audioCtx, 'sine', freq / 2, t, beats * BEAT, 0.12);
      }
      t += beats * BEAT;
    });
    const passDuration = (t - now) * 1000;
    timerRef.current = setTimeout(() => scheduleLoop(audioCtx), passDuration);
  };

  const play = () => {
    if (ctxRef.current) return; // already playing
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    ctxRef.current = ctx;
    scheduleLoop(ctx);
    setIsPlaying(true);
  };

  const toggle = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  };

  useEffect(() => () => stop(), []);

  return { isPlaying, toggle, stop };
};
