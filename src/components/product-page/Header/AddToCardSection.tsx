'use client';

import React from 'react';
import { Product } from '@/types/product.types';
import { useAppDispatch } from '@/lib/hooks/redux';
import { addToCart } from '@/lib/features/carts/cartsSlice';
import { Button } from '@/components/ui/button';
import { FaShoppingCart, FaWhatsapp } from 'react-icons/fa';
import { toast } from 'sonner';

type AddToCardSectionProps = {
  data: Product;
};

const AddToCardSection = ({ data }: AddToCardSectionProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: data.id,
        title: data.title,
        srcUrl: data.srcUrl,
        price: data.selectedVolume.price,
        discountedPrice:
          data.discount > 0
            ? Math.round(data.selectedVolume.price * (1 - data.discount / 100))
            : data.selectedVolume.price,
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
    const price = data.discount > 0
      ? Math.round(data.selectedVolume.price * (1 - data.discount / 100))
      : data.selectedVolume.price;
    
    const message = `Check this out: ${productUrl}\n\nHi, I'm interested in *${data.title}* (${data.selectedVolume.ml}ml).\nPrice: ₹${price}\n\nPlease provide more details.`;
    const whatsappUrl = `https://wa.me/918268435091?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className='flex w-full gap-3'>
      <Button
        onClick={handleAddToCart}
        disabled={data.availabilityStatus === 'Out of Stock'}
        className='group relative flex flex-1 items-center justify-center space-x-2 overflow-hidden rounded-full bg-[#F9CB43] px-6 py-3 text-black transition-all duration-300 hover:bg-[#F9CB43]/90 disabled:bg-gray-400 disabled:hover:bg-gray-400'
      >
        <span className='relative z-10 flex items-center space-x-2'>
          <FaShoppingCart className='text-sm' />
          <span>Add to Cart</span>
        </span>
        <div className='absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0'></div>
      </Button>
      <Button
        onClick={handleWhatsAppClick}
        className='group relative flex flex-1 items-center justify-center space-x-2 overflow-hidden rounded-full bg-[#25D366] px-6 py-3 text-white transition-all duration-300 hover:bg-[#128C7E]'
      >
        <span className='relative z-10 flex items-center space-x-2'>
          <FaWhatsapp className='text-lg' />
          <span>Enquire on WhatsApp</span>
        </span>
        <div className='absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-300 group-hover:translate-x-0'></div>
      </Button>
    </div>
  );
};

export default AddToCardSection;
