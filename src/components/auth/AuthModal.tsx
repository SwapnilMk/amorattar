'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthModalProps {
  children: React.ReactNode;
}

export default function AuthModal({ children }: AuthModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'login' | 'register'>('login');
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get('login') === 'true') {
      setIsOpen(true);
      setView('login');
    }
  }, [searchParams]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open && searchParams.get('login')) {
      // Clear the login param
      const params = new URLSearchParams(searchParams.toString());
      params.delete('login');
      router.replace(`?${params.toString()}`);
    }
  };

  const handleSuccess = () => {
    setIsOpen(false);
    if (searchParams.get('login')) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('login');
      router.replace(`?${params.toString()}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0 border-none rounded-3xl overflow-hidden">
        <DialogHeader className="hidden">
          <DialogTitle>{view === 'login' ? 'Sign In' : 'Sign Up'}</DialogTitle>
        </DialogHeader>
        {view === 'login' ? (
          <LoginForm 
            onSuccess={handleSuccess} 
            onRegisterClick={() => setView('register')} 
          />
        ) : (
          <RegisterForm 
            onSuccess={handleSuccess} 
            onLoginClick={() => setView('login')} 
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
