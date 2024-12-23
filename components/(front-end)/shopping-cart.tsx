'use client';

import Link from 'next/link';
import Products from './products';
import { Product } from '@prisma/client';
import { Minus, Plus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import {
  decrementQty,
  incrementQty,
  removeFromCart,
} from '@/redux/slices/cart';
import { toast } from 'sonner';

interface IProps {
  products: Product[] | null | undefined;
}
export default function ShoppingCart({ products }: IProps) {
  // const { cart } = useCart();

  const cartItems = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const subTotal =
    cartItems
      .reduce((acc, currentItem) => {
        return acc + currentItem.salePrice * currentItem.qty;
      }, 0)
      .toFixed(2) ?? 0;

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
    <>
      <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-3xl">
          <div className="space-y-6">
            {cartItems.map((item, i) => (
              <div
                key={i}
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
                      alt={item.title}
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
                        className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-brandBlackfocus:outline-none focus:ring-0 "
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
                      className="text-base font-medium text-brandBlackhover:underline "
                    >
                      {item.title}
                    </Link>

                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-brandBlackhover:underline dark:hover:text-white"
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
            ))}
          </div>
          <div className="hidden xl:mt-8 xl:block">
            <h3 className="text-2xl font-semibold text-brandBlack">
              People also bought
            </h3>
            {/* <div className="mt-6 grid grid-cols-3 w-full gap-4 sm:mt-8"> */}
            {/* Most Bought Products */}
            <Products
              title=""
              description=""
              products={products as any}
              buttonTitle="View More"
              className="lg:grid-cols-5 gap-y-2"
            />
            {/* </div> */}
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
          <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm   sm:p-6">
            <p className="text-xl font-semibold text-brandBlack">
              Order summary
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500">
                    Original price
                  </dt>
                  <dd className="text-base font-medium text-brandBlack">
                    ৳{subTotal}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500">
                    Savings
                  </dt>
                  <dd className="text-base font-medium text-green-600">
                    -৳299.00
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500">
                    Store Pickup
                  </dt>
                  <dd className="text-base font-medium text-brandBlack">৳0</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500">Tax</dt>
                  <dd className="text-base font-medium text-brandBlack">৳0</dd>
                </dl>
              </div>

              <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                <dt className="text-base font-bold text-brandBlack">Total</dt>
                <dd className="text-base font-bold text-brandBlack">
                  ৳{subTotal}
                </dd>
              </dl>
            </div>

            <Link
              href="/checkout"
              prefetch={true}
              title="Proceed to checkout"
              className="flex bg-brandColor w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-brandBlack dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Proceed to Checkout
            </Link>

            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-normal text-gray-500"> or </span>
              <Link
                href="/"
                prefetch={true}
                title="Continue Shopping"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
              >
                Continue Shopping
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm   sm:p-6">
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="voucher"
                  className="mb-2 block text-sm font-medium text-brandBlack"
                >
                  {' '}
                  Do you have Link voucher or gift card?{' '}
                </label>
                <input
                  type="text"
                  id="voucher"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-brandBlackfocus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700  dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder=""
                  required
                />
              </div>
              <button
                type="submit"
                className="flex bg-brandBlack w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Apply Code
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
