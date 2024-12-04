'use client';

import React from 'react';
import { Toaster } from 'sonner';
import store from '@/redux/store';
import { Provider } from 'react-redux';
// Import your SessionProvider if using a session context (e.g., next-auth or custom provider)
// import { SessionProvider } from 'next-auth/react';  // Uncomment if using next-auth or a custom session provider

interface ProvidersProps {
  children: React.ReactNode;
  session?: any; // Optional session prop
}

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <Provider store={store}>
      {/* Uncomment if using session management (e.g., next-auth) */}
      {/* <SessionProvider session={session}> */}
      {children}
      <Toaster position="bottom-right" richColors={false} />
      {/* </SessionProvider> */}
    </Provider>
  );
}
