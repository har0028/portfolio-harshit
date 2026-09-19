import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (val: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(1.0); // Default 100% Full Volume
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isManuallyPausedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio('/audio/interstellar.mp3');
    audio.loop = true;
    audio.volume = 1.0; // Full volume
    audio.preload = 'auto';
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    // Play helper
    const tryPlay = () => {
      if (isManuallyPausedRef.current || !audioRef.current) return;
      if (audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            cleanupListeners();
          })
          .catch(() => {
            // Browser autoplay policy requires user interaction
          });
      }
    };

    // Immediate attempt on mount
    tryPlay();

    // Universal interaction listeners for instant playback
    const events = [
      'click',
      'mousedown',
      'mouseup',
      'pointerdown',
      'touchstart',
      'touchend',
      'scroll',
      'keydown',
      'wheel',
      'mousemove',
    ];

    const handleInteraction = () => {
      tryPlay();
    };

    const cleanupListeners = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleInteraction);
      });
    };

    events.forEach((evt) => {
      window.addEventListener(evt, handleInteraction, { passive: true, once: false });
    });

    return () => {
      cleanupListeners();
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      isManuallyPausedRef.current = true;
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      isManuallyPausedRef.current = false;
      audioRef.current.volume = volume || 1.0;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.warn('Play error:', e));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 1.0;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        togglePlay,
        toggleMute,
        setVolume,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
