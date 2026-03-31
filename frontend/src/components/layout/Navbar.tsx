'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Package, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAuthenticated = true; // Mock auth state
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Create Shipment', href: '/shipments/create' },
    { name: 'Find Groups', href: '/matching' },
  ];
  
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">ShipShare</span>
              <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">Kenya</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/50'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link href="/profile">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button variant="danger" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      pathname === item.href
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" fullWidth>Profile</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" fullWidth>Login</Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button size="sm" fullWidth>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};