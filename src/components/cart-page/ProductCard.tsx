'use client';

import React from 'react';
import { PiTrashFill } from 'react-icons/pi';
import Image from 'next/image';
import Link from 'next/link';
import CartCounter from '@/components/ui/CartCounter';
import { Button } from '../ui/button';
import {
  addToCart,
  CartItem,
  remove,
  removeCartItem
} from '@/lib/features/carts/cartsSlice';
import { useAppDispatch } from '@/lib/hooks/redux';

type ProductCardProps = {
  data: CartItem;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className='flex items-start space-x-4'>
      <Link
        href={`/shop/product/${data.id}/${data.name.split(' ').join('-')}`}
        className='aspect-square w-full min-w-[100px] max-w-[100px] overflow-hidden rounded-lg bg-[#F0EEED] sm:max-w-[124px]'
      >
        <Image
          src={data.srcUrl}
          width={124}
          height={124}
          className='h-full w-full rounded-md object-cover transition-all duration-500 hover:scale-110'
          alt={data.name}
          priority
        />
      </Link>
      <div className='flex w-full flex-col self-stretch'>
        <div className='flex items-center justify-between'>
          <Link
            href={`/shop/product/${data.id}/${data.name.split(' ').join('-')}`}
            className='text-base font-bold text-black xl:text-xl'
          >
            {data.name}
          </Link>
          <Button
            variant='ghost'
            size='icon'
            className='h-5 w-5 md:h-9 md:w-9'
            onClick={() =>
              dispatch(
                remove({
                  id: data.id,
                  attributes: data.attributes,
                  quantity: data.quantity
                })
              )
            }
          >
            <PiTrashFill className='text-xl text-red-600 md:text-2xl' />
          </Button>
        </div>
        <div className='-mt-1'>
          <span className='mr-1 text-xs text-black md:text-sm'>Size:</span>
          <span className='text-xs text-black/60 md:text-sm'>
            {data.attributes[0]}
          </span>
        </div>
        <div className='-mt-1.5 mb-auto'>
          <span className='mr-1 text-xs text-black md:text-sm'>Color:</span>
          <span className='text-xs text-black/60 md:text-sm'>
            {data.attributes[1]}
          </span>
        </div>
        <div className='flex flex-wrap items-center justify-between'>
          <div className='flex items-center space-x-[5px] xl:space-x-2.5'>
            {data.discount.percentage > 0 ? (
              <span className='text-xl font-bold text-black xl:text-2xl'>
                {`$${Math.round(
                  data.price - (data.price * data.discount.percentage) / 100
                )}`}
              </span>
            ) : data.discount.amount > 0 ? (
              <span className='text-xl font-bold text-black xl:text-2xl'>
                {`$${data.price - data.discount.amount}`}
              </span>
            ) : (
              <span className='text-xl font-bold text-black xl:text-2xl'>
                ${data.price}
              </span>
            )}
            {data.discount.percentage > 0 && (
              <span className='text-xl font-bold text-black/40 line-through xl:text-2xl'>
                ${data.price}
              </span>
            )}
            {data.discount.amount > 0 && (
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
          <CartCounter
            initialValue={data.quantity}
            onAdd={() => dispatch(addToCart({ ...data, quantity: 1 }))}
            onRemove={() =>
              data.quantity === 1
                ? dispatch(
                    remove({
                      id: data.id,
                      attributes: data.attributes,
                      quantity: data.quantity
                    })
                  )
                : dispatch(
                    removeCartItem({ id: data.id, attributes: data.attributes })
                  )
            }
            isZeroDelete
            className='max-h-8 min-w-[105px] max-w-[105px] px-5 py-3 sm:max-w-32 md:max-h-10'
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
