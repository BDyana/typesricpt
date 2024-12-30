import { getLatestProducts } from '@/actions/products';
import { getUserProfile } from '@/actions/update-profile';
import ShoppingCart from '@/components/(front-end)/shopping-cart/shopping-cart';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function page() {
  const latestProducts = await getLatestProducts(6);
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const userId = user?.id;

  const userProfile = await getUserProfile(userId);

  if (session) {
    redirect('/');
  }

  return (
    <>
      <section className="bg-white pb-8 antialiased md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-brandBlack sm:text-2xl">
            Shopping Cart
          </h2>

          <ShoppingCart
            userProfile={userProfile?.data}
            products={latestProducts}
            user={user ? user : {}}
          />
        </div>
      </section>
    </>
  );
}
