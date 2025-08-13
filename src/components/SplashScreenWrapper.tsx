'use client';

import { useState } from 'react';
import SplashScreen from './SplashScreen';

interface SplashScreenWrapperProps {
  children: React.ReactNode;
}

export default function SplashScreenWrapper({
  children
}: SplashScreenWrapperProps) {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return <>{children}</>;
}
