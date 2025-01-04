'use client';

import { useState } from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { siteConfig } from '@/constants/site';

interface ShareOption {
  name: string;
  icon: string;
  shareUrl: (url: string) => string;
}

const shareOptions: ShareOption[] = [
  {
    name: 'WhatsApp',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/whatsapp.svg',
    shareUrl: (url) => `https://wa.me/?text=${encodeURIComponent(url)}`,
  },
  {
    name: 'Facebook',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/facebook.svg',
    shareUrl: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: 'Twitter',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/twitter.svg',
    shareUrl: (url) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
  },
  {
    name: 'LinkedIn',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/linkedin.svg',
    shareUrl: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url,
      )}`,
  },
  {
    name: 'Email',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/gmail.svg',
    shareUrl: (url) => `mailto:?body=${encodeURIComponent(url)}`,
  },
];

export default function ProductShareButton({
  urlToShare,
}: {
  urlToShare: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button aria-label="Share product" variant="outline">
            <Share2 className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader className="sr-only">
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            {shareOptions.map((option) => (
              <Button
                key={option.name}
                variant="outline"
                className="flex flex-col md:flex-row py-6 px-10 items-center justify-center"
                onClick={() => handleShare(option.shareUrl(urlToShare))}
              >
                <img
                  src={option.icon}
                  alt={option.name || siteConfig.name}
                  className="w-6 h-6 mb-2"
                />
                <span className="text-sm">{option.name}</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
