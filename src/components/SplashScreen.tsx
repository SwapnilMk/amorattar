'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { dancingScript } from '@/styles/fonts';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show splash for 2.5 seconds then complete
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className='fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-amber-50 via-amber-100 to-amber-50'
        >
          <div className='flex flex-col items-center space-y-8'>
            {/* Logo with scale and bounce animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                duration: 0.8
              }}
            >
              <Image
                src='/logo/amorattar.jpg'
                alt='Amorattar'
                width={140}
                height={140}
                className='rounded-full shadow-2xl'
                priority
              />
            </motion.div>

            {/* Brand name with fade-in and slide-up animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: 'easeOut'
              }}
              className={`${dancingScript.className} text-center text-6xl font-bold text-amber-900`}
            >
              Amorattar
            </motion.div>

            {/* Tagline with fade-in animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: 'easeOut'
              }}
              className='max-w-md text-center text-lg font-medium leading-relaxed text-amber-700'
            >
              Premium Attar & Perfume Shop
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
