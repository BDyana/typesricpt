'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useAppSelector } from '@/redux/hooks/hooks';

export default function CartCount() {
  const cartItems = useAppSelector((state) => state.cart);
  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center mt-2 pb-1 p-3 text-sm font-medium text-center text-white bg-transparent rounded-lg"
    >
      <ShoppingCart className="text-slate-700 dark:text-lime-500" />
      <span className="sr-only">Cart</span>
      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-brandColor shadow-md rounded-full -top-1 right-0 dark:border-gray-900">
        {cartItems?.length}
      </div>
    </Link>
  );
}
