'use client';

import React from 'react';
import { Toaster } from 'sonner';
import store from '@/redux/store';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';

interface ProvidersProps {
  children: React.ReactNode;
  session?: any; // Optional session prop
}

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        {children}
        <Toaster richColors position="bottom-right" />
      </SessionProvider>
    </Provider>
  );
}
