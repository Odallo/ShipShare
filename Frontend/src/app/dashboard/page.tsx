'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Ship, Package, DollarSign, Plus, MapPin, ArrowRight, Clock, LogOut, Users, Search, TrendingUp, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { ContainerListing, Booking, DashboardStats } from '@/types';

const MOCK_LISTINGS: ContainerListing[] = [
  { id: 'LST-001', shipperId: '1', shipperName: 'Maersk Logistics', shipperVerified: true, originPort: 'Shenzhen', destinationPort: 'Mombasa', containerType: '40HC', totalCbm: 76.3, availableCbm: 32, pricePerCbm: 42, departureDate: 'May 22, 2026', cutoffDate: 'May 18, 2026', shippingLine: 'Maersk', status: 'published', createdAt: '2026-05-01' },
  { id: 'LST-002', shipperId: '1', shipperName: 'Maersk Logistics', shipperVerified: true, originPort: 'Ningbo', destinationPort: 'Mombasa', containerType: '40ft', totalCbm: 67.3, availableCbm: 18, pricePerCbm: 39, departureDate: 'May 28, 2026', cutoffDate: 'May 24, 2026', shippingLine: 'MSC', status: 'published', createdAt: '2026-05-03' },
  { id: 'LST-003', shipperId: '1', shipperName: 'Maersk Logistics', shipperVerified: true, originPort: 'Shanghai', destinationPort: 'Dar es Salaam', containerType: '40HC', totalCbm: 76.3, availableCbm: 12, pricePerCbm: 45, departureDate: 'Jun 2, 2026', cutoffDate: 'May 29, 2026', shippingLine: 'CMA CGM', status: 'fully_booked', createdAt: '2026-04-28' },
];

const MOCK_BOOKINGS: Booking[] = [
  { id: 'BKG-001', listingId: 'LST-001', fillerId: '2', fillerName: 'James Kariuki', cbmBooked: 5, totalPrice: 210, status: 'approved', createdAt: '2026-05-10' },
  { id: 'BKG-002', listingId: 'LST-002', fillerId: '2', fillerName: 'Amina Hassan', cbmBooked: 8, totalPrice: 312, status: 'pending', createdAt: '2026-05-12' },
  { id: 'BKG-003', listingId: 'LST-001', fillerId: '2', fillerName: 'Peter Otieno', cbmBooked: 3, totalPrice: 126, status: 'paid', createdAt: '2026-05-08' },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('containershare_user');
      if (!storedUser && !user) {
        router.push('/auth/login');
        return;
      }
    }
    setIsLoading(false);
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const storedUser = typeof window !== 'undefined' ? localStorage.getItem('containershare_user') : null;
  const currentUser = user || (storedUser ? JSON.parse(storedUser) : null);

  if (!currentUser) return null;

  const role = currentUser.role || 'filler';

  return (
    <div className="min-h-screen bg-surface-50">
      <Navbar />
      
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 pt-16 lg:pt-20 lg:pl-64 fade-in">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-surface-900">
                  Welcome back, {currentUser.name?.split(' ')[0] || 'User'}!
                </h1>
                <p className="text-surface-500 mt-1">
                  {role === 'shipper'
                    ? 'Manage your container listings and booking requests.'
                    : 'Track your bookings and find new container space.'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-white rounded-xl border border-surface-100">
                  <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white font-semibold">
                    {currentUser.name?.charAt(0) || 'U'}
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-surface-900 text-sm">{currentUser.name}</div>
                    <div className="text-xs text-surface-500">{currentUser.email}</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {role === 'shipper' ? <ShipperDashboard /> : <FillerDashboard />}
          </div>
        </main>
      </div>
    </div>
  );
}

function ShipperDashboard() {
  const listings = MOCK_LISTINGS;
  const bookingRequests = MOCK_BOOKINGS;
  const stats: DashboardStats = {
    totalListings: listings.length,
    activeListings: listings.filter(l => l.status === 'published').length,
    totalBookings: bookingRequests.filter(b => b.status !== 'cancelled').length,
    cbmSold: bookingRequests.filter(b => b.status === 'paid' || b.status === 'shipped').reduce((a, b) => a + b.cbmBooked, 0),
    totalEarned: bookingRequests.filter(b => b.status === 'paid' || b.status === 'shipped').reduce((a, b) => a + b.totalPrice, 0),
    moneySaved: 0,
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-surface-500">Active Listings</p>
              <p className="text-2xl font-bold text-surface-900 mt-1">{stats.activeListings}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
              <Ship className="w-6 h-6" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-surface-500">Total Bookings</p>
              <p className="text-2xl font-bold text-surface-900 mt-1">{stats.totalBookings}</p>
            </div>
            <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center text-secondary-600">
              <Package className="w-6 h-6" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-surface-500">CBM Sold</p>
              <p className="text-2xl font-bold text-accent-600 mt-1">{stats.cbmSold} CBM</p>
            </div>
            <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center text-accent-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </Card>
        <Card className="p-6 gradient-bg text-white border-none">
          <div className="flex items-center justify-between h-full">
            <div>
              <p className="text-primary-100 text-sm">Earned</p>
              <p className="font-semibold mt-1 text-lg">${stats.totalEarned}</p>
            </div>
            <Link href="/shipments/create">
              <Button size="sm" variant="secondary" className="mt-2">
                <Plus className="w-4 h-4 mr-1" />
                New Listing
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-surface-900">Your Listings</h2>
          </div>

          {listings.length === 0 ? (
            <Card className="p-8 text-center">
              <Ship className="w-12 h-12 text-surface-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-surface-900 mb-2">No listings yet</h3>
              <p className="text-surface-500 mb-4">Create your first container listing</p>
              <Link href="/shipments/create">
                <Button>Create Listing</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {listings.map((listing) => (
                <Card key={listing.id} hover className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 shrink-0">
                        <Ship className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-surface-900">{listing.id}</span>
                          <Badge variant={listing.status === 'published' ? 'primary' : listing.status === 'fully_booked' ? 'secondary' : 'success'}>
                            {listing.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-surface-500">
                          <MapPin className="w-3 h-3" />
                          {listing.originPort} → {listing.destinationPort}
                        </div>
                        <div className="text-xs text-surface-400 mt-1">
                          {listing.containerType} — {listing.availableCbm}/{listing.totalCbm} CBM — ${listing.pricePerCbm}/CBM
                        </div>
                      </div>
                    </div>
                    <div className="sm:text-right sm:pl-4 sm:border-l border-surface-100">
                      <div className="text-sm text-surface-500">{listing.departureDate}</div>
                      <Link href="/matching">
                        <Button size="sm" variant="ghost" className="gap-1">
                          <Eye className="w-3 h-3" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-surface-900">Booking Requests</h2>
          {bookingRequests.length === 0 ? (
            <Card className="p-6 text-center">
              <Package className="w-8 h-8 text-surface-300 mx-auto mb-2" />
              <p className="text-sm text-surface-500">No requests yet</p>
            </Card>
          ) : (
            bookingRequests.slice(0, 3).map((booking) => (
              <Card key={booking.id} hover className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium text-surface-900 text-sm">{booking.fillerName}</div>
                    <div className="text-xs text-surface-500">{booking.cbmBooked} CBM — ${booking.totalPrice}</div>
                  </div>
                  <Badge variant={booking.status === 'pending' ? 'warning' : booking.status === 'approved' ? 'primary' : 'success'}>
                    {booking.status}
                  </Badge>
                </div>
                {booking.status === 'pending' && (
                  <div className="flex gap-2 mt-3">
                    <Button size="xs" variant="primary" className="text-xs py-1 px-3">Approve</Button>
                    <Button size="xs" variant="secondary" className="text-xs py-1 px-3">Decline</Button>
                  </div>
                )}
              </Card>
            ))
          )}
          <Card className="p-5 bg-gradient-to-br from-accent-50 to-primary-50 border-accent-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center text-accent-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-surface-900">Total Earnings</div>
                <div className="text-xs text-surface-500">From bookings</div>
              </div>
            </div>
            <div className="text-3xl font-bold text-accent-600">${stats.totalEarned}</div>
          </Card>
        </div>
      </div>
    </>
  );
}

function FillerDashboard() {
  const bookings = MOCK_BOOKINGS;
  const stats = {
    activeBookings: bookings.filter(b => b.status === 'approved' || b.status === 'paid').length,
    totalBookings: bookings.length,
    totalCbm: bookings.reduce((a, b) => a + b.cbmBooked, 0),
    totalSpent: bookings.filter(b => b.status === 'paid' || b.status === 'shipped').reduce((a, b) => a + b.totalPrice, 0),
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-surface-500">Active Bookings</p>
              <p className="text-2xl font-bold text-surface-900 mt-1">{stats.activeBookings}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
              <Package className="w-6 h-6" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-surface-500">Total Bookings</p>
              <p className="text-2xl font-bold text-surface-900 mt-1">{stats.totalBookings}</p>
            </div>
            <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center text-secondary-600">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-surface-500">Total CBM</p>
              <p className="text-2xl font-bold text-accent-600 mt-1">{stats.totalCbm} CBM</p>
            </div>
            <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center text-accent-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </Card>
        <Card className="p-6 gradient-bg text-white border-none">
          <div className="flex items-center justify-between h-full">
            <div>
              <p className="text-primary-100 text-sm">Quick Action</p>
              <p className="font-semibold mt-1">Find Space</p>
            </div>
            <Link href="/matching">
              <Button size="sm" variant="secondary" className="mt-2">
                <Search className="w-4 h-4 mr-1" />
                Browse
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-surface-900">Your Bookings</h2>
          </div>

          {bookings.length === 0 ? (
            <Card className="p-8 text-center">
              <Package className="w-12 h-12 text-surface-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-surface-900 mb-2">No bookings yet</h3>
              <p className="text-surface-500 mb-4">Browse available container space</p>
              <Link href="/matching">
                <Button>Find Space</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const listing = MOCK_LISTINGS.find(l => l.id === booking.listingId);
                return (
                  <Card key={booking.id} hover className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 shrink-0">
                          <Package className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-surface-900">{booking.id}</span>
                            <Badge variant={booking.status === 'pending' ? 'warning' : booking.status === 'approved' ? 'primary' : booking.status === 'paid' ? 'secondary' : 'success'}>
                              {booking.status}
                            </Badge>
                          </div>
                          {listing && (
                            <div className="flex items-center gap-2 text-sm text-surface-500">
                              <MapPin className="w-3 h-3" />
                              {listing.originPort} → {listing.destinationPort}
                            </div>
                          )}
                          <div className="text-xs text-surface-400 mt-1">
                            {booking.cbmBooked} CBM — ${booking.totalPrice}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold text-surface-900">Quick Search</div>
                <div className="text-xs text-surface-500">Find container space</div>
              </div>
            </div>
            <Link href="/matching">
              <Button variant="secondary" size="sm" className="w-full gap-2">
                <Search className="w-4 h-4" />
                Browse Available Space
              </Button>
            </Link>
          </Card>

          <Card className="p-5 bg-gradient-to-br from-accent-50 to-primary-50 border-accent-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center text-accent-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-surface-900">Total Spent</div>
                <div className="text-xs text-surface-500">On bookings</div>
              </div>
            </div>
            <div className="text-3xl font-bold text-accent-600">${stats.totalSpent}</div>
          </Card>
        </div>
      </div>
    </>
  );
}
