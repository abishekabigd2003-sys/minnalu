import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TypewriterText from '../components/TypewriterText';
import { TAMIL_LYRICS } from '../utils/memoriesData';

const IntroLyricsPage = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/gallery');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex flex-col items-center justify-center p-6 z-10"
    >
      <TypewriterText lines={TAMIL_LYRICS} onComplete={handleComplete} />
    </motion.div>
  );
};

export default IntroLyricsPage;
