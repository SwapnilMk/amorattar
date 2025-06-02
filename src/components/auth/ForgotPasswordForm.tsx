'use client';

import { useState } from 'react';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'reset'>('email');

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      toast.success('Please enter your current password to reset');
      setStep('reset');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!oldPassword) {
      setError('Please enter your current password');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          oldPassword,
          newPassword,
          confirmPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      toast.success('Password reset successful');
      router.push('/sign-in');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
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
          {step === 'email' ? 'Forgot Password' : 'Reset Password'}
        </h2>
        <p className='mb-6 text-center text-sm text-gray-500'>
          {step === 'email'
            ? 'Enter your email to reset password'
            : 'Enter your current and new password'}
        </p>

        {step === 'email' ? (
          <form
            onSubmit={handleRequestReset}
            className='mb-2 flex w-full flex-col gap-3'
          >
            <div className='relative'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                <Mail className='h-4 w-4' />
              </span>
              <input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-200'
                placeholder='Enter your email'
                required
              />
            </div>

            {error && (
              <div className='text-left text-sm text-red-500'>{error}</div>
            )}

            <button
              type='submit'
              disabled={loading}
              className='mb-4 mt-2 w-full cursor-pointer rounded-xl bg-[#F9CB43] py-2 font-medium text-black shadow transition hover:bg-[#F9CB43]/90 disabled:cursor-not-allowed disabled:opacity-50'
            >
              {loading ? 'Verifying...' : 'Continue'}
            </button>

            <div className='text-center'>
              <Link
                href='/sign-in'
                className='flex items-center justify-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline'
              >
                <ArrowLeft className='h-4 w-4' />
                Back to Sign In
              </Link>
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleResetPassword}
            className='mb-2 flex w-full flex-col gap-3'
          >
            <div className='relative'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                <Lock className='h-4 w-4' />
              </span>
              <input
                id='oldPassword'
                type='password'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className='w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-200'
                placeholder='Enter your current password'
                required
              />
            </div>

            <div className='relative'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                <Lock className='h-4 w-4' />
              </span>
              <input
                id='newPassword'
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-200'
                placeholder='Enter new password'
                required
              />
            </div>

            <div className='relative'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                <Lock className='h-4 w-4' />
              </span>
              <input
                id='confirmPassword'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-200'
                placeholder='Confirm new password'
                required
              />
            </div>

            {error && (
              <div className='text-left text-sm text-red-500'>{error}</div>
            )}

            <button
              type='submit'
              disabled={loading}
              className='mb-4 mt-2 w-full cursor-pointer rounded-xl bg-[#F9CB43] py-2 font-medium text-black shadow transition hover:bg-[#F9CB43]/90 disabled:cursor-not-allowed disabled:opacity-50'
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>

            <div className='text-center'>
              <Link
                href='/sign-in'
                className='flex items-center justify-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline'
              >
                <ArrowLeft className='h-4 w-4' />
                Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
