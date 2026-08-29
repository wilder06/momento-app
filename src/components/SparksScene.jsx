// src/components/SparksScene.jsx
// "Globos de deseos" — an interactive, spectacular scene of floating
// balloons. Tap each balloon to pop it and release a wish written only
// by you. When all are popped, confetti rains and the scene advances.
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../config';
import ConfettiBurst from './ConfettiBurst';
import BirthdayEmojis from './BirthdayEmojis';
import { useSounds } from '../hooks/useSounds';

const COLORS = ['#ff5e8a', '#ffb03a', '#6bcb77', '#4d96ff', '#9b59b6', '#ff6f61', '#f9a825', '#00bcd4'];

const SparksScene = ({ onComplete }) => {
  const { pop, chime } = useSounds();
  const messages = CONFIG.sparkMessages;
  const [popped, setPopped] = useState(() => messages.map(() => false));
  const [revealed, setRevealed] = useState(null);
  const [burstId, setBurstId] = useState(null);
  const [allPopped, setAllPopped] = useState(false);

  // Random stable positions/sizes per balloon
  const [balloons] = useState(() =>
    messages.map((_, i) => ({
      left: 8 + Math.random() * 70,
      top: 10 + Math.random() * 55,
      size: 54 + Math.random() * 34,
      sway: (Math.random() - 0.5) * 24,
      delay: Math.random() * 1.5,
      color: COLORS[i % COLORS.length],
    }))
  );

  const popBalloon = (i) => {
    if (popped[i]) return;
    pop();
    const nextPopped = popped.map((p, idx) => (idx === i ? true : p));
    setPopped(nextPopped);
    setBurstId(i);
    setRevealed(i);
    if (nextPopped.every(Boolean)) {
      setAllPopped(true);
      chime();
      setTimeout(onComplete, 2600);
    }
    setTimeout(() => setRevealed(null), 2600);
    setTimeout(() => setBurstId(null), 600);
  };

  const remaining = popped.filter((p) => !p).length;

  // Safety net: if the user never pops all balloons, advance automatically
  useEffect(() => {
    const t = setTimeout(onComplete, 30000);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div
      style={{
        textAlign: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        position: 'relative',
        minHeight: '78dvh',
      }}
    >
      <BirthdayEmojis count={16} />

      <h2 className="scene-title">{CONFIG.sparkTitle}</h2>
      <p className="scene-sub" style={{ fontSize: '0.98rem', maxWidth: '520px' }}>
        {CONFIG.sparkIntro}
      </p>
      <p className="scene-sub" style={{ fontSize: '0.85rem', opacity: 0.85 }}>
        🎈 {remaining} globo(s) pendiente(s)
      </p>

      {/* Balloon field */}
      <div
        style={{
          position: 'relative',
          width: 'min(560px, 96vw)',
          height: '52dvh',
          minHeight: '320px',
          marginTop: '6px',
        }}
      >
        <AnimatePresence>
          {messages.map((msg, i) =>
            !popped[i] ? (
              <motion.button
                key={i}
                layout
                initial={{ opacity: 0, scale: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -10, 0],
                  x: [0, balloons[i].sway, 0],
                }}
                exit={{ scale: 1.6, opacity: 0, rotate: 6 }}
                transition={{
                  opacity: { delay: 0.3 + i * 0.12 },
                  scale: { delay: 0.3 + i * 0.12, type: 'spring', stiffness: 200, damping: 14 },
                  y: { repeat: Infinity, duration: 2.4 + i * 0.3, ease: 'easeInOut' },
                  x: { repeat: Infinity, duration: 3 + i * 0.2, ease: 'easeInOut' },
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() => popBalloon(i)}
                aria-label={`Globo ${i + 1}`}
                style={{
                  position: 'absolute',
                  left: `${balloons[i].left}%`,
                  top: `${balloons[i].top}%`,
                  width: balloons[i].size,
                  height: balloons[i].size * 1.1,
                  background: `radial-gradient(circle at 35% 30%, ${balloons[i].color}dd, ${balloons[i].color})`,
                  borderRadius: '50% 50% 46% 46% / 52% 52% 48% 48%',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: `0 8px 22px ${balloons[i].color}66`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                }}
              >
                <span style={{ fontSize: balloons[i].size * 0.5 }}>✨</span>
              </motion.button>
            ) : null
          )}
        </AnimatePresence>

        {/* burst particles for last popped */}
        {burstId !== null && (
          <div
            style={{
              position: 'absolute',
              left: `${balloons[burstId].left}%`,
              top: `${balloons[burstId].top}%`,
              pointerEvents: 'none',
              zIndex: 5,
            }}
          >
            {Array.from({ length: 12 }).map((_, j) => (
              <motion.span
                key={j}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos((j / 12) * Math.PI * 2) * 60,
                  y: Math.sin((j / 12) * Math.PI * 2) * 60,
                  opacity: 0,
                  scale: 0.3,
                }}
                transition={{ duration: 0.6 }}
                style={{
                  position: 'absolute',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: balloons[burstId].color,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {allPopped && <ConfettiBurst emojis count={90} />}

      {/* Revealed wish */}
      <AnimatePresence>
        {revealed !== null && (
          <motion.div
            key={revealed}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 160, damping: 14 }}
            style={{
              background: 'linear-gradient(135deg,#fff,#fff6f0)',
              color: '#5a4a3a',
              borderRadius: '16px',
              padding: '18px 22px',
              boxShadow: '0 14px 34px rgba(0,0,0,0.22)',
              maxWidth: '420px',
              border: `3px solid ${COLORS[revealed % COLORS.length]}55`,
            }}
          >
            <div style={{ fontSize: '1.4rem' }}>🎈💫</div>
            <p style={{ fontSize: '1.08rem', lineHeight: 1.6, margin: '8px 0 4px' }}>
              {messages[revealed]}
            </p>
            <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#999', margin: 0 }}>
              — de parte de {CONFIG.senderName}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SparksScene;
