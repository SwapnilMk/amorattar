import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

type SearchResult = {
  id: string;
  title: string;
  brand: string;
  srcUrl: string;
  price: number;
  discount: number;
  rating: number;
};

type SearchResultsProps = {
  results: SearchResult[];
  isLoading: boolean;
  onClose: () => void;
};

const SearchResults = ({ results, isLoading, onClose }: SearchResultsProps) => {
  if (isLoading) {
    return (
      <div className='absolute left-0 right-0 top-full z-50 mt-1 max-h-[400px] overflow-y-auto rounded-lg border bg-white p-4 shadow-lg'>
        <div className='flex items-center justify-center py-4'>
          <div className='h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent'></div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className='absolute left-0 right-0 top-full z-50 mt-1 max-h-[400px] overflow-y-auto rounded-lg border bg-white p-4 shadow-lg'>
      <div className='space-y-4'>
        {results.map((product) => (
          <Link
            key={product.id}
            href={`/shop/product/${product.id}/${product.title.split(' ').join('-')}`}
            onClick={onClose}
            className='flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-gray-50'
          >
            <div className='relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100'>
              <Image
                src={product.srcUrl}
                alt={product.title}
                fill
                className='object-cover'
              />
            </div>
            <div className='flex-1'>
              <h3 className='font-medium text-gray-900'>{product.title}</h3>
              <p className='text-sm text-gray-500'>{product.brand}</p>
              <div className='mt-1 flex items-center gap-2'>
                <div className='flex items-center'>
                  <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                  <span className='ml-1 text-sm text-gray-600'>
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span className='text-sm font-medium text-gray-900'>
                  ₹
                  {product.discount > 0
                    ? Math.round(product.price * (1 - product.discount / 100))
                    : product.price}
                </span>
                {product.discount > 0 && (
                  <span className='text-sm text-gray-500 line-through'>
                    ₹{product.price}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
