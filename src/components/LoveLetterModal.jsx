import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEFAULT_LOVE_LETTER as letterData } from '../utils/memoriesData';
import { FaHeart, FaTimes } from 'react-icons/fa';
import { playKeypressSound } from '../utils/audioEngine';

const LoveLetterModal = ({ isOpen, onClose, onReadComplete }) => {
  const [typedLines, setTypedLines] = useState([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setTypedLines([]);
      setCurrentLineIdx(0);
      return;
    }

    if (currentLineIdx < letterData.bodyLines.length) {
      const timer = setTimeout(() => {
        setTypedLines((prev) => [...prev, letterData.bodyLines[currentLineIdx]]);
        playKeypressSound();
        setCurrentLineIdx((prev) => prev + 1);
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentLineIdx]);

  const handleRevealAll = () => {
    setTypedLines(letterData.bodyLines);
    setCurrentLineIdx(letterData.bodyLines.length);
  };

  const isFinishedTyping = typedLines.length === letterData.bodyLines.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/90 backdrop-blur-xl overflow-y-auto">
          {/* Unfolding Envelope & Realistic Luxury Paper Container */}
          <motion.div
            initial={{ scale: 0.2, rotateX: 90, opacity: 0 }}
            animate={{ scale: 1, rotateX: 0, opacity: 1 }}
            exit={{ scale: 0.2, rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-gradient-to-b from-[#fffdfa] via-[#fbf3e6] to-[#f5e6ce] text-dark-900 p-8 md:p-12 rounded-3xl shadow-[0_0_60px_rgba(255,215,0,0.5)] border-4 border-gold my-6"
          >
            {/* Golden Vintage Border Corners */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-gold-dark pointer-events-none" />
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-gold-dark pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-gold-dark pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-gold-dark pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-rose-deep text-gold hover:bg-rose-crimson transition-colors z-20"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            {/* Header: Dried Rose Accent & Salutation */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="flex items-center space-x-2 text-rose-ruby mb-2">
                <span className="text-2xl">🌹</span>
                <FaHeart className="w-6 h-6 animate-pulse" />
                <span className="text-2xl">🌹</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-cursive font-bold text-rose-dark drop-shadow-sm">
                {letterData.salutation}
              </h2>
            </div>

            {/* Body: Animated Handwritten Lines */}
            <div className="space-y-5 font-cursive text-xl md:text-3xl text-dark-900 leading-relaxed min-h-[220px]">
              {typedLines.map((line, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Instant Skip Typing Button */}
            {!isFinishedTyping && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleRevealAll}
                  className="text-xs font-serif tracking-widest text-rose-ruby border-b border-rose-ruby/40 hover:border-rose-ruby pb-0.5"
                >
                  READ ENTIRE LETTER INSTANTLY ✨
                </button>
              </div>
            )}

            {/* Footer: Valediction & Signature */}
            {isFinishedTyping && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-10 pt-6 border-t border-gold/40 flex flex-col items-end text-right"
              >
                <p className="text-xl md:text-3xl font-cursive text-rose-dark leading-relaxed max-w-md">
                  {letterData.valediction}
                </p>
                <p className="text-2xl md:text-4xl font-cursive font-bold text-rose-ruby mt-3">
                  {letterData.signature}
                </p>

                {/* Final Proceed Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (onReadComplete) onReadComplete();
                  }}
                  className="mt-8 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-crimson via-rose-ruby to-rose-glow text-white font-serif font-bold text-base shadow-[0_0_25px_rgba(255,46,99,0.7)] border border-gold tracking-wide flex items-center space-x-2"
                >
                  <span>SEE MY FINAL SURPRISE ❤️</span>
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoveLetterModal;
