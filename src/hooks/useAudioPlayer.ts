// src/hooks/useAudioPlayer.ts
import { useCallback, useEffect } from 'react';

export const useAudioPlayer = () => {
  const playScaliaSound = useCallback(() => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("Skah-leee-ahh");
      
      const voices = window.speechSynthesis.getVoices();
      const ukVoice = voices.find(voice => voice.lang === 'en-GB');
      
      utterance.voice = ukVoice || voices[0];
      utterance.pitch = 0.8;
      utterance.rate = 0.7; // Slower rate to emphasize the pronunciation
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