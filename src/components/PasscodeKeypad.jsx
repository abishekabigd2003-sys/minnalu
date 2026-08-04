import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playKeypressSound, playErrorSound, playUnlockSuccessSound } from '../utils/audioEngine';
import { FaLock, FaUnlock, FaBackspace } from 'react-icons/fa';
import confetti from 'canvas-confetti';

const PasscodeKeypad = ({ onSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const CORRECT_PIN = '2026';

  const handleKeyPress = (num) => {
    if (unlocked || pin.length >= 4) return;
    playKeypressSound();
    const newPin = pin + num;
    setPin(newPin);
    setError(false);

    if (newPin.length === 4) {
      if (newPin === CORRECT_PIN) {
        handleSuccess();
      } else {
        handleFailure();
      }
    }
  };

  const handleDelete = () => {
    if (pin.length > 0 && !unlocked) {
      playKeypressSound();
      setPin(pin.slice(0, -1));
      setError(false);
    }
  };

  const handleClear = () => {
    if (!unlocked) {
      playKeypressSound();
      setPin('');
      setError(false);
    }
  };

  const handleFailure = () => {
    playErrorSound();
    setError(true);
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
    setTimeout(() => {
      setPin('');
      setError(false);
    }, 1000);
  };

  const handleSuccess = () => {
    setUnlocked(true);
    playUnlockSuccessSound();

    // Trigger Heart & Golden Burst Confetti
    try {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#ff2e63', '#e6194b', '#ffffff'],
        shapes: ['circle']
      });
    } catch (e) {
      // silent
    }

    setTimeout(() => {
      if (onSuccess) onSuccess();
    }, 1800);
  };

  const shakeVariants = {
    idle: { x: 0 },
    shake: {
      x: [-15, 15, -12, 12, -8, 8, 0],
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center">
      {/* Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-col items-center"
      >
        <div className={`p-4 rounded-full glass-card mb-3 border ${unlocked ? 'border-gold text-gold shadow-[0_0_30px_#ffd700]' : 'border-rose-glow/40 text-rose-glow'}`}>
          {unlocked ? <FaUnlock className="w-8 h-8 animate-bounce" /> : <FaLock className="w-8 h-8" />}
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-gold-shimmer">
          Enter the Secret Code
        </h2>
        <p className="text-xs md:text-sm text-gray-300 mt-1">Hint: Our Special Year ✨</p>
      </motion.div>

      {/* PIN Indicator Dots Container */}
      <motion.div
        variants={shakeVariants}
        animate={error ? 'shake' : 'idle'}
        className={`flex items-center justify-center space-x-4 my-6 p-4 rounded-2xl glass-card w-full ${
          error ? 'border-rose-red bg-rose-900/30 shadow-[0_0_25px_rgba(230,25,75,0.7)]' : ''
        } ${unlocked ? 'border-gold bg-gold/10 shadow-[0_0_30px_rgba(255,215,0,0.5)]' : ''}`}
      >
        {[0, 1, 2, 3].map((idx) => {
          const isFilled = pin.length > idx;
          return (
            <motion.div
              key={idx}
              initial={false}
              animate={{
                scale: isFilled ? 1.2 : 1,
                backgroundColor: isFilled ? (unlocked ? '#ffd700' : '#ff2e63') : 'rgba(255,255,255,0.15)',
                boxShadow: isFilled
                  ? unlocked
                    ? '0 0 15px #ffd700'
                    : '0 0 12px #ff2e63'
                  : 'none'
              }}
              className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-gold/30 transition-all duration-200"
            />
          );
        })}
      </motion.div>

      {/* Error / Success Feedback */}
      <div className="h-6 mb-4">
        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-rose-glow font-semibold text-sm text-center"
            >
              Wrong Code! Try Again ❤️
            </motion.p>
          )}
          {unlocked && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-gold font-bold text-base text-center tracking-wider"
            >
              Unlocked My Heart! Unveiling Surprise... ✨
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Numeric Mobile Keypad Grid */}
      <div className="grid grid-cols-3 gap-4 w-full px-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <motion.button
            key={num}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleKeyPress(num.toString())}
            disabled={unlocked}
            className="h-16 rounded-2xl glass-card flex items-center justify-center text-2xl font-serif font-bold text-white border border-rose-glow/20 hover:border-gold/50 active:bg-rose-ruby/40 transition-all shadow-lg"
          >
            {num}
          </motion.button>
        ))}

        {/* Clear Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClear}
          disabled={unlocked}
          className="h-16 rounded-2xl glass-card flex items-center justify-center text-xs font-serif font-semibold text-rose-light border border-rose-glow/20 hover:border-rose-glow/50"
        >
          C
        </motion.button>

        {/* Zero Key */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => handleKeyPress('0')}
          disabled={unlocked}
          className="h-16 rounded-2xl glass-card flex items-center justify-center text-2xl font-serif font-bold text-white border border-rose-glow/20 hover:border-gold/50 active:bg-rose-ruby/40"
        >
          0
        </motion.button>

        {/* Delete Key */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDelete}
          disabled={unlocked}
          className="h-16 rounded-2xl glass-card flex items-center justify-center text-rose-glow border border-rose-glow/20 hover:border-rose-glow/50"
        >
          <FaBackspace className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
};

export default PasscodeKeypad;
