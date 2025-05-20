import React from 'react';
import ProductDetails from './ProductDetails';
import { Product } from '@/types/product.types';

type ProductDetailsContentProps = {
  data: Product;
};

const ProductDetailsContent = ({ data }: ProductDetailsContentProps) => {
  return (
    <section>
      <h3 className='mb-5 text-xl font-bold text-black sm:mb-6 sm:text-2xl'>
        Product specifications
      </h3>
      <ProductDetails data={data} />
    </section>
  );
};

export default ProductDetailsContent;
