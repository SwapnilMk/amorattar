import { Button } from '@/components/ui/button';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import ReviewCard from '@/components/common/ReviewCard';
import { reviewsData } from '@/data/reviews';
import Link from 'next/link';

const ReviewsContent = () => {
  return (
    <section>
      <div className='mb-5 flex flex-col items-center justify-between sm:mb-6 sm:flex-row'>
        <div className='mb-4 flex items-center sm:mb-0'>
          <h3 className='mr-2 text-xl font-bold text-black sm:text-2xl'>
            All Reviews
          </h3>
          <span className='text-sm text-black/60 sm:text-base'>(451)</span>
        </div>
        <div className='flex items-center space-x-2.5'>
          <Select defaultValue='latest'>
            <SelectTrigger className='h-12 min-w-[120px] rounded-full border-none bg-[#F0F0F0] px-4 py-3 text-xs font-medium text-black sm:px-5 sm:py-4 sm:text-base'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='latest'>Latest</SelectItem>
              <SelectItem value='most-relevant'>Most Relevant</SelectItem>
              <SelectItem value='oldest'>Oldest</SelectItem>
            </SelectContent>
          </Select>

          <Button
            type='button'
            className='h-12 rounded-full bg-black px-4 py-3 text-xs font-medium sm:min-w-[166px] sm:px-5 sm:py-4 sm:text-base'
          >
            Write a Review
          </Button>
        </div>
      </div>
      <div className='mb-5 grid grid-cols-1 gap-5 sm:mb-9 sm:grid-cols-2'>
        {reviewsData.map((review) => (
          <ReviewCard key={review.id} data={review} isAction isDate />
        ))}
      </div>
      <div className='w-full px-4 text-center sm:px-0'>
        <Link
          href='#'
          className='inline-block w-[230px] rounded-full border border-black/10 px-11 py-4 text-sm font-medium text-black transition-all hover:bg-black hover:text-white sm:text-base'
        >
          Load More Reviews
        </Link>
      </div>
    </section>
  );
};

export default ReviewsContent;
