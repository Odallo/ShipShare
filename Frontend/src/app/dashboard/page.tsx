'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Ship, Package, DollarSign, Plus, MapPin, ArrowRight, Clock,
  LogOut, Search, TrendingUp, Container, BarChart3, Activity,
  Calendar, Users, ChevronRight, Eye, CheckCircle2, XCircle,
  AlertCircle, Box, ArrowUpRight, ArrowDownRight, LayoutGrid,
  List, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { ContainerListing, Booking } from '@/types';

type RoleTab = 'overview' | 'listings' | 'bookings' | 'analytics';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isInitializing, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<RoleTab>('overview');

  useEffect(() => {
    if (isInitializing) return;
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('containershare_user');
      if (!storedUser && !user) {
        router.push('/auth/login');
        return;
      }
    }
    setIsLoading(false);
  }, [user, isInitializing, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin w-10 h-10 border-[3px] border-primary-500 border-t-transparent rounded-full" />
          <p className="text-surface-400 text-sm font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const storedUser = typeof window !== 'undefined' ? localStorage.getItem('containershare_user') : null;
  const currentUser = user || (storedUser ? JSON.parse(storedUser) : null);
  if (!currentUser) return null;

  const role = currentUser.role || 'filler';
  const isShipper = role === 'shipper' || role === 'both';
  const initial = currentUser.name?.charAt(0) || 'U';

  const tabs: { key: RoleTab; label: string; icon: typeof LayoutGrid }[] = [
    { key: 'overview', label: 'Overview', icon: LayoutGrid },
    { key: 'listings', label: 'Listings', icon: Container },
    { key: 'bookings', label: 'Bookings', icon: Package },
    { key: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-surface-50">
      <Navbar />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 pt-16 lg:pt-20 lg:pl-64">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center text-white text-lg font-bold shadow-glow">
                    {initial}
                  </div>
                  <div>
                    <h1 className="text-xl lg:text-2xl font-bold text-surface-900">
                      Welcome back, {currentUser.name?.split(' ')[0] || 'User'}
                    </h1>
                    <p className="text-sm text-surface-500">
                      {isShipper
                        ? 'Manage your container listings and booking requests'
                        : 'Track your bookings and find new container space'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-surface-500 hover:text-red-600 hover:bg-red-50">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 border border-surface-100 overflow-x-auto">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.key
                        ? 'bg-primary-50 text-primary-700 shadow-sm'
                        : 'text-surface-500 hover:text-surface-700 hover:bg-surface-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {activeTab === 'overview' && (
              isShipper
                ? <ShipperOverview userId={currentUser.id} />
                : <FillerOverview />
            )}
            {activeTab === 'listings' && isShipper && <ShipperListings userId={currentUser.id} />}
            {activeTab === 'bookings' && <UserBookings />}
            {activeTab === 'analytics' && <AnalyticsView userId={currentUser.id} isShipper={isShipper} />}
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sublabel, trend, color }: {
  icon: typeof Package;
  label: string;
  value: string | number;
  sublabel?: string;
  trend?: 'up' | 'down';
  color: string;
}) {
  const bgColors: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    teal: 'bg-teal-100 text-teal-600',
    pink: 'bg-pink-100 text-pink-600',
  };

  const dotColors: Record<string, string> = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    teal: 'bg-teal-500',
    pink: 'bg-pink-500',
  };

  return (
    <div className="bg-white rounded-2xl border border-surface-100 p-5 hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 group">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-11 h-11 rounded-xl ${bgColors[color] || bgColors.blue} flex items-center justify-center transition-transform group-hover:scale-110 duration-200`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={`flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-full ${
            trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}>
            {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {sublabel}
          </span>
        )}
      </div>
      <div className={`h-1 rounded-full ${dotColors[color] || dotColors.blue} w-1/3 mb-3 transition-all duration-300 group-hover:w-2/3`} />
      <p className="text-2xl font-bold text-surface-900 tracking-tight">{value}</p>
      <p className="text-sm text-surface-500 mt-0.5">{label}</p>
    </div>
  );
}

function ShipperOverview({ userId }: { userId: string }) {
  const [listings, setListings] = useState<ContainerListing[]>([]);
  const [bookingRequests, setBookingRequests] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/listings?shipperId=${userId}`).then(r => r.json()),
      fetch('/api/bookings').then(r => r.json()),
    ]).then(([listingsData, bookingsData]) => {
      setListings(listingsData.listings || []);
      setBookingRequests(bookingsData.bookings || []);
    }).finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="w-6 h-6 text-primary-500 animate-spin" />
      </div>
    );
  }

  const active = listings.filter(l => l.status === 'published').length;
  const totalBookings = bookingRequests.filter(b => b.status !== 'cancelled').length;
  const pending = bookingRequests.filter(b => b.status === 'pending').length;
  const totalCbm = listings.reduce((a, l) => a + (l.totalCbm || 0), 0);
  const availableCbm = listings.reduce((a, l) => a + (l.availableCbm || 0), 0);
  const fillRate = totalCbm > 0 ? Math.round(((totalCbm - availableCbm) / totalCbm) * 100) : 0;
  const earnings = bookingRequests
    .filter(b => b.status === 'paid' || b.status === 'shipped')
    .reduce((a, b) => a + b.totalPrice, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Ship} label="Active Listings" value={active} sublabel="Total" trend="up" color="blue" />
        <StatCard icon={Package} label="Total Bookings" value={totalBookings} sublabel={pending ? `${pending} pending` : 'All clear'} color="purple" />
        <StatCard icon={Activity} label="Fill Rate" value={`${fillRate}%`} sublabel={`${Math.round(availableCbm)} CBM left`} color="teal" />
        <StatCard icon={DollarSign} label="Earnings" value={`$${earnings}`} sublabel="Total earned" color="green" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-surface-900">Your Listings</h2>
            <Link href="/shipments/create">
              <Button size="sm" className="gap-1.5">
                <Plus className="w-4 h-4" />
                New Listing
              </Button>
            </Link>
          </div>

          {listings.length === 0 ? (
            <EmptyState
              icon={Container}
              title="No listings yet"
              description="Create your first container listing to start earning"
              action={{ label: 'Create Listing', href: '/shipments/create' }}
            />
          ) : (
            <div className="space-y-3">
              {listings.slice(0, 4).map((listing, i) => (
                <ListingCard key={listing.id} listing={listing} index={i} />
              ))}
              {listings.length > 4 && (
                <button className="w-full text-center py-3 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-xl transition-colors">
                  View all {listings.length} listings <ChevronRight className="w-4 h-4 inline" />
                </button>
              )}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-surface-900">
            Booking Requests
            {pending > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold">
                {pending}
              </span>
            )}
          </h2>

          {bookingRequests.length === 0 ? (
            <EmptyState
              icon={Package}
              title="No requests yet"
              description="Requests from fillers will appear here"
              compact
            />
          ) : (
            <div className="space-y-3">
              {bookingRequests.slice(0, 3).map(booking => (
                <BookingRequestCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}

          <QuickActions isShipper />
        </div>
      </div>
    </div>
  );
}

function FillerOverview() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bookings').then(r => r.json()).then(data => {
      setBookings(data.bookings || []);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="w-6 h-6 text-primary-500 animate-spin" />
      </div>
    );
  }

  const active = bookings.filter(b => b.status === 'approved' || b.status === 'paid').length;
  const pending = bookings.filter(b => b.status === 'pending').length;
  const totalCbm = bookings.reduce((a, b) => a + b.cbmBooked, 0);
  const spent = bookings.filter(b => b.status === 'paid' || b.status === 'shipped').reduce((a, b) => a + b.totalPrice, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Active Bookings" value={active} sublabel="In progress" color="blue" />
        <StatCard icon={Clock} label="Pending" value={pending} sublabel="Awaiting approval" color="orange" />
        <StatCard icon={Activity} label="Total CBM" value={`${totalCbm} CBM`} sublabel="Booked space" color="purple" />
        <StatCard icon={DollarSign} label="Total Spent" value={`$${spent}`} sublabel="All time" color="green" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-surface-900">Your Bookings</h2>

          {bookings.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No bookings yet"
              description="Browse available container space and book your first shipment"
              action={{ label: 'Find Space', href: '/matching' }}
            />
          ) : (
            <div className="space-y-3">
              {bookings.slice(0, 4).map((booking, i) => (
                <BookingCard key={booking.id} booking={booking} index={i} />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <QuickActions isShipper={false} />
        </div>
      </div>
    </div>
  );
}

function ShipperListings({ userId }: { userId: string }) {
  const [listings, setListings] = useState<ContainerListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/listings?shipperId=${userId}`).then(r => r.json()).then(data => {
      setListings(data.listings || []);
    }).finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div className="flex justify-center py-20"><RefreshCw className="w-6 h-6 text-primary-500 animate-spin" /></div>;

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <p className="text-sm text-surface-500">{listings.length} listing{listings.length !== 1 ? 's' : ''}</p>
        <Link href="/shipments/create">
          <Button size="sm" className="gap-1.5">
            <Plus className="w-4 h-4" />
            New Listing
          </Button>
        </Link>
      </div>

      {listings.length === 0 ? (
        <EmptyState
          icon={Container}
          title="No listings yet"
          description="Create your first container listing to start earning from spare capacity"
          action={{ label: 'Create Listing', href: '/shipments/create' }}
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {listings.map((listing, i) => (
            <ListingDetailCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function UserBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bookings').then(r => r.json()).then(data => {
      setBookings(data.bookings || []);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><RefreshCw className="w-6 h-6 text-primary-500 animate-spin" /></div>;

  return (
    <div className="space-y-4 animate-fade-in">
      <p className="text-sm text-surface-500">{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</p>

      {bookings.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No bookings yet"
          description="Your booking history will appear here once you book or receive a booking"
          action={{ label: 'Browse Space', href: '/matching' }}
        />
      ) : (
        <div className="space-y-3">
          {bookings.map((booking, i) => (
            <BookingDetailCard key={booking.id} booking={booking} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function AnalyticsView({ userId, isShipper }: { userId: string; isShipper: boolean }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-surface-900">Volume Trend</h3>
            <BarChart3 className="w-5 h-5 text-surface-400" />
          </div>
          <div className="h-48 flex items-center justify-center bg-surface-50 rounded-xl">
            <p className="text-surface-400 text-sm">Chart will appear with more data</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-surface-900">Geographic Distribution</h3>
            <MapPin className="w-5 h-5 text-surface-400" />
          </div>
          <div className="h-48 flex items-center justify-center bg-surface-50 rounded-xl">
            <p className="text-surface-400 text-sm">Map view coming soon</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

function ListingCard({ listing, index }: { listing: ContainerListing; index: number }) {
  const statusVariant = listing.status === 'published' ? 'primary' : listing.status === 'fully_booked' ? 'success' : 'secondary';
  const fillPercent = listing.totalCbm > 0 ? Math.round(((listing.totalCbm - (listing.availableCbm || 0)) / listing.totalCbm) * 100) : 0;

  return (
    <Link href={`/shipments/${listing.id}`} className="block">
      <Card hover className="p-4 slide-up" style={{ animationDelay: `${index * 50}ms` }}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
              <Ship className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-surface-900 text-sm truncate">{listing.originPort}</span>
                <ArrowRight className="w-3 h-3 text-surface-400 shrink-0" />
                <span className="font-semibold text-surface-900 text-sm">{listing.destinationPort}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-surface-500">
                <span>{listing.containerType}</span>
                <span className="w-1 h-1 rounded-full bg-surface-300" />
                <span>{listing.shippingLine}</span>
              </div>
            </div>
          </div>
          <Badge variant={statusVariant}>{listing.status.replace('_', ' ')}</Badge>
        </div>

        <div className="mt-3">
          <div className="flex justify-between text-xs text-surface-500 mb-1">
            <span>{listing.availableCbm || 0}/{listing.totalCbm} CBM available</span>
            <span>${listing.pricePerCbm}/CBM</span>
          </div>
          <div className="w-full bg-surface-100 rounded-full h-1.5">
            <div
              className="bg-primary-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>
      </Card>
    </Link>
  );
}

function ListingDetailCard({ listing, index }: { listing: ContainerListing; index: number }) {
  const fillPercent = listing.totalCbm > 0 ? Math.round(((listing.totalCbm - (listing.availableCbm || 0)) / listing.totalCbm) * 100) : 0;
  const statusVariant = listing.status === 'published' ? 'primary' : listing.status === 'fully_booked' ? 'success' : 'secondary';

  return (
    <Card className="p-5 slide-up" style={{ animationDelay: `${index * 50}ms` }}>
      <div className="flex items-start justify-between mb-3">
        <Badge variant={statusVariant}>{listing.status.replace('_', ' ')}</Badge>
        <div className="flex gap-2">
          <Link href={`/shipments/${listing.id}`}>
            <Button size="sm" variant="ghost">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm font-medium text-surface-900 mb-3">
        <MapPin className="w-4 h-4 text-primary-500" />
        {listing.originPort}
        <ArrowRight className="w-3 h-3 text-surface-400" />
        {listing.destinationPort}
      </div>
      <div className="grid grid-cols-3 gap-3 text-sm mb-3">
        <div>
          <p className="text-surface-400 text-xs">Container</p>
          <p className="font-medium text-surface-900">{listing.containerType}</p>
        </div>
        <div>
          <p className="text-surface-400 text-xs">Price</p>
          <p className="font-medium text-accent-600">${listing.pricePerCbm}/CBM</p>
        </div>
        <div>
          <p className="text-surface-400 text-xs">Departs</p>
          <p className="font-medium text-surface-900">{listing.departureDate}</p>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-xs text-surface-500 mb-1">
          <span>{listing.availableCbm || 0}/{listing.totalCbm} CBM</span>
          <span>{fillPercent}% filled</span>
        </div>
        <div className="w-full bg-surface-100 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${fillPercent}%` }}
          />
        </div>
      </div>
    </Card>
  );
}

function BookingCard({ booking, index }: { booking: Booking; index: number }) {
  const statusVariant = booking.status === 'pending' ? 'warning' : booking.status === 'approved' ? 'primary' : booking.status === 'paid' ? 'success' : 'secondary';

  return (
    <Card hover className="p-4 slide-up" style={{ animationDelay: `${index * 50}ms` }}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-secondary-50 flex items-center justify-center text-secondary-600 shrink-0">
            <Package className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-surface-900 text-sm">{booking.id}</span>
              <Badge variant={statusVariant}>{booking.status}</Badge>
            </div>
            <p className="text-xs text-surface-500 mt-0.5">
              {booking.cbmBooked} CBM — ${booking.totalPrice}
            </p>
          </div>
        </div>
        <Calendar className="w-4 h-4 text-surface-400 shrink-0" />
      </div>
    </Card>
  );
}

function BookingDetailCard({ booking, index }: { booking: Booking; index: number }) {
  const statusVariant = booking.status === 'pending' ? 'warning' : booking.status === 'approved' ? 'primary' : booking.status === 'paid' ? 'success' : booking.status === 'cancelled' ? 'secondary' : 'success';
  const statusIcon = booking.status === 'cancelled' ? XCircle : booking.status === 'approved' ? CheckCircle2 : booking.status === 'paid' ? CheckCircle2 : AlertCircle;

  return (
    <Card className="p-4 slide-up" style={{ animationDelay: `${index * 50}ms` }}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            booking.status === 'cancelled' ? 'bg-red-100 text-red-600' :
            booking.status === 'approved' || booking.status === 'paid' ? 'bg-green-100 text-green-600' :
            'bg-orange-100 text-orange-600'
          }`}>
            <statusIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-surface-900 text-sm">{booking.id}</span>
              <Badge variant={statusVariant}>{booking.status}</Badge>
            </div>
            <p className="text-xs text-surface-500 mt-0.5">{booking.cbmBooked} CBM — ${booking.totalPrice}</p>
          </div>
        </div>
        <div className="text-right text-xs text-surface-400">
          {booking.updatedAt || booking.createdAt}
        </div>
      </div>
    </Card>
  );
}

function BookingRequestCard({ booking }: { booking: Booking }) {
  const statusIcon = booking.status === 'cancelled' ? XCircle : booking.status === 'approved' ? CheckCircle2 : AlertCircle;

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            booking.status === 'cancelled' ? 'bg-red-100 text-red-600' :
            booking.status === 'approved' ? 'bg-green-100 text-green-600' :
            'bg-orange-100 text-orange-600'
          }`}>
            <statusIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-surface-900 text-sm">{booking.fillerName || 'Filler'}</span>
              <Badge variant={booking.status === 'pending' ? 'warning' : booking.status === 'approved' ? 'primary' : 'success'}>
                {booking.status}
              </Badge>
            </div>
            <p className="text-xs text-surface-500 mt-0.5">{booking.cbmBooked} CBM — ${booking.totalPrice}</p>
          </div>
        </div>
      </div>
      {booking.status === 'pending' && <BookingActions booking={booking} />}
    </Card>
  );
}

function BookingActions({ booking }: { booking: Booking }) {
  const [status, setStatus] = useState(booking.status);
  const [loading, setLoading] = useState(false);

  const updateStatus = async (newStatus: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/bookings/${booking.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) setStatus(newStatus as typeof booking.status);
    } finally {
      setLoading(false);
    }
  };

  if (status !== 'pending') return null;

  return (
    <div className="flex gap-2 mt-3 pt-3 border-t border-surface-100">
      <Button size="sm" className="flex-1 gap-1.5" onClick={() => updateStatus('approved')} disabled={loading}>
        <CheckCircle2 className="w-4 h-4" />
        Approve
      </Button>
      <Button size="sm" variant="secondary" className="flex-1 gap-1.5" onClick={() => updateStatus('cancelled')} disabled={loading}>
        <XCircle className="w-4 h-4" />
        Decline
      </Button>
    </div>
  );
}

function QuickActions({ isShipper }: { isShipper: boolean }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-surface-900 mb-3">Quick Actions</h2>
      <div className="space-y-2">
        {isShipper ? (
          <>
            <Link href="/shipments/create">
              <Button variant="secondary" className="w-full justify-start gap-2">
                <Plus className="w-4 h-4" />
                Create Listing
              </Button>
            </Link>
            <Link href="/matching">
              <Button variant="secondary" className="w-full justify-start gap-2">
                <Search className="w-4 h-4" />
                Browse Listings
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/matching">
              <Button variant="secondary" className="w-full justify-start gap-2">
                <Search className="w-4 h-4" />
                Find Container Space
              </Button>
            </Link>
          </>
        )}
        <Link href="/profile">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Users className="w-4 h-4" />
            Edit Profile
          </Button>
        </Link>
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, title, description, action, compact }: {
  icon: typeof Package;
  title: string;
  description: string;
  action?: { label: string; href: string };
  compact?: boolean;
}) {
  return (
    <Card className={`flex flex-col items-center justify-center text-center ${compact ? 'p-6' : 'p-10'}`}>
      <div className={`${compact ? 'w-10 h-10' : 'w-14 h-14'} rounded-2xl bg-surface-100 flex items-center justify-center text-surface-400 mb-4`}>
        <Icon className={compact ? 'w-5 h-5' : 'w-7 h-7'} />
      </div>
      <h3 className={`font-semibold text-surface-900 ${compact ? 'text-sm' : 'text-lg'} mb-1`}>{title}</h3>
      <p className={`text-surface-500 ${compact ? 'text-xs' : 'text-sm'} mb-4 max-w-xs`}>{description}</p>
      {action && (
        <Link href={action.href}>
          <Button size={compact ? 'sm' : 'md'} className="gap-1.5">
            {action.label}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      )}
    </Card>
  );
}
