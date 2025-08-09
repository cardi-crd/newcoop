"use client";
import React, { useState, useEffect } from 'react';
import LogoLoader from '../components/LogoLoader';
import { ThemeProvider } from '../components/ThemeContext';
import BottomNavButtons from '../components/BottomNavButtons';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <ThemeProvider>
      {!hydrated && <LogoLoader />}
      {hydrated && (
        <>
          {children}
          <BottomNavButtons />
        </>
      )}
    </ThemeProvider>
  );
} 