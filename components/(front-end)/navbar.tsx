'use client';

import { CONTACT_INFO } from '@/constants/contacts';
import { siteConfig } from '@/constants/site';
import { PhoneCall, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Announcement from '../announcement';
import SearchForm from '../forms/search-from';
import Loader from '../loader';
import UserAvatar from '../user-avatar';
import CartCount from './cart-count';

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (pathname === '/on-boarding') {
    return null;
  }

  if (status === 'loading') {
    return <Loader />;
  }

  return (
    <>
      <div className="hidden md:block">
        <Announcement />
      </div>
      <div className="bg-white shadow sticky top-0 z-40 w-full backdrop-blur-md">
        <div className="container flex items-center justify-between lg:pt-3.5 pt-0 lg:px-0 px-3 max-w-6xl gap-6 mx-auto">
          {/* Logo */}
          <Link className="" href="/">
            <Image
              src={siteConfig.logo || '/Logo.png'}
              alt={siteConfig.description || siteConfig.name}
              width={400}
              height={400}
              className="md:w-32 w-24 mt-1"
            />
          </Link>

          {/* SEARCH */}
          <div className="flex-grow hidden md:flex">
            <div className="w-full">
              <SearchForm />
            </div>
          </div>
          <div className="sm:flex hidden">
            <div className="flex gap-3">
              <div>
                <PhoneCall className="mt-3" />
              </div>
              <div>
                <h4>
                  <b>{CONTACT_INFO.supportHours}:</b>
                </h4>
                <p>{CONTACT_INFO.supportNumber}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1 lg:gap-2 ml-2">
              <CartCount />
              {status == 'unauthenticated' && (
                <Link
                  href="/login"
                  prefetch={true}
                  className="flex ml-2 items-center space-x-1 justify-center gap-2s whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 lg:px-8 text-green-950 dark:text-slate-100"
                >
                  <User />
                  <span className="md:flex hidden">Register</span>
                </Link>
              )}
              <div className="ml-3">
                <UserAvatar user={session?.user} />
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-1 pb-2 px-3 md:px-2">
          <div className="flex md:hidden mx-auto">
            <div className="flex overflow-hidden w-full">
              <SearchForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
