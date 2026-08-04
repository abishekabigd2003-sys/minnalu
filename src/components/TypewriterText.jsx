import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playKeypressSound } from '../utils/audioEngine';

const TypewriterText = ({ lines, onComplete, speed = 110, delayBetween = 1800 }) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      if (onComplete) onComplete();
      return;
    }

    const currentFullText = lines[lineIndex];
    let charIndex = 0;
    setDisplayedText('');
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      if (charIndex < currentFullText.length) {
        setDisplayedText(currentFullText.slice(0, charIndex + 1));
        playKeypressSound();
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);

        // Pause before advancing to next line
        setTimeout(() => {
          setLineIndex((prev) => prev + 1);
        }, delayBetween);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [lineIndex, lines, speed, delayBetween, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[220px] px-6 text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={lineIndex}
          initial={{ opacity: 0, y: 15, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.96 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative glass-modal p-8 md:p-12 rounded-3xl max-w-xl border border-gold/30 shadow-[0_0_40px_rgba(255,46,99,0.3)]"
        >
          <p className="text-2xl md:text-4xl font-tamil font-bold text-gold-shimmer leading-relaxed tracking-wide drop-shadow-[0_2px_15px_rgba(255,215,0,0.4)]">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-1 h-7 md:h-9 bg-rose-glow ml-1.5 animate-pulse rounded" />
            )}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Skip Button Option */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        whileHover={{ opacity: 1, scale: 1.05 }}
        onClick={() => onComplete && onComplete()}
        className="mt-8 text-xs font-serif tracking-widest text-rose-light border-b border-rose-light/40 hover:border-rose-light pb-0.5"
      >
        SKIP TO GALLERY ✨
      </motion.button>
    </div>
  );
};

export default TypewriterText;
