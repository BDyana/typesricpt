import RegisterForm from '@/components/forms/register-form';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

function SearchBarFallback() {
  return <></>;
}
export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return (
    <section className=" bg-gradient-to-b from-slate-50 to-white">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
              Register Seller Account
            </h1>
            <Suspense fallback={<SearchBarFallback />}>
              <RegisterForm role="FARMER" />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
