// src/components/ParticlesContainer.tsx
import { forwardRef, useImperativeHandle, useState } from 'react';

export interface ParticlesContainerRef {
  triggerExplosion: (x: number, y: number) => void;
}

interface CSSParticle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  emoji: string;
  size: number;
  delay: number;
}

export const ParticlesContainer = forwardRef<ParticlesContainerRef, {}>((_, ref) => {
  const [particles, setParticles] = useState<CSSParticle[]>([]);

  useImperativeHandle(ref, () => ({
    triggerExplosion: (x: number, y: number) => {
      console.log(`Creating CSS explosion at ${x}, ${y}`);
      
      const newParticles: CSSParticle[] = [];
      // Only the requested emojis
      const emojis = ['⚖️', '📖', '💥'];
      
      // Create 30 particles
      for (let i = 0; i < 30; i++) {
        const angle = (Math.PI * 2 * i) / 30 + (Math.random() - 0.5) * 0.5;
        const distance = 120 + Math.random() * 180; // Reasonable spread distance
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance - (Math.random() * 80 + 40); // Some upward motion
        
        newParticles.push({
          id: Date.now() + i,
          x: x,
          y: y,
          dx: dx,
          dy: dy,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          size: Math.random() * 20 + 16, // Larger for emojis (16-36px)
          delay: Math.random() * 200, // Stagger the animations
        });
      }
      
      setParticles(newParticles);
      
      // Clean up particles after animation
      setTimeout(() => {
        setParticles([]);
      }, 4000);
    },
  }));

  return (
    <>
      <style>{`
        .css-particle {
          position: fixed;
          pointer-events: none;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--size);
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
          animation: 
            particle-move 3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards,
            particle-fade 3s ease-out forwards;
        }
        
        @keyframes particle-move {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          50% {
            transform: translate(calc(var(--dx) * 0.7), calc(var(--dy) * 0.6)) scale(0.9) rotate(180deg);
          }
          100% {
            transform: translate(var(--dx), calc(var(--dy) + 60px)) scale(0.4) rotate(360deg);
          }
        }
        
        @keyframes particle-fade {
          0% { 
            opacity: 1; 
            filter: brightness(1.3) contrast(1.2);
          }
          60% { 
            opacity: 0.9; 
            filter: brightness(1.1) contrast(1.1);
          }
          100% { 
            opacity: 0; 
            filter: brightness(0.8) contrast(0.8);
          }
        }
      `}</style>
      
      {particles.map(particle => (
        <div
          key={particle.id}
          className="css-particle"
          style={{
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            animationDelay: `${particle.delay}ms`,
            '--dx': `${particle.dx}px`,
            '--dy': `${particle.dy}px`,
            '--size': `${particle.size}px`,
          } as React.CSSProperties & { '--dx': string; '--dy': string; '--size': string }}
        >
          {particle.emoji}
        </div>
      ))}
    </>
  );
});