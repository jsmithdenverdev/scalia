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
  const [showSunglasses, setShowSunglasses] = useState(false);
  const particlesRef = useRef<ParticlesContainerRef>(null);

  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    triggerClick(); // Trigger cursor flip animation
    particlesRef.current?.triggerExplosion(e.clientX, e.clientY); // Trigger particle explosion at click position
    playScaliaSound();
    setIsShaking(true);
    setShowSunglasses(true); // Show sunglasses on click
    
    setTimeout(() => setIsShaking(false), 500);
    setTimeout(() => setShowSunglasses(false), 2000); // Hide sunglasses after 2 seconds
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
          <div className="relative">
            <img 
              src={scaliaImage} 
              alt="Official portrait of Antonin Scalia"
              className="w-64 h-auto md:w-80 rounded-lg shadow-2xl border-4 border-gray-300"
              style={{ filter: 'sepia(0.3) contrast(1.1)' }}
            />
            {showSunglasses && (
              <div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{
                  top: '15%', // Higher position to be on his face/eyes
                  fontSize: '4rem', // Large sunglasses
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  animation: 'sunglasses-appear 0.3s ease-out',
                }}
              >
                🕶️
              </div>
            )}
          </div>
          <h1 className="mt-6 text-2xl md:text-4xl font-bold tracking-wider text-gray-300 text-center"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
          >
            ANTONIN SCALIA
          </h1>
        </main>
      </ScreenShakeWrapper>
      
      <style>{`
        @keyframes sunglasses-appear {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(-10deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}

export default App;
