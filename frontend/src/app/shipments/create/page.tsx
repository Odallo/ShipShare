'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ShipmentWizard } from '@/components/forms/ShipmentWizard';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';

export default function CreateShipmentPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Create New Shipment
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Fill in the details below to create your shipment and find matching groups
              </p>
            </div>
            
            {/* Wizard */}
            <ShipmentWizard />
          </div>
        </main>
      </div>
    </div>
  );
}