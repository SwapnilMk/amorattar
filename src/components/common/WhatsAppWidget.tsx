'use client';

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppWidget = () => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const phoneNumber = '918268435091';
  const message = "Hi Amor Perfumes! I'm browsing your website and have a question.";

  React.useEffect(() => {
    // Show tooltip automatically after 6 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
      
      // Hide it automatically after 8 seconds
      setTimeout(() => {
        setShowTooltip(false);
      }, 8000);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);
  
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="mb-4 rounded-2xl bg-white px-4 py-3 shadow-2xl ring-1 ring-black/5"
          >
            <p className="text-sm font-medium text-gray-800">Need help? Chat with us! 👋</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={handleClick}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all hover:bg-[#20ba5a]"
      >
        <div className="relative">
          <FaWhatsapp size={24} />
          <span className="absolute -right-1 -top-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-white"></span>
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default WhatsAppWidget;
