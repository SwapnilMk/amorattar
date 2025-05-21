'use client';

import React from 'react';
import Rating from '../ui/Rating';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product.types';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux';
import { addToCart } from '@/lib/features/carts/cartsSlice';
import { FaShoppingCart, FaWhatsapp } from 'react-icons/fa';

type ProductCardProps = {
  data: Product;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const colorSelection = useAppSelector(
    (state) => state.products.colorSelection
  );

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: data.id,
        name: data.title,
        srcUrl: data.srcUrl,
        price: data.price,
        attributes: [colorSelection.name], // Add color as an attribute
        discount: data.discount,
        quantity: 1
      })
    );
  };

  const handleWhatsAppClick = () => {
    const message = `Hi, I'm interested in this product: ${data.title} (${window.location.origin}/shop/product/${data.id}/${data.title.split(' ').join('-')})`;
    const whatsappUrl = `https://wa.me/918268435091?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const discountedPrice =
    data.discount.percentage > 0
      ? Math.round(data.price - (data.price * data.discount.percentage) / 100)
      : data.discount.amount > 0
        ? data.price - data.discount.amount
        : data.price;

  return (
    <div className='flex aspect-auto flex-col items-start'>
      <Link
        href={`/shop/product/${data.id}/${data.title.split(' ').join('-')}`}
        className='w-full'
      >
        <div className='mb-2.5 aspect-square w-full overflow-hidden rounded-[13px] bg-[#F0EEED] lg:max-w-[295px] lg:rounded-[20px] xl:mb-4'>
          <Image
            src={data.srcUrl}
            width={295}
            height={298}
            className='h-full w-full rounded-md object-contain transition-all duration-500 hover:scale-110'
            alt={data.title}
            priority
          />
        </div>
        <strong className='text-black xl:text-xl'>{data.title}</strong>
        <div className='mb-1 flex items-end xl:mb-2'>
          <Rating
            initialValue={data.rating}
            allowFraction
            SVGclassName='inline-block'
            emptyClassName='fill-gray-50'
            size={19}
            readonly
          />
          <span className='ml-[11px] pb-0.5 text-xs text-black xl:ml-[13px] xl:pb-0 xl:text-sm'>
            {data.rating.toFixed(1)}
            <span className='text-black/60'>/5</span>
          </span>
        </div>
        <div className='flex items-center space-x-[5px] xl:space-x-2.5'>
          <span className='text-xl font-bold text-black xl:text-2xl'>
            ${discountedPrice}
          </span>
          {(data.discount.percentage > 0 || data.discount.amount > 0) && (
            <span className='text-xl font-bold text-black/40 line-through xl:text-2xl'>
              ${data.price}
            </span>
          )}
          {data.discount.percentage > 0 ? (
            <span className='rounded-full bg-[#FF3333]/10 px-3.5 py-1.5 text-[10px] font-medium text-[#FF3333] xl:text-xs'>
              {`-${data.discount.percentage}%`}
            </span>
          ) : (
            data.discount.amount > 0 && (
              <span className='rounded-full bg-[#FF3333]/10 px-3.5 py-1.5 text-[10px] font-medium text-[#FF3333] xl:text-xs'>
                {`-$${data.discount.amount}`}
              </span>
            )
          )}
        </div>
      </Link>
      <div className='mt-2 flex space-x-2'>
        <Button
          onClick={handleAddToCart}
          className='flex items-center space-x-2 rounded-full bg-red-400 px-4 text-white'
        >
          <FaShoppingCart className='text-sm' />
        </Button>
        <Button
          onClick={handleWhatsAppClick}
          className='flex items-center space-x-2 rounded-full bg-[#25D366] px-4 text-white'
        >
          <FaWhatsapp className='text-sm' />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
