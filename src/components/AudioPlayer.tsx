import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Volume1, Music, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/audio/interstellar.mp3');
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    // Handle audio events
    const onEnded = () => setIsPlaying(false);
    const onPause = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);

    audio.addEventListener('ended', onEnded);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('play', onPlay);

    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('play', onPlay);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          if (!hasInteracted) {
            setHasInteracted(true);
            toast.success('🎶 Ambient Music: Cornfield Chase - Hans Zimmer', {
              description: 'Cinematic soundtrack active for 3D experience.',
              duration: 3500,
            });
          }
        })
        .catch((err) => {
          console.warn('Audio play prevented:', err);
          toast.info('Click play to start background music.');
        });
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 select-none">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="relative group"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Glow effect behind player */}
        <div
          className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-purple-500/30 blur-md transition-opacity duration-500 ${
            isPlaying ? 'opacity-80 animate-pulse' : 'opacity-20 group-hover:opacity-60'
          }`}
        />

        {/* Main Floating Glass Card */}
        <div className="relative flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-slate-800/90 shadow-2xl hover:border-cyan-500/40 transition-all duration-300">
          {/* Play / Pause Primary Button */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
            className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-white" />
            ) : (
              <Play className="w-4 h-4 fill-white ml-0.5" />
            )}
          </button>

          {/* Equalizer Wave / Music Icon + Track Info */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={togglePlay}>
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-4.5 w-4.5 justify-center">
                <span className="w-1 bg-cyan-400 rounded-full animate-[bounce_0.8s_ease-in-out_infinite] h-4" />
                <span className="w-1 bg-cyan-300 rounded-full animate-[bounce_0.6s_ease-in-out_infinite_0.2s] h-3" />
                <span className="w-1 bg-blue-400 rounded-full animate-[bounce_0.9s_ease-in-out_infinite_0.4s] h-5" />
                <span className="w-1 bg-indigo-400 rounded-full animate-[bounce_0.7s_ease-in-out_infinite_0.1s] h-2.5" />
              </div>
            ) : (
              <div className="w-4.5 h-4.5 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-colors">
                <Music className="w-4 h-4" />
              </div>
            )}

            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors tracking-tight">
                  Cornfield Chase
                </span>
                {isPlaying && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-medium bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    <Sparkles className="w-2.5 h-2.5" /> Live
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-400 group-hover:text-slate-300 transition-colors">
                Hans Zimmer • Interstellar
              </span>
            </div>
          </div>

          {/* Expanded Volume Controls */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                animate={{ width: 'auto', opacity: 1, marginLeft: 8 }}
                exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 border-l border-slate-800 pl-3 overflow-hidden"
              >
                <button
                  onClick={toggleMute}
                  className="text-slate-400 hover:text-white transition-colors p-1"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                  ) : volume < 0.5 ? (
                    <Volume1 className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  aria-label="Volume Slider"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
