'use client';

import { useEffect, useState } from 'react';
import ProductBanner from '@/components/commerce-ui/product-banner';
import ReleaseBanner from '@/components/commerce-ui/release-banner';
import SaleBanner from '@/components/commerce-ui/sale-banner';
import ProductListSec from '@/components/common/ProductListSec';
import DressStyle from '@/components/homepage/DressStyle';
import Header from '@/components/homepage/Header';
import Reviews from '@/components/homepage/Reviews';
import { Product } from '@/types/product.types';

export default function Home() {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [topSelling, setTopSelling] = useState<Product[]>([]);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newArrivalsRes, topSellingRes, recentProductsRes] = await Promise.all([
          fetch('/api/products?category=new-arrivals'),
          fetch('/api/products?category=best-sellers'),
          fetch('/api/products?recent=true&limit=8')
        ]);

        const [newArrivalsData, topSellingData, recentProductsData] = await Promise.all([
          newArrivalsRes.json(),
          topSellingRes.json(),
          recentProductsRes.json()
        ]);

        setNewArrivals(newArrivalsData.products);
        setTopSelling(topSellingData.products);
        setRecentProducts(recentProductsData.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent'></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      {/* <Brands /> */}
      <main className='my-[20px] sm:my-[72px]'>
        <div className='mx-auto mb-8 max-w-frame px-4 xl:px-0'>
          <ReleaseBanner />
        </div>
        <ProductListSec
          title='NEW ARRIVALS'
          category='New Arrivals'
          viewAllLink='/shop#new-arrivals'
        />
        <div className='mx-auto max-w-frame px-4 py-10 xl:px-0'>
          <ProductBanner />
        </div>
        <div className='mb-[50px] sm:mb-20'>
          <ProductListSec
            title='Best Sellers'
            category='Best Sellers'
            viewAllLink='/shop#best-sellers'
          />
        </div>
        <div className='mx-auto max-w-frame px-4 py-10 xl:px-0'>
          <SaleBanner />
        </div>
        <div className='mb-[50px] sm:mb-20'>
          <ProductListSec
            title='Recently Added'
            category='Recent Products'
            viewAllLink='/shop?recent=true'
            products={recentProducts}
          />
        </div>
        <div className='mb-[50px] sm:mb-20'>
          <DressStyle />
        </div>
        <Reviews />
      </main>
    </>
  );
}
