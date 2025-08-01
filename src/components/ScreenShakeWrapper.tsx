// src/components/ScreenShakeWrapper.tsx
import React from 'react';

interface ScreenShakeWrapperProps {
  children: React.ReactNode;
  isShaking: boolean;
}

export const ScreenShakeWrapper: React.FC<ScreenShakeWrapperProps> = ({ children, isShaking }) => {
  const shakeStyle = {
    animation: isShaking ? 'shake 0.4s ease-in-out' : 'none',
  };

  return (
    <div style={shakeStyle}>
      {children}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-10px, -10px) rotate(-1deg); }
          20% { transform: translate(10px, -5px) rotate(1deg); }
          30% { transform: translate(-5px, 15px) rotate(0deg); }
          40% { transform: translate(15px, 5px) rotate(1deg); }
          50% { transform: translate(-10px, 5px) rotate(-1deg); }
          60% { transform: translate(10px, -10px) rotate(0deg); }
          70% { transform: translate(-15px, 0px) rotate(-1deg); }
          80% { transform: translate(15px, -5px) rotate(1deg); }
          90% { transform: translate(-5px, 10px) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};