import React from 'react';
import Rating from '../ui/Rating';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { Button } from '../ui/button';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { Review } from '@/types/review.types';
import { cn } from '@/lib/utils';

type ReviewCardProps = {
  blurChild?: React.ReactNode;
  isAction?: boolean;
  isDate?: boolean;
  data: Review;
  className?: string;
};

const ReviewCard = ({
  blurChild,
  isAction = false,
  isDate = false,
  data,
  className
}: ReviewCardProps) => {
  return (
    <div
      className={cn([
        'relative flex aspect-auto flex-col items-start overflow-hidden rounded-[20px] border border-black/10 bg-white p-6 sm:px-8 sm:py-7',
        className
      ])}
    >
      {blurChild && blurChild}
      <div className='mb-3 flex w-full items-center justify-between sm:mb-4'>
        <Rating
          initialValue={data.rating}
          allowFraction
          SVGclassName='inline-block'
          size={23}
          readonly
        />
        {isAction && (
          <Button variant='ghost' size='icon'>
            <IoEllipsisHorizontal className='text-2xl text-black/40' />
          </Button>
        )}
      </div>
      <div className='mb-2 flex items-center sm:mb-3'>
        <strong className='mr-1 text-black sm:text-xl'>{data.name}</strong>
        <IoIosCheckmarkCircle className='text-xl text-[#01AB31] sm:text-2xl' />
      </div>
      <p className='text-sm text-black/60 sm:text-base'>{data.content}</p>
      {isDate && (
        <p className='mt-4 text-sm font-medium text-black/60 sm:mt-6'>
          Posted on {new Date(data.createdAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default ReviewCard;
