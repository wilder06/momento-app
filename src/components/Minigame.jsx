// src/components/Minigame.jsx
// Simple, approachable challenge: tap letters from the pool. Correct ones
// lock into their exact cell (green) and stay there; wrong ones bounce back.
// A "Help" button auto-places the next correct letter.
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../config';
import ConfettiBurst from './ConfettiBurst';
import Modal from './Modal';

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const Minigame = ({ onComplete }) => {
  // Pick one keyword object at random so each run can differ in word,
  // hint and closing message.
  const [entry] = useState(() => {
    const all = CONFIG.keywords && CONFIG.keywords.length ? CONFIG.keywords : [{ word: 'AMIGA' }];
    return all[Math.floor(Math.random() * all.length)];
  });
  const word = (entry.word || 'AMIGA').toUpperCase();
  const hint = entry.hint;
  const wordMessage = entry.message;
  const [variant] = useState(() => Math.floor(Math.random() * 3));
  const len = word.length;

  // cell[i] => letter fixed in position i, or null
  const [cells, setCells] = useState(() => Array(len).fill(null));
  const [pool, setPool] = useState(() => shuffle(word.split('')));
  const [won, setWon] = useState(false);
  const [shakeId, setShakeId] = useState(null);

  const finish = useCallback(() => {
    setWon(true);
    const t = setTimeout(onComplete, 3200);
    return t;
  }, [onComplete]);

  // Place a letter in the next empty cell. Correct => lock in, wrong => bounce.
  const tryPlace = (poolIndex) => {
    if (won) return;
    const letter = pool[poolIndex];
    if (!letter) return;

    const slot = cells.findIndex((c) => c === null);
    const correct = word[slot] === letter;

    if (correct) {
      const nextCells = [...cells];
      nextCells[slot] = letter;
      setCells(nextCells);
      setPool((p) => p.filter((_, i) => i !== poolIndex));
      if (nextCells.every(Boolean)) finish();
    } else {
      setShakeId(poolIndex);
      setTimeout(() => setShakeId(null), 500);
    }
  };

  // Help: reveal the next correct letter automatically
  const help = () => {
    if (won) return;
    const slot = cells.findIndex((c) => c === null);
    if (slot === -1) return;
    const letter = word[slot];
    const poolIndex = pool.indexOf(letter);
    const nextCells = [...cells];
    nextCells[slot] = letter;
    setCells(nextCells);
    setPool((p) => p.filter((_, i) => i !== poolIndex));
    if (nextCells.every(Boolean)) finish();
  };

  const solved = cells.every(Boolean);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '16px',
        width: '100%',
      }}
    >
      <h2 className="scene-title">🧩 Reto: Descifra la palabra</h2>
      <p className="scene-sub">
        Toca las letras para armar la palabra que te describe. ¡Las correctas se quedan!
      </p>

      {/* Solution slots */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '6px',
        }}
      >
        {cells.map((ch, i) => (
          <motion.div
            key={i}
            animate={ch ? { scale: [0, 1.15, 1] } : {}}
            transition={{ duration: 0.35 }}
            style={{
              width: 'clamp(38px, 9vw, 48px)',
              height: 'clamp(46px, 10vw, 56px)',
              fontSize: 'clamp(1.3rem, 4.5vw, 1.6rem)',
              fontWeight: 800,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: ch ? '2px solid #6bcb77' : '2px dashed rgba(255,255,255,0.5)',
              background: ch ? 'linear-gradient(135deg,#eafff0,#c8f7d6)' : 'transparent',
              color: ch ? '#1e8e3e' : 'rgba(255,255,255,0.4)',
              boxShadow: ch ? '0 6px 16px rgba(107,203,119,0.35)' : 'none',
            }}
          >
            {ch || i + 1}
          </motion.div>
        ))}
      </div>

      {/* Letter pool */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '8px',
          minHeight: '60px',
        }}
      >
        <AnimatePresence>
          {pool.map((ch, i) => (
            <motion.button
              layout
              key={i}
              initial={
                variant === 0
                  ? { scale: 0, y: -20 }
                  : variant === 1
                  ? { scale: 0, rotate: -180 }
                  : { scale: 0, x: i % 2 ? 30 : -30 }
              }
              animate={{ scale: 1, y: 0, rotate: 0, x: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.2 }}
              onClick={() => tryPlace(i)}
              style={{
                width: 'clamp(42px, 10vw, 52px)',
                height: 'clamp(48px, 11vw, 60px)',
                fontSize: 'clamp(1.4rem, 5vw, 1.7rem)',
                fontWeight: 800,
                border: 'none',
                borderRadius: '12px',
                background: 'linear-gradient(135deg,#ff7eb3,#ff758c)',
                color: 'white',
                boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
                cursor: 'pointer',
                overflow: 'visible',
              }}
            >
              <motion.span
                key={shakeId === i ? `shake-${shakeId}` : 'static'}
                animate={
                  shakeId === i ? { x: [0, -10, 10, -6, 6, 0] } : { x: 0 }
                }
                transition={{ duration: 0.5 }}
                style={{ display: 'inline-block' }}
              >
                {ch}
              </motion.span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {pool.length === 0 && !won && (
        <p className="scene-sub" style={{ color: '#ffd93d' }}>
          💡 Usa el botón de ayuda si te quedas atascada 💡
        </p>
      )}

      {/* Help button */}
      {!won && !solved && (
        <button className="scene-btn" onClick={help} style={{ padding: '12px 28px' }}>
          💡 Ayuda
        </button>
      )}

      <p className="scene-sub" style={{ fontSize: '0.9rem', opacity: 0.9, maxWidth: '480px' }}>
        💡 Pista: {hint || `son ${len} letras`}
      </p>

      {won && <ConfettiBurst />}
      <Modal show={won} bg="linear-gradient(135deg,#6bcb77,#4d96ff)">
        <div style={{ fontSize: '3rem' }}>🏆🎉</div>
        <h2 style={{ fontSize: '1.8rem', margin: '10px 0' }}>¡Lo lograste!</h2>
        <p style={{ fontSize: '1.2rem', margin: 0, fontWeight: 700 }}>{word}</p>
        <p
          style={{
            fontSize: '1rem',
            lineHeight: 1.6,
            margin: '10px 0 0',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          {wordMessage || '¡Porque eres exactamente eso y mucho más! Ahora, tus regalos te esperan 🎁'}
        </p>
      </Modal>
    </div>
  );
};

export default Minigame;
