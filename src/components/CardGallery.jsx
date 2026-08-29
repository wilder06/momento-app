// src/components/CardGallery.jsx
import { useState } from 'react';
import AnimatedCard from './AnimatedCard';
import { motion } from 'framer-motion';

const CardGallery = () => {
  const [cards] = useState([
    {
      id: 1,
      sender: 'Tu mejor amiga',
      message: '¡Feliz cumpleaños! Que tengas un día tan especial como tú. Te quiero mucho 💕',
      emoji: '💖',
      color: '#ff6b6b'
    },
    {
      id: 2,
      sender: 'Familia',
      message: 'Eres la luz de nuestras vidas. ¡Disfruta tu día al máximo! 🎉',
      emoji: '🌟',
      color: '#ffd93d'
    },
    {
      id: 3,
      sender: 'Amigos de siempre',
      message: 'Gracias por tantos años de amistad. ¡Eres increíble! 🥳',
      emoji: '🎊',
      color: '#6bcb77'
    },
    {
      id: 4,
      sender: 'Compañeros de trabajo',
      message: '¡Felicidades! Que este nuevo año te traiga muchos éxitos y alegrías 📈',
      emoji: '💼',
      color: '#4d96ff'
    },
    {
      id: 5,
      sender: 'Tu crush secreto',
      message: 'Siempre has tenido una sonrisa que ilumina mi día 😊✨',
      emoji: '😍',
      color: '#ff6bff'
    },
    {
      id: 6,
      sender: 'Tus mascotas',
      message: '¡Guau! ¡Miau! ¡Feliz cumpleaños! Te queremos mucho 🐾',
      emoji: '🐾',
      color: '#ffa94d'
    }
  ]);

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h2 style={{ 
        color: 'white', 
        textAlign: 'center', 
        marginBottom: '30px',
        fontSize: '2rem'
      }}>
        💌 Mensajes de tus seres queridos 💌
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '30px',
        justifyContent: 'center'
      }}>
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <AnimatedCard {...card} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CardGallery;