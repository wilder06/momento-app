// src/components/Modal.jsx
// Renders a centered dialog into document.body so that `position: fixed`
// is measured against the real viewport (works even when the app's scenes
// carry a CSS transform that would otherwise become the fixed containing block).
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({
  show,
  zIndex = 60,
  children,
  width = 'min(90%, 340px)',
  bg = 'linear-gradient(135deg,#6bcb77,#4d96ff)',
  color = 'white',
  border,
  borderRadius = '24px',
  innerPadding = '30px 22px',
}) =>
  createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 30 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              background: bg,
              color,
              padding: innerPadding,
              borderRadius,
              textAlign: 'center',
              width,
              maxHeight: '88dvh',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              boxSizing: 'border-box',
              boxShadow: '0 24px 70px rgba(0,0,0,0.45)',
              border,
              pointerEvents: 'auto',
            }}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );

export default Modal;
