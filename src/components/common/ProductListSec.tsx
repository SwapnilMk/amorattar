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
import ProductSkeleton from './ProductSkeleton';
import { Product } from '@/types/product.types';
import Link from 'next/link';

type ProductListSecProps = {
  title: string;
  category?: string;
  viewAllLink?: string;
  products?: Product[];
  loading?: boolean;
};

const ProductListSec = ({
  title,
  category,
  viewAllLink,
  products: customProducts,
  loading: customLoading
}: ProductListSecProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(
    customLoading !== undefined ? customLoading : !customProducts
  );

  useEffect(() => {
    if (customLoading !== undefined) {
      setLoading(customLoading);
    }
  }, [customLoading]);

  useEffect(() => {
    // If custom products are provided, use them instead of fetching
    if (customProducts && customProducts.length > 0) {
      setProducts(customProducts);
      if (customLoading === undefined) setLoading(false);
      return;
    }

    if (customProducts && customProducts.length === 0 && customLoading === undefined) {
      // If custom products is empty but customLoading is not provided, 
      // it might still be loading or just empty. 
      // In the Home page, they start as [].
    }

    const fetchProducts = async () => {
      if (customProducts && customProducts.length > 0) return;
      
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
        if (customLoading === undefined) setLoading(false);
      }
    };

    fetchProducts();
  }, [category, customProducts, customLoading]);

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
          <CarouselContent className='mx-4 items-stretch space-x-4 sm:space-x-5 xl:mx-0'>
            {loading
              ? // Show 4 skeleton items while loading
                Array.from({ length: 4 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className='w-full max-w-[198px] pl-0 sm:max-w-[295px] h-full'
                  >
                    <ProductSkeleton />
                  </CarouselItem>
                ))
              : products.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className='w-full max-w-[198px] pl-0 sm:max-w-[295px] h-full'
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
