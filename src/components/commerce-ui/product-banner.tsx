'use client';

import React from 'react';
import * as motion from 'framer-motion/client';
import Link from 'next/link';

function ProductBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='relative flex flex-col overflow-hidden rounded-xl bg-gradient-to-br from-[#273F4F] to-[#273F4F]/90 p-6 text-white shadow-xl md:flex-row md:items-center md:justify-between'
    >
      {/* Pattern overlay */}
      <div className='absolute inset-0 opacity-10'>
        <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
          <defs>
            <pattern
              id='grid'
              width='20'
              height='20'
              patternUnits='userSpaceOnUse'
            >
              <path
                d='M 20 0 L 0 0 0 20'
                fill='none'
                stroke='white'
                strokeWidth='1'
              />
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#grid)' />
        </svg>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='z-10 space-y-3 md:w-3/5'
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='inline-block rounded-lg bg-[#F9CB43] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#273F4F]'
        >
          Featured Collection
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className='text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl'
        >
          Royal <span className='text-[#F9CB43]'>Oud</span> Collection
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className='max-w-xl text-sm text-gray-300 md:text-base'
        >
          Experience the essence of luxury with our premium oud collection. Each
          fragrance is carefully crafted using rare oud wood and exotic spices,
          creating an unforgettable sensory journey.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className='flex flex-wrap gap-3 pt-2'
        >
          <Link href='/shop#oud-collection'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='rounded-md bg-[#F9CB43] px-6 py-2 font-medium text-[#273F4F] transition-all hover:bg-[#F9CB43]/90'
            >
              Explore Collection
            </motion.button>
          </Link>
          <Link href='/shop#oud-collection'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='rounded-md border border-white/30 bg-transparent px-6 py-2 font-medium transition-all hover:bg-white/10'
            >
              View Details
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className='relative z-10 mt-6 h-60 w-full md:mt-0 md:h-80 md:w-2/5'
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className='absolute -right-4 -top-4 h-60 w-60 rounded-full bg-[#F9CB43]/30 blur-xl'
        ></motion.div>
        <div className='relative h-full w-full'>
          <img
            src='/images/productBanner/product.jpg'
            alt='Royal Oud Collection'
            className='drop-shadow-2xl'
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProductBanner;
