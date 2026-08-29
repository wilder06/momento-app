// src/components/ConfettiBurst.jsx
// Cheap, dependency-free confetti / streamers using framer-motion.
import { useState } from 'react';
import { motion } from 'framer-motion';

const COLORS = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bff', '#ff9f43', '#ff5e8a'];
const EMOJIS = ['🎈', '🎉', '🎊', '🎂', '🎁', '🥳'];

const ConfettiBurst = ({ count = 80, emojis = false }) => {
  const [pieces] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: 2.5 + Math.random() * 2,
      color: COLORS[i % COLORS.length],
      size: 6 + Math.random() * 8,
      rotate: Math.random() * 360,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
      sway: (Math.random() - 0.5) * 120,
      startY: -20 - Math.random() * 20,
      emoji: emojis && Math.random() > 0.45 ? EMOJIS[i % EMOJIS.length] : null,
    }))
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50,
        overflow: 'hidden',
      }}
      aria-hidden
    >
      {pieces.map((p) =>
        p.emoji ? (
          <motion.span
            key={p.id}
            initial={{ y: p.startY, x: 0, opacity: 1, rotate: 0 }}
            animate={{ y: `120vh`, x: p.sway, rotate: p.rotate * 2, opacity: [1, 1, 0.9, 0.8] }}
            transition={{ delay: p.delay, duration: p.duration, repeat: Infinity, ease: 'easeIn' }}
            style={{
              position: 'absolute',
              left: `${p.left}%`,
              top: 0,
              fontSize: p.size * 2.4,
              lineHeight: 1,
            }}
          >
            {p.emoji}
          </motion.span>
        ) : (
          <motion.div
            key={p.id}
            initial={{ y: p.startY, x: 0, opacity: 1, rotate: 0 }}
            animate={{ y: `120vh`, x: p.sway, rotate: p.rotate * 3, opacity: [1, 1, 0.9, 0.8] }}
            transition={{ delay: p.delay, duration: p.duration, repeat: Infinity, ease: 'easeIn' }}
            style={{
              position: 'absolute',
              left: `${p.left}%`,
              top: 0,
              width: p.size,
              height: p.shape === 'rect' ? p.size * 0.6 : p.size,
              background: p.color,
              borderRadius: p.shape === 'circle' ? '50%' : '3px',
              boxShadow: `0 0 6px ${p.color}88`,
            }}
          />
        )
      )}
    </div>
  );
};

export default ConfettiBurst;
