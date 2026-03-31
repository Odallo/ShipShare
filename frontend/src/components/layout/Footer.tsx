import React from 'react';
import { Package, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Package className="h-6 w-6 text-primary-600" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">ShipShare</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Making shipping in Kenya affordable through group shipments.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">About Us</Link></li>
              <li><Link href="/how-it-works" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">How It Works</Link></li>
              <li><Link href="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Pricing</Link></li>
              <li><Link href="/faq" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Contact Us</Link></li>
              <li><Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Made with ❤️ for Kenyan shippers
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          © 2024 ShipShare Kenya. All rights reserved.
        </div>
      </div>
    </footer>
  );
};