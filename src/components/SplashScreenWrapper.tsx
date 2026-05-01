'use client';

import { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen';

interface SplashScreenWrapperProps {
  children: React.ReactNode;
}

export default function SplashScreenWrapper({
  children
}: SplashScreenWrapperProps) {
  const [showSplash, setShowSplash] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    if (!hasSeenSplash) {
      setShowSplash(true);
    }
    setLoading(false);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    localStorage.setItem('hasSeenSplash', 'true');
  };

  if (loading) {
    return null; // Prevent content flash before checking localStorage
  }

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return <>{children}</>;
}
