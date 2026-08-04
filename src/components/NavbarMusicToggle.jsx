import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMusic, FaVolumeXmark, FaVolumeHigh } from 'react-icons/fa6';
import { toggleGlobalAudio, subscribeAudioState } from '../utils/audioManager';

const NavbarMusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeAudioState((state) => {
      setIsPlaying(state.isPlaying);
    });
    return () => unsubscribe();
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleGlobalAudio}
      className={`fixed top-4 right-4 z-40 px-3.5 py-2.5 rounded-full glass-modal border flex items-center space-x-2 transition-all shadow-xl ${
        isPlaying ? 'border-gold text-gold shadow-[0_0_20px_#ffd700]' : 'border-rose-glow/30 text-rose-light'
      }`}
      aria-label="Toggle Audio"
    >
      <FaMusic className={`w-4 h-4 ${isPlaying ? 'animate-bounce text-gold' : ''}`} />
      <span className="text-xs font-serif font-semibold hidden md:inline">
        {isPlaying ? "MUSIC PLAYING 🎵" : "MUSIC PAUSED 🎵"}
      </span>
      {isPlaying ? <FaVolumeHigh className="w-3.5 h-3.5" /> : <FaVolumeXmark className="w-3.5 h-3.5" />}
    </motion.button>
  );
};

export default NavbarMusicToggle;
