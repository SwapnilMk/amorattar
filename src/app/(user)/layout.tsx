import TopBanner from '@/components/layout/Banner/TopBanner';
import TopNavbar from '@/components/layout/Navbar/TopNavbar';
import Footer from '@/components/layout/Footer';
import Providers from './providers';

export default function UserLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBanner />
      <Providers>
        <TopNavbar />
        <main className='min-h-screen'>{children}</main>
      </Providers>
      <Footer />
    </>
  );
}
