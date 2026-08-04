import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playScratchSparkleSound, playUnlockSuccessSound } from '../utils/audioEngine';
import { playTrack, pauseTrack, toggleTrack } from '../utils/audioManager';
import confetti from 'canvas-confetti';
import { FaWandMagicSparkles, FaHeart, FaHandPointer, FaVolumeXmark, FaVolumeHigh } from 'react-icons/fa6';

const ScratchCard = ({ image, videoUrl, songUrl, onScratchComplete, isAlreadyRevealed = false }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(isAlreadyRevealed);
  const [scratchPercent, setScratchPercent] = useState(isAlreadyRevealed ? 100 : 0);
  const [isMuted, setIsMuted] = useState(false);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  // Sync internal state if prop changes
  useEffect(() => {
    if (isAlreadyRevealed) {
      setIsRevealed(true);
      setScratchPercent(100);
    }
  }, [isAlreadyRevealed]);

  // Autoplay video ONLY when card is revealed
  useEffect(() => {
    if (videoUrl && videoRef.current) {
      if (isRevealed) {
        videoRef.current.play().catch((err) => {
          console.warn("Video play prevented by browser policy:", err);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [videoUrl, isRevealed]);

  const handleMute = () => {
    setIsMuted(true);
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
    pauseTrack();
  };

  const handleUnmute = () => {
    setIsMuted(false);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(e => console.warn(e));
    }
    if (songUrl) {
      playTrack(songUrl);
    }
  };

  const handleRevealComplete = () => {
    if (isRevealed) return;
    setIsRevealed(true);
    setScratchPercent(100);
    playUnlockSuccessSound();

    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#ffd700', '#ff2e63', '#ffffff', '#e6194b']
      });
    } catch (e) {}

    // Start playing audio/video ONLY AFTER scratch card is opened and revealed
    if (songUrl && !videoUrl) {
      playTrack(songUrl);
    } else if (videoUrl && videoRef.current) {
      videoRef.current.play().catch((err) => console.warn(err));
    }

    if (onScratchComplete) onScratchComplete();
  };

  useEffect(() => {
    if (isRevealed) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');

    const initCanvas = () => {
      const w = Math.max(container.offsetWidth, 320);
      const h = Math.max(container.offsetHeight, 460);
      canvas.width = w;
      canvas.height = h;

      // Draw Luxury Metallic Foil Cover with Rose Gold Gradient
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#3b0616');
      grad.addColorStop(0.2, '#5c0920');
      grad.addColorStop(0.4, '#bf953f');
      grad.addColorStop(0.6, '#e6194b');
      grad.addColorStop(0.85, '#ffd700');
      grad.addColorStop(1, '#2b0c20');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Add Diamond Noise Pattern
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      for (let i = 0; i < w; i += 20) {
        for (let j = 0; j < h; j += 20) {
          if ((i + j) % 40 === 0) {
            ctx.fillRect(i, j, 10, 10);
          }
        }
      }

      // Draw Metallic Border
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.6)';
      ctx.lineWidth = 4;
      ctx.strokeRect(12, 12, w - 24, h - 24);

      // Text Details on Scratch Cover
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 10;
      ctx.font = 'bold 22px "Cinzel", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('✨ SCRATCH ME ❤️', w / 2, h / 2 - 25);

      ctx.font = '13px "Montserrat", sans-serif';
      ctx.fillStyle = '#fcf6ba';
      ctx.fillText('Drag finger or cursor to unveil memory...', w / 2, h / 2 + 10);

      ctx.shadowBlur = 0;
    };

    initCanvas();

    const resizeObserver = new ResizeObserver(() => {
      if (!isRevealed && scratchPercent < 5) {
        initCanvas();
      }
    });
    resizeObserver.observe(container);

    const checkScratchPercentage = () => {
      if (isRevealed) return;
      const w = canvas.width;
      const h = canvas.height;
      if (w <= 0 || h <= 0) return;

      const imageData = ctx.getImageData(0, 0, w, h);
      const pixels = imageData.data;
      let clearPixels = 0;

      for (let i = 3; i < pixels.length; i += 32) {
        if (pixels[i] === 0) {
          clearPixels++;
        }
      }

      const totalChecked = pixels.length / 32;
      const percent = Math.min(100, Math.round((clearPixels / totalChecked) * 100));
      setScratchPercent(percent);

      if (percent >= 30) {
        handleRevealComplete();
      }
    };

    const drawScratchLine = (x1, y1, x2, y2) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 48;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      playScratchSparkleSound();
      checkScratchPercentage();
    };

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      let clientX = e.clientX;
      let clientY = e.clientY;
      if (e.touches && e.touches[0]) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const handleStart = (e) => {
      isDrawingRef.current = true;
      const pos = getPos(e);
      lastPosRef.current = pos;
      drawScratchLine(pos.x, pos.y, pos.x + 0.1, pos.y + 0.1);
    };

    const handleMove = (e) => {
      if (!isDrawingRef.current) return;
      if (e.cancelable) e.preventDefault();
      const pos = getPos(e);
      drawScratchLine(lastPosRef.current.x, lastPosRef.current.y, pos.x, pos.y);
      lastPosRef.current = pos;
    };

    const handleEnd = () => {
      isDrawingRef.current = false;
    };

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);

    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isAlreadyRevealed, isRevealed, scratchPercent]);

  const handleImageTap = () => {
    if (!isRevealed) {
      handleRevealComplete();
    } else if (songUrl) {
      toggleTrack(songUrl);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {/* Scratch Card Main Frame Container */}
      <div
        ref={containerRef}
        className="relative w-full min-h-[460px] md:min-h-[520px] rounded-3xl overflow-hidden glass-modal border-2 border-gold/50 shadow-[0_0_50px_rgba(255,46,99,0.35)] flex items-center justify-center p-3 select-none"
      >
        {/* Soft Ambient Blurred Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover filter blur-3xl opacity-35 scale-125"
          />
          <div className="absolute inset-0 bg-dark-900/40" />
        </div>

        {/* Original Uncropped Image or Auto-Playing Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full h-full flex items-center justify-center cursor-pointer"
          onClick={handleImageTap}
        >
          {videoUrl ? (
            <video
              ref={videoRef}
              src={videoUrl}
              autoPlay
              loop
              playsInline
              muted={isMuted}
              className={`max-h-[70vh] w-full h-auto object-contain rounded-2xl shadow-2xl transition-all duration-700 cursor-pointer ${
                isRevealed ? 'filter-none scale-100 hover:scale-[1.02]' : 'filter blur-xs brightness-95'
              }`}
            />
          ) : (
            <img
              ref={imageRef}
              src={image}
              alt="Unveiled Memory"
              className={`max-h-[70vh] w-auto h-auto object-contain rounded-2xl shadow-2xl transition-all duration-700 cursor-pointer ${
                isRevealed ? 'filter-none scale-100 hover:scale-[1.02]' : 'filter blur-xs brightness-95'
              }`}
            />
          )}
        </motion.div>

        {/* HTML5 Metallic Scratch Canvas Overlay */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.canvas
              ref={canvasRef}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.8 } }}
              className="absolute inset-0 z-20 cursor-pointer touch-none w-full h-full rounded-3xl"
            />
          )}
        </AnimatePresence>

        {/* Scratch Controls & Tap-to-Reveal Pill */}
        {!isRevealed && (
          <div className="absolute bottom-6 z-30 flex flex-col items-center space-y-2">
            <button
              onClick={handleRevealComplete}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-crimson via-rose-ruby to-gold text-white font-serif font-bold text-xs shadow-2xl border border-gold flex items-center space-x-2 animate-bounce cursor-pointer"
            >
              <FaHandPointer className="w-4 h-4 text-gold" />
              <span>TAP TO REVEAL INSTANTLY ❤️</span>
            </button>
            <div className="px-3 py-1 rounded-full glass-modal border border-gold/40 text-gold text-[11px] font-semibold flex items-center space-x-1">
              <FaWandMagicSparkles className="w-3 h-3 text-gold animate-spin" />
              <span>{scratchPercent}% Scratched</span>
            </div>
          </div>
        )}
      </div>

      {/* Unlocked Banner */}
      {isRevealed && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="mt-4 px-6 py-2.5 rounded-full glass-card border border-gold/50 text-gold-shimmer font-serif font-bold text-base flex items-center space-x-2 shadow-2xl"
        >
          <FaHeart className="w-4 h-4 text-rose-glow animate-bounce" />
          <span>{videoUrl ? "Video Memory Unlocked! 🎬❤️" : "Original Quality Memory Unlocked! ❤️"}</span>
          <FaWandMagicSparkles className="w-4 h-4 text-gold animate-spin-slow" />
        </motion.div>
      )}

      {/* Dedicated Sound Controls (Exclusive for Video Card) */}
      {videoUrl && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 w-full p-5 rounded-3xl glass-modal border-2 border-gold/40 shadow-[0_0_30px_rgba(255,215,0,0.2)] flex flex-col items-center space-y-3"
        >
          <div className="flex items-center space-x-2 text-gold font-serif text-sm font-bold tracking-wider uppercase">
            <FaVolumeHigh className="w-4 h-4 text-rose-glow animate-pulse" />
            <span>Sound Controls 🎵</span>
          </div>

          <p className="text-xs text-gray-300 font-sans text-center">
            Mute or Unmute audio for this video memory card:
          </p>

          <div className="flex items-center justify-center space-x-4 w-full pt-1">
            {/* Mute Button */}
            <button
              onClick={handleMute}
              className={`flex-1 py-3 px-4 rounded-full font-serif font-bold text-xs flex items-center justify-center space-x-2 border transition-all duration-300 cursor-pointer ${
                isMuted
                  ? 'bg-rose-crimson text-white border-gold shadow-[0_0_20px_rgba(255,46,99,0.6)] scale-105'
                  : 'glass-card text-gray-300 border-gold/30 hover:border-gold hover:text-white'
              }`}
            >
              <FaVolumeXmark className="w-4 h-4 text-rose-light" />
              <span>MUTE 🔇</span>
            </button>

            {/* Unmute (Sound On) Button */}
            <button
              onClick={handleUnmute}
              className={`flex-1 py-3 px-4 rounded-full font-serif font-bold text-xs flex items-center justify-center space-x-2 border transition-all duration-300 cursor-pointer ${
                !isMuted
                  ? 'bg-gradient-to-r from-rose-crimson via-rose-ruby to-gold text-white border-gold shadow-[0_0_20px_rgba(255,215,0,0.6)] scale-105'
                  : 'glass-card text-gray-300 border-gold/30 hover:border-gold hover:text-white'
              }`}
            >
              <FaVolumeHigh className="w-4 h-4 text-gold" />
              <span>UNMUTE (SOUND ON) 🔊</span>
            </button>
          </div>

          <div className="text-[11px] font-semibold text-rose-light tracking-wide pt-1">
            {isMuted ? "Audio Status: Muted 🔇" : "Audio Status: Sound On 🔊"}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ScratchCard;
