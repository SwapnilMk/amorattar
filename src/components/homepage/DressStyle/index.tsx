// src/components/layout/FragranceStyle.tsx
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import React from 'react';
import * as motion from 'framer-motion/client';
import DressStyleCard from './DressStyleCard';

const FragranceStyle = () => {
  return (
    <div className='px-4 xl:px-0'>
      <section className='mx-auto max-w-frame rounded-[40px] bg-[#F0F0F0] px-6 pb-6 pt-10 text-center md:p-[70px]'>
        <motion.h2
          initial={{ y: '100px', opacity: 0 }}
          whileInView={{ y: '0', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn([
            integralCF.className,
            'mb-8 text-[32px] capitalize leading-[36px] md:mb-14 md:text-5xl'
          ])}
        >
          Browse by Fragrance Style
        </motion.h2>
        <motion.div
          initial={{ y: '100px', opacity: 0 }}
          whileInView={{ y: '0', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className='mb-4 flex flex-col space-y-4 sm:mb-5 sm:flex-row sm:space-x-5 sm:space-y-0 md:h-[289px]'
        >
          <DressStyleCard
            title='Floral'
            url='/shop#floral'
            className="h-[190px] bg-[url('/images/fragrance-style-floral.png')] md:max-w-[260px] lg:max-w-[360px] xl:max-w-[407px]"
          />
          <DressStyleCard
            title='Woody'
            url='/shop#woody'
            className="h-[190px] bg-[url('/images/fragrance-style-woody.png')] md:max-w-[684px]"
          />
        </motion.div>
        <motion.div
          initial={{ y: '100px', opacity: 0 }}
          whileInView={{ y: '0', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
          className='flex flex-col space-y-5 sm:flex-row sm:space-x-5 sm:space-y-0 md:h-[289px]'
        >
          <DressStyleCard
            title='Citrus'
            url='/shop#citrus'
            className="h-[190px] bg-[url('/images/fragrance-style-citrus.png')] md:max-w-[684px]"
          />
          <DressStyleCard
            title='Oriental'
            url='/shop#oriental'
            className="h-[190px] bg-[url('/images/fragrance-style-oriental.png')] md:max-w-[260px] lg:max-w-[360px] xl:max-w-[407px]"
          />
        </motion.div>
      </section>
    </div>
  );
};

export default FragranceStyle;
