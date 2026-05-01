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
import ProductSkeleton from '@/components/common/ProductSkeleton';
import { useSearchParams, useRouter } from 'next/navigation';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const recentParam = searchParams.get('recent');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState(
    searchParams.get('sort') || 'most-popular'
  );
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const {
    category,
    setCategory,
    style,
    minPrice,
    maxPrice,
    sizeMl,
    colorLabel
  } = useFilters();

  // Sync URL params with context and state
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory && urlCategory !== category) {
      setCategory(urlCategory);
    }

    const urlSort = searchParams.get('sort');
    if (urlSort && urlSort !== sortBy) {
      setSortBy(urlSort);
    }
  }, [searchParams, category, setCategory, sortBy]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

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

        <div className='mt-6 flex md:space-x-5'>
          {/* Sidebar Filters */}
          <div className='hidden min-w-[295px] max-w-[295px] md:block'>
            <div className='sticky top-[100px] space-y-5 rounded-[20px] border border-black/10 bg-white px-5 py-5 shadow-sm md:space-y-6 md:px-6'>
              <div className='flex items-center justify-between'>
                <span className='text-xl font-bold text-black'>Filters</span>
                <FiSliders className='text-2xl text-black/40' />
              </div>
              <Filters
                onApply={() => {
                  setProducts([]);
                  setNextCursor(null);
                  setHasMore(true);
                  fetchProducts(true);
                }}
              />
            </div>
          </div>

          <div className='flex w-full flex-col'>
            {/* Sticky Header Row for Title and Sort */}
            <div className='sticky top-[80px] z-20 mb-5 bg-white pb-4 pt-2 sm:top-[90px] md:top-[100px] md:mb-8'>
              <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center'>
                <div className='flex items-center justify-between w-full lg:w-auto'>
                  <h1 className='text-2xl font-bold md:text-[32px]'>
                    {recentParam === 'true' ? 'Recent Products' : 'All Products'}
                  </h1>
                  <MobileFilters
                    onApply={() => {
                      setProducts([]);
                      setNextCursor(null);
                      setHasMore(true);
                      fetchProducts(true);
                    }}
                  />
                </div>
                <div className='flex flex-row items-center w-full lg:w-auto justify-between lg:justify-end mt-4 lg:mt-0'>
                  <span className='mr-3 text-sm text-black/60 md:text-base'>
                    Showing {initialLoading ? '...' : products.length} Products
                  </span>
                  <div className='flex items-center mt-2 sm:mt-0'>
                    <span className='mr-2 text-sm text-black/60 md:text-base whitespace-nowrap'>Sort by:</span>
                    <Select value={sortBy} onValueChange={handleSortChange}>
                      <SelectTrigger className='w-fit border-none bg-transparent px-1.5 text-sm font-medium text-black shadow-none sm:text-base'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='most-popular'>Most Popular</SelectItem>
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
              {initialLoading
                ? Array.from({ length: 9 }).map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))
                : products.map((product, index) => (
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
              {loading && !initialLoading && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <ProductSkeleton key={i} />
                  ))}
                </>
              )}
            </div>

            {/* End of products indicator */}
            {!hasMore && !initialLoading && products.length > 0 && (
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
