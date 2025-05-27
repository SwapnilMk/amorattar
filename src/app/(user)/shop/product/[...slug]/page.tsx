'use client';

import React, { useEffect, useState } from 'react';
import ProductListSec from '@/components/common/ProductListSec';
import BreadcrumbProduct from '@/components/product-page/BreadcrumbProduct';
import Header from '@/components/product-page/Header';
import Tabs from '@/components/product-page/Tabs';
import { Product } from '@/types/product.types';
import { notFound } from 'next/navigation';

export default function ProductPage({
  params
}: {
  params: { slug: string[] };
}) {
  const [productData, setProductData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.slug[0]}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Failed to fetch product'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug[0]]);

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent'></div>
      </div>
    );
  }

  if (error || !productData) {
    notFound();
  }

  return (
    <main>
      <div className='mx-auto max-w-frame px-4 xl:px-0'>
        <hr className='mb-5 h-[1px] border-t-black/10 sm:mb-6' />
        <BreadcrumbProduct title={productData.title} />
        <section className='mb-11'>
          <Header data={productData} />
        </section>
        <Tabs data={productData} />
      </div>
      <div className='mb-[50px] sm:mb-20'>
        <ProductListSec
          title='You might also like'
          category={productData.categories[0]?.category.slug}
        />
      </div>
    </main>
  );
}
