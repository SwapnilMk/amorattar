import PageContainer from '@/components/layout/page-container';
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Dashboard Overview',
  description: 'Overview of your dashboard and key metrics'
};

export default function Dashboard() {
  return (
    <PageContainer>
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Dashboard Overview</h1>

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>245</div>
              <p className='text-xs text-muted-foreground'>
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Active Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>12</div>
              <p className='text-xs text-muted-foreground'>+2 new this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>$12,234</div>
              <p className='text-xs text-muted-foreground'>
                +15% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>573</div>
              <p className='text-xs text-muted-foreground'>+201 this week</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
