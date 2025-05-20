import RegisterForm from '@/components/admin/RegisterForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Create your account
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Or{' '}
            <Link
              href='/sign-in'
              className='font-medium text-indigo-600 hover:text-indigo-500'
            >
              sign in to your account
            </Link>
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
