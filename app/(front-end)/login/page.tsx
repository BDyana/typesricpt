import SignIn from '@/components/(front-end)/sign-in';
import React from 'react';

export default function page() {
  return (
    <div className="min-h-screen w-full backdrop-blur-md z-50 absolute inset-0 flex items-center justify-center bg-background/80">
      <SignIn />;
    </div>
  );
}
