import React, { useState, useRef, useEffect } from 'react';
import { Power, Volume2, VolumeX, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IntroScreenProps {
  onComplete: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const [isSwitchedOn, setIsSwitchedOn] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [captionIndex, setCaptionIndex] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  const captions = [
    "Hello and welcome! I am Harshit Satti, a final-year CSE student and aspiring Full Stack Java Developer...",
    "I specialize in building scalable backend systems, Java development, and full-stack solutions.",
    "I created this portfolio to showcase my projects, skills, and professional journey.",
    "Ready to explore? Pull the light switch on the right to power up the full portfolio experience!"
  ];

  // Rotate captions every 5.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCaptionIndex((prev) => (prev + 1) % captions.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  // Procedural light switch click sound using Web Audio API
  const playSwitchSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const audioCtx = new AudioContextClass();

      // Sharp mechanical snap
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(920, audioCtx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(140, audioCtx.currentTime + 0.04);
      gain1.gain.setValueAtTime(0.18, audioCtx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start();
      osc1.stop(audioCtx.currentTime + 0.04);

      // Low frequency resonance click
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(180, audioCtx.currentTime + 0.012);
      osc2.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.09);
      gain2.gain.setValueAtTime(0.28, audioCtx.currentTime + 0.012);
      gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.09);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start(audioCtx.currentTime + 0.012);
      osc2.stop(audioCtx.currentTime + 0.09);
    } catch (e) {
      console.warn("Audio Context failed to play", e);
    }
  };

  const handlePullSwitch = () => {
    if (isSwitchedOn || isFading) return;
    
    playSwitchSound();
    setIsSwitchedOn(true);
    
    // 1. Flash white at 150ms
    setTimeout(() => {
      setIsFlashing(true);
    }, 150);

    // 2. Stop flashing and start fading out the whole overlay at 350ms
    setTimeout(() => {
      setIsFlashing(false);
      setIsFading(true);
    }, 350);

    // 3. Complete the transition and unmount after fade completes
    setTimeout(() => {
      onComplete();
    }, 1050);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[9999] bg-zinc-950 text-white overflow-hidden select-none transition-all",
        isFlashing && "bg-white text-zinc-950 duration-200",
        isFading ? "opacity-0 duration-700 pointer-events-none" : "opacity-100"
      )}
    >
      {/* Fullscreen Video / Photo Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {isVideoError ? (
          /* Fullscreen Fallback Profile Image */
          <div className="w-full h-full relative">
            <img 
              src="/intro-photo.jpg" 
              alt="Harshit Satti" 
              className="w-full h-full object-cover filter brightness-[0.5] hover:brightness-[0.55] transition-all duration-500"
            />
          </div>
        ) : (
          /* Fullscreen AI Talking Video Player */
          <div className="w-full h-full relative">
            <video
              ref={videoRef}
              src="/intro-video.mp4"
              className="w-full h-full object-cover filter brightness-[0.5]"
              loop
              muted={isMuted}
              autoPlay
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={() => setIsVideoError(true)}
            />
          </div>
        )}

        {/* Ambient Dark Overlay to make text and controls legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/80 z-10 pointer-events-none" />
      </div>

      {/* Floating UI Overlays */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between items-center px-6 py-12 md:py-16 select-none pointer-events-none">
        
        {/* Header - Title */}
        <header className="w-full text-center pointer-events-auto">
          <h2 className={cn(
            "text-2xl md:text-4xl font-semibold tracking-wide bg-gradient-to-r bg-clip-text text-transparent transition-all duration-500",
            isFlashing ? "from-black to-black animate-none" : "from-teal-400 via-zinc-100 to-purple-400"
          )}>
            Harshit Satti
          </h2>
          <p className={cn(
            "text-xs md:text-sm tracking-widest uppercase font-light mt-2 transition-colors duration-500",
            isFlashing ? "text-zinc-800" : "text-zinc-400"
          )}>
            Backend Developer Portfolio
          </p>
        </header>

        {/* Bottom Area - Subtitles and Controls */}
        <div className="w-full max-w-3xl flex flex-col items-center gap-6 pointer-events-auto">
          
          {/* Subtitles Overlay */}
          <div className="w-full bg-black/60 border border-zinc-850 backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-2xl text-center">
            <p className={cn(
              "text-sm md:text-lg text-zinc-200 font-light leading-relaxed transition-all duration-500",
              isFlashing && "text-zinc-900 font-medium"
            )}>
              "{captions[captionIndex]}"
            </p>
          </div>

          {/* Video control badges */}
          <div className="flex items-center gap-3">
            <span className="bg-teal-500/10 border border-teal-500/30 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs text-teal-400 font-medium animate-pulse">
              AI Presenter Playing
            </span>
            {!isVideoError && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleMute}
                  className="bg-black/60 hover:bg-zinc-900 text-white p-2 rounded-full border border-zinc-800 backdrop-blur-sm transition-all active:scale-95"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={restartVideo}
                  className="bg-black/60 hover:bg-zinc-900 text-white p-2 rounded-full border border-zinc-800 backdrop-blur-sm transition-all active:scale-95"
                  title="Restart Video"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Hanging Pull-String Switch (Absolute overlay on the right side) */}
      <div className="absolute right-6 md:right-16 top-0 bottom-0 z-30 flex flex-col items-center justify-start py-8 pointer-events-none">
        
        {/* String connection base */}
        <div className={cn(
          "w-8 h-2 rounded-b bg-zinc-800 border-zinc-700 transition-colors duration-500 pointer-events-auto",
          isFlashing && "bg-zinc-400"
        )} />
        
        {/* Pull String widget */}
        <div className="relative h-[280px] w-[60px] flex justify-center pointer-events-auto">
          {/* String */}
          <div 
            className={cn(
              "absolute top-0 w-[2px] bg-zinc-500 transition-all duration-300 origin-top shadow-md cursor-pointer",
              isSwitchedOn ? "h-[220px]" : "h-[180px] hover:h-[195px]",
              isFlashing ? "bg-zinc-400" : "bg-gradient-to-b from-zinc-700 to-zinc-400"
            )}
            onClick={handlePullSwitch}
          />
          
          {/* Knob / Pull Handle */}
          <div 
            onClick={handlePullSwitch}
            className={cn(
              "absolute w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 select-none shadow-lg border z-10",
              isSwitchedOn 
                ? "top-[215px] bg-teal-500 border-teal-400 shadow-teal-500/50 scale-95" 
                : "top-[175px] hover:top-[190px] bg-zinc-800 hover:bg-zinc-700 border-zinc-700 hover:border-zinc-650 shadow-black/80 hover:scale-105",
              isFlashing && "bg-zinc-200 border-zinc-300 shadow-none text-zinc-950"
            )}
          >
            <Power 
              className={cn(
                "w-4 h-4 transition-colors duration-300",
                isSwitchedOn 
                  ? "text-zinc-950 animate-pulse" 
                  : "text-zinc-400 group-hover:text-zinc-200",
                isFlashing && "text-zinc-950"
              )} 
            />
          </div>

          {/* Glow Behind Handle */}
          {!isSwitchedOn && (
            <div className="absolute top-[170px] w-20 h-20 rounded-full bg-teal-500/10 blur-xl pointer-events-none animate-pulse" />
          )}
        </div>

        {/* Floating Label pointing to switch (shows only if switch not pulled) */}
        {!isSwitchedOn && (
          <div className={cn(
            "mt-4 bg-black/75 border border-zinc-800 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-widest text-zinc-400 text-center animate-bounce shadow-md"
          )}>
            Pull to start
          </div>
        )}
      </div>
    </div>
  );
};
