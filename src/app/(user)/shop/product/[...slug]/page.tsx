'use client';

import React, { useEffect, useState } from 'react';
import ProductListSec from '@/components/common/ProductListSec';
import BreadcrumbProduct from '@/components/product-page/BreadcrumbProduct';
import Header from '@/components/product-page/Header';
import Tabs from '@/components/product-page/Tabs';
import {
  Product,
  Gender,
  Fragrance,
  AvailabilityStatus
} from '@/types/product.types';
import { notFound } from 'next/navigation';

export default function ProductPage({
  params
}: {
  params: { slug: string[] };
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = params.slug[0];
        if (!productId) {
          throw new Error('Product ID is required');
        }

        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
          if (response.status === 404) {
            notFound();
          }
          throw new Error(`Failed to fetch product: ${response.statusText}`);
        }

        const productData = await response.json();

        // Convert dates to ISO strings and cast the product data to match the Product type
        const formattedProduct: Product = {
          ...productData,
          gender: productData.gender as Gender[],
          categories: productData.categories.map((cat: any) => ({
            ...cat,
            createdAt: new Date(cat.createdAt).toISOString(),
            updatedAt: new Date(cat.updatedAt).toISOString(),
            category: {
              ...cat.category,
              createdAt: new Date(cat.category.createdAt).toISOString(),
              updatedAt: new Date(cat.category.updatedAt).toISOString()
            }
          })),
          colors: productData.colors as any,
          selectedColor: productData.selectedColor as any,
          volumeOptions: productData.volumeOptions as any,
          selectedVolume: productData.selectedVolume as any,
          specifications: productData.specifications as any,
          fragrance: productData.fragrance as Fragrance[],
          availabilityStatus:
            productData.availabilityStatus as AvailabilityStatus,
          createdAt: new Date(productData.createdAt).toISOString(),
          updatedAt: new Date(productData.updatedAt).toISOString()
        };

        setProduct(formattedProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(
          error instanceof Error ? error.message : 'Failed to fetch product'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent'></div>
      </div>
    );
  }

  if (error || !product) {
    console.error('Product not found or error occurred:', error);
    notFound();
  }

  return (
    <main>
      <div className='mx-auto max-w-frame px-4 xl:px-0'>
        <hr className='mb-5 h-[1px] border-t-black/10 sm:mb-6' />
        <BreadcrumbProduct title={product.title} />
        <section className='mb-11'>
          <Header data={product} />
        </section>
        <Tabs data={product} />
      </div>
      <div className='mb-[50px] sm:mb-20'>
        <ProductListSec
          title='You might also like'
          category={product.categories[0]?.category.slug}
        />
      </div>
    </main>
  );
}
