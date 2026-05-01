'use client';

import { useAppSelector } from '@/lib/hooks/redux';
import { RootState } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const CartBtn = () => {
  const { items } = useAppSelector((state: RootState) => state.carts);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const [isAnimate, setIsAnimate] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setIsAnimate(true);
      const timer = setTimeout(() => setIsAnimate(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <Link href='/cart' className='relative'>
      <motion.div
        animate={isAnimate ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant='ghost'
          size='icon'
          className='relative'
          aria-label='Cart'
        >
          <ShoppingCart size={16} strokeWidth={2} aria-hidden='true' />
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className='absolute -top-2 left-full -translate-x-1/2'
              >
                <Badge className='min-w-5 rounded-full bg-[#334958] px-1.5 py-0.5 text-[10px]'>
                  {totalItems > 99 ? '99+' : totalItems}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </Link>
  );
};

export default CartBtn;
