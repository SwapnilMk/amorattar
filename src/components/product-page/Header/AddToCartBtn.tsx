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
            id: data.id,
            title: data.title,
            srcUrl: data.srcUrl,
            price: data.selectedVolume.price,
            discountedPrice:
              data.discount > 0
                ? Math.round(
                    data.selectedVolume.price * (1 - data.discount / 100)
                  )
                : data.selectedVolume.price,
            discount: data.discount,
            quantity: data.quantity,
            selectedColor: data.selectedColor,
            selectedVolume: data.selectedVolume
          })
        )
      }
    >
      Add to Cart
    </button>
  );
};

export default AddToCartBtn;
