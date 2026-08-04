import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { playUnlockSuccessSound } from '../utils/audioEngine';
import { playTrack, pauseTrack } from '../utils/audioManager';
import { FaHeart, FaRotateLeft, FaImages } from 'react-icons/fa6';

const FinalEndingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    playTrack('/audio/hey-minnale.mp3');
    playUnlockSuccessSound();

    // Continuous Grand Confetti Cannons
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 30 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ffd700', '#ff2e63', '#ffffff', '#e6194b']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ffd700', '#ff2e63', '#ffffff', '#e6194b']
      });
    }, 250);

    return () => {
      clearInterval(interval);
      pauseTrack();
    };
  }, []);

  return (
    <div className="relative min-h-screen z-10 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Glowing Pulsing Backdrop Ring */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-96 h-96 bg-rose-glow/20 rounded-full blur-3xl pointer-events-none"
      />

      {/* Main Title: I Love You ❤️ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 flex flex-col items-center"
      >
        <div className="p-6 rounded-full glass-modal mb-6 border-2 border-gold shadow-[0_0_50px_#ffd700]">
          <FaHeart className="w-16 h-16 text-rose-glow animate-bounce" />
        </div>

        <h1 className="text-5xl md:text-8xl font-serif font-black text-gold-shimmer drop-shadow-[0_0_35px_rgba(255,215,0,0.8)] tracking-tight">
          I Love You ❤️
        </h1>

        <p className="text-lg md:text-2xl font-cursive text-rose-light mt-4 max-w-lg">
          You are my today, my tomorrow, and my forever.
        </p>
      </motion.div>

      {/* Replay & Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 z-20"
      >
        <button
          onClick={() => navigate('/gallery')}
          className="px-6 py-3.5 rounded-full glass-card border border-gold/40 text-gold hover:bg-gold hover:text-dark-900 transition-all font-serif text-sm font-semibold flex items-center space-x-2 shadow-lg"
        >
          <FaImages className="w-4 h-4" />
          <span>REVISIT MEMORY VAULT</span>
        </button>

        <button
          onClick={() => navigate('/')}
          className="px-6 py-3.5 rounded-full glass-card border border-rose-glow/40 text-rose-light hover:bg-rose-glow hover:text-white transition-all font-serif text-sm font-semibold flex items-center space-x-2 shadow-lg"
        >
          <FaRotateLeft className="w-4 h-4" />
          <span>REPLAY SURPRISE JOURNEY</span>
        </button>
      </motion.div>
    </div>
  );
};

export default FinalEndingPage;
