// src/components/FinalScene.jsx
// Cierre "modo libro": un libro que se abre mostrando la despedida y dos
// acciones para el usuario — volver a vivir la experiencia (ver de nuevo) o
// finalizar y dejar su comentario/feedback.
import { motion } from 'framer-motion';
import { CONFIG } from '../config';
import ConfettiBurst from './ConfettiBurst';
import BirthdayEmojis from './BirthdayEmojis';
import BouncyName from './BouncyName';

const FinalScene = ({ onRestart, onFinish }) => {
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
      <ConfettiBurst emojis count={130} />
      <BirthdayEmojis count={18} />

      {/* Open book with the closing message */}
      <motion.div
        initial={{ rotateY: -80, opacity: 0.2 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ rotateY: -80, opacity: 0.2 }}
        transition={{ type: 'spring', stiffness: 70, damping: 14 }}
        style={{
          width: 'min(92vw, 520px)',
          minHeight: '440px',
          background: 'linear-gradient(180deg,#fffdf7,#fff2e7)',
          borderRadius: '6px 14px 14px 6px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px 20px',
          color: '#5a4a3a',
          position: 'relative',
          overflow: 'hidden',
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

        <motion.div
          initial={{ scale: 0, rotate: -360 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.2 }}
          style={{ fontSize: '4rem', lineHeight: 1 }}
        >
          🎉🎊🎂
        </motion.div>

        <BouncyName name={CONFIG.finalTitle} size="2.2rem" color="#8a2387" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          style={{
            color: '#5a4a3a',
            fontSize: '1.15rem',
            lineHeight: 1.7,
            margin: '6px 0 0',
            maxWidth: '420px',
          }}
        >
          {CONFIG.finalMessage}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{ color: '#8a6a8a', fontSize: '0.95rem', margin: '14px 0 4px' }}
        >
          Hecho con 💖 para ti — de parte de {CONFIG.senderName}.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
          style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '10px' }}
        >
          <motion.button
            whileTap={{ scale: 0.94 }}
            className="scene-btn"
            style={{ fontSize: '1rem' }}
            onClick={onFinish}
          >
            ✔ Finalizar
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={onRestart}
            style={{
              padding: '16px 28px',
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
            🔁 Ver de nuevo
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FinalScene;
