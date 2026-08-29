// src/components/IntroScene.jsx
// Welcome screen. Starting the experience activates the music
// (required for mobile autoplay) and moves to the cake.

import { motion } from 'framer-motion';
import { CONFIG } from '../config';
import BouncyName from './BouncyName';

const IntroScene = ({ onStart, isPlaying, toggleMusic }) => {
  return (
    <div
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '28px',
      }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 150, damping: 12 }}
        style={{ fontSize: '5rem', lineHeight: 1 }}
      >
        🎂
      </motion.div>

      <BouncyName name={CONFIG.name} size="3.5rem" />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        style={{ color: 'rgba(255,255,255,0.95)', fontSize: '1.3rem', margin: 0 }}
      >
        Alguien preparó algo especial solo para ti 💖
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', margin: 0 }}
      >
        🎧 Toca para activar la música y empezar
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 30, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.9, type: 'spring', stiffness: 200, damping: 15 }}
        whileTap={{ scale: 0.92 }}
        className="scene-btn big"
        onClick={() => {
          if (!isPlaying) toggleMusic();
          onStart();
        }}
      >
        🎉 ¡Comenzar!
      </motion.button>
    </div>
  );
};

export default IntroScene;
