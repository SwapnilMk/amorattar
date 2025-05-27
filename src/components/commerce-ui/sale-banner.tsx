import React from 'react';
import * as motion from 'framer-motion/client';

function SaleBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='relative overflow-hidden rounded-lg bg-gradient-to-r from-[#273F4F] to-[#273F4F]/90'
    >
      {/* Attar-themed background patterns */}
      <div className='absolute inset-0'>
        <svg
          className='absolute left-0 top-0 h-full w-full'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
        >
          <circle cx='80%' cy='60%' r='100' fill='#F9CB43' fillOpacity='0.1' />
          <circle cx='50%' cy='20%' r='40' fill='#F9CB43' fillOpacity='0.1' />
          <path
            d='M0 20 L40 0 L40 40 Z'
            fill='#F9CB43'
            fillOpacity='0.1'
            transform='translate(20, 40)'
          />
          <path
            d='M0 20 L40 0 L40 40 Z'
            fill='#F9CB43'
            fillOpacity='0.1'
            transform='translate(460, 140) rotate(180)'
          />
        </svg>
      </div>

      <div className='relative z-10 px-6 py-8 md:px-10'>
        <div className='mx-auto max-w-4xl'>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='mb-2 flex items-center justify-center'
          >
            <div className='rounded-full bg-[#F9CB43] bg-opacity-20 px-4 py-1 text-sm font-medium uppercase tracking-wider text-white backdrop-blur-sm'>
              Limited Time Offer
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='mb-3 text-center text-3xl font-extrabold uppercase tracking-wide text-white md:text-4xl lg:text-5xl'
          >
            Premium Attar Collection
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='mb-4 flex justify-center'
          >
            <div className='relative'>
              <div className='text-center text-5xl font-bold text-[#F9CB43] md:text-6xl'>
                25% OFF
              </div>
              <div className='absolute -right-6 -top-1 rotate-12 rounded-md border-2 border-[#F9CB43] bg-[#F9CB43] bg-opacity-20 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm'>
                EXCLUSIVE
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className='mb-6 text-center text-lg text-white text-opacity-90'
          >
            Discover our exquisite collection of traditional attars and modern
            perfumes. Each fragrance tells a unique story of ancient traditions
            and contemporary elegance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className='flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0'
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='rounded-md bg-[#F9CB43] px-6 py-3 font-medium text-[#273F4F] transition-all hover:bg-[#F9CB43]/90'
            >
              Shop Attar Collection
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='rounded-md border border-white border-opacity-40 bg-transparent px-6 py-3 font-medium text-white transition-all hover:bg-white hover:bg-opacity-10'
            >
              View All Fragrances
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className='mt-4 text-center text-sm text-white text-opacity-80'
          >
            * Offer valid until August 31st. Cannot be combined with other
            promotions.
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default SaleBanner;
