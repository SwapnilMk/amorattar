import PageContainer from '@/components/layout/page-container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events & Updates',
  description: 'View and manage events and updates'
};

export default function Dashboard() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'></div>
        this is dashboard hello hello hello hello hello hello hello
      </div>
    </PageContainer>
  );
}
