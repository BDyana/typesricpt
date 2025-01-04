'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useAppSelector } from '@/redux/hooks/hooks';
import { useEffect, useState } from 'react';

export default function CartBanner() {
  const [hydrated, setHydrated] = useState(false);
  const cartItems: any = useAppSelector((store) => store.cart);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setHydrated(true);
    setCartCount(cartItems?.length || 0);
  }, [cartItems]);

  if (!hydrated) {
    return null; // Render a safe placeholder during hydration
  }

  const subTotal = cartItems
    .reduce(
      (acc: any, currentItem: any) =>
        acc + currentItem.salePrice * currentItem.qty,
      0,
    )
    .toFixed(2);
  return (
    <div className="bg-gray-100 rounded-xl mb-6">
      <div className="p-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center flex-1">
            <div className="inline-flex items-center justify-center flex-shrink-0 bg-gray-400 rounded-full w-9 h-9 text-gray-50">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <p className="ml-3 text-base font-normal text-gray-900">
              You have {cartCount} items in cart. Sub total is{' '}
              <span className="font-bold">৳{subTotal}</span>
            </p>
          </div>

          <div className="mt-4 sm:mt-0">
            <Link
              href="/cart"
              className="inline-flex px-4 py-2 text-sm font-bold  text-gray-600 transition-all duration-200 border border-gray-300 rounded-md  bg-gray-50  hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:text-gray-900 focus:ring-offset-2 focus:ring-gray-500 items-center"
            >
              Edit cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
