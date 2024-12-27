import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EmptyCart() {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4 py-12">
      <ShoppingCart className="animate-pulse h-16 w-16 text-gray-400" />
      <h2 className="text-2xl font-semibold text-gray-900">
        Your cart is empty
      </h2>
      <p className="text-center text-gray-500">
        Looks like you haven't added any items to your cart yet.
      </p>
      <Button className="bg-brandColor w-1/2" asChild>
        <Link href="/products">Start Shopping</Link>
      </Button>
    </div>
  );
}
