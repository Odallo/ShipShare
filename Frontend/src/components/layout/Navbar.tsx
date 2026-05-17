'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Ship, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const role = user?.role;

  const navLinks = [
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/matching', label: 'Find Space' },
    { href: '/pricing', label: 'Pricing' },
  ];

  const primaryCta = () => {
    if (role === 'shipper' || role === 'both') {
      return { href: '/shipments/create', label: 'List Space', icon: Ship };
    }
    return { href: '/matching', label: 'Find Space', icon: Search };
  };

  const cta = isAuthenticated ? primaryCta() : null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-surface-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <Ship className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-surface-900">ShipShare</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-surface-600 hover:text-surface-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                {cta && (
                  <Link href={cta.href}>
                    <Button className="gap-2">
                      <cta.icon className="w-4 h-4" />
                      {cta.label}
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-surface-100">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-surface-600 hover:text-surface-900"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-surface-100 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full">Dashboard</Button>
                  </Link>
                  {cta && (
                    <Link href={cta.href} onClick={() => setIsOpen(false)}>
                      <Button className="w-full gap-2">
                        <cta.icon className="w-4 h-4" />
                        {cta.label}
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                    <Button variant="secondary" className="w-full">Login</Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
