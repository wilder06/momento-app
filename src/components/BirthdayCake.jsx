// src/components/BirthdayCake.jsx
// The star of the show: a cake with the friend's name and one lit
// candle per year of age. Tap a candle to blow it out. When all are
// out, celebrate with confetti and advance to the game.
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../config';
import ConfettiBurst from './ConfettiBurst';
import { useSounds } from '../hooks/useSounds';

const BirthdayCake = ({ onComplete }) => {
  const { blow, chime } = useSounds();
  // Decorative fixed candle count (independent of the real age).
  const CANDLE_COUNT = 5;
  const [candles, setCandles] = useState(() =>
    Array.from({ length: CANDLE_COUNT }, (_, i) => ({ id: i + 1, lit: true }))
  );
  const [win, setWin] = useState(false);

  const finish = useCallback(() => {
    setWin(true);
    chime();
    const t = setTimeout(onComplete, 3200);
    return t;
  }, [onComplete, chime]);

  const blowOut = (id) => {
    if (!candles.find((c) => c.id === id)?.lit) return;
    blow();
    const next = candles.map((c) => (c.id === id ? { ...c, lit: false } : c));
    setCandles(next);
    if (next.length > 0 && next.every((c) => !c.lit)) {
      finish();
    }
  };

  const flameStyle = {
    position: 'absolute',
    top: '-30px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '20px',
    height: '34px',
    background:
      'radial-gradient(ellipse at center, #fff3b0 0%, #ffd93d 40%, #ff7043 70%, transparent 90%)',
    borderRadius: '50% 50% 50% 50% / 65% 65% 35% 35%',
    filter: 'blur(0.5px)',
    boxShadow: '0 0 22px #ffa041, 0 0 45px #ffd93d',
  };

  // Blow out ALL candles at once
  const blowAll = () => {
    setCandles((prev) => {
      if (prev.length === 0 || prev.every((c) => !c.lit)) return prev;
      return prev.map((c) => ({ ...c, lit: false }));
    });
    finish();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '12px',
      }}
    >
      <h2 className="scene-title">🕯️ Sopla las velas 🕯️</h2>
      <p className="scene-sub" style={{ fontSize: '1rem' }}>
        Toca cada vela para apagarla, o usa el botón. ¡Pide un deseo! 💫
      </p>

      <div
        style={{
          position: 'relative',
          width: 'min(320px, 82vw)',
          height: '300px',
          marginTop: '10px',
        }}
      >
        {/* Top tier - with the name */}
        <div
          style={{
            position: 'absolute',
            bottom: '112px',
            width: '64%',
            left: '18%',
            height: '64px',
            background: 'linear-gradient(180deg, #fff, #ffe9f0)',
            borderRadius: '12px 12px 6px 6px',
            boxShadow: '0 6px 22px rgba(0,0,0,0.18)',
            border: '2px solid rgba(255,255,255,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: "'Pacifico', 'Brush Script MT', cursive",
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#e84393',
              textShadow: '0 1px 0 #fff',
              maxWidth: '90%',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {CONFIG.name}
          </span>
        </div>

        {/* Middle tier */}
        <div
          style={{
            position: 'absolute',
            bottom: '56px',
            width: '86%',
            left: '7%',
            height: '60px',
            background: 'linear-gradient(180deg, #ff8fab, #ff6b93)',
            borderRadius: '12px 12px 6px 6px',
            boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', paddingTop: '8px' }}>
            {['🍓', '⭐', '🍒', '✨'].map((e, i) => (
              <span key={i} style={{ fontSize: '16px' }}>{e}</span>
            ))}
          </div>
        </div>

        {/* Bottom tier */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '60px',
            background: 'linear-gradient(180deg, #ff5e8a, #e84393)',
            borderRadius: '12px 12px 6px 6px',
            boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', gap: '18px', paddingTop: '8px' }}>
            {['💖', '🎉', '💜', '🎈', '💙'].map((e, i) => (
              <span key={i} style={{ fontSize: '16px' }}>{e}</span>
            ))}
          </div>
        </div>

        {/* Candles */}
        {candles.map((candle, index) => {
          const angle = (index / Math.max(1, candles.length)) * Math.PI - Math.PI;
          const x = 50 + Math.cos(angle) * (92 * 0.42);
          const yPct = 34 + Math.sin(angle) * (92 * 0.14);
          return (
            <motion.div
              key={candle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.08 }}
              style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${yPct}%`,
                transform: 'translateX(-50%)',
                cursor: 'pointer',
                zIndex: 5,
              }}
              onClick={() => candle.lit && blowOut(candle.id)}
            >
              <div
                style={{
                  width: '3px',
                  height: '10px',
                  background: '#6d4c41',
                  margin: '0 auto 0',
                }}
              />
              <div
                style={{
                  width: '14px',
                  height: '46px',
                  margin: '0 auto 0',
                  background: `linear-gradient(180deg, ${
                    candle.lit ? '#ffecb3' : '#b0bec5'
                  }, ${candle.lit ? '#ffd180' : '#90a4ae'})`,
                  borderRadius: '5px 5px 3px 3px',
                  boxShadow: '0 3px 6px rgba(0,0,0,0.35)',
                }}
              />
              {candle.lit && (
                <motion.div
                  style={flameStyle}
                  animate={{ scale: [1, 1.25, 0.9, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 0.7, ease: 'easeInOut' }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <p className="scene-sub" style={{ fontSize: '0.85rem', opacity: 0.8 }}>
        💡 {candles.filter((c) => c.lit).length} vela(s) encendida(s)
      </p>

      {!win && candles.some((c) => c.lit) && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileTap={{ scale: 0.94 }}
          className="scene-btn"
          onClick={blowAll}
          style={{ fontSize: '1.1rem', padding: '14px 34px' }}
        >
          💨 Apagar todas las velas
        </motion.button>
      )}

      {win && <ConfettiBurst />}

      <AnimatePresence>
        {win && (
          <motion.div
            className="celebration-modal"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'linear-gradient(135deg, #ff7eb3 0%, #ff758c 100%)',
              padding: '34px 26px',
              borderRadius: '24px',
              color: 'white',
              textAlign: 'center',
              zIndex: 60,
              boxShadow: '0 24px 70px rgba(0,0,0,0.45)',
              width: 'min(90%, 340px)',
            }}
          >
            <div style={{ fontSize: '3rem' }}>🎉✨🎂</div>
            <h2 style={{ fontSize: '2rem', margin: '10px 0' }}>¡Felicidades!</h2>
            <p style={{ fontSize: '1.1rem', margin: 0 }}>
              Has apagado todas las velas. Que tu deseo se haga realidad 💫
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BirthdayCake;
