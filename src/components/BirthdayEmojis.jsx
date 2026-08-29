// src/components/BirthdayEmojis.jsx
// Decorative layer of floating birthday emojis that rise and drift,
// used as a festive background across scenes.
import { useState } from 'react';
import { motion } from 'framer-motion';

const DEFAULT_EMOJIS = ['🎈', '🎉', '🎊', '🎂', '🎁', '🥳', '🎇', '💖', '⭐', '✨'];

const BirthdayEmojis = ({ emojis = DEFAULT_EMOJIS, count = 24, opacity = 0.55 }) => {
  const [items] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 7 + Math.random() * 6,
      size: 18 + Math.random() * 26,
      emoji: emojis[i % emojis.length],
      sway: (Math.random() - 0.5) * 120,
      drift: (Math.random() - 0.5) * 120,
      startY: Math.random() * 100,
    }))
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden',
      }}
      aria-hidden
    >
      {items.map((it) => (
        <motion.span
          key={it.id}
          initial={{ y: `${it.startY}vh`, x: 0, opacity: 0 }}
          animate={{
            y: ['-10vh', '110vh'],
            x: [0, it.sway, -it.sway, it.drift, 0],
            rotate: [0, it.drift, -it.sway, 0],
            opacity: [0, opacity, opacity, 0],
          }}
          transition={{
            delay: it.delay,
            duration: it.duration,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${it.left}%`,
            fontSize: it.size,
            color: 'white',
            textShadow: '0 2px 8px rgba(0,0,0,0.25)',
          }}
        >
          {it.emoji}
        </motion.span>
      ))}
    </div>
  );
};

export default BirthdayEmojis;
