// src/components/SceneWrapper.jsx
// Full-screen stage with slide/fade transitions between scenes.
import { motion } from 'framer-motion';

const SceneWrapper = ({ children, style }) => (
  <motion.div
    initial={{ opacity: 0, x: 60, scale: 0.98 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, x: -60, scale: 0.98 }}
    transition={{ duration: 0.45, ease: 'easeInOut' }}
    style={{
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      boxSizing: 'border-box',
      width: '100%',
      ...style,
    }}
  >
    {children}
  </motion.div>
);

export default SceneWrapper;
