// src/hooks/useCustomCursor.ts
import { useState, useEffect, useCallback } from 'react';

export const useCustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const triggerClick = useCallback(() => {
    setClickCount(prev => prev + 1);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const CustomCursor = useCallback(() => {
    // Every other click flips the cursor 180 degrees
    const isFlipped = clickCount % 2 === 1;
    const baseRotation = 45; // Point up instead of down
    const flipRotation = isFlipped ? 180 : 0;
    const totalRotation = baseRotation + flipRotation;

    return (
      <div
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          transform: `translate(-20%, -50%) rotate(${totalRotation}deg) scale(${isClicked ? 0.8 : 1})`,
          fontSize: '48px',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.3s ease-out',
          display: isVisible ? 'block' : 'none',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
        }}
      >
        🔫
      </div>
    );
  }, [position, isVisible, isClicked, clickCount]);

  return { CustomCursor, triggerClick };
};