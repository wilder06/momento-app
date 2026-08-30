// src/components/GiftGallery.jsx
// "Un regalo para ti" — an animated field of floating gift boxes (like the
// balloons scene, no scrolling). Each gift bobs and sways; tap one to pop it
// open, reveal its message, then it disappears. Every gift has its own emoji.
import { useEffect, useReducer, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../config';
import ConfettiBurst from './ConfettiBurst';
import BirthdayEmojis from './BirthdayEmojis';
import Modal from './Modal';

const PALETTE = ['#ff5e8a', '#ffb03a', '#6bcb77', '#4d96ff', '#9b59b6', '#ff6b6b'];
// Distinct emoji per gift so each box feels unique
const GIFT_ICONS = ['💝', '🎀', '🧸', '🏆', '💐', '🍀'];

// How long each message stays visible: based on text length, with a floor.
const readTime = (text) => Math.max(2800, Math.min(6000, 1900 + text.length * 42));

// Queues opened-gift messages so each one (including the long anecdote) is
// read in full, one at a time, even during a quick burst of taps.
const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN': {
      const opened = state.opened.map((o, k) => (k === action.i ? true : o));
      let { queue, revealed } = state;
      if (revealed === null) revealed = action.i;
      else queue = [...queue, action.i];
      return { ...state, opened, queue, revealed };
    }
    case 'ADVANCE': {
      if (state.queue.length > 0) {
        return { ...state, revealed: state.queue[0], queue: state.queue.slice(1) };
      }
      return { ...state, revealed: null };
    }
    default:
      return state;
  }
};

const GiftGallery = ({ onComplete }) => {
  const gifts = CONFIG.giftMessages;
  // The "special" golden gift (loaded last, carrying the personal anecdote).
  const specialIndex = gifts.length - 1;
  const [state, dispatch] = useReducer(reducer, null, () => ({
    opened: gifts.map(() => false),
    queue: [],
    revealed: null,
  }));
  const { opened, queue, revealed } = state;
  const [burstId, setBurstId] = useState(null);
  const allOpen = opened.length > 0 && opened.every(Boolean);

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
    dispatch({ type: 'OPEN', i });
    setBurstId(i);
    setTimeout(() => setBurstId(null), 650);
  };

  // Each message stays long enough to be read; longer messages (like the
  // anecdote) get more time. Then show the next queued one, or finish.
  useEffect(() => {
    if (revealed === null) return;
    const text = revealed === specialIndex ? CONFIG.specialGiftMessage : gifts[revealed];
    const t = setTimeout(() => dispatch({ type: 'ADVANCE' }), readTime(text));
    return () => clearTimeout(t);
  }, [revealed, gifts, specialIndex]);

  // Finish once every gift is opened AND all messages have been read.
  const allRead = revealed === null && queue.length === 0 && opened.length > 0 && opened.every(Boolean);
  useEffect(() => {
    if (allRead) {
      const t = setTimeout(onComplete, 900);
      return () => clearTimeout(t);
    }
  }, [allRead, onComplete]);

  const remaining = opened.filter((o) => !o).length;

  // Safety net: if the user never opens all gifts, advance automatically.
  useEffect(() => {
    const t = setTimeout(onComplete, 40000);
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

      {/* Revealed message (floats above the field via viewport portal) */}
      <Modal
        show={revealed !== null}
        bg="linear-gradient(135deg,#fff,#fff6f0)"
        color="#5a4a3a"
        width="min(420px, 88vw)"
        borderRadius="18px"
        innerPadding="24px 26px"
        border={revealed !== null ? `3px solid ${PALETTE[revealed % PALETTE.length]}55` : undefined}
      >
        <div style={{ fontSize: '2.4rem' }}>
          {revealed === specialIndex ? '💎✨' : `${GIFT_ICONS[revealed % GIFT_ICONS.length]} ✨`}
        </div>
        {revealed === specialIndex && (
          <p
            style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              color: '#9a7b00',
              fontFamily: "'Pacifico','Brush Script MT',cursive",
              margin: '6px 0 2px',
            }}
          >
            Un recuerdo muy especial para {CONFIG.name} 💛
          </p>
        )}
        <p style={{ fontSize: '1.05rem', lineHeight: 1.6, margin: '12px 0 6px', fontWeight: 600, wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {revealed === specialIndex ? CONFIG.specialGiftMessage : gifts[revealed]}
        </p>
        <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#999', margin: 0 }}>
          — de parte de {CONFIG.senderName}
        </p>
      </Modal>
    </div>
  );
};

export default GiftGallery;
