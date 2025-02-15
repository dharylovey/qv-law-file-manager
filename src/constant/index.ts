import { NavItem } from '@/types';
import { BoxIcon } from 'lucide-react';

export const company = {
  name: 'Qv Law File Manager',
  logo: BoxIcon,
  plan: 'Premium',
};

export const newNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'dashboard',
    isActive: true,
    shortcut: ['d', 'd'],
    items: [],
  },
  {
    title: 'File Manager',
    url: '/file-manager',
    icon: 'file',
    isActive: false,
    shortcut: ['f', 'm'],
    items: [],
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: 'settings',
    isActive: false,
    shortcut: ['s', 'e'],
    items: [],
  },
];
