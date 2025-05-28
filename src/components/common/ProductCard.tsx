'use client';

import React from 'react';
import Rating from '../ui/Rating';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product.types';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/lib/hooks/redux';
import { addToCart } from '@/lib/features/carts/cartsSlice';
import { FaShoppingCart, FaWhatsapp } from 'react-icons/fa';

type ProductCardProps = {
  data: Product;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: data.id,
        title: data.title,
        srcUrl: data.srcUrl,
        price: data.selectedVolume.price,
        discountedPrice: data.discount > 0 
          ? Math.round(data.selectedVolume.price * (1 - data.discount / 100))
          : data.selectedVolume.price,
        discount: data.discount,
        quantity: 1,
        selectedColor: data.selectedColor,
        selectedVolume: data.selectedVolume
      })
    );
  };

  const handleWhatsAppClick = () => {
    const message = `Hi, I'm interested in this product: ${data.title} (${window.location.origin}/shop/product/${data.id}/${data.title.split(' ').join('-')})`;
    const whatsappUrl = `https://wa.me/918268435091?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const discountedPrice =
    data.discount > 0
      ? Math.round(data.selectedVolume.price * (1 - data.discount / 100))
      : data.selectedVolume.price;

  return (
    <div className='group flex aspect-auto flex-col items-start rounded-lg border border-gray-100 p-4 transition-all hover:shadow-lg'>
      <Link
        href={`/shop/product/${data.id}/${data.title.split(' ').join('-')}`}
        className='w-full'
      >
        {/* Product Image */}
        <div className='mb-2.5 aspect-square w-full overflow-hidden rounded-[13px] bg-[#F0EEED] lg:max-w-[295px] lg:rounded-[20px] xl:mb-4'>
          <Image
            src={data.srcUrl}
            width={295}
            height={298}
            className='h-full w-full rounded-md object-contain transition-all duration-500 group-hover:scale-110'
            alt={data.title}
            priority
          />
        </div>

        {/* Brand */}
        <div className='mb-1 text-left text-sm text-gray-600'>{data.brand}</div>

        {/* Title */}
        <div className='mb-2 w-full text-left'>
          <strong className='text-black xl:text-xl'>{data.title}</strong>
        </div>

        {/* Rating */}
        <div className='mb-2 flex items-end'>
          <Rating
            initialValue={data.rating}
            allowFraction
            SVGclassName='inline-block'
            emptyClassName='fill-gray-50'
            size={19}
            readonly
          />
          <span className='ml-2 text-xs text-black'>
            {data.rating.toFixed(1)}
            <span className='text-black/60'>/5</span>
          </span>
        </div>

        {/* Price and Discount */}
        <div className='mb-2 flex items-center space-x-2'>
          <span className='text-xl font-bold text-black'>
            ₹{discountedPrice}
          </span>
          {data.discount > 0 && (
            <span className='text-xl font-bold text-black/40 line-through'>
              ₹{data.selectedVolume.price}
            </span>
          )}
          {data.discount > 0 && (
            <span className='rounded-full bg-[#FF3333]/10 px-2 py-1 text-xs font-medium text-[#FF3333]'>
              {`-${data.discount}%`}
            </span>
          )}
        </div>
      </Link>

      {/* Action Buttons */}
      <div className='mt-auto flex w-full space-x-2'>
        <Button
          onClick={handleAddToCart}
          disabled={data.availabilityStatus === 'Out of Stock'}
          className='group relative flex flex-1 items-center justify-center space-x-2 overflow-hidden rounded-full bg-[#F9CB43] px-4 py-3 text-black transition-all duration-300 hover:bg-[#F9CB43]/90 disabled:bg-gray-400 disabled:hover:bg-gray-400'
        >
          <span className='relative z-10 flex items-center space-x-2'>
            <FaShoppingCart className='text-sm' />
            <span className='hidden sm:inline'>Add to Cart</span>
            <span className='sm:hidden'>Cart</span>
          </span>
          <div className='absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0'></div>
        </Button>
        <Button
          onClick={handleWhatsAppClick}
          className='flex items-center justify-center rounded-full bg-[#25D366] px-4 py-3 text-white transition-all duration-300 hover:bg-[#128C7E]'
        >
          <FaWhatsapp className='text-sm' />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
