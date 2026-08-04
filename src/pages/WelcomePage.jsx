import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeartButton from '../components/HeartButton';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleHeartClick = () => {
    navigate('/passcode');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between p-6 z-10 text-center overflow-hidden">
      {/* Top Welcome Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="mt-12 flex flex-col items-center"
      >
        <span className="text-xs md:text-sm font-serif tracking-[0.3em] uppercase text-rose-light border-b border-rose-glow/30 pb-1 mb-3">
          A Private Surprise For You
        </span>
        <h1 className="text-4xl md:text-6xl font-serif font-extrabold text-gold-shimmer drop-shadow-[0_4px_25px_rgba(255,215,0,0.4)]">
          Minnalu ❤️
        </h1>
        <p className="text-sm md:text-base text-gray-300 mt-2 font-sans max-w-sm">
          A luxury cinematic story created with infinite love...
        </p>
      </motion.div>

      {/* Center Pulsing Heart Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="my-auto"
      >
        <HeartButton onClick={handleHeartClick} label="Tap My Heart ❤️" />
      </motion.div>

      {/* Bottom Subtext */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mb-8 text-xs font-serif text-rose-light/80 tracking-widest"
      >
        USE HEADPHONES FOR THE BEST EXPERIENTIAL MUSIC ✨
      </motion.div>
    </div>
  );
};

export default WelcomePage;
