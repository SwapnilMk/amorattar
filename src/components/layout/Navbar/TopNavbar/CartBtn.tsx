'use client';

import { useAppSelector } from '@/lib/hooks/redux';
import { RootState } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const CartBtn = () => {
  const { cart } = useAppSelector((state: RootState) => state.carts);

  return (
    <Link href='/cart' className='relative'>
      <Button
        variant='ghost'
        size='icon'
        className='relative'
        aria-label='Cart'
      >
        <ShoppingCart size={16} strokeWidth={2} aria-hidden='true' />
        {cart && cart.totalQuantities > 0 && (
          <Badge className='absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1'>
            {cart.totalQuantities > 99 ? '99+' : cart.totalQuantities}
          </Badge>
        )}
      </Button>
    </Link>
  );
};

export default CartBtn;
