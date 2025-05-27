'use client';

import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useSession } from '@/components/providers/SessionProvider';
import { useRouter } from 'next/navigation';
import { Package, Star, Tag, Users } from 'lucide-react';

interface DashboardStats {
  totalProducts: number;
  totalReviews: number;
  totalCategories: number;
  totalUsers: number;
}

export default function Dashboard() {
  const router = useRouter();
  const { user } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalReviews: 0,
    totalCategories: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/sign-in');
      return;
    }
    fetchStats();
  }, [user, router]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/dashboard');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setError('Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className='flex w-full flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Dashboard Overview</h1>

        {error && (
          <div className='rounded-md bg-destructive/15 p-3 text-sm text-destructive'>
            {error}
          </div>
        )}

        <div className='grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card className='w-full'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Products
              </CardTitle>
              <Package className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {loading ? '...' : stats.totalProducts}
              </div>
              <p className='text-xs text-muted-foreground'>
                Total products in store
              </p>
            </CardContent>
          </Card>

          <Card className='w-full'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Reviews
              </CardTitle>
              <Star className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {loading ? '...' : stats.totalReviews}
              </div>
              <p className='text-xs text-muted-foreground'>Customer reviews</p>
            </CardContent>
          </Card>

          <Card className='w-full'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Categories
              </CardTitle>
              <Tag className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {loading ? '...' : stats.totalCategories}
              </div>
              <p className='text-xs text-muted-foreground'>
                Product categories
              </p>
            </CardContent>
          </Card>

          <Card className='w-full'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
              <Users className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {loading ? '...' : stats.totalUsers}
              </div>
              <p className='text-xs text-muted-foreground'>Registered users</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
