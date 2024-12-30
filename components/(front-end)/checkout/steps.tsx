'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/redux/hooks/hooks';
import { ChevronRight, ShoppingCart } from 'lucide-react';

interface Step {
  number: number;
  title: string;
}

export function Steps({ steps }: { steps: Step[] }) {
  const currentStep = useAppSelector((store) => store.checkout.currentStep);
  const cartItems = useAppSelector((store) => store.cart);

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(cartItems?.length || 0);
  }, [cartItems]);

  return (
    <nav className="w-full max-w-4xl mx-auto my-8">
      <ol className="flex flex-wrap items-center gap-2 sm:gap-4">
        <li className="flex items-center">
          <span
            className={`justify-center inline-flex gap-2 whitespace-nowrap border border-input bg-background hover:bg-brandColor/20 hover:text-accent-foreground text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 items-center h-9 rounded-md px-3 space-x-2 transition-colors duration-200 ease-in-out
              ${
                currentStep === 0
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-brandColor/20'
              }`}
          >
            <Link href="/your-cart" className="flex">
              <ShoppingCart className="w-4 h-4 mr-2" />
              <span>Cart</span>
              <Badge variant="secondary" className="ml-2">
                {cartCount}
              </Badge>
            </Link>
          </span>
        </li>

        {steps.map((step) => (
          <li key={step.number} className="flex items-center">
            <ChevronRight className="w-4 h-4 text-muted-foreground hidden sm:block" />
            <Button
              variant="ghost"
              size="sm"
              className={`ml-0 hover:bg-brandColor/20 sm:ml-2 transition-all duration-200 ease-in-out
                ${
                  step.number === currentStep
                    ? 'text-brandBlack scale-105'
                    : 'hover:bg-brandColor/20'
                }
                ${
                  step.number > currentStep
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }
              `}
              disabled={step.number > currentStep}
            >
              <span className="sm:hidden mr-1">{step.number}.</span>
              {step.title}
            </Button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
