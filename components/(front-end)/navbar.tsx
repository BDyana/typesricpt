'use client';
import { PhoneCall, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/Logo.png';
import Loader from '../loader';
import SearchForm from '../forms/search-from';
import { CONTACT_INFO } from '@/constants/contacts';
import CartCount from './cart-count';
import UserAvatar from '../user-avatar';
import Announcement from '../announcement';
// import ThemeSwitcherBtn from '../ThemeSwitcherBtn';
// import CartCount from './CartCount';
// import ContactInfo from './ContactInfo';
// import SearchForm from './SearchForm';

interface NavBarProps {
  // session: Session | null;
  session?: any;
  status?: any;
}

export default function Navbar({ session, status }: NavBarProps) {
  // console.log(`Session:`, session);
  if (status === 'loading') {
    return <Loader />;
  }

  return (
    <>
      <Announcement />
      <div className="bg-white shadow sticky top-0 z-40 w-full backdrop-blur-md">
        <div className="container flex items-center justify-between lg:pt-3.5 pt-0 lg:px-0 px-2 max-w-6xl gap-6 mx-auto">
          {/* Logo */}
          <Link className="" href="/">
            <Image
              src={logo}
              alt="Bdyana Logo | Your one shop stock center"
              width={400}
              height={400}
              className="w-32 mt-1"
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
              {status == undefined && (
                <Link
                  href="/login"
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
        <div className="container mx-auto mt-1 pb-2 px-2">
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
