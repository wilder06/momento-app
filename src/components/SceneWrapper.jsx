// src/components/SceneWrapper.jsx
// Full-screen stage with a page-turn (book) transition between scenes.
import { motion } from 'framer-motion';

const SceneWrapper = ({ children, style }) => (
  <motion.div
    initial={{ opacity: 0, rotateY: -68, x: -40, scale: 0.99 }}
    animate={{ opacity: 1, rotateY: 0, x: 0, scale: 1 }}
    exit={{ opacity: 0, rotateY: 68, x: 40, scale: 0.99 }}
    transition={{ duration: 0.55, ease: 'easeInOut' }}
    style={{
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      boxSizing: 'border-box',
      width: '100%',
      transformStyle: 'preserve-3d',
      ...style,
    }}
  >
    {children}
  </motion.div>
);

export default SceneWrapper;
