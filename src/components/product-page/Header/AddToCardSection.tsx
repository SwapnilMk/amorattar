'use client';

import CartCounter from '@/components/ui/CartCounter';
import React, { useState } from 'react';
import AddToCartBtn from './AddToCartBtn';
import { Product } from '@/types/product.types';

const AddToCardSection = ({ data }: { data: Product }) => {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className='fixed bottom-0 left-0 z-10 flex w-full items-center justify-between border-t border-black/5 bg-white p-4 sm:justify-start md:relative md:justify-center md:border-none md:p-0'>
      <CartCounter onAdd={setQuantity} onRemove={setQuantity} />
      <AddToCartBtn data={{ ...data, quantity }} />
    </div>
  );
};

export default AddToCardSection;
