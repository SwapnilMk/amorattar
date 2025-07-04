'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useSession } from '@/components/providers/SessionProvider';

export default function AdminNavbar() {
  const router = useRouter();
  const { user } = useSession();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/sign-in');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className='bg-white shadow'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 justify-between'>
          <div className='flex'>
            <Link href='/dashboard' className='flex items-center'>
              <span className='text-xl font-bold'>Admin Dashboard</span>
            </Link>
          </div>
          <div className='flex items-center'>
            <span className='mr-4'>Welcome, {user?.name}</span>
            <Button onClick={handleLogout} variant='outline'>
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
