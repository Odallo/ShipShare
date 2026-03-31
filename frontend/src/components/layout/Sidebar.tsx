'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, Truck, Users, Settings, MapPin } from 'lucide-react';
import clsx from 'clsx';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Shipments', href: '/dashboard/shipments', icon: Package },
  { name: 'Active Groups', href: '/dashboard/groups', icon: Users },
  { name: 'Find Matches', href: '/matching', icon: Truck },
  { name: 'Track Shipments', href: '/dashboard/tracking', icon: MapPin },
  { name: 'Settings', href: '/profile', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  
  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <nav className="mt-8 px-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};