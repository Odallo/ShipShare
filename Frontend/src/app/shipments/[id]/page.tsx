'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Ship, MapPin, Calendar, DollarSign, Package, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { CONTAINER_CBM, ContainerType, ContainerListing } from '@/types';

const MOCK_LISTING: ContainerListing = {
  id: 'LST-001',
  shipperId: '1',
  shipperName: 'Maersk Logistics',
  shipperVerified: true,
  originPort: 'Shenzhen',
  destinationPort: 'Mombasa',
  containerType: '40HC',
  totalCbm: 76.3,
  availableCbm: 32,
  pricePerCbm: 42,
  departureDate: 'May 22, 2026',
  cutoffDate: 'May 18, 2026',
  shippingLine: 'Maersk',
  status: 'published',
  createdAt: '2026-05-01',
};

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const listingId = params.id as string;

  const fillRate = Math.round(
    ((MOCK_LISTING.totalCbm - MOCK_LISTING.availableCbm) / MOCK_LISTING.totalCbm) * 100
  );

  return (
    <div className="min-h-screen bg-surface-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pt-16 lg:pt-20 lg:pl-64 fade-in">
          <div className="p-6 lg:p-8 max-w-3xl mx-auto">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <Card className="p-6 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-surface-900 mb-1">
                    {MOCK_LISTING.originPort} → {MOCK_LISTING.destinationPort}
                  </h1>
                  <p className="text-surface-500 text-sm">Listing ID: {listingId}</p>
                </div>
                <Badge variant="primary">Open</Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-xs text-surface-500 mb-1">Container</div>
                  <div className="font-semibold text-surface-900">{MOCK_LISTING.containerType}</div>
                  <div className="text-xs text-surface-400">{MOCK_LISTING.totalCbm} CBM total</div>
                </div>
                <div>
                  <div className="text-xs text-surface-500 mb-1">Available Space</div>
                  <div className="font-semibold text-surface-900">{MOCK_LISTING.availableCbm} CBM</div>
                  <div className="text-xs text-surface-400">{fillRate}% filled</div>
                </div>
                <div>
                  <div className="text-xs text-surface-500 mb-1">Price</div>
                  <div className="font-semibold text-accent-600">${MOCK_LISTING.pricePerCbm}/CBM</div>
                </div>
                <div>
                  <div className="text-xs text-surface-500 mb-1">Shipping Line</div>
                  <div className="font-semibold text-surface-900">{MOCK_LISTING.shippingLine}</div>
                </div>
                <div>
                  <div className="text-xs text-surface-500 mb-1">Departure</div>
                  <div className="font-semibold text-surface-900">{MOCK_LISTING.departureDate}</div>
                </div>
                <div>
                  <div className="text-xs text-surface-500 mb-1">Cutoff</div>
                  <div className="font-semibold text-surface-900">{MOCK_LISTING.cutoffDate}</div>
                </div>
              </div>

              <div className="w-full bg-surface-100 rounded-full h-3 mb-2">
                <div className="gradient-bg h-3 rounded-full" style={{ width: `${fillRate}%` }} />
              </div>
              <div className="flex justify-between text-xs text-surface-500">
                <span>{fillRate}% filled</span>
                <span>{MOCK_LISTING.availableCbm} CBM remaining</span>
              </div>
            </Card>

            {MOCK_LISTING.shipperVerified && (
              <Card className="p-4 mb-6 bg-accent-50 border-accent-100">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-accent-600" />
                  <div className="text-sm text-accent-700">
                    <span className="font-semibold">{MOCK_LISTING.shipperName}</span> is a verified shipper
                  </div>
                </div>
              </Card>
            )}

            <Link href="/matching">
              <Button className="w-full">Back to Browse</Button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
