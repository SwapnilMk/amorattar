import ProductBanner from '@/components/commerce-ui/product-banner';
import ReleaseBanner from '@/components/commerce-ui/release-banner';
import SaleBanner from '@/components/commerce-ui/sale-banner';
import ProductListSec from '@/components/common/ProductListSec';
import DressStyle from '@/components/homepage/DressStyle';
import Header from '@/components/homepage/Header';
import Reviews from '@/components/homepage/Reviews';
import { newArrivalsData } from '@/data/new-arrivals';
import { topSellingData } from '@/data/top-selling';

export default function Home() {
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
          data={newArrivalsData}
          viewAllLink='/shop#new-arrivals'
        />
        <div className='mx-auto max-w-frame px-4 py-10 xl:px-0'>
          <ProductBanner />
        </div>
        <div className='mb-[50px] sm:mb-20'>
          <ProductListSec
            title='top selling'
            data={topSellingData}
            viewAllLink='/shop#top-selling'
          />
        </div>
        <div className='mx-auto max-w-frame px-4 py-10 xl:px-0'>
          <SaleBanner />
        </div>
        <div className='mb-[50px] sm:mb-20'>
          <DressStyle />
        </div>
        <Reviews />
      </main>
    </>
  );
}
