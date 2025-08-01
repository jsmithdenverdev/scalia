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
  color: string;
  size: number;
  delay: number;
}

export const ParticlesContainer = forwardRef<ParticlesContainerRef, {}>((_, ref) => {
  const [particles, setParticles] = useState<CSSParticle[]>([]);

  useImperativeHandle(ref, () => ({
    triggerExplosion: (x: number, y: number) => {
      console.log(`Creating CSS explosion at ${x}, ${y}`);
      
      const newParticles: CSSParticle[] = [];
      const colors = ['#ffffff', '#ffdd44', '#ff4444', '#44ff44', '#4444ff', '#ff44ff'];
      
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
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 8 + 4,
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
          border-radius: 50%;
          pointer-events: none;
          z-index: 2;
          animation: 
            particle-move 3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards,
            particle-fade 3s ease-out forwards;
        }
        
        @keyframes particle-move {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          50% {
            transform: translate(calc(var(--dx) * 0.7), calc(var(--dy) * 0.6)) scale(0.8) rotate(180deg);
          }
          100% {
            transform: translate(var(--dx), calc(var(--dy) + 60px)) scale(0.3) rotate(360deg);
          }
        }
        
        @keyframes particle-fade {
          0% { 
            opacity: 1; 
            filter: brightness(1.2);
          }
          60% { 
            opacity: 0.8; 
            filter: brightness(1);
          }
          100% { 
            opacity: 0; 
            filter: brightness(0.5);
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
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            animationDelay: `${particle.delay}ms`,
            '--dx': `${particle.dx}px`,
            '--dy': `${particle.dy}px`,
          } as React.CSSProperties & { '--dx': string; '--dy': string }}
        />
      ))}
    </>
  );
});