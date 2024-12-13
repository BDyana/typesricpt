import ResetPasswordForm from '@/components/forms/reset-password';
import { Suspense } from 'react';

function SearchBarFallback() {
  return <></>;
}
export default function PasswordReset() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Suspense fallback={<SearchBarFallback />}>
              <ResetPasswordForm />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
