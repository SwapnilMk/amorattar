'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Product } from '@/types/product.types';
import ProductListSec from '@/components/common/ProductListSec';
import BreadcrumbShop from '@/components/shop-page/BreadcrumbShop';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import MobileFilters from '@/components/shop-page/filters/MobileFilters';
import Filters from '@/components/shop-page/filters';
import {
  useFilters,
  FiltersProvider
} from '@/components/shop-page/filters/FiltersContext';
import { FiSliders } from 'react-icons/fi';
import ProductCard from '@/components/common/ProductCard';
import { useSearchParams } from 'next/navigation';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

function ShopContent() {
  const searchParams = useSearchParams();
  const recentParam = searchParams.get('recent');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('most-popular');
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const { category, style, minPrice, maxPrice, sizeMl, colorLabel } =
    useFilters();

  const fetchProducts = useCallback(
    async (isInitial = false) => {
      try {
        if (isInitial) {
          setInitialLoading(true);
          setLoading(false);
        } else {
          setLoading(true);
        }

        // Build query parameters
        const params = new URLSearchParams({
          limit: '12',
          sort: sortBy
        });

        // Add cursor for infinite scroll (except for initial load)
        if (!isInitial && nextCursor) {
          params.append('cursor', nextCursor);
        }

        // Add recent parameter if it exists
        if (recentParam === 'true') {
          params.append('recent', 'true');
        }

        if (category) params.append('category', category);
        if (style) params.append('style', style);
        if (minPrice !== null) params.append('minPrice', String(minPrice));
        if (maxPrice !== null) params.append('maxPrice', String(maxPrice));
        if (sizeMl !== null) params.append('sizeMl', String(sizeMl));
        if (colorLabel) params.append('color', colorLabel);

        const response = await fetch(`/api/products?${params.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          cache: 'no-store'
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Server returned non-JSON response');
        }

        const data = await response.json();

        if (isInitial) {
          setProducts(data.products);
          setInitialLoading(false);
        } else {
          setProducts((prev) => [...prev, ...data.products]);
          setLoading(false);
        }

        setHasMore(data.hasMore);
        setNextCursor(data.nextCursor);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Failed to fetch products'
        );
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [
      sortBy,
      recentParam,
      nextCursor,
      category,
      style,
      minPrice,
      maxPrice,
      sizeMl,
      colorLabel
    ]
  );

  // Initial load
  useEffect(() => {
    setProducts([]);
    setNextCursor(null);
    setHasMore(true);
    fetchProducts(true);
  }, [
    sortBy,
    recentParam,
    category,
    style,
    minPrice,
    maxPrice,
    sizeMl,
    colorLabel
  ]);

  // Load more products for infinite scroll
  const loadMore = useCallback(() => {
    if (!loading && hasMore && nextCursor) {
      fetchProducts(false);
    }
  }, [loading, hasMore, nextCursor, fetchProducts]);

  // Initialize infinite scroll hook
  const { lastElementRef } = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore,
    loading
  });

  if (initialLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p className='text-red-500'>{error}</p>
      </div>
    );
  }

  return (
    <main className='pb-20'>
      <div className='mx-auto max-w-frame px-4 xl:px-0'>
        <hr className='mb-5 h-[1px] border-t-black/10 sm:mb-6' />
        <BreadcrumbShop
          title={recentParam === 'true' ? 'Recent Products' : 'Shop'}
        />
        <div className='flex items-start md:space-x-5'>
          <div className='hidden min-w-[295px] max-w-[295px] md:block'>
            <div className='top-4 space-y-5 rounded-[20px] border border-black/10 bg-white px-5 py-5 shadow-sm md:space-y-6 md:px-6'>
              <div className='flex items-center justify-between'>
                <span className='text-xl font-bold text-black'>Filters</span>
                <FiSliders className='text-2xl text-black/40' />
              </div>
              <Filters
                onApply={() => {
                  // Reset list for new filters
                  setProducts([]);
                  setNextCursor(null);
                  setHasMore(true);
                  fetchProducts(true);
                }}
              />
            </div>
          </div>
          <div className='flex w-full flex-col space-y-5'>
            <div className='top-0 border-b border-gray-100 bg-white/95 pb-4 pt-2 backdrop-blur-sm'>
              <div className='flex flex-col lg:flex-row lg:justify-between'>
                <div className='flex items-center justify-between'>
                  <h1 className='text-2xl font-bold md:text-[32px]'>
                    {recentParam === 'true'
                      ? 'Recent Products'
                      : 'All Products'}
                  </h1>
                  <MobileFilters />
                </div>
                <div className='flex flex-col sm:flex-row sm:items-center'>
                  <span className='mr-3 text-sm text-black/60 md:text-base'>
                    Showing {products.length} Products
                  </span>
                  <div className='flex items-center'>
                    Sort by:{' '}
                    <Select
                      value={sortBy}
                      onValueChange={(value) => setSortBy(value)}
                    >
                      <SelectTrigger className='w-fit border-none bg-transparent px-1.5 text-sm font-medium text-black shadow-none sm:text-base'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='most-popular'>
                          Most Popular
                        </SelectItem>
                        <SelectItem value='low-price'>Low Price</SelectItem>
                        <SelectItem value='high-price'>High Price</SelectItem>
                        <SelectItem value='recent'>Recently Added</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <div className='grid w-full grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-5'>
              {products.map((product, index) => (
                <div key={product.id}>
                  {index === products.length - 1 ? (
                    <div ref={lastElementRef}>
                      <ProductCard data={product} />
                    </div>
                  ) : (
                    <ProductCard data={product} />
                  )}
                </div>
              ))}
            </div>

            {/* Loading indicator for infinite scroll */}
            {loading && (
              <div className='flex justify-center py-8'>
                <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent'></div>
              </div>
            )}

            {/* End of products indicator */}
            {!hasMore && products.length > 0 && (
              <div className='py-4 text-center text-gray-500'>
                <p>You've reached the end of all products</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ShopPage() {
  return (
    <FiltersProvider>
      <ShopContent />
    </FiltersProvider>
  );
}
