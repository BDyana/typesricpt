import React from 'react';
import Link from 'next/link';
import { getLatestProducts } from '@/actions/products';
import Products from '@/components/(front-end)/products';
import ShoppingCart from '@/components/(front-end)/shopping-cart';

export default async function page() {
  const latestProducts = await getLatestProducts(6);
  return (
    <>
      <section className="bg-white pb-8 antialiased md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-brandBlacksm:text-2xl">
            Shopping Cart
          </h2>

          <ShoppingCart products={latestProducts} />
        </div>
      </section>
    </>
  );
}
