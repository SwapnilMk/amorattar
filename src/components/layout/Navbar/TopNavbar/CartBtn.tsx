'use client';

import { useAppSelector } from '@/lib/hooks/redux';
import { RootState } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';

const CartBtn = () => {
  const { items } = useAppSelector((state: RootState) => state.carts);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link href='/cart' className='relative'>
      <Button
        variant='ghost'
        size='icon'
        className='relative'
        aria-label='Cart'
      >
        <ShoppingCart size={16} strokeWidth={2} aria-hidden='true' />
        {totalItems > 0 && (
          <Badge className='absolute -top-2 left-full min-w-5 -translate-x-1/2 rounded-full bg-[#334958] px-1.5 py-0.5'>
            {totalItems > 99 ? '99+' : totalItems}
          </Badge>
        )}
      </Button>
    </Link>
  );
};

export default CartBtn;
