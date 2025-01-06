// This is a server component - no 'use client' directive
import { getLatestProducts } from '@/actions/products';
import { getUserProfile } from '@/actions/update-profile';
import ShoppingCart from '@/components/(front-end)/shopping-cart/shopping-cart';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function CartPage() {
  // Get the session server-side
  const session = await getServerSession(authOptions);

  // If no session exists, redirect to login immediately
  if (!session?.user) {
    redirect('/login');
  }

  // Only fetch data if we have a session
  const [latestProducts, userProfile] = await Promise.all([
    getLatestProducts(5),
    getUserProfile(session.user.id),
  ]);

  return (
    <section className="bg-white pb-8 antialiased md:py-8">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-brandBlack sm:text-2xl">
          Shopping Cart
        </h2>

        <ShoppingCart
          userProfile={userProfile?.data}
          products={latestProducts}
          user={session.user}
        />
      </div>
    </section>
  );
}
