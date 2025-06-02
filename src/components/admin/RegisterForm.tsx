'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus, Lock, Mail, User } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      toast.success('Registration successful! Please sign in.');
      router.push('/sign-in');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Registration failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='z-1 flex min-h-screen w-full items-center justify-center rounded-xl bg-white'>
      <div className='shadow-opacity-10 flex w-full max-w-sm flex-col items-center rounded-3xl border border-blue-100 bg-gradient-to-b from-sky-50/50 to-white p-8 text-black shadow-xl'>
        <div
          className='mb-6 flex h-24 w-24 cursor-pointer items-center justify-center'
          onClick={() => router.push('/')}
        >
          <Image
            src='/logo/amorattar.jpg'
            alt='Amorattar logo'
            width={96}
            height={96}
            className='rounded-xl object-contain'
          />
        </div>
        <h2 className='mb-2 text-center text-2xl font-semibold'>
          Create your account
        </h2>
        <p className='mb-6 text-center text-sm text-gray-500'>
          Join us today and start your journey with us
        </p>
        <div className='mb-2 flex w-full flex-col gap-3'>
          <div className='relative'>
            <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
              <User className='h-4 w-4' />
            </span>
            <input
              placeholder='Full Name'
              type='text'
              value={name}
              className='w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-200'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='relative'>
            <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
              <Mail className='h-4 w-4' />
            </span>
            <input
              placeholder='Email'
              type='email'
              value={email}
              className='w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-200'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='relative'>
            <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
              <Lock className='h-4 w-4' />
            </span>
            <input
              placeholder='Password'
              type='password'
              value={password}
              className='w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-10 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-200'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='w-full'>
            {error && (
              <div className='text-left text-sm text-red-500'>{error}</div>
            )}
          </div>
        </div>
        <button
          onClick={handleRegister}
          disabled={loading}
          className='mb-4 mt-2 w-full cursor-pointer rounded-xl bg-[#F9CB43] py-2 font-medium text-black shadow transition hover:bg-[#F9CB43]/90 disabled:cursor-not-allowed disabled:opacity-50'
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
        <p className='text-sm text-gray-600'>
          Already have an account?{' '}
          <Link
            href='/sign-in'
            className='font-medium text-blue-600 hover:underline'
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
