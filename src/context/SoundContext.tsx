import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface SoundContextProps {
  muted: boolean;
  toggleMute: () => void;
  playClick: () => void;
}

const SoundContext = createContext<SoundContextProps | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [muted, setMuted] = useState(() => {
    const saved = localStorage.getItem('portfolio_sound');
    return saved ? saved === 'muted' : true; // muted by default
  });

  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const clickRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    // Attempt to load files from public folder
    const ambientAudio = new Audio('/audio/ambient.mp3');
    ambientAudio.loop = true;
    ambientAudio.volume = 0.15;
    ambientRef.current = ambientAudio;

    const clickAudio = new Audio('/audio/keyclick.mp3');
    clickAudio.volume = 0.4;
    clickRef.current = clickAudio;

    return () => {
      ambientAudio.pause();
      ambientRef.current = null;
      clickRef.current = null;
    };
  }, []);

  // Sync mute state with audio element
  useEffect(() => {
    if (ambientRef.current) {
      if (muted) {
        ambientRef.current.pause();
      } else {
        // Only attempt play on interaction (standard browser policy)
        ambientRef.current.play().catch((e) => {
          console.log('Playback blocked by browser autoplay rules. Will play on first click.', e);
        });
      }
    }
  }, [muted]);

  const toggleMute = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    localStorage.setItem('portfolio_sound', newMuted ? 'muted' : 'unmuted');

    // Trigger AudioContext resume on user gesture
    if (!newMuted && !audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playClick = () => {
    if (muted) return;

    // 1. Try playing click audio asset
    if (clickRef.current) {
      clickRef.current.currentTime = 0;
      clickRef.current.play().catch(() => {
        // 2. Programmatic synthesizer fallback if asset fails to load
        playSynthesizedClick();
      });
    } else {
      playSynthesizedClick();
    }
  };

  const playSynthesizedClick = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Synthesize a sharp, natural woodblock/key-click sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // AudioContext fails silently
    }
  };

  return (
    <SoundContext.Provider value={{ muted, toggleMute, playClick }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
