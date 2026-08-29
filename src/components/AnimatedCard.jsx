// src/components/AnimatedCard.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ message, sender, emoji = '💌', color = '#ff6b6b' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    if (!isOpen) {
      // Abrir carta
      setIsOpen(true);
      // Dar vuelta después de abrir
      setTimeout(() => setIsFlipped(true), 600);
    } else {
      // Cerrar carta
      setIsFlipped(false);
      setTimeout(() => setIsOpen(false), 500);
    }
  };

  return (
    <div style={{ 
      perspective: '1000px',
      width: '280px',
      height: '350px',
      margin: '10px auto',
      cursor: 'pointer'
    }}>
      <motion.div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.8s'
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          scale: isOpen ? 1.05 : 1
        }}
        onClick={handleCardClick}
      >
        {/* Cara frontal - Carta cerrada */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          background: `linear-gradient(135deg, ${color}, ${color}dd)`,
          borderRadius: '15px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          border: '2px solid rgba(255,255,255,0.3)'
        }}>
          <span style={{ fontSize: '4rem', marginBottom: '10px' }}>{emoji}</span>
          <h3 style={{ color: 'white', fontSize: '1.2rem', textAlign: 'center' }}>
            📬 Toca para abrir
          </h3>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            borderRadius: '50%', 
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10px',
            fontSize: '1.5rem'
          }}>
            👆
          </div>
        </div>

        {/* Cara trasera - Carta abierta con mensaje */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'white',
          borderRadius: '15px',
          padding: '25px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
          border: '2px solid #e0e0e0'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 20 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            <span style={{ fontSize: '2rem' }}>{emoji}</span>
            <h3 style={{ color: '#333', margin: '10px 0', fontSize: '1.1rem' }}>
              ✨ Mensaje especial ✨
            </h3>
            <p style={{ 
              color: '#555', 
              fontSize: '1rem', 
              lineHeight: '1.6',
              minHeight: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
              background: '#f8f9fa',
              borderRadius: '10px',
              margin: '10px 0'
            }}>
              {message}
            </p>
            <p style={{ 
              color: '#999', 
              fontSize: '0.9rem',
              fontStyle: 'italic',
              marginTop: '5px'
            }}>
              — {sender} ❤️
            </p>
            <div style={{
              marginTop: '10px',
              fontSize: '0.8rem',
              color: '#aaa'
            }}>
              👆 Toca para cerrar
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedCard;