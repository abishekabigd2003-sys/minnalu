import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PasscodeKeypad from '../components/PasscodeKeypad';

const PasscodePage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/intro');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen flex flex-col items-center justify-center p-6 z-10"
    >
      <PasscodeKeypad onSuccess={handleSuccess} />
    </motion.div>
  );
};

export default PasscodePage;
