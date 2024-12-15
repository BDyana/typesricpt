import SignIn from '@/components/(front-end)/sign-in';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return (
    <div className="min-h-screen w-full backdrop-blur-md z-50 absolute inset-0 flex items-center justify-center bg-background/80">
      <SignIn />;
    </div>
  );
}
