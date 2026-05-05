'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Package, Users, TrendingDown, Plus, MapPin, ArrowRight, Wallet, Clock, CheckCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/contexts/AuthContext';

interface Shipment {
  id: string;
  pickupLocation: string;
  destination: string;
  status: 'pending' | 'matching' | 'confirmed' | 'shipped' | 'delivered';
  estimatedCost: number;
  saved: number;
  createdAt: string;
}

const generateMockShipments = (userId: string): Shipment[] => [
  {
    id: 'SHP-001',
    pickupLocation: 'Nairobi, Westlands',
    destination: 'Mombasa, CBD',
    status: 'shipped',
    estimatedCost: 450,
    saved: 180,
    createdAt: '2024-04-01',
  },
  {
    id: 'SHP-002',
    pickupLocation: 'Nairobi, Kilimani',
    destination: 'Kisumu, Town',
    status: 'matching',
    estimatedCost: 280,
    saved: 0,
    createdAt: '2024-04-03',
  },
  {
    id: 'SHP-003',
    pickupLocation: 'Nairobi, CBD',
    destination: 'Nakuru, Town',
    status: 'delivered',
    estimatedCost: 320,
    saved: 120,
    createdAt: '2024-03-28',
  },
  {
    id: 'SHP-004',
    pickupLocation: 'Nairobi, Karen',
    destination: 'Eldoret, CBD',
    status: 'confirmed',
    estimatedCost: 520,
    saved: 200,
    createdAt: '2024-04-05',
  },
];

const AVAILABLE_GROUPS = [
  {
    id: 1,
    origin: 'Nairobi, CBD',
    destination: 'Mombasa',
    participants: 3,
    maxParticipants: 5,
    savings: '40%',
  },
  {
    id: 2,
    origin: 'Nairobi, Westlands',
    destination: 'Kisumu',
    participants: 2,
    maxParticipants: 4,
    savings: '35%',
  },
  {
    id: 3,
    origin: 'Nairobi, Kilimani',
    destination: 'Eldoret',
    participants: 4,
    maxParticipants: 5,
    savings: '45%',
  },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('shipshare_user') : null;
    if (!storedUser && !user) {
      router.push('/auth/login');
      return;
    }

    // Load user's shipments
    if (typeof window !== 'undefined') {
      const storedShipments = localStorage.getItem('shipshare_shipments');
      if (storedShipments) {
        setShipments(JSON.parse(storedShipments));
      } else {
        // Generate mock shipments for demo
        const mockShipments = generateMockShipments('1');
        setShipments(mockShipments);
        localStorage.setItem('shipshare_shipments', JSON.stringify(mockShipments));
      }
    }
    setIsLoading(false);
  }, [user, router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('shipshare_user');
      localStorage.removeItem('shipshare_shipments');
    }
    router.push('/');
  };

  const stats = {
    activeShipments: shipments.filter(s => s.status !== 'delivered').length,
    totalShipments: shipments.length,
    totalSaved: shipments.reduce((acc, s) => acc + s.saved, 0),
    groupsJoined: 5,
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: 'success' | 'warning' | 'primary' | 'default' | 'secondary', label: string }> = {
      shipped: { variant: 'primary', label: 'In Transit' },
      matching: { variant: 'warning', label: 'Finding Group' },
      confirmed: { variant: 'secondary', label: 'Confirmed' },
      delivered: { variant: 'success', label: 'Delivered' },
      pending: { variant: 'default', label: 'Pending' },
    };
    return statusMap[status] || statusMap.pending;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const storedUser = typeof window !== 'undefined' ? localStorage.getItem('shipshare_user') : null;
  if (!storedUser && !user) {
    return null;
  }

  const currentUser = user || JSON.parse(storedUser || '{}');

  return (
    <div className="min-h-screen bg-surface-50">
      <Navbar />
      
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 pt-16 lg:pt-20 fade-in">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header with User Info */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-surface-900">
                  Welcome back, {currentUser.name?.split(' ')[0] || 'User'}!
                </h1>
                <p className="text-surface-500 mt-1">
                  Here&apos;s what&apos;s happening with your shipments today.
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* User Avatar */}
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

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-surface-500">Active Shipments</p>
                    <p className="text-2xl font-bold text-surface-900 mt-1">{stats.activeShipments}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                    <Package className="w-6 h-6" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-surface-500">Total Shipments</p>
                    <p className="text-2xl font-bold text-surface-900 mt-1">{stats.totalShipments}</p>
                  </div>
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center text-secondary-600">
                    <Clock className="w-6 h-6" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-surface-500">Total Saved</p>
                    <p className="text-2xl font-bold text-accent-600 mt-1">
                      KES {stats.totalSaved.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center text-accent-600">
                    <TrendingDown className="w-6 h-6" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 gradient-bg text-white border-none">
                <div className="flex items-center justify-between h-full">
                  <div>
                    <p className="text-primary-100 text-sm">Quick Action</p>
                    <p className="font-semibold mt-1">Create Shipment</p>
                  </div>
                  <Link href="/shipments/create">
                    <Button size="sm" variant="secondary" className="mt-2">
                      <Plus className="w-4 h-4 mr-1" />
                      New
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Shipments */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-surface-900">Your Shipments</h2>
                  <Link href="/shipments">
                    <Button variant="ghost" size="sm" className="gap-1">
                      View all
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                {shipments.length === 0 ? (
                  <Card className="p-8 text-center">
                    <Package className="w-12 h-12 text-surface-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-surface-900 mb-2">No shipments yet</h3>
                    <p className="text-surface-500 mb-4">Create your first shipment to start saving</p>
                    <Link href="/shipments/create">
                      <Button>Create Shipment</Button>
                    </Link>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {shipments.slice(0, 4).map((shipment) => {
                      const statusInfo = getStatusBadge(shipment.status);
                      
                      return (
                        <Card key={shipment.id} hover className="p-5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 shrink-0">
                                <Package className="w-6 h-6" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-surface-900">{shipment.id}</span>
                                  <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-surface-500">
                                  <MapPin className="w-3 h-3" />
                                  {shipment.pickupLocation} → {shipment.destination}
                                </div>
                              </div>
                            </div>
                            <div className="sm:text-right sm:pl-4 sm:border-l border-surface-100">
                              <div className="font-semibold text-surface-900">
                                KES {shipment.estimatedCost}
                              </div>
                              {shipment.saved > 0 && (
                                <div className="text-sm text-accent-600">
                                  Saved KES {shipment.saved}
                                </div>
                              )}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Sidebar - Profile & Groups */}
              <div className="space-y-6">
                {/* Profile Card */}
                <Card className="p-5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 gradient-bg rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {currentUser.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <h3 className="font-semibold text-surface-900">{currentUser.name}</h3>
                      <p className="text-sm text-surface-500">{currentUser.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-surface-500">Phone</span>
                      <span className="text-surface-900">{currentUser.phone || '+254 700 000 000'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-500">Account Type</span>
                      <Badge variant={currentUser.userType === 'business' ? 'secondary' : 'primary'}>
                        {currentUser.userType || 'Individual'}
                      </Badge>
                    </div>
                    {currentUser.businessName && (
                      <div className="flex justify-between">
                        <span className="text-surface-500">Business</span>
                        <span className="text-surface-900">{currentUser.businessName}</span>
                      </div>
                    )}
                  </div>
                  <Link href="/profile" className="block mt-4">
                    <Button variant="secondary" size="sm" className="w-full">Edit Profile</Button>
                  </Link>
                </Card>

                {/* Available Groups */}
                <h2 className="text-lg font-semibold text-surface-900">Groups Near You</h2>
                
                <div className="space-y-4">
                  {AVAILABLE_GROUPS.map((group) => (
                    <Card key={group.id} hover className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium text-surface-900 text-sm">{group.origin}</div>
                        <Badge variant="accent">Save {group.savings}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-surface-500 text-sm mb-3">
                        <ArrowRight className="w-4 h-4 text-primary-500" />
                        {group.destination}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {[...Array(Math.min(group.participants, 3))].map((_, i) => (
                              <div key={i} className="w-6 h-6 rounded-full gradient-bg border-2 border-white flex items-center justify-center text-white text-xs font-medium">
                                {i + 1}
                              </div>
                            ))}
                          </div>
                          <span className="text-xs text-surface-500">
                            {group.participants}/{group.maxParticipants}
                          </span>
                        </div>
                        <Button size="sm" variant="ghost">Join</Button>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Savings Summary */}
                <Card className="p-5 bg-gradient-to-br from-accent-50 to-primary-50 border-accent-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center text-accent-600">
                      <TrendingDown className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-surface-900">Total Savings</div>
                      <div className="text-xs text-surface-500">All time</div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-accent-600">KES {stats.totalSaved.toLocaleString()}</div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}