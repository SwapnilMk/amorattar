// src/components/layout/header/Header.tsx
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import * as motion from 'framer-motion/client';

const Header = () => {
  return (
    <header className='overflow-hidden bg-[#F2F0F1] pt-10 md:pt-24'>
      <div className='mx-auto grid grid-cols-1 md:max-w-frame md:grid-cols-2 lg:grid-cols-2'>
        <section className='max-w-frame px-4'>
          <motion.h2
            initial={{ y: '100px', opacity: 0, rotate: 10 }}
            whileInView={{ y: '0', opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn([
              integralCF.className,
              'mb-5 text-4xl lg:mb-8 lg:text-[64px] lg:leading-[64px]'
            ])}
          >
            DISCOVER SCENTS THAT DEFINE YOUR ESSENCE
          </motion.h2>
          <motion.p
            initial={{ y: '100px', opacity: 0 }}
            whileInView={{ y: '0', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className='mb-6 max-w-[545px] text-sm text-black/60 lg:mb-8 lg:text-base'
          >
            Explore our exquisite range of attars and perfumes, handcrafted to
            capture your unique spirit and elevate every moment with timeless
            fragrance.
          </motion.p>
          <motion.div
            initial={{ y: '100px', opacity: 0 }}
            whileInView={{ y: '0', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Link
              href='/shop'
              className='mb-5 inline-block w-full rounded-full bg-black px-14 py-4 text-center text-white transition-all hover:animate-pulse hover:bg-black/80 md:mb-12 md:w-52'
            >
              Shop Now
            </Link>
          </motion.div>
          <motion.div
            initial={{ y: '100px', opacity: 0 }}
            whileInView={{ y: '0', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className='flex flex-wrap items-center justify-center sm:flex-nowrap md:mb-[116px] md:h-full md:max-h-11 md:justify-start md:space-x-3 lg:max-h-[52px] lg:space-x-6 xl:max-h-[68px] xl:space-x-8'
          >
            <div className='flex flex-col'>
              <span className='text-2xl font-bold md:text-xl lg:text-3xl xl:mb-2 xl:text-[40px]'>
                <AnimatedCounter from={0} to={50} />+
              </span>
              <span className='text-nowrap text-xs text-black/60 xl:text-base'>
                Premium Fragrances
              </span>
            </div>
            <Separator
              className='ml-6 h-12 bg-black/10 md:ml-0 md:h-full'
              orientation='vertical'
            />
            <div className='ml-6 flex flex-col md:ml-0'>
              <span className='text-2xl font-bold md:text-xl lg:text-3xl xl:mb-2 xl:text-[40px]'>
                <AnimatedCounter from={0} to={1000} />+
              </span>
              <span className='text-nowrap text-xs text-black/60 xl:text-base'>
                Scent Variations
              </span>
            </div>
            <Separator
              className='ml-6 hidden bg-black/10 sm:block sm:h-12 md:ml-0 md:h-full'
              orientation='vertical'
            />
            <div className='mt-3 flex w-full flex-col text-center sm:ml-6 sm:mt-0 sm:w-auto sm:text-left md:ml-0'>
              <span className='text-2xl font-bold md:text-xl lg:text-3xl xl:mb-2 xl:text-[40px]'>
                <AnimatedCounter from={0} to={5000} />+
              </span>
              <span className='text-nowrap text-xs text-black/60 xl:text-base'>
                Happy Customers
              </span>
            </div>
          </motion.div>
        </section>
        <motion.section
          initial={{ y: '100px', opacity: 0, rotate: 10 }}
          whileInView={{ y: '0', opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2.3, duration: 0.8 }}
          className="relative min-h-[448px] bg-[url('/images/header-res-attars.png')] bg-cover bg-top bg-no-repeat md:min-h-[428px] md:bg-[url('/images/header-attars.png')] md:px-4 xl:bg-[center_top_-1.6rem]"
        >
          <Image
            priority
            src='/icons/big-star.svg'
            height={104}
            width={104}
            alt='big star'
            className='lg:max-h-max-w-24 absolute right-7 top-12 max-h-[76px] max-w-[76px] animate-[spin_4s_infinite] lg:max-w-24 xl:right-0 xl:max-h-[104px] xl:max-w-[104px]'
          />
          <Image
            priority
            src='/icons/small-star.svg'
            height={56}
            width={56}
            alt='small star'
            className='absolute left-7 top-36 max-h-11 max-w-11 animate-[spin_3s_infinite] sm:top-64 md:left-0 md:top-44 md:max-h-14 md:max-w-14 lg:top-56'
          />
        </motion.section>
      </div>
    </header>
  );
};

export default Header;
