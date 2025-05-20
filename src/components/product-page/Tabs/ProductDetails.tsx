import React from 'react';
import { Product } from '@/types/product.types';

type ProductDetailsProps = {
  data: Product;
};

const ProductDetails = ({ data }: ProductDetailsProps) => {
  return (
    <>
      {Object.entries(data.specifications).map(([key, value], i) => (
        <div className='grid grid-cols-3' key={i}>
          <div>
            <p className='w-full py-3 pr-2 text-sm leading-7 text-neutral-500 lg:py-4'>
              {key}
            </p>
          </div>
          <div className='col-span-2 border-b py-3 lg:py-4'>
            <p className='w-full text-sm font-medium leading-7 text-neutral-800'>
              {value}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductDetails;
