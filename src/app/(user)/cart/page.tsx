'use client';

import BreadcrumbCart from '@/components/cart-page/BreadcrumbCart';
import ProductCard from '@/components/cart-page/ProductCard';
import { Button } from '@/components/ui/button';
import InputGroup from '@/components/ui/input-group';
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import { FaArrowRight, FaWhatsapp } from 'react-icons/fa';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { TbBasketExclamation } from 'react-icons/tb';
import React from 'react';
import { RootState } from '@/lib/store';
import { useAppSelector } from '@/lib/hooks/redux';
import Link from 'next/link';

export default function CartPage() {
  const { cart, totalPrice, adjustedTotalPrice } = useAppSelector(
    (state: RootState) => state.carts
  );

  const handleWhatsAppClick = () => {
    if (!cart) return;

    const itemsList = cart.items
      .map((item) => `- ${item.name} (${item.quantity} x $${item.price})`)
      .join('\n');

    const message = `Hi, I would like to place an order for the following items:\n\n${itemsList}\n\nTotal Amount: $${adjustedTotalPrice}`;
    const whatsappUrl = `https://wa.me/918286319995?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <main className='pb-20'>
      <div className='mx-auto max-w-frame px-4 xl:px-0'>
        {cart && cart.items.length > 0 ? (
          <>
            <BreadcrumbCart />
            <h2
              className={cn([
                integralCF.className,
                'mb-5 text-[32px] font-bold uppercase text-black md:mb-6 md:text-[40px]'
              ])}
            >
              your cart
            </h2>
            <div className='flex flex-col items-start space-y-5 lg:flex-row lg:space-x-5 lg:space-y-0'>
              <div className='w-full flex-col space-y-4 rounded-[20px] border border-black/10 p-3.5 md:space-y-6 md:px-6'>
                {cart?.items.map((product, idx, arr) => (
                  <React.Fragment key={idx}>
                    <ProductCard data={product} />
                    {arr.length - 1 !== idx && (
                      <hr className='border-t-black/10' />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className='w-full flex-col space-y-4 rounded-[20px] border border-black/10 p-5 md:space-y-6 md:px-6 lg:max-w-[505px]'>
                <h6 className='text-xl font-bold text-black md:text-2xl'>
                  Order Summary
                </h6>
                <div className='flex flex-col space-y-5'>
                  <div className='flex items-center justify-between'>
                    <span className='text-black/60 md:text-xl'>Subtotal</span>
                    <span className='font-bold md:text-xl'>${totalPrice}</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-black/60 md:text-xl'>
                      Discount (-
                      {Math.round(
                        ((totalPrice - adjustedTotalPrice) / totalPrice) * 100
                      )}
                      %)
                    </span>
                    <span className='font-bold text-red-600 md:text-xl'>
                      -${Math.round(totalPrice - adjustedTotalPrice)}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-black/60 md:text-xl'>
                      Delivery Fee
                    </span>
                    <span className='font-bold md:text-xl'>Free</span>
                  </div>
                  <hr className='border-t-black/10' />
                  <div className='flex items-center justify-between'>
                    <span className='text-black md:text-xl'>Total</span>
                    <span className='text-xl font-bold md:text-2xl'>
                      ${Math.round(adjustedTotalPrice)}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={handleWhatsAppClick}
                  className='group h-[54px] w-full rounded-full bg-[#25D366] py-4 text-sm font-medium text-white md:h-[60px] md:text-base'
                >
                  <FaWhatsapp className='mr-2 text-lg transition-all group-hover:translate-x-1' />
                  <span>DM Order on WhatsApp</span>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className='mt-32 flex flex-col items-center text-gray-300'>
            <TbBasketExclamation strokeWidth={1} className='text-6xl' />
            <span className='mb-4 block'>Your shopping cart is empty.</span>
            <Button className='w-24 rounded-full' asChild>
              <Link href='/shop'>Shop</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
