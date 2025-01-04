'use client';

import Link from 'next/link';
import { Minus, Plus } from 'lucide-react';
import { useAppDispatch } from '@/redux/hooks/hooks';
import {
  decrementQty,
  incrementQty,
  removeFromCart,
} from '@/redux/slices/cart';
import { toast } from 'sonner';
import { siteConfig } from '@/constants/site';

interface CartItemListProps {
  cartItems: any[];
}

export default function CartItemList({ cartItems }: CartItemListProps) {
  const dispatch = useAppDispatch();

  function handleRemoveFromCart(cartId: string) {
    dispatch(removeFromCart(cartId));
    toast.success('Product removed Successfully');
  }

  function handleQtyIncrement(cartId: string) {
    dispatch(incrementQty(cartId));
  }

  function handleQtyDecrement(cartId: string) {
    dispatch(decrementQty(cartId));
  }

  return (
    <div className="space-y-6">
      {cartItems.map((item) => {
        return (
          <div
            key={item.id}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
          >
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
              <Link
                href={`/products/${item.slug}`}
                className="shrink-0 md:order-1"
              >
                <img
                  className="h-20 w-20"
                  src={item.imageUrl as string}
                  alt={item.title || siteConfig.name}
                />
              </Link>

              <label htmlFor="counter-input" className="sr-only">
                Choose quantity:
              </label>
              <div className="flex items-center justify-between md:order-3 md:justify-end">
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleQtyDecrement(item.id)}
                    id="decrement-button"
                    data-input-counter-decrement="counter-input"
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    <Minus className=" text-brandBlack size-2.5" />
                  </button>
                  <span
                    id="counter-input"
                    data-input-counter
                    className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-brandBlack focus:outline-none focus:ring-0 "
                  >
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQtyIncrement(item.id)}
                    id="increment-button"
                    data-input-counter-increment="counter-input"
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    <Plus className=" text-brandBlack size-2.5" />
                  </button>
                </div>
                <div className="text-end md:order-4 md:w-32">
                  <p className="text-base font-bold text-brandBlack">
                    ৳{item.salePrice}
                  </p>
                </div>
              </div>

              <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                <Link
                  href={`/products/${item.slug}`}
                  className="text-base font-medium text-brandBlack hover:underline "
                >
                  {item.title}
                </Link>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-brandBlack hover:underline dark:hover:text-white"
                  >
                    <svg
                      className="me-1.5 h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                      />
                    </svg>
                    Add to Favorites
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                  >
                    <Minus className="me-1.5 h-5 w-5" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
