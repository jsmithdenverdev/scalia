// src/App.tsx
import React, { useState, useRef } from 'react';
import scaliaImage from './assets/scalia.jpg';
import { useCustomCursor } from './hooks/useCustomCursor';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { ScreenShakeWrapper } from './components/ScreenShakeWrapper';
import { ParticlesContainer, type ParticlesContainerRef } from './components/ParticlesContainer';

function App() {
  const { CustomCursor, triggerClick } = useCustomCursor();
  const { playScaliaSound } = useAudioPlayer();
  const [isShaking, setIsShaking] = useState(false);
  const particlesRef = useRef<ParticlesContainerRef>(null);

  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    triggerClick(); // Trigger cursor flip animation
    particlesRef.current?.triggerExplosion(e.clientX, e.clientY); // Trigger particle explosion at click position
    playScaliaSound();
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
    console.log(`Click at ${e.clientX}, ${e.clientY}`);
  };

  return (
    <div
      className="App w-full h-full bg-gray-900 flex items-center justify-center"
      onClick={handlePageClick}
    >
      <CustomCursor />
      <ParticlesContainer ref={particlesRef} />
      
      <ScreenShakeWrapper isShaking={isShaking}>
        <main className="relative z-10 flex flex-col items-center p-8 select-none">
          <img 
            src={scaliaImage} 
            alt="Official portrait of Antonin Scalia"
            className="w-64 h-auto md:w-80 rounded-lg shadow-2xl border-4 border-gray-300"
            style={{ filter: 'sepia(0.3) contrast(1.1)' }}
          />
          <h1 className="mt-6 text-2xl md:text-4xl font-bold tracking-wider text-gray-300 text-center"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
          >
            ANTONIN SCALIA
          </h1>
        </main>
      </ScreenShakeWrapper>
    </div>
  );
}

export default App;
