'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';

interface LoginFormProps {
  onSuccess?: () => void;
  onRegisterClick?: () => void;
}

export default function LoginForm({ onSuccess, onRegisterClick }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Invalid credentials');
      }

      toast.success('Successfully signed in!');
      
      if (result.user.role === 'admin') {
        router.push('/dashboard');
      } else {
        if (onSuccess) onSuccess();
        router.refresh();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex w-full flex-col items-center bg-white p-4 text-black'>
      <div className='mb-6 flex h-20 w-20 cursor-pointer items-center justify-center' onClick={() => router.push('/')}>
        <Image
          src='/logo/amorperfumes.png'
          alt='Amor Perfumes logo'
          width={80}
          height={80}
          className='rounded-xl object-contain'
        />
      </div>
      <h2 className='mb-2 text-center text-2xl font-semibold'>
        Sign in with email
      </h2>
      <p className='mb-6 text-center text-sm text-gray-500'>
        Welcome back! Please enter your details to sign in
      </p>
      <div className='mb-4 flex w-full flex-col gap-3'>
        <div className='relative'>
          <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
            <Mail className='h-4 w-4' />
          </span>
          <input
            placeholder='Email'
            type='email'
            value={email}
            className='w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-200'
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
            className='w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-10 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-200'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='flex w-full flex-col gap-2'>
          {error && (
            <div className='text-left text-xs text-red-500'>{error}</div>
          )}
          <div className='text-right'>
            <Link
              href='/forgot-password'
              className='text-xs text-blue-600 hover:text-blue-800 hover:underline'
              onClick={() => onSuccess?.()}
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
      <button
        onClick={handleSignIn}
        disabled={loading}
        className='mb-4 mt-2 w-full cursor-pointer rounded-xl bg-[#F9CB43] py-2.5 font-medium text-black shadow transition hover:bg-[#F9CB43]/90 disabled:cursor-not-allowed disabled:opacity-50'
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
      <div className='text-center'>
        <p className='text-sm text-gray-600'>
          Don't have an account?{' '}
          <button
            onClick={onRegisterClick}
            className='font-medium text-blue-600 hover:text-blue-800 hover:underline'
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}
