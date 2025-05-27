'use client';

import React, { useEffect, useState } from 'react';
import * as motion from 'framer-motion/client';
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import ProductCard from './ProductCard';
import { Product } from '@/types/product.types';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

type ProductListSecProps = {
  title: string;
  category?: string;
  viewAllLink?: string;
};

const ProductSkeleton = () => (
  <div className='flex aspect-auto flex-col items-start rounded-lg border border-gray-100 p-4'>
    <div className='mb-2.5 aspect-square w-full overflow-hidden rounded-[13px] bg-[#F0EEED] lg:max-w-[295px] lg:rounded-[20px] xl:mb-4'>
      <Skeleton className='h-full w-full' />
    </div>
    <Skeleton className='mb-1 h-4 w-20' />
    <Skeleton className='mb-2 h-6 w-3/4' />
    <Skeleton className='mb-2 h-4 w-24' />
    <Skeleton className='mb-2 h-6 w-32' />
    <div className='mt-auto flex w-full space-x-2'>
      <Skeleton className='h-10 flex-1 rounded-full' />
      <Skeleton className='h-10 w-10 rounded-full' />
    </div>
  </div>
);

const ProductListSec = ({
  title,
  category,
  viewAllLink
}: ProductListSecProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = category
          ? `/api/products?category=${category}`
          : '/api/products';
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <section className='mx-auto max-w-frame text-center'>
      <motion.h2
        initial={{ y: '100px', opacity: 0 }}
        whileInView={{ y: '0', opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={cn([
          integralCF.className,
          'mb-8 text-[32px] capitalize md:mb-14 md:text-5xl'
        ])}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ y: '100px', opacity: 0 }}
        whileInView={{ y: '0', opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Carousel
          opts={{
            align: 'start'
          }}
          className='mb-6 w-full md:mb-9'
        >
          <CarouselContent className='mx-4 space-x-4 sm:space-x-5 xl:mx-0'>
            {loading
              ? // Show 4 skeleton items while loading
                Array.from({ length: 4 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className='w-full max-w-[198px] pl-0 sm:max-w-[295px]'
                  >
                    <ProductSkeleton />
                  </CarouselItem>
                ))
              : products.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className='w-full max-w-[198px] pl-0 sm:max-w-[295px]'
                  >
                    <ProductCard data={product} />
                  </CarouselItem>
                ))}
          </CarouselContent>
        </Carousel>
        {viewAllLink && (
          <div className='w-full px-4 text-center sm:px-0'>
            <Link
              href={viewAllLink}
              className='group relative inline-block w-full overflow-hidden rounded-full border border-black/10 px-[54px] py-4 text-sm font-medium text-black transition-all hover:bg-[#F9CB43] sm:w-[218px] sm:text-base'
            >
              <span className='relative z-10'>View All</span>
              <div className='absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0'></div>
            </Link>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default ProductListSec;
