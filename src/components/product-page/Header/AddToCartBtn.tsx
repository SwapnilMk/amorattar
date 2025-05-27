'use client';

import { addToCart } from '@/lib/features/carts/cartsSlice';
import { useAppDispatch } from '@/lib/hooks/redux';
import { Product } from '@/types/product.types';
import React from 'react';

const AddToCartBtn = ({ data }: { data: Product & { quantity: number } }) => {
  const dispatch = useAppDispatch();

  return (
    <button
      type='button'
      className='ml-3 h-11 w-full rounded-full bg-black text-sm text-white transition-all hover:bg-black/80 sm:ml-5 sm:text-base md:h-[52px]'
      onClick={() =>
        dispatch(
          addToCart({
            id: Number(data.id),
            name: data.title,
            srcUrl: data.srcUrl,
            price: data.selectedVolume.price,
            attributes: [data.selectedColor.label],
            discount: {
              amount: data.discount,
              percentage: data.discount
            },
            quantity: data.quantity
          })
        )
      }
    >
      Add to Cart
    </button>
  );
};

export default AddToCartBtn;
