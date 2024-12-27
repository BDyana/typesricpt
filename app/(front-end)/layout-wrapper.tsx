// // LayoutWrapper.tsx
// 'use client';

// import Loader from '@/components/loader';
// import { useLocalStorage } from '@/hooks/use-local-storage';
// import { useSession } from 'next-auth/react';
// import { useRouter, usePathname } from 'next/navigation';
// import { useEffect, useState } from 'react';

// export function LayoutWrapper({ children }: { children: React.ReactNode }) {
//   const [onBoarded] = useLocalStorage('onBoarded', false);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();
//   const pathname = usePathname();
//   const { data: session } = useSession();

//   useEffect(() => {
//     // Only check onboarding status if there's an active session
//     if (session) {
//       if (!onBoarded && pathname !== '/on-boarding') {
//         router.push('/on-boarding');
//       } else if (onBoarded) {
//         router.push('/');
//       }
//     }
//     setIsLoading(false);
//   }, [onBoarded, router, pathname, session]);

//   // Show loading state
//   if (isLoading) {
//     return <Loader />;
//   }

//   // If has session but not onboarded and not on onboarding page, don't render
//   if (session && !onBoarded && pathname !== '/on-boarding') {
//     return null;
//   }

//   // In all other cases, render children
//   return <>{children}</>;
// }

'use client';

import Loader from '@/components/loader';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [onBoarded] = useLocalStorage('onBoarded', false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    // Only check onboarding status if there's an active session
    if (session) {
      if (!onBoarded && pathname !== '/on-boarding') {
        // Redirect to onboarding page if not onboarded
        router.push('/on-boarding');
      }
    }
    setIsLoading(false);
  }, [onBoarded, router, pathname, session, isLoading]);

  // Show loading state
  if (isLoading) {
    return <Loader />;
  }

  // If has session but not onboarded and not on onboarding page, don't render
  if (session && !onBoarded && pathname !== '/on-boarding') {
    return null;
  }

  // In all other cases, render children
  return <>{children}</>;
}
