// src/components/EnvelopeLetter.jsx
// Interactive closing letter with a full animated cycle:
//  closed envelope -> tap to open -> message rises out -> on finish the
//  message returns to the card and the envelope closes -> the scene ends
//  with a rose that draws itself in red, plus "Repetir sus palabras" and
//  "Continuar" buttons to wrap up.
import { useState, useRef, useCallback, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG, fill } from '../config';
import BirthdayEmojis from './BirthdayEmojis';
import ConfettiBurst from './ConfettiBurst';
import RoseDraw from './RoseDraw';const STEP = {
  CLOSED: 'closed',
  OPENING: 'opening',
  OPEN: 'open',
  CLOSING: 'closing',
  FINALE: 'finale',
};

const EnvelopeLetter = ({ onComplete }) => {
  const [step, setStep] = useState(STEP.CLOSED);
  const [raiseY, setRaiseY] = useState(0);
  const timers = useRef([]);
  const letterRef = useRef(null);

  const schedule = (fn, ms) => {
    const t = setTimeout(() => {
      timers.current = timers.current.filter((x) => x !== t);
      fn();
    }, ms);
    timers.current.push(t);
    return t;
  };

  const finish = useCallback(() => onComplete(), [onComplete]);

  const openEnvelope = () => {
    if (step !== STEP.CLOSED) return;
    setStep(STEP.OPENING);
    schedule(() => setStep(STEP.OPEN), 450);
    // after reading, automatically close the card for the animated return
    schedule(() => setStep(STEP.CLOSING), 6800);
    schedule(() => setStep(STEP.FINALE), 7600);
    // let the bouquet finish drawing, then move on to the landing automatically
    schedule(finish, 18000);
  };

  const showingCard = step === STEP.OPENING || step === STEP.OPEN || step === STEP.CLOSING;
  const flapOpen = step === STEP.OPENING || step === STEP.OPEN;
  // card raised (out of envelope) while reading; lowers back down when closing
  const cardRaised = step === STEP.OPENING || step === STEP.OPEN;
  const body = fill(CONFIG.letterMessage);

  // Raise the card just enough that its top edge stays visible on screen,
  // regardless of device size. framer `y` is negative when moving up.
  const measureRaise = () => {
    const el = letterRef.current;
    if (!el) return;
    const elRect = el.getBoundingClientRect();
    const viewportTop = Math.round(window.innerHeight * 0.02);
    // Move the letter up so its top lands at ~2% of the viewport height.
    setRaiseY(-Math.max(0, elRect.top - viewportTop));
  };

  useLayoutEffect(() => {
    if (cardRaised) measureRaise();
  }, [cardRaised]);

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
      <BirthdayEmojis count={20} />

      <AnimatePresence mode="wait">
        {step === STEP.FINALE ? (
          /* ---------- FINALE: bouquet + the message shown below ---------- */
          <motion.div
            key="finale"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '18px',
              textAlign: 'center',
              paddingTop: '30px',
              width: '100%',
            }}
          >
            <BirthdayEmojis count={12} />
            <ConfettiBurst emojis count={50} />

            <h2 className="scene-title">Este ramo es para ti 🌹</h2>
            <p className="scene-sub" style={{ maxWidth: '460px', fontSize: '1rem' }}>
              Así como este ramo se dibuja, así de especial eres para mí. Hecho con 💖 para ti,{' '}
              {CONFIG.name}.
            </p>

            <RoseDraw size={250} duration={3.5} />

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              style={{ color: 'rgba(255,255,255,0.95)', fontSize: '1.1rem', margin: 0 }}
            >
              Con todo mi cariño, para alguien tan especial como tú 💐
            </motion.p>
          </motion.div>
        ) : !showingCard ? (
          /* ---------- CLOSED envelope ---------- */
          <motion.div
            key="envelope"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
          >
            <h2 className="scene-title">💌 Un mensaje para ti</h2>
            <p className="scene-sub" style={{ fontSize: '1rem' }}>
              Toca el sobre para abrirlo
            </p>

            <div className="envelope-stage" onClick={openEnvelope} role="button">
              <div className="envelope">
                <div className="envelope-back" />
                <div className="envelope-front" />
                <motion.div
                  className="envelope-flap"
                  animate={flapOpen ? { rotateX: 0 } : {}}
                  style={{ transformOrigin: 'top center' }}
                />
                <div className="envelope-seal">
                  <motion.span
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.4 }}
                  >
                    💌
                  </motion.span>
                </div>
                <div className="envelope-address">
                  <span>Para ti, {CONFIG.name}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ---------- OPEN letter ---------- */
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              width: 'min(400px, 92vw)',
            }}
          >
            <h2 className="scene-title">💌 Un mensaje para ti</h2>

            {/* Envelope with a card that can raise/lower */}
            <div className="envelope-stage-static" style={{ position: 'relative', width: 'min(400px, 92vw)', height: '340px' }}>
              {/* the letter */}
              <motion.div
                ref={letterRef}
                className="letter"
                animate={cardRaised ? { y: raiseY, opacity: 1 } : { y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 80, damping: 16 }}
                style={{
                  width: 'min(380px, 88vw)',
                  height: cardRaised ? 'auto' : '260px',
                  overflow: cardRaised ? 'visible' : 'hidden',
                  zIndex: cardRaised ? 10 : 0,
                }}
              >
                <div className="letter-paper">
                  <p className="letter-title">{fill(CONFIG.letterTitle)}</p>
                  <div className="letter-scroll">
                    <div className="letter-body">
                      {body.split('\n').map((line, i) =>
                        line ? (
                          <p key={i}>{line}</p>
                        ) : (
                          <p key={i} style={{ margin: '8px 0' }}>&nbsp;</p>
                        )
                      )}
                    </div>
                    <p className="letter-signature">{fill(CONFIG.letterSignature)}</p>
                    <div className="letter-emoji-row">
                      <span>💖</span>
                      <span>🎂</span>
                      <span>💐</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* the envelope (flap opens/closes) */}
              <div className="envelope" style={{ top: '60px', height: '260px' }}>
                <div className="envelope-back" />
                <div className="envelope-front" />
                <motion.div
                  className="envelope-flap"
                  animate={
                    flapOpen
                      ? { rotateX: 180, transition: { duration: 0.6, ease: 'easeInOut' } }
                      : { rotateX: 0, transition: { duration: 0.6, ease: 'easeInOut' } }
                  }
                  style={{ transformOrigin: 'top center', backfaceVisibility: 'hidden' }}
                />
                <div className="envelope-seal">
                  <span style={{ fontSize: '1.6rem' }}>💌</span>
                </div>
                <div className="envelope-address">
                  <span>Para ti, {CONFIG.name}</span>
                </div>
              </div>
            </div>

            <p className="scene-sub" style={{ fontSize: '0.85rem', opacity: 0.85 }}>
              {step === STEP.CLOSING
                ? 'La carta vuelve al sobre… 🌹'
                : 'Lee con calma 💖 La carta se cerrará sola'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnvelopeLetter;
