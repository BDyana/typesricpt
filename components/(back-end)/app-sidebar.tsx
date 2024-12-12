'use client';

import {
  Command,
  Frame,
  Headset,
  ImageIcon,
  LifeBuoy,
  List,
  Map,
  Package,
  PieChart,
  Send,
  SquareTerminal,
  Tag,
  Users,
  UsersRound,
} from 'lucide-react';
import * as React from 'react';

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

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
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
          title: 'Farmers',
          url: '/dashboard/farmers',
          icon: UsersRound,
        },
        {
          title: 'Our Staff',
          url: '/dashboard/our-staff',
          icon: Headset,
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
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
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
