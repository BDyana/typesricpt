'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PromotionalBannerProps {
  title: string;
  description: string;
  ctaText: string;
  // onCtaClick: () => void;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  title,
  description,
  ctaText,
  // onCtaClick,
}) => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-brandBlack to-brandColor">
      <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
      <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="text-center sm:text-left mb-6 sm:mb-0">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {title}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-purple-100">
              {description}
            </p>
          </div>
          <div>
            <Button
              onClick={() => console.log('CTA clicked')}
              size="lg"
              className="font-semibold bg-white text-black hover:bg-purple-50"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
