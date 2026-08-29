// src/components/FinalScene.jsx
// Landing/despedida final: streamers + emojis animados, un mensaje de
// cierre y un botón para volver a vivir la experiencia desde el inicio.
import { motion } from 'framer-motion';
import { CONFIG } from '../config';
import ConfettiBurst from './ConfettiBurst';
import BirthdayEmojis from './BirthdayEmojis';
import BouncyName from './BouncyName';

const FinalScene = ({ onRestart }) => {
  return (
    <div
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '22px',
        maxWidth: '520px',
      }}
    >
      <ConfettiBurst emojis count={130} />
      <BirthdayEmojis count={18} />

      <motion.div
        initial={{ scale: 0, rotate: -360 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 12 }}
        style={{ fontSize: '5rem', lineHeight: 1 }}
      >
        🎉🎊🎂
      </motion.div>

      <BouncyName name={CONFIG.finalTitle} size="2.6rem" />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{
          color: 'rgba(255,255,255,0.97)',
          fontSize: '1.25rem',
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {CONFIG.finalMessage}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 180, damping: 12 }}
        style={{ display: 'flex', gap: '14px', fontSize: '1.8rem' }}
      >
        <motion.span animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          🎈
        </motion.span>
        <motion.span animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 1.9 }}>
          💖
        </motion.span>
        <motion.span animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>
          🎈
        </motion.span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', margin: 0 }}
      >
        Hecho con 💖 para ti, {CONFIG.name} — de parte de {CONFIG.senderName}.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        whileTap={{ scale: 0.92 }}
        className="scene-btn big"
        onClick={onRestart}
      >
        🔁 Ver de nuevo
      </motion.button>
    </div>
  );
};

export default FinalScene;
