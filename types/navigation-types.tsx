import { LucideIcon } from 'lucide-react';

// User Type
export interface User {
  name: string;
  email: string;
  avatar: string;
}

// Base Navigation Item Type
export interface BaseNavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
}

// Navigation Item with Nested Items
export interface NestedNavItem extends BaseNavItem {
  isActive?: boolean;
  items?: BaseNavItem[];
}

// Project Item Type
export interface ProjectItem extends BaseNavItem {
  name: string;
}

// Navigation Sections Types
export interface NavigationData {
  user: User;
  navMain: NestedNavItem[];
  navSecondary: BaseNavItem[];
  projects: ProjectItem[];
}
