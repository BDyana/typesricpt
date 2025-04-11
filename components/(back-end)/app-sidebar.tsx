'use client';

import { Command, Frame, Headset, ImageIcon, LifeBuoy, List, Package, PieChart, Send, SquareTerminal, Tag, Users, UsersRound} from 'lucide-react';
import * as React from 'react';
import { useSession } from 'next-auth/react';
import { NavMain } from '@/components/(back-end)/nav-main';
import { NavProjects } from '@/components/(back-end)/nav-projects';
import { NavSecondary } from '@/components/(back-end)/nav-secondary';
import { NavUser } from '@/components/(back-end)/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { siteConfig } from '@/constants/site';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const role = session?.user?.role;

  const getNavConfig = (role: string | undefined) => {
    const baseConfig = {
      user: {
        name: session?.user?.name || 'User',
        email: session?.user?.email || '',
        avatar: session?.user?.image || '/default-avatar.png',
      },
      navSecondary: [
        // {
        //   title: 'Support',
        //   url: '#',
        //   icon: LifeBuoy,
        // },
        {
          title: 'View Site',
          url: '/',
          target: '_blank',
          icon: Send,
          className: 'font-bold text-md',
        },
      ],
    };

    switch (role) {
      case 'ADMIN':
        return {
          ...baseConfig,
          navMain: [
            {
              title: 'Dashboard',
              url: '/dashboard',
              icon: SquareTerminal,
              isActive: true,
            },
            {
              title: 'Catalogue',
              url: '#',
              icon: SquareTerminal,
              isActive: true,
              items: [
                {
                  title: 'Products',
                  url: '/dashboard/products',
                  icon: Package,
                },
                {
                  title: 'Categories',
                  url: '/dashboard/categories',
                  icon: List,
                },
                {
                  title: 'Brands',
                  url: '/dashboard/brands',
                  icon: List,
                },
                {
                  title: 'Coupons',
                  url: '/dashboard/coupons',
                  icon: Tag,
                },
                {
                  title: 'Store Banners',
                  url: '/dashboard/store-banners',
                  icon: ImageIcon,
                },
              ],
            },
            {
              title: 'People',
              url: '#',
              icon: SquareTerminal,
              isActive: true,
              items: [
                {
                  title: 'Customers',
                  url: '/dashboard/customers',
                  icon: Users,
                },
                {
                  title: 'Vendors',
                  url: '/dashboard/vendors',
                  icon: UsersRound,
                },
                // {
                //   title: 'Our Staff',
                //   url: '/dashboard/our-staff',
                //   icon: Headset,
                // },
              ],
            },
          ],
          projects: [
            {
              name: 'Orders',
              url: '/dashboard/orders',
              icon: Frame,
            },
            {
              name: 'Sales & Marketing',
              url: '#',
              icon: PieChart,
            },
          ],
        };
      case 'VENDOR':
        return {
          ...baseConfig,
          navMain: [
            {
              title: 'My Products',
              url: '/dashboard/my-products',
              icon: Package,
            },
          ],
          projects: [
            {
              name: 'My Routes',
              url: '/dashboard/my-routes',
              icon: Frame,
            },
            {
              name: 'My Customers',
              url: '/dashboard/my-customers',
              icon: Users,
            },
          ],
        };
      case 'USER':
        return {
          ...baseConfig,
          navMain: [],
          projects: [
            {
              name: 'My Orders',
              url: '/dashboard/orders',
              icon: Frame,
            },
          ],
        };
      case 'MODERATOR':
        return {
          ...baseConfig,
          navMain: [
            {
              title: 'Management',
              url: '#',
              icon: SquareTerminal,
              isActive: true,
              items: [
                {
                  title: 'Customers',
                  url: '/dashboard/customers',
                  icon: Users,
                },
                {
                  title: 'Vendors',
                  url: '/dashboard/vendors',
                  icon: UsersRound,
                },
              ],
            },
          ],
          projects: [],
        };
      default:
        return {
          ...baseConfig,
          navMain: [],
          projects: [],
        };
    }
  };

  const config = getNavConfig(role);

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {siteConfig.name}
                  </span>
                  <span className="truncate text-xs">{role || 'VENDOR'}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={config.navMain} />
        <NavProjects projects={config.projects} />
        <NavSecondary items={config.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={config.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
