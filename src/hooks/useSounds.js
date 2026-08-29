// src/hooks/useSounds.js
// Tiny synthesized sound effects (SFX) via WebAudio — no audio files needed.
// Each effect is a short procedural sound that reinforces an interaction:
//  - pop: balloon burst / gift open
//  - blow: blowing out a candle (soft descending hiss)
//  - chime: success / confirmation (cheerful arpeggio)
// Uses the same AudioContext as the music so it keeps working after the
// user's first gesture unlocks audio.
import { useRef } from 'react';

const getCtx = () => {
  if (typeof window === 'undefined') return null;
  return window.__sfxCtx || new (window.AudioContext || window.webkitAudioContext)();
};

const ensureCtx = () => {
  const ctx = getCtx();
  window.__sfxCtx = ctx;
  if (ctx && ctx.state === 'suspended') ctx.resume();
  return ctx;
};

export const useSounds = () => {
  const ctxRef = useRef(null);

  const ctx = () => {
    if (!ctxRef.current) ctxRef.current = ensureCtx();
    return ctxRef.current;
  };

  // short percussive pop (balloon / gift)
  const pop = () => {
    try {
      const ac = ctx();
      const t = ac.currentTime;
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(900, t);
      osc.frequency.exponentialRampToValueAtTime(120, t + 0.09);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(t);
      osc.stop(t + 0.14);
    } catch { /* audio unavailable */ }
  };

  // soft breathy "pff" for blowing out a candle
  const blow = () => {
    try {
      const ac = ctx();
      const t = ac.currentTime;
      const bufferSize = Math.floor(ac.sampleRate * 0.4);
      const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const env = 1 - i / bufferSize;
        data[i] = (Math.random() * 2 - 1) * env * env;
      }
      const src = ac.createBufferSource();
      src.buffer = buffer;
      const gain = ac.createGain();
      gain.gain.setValueAtTime(0.28, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
      const filter = ac.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(500, t);
      filter.frequency.exponentialRampToValueAtTime(180, t + 0.4);
      src.connect(filter);
      filter.connect(gain);
      gain.connect(ac.destination);
      src.start(t);
    } catch { /* audio unavailable */ }
  };

  // cheerful success arpeggio
  const chime = () => {
    try {
      const ac = ctx();
      const t = ac.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = 'sine';
        osc.frequency.value = f;
        const start = t + i * 0.09;
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.2, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.35);
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.start(start);
        osc.stop(start + 0.4);
      });
    } catch { /* audio unavailable */ }
  };

  return { pop, blow, chime };
};
