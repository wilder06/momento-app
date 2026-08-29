// src/components/BouncyName.jsx
// Animated name: each letter bounces in with a spring.
import { motion } from 'framer-motion';

const BouncyName = ({ name, color = '#fff', size = '3rem' }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '0.05em',
    }}
  >
    {name.split('').map((char, i) => (
      <motion.span
        key={i}
        initial={{ y: -80, opacity: 0, rotate: -20 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{
          delay: 0.3 + i * 0.08,
          type: 'spring',
          stiffness: 200,
          damping: 12,
        }}
        style={{
          color,
          fontSize: size,
          fontWeight: 900,
          textShadow: '0 4px 20px rgba(0,0,0,0.3)',
          display: 'inline-block',
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </div>
);

export default BouncyName;
