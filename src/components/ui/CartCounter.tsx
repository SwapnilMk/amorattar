'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { cn } from '@/lib/utils';

type CartCounterProps = {
  isZeroDelete?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
  className?: string;
  initialValue?: number;
};

const CartCounter = ({
  isZeroDelete,
  onAdd,
  onRemove,
  className,
  initialValue = 1
}: CartCounterProps) => {
  const [counter, setCounter] = useState<number>(initialValue);

  useEffect(() => {
    setCounter(initialValue);
  }, [initialValue]);

  const addToCart = () => {
    if (onAdd) {
      onAdd();
    }
    setCounter(counter + 1);
  };

  const remove = () => {
    if ((counter === 1 && !isZeroDelete) || counter <= 0) return;

    if (onRemove) {
      onRemove();
    }
    if (counter - 1 <= 0) return;
    setCounter(counter - 1);
  };

  return (
    <div
      className={cn(
        'flex w-full min-w-[110px] max-w-[110px] items-center justify-between rounded-full bg-[#F0F0F0] px-4 py-3 sm:max-w-[170px] sm:px-5 md:py-3.5',
        className
      )}
    >
      <Button
        variant='ghost'
        size='icon'
        type='button'
        className='h-5 w-5 text-xl hover:bg-transparent sm:h-6 sm:w-6'
        onClick={remove}
      >
        <FaMinus />
      </Button>
      <span className='text-sm font-medium sm:text-base'>
        {!isZeroDelete ? counter : initialValue}
      </span>
      <Button
        variant='ghost'
        size='icon'
        type='button'
        className='h-5 w-5 text-xl hover:bg-transparent sm:h-6 sm:w-6'
        onClick={addToCart}
      >
        <FaPlus />
      </Button>
    </div>
  );
};

export default CartCounter;
