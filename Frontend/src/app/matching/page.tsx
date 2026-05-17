'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, Ship, Calendar, DollarSign, Filter, Package, X, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Modal } from '@/components/ui/Modal';
import { KNOWN_PORTS, CONTAINER_CBM, ContainerType } from '@/types';

interface MockListing {
  id: string;
  originPort: string;
  destinationPort: string;
  containerType: ContainerType;
  availableCbm: number;
  totalCbm: number;
  pricePerCbm: number;
  departureDate: string;
  cutoffDate: string;
  shippingLine: string;
  status: 'open' | 'closing' | 'full';
}

const MOCK_LISTINGS: MockListing[] = [
  { id: 'LST-001', originPort: 'Shenzhen', destinationPort: 'Mombasa', containerType: '40HC', availableCbm: 32, totalCbm: 76.3, pricePerCbm: 42, departureDate: 'May 22, 2026', cutoffDate: 'May 18, 2026', shippingLine: 'Maersk', status: 'open' },
  { id: 'LST-002', originPort: 'Ningbo', destinationPort: 'Mombasa', containerType: '40ft', availableCbm: 18, totalCbm: 67.3, pricePerCbm: 39, departureDate: 'May 28, 2026', cutoffDate: 'May 24, 2026', shippingLine: 'MSC', status: 'open' },
  { id: 'LST-003', originPort: 'Shanghai', destinationPort: 'Dar es Salaam', containerType: '40HC', availableCbm: 12, totalCbm: 76.3, pricePerCbm: 45, departureDate: 'Jun 2, 2026', cutoffDate: 'May 29, 2026', shippingLine: 'CMA CGM', status: 'closing' },
  { id: 'LST-004', originPort: 'Guangzhou', destinationPort: 'Mombasa', containerType: '20ft', availableCbm: 8, totalCbm: 33.1, pricePerCbm: 48, departureDate: 'May 25, 2026', cutoffDate: 'May 21, 2026', shippingLine: 'COSCO', status: 'open' },
  { id: 'LST-005', originPort: 'Qingdao', destinationPort: 'Mombasa', containerType: '40HC', availableCbm: 45, totalCbm: 76.3, pricePerCbm: 36, departureDate: 'Jun 5, 2026', cutoffDate: 'Jun 1, 2026', shippingLine: 'Maersk', status: 'open' },
  { id: 'LST-006', originPort: 'Shenzhen', destinationPort: 'Nairobi ICD', containerType: '40ft', availableCbm: 22, totalCbm: 67.3, pricePerCbm: 44, departureDate: 'May 30, 2026', cutoffDate: 'May 26, 2026', shippingLine: 'MSC', status: 'open' },
  { id: 'LST-007', originPort: 'Ningbo', destinationPort: 'Mombasa', containerType: '20ft', availableCbm: 5, totalCbm: 33.1, pricePerCbm: 52, departureDate: 'May 20, 2026', cutoffDate: 'May 16, 2026', shippingLine: 'Hapag-Lloyd', status: 'closing' },
  { id: 'LST-008', originPort: 'Shanghai', destinationPort: 'Mombasa', containerType: '40HC', availableCbm: 28, totalCbm: 76.3, pricePerCbm: 40, departureDate: 'Jun 8, 2026', cutoffDate: 'Jun 4, 2026', shippingLine: 'CMA CGM', status: 'open' },
];

export default function MatchingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookingListing, setBookingListing] = useState<MockListing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchOrigin, setSearchOrigin] = useState('');
  const [searchDest, setSearchDest] = useState('');
  const [selectedContainerType, setSelectedContainerType] = useState<string>('');
  const [priceMax, setPriceMax] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleBookSpace = (listing: MockListing) => {
    setBookingListing(listing);
    setIsModalOpen(true);
  };

  const confirmBooking = () => {
    alert(`Booking request sent for ${bookingListing?.id}! The shipper will confirm shortly.`);
    setIsModalOpen(false);
  };

  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter((l) => {
      if (searchOrigin && !l.originPort.toLowerCase().includes(searchOrigin.toLowerCase())) return false;
      if (searchDest && !l.destinationPort.toLowerCase().includes(searchDest.toLowerCase())) return false;
      if (selectedContainerType && l.containerType !== selectedContainerType) return false;
      if (priceMax && l.pricePerCbm > Number(priceMax)) return false;
      return true;
    });
  }, [searchOrigin, searchDest, selectedContainerType, priceMax]);

  const fillRate = (listing: MockListing) =>
    Math.round(((listing.totalCbm - listing.availableCbm) / listing.totalCbm) * 100);

  return (
    <div className="min-h-screen bg-surface-50">
      <Navbar />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 pt-16 lg:pt-20 lg:pl-64 fade-in">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-surface-900">
                  Find Container Space
                </h1>
                <p className="text-surface-500 mt-1">
                  Browse available slack space on booked containers
                </p>
              </div>
              
              <Link href="/shipments/create">
                <Button className="gap-2">
                  <Ship className="w-4 h-4" />
                  List Your Space
                </Button>
              </Link>
            </div>

            <Card className="mb-8 p-4">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                    <input
                      type="text"
                      placeholder="Origin port..."
                      value={searchOrigin}
                      onChange={(e) => setSearchOrigin(e.target.value)}
                      className="input-field pl-10"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                    <input
                      type="text"
                      placeholder="Destination port..."
                      value={searchDest}
                      onChange={(e) => setSearchDest(e.target.value)}
                      className="input-field pl-10"
                    />
                  </div>
                  <Button
                    variant="secondary"
                    className="gap-2"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </Button>
                </div>

                {showFilters && (
                  <div className="flex flex-wrap gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-medium text-surface-500 mb-1">Container Type</label>
                      <select
                        value={selectedContainerType}
                        onChange={(e) => setSelectedContainerType(e.target.value)}
                        className="px-3 py-2 border border-surface-200 rounded-lg text-sm bg-white text-surface-700"
                      >
                        <option value="">All Types</option>
                        <option value="20ft">20ft (33.1 CBM)</option>
                        <option value="40ft">40ft (67.3 CBM)</option>
                        <option value="40HC">40HC (76.3 CBM)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-surface-500 mb-1">Max Price ($/CBM)</label>
                      <input
                        type="number"
                        placeholder="Any"
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                        className="px-3 py-2 border border-surface-200 rounded-lg text-sm bg-white text-surface-700 w-28"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <div className="text-xs font-medium text-surface-500 mb-2">Popular Routes</div>
                  <div className="flex flex-wrap gap-2">
                    {['Shenzhen → Mombasa', 'Ningbo → Mombasa', 'Shanghai → Dar es Salaam', 'Guangzhou → Mombasa', 'Shenzhen → Nairobi ICD'].map((route) => (
                      <button
                        key={route}
                        onClick={() => {
                          const parts = route.split(' → ');
                          setSearchOrigin(parts[0]);
                          setSearchDest(parts[1]);
                        }}
                        className="px-3 py-1.5 rounded-full text-sm bg-surface-100 text-surface-600 hover:bg-surface-200 transition-all"
                      >
                        {route}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              {filteredListings.map((listing) => (
                <Card key={listing.id} hover className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-surface-500 mb-1">
                        <Ship className="w-4 h-4" />
                        {listing.originPort}
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-primary-500" />
                        <span className="font-semibold text-surface-900">{listing.destinationPort}</span>
                      </div>
                    </div>
                    <Badge variant={listing.status === 'closing' ? 'warning' : listing.status === 'full' ? 'secondary' : 'primary'}>
                      {listing.status === 'closing' ? 'Closing Soon' : listing.status === 'full' ? 'Full' : 'Open'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-surface-500">Container</span>
                      <p className="font-medium text-surface-900">{listing.containerType}</p>
                    </div>
                    <div>
                      <span className="text-surface-500">Shipping Line</span>
                      <p className="font-medium text-surface-900">{listing.shippingLine}</p>
                    </div>
                    <div>
                      <span className="text-surface-500">Available</span>
                      <p className="font-medium text-surface-900">{listing.availableCbm} / {listing.totalCbm} CBM</p>
                    </div>
                    <div>
                      <span className="text-surface-500">Price</span>
                      <p className="font-bold text-accent-600">${listing.pricePerCbm}/CBM</p>
                    </div>
                    <div>
                      <span className="text-surface-500">Departs</span>
                      <p className="font-medium text-surface-900">{listing.departureDate}</p>
                    </div>
                    <div>
                      <span className="text-surface-500">Cutoff</span>
                      <p className="font-medium text-surface-900">{listing.cutoffDate}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-surface-500 mb-1">
                      <span>{fillRate(listing)}% filled</span>
                      <span>{listing.availableCbm} CBM left</span>
                    </div>
                    <div className="w-full bg-surface-100 rounded-full h-2">
                      <div
                        className="gradient-bg h-2 rounded-full transition-all"
                        style={{ width: `${fillRate(listing)}%` }}
                      />
                    </div>
                  </div>

                  <Button onClick={() => handleBookSpace(listing)} className="w-full" size="sm">
                    Book Space
                  </Button>
                </Card>
              ))}
            </div>

            {filteredListings.length === 0 && (
              <Card className="p-12 text-center">
                <Package className="w-12 h-12 text-surface-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-surface-900 mb-2">No space found</h3>
                <p className="text-surface-500 mb-6">
                  Try adjusting your search or check back later
                </p>
                <Link href="/shipments/create">
                  <Button variant="secondary">List Your Space</Button>
                </Link>
              </Card>
            )}

            <div className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-primary-600 shadow-card">
                    <Users className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-surface-900">Have container space to fill?</h3>
                    <p className="text-sm text-surface-600">
                      List your available container space and earn from what would otherwise ship empty
                    </p>
                  </div>
                </div>
                <Link href="/shipments/create">
                  <Button variant="secondary">List Your Space</Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Book Container Space"
      >
        {bookingListing && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-xl p-4 border border-accent-100">
              <div className="text-center">
                <div className="text-sm text-surface-600 mb-1">Price per CBM</div>
                <div className="text-4xl font-bold gradient-text">
                  ${bookingListing.pricePerCbm}
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-surface-100">
                <span className="text-surface-500">Route</span>
                <span className="font-medium text-surface-900">
                  {bookingListing.originPort} → {bookingListing.destinationPort}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-surface-100">
                <span className="text-surface-500">Container</span>
                <span className="font-medium text-surface-900">{bookingListing.containerType}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-surface-100">
                <span className="text-surface-500">Available</span>
                <span className="font-medium text-surface-900">{bookingListing.availableCbm} CBM</span>
              </div>
              <div className="flex justify-between py-2 border-b border-surface-100">
                <span className="text-surface-500">Shipping Line</span>
                <span className="font-medium text-surface-900">{bookingListing.shippingLine}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-surface-100">
                <span className="text-surface-500">Departure</span>
                <span className="font-medium text-surface-900">{bookingListing.departureDate}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-surface-500">Cutoff</span>
                <span className="font-medium text-surface-900">{bookingListing.cutoffDate}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-primary-50 border border-primary-100">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-5 h-5 text-primary-600" />
                <span className="font-semibold text-primary-700">How much space do you need?</span>
              </div>
              <p className="text-sm text-primary-600">
                Enter the CBM you need and we'll calculate the total. The shipper will confirm availability within 24 hours.
              </p>
            </div>

            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-surface-700 mb-1">CBM needed</label>
                <input
                  type="number"
                  placeholder="e.g. 5"
                  max={bookingListing.availableCbm}
                  className="input-field w-full"
                />
              </div>
              <Button onClick={confirmBooking}>
                Send Request
              </Button>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
