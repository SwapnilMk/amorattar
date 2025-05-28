'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { TbBasketExclamation } from 'react-icons/tb';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa';

import BreadcrumbCart from '@/components/cart-page/BreadcrumbCart';
import ProductCard from '@/components/cart-page/ProductCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppSelector } from '@/lib/hooks/redux';
import { RootState } from '@/lib/store';
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';

export default function CartPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { items, totalPrice, adjustedTotalPrice } = useAppSelector(
    (state: RootState) => state.carts
  );

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined) return '0.00';
    return price.toFixed(2);
  };

  const handleWhatsAppClick = () => {
    if (!items.length) return;

    const itemsList = items
      .map(
        (item) =>
          `- ${item.title} (${item.selectedVolume.ml}ml, ${item.selectedColor.label}) - ${item.quantity} x ₹${formatPrice(item.discountedPrice)}`
      )
      .join('\n');

    const message = `Hi, I would like to place an order for the following items:\n\n${itemsList}\n\nSubtotal: ₹${formatPrice(totalPrice)}\nDiscount: ₹${formatPrice(totalPrice && adjustedTotalPrice ? totalPrice - adjustedTotalPrice : 0)}\nTotal Amount: ₹${formatPrice(adjustedTotalPrice)}`;
    const whatsappUrl = `https://wa.me/918268435091?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const renderCartContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      );
    }

    if (!items.length) {
      return (
        <div className="mt-32 flex flex-col items-center text-gray-300">
          <TbBasketExclamation strokeWidth={1} className="text-6xl" />
          <span className="mb-4 block">Your shopping cart is empty.</span>
          <Button 
            className="group relative flex items-center justify-center space-x-2 overflow-hidden rounded-full bg-[#F9CB43] px-6 py-3 text-black transition-all duration-300 hover:bg-[#F9CB43]/90"
            asChild
          >
            <Link href="/shop">
              <span className="relative z-10 flex items-center space-x-2">
                <FaArrowRight className="mr-2 transition-all group-hover:translate-x-1" />
                <span>Continue Shopping</span>
              </span>
              <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0"></div>
            </Link>
          </Button>
        </div>
      );
    }

    return (
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
        <div className="flex flex-col items-start space-y-5 lg:flex-row lg:space-x-5 lg:space-y-0">
          <div className="w-full flex-col space-y-4 rounded-[20px] border border-black/10 p-3.5 md:space-y-6 md:px-6">
            {items.map((product, idx, arr) => (
              <React.Fragment key={product.id}>
                <ProductCard data={product} />
                {arr.length - 1 !== idx && <hr className="border-t-black/10" />}
              </React.Fragment>
            ))}
          </div>
          <div className="w-full flex-col space-y-4 rounded-[20px] border border-black/10 p-5 md:space-y-6 md:px-6 lg:max-w-[505px]">
            <h6 className="text-xl font-bold text-black md:text-2xl">
              Order Summary
            </h6>
            <div className="flex flex-col space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-black/60 md:text-xl">Subtotal</span>
                <span className="font-bold md:text-xl">₹{formatPrice(totalPrice)}</span>
              </div>
              {totalPrice && adjustedTotalPrice && totalPrice > adjustedTotalPrice && (
                <div className="flex items-center justify-between">
                  <span className="text-black/60 md:text-xl">
                    Discount (-
                    {Math.round(
                      ((totalPrice - adjustedTotalPrice) / totalPrice) * 100
                    )}
                    %)
                  </span>
                  <span className="font-bold text-red-600 md:text-xl">
                    -₹{formatPrice(totalPrice - adjustedTotalPrice)}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-black/60 md:text-xl">Delivery Fee</span>
                <span className="font-bold md:text-xl">Free</span>
              </div>
              <hr className="border-t-black/10" />
              <div className="flex items-center justify-between">
                <span className="text-black md:text-xl">Total</span>
                <span className="text-xl font-bold md:text-2xl">
                  ₹{formatPrice(adjustedTotalPrice)}
                </span>
              </div>
            </div>
            <Button
              onClick={handleWhatsAppClick}
              className="group h-[54px] w-full rounded-full bg-[#25D366] py-4 text-sm font-medium text-white transition-colors hover:bg-[#128C7E] md:h-[60px] md:text-base"
              disabled={!items.length}
            >
              <FaWhatsapp className="mr-2 text-lg transition-all group-hover:translate-x-1" />
              <span>DM Order on WhatsApp</span>
            </Button>
            <Button
              variant="outline"
              className="group h-[54px] w-full rounded-full py-4 text-sm font-medium transition-colors hover:bg-black hover:text-white md:h-[60px] md:text-base"
              asChild
            >
              <Link href="/shop">
                <span>Continue Shopping</span>
                <FaArrowRight className="ml-2 transition-all group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <main className="pb-20">
      <div className="mx-auto max-w-frame px-4 xl:px-0">
        {renderCartContent()}
      </div>
    </main>
  );
}
