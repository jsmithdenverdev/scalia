You are an expert-level senior front-end developer with deep mastery of modern React, TypeScript, and the Vite build tool. You build clean, efficient, and well-structured applications following best practices. Your task is to develop a single-page React application from scratch based on the detailed technical specifications I provide below.

**PROJECT TITLE: The Scalia Bombastic Clicker**

**PROJECT GOAL:**
To create a single-page gag application centered around an image of Antonin Scalia. The application will feature a custom cursor and highly dynamic, "over-the-top" visual and audio feedback upon user interaction (a click). The entire experience should feel polished, impactful, and absurdly grandiose, built with the latest React 19 features and the speed of Vite.

**TECHNICAL STACK:**

  * **Framework:** React 19.1
  * **Language:** TypeScript
  * **Build Tool:** Vite
  * **Styling:** Tailwind CSS
  * **Effects Libraries:** `react-tsparticles` for particle effects, `react-screen-shake` for a camera shake effect.
  * **Deployment Target:** Netlify

-----

### **SECTION 1: PROJECT SETUP AND INITIALIZATION**

Please provide the complete code for the application, starting with the necessary terminal commands for setup.

**Step 1.1: Create Vite App**
Initialize a new React project using `vite` with the `react-ts` template.

```bash
npm create vite@latest scalia-clicker -- --template react-ts
cd scalia-clicker
```

**Step 1.2: Install Dependencies**
Install all necessary dependencies, including React 19, styling, and effects libraries.

  * Install React 19 and its DOM renderer:
    ```bash
    npm install react@19.1 react-dom@19.1
    ```
  * Install Tailwind CSS and its peer dependencies for Vite:
    ```bash
    npm install -D tailwindcss postcss autoprefixer
    ```
  * Install libraries for particle effects and screen shake:
    ```bash
    npm install react-tsparticles tsparticles-engine tsparticles tsparticles-preset-confetti react-screen-shake
    ```

**Step 1.3: Initialize Tailwind CSS**
Generate the `tailwind.config.js` and `postcss.config.js` files.

```bash
npx tailwindcss init -p
```

-----

### **SECTION 2: CONFIGURATION FILES**

Now, populate the configuration files with the following content.

**Step 2.1: `tailwind.config.js`**
Configure the `content` paths to ensure Tailwind scans all relevant files for class names.

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Step 2.2: `src/index.css`**
Set up the main CSS entry point with the required Tailwind directives and base styles for the application.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body {
  @apply bg-gray-900 text-white m-0 p-0 overflow-hidden;
  /* This is critical for the custom cursor to work as intended */
  cursor: none;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Ensure the root element takes up the full viewport */
#root, .App {
    width: 100vw;
    height: 100vh;
}
```

**Step 2.3: `index.html`**
Modify the root `index.html` file to set the page title and ensure the app container is ready.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>The Scalia Clicker</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

-----

### **SECTION 3: FILE STRUCTURE AND ASSETS**

Organize the `src` directory according to modern React best practices. Create the following directories and files. I will provide the contents for each file in the next section.

```
/src
├── assets
│   └── scalia.jpg
├── components
│   ├── ParticlesContainer.tsx
│   └── ScreenShakeWrapper.tsx
├── hooks
│   ├── useAudioPlayer.ts
│   └── useCustomCursor.ts
├── App.tsx
├── index.css
└── main.tsx
```

**Step 3.1: Asset Placement**
You must programmatically assume that the image of Antonin Scalia, available at `https://upload.wikimedia.org/wikipedia/commons/2/22/Antonin_Scalia_Official_SCOTUS_Portrait.jpg`, has been downloaded and placed at `src/assets/scalia.jpg`. The code should import this local asset.

-----

### **SECTION 4: HOOK AND COMPONENT IMPLEMENTATION**

Now, write the full TypeScript and TSX code for each file. Pay close attention to the comments and implement the logic exactly as described.

**Step 4.1: The Custom Cursor Hook (`src/hooks/useCustomCursor.ts`)**
Create a reusable hook to manage the state and rendering of our custom cursor. The cursor should be a finger gun emoji (`🔫`) rotated at a -45 degree angle.

```typescript
// src/hooks/useCustomCursor.ts
import { useState, useEffect, useCallback } from 'react';

export const useCustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

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

  const CustomCursor = useCallback(() => (
    <div
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        transform: `translate(-20%, -50%) rotate(-45deg) scale(${isClicked ? 0.8 : 1})`,
        fontSize: '48px',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'transform 0.1s ease-out',
        display: isVisible ? 'block' : 'none',
        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
      }}
    >
      🔫
    </div>
  ), [position, isVisible, isClicked]);

  return { CustomCursor };
};
```

**Step 4.2: The Audio Player Hook (`src/hooks/useAudioPlayer.ts`)**
Create a hook that encapsulates the Web Speech API logic. The hook should expose a function to play the word "SCALIA" in a dramatic voice.

```typescript
// src/hooks/useAudioPlayer.ts
import { useCallback, useEffect } from 'react';

export const useAudioPlayer = () => {
  const playScaliaSound = useCallback(() => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("SCALIA");
      
      const voices = window.speechSynthesis.getVoices();
      const ukVoice = voices.find(voice => voice.lang === 'en-GB');
      
      utterance.voice = ukVoice || voices[0];
      utterance.pitch = 0.8;
      utterance.rate = 0.9;
      utterance.volume = 1.0;
      
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Browser does not support the Web Speech API.");
    }
  }, []);

  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  return { playScaliaSound };
};
```

**Step 4.3: The Screen Shake Wrapper (`src/components/ScreenShakeWrapper.tsx`)**
This component will use `react-screen-shake` to provide a container that can be programmatically shaken.

```typescript
// src/components/ScreenShakeWrapper.tsx
import React from 'react';
import { Shake } from 'react-screen-shake';

interface ScreenShakeWrapperProps {
  children: React.ReactNode;
  isShaking: boolean;
}

export const ScreenShakeWrapper: React.FC<ScreenShakeWrapperProps> = ({ children, isShaking }) => {
  if (!isShaking) {
    return <>{children}</>;
  }

  return (
    <Shake
      h={25} v={25} r={5} dur={400} int={15}
      q={Shake.ELASTIC} fixed={true} fixedStop={false} freez={false}
    >
      {children}
    </Shake>
  );
};
```

**Step 4.4: The Particle Effects Container (`src/components/ParticlesContainer.tsx`)**
This component uses `react-tsparticles` for the explosion. Use `forwardRef` to expose a trigger function to the parent `App` component.

```typescript
// src/components/ParticlesContainer.tsx
import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles"; 
import type { IOptions, RecursivePartial } from 'tsparticles-engine';

export interface ParticlesContainerRef {
  triggerExplosion: (x: number, y: number) => void;
}

export const ParticlesContainer = forwardRef<ParticlesContainerRef>((props, ref) => {
  const containerRef = useRef<Container | undefined>();

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
        await loadFull(engine);
    });
  }, []);

  const particlesLoaded = (container: Container | undefined): void => {
    containerRef.current = container;
  };

  useImperativeHandle(ref, () => ({
    triggerExplosion: (x: number, y: number) => {
      if (!containerRef.current) return;
      
      const relativeX = (x / window.innerWidth) * 100;
      const relativeY = (y / window.innerHeight) * 100;

      containerRef.current.addEmitter({
        position: { x: relativeX, y: relativeY },
        rate: { quantity: 100, delay: 0 },
        life: { count: 1, duration: 0.1 },
        particles: { move: { direction: "none", enable: true, outModes: { default: "destroy" }, random: true, speed: { min: 15, max: 30 }, spread: 360 } },
      });

      containerRef.current.addEmitter({
        position: { x: relativeX, y: relativeY },
        rate: { quantity: 80, delay: 0 },
        life: { count: 1, duration: 0.1 },
        particles: {
            shape: { type: "circle" },
            color: { value: ["#ffffff", "#cccccc", "#a3a3a3"] },
            opacity: { value: 0.6, animation: { enable: true, speed: 1.5, minimumValue: 0, sync: false, destroy: "max" } },
            size: { value: {min: 30, max: 50}, animation: { enable: true, speed: 10, minimumValue: 10, sync: false, destroy: "max" } },
            move: { enable: true, speed: { min: 3, max: 6 }, direction: "none", outModes: { default: "destroy" }, random: true, spread: 360, decay: 0.02 }
        }
      });
    },
  }));

  const options: RecursivePartial<IOptions> = {
    fullScreen: { enable: true, zIndex: 1 },
    background: { color: { value: 'transparent' } },
    particles: {
      number: { value: 0 },
      shape: { type: "text", options: { text: { value: ["⚖️", "📚", "🔫"], font: "Verdana" }}},
      size: { value: { min: 32, max: 48 } },
      opacity: { value: 1.0 },
      move: { gravity: { enable: true, acceleration: 20 }, decay: 0.05 },
    },
    detectRetina: true,
  };

  return <Particles id="tsparticles" options={options} particlesLoaded={particlesLoaded} />;
});
```

**Step 4.5: The Main Application Component (`src/App.tsx`)**
This component orchestrates everything. It will manage the state for the screen shake, handle the main click event, and render all the pieces together.

```typescript
// src/App.tsx
import React, { useState, useRef } from 'react';
import scaliaImage from './assets/scalia.jpg';
import { useCustomCursor } from './hooks/useCustomCursor';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { ScreenShakeWrapper } from './components/ScreenShakeWrapper';
import { ParticlesContainer, ParticlesContainerRef } from './components/ParticlesContainer';

function App() {
  const { CustomCursor } = useCustomCursor();
  const { playScaliaSound } = useAudioPlayer();
  const [isShaking, setIsShaking] = useState(false);
  const particlesRef = useRef<ParticlesContainerRef>(null);

  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    particlesRef.current?.triggerExplosion(e.clientX, e.clientY);
    playScaliaSound();
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  return (
    <div
      className="App w-full h-full bg-gray-900 flex items-center justify-center overflow-hidden"
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
```

**Step 4.6: The Application Entry Point (`src/main.tsx`)**
This is the main entry point for the Vite application.

```typescript
// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

-----

### **SECTION 5: DEPLOYMENT CONFIGURATION**

To ensure easy deployment to Netlify, create a `netlify.toml` file in the root of the project directory. Note that Vite's output directory is `dist`, not `build`.

**Step 5.1: `netlify.toml`**

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[context.production.environment]
  NODE_VERSION = "20"
```

-----

### **FINAL INSTRUCTIONS**

You have all the necessary information, code, and configurations for a Vite + React 19 project. Please generate the complete file structure and code for the "Scalia Bombastic Clicker" application. Do not omit any files or details. The final output should be a fully functional application ready for `npm run dev`.