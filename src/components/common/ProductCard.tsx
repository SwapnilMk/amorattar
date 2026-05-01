'use client';

import React, { useState, useEffect, memo } from 'react';
import Rating from '../ui/Rating';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product.types';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/lib/hooks/redux';
import { addToCart } from '@/lib/features/carts/cartsSlice';
import { FaShoppingCart, FaWhatsapp } from 'react-icons/fa';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const ProductImageSlider = memo(({ images, title }: { images: string[], title: string }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  return (
    <div className='relative h-full w-full overflow-hidden'>
      <AnimatePresence mode='popLayout'>
        <motion.div
          key={currentImageIndex}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ 
            duration: 0.6, 
            ease: [0.32, 0.72, 0, 1] // Custom cubic-bezier for smoother motion
          }}
          className='absolute inset-0 h-full w-full'
        >
          <Image
            src={images[currentImageIndex]}
            width={295}
            height={298}
            className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110'
            alt={title}
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* White Dots */}
      {images.length > 1 && (
        <div className='absolute bottom-3 left-1/2 flex -translate-x-1/2 space-x-1.5 z-10'>
          {images.map((_, idx) => (
            <div
              key={idx}
              className={cn(
                'h-1 w-1 rounded-full transition-all duration-300 shadow-sm',
                idx === currentImageIndex
                  ? 'bg-white w-2.5 scale-110'
                  : 'bg-white/40'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
});

ProductImageSlider.displayName = 'ProductImageSlider';

type ProductCardProps = {
  data: Product;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const images =
    data.gallery && data.gallery.length > 0 ? data.gallery : [data.srcUrl];
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: data.id,
        title: data.title,
        srcUrl: data.srcUrl,
        price: data.selectedVolume ? data.selectedVolume.price : data.price,
        discountedPrice:
          data.discount > 0
            ? Math.round(
                (data.selectedVolume ? data.selectedVolume.price : data.price) *
                  (1 - data.discount / 100)
              )
            : data.selectedVolume
              ? data.selectedVolume.price
              : data.price,
        discount: data.discount,
        quantity: 1,
        selectedColor: data.selectedColor,
        selectedVolume: data.selectedVolume
      })
    );
    toast.success(`${data.title} added to cart!`, {
      description: 'Check your cart to complete the purchase.',
      duration: 2000,
      position: 'bottom-right'
    });
  };

  const handleWhatsAppClick = () => {
    const productUrl = `${window.location.origin}/shop/product/${data.id}/${data.title.split(' ').join('-')}`;
    const message = `Check this out: ${productUrl}\n\nHi, I'm interested in *${data.title}*.\nPrice: ₹${discountedPrice}\n\nPlease provide more details.`;
    const whatsappUrl = `https://wa.me/918268435091?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const discountedPrice = data.selectedVolume
    ? data.selectedVolume.discount > 0
      ? data.selectedVolume.discountedPrice
      : data.selectedVolume.price
    : data.volumeOptions && data.volumeOptions.length > 0
      ? data.volumeOptions[0].discount > 0
        ? data.volumeOptions[0].discountedPrice
        : data.volumeOptions[0].price
      : data.price;

  return (
    <div className='group flex h-full aspect-auto flex-col items-start rounded-lg border border-gray-100 p-4 transition-all hover:shadow-lg'>
      <Link
        href={`/shop/product/${data.id}/${data.title.split(' ').join('-')}`}
        className='w-full'
      >
        {/* Product Image Slider */}
        <div className='relative mb-2.5 aspect-square w-full overflow-hidden rounded-[13px] bg-[#F0EEED] lg:max-w-[295px] lg:rounded-[20px] xl:mb-4'>
          <ProductImageSlider images={images} title={data.title} />
        </div>

        {/* Brand */}
        <div className='mb-1 text-left text-sm text-gray-600'>{data.brand}</div>

        {/* Title */}
        <div className='mb-2 w-full text-left'>
          <strong className='line-clamp-1 min-h-[1.5rem] text-black xl:text-xl'>
            {data.title}
          </strong>
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
          {(data.selectedVolume && data.selectedVolume.discount > 0) ||
          (data.volumeOptions &&
            data.volumeOptions.length > 0 &&
            data.volumeOptions[0].discount > 0) ? (
            <span className='text-xl font-bold text-black/40 line-through'>
              ₹
              {data.selectedVolume
                ? data.selectedVolume.price
                : data.volumeOptions[0].price}
            </span>
          ) : null}
          {(data.selectedVolume && data.selectedVolume.discount > 0) ||
          (data.volumeOptions &&
            data.volumeOptions.length > 0 &&
            data.volumeOptions[0].discount > 0) ? (
            <span className='rounded-full bg-[#FF3333]/10 px-2 py-1 text-xs font-medium text-[#FF3333]'>
              {`-${
                data.selectedVolume
                  ? data.selectedVolume.discount
                  : data.volumeOptions[0].discount
              }%`}
            </span>
          ) : null}
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
          className='group relative flex items-center justify-center rounded-full bg-[#25D366] px-4 py-3 text-white transition-all duration-300 hover:bg-[#128C7E]'
          title='Enquire on WhatsApp'
        >
          <span className='relative z-10'>
            <FaWhatsapp className='text-base' />
          </span>
          <div className='absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-300 group-hover:translate-x-0'></div>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
