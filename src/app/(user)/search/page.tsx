'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '@/types/product.types';
import ProductCard from '@/components/common/ProductCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('most-popular');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}&page=${currentPage}&sort=${sortBy}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            cache: 'no-store'
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / data.perPage));
      } catch (error) {
        console.error('Error fetching search results:', error);
        setError(
          error instanceof Error
            ? error.message
            : 'Failed to fetch search results'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, currentPage, sortBy]);

  // Reset to page 1 when sorting changes
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy]);

  if (loading) {
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
        <div className='flex w-full flex-col space-y-5'>
          <div className='flex flex-col lg:flex-row lg:justify-between'>
            <div className='flex items-center justify-between'>
              <h1 className='text-2xl font-bold md:text-[32px]'>
                Search Results for "{query}"
              </h1>
            </div>
            <div className='flex flex-col sm:flex-row sm:items-center'>
              <span className='mr-3 text-sm text-black/60 md:text-base'>
                Found {products.length} Products
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
                    <SelectItem value='most-popular'>Most Popular</SelectItem>
                    <SelectItem value='low-price'>Low Price</SelectItem>
                    <SelectItem value='high-price'>High Price</SelectItem>
                    <SelectItem value='recent'>Recently Added</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          {products.length === 0 ? (
            <div className='flex min-h-[400px] items-center justify-center'>
              <p className='text-lg text-gray-500'>
                No products found for "{query}"
              </p>
            </div>
          ) : (
            <>
              <div className='grid w-full grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-5'>
                {products.map((product) => (
                  <ProductCard key={product.id} data={product} />
                ))}
              </div>
              <hr className='border-t-black/10' />
              <Pagination className='justify-between'>
                <PaginationPrevious
                  href='#'
                  className='border border-black/10'
                  onClick={(e) => {
                    if (currentPage === 1) return;
                    setCurrentPage((prev) => Math.max(1, prev - 1));
                  }}
                  aria-disabled={currentPage === 1}
                />
                <PaginationContent>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page, index) => {
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href='#'
                              className='text-sm font-medium text-black/50'
                              isActive={currentPage === page}
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                      if (
                        (page === 2 && currentPage > 3) ||
                        (page === totalPages - 1 &&
                          currentPage < totalPages - 2)
                      ) {
                        return (
                          <PaginationItem key={`ellipsis-${page}`}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      return null;
                    }
                  )}
                </PaginationContent>
                <PaginationNext
                  href='#'
                  className='border border-black/10'
                  onClick={(e) => {
                    if (currentPage === totalPages) return;
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                  }}
                  aria-disabled={currentPage === totalPages}
                />
              </Pagination>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
