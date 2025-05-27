'use client';

import React, { useEffect, useState } from 'react';
import * as motion from 'framer-motion/client';
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from '@/components/ui/carousel';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { useIsClient, useMediaQuery } from 'usehooks-ts';
import ReviewCard from '@/components/common/ReviewCard';
import { Review } from '@/types/review.types';
import { toast } from 'sonner';

const Reviews = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isClient = useIsClient();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        toast.error('Failed to fetch reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (!isClient || loading) return null;
  if (reviews.length === 0) return null;

  return (
    <section className='overflow-hidden'>
      <motion.div
        initial={{ x: '100px', opacity: 0 }}
        whileInView={{ x: '0', opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: 'center',
            loop: true
          }}
          className='relative mb-6 w-full md:mb-9'
        >
          <div className='relative mx-auto mb-6 flex max-w-frame items-end px-4 sm:items-center md:mb-10 xl:px-0'>
            <motion.h2
              initial={{ y: '100px', opacity: 0 }}
              whileInView={{ y: '0', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className={cn([
                integralCF.className,
                'mr-auto text-[32px] capitalize leading-[36px] md:text-5xl'
              ])}
            >
              OUR HAPPY CUSTOMERS
            </motion.h2>
            <div className='ml-2 flex items-center space-x-1'>
              <CarouselPrevious variant='ghost' className='text-2xl'>
                <FaArrowLeft />
              </CarouselPrevious>
              <CarouselNext variant='ghost' className='text-2xl'>
                <FaArrowRight />
              </CarouselNext>
            </div>
          </div>
          <CarouselContent>
            {reviews.map((review, index) => (
              <CarouselItem
                key={review.id}
                className='w-full max-w-[358px] pl-5 sm:max-w-[400px]'
              >
                <ReviewCard
                  className='h-full'
                  data={review}
                  isDate={true}
                  blurChild={
                    reviews.length >= 6 && (
                      <div
                        className={cn([
                          isDesktop
                            ? (current + 1 === count
                                ? 0
                                : current + 1 > count
                                  ? 1
                                  : current + 1) === index &&
                              'backdrop-blur-[2px]'
                            : (current === count ? 0 : current) === index &&
                              'backdrop-blur-[2px]',
                          isDesktop
                            ? (current === 1
                                ? count - 2
                                : current === 2
                                  ? count - 1
                                  : current - 3) === index &&
                              'backdrop-blur-[2px]'
                            : (current === 1
                                ? count - 1
                                : current === 2
                                  ? 0
                                  : current - 2) === index &&
                              'backdrop-blur-[2px]',
                          'absolute right-0 top-0 z-10 h-full w-full bg-white/10'
                        ])}
                      />
                    )
                  }
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>
    </section>
  );
};

export default Reviews;
