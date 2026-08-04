import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { playHeartbeatSound } from '../utils/audioEngine';

const HeartButton = ({ onClick, label = "Tap My Heart ❤️", className = "" }) => {
  const handleClick = (e) => {
    playHeartbeatSound();
    if (onClick) onClick(e);
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: [1, 1.08, 1, 1.15, 1],
          boxShadow: [
            "0 0 20px rgba(255, 46, 99, 0.4), inset 0 0 10px rgba(255, 46, 99, 0.2)",
            "0 0 45px rgba(255, 46, 99, 0.9), inset 0 0 25px rgba(255, 215, 0, 0.6)",
            "0 0 20px rgba(255, 46, 99, 0.4), inset 0 0 10px rgba(255, 46, 99, 0.2)"
          ]
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative group p-7 rounded-full bg-gradient-to-br from-rose-crimson via-rose-ruby to-rose-dark border-2 border-gold/40 cursor-pointer shadow-2xl overflow-hidden backdrop-blur-md"
        aria-label={label}
      >
        {/* Glowing Background Pulse Ring */}
        <div className="absolute inset-0 rounded-full bg-rose-glow/20 blur-md group-hover:bg-rose-glow/40 transition-all duration-300" />
        
        {/* Heart Icon */}
        <div className="relative z-10 text-rose-glow drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">
          <FaHeart className="w-14 h-14 md:w-16 md:h-16 text-rose-glow group-hover:text-gold transition-colors duration-300" />
        </div>
      </motion.button>

      {/* Label Text */}
      {label && (
        <motion.span
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-6 text-xl md:text-2xl font-serif font-bold text-gold-shimmer tracking-wider drop-shadow-md"
        >
          {label}
        </motion.span>
      )}
    </div>
  );
};

export default HeartButton;
