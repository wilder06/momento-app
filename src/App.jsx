// src/App.jsx
import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useBirthdaySong } from './hooks/useBirthdaySong';
import IntroScene from './components/IntroScene';
import SceneWrapper from './components/SceneWrapper';
import BirthdayCake from './components/BirthdayCake';
import Minigame from './components/Minigame';
import SparksScene from './components/SparksScene';
import GiftGallery from './components/GiftGallery';
import EnvelopeLetter from './components/EnvelopeLetter';
import FinalScene from './components/FinalScene';
import FeedbackScene from './components/FeedbackScene';
import './App.css';

const SCENES = {
  intro: 'intro',
  cake: 'cake',
  game: 'game',
  sparks: 'sparks',
  gifts: 'gifts',
  letter: 'letter',
  final: 'final',
  feedback: 'feedback',
};

const ORDER = [
  SCENES.intro,
  SCENES.cake,
  SCENES.game,
  SCENES.sparks,
  SCENES.gifts,
  SCENES.letter,
  SCENES.final,
  SCENES.feedback,
];

function App() {
  const [scene, setScene] = useState(SCENES.intro);
  const { isPlaying, toggle } = useBirthdaySong();

  const next = useCallback(() => {
    const idx = ORDER.indexOf(scene);
    if (idx < ORDER.length - 1) setScene(ORDER[idx + 1]);
  }, [scene]);

  const reset = useCallback(() => setScene(SCENES.intro), []);

  const renderScene = () => {
    switch (scene) {
      case SCENES.cake:
        return (
          <SceneWrapper key="cake" style={{ justifyContent: 'flex-start', overflowY: 'auto' }}>
            <BirthdayCake onComplete={next} />
          </SceneWrapper>
        );
      case SCENES.game:
        return (
          <SceneWrapper key="game" style={{ justifyContent: 'flex-start', overflowY: 'auto' }}>
            <Minigame onComplete={next} />
          </SceneWrapper>
        );
      case SCENES.sparks:
        return (
          <SceneWrapper key="sparks" style={{ justifyContent: 'flex-start', overflowY: 'auto' }}>
            <SparksScene onComplete={next} />
          </SceneWrapper>
        );
      case SCENES.gifts:
        return (
          <SceneWrapper key="gifts" style={{ justifyContent: 'flex-start', overflowY: 'auto' }}>
            <GiftGallery onComplete={next} />
          </SceneWrapper>
        );
      case SCENES.letter:
        return (
          <SceneWrapper key="letter" style={{ justifyContent: 'flex-start', overflowY: 'auto' }}>
            <EnvelopeLetter onComplete={next} />
          </SceneWrapper>
        );
      case SCENES.final:
        return (
          <SceneWrapper key="final" style={{ justifyContent: 'center' }}>
            <FinalScene onRestart={reset} onFinish={next} />
          </SceneWrapper>
        );
      case SCENES.feedback:
        return (
          <SceneWrapper key="feedback">
            <FeedbackScene onBack={() => setScene(SCENES.final)} />
          </SceneWrapper>
        );
      case SCENES.intro:
      default:
        return (
          <SceneWrapper key="intro">
            <IntroScene onStart={next} isPlaying={isPlaying} toggleMusic={toggle} />
          </SceneWrapper>
        );
    }
  };

  return (
    <div className="app">
      <div className="background-animation" />
      <AnimatePresence mode="wait">{renderScene()}</AnimatePresence>

      {/* Music toggle button */}
      <button
        className="music-btn"
        onClick={toggle}
        aria-label="Reproducir o pausar la música"
      >
        {isPlaying ? '🔊' : '🔇'}
      </button>
    </div>
  );
}

export default App;
