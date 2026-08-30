// src/components/FeedbackScene.jsx
// Página de feedback "modo libro": un libro que se abre con una caja para
// que el usuario deje su comentario. Por ahora no se envía a ningún lado
// (el comentario queda en el dispositivo); solo agradece al pulsar. Pensada
// para escalar: aquí es donde se conectaría un endpoint de formularios.
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../config';
import BirthdayEmojis from './BirthdayEmojis';

const FeedbackScene = ({ onBack }) => {
  const [comment, setComment] = useState('');
  const [sent, setSent] = useState(false);

  const send = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    // MVP: sin envío real. El comentario queda localmente. Aquí se conectará
    // un endpoint (Formspree/backend) para escalar la recolección al público.
    setSent(true);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '560px',
        perspective: '1600px',
      }}
    >
      <BirthdayEmojis count={14} />

      {/* Open book with the feedback form inside */}
      <motion.div
        initial={{ rotateY: -70, opacity: 0.4 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ rotateY: -70, opacity: 0.4 }}
        transition={{ type: 'spring', stiffness: 70, damping: 14 }}
        style={{
          width: 'min(92vw, 520px)',
          minHeight: '430px',
          background: 'linear-gradient(180deg,#fffdf7,#fff2e7)',
          borderRadius: '6px 14px 14px 6px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '28px 20px',
          color: '#5a4a3a',
          position: 'relative',
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* spine/hinge shadow */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            transform: 'translateX(-50%)',
            background:
              'linear-gradient(180deg,rgba(138,35,135,0),rgba(138,35,135,0.25),rgba(138,35,135,0))',
          }}
        />
        {/* page curl hint */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: 0,
            height: 0,
            borderLeft: '28px solid transparent',
            borderBottom: '30px solid rgba(93,44,143,0.18)',
          }}
        />

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.form
              key="form"
              onSubmit={send}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              style={{
                width: '100%',
                maxWidth: '420px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                alignItems: 'center',
              }}
            >
              <h2 style={{ margin: 0, color: '#8a2387', textAlign: 'center' }}>
                {CONFIG.feedbackTitle}
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: 1.5, margin: 0, textAlign: 'center' }}>
                {CONFIG.feedbackIntro}
              </p>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                placeholder={CONFIG.feedbackPlaceholder}
                rows={5}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  borderRadius: '12px',
                  border: '2px solid #e8c9e0',
                  padding: '14px',
                  fontSize: '1.05rem',
                  color: '#4a3a3a',
                  background: '#fff',
                  resize: 'vertical',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.button whileTap={{ scale: 0.94 }} type="submit" className="scene-btn" style={{ fontSize: '1rem' }}>
                  {CONFIG.feedbackSendLabel}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  type="button"
                  onClick={onBack}
                  style={{
                    padding: '16px 26px',
                    border: 'none',
                    borderRadius: '60px',
                    background: 'transparent',
                    color: '#8a2387',
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  {CONFIG.feedbackBackLabel}
                </motion.button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '14px',
                textAlign: 'center',
                padding: '40px 10px',
              }}
            >
              <div style={{ fontSize: '4rem' }}>💖🎉</div>
              <h2 style={{ margin: 0, color: '#8a2387' }}>{CONFIG.feedbackSentTitle}</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.6, margin: 0, maxWidth: '360px' }}>
                {CONFIG.feedbackSentMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FeedbackScene;
