import { getLatestProducts } from '@/actions/products';
import { getUserProfile } from '@/actions/update-profile';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  console.log('User', user);

  // if (!user) {
  //   redirect('/login');
  // }

  // Only fetch these after confirming session exists
  const latestProducts = await getLatestProducts(6);
  const userId = session?.user?.id;
  const userProfile = await getUserProfile(userId);

  return (
    <>
      <section className="bg-white pb-8 antialiased md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-brandBlack sm:text-2xl">
            Shopping Cart
          </h2>

          {/* <ShoppingCart
            userProfile={userProfile?.data}
            products={latestProducts}
            user={user ? user : {}}
          /> */}
        </div>
      </section>
    </>
  );
}
