// src/config.js
// ============================================================
//  🎂 DATOS EDITABLES DE LA EXPERIENCIA 🎂
//  Cambia aquí el nombre, la edad, las frases, etc.
//  Es el ÚNICO archivo que necesitas tocar para personalizar.
// ============================================================

export const CONFIG = {
  // 👇 NOMBRE DE TU AMIGA
  name: "Sherly",

  // 👇 EDAD (el número de velas en la torta)
  age: 24,

  // 👇 FRASE que aparece sobre la torta / en la intro
  greeting: `¡Feliz Cumpleaños, ${"{NOMBRE}"}!`,

  // 👇 PALABRAS PARA EL MINIJUEGO DE LETRAS DESORDENADAS
  // Cada palabra tiene su PROPIA pista y su propio mensaje final, acordes a
  // su significado. Se elige UNA al azar cada vez, para que las iteraciones varíen.
  keywords: [
    {
      word: "AMOR",
      hint: "Así se llama el sentimiento más hermoso que alguien puede dar",
      message: "¡Porque tú eres el amor en su estado más puro! 💖",
    },
    {
      word: "ESTUPENDA",
      hint: "Algo maravilloso, increíble en tu forma de ser",
      message: "¡Porque eres estupenda en cada detalle de tu día! 🌟",
    },
    {
      word: "INCREÍBLE",
      hint: "Tan asombrosa que parece imposible de creer",
      message: "¡Porque lo increíble eres tú misma! ✨",
    },
    {
      word: "MARAVILLOSA",
      hint: "Que llena de asombro y admiración a quien te ve",
      message: "¡Porque eres maravillosa y el mundo lo nota! 🌈",
    },
    {
      word: "FASCINANTE",
      hint: "Que encanta y cautiva a los demás sin esfuerzo",
      message: "¡Porque tu forma de ser es fascinante! 💫",
    },
    {
      word: "INOLVIDABLE",
      hint: "Que deja huella y se queda para siempre en el recuerdo",
      message: "¡Porque eres inolvidable en mi vida! 💞",
    },
    {
      word: "ESPECIAL",
      hint: "Única, distinta a todas, que no se compara con nadie",
      message: "¡Porque tú eres simplemente especial! 💛",
    },
    {
      word: "BRILLANTE",
      hint: "Que irradia tanta luz que ilumina a todos los demás",
      message: "¡Porque tu luz brilla más que ninguna! ☀️",
    },
    {
      word: "TALENTOSA",
      hint: "Que tiene un don y un talento increíble para lo que hace",
      message: "¡Porque tu talento es impresionante! 🎨",
    },
    {
      word: "CARISMÁTICA",
      hint: "Que atrae y conquista con su encanto natural",
      message: "¡Porque tu carisma enamora a todos! 🌹",
    },
    {
      word: "VALEROSA",
      hint: "Que enfrenta los retos con coraje y sin miedo",
      message: "¡Porque tu valentía es una inspiración! 🦁",
    },
  ],

  // 👇 FRASES de la escena de "globos de deseos" (todas de tu parte)
  sparkTitle: "💫 Soplemos los deseos",
  sparkIntro:
    "Toca cada globo para hacerlo estallar y liberar un deseo para ti. Los escribí solo para ti 💖",
  sparkMessages: [
    "Que este año supere tus mejores sueños 🎈",
    "Sé siempre tan radiante como tu sonrisa ✨",
    "Que nunca te falte motivo para reír 😄",
    "Brilla con la luz que tú misma irradias 🌟",
    "Que cada día traiga una razón para celebrar 🎉",
    "Recuerda siempre lo increíble que eres 💖",
  ],

  // 👇 FRASES que se revelan en las cajitas de regalo
  giftMessages: [
    "Eres luz en los días grises ✨",
    "Que este año cumpla todos tus sueños 💫",
    "Gracias por ser única e inolvidable 💖",
    "Tu sonrisa ilumina cualquier habitación 🌟",
    "El mundo es mejor porque estás en él 🌈",
    "Que la alegría te acompañe siempre 🎈",
  ],

  // 👇 MENSAJE DEL REGALO DORADO "ESPECIAL" (anécdota personal compartida)
  specialGiftMessage:
    "¿Recuerdas aquel paseo cuando casi te caíste al caminar? 😄 Aún me río (y me preocupo de que estés bien). Así eres tú: tropezona, pero siempre te levantas con una sonrisa y sigues adelante 💛",

  // 👇 PALABRAS DE CELEBRACIÓN FINAL
  finalTitle: "¡Felicidades!",
  finalMessage:
    "Este fue un regalo hecho con muchísimo cariño para ti. Disfruta cada minuto de tu día, te la mereces. 🎉",

  // 👇 QUIÉN ENVÍA EL REGALO (firma de la carta)
  senderName: "Wilder",

  // 👇 CARTA DE CIERRE: título y mensaje que aparece al abrir el sobre
  letterTitle: "Para ti, {NOMBRE}",
  letterMessage:
    "Quería recordarte lo especial que eres y lo importante que es tu día. Este pequeño regalo digital es solo una forma de decirte cuánto te aprecio.\n\nQue la vida te devuelva todo el cariño y la alegría que regalas a quienes te rodean.\n\n¡Feliz cumpleaños de corazón!",
  letterSignature: "Con mucho cariño, de parte de {WILDER}",
};

// Helper para reemplazar {NOMBRE} y {WILDER} con los valores reales
export const fill = (template) =>
  template
    .replace("{NOMBRE}", CONFIG.name)
    .replace("{WILDER}", CONFIG.senderName);
