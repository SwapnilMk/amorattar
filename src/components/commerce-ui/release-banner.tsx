'use client';

import React from 'react';
import * as motion from 'framer-motion/client';
import Link from 'next/link';

function ReleaseBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-[#273F4F] to-[#273F4F]/90 p-8 text-white shadow-xl'
    >
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className='absolute -left-16 -top-16 h-32 w-32 rounded-full bg-[#F9CB43]'
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className='absolute right-10 top-5 h-12 w-12 rounded-full bg-[#F9CB43]'
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5
          }}
          className='absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-[#F9CB43]'
        />
      </div>

      <div className='relative z-10 flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='mb-2 inline-block rounded-full bg-[#F9CB43]/20 px-3 py-1 text-sm font-semibold tracking-wider backdrop-blur-sm'
          >
            NEW ARRIVALS
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl'
          >
            Exotic <span className='text-[#F9CB43]'>Attars</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className='mt-3 max-w-2xl text-sm text-white/80 md:text-base'
          >
            Discover our latest collection of handcrafted attars and perfumes,
            featuring rare oud blends and floral essences. Limited edition
            fragrances that tell your unique story.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Link href='/shop?category=attars'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='group relative overflow-hidden rounded-full bg-[#F9CB43] px-8 py-3 font-medium text-[#273F4F] shadow-md transition-all hover:shadow-lg'
            >
              <motion.span
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.3 }}
                className='absolute inset-0 h-full w-1/2 bg-gradient-to-r from-white/20 via-transparent to-transparent'
              />
              Explore Attars
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                className='ml-2 inline-block'
              >
                →
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ReleaseBanner;
