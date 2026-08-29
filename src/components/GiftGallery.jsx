// src/components/GiftGallery.jsx
// "Un regalo para ti" — an animated field of floating gift boxes (like the
// balloons scene, no scrolling). Each gift bobs and sways; tap one to pop it
// open, reveal its message, then it disappears. Every gift has its own emoji.
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../config';
import ConfettiBurst from './ConfettiBurst';
import BirthdayEmojis from './BirthdayEmojis';

const PALETTE = ['#ff5e8a', '#ffb03a', '#6bcb77', '#4d96ff', '#9b59b6', '#ff6b6b'];
// Distinct emoji per gift so each box feels unique
const GIFT_ICONS = ['💝', '🎀', '🧸', '🏆', '💐', '🍀'];

const GiftGallery = ({ onComplete }) => {
  const gifts = CONFIG.giftMessages;
  const [opened, setOpened] = useState(() => gifts.map(() => false));
  const [revealed, setRevealed] = useState(null);
  const [burstId, setBurstId] = useState(null);
  const [allOpen, setAllOpen] = useState(false);

  // stable random positions/sizes for the field
  const [boxes] = useState(() =>
    gifts.map((_, i) => ({
      left: 8 + Math.random() * 66,
      top: 12 + Math.random() * 58,
      size: 60 + Math.random() * 30,
      sway: (Math.random() - 0.5) * 26,
      delay: Math.random() * 1.2,
      color: PALETTE[i % PALETTE.length],
      icon: GIFT_ICONS[i % GIFT_ICONS.length],
    }))
  );

  const openGift = (i) => {
    if (opened[i]) return;
    const next = opened.map((o, idx) => (idx === i ? true : o));
    setOpened(next);
    setBurstId(i);
    setRevealed(i);
    if (next.every(Boolean)) {
      setAllOpen(true);
      setTimeout(onComplete, 3000);
    }
    setTimeout(() => setRevealed(null), 2800);
    setTimeout(() => setBurstId(null), 650);
  };

  const remaining = opened.filter((o) => !o).length;

  return (
    <div
      style={{
        textAlign: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        position: 'relative',
        minHeight: '82dvh',
      }}
    >
      <BirthdayEmojis count={14} />

      <h2 className="scene-title">🎁 Un regalo para ti</h2>
      <p className="scene-sub" style={{ fontSize: '0.98rem', maxWidth: '520px' }}>
        Cada cajita guarda un pensamiento de corazón. Tócala, léela y deja que vuele 💫
      </p>
      <p className="scene-sub" style={{ fontSize: '0.85rem', opacity: 0.85 }}>
        {remaining === 0
          ? '✨ ¡Abriste todos los regalos!'
          : `🎁 Solo quedan ${remaining} sorpresa${remaining === 1 ? '' : 's'} por abrir`}
      </p>

      {/* Gift field (no scrolling) */}
      <div
        style={{
          position: 'relative',
          width: 'min(600px, 98vw)',
          height: '56dvh',
          minHeight: '340px',
          marginTop: '6px',
        }}
      >
        <AnimatePresence>
          {gifts.map((msg, i) =>
            !opened[i] ? (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, scale: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -12, 0],
                  x: [0, boxes[i].sway, 0],
                  rotate: [0, boxes[i].sway * 0.3, 0],
                }}
                transition={{
                  opacity: { delay: 0.3 + i * 0.12 },
                  scale: { delay: 0.3 + i * 0.12, type: 'spring', stiffness: 200, damping: 14 },
                  y: { repeat: Infinity, duration: 2.6 + i * 0.3, ease: 'easeInOut' },
                  x: { repeat: Infinity, duration: 3.2 + i * 0.2, ease: 'easeInOut' },
                  rotate: { repeat: Infinity, duration: 3.6 + i * 0.2, ease: 'easeInOut' },
                }}
                whileTap={{ scale: 0.88 }}
                onClick={() => openGift(i)}
                style={{
                  position: 'absolute',
                  left: `${boxes[i].left}%`,
                  top: `${boxes[i].top}%`,
                  width: boxes[i].size + 22,
                  height: boxes[i].size + 22,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                {/* gift box */}
                <div
                  style={{
                    width: boxes[i].size + 20,
                    height: boxes[i].size + 20,
                    borderRadius: '16px',
                    background: `linear-gradient(135deg, ${boxes[i].color}, ${boxes[i].color}bb)`,
                    boxShadow: `0 12px 28px ${boxes[i].color}66`,
                    border: '3px solid #fff3',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                  }}
                >
                  <div
                    style={{
                      width: '70%',
                      height: '14%',
                      borderRadius: 4,
                      background: '#fff8',
                    }}
                  />
                  <span style={{ fontSize: boxes[i].size * 0.5 }}>{boxes[i].icon}</span>
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>

        {/* burst particles */}
        {burstId !== null && (
          <div
            style={{
              position: 'absolute',
              left: `${boxes[burstId].left + 8}%`,
              top: `${boxes[burstId].top + 8}%`,
              pointerEvents: 'none',
              zIndex: 6,
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
                  background: boxes[burstId].color,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {allOpen && <ConfettiBurst emojis count={90} />}

      {/* Revealed message (floats above the field, then gift disappears) */}
      <AnimatePresence>
        {revealed !== null && (
          <motion.div
            key={revealed}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: 'spring', stiffness: 160, damping: 14 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'linear-gradient(135deg,#fff,#fff6f0)',
              color: '#5a4a3a',
              borderRadius: '18px',
              padding: '24px 26px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              maxWidth: 'min(420px, 88vw)',
              textAlign: 'center',
              zIndex: 60,
              border: `3px solid ${PALETTE[revealed % PALETTE.length]}55`,
            }}
          >
            <div style={{ fontSize: '2.4rem' }}>
              {GIFT_ICONS[revealed % GIFT_ICONS.length]} ✨
            </div>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.6, margin: '12px 0 6px', fontWeight: 600 }}>
              {gifts[revealed]}
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

export default GiftGallery;
