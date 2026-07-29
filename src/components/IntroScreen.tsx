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
    
    // 1. Flash white at 150ms (simulating light contact)
    setTimeout(() => {
      setIsFlashing(true);
    }, 150);

    // 2. Stop flashing and start fading out the whole overlay at 350ms
    setTimeout(() => {
      setIsFlashing(false);
      setIsFading(true);
    }, 350);

    // 3. Complete the transition and unmount after fade completes (700ms animation)
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
        "fixed inset-0 z-[9999] flex flex-col md:flex-row items-center justify-center bg-zinc-950 text-white overflow-hidden select-none px-6 py-8 md:p-12 gap-8 transition-all",
        isFlashing && "bg-white text-zinc-950 duration-200",
        isFading ? "opacity-0 duration-700 pointer-events-none" : "opacity-100"
      )}
    >
      {/* Main Intro content container */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl w-full gap-6 transition-all duration-500">
        <h2 className={cn(
          "text-2xl md:text-3xl font-semibold tracking-tight text-center bg-gradient-to-r bg-clip-text text-transparent transition-all duration-500",
          isFlashing ? "from-black to-black animate-none" : "from-teal-400 to-purple-400"
        )}>
          Harshit Satti — Backend Developer
        </h2>

        {/* Video / Photo Avatar Box */}
        <div className="relative w-full aspect-[4/3] max-w-lg rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl shadow-purple-500/10 group">
          {isVideoError ? (
            /* Fallback Profile Image */
            <div className="w-full h-full relative">
              <img 
                src="/intro-photo.jpg" 
                alt="Harshit Satti" 
                className="w-full h-full object-cover filter brightness-75 hover:brightness-90 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
              <div className="absolute top-4 left-4 bg-zinc-950/80 border border-zinc-700/50 backdrop-blur px-3 py-1 rounded-full text-xs text-teal-400 font-medium">
                Photo Mode (Fallback)
              </div>
            </div>
          ) : (
            /* AI Talking Video Player (Plays public/intro-video.mp4 if present) */
            <div className="w-full h-full relative">
              <video
                ref={videoRef}
                src="/intro-video.mp4"
                className="w-full h-full object-cover filter brightness-75"
                loop
                muted={isMuted}
                autoPlay
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={() => setIsVideoError(true)}
              />
              
              {/* Video overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-75 pointer-events-none" />

              {/* Controls Overlay */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={toggleMute}
                  className="bg-black/75 hover:bg-zinc-800 text-white p-2 rounded-full border border-zinc-700/50 backdrop-blur-sm transition-all"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={restartVideo}
                  className="bg-black/75 hover:bg-zinc-800 text-white p-2 rounded-full border border-zinc-700/50 backdrop-blur-sm transition-all"
                  title="Restart"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute top-4 left-4 bg-teal-500/10 border border-teal-500/30 backdrop-blur px-3 py-1 rounded-full text-xs text-teal-400 font-medium animate-pulse">
                AI Presenter Playing
              </div>
            </div>
          )}

          {/* Glowing Ambient Border */}
          <div className="absolute inset-0 border border-purple-500/20 rounded-2xl pointer-events-none group-hover:border-purple-500/40 transition-colors duration-500" />
        </div>

        {/* Captions / Speech Subtitles */}
        <div className="w-full max-w-lg min-h-[72px] bg-zinc-900/50 border border-zinc-800/80 backdrop-blur rounded-xl p-4 text-center">
          <p className={cn(
            "text-sm md:text-base text-zinc-300 font-light leading-relaxed transition-all duration-500",
            isFlashing && "text-zinc-900 font-medium"
          )}>
            "{captions[captionIndex]}"
          </p>
        </div>
      </div>

      {/* Interactive Light Switch / Pull-string Area */}
      <div className="flex flex-col items-center justify-center w-full md:w-auto md:min-w-[200px] h-full gap-4 md:border-l md:border-zinc-800 md:pl-12">
        <div className="text-center md:text-left mb-2 md:mb-6">
          <p className={cn(
            "text-xs uppercase tracking-wider font-semibold transition-colors duration-500",
            isFlashing ? "text-zinc-900" : "text-purple-400"
          )}>
            Portfolio Power
          </p>
          <h3 className={cn(
            "text-sm font-light mt-1 transition-colors duration-500",
            isFlashing ? "text-zinc-700" : "text-zinc-400"
          )}>
            Pull string to turn on lights
          </h3>
        </div>

        {/* Pull-String interactive widget */}
        <div className="relative h-[250px] w-[60px] flex justify-center">
          {/* Ceiling connection base */}
          <div className={cn(
            "absolute top-0 w-8 h-2 rounded-b bg-zinc-800 border-zinc-700 transition-colors duration-500",
            isFlashing && "bg-zinc-400"
          )} />
          
          {/* The String */}
          <div 
            className={cn(
              "absolute top-1 w-[2px] bg-zinc-600 transition-all duration-300 origin-top shadow-md cursor-pointer",
              isSwitchedOn ? "h-[190px]" : "h-[160px] hover:h-[170px]",
              isFlashing ? "bg-zinc-400" : "bg-gradient-to-b from-zinc-700 to-zinc-400"
            )}
            onClick={handlePullSwitch}
          />
          
          {/* The Knob / Pull Handle */}
          <div 
            onClick={handlePullSwitch}
            className={cn(
              "absolute w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 select-none shadow-lg border",
              isSwitchedOn 
                ? "top-[185px] bg-teal-500 border-teal-400 shadow-teal-500/50 scale-95" 
                : "top-[155px] hover:top-[165px] bg-zinc-800 hover:bg-zinc-700 border-zinc-700 hover:border-zinc-600 shadow-black/80 hover:scale-105",
              isFlashing && "bg-zinc-200 border-zinc-300 shadow-none text-zinc-950"
            )}
          >
            <Power 
              className={cn(
                "w-5 h-5 transition-colors duration-300",
                isSwitchedOn 
                  ? "text-zinc-950 animate-pulse" 
                  : "text-zinc-400 group-hover:text-zinc-200",
                isFlashing && "text-zinc-950"
              )} 
            />
          </div>

          {/* Glow Behind String/Knob */}
          {!isSwitchedOn && (
            <div className="absolute top-[150px] w-24 h-24 rounded-full bg-teal-500/5 blur-xl pointer-events-none animate-pulse" />
          )}
        </div>

        {/* Action button */}
        <button
          onClick={handlePullSwitch}
          disabled={isSwitchedOn || isFading}
          className={cn(
            "mt-4 px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border",
            isSwitchedOn 
              ? "bg-teal-500/20 border-teal-500/30 text-teal-400 cursor-not-allowed" 
              : "bg-zinc-900 hover:bg-zinc-800 border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white cursor-pointer active:scale-95",
            isFlashing && "bg-zinc-200 border-zinc-300 text-zinc-950 font-bold"
          )}
        >
          {isSwitchedOn ? "Powering Up..." : "Turn On Lights"}
        </button>
      </div>
    </div>
  );
};
