'use client';

import SignIn from '@/components/(front-end)/sign-in';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { siteConfig } from '@/constants/site';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function page() {
  const router = useRouter();
  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent
        className="sm:max-w-4xl border-brandColor shadow-lg"
        style={{
          backgroundImage: `
      linear-gradient(to right, rgb(28,28,31), rgba(0, 0, 0, 0.3)), 
      url('https://images.pexels.com/photos/27219452/pexels-photo-27219452.jpeg')
      `,
          // url('https://images.pexels.com/photos/6868621/pexels-photo-6868621.jpeg')
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{siteConfig.name}</DialogTitle>
        </DialogHeader>

        <SignIn />
      </DialogContent>
    </Dialog>
  );
}
