import ProductListSec from '@/components/common/ProductListSec';
import BreadcrumbProduct from '@/components/product-page/BreadcrumbProduct';
import Header from '@/components/product-page/Header';
import Tabs from '@/components/product-page/Tabs';
import { newArrivalsData } from '@/data/new-arrivals';
import { relatedProductData } from '@/data/product';
import { topSellingData } from '@/data/top-selling';
import { Product } from '@/types/product.types';
import { notFound } from 'next/navigation';

const data: Product[] = [
  ...newArrivalsData,
  ...topSellingData,
  ...relatedProductData
];

export default function ProductPage({
  params
}: {
  params: { slug: string[] };
}) {
  const productData = data.find(
    (product) => product.id === Number(params.slug[0])
  );

  if (!productData?.title) {
    notFound();
  }

  return (
    <main>
      <div className='mx-auto max-w-frame px-4 xl:px-0'>
        <hr className='mb-5 h-[1px] border-t-black/10 sm:mb-6' />
        <BreadcrumbProduct title={productData?.title ?? 'product'} />
        <section className='mb-11'>
          <Header data={productData} />
        </section>
        <Tabs data={productData} />
      </div>
      <div className='mb-[50px] sm:mb-20'>
        <ProductListSec title='You might also like' data={relatedProductData} />
      </div>
    </main>
  );
}
