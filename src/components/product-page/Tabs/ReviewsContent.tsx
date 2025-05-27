'use client';

import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import ReviewCard from '@/components/common/ReviewCard';
import Link from 'next/link';
import { Review } from '@/types/review.types';

const ReviewsContent = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('latest');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch reviews'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'oldest':
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case 'most-relevant':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <div className='flex min-h-[200px] items-center justify-center'>
        <p className='text-black/60'>Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex min-h-[200px] items-center justify-center'>
        <p className='text-red-500'>Error: {error}</p>
      </div>
    );
  }

  return (
    <section>
      <div className='mb-5 flex flex-col items-center justify-between sm:mb-6 sm:flex-row'>
        <div className='mb-4 flex items-center sm:mb-0'>
          <h3 className='mr-2 text-xl font-bold text-black sm:text-2xl'>
            All Reviews
          </h3>
          <span className='text-sm text-black/60 sm:text-base'>
            ({reviews.length})
          </span>
        </div>
        <div className='flex items-center space-x-2.5'>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className='h-12 min-w-[120px] rounded-full border-none bg-[#F0F0F0] px-4 py-3 text-xs font-medium text-black sm:px-5 sm:py-4 sm:text-base'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='latest'>Latest</SelectItem>
              <SelectItem value='most-relevant'>Most Relevant</SelectItem>
              <SelectItem value='oldest'>Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='mb-5 grid grid-cols-1 gap-5 sm:mb-9 sm:grid-cols-2'>
        {sortedReviews.map((review) => (
          <ReviewCard key={review.id} data={review} isAction isDate />
        ))}
      </div>
      {reviews.length > 0 && (
        <div className='w-full px-4 text-center sm:px-0'>
          <Link
            href='#'
            className='inline-block w-[230px] rounded-full border border-black/10 px-11 py-4 text-sm font-medium text-black transition-all hover:bg-black hover:text-white sm:text-base'
          >
            Load More Reviews
          </Link>
        </div>
      )}
    </section>
  );
};

export default ReviewsContent;
