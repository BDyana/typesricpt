'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { generateInitials } from '@/lib/generateInitials';
import { LayoutDashboard, LogOut, Settings } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function UserAvatar({ user }: any) {
  const name = user?.name;
  const image = user?.image;

  // console.log('image,', image);
  const initials = generateInitials(name ? (name as string) : 'Uncle Moses');
  const role = user?.role;
  async function handleLogout() {
    await signOut({ callbackUrl: '/' });
    // router.push('/');
    location.reload();
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {user && (
          <>
            {image ? (
              <Image
                src={user.image ? user.image : '/profile.JPG'}
                alt="User profile"
                width={200}
                height={200}
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 p-4 text-sm flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-600">
                {initials}
              </div>
            )}
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="py-2 px-4 pr-8">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/dashboard" className="flex items-center space-x-2">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href="/dashboard/profile"
            className="flex items-center space-x-2"
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Edit Profile</span>
          </Link>
        </DropdownMenuItem>
        {role === 'USER' && (
          <DropdownMenuItem>
            <Link
              href="/dashboard/orders"
              className="flex items-center space-x-2"
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>My Orders</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
