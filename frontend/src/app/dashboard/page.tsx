'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, Users, TrendingDown, Plus, MapPin, ArrowRight, Wallet, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';

const MOCK_USER = {
  name: 'John Odallo',
  email: 'john@example.com',
};

const RECENT_SHIPMENTS = [
  {
    id: 'SHP-001',
    pickupLocation: 'Nairobi, Westlands',
    destination: 'Mombasa, CBD',
    status: 'shipped',
    estimatedCost: 450,
    saved: 180,
  },
  {
    id: 'SHP-002',
    pickupLocation: 'Nairobi, Kilimani',
    destination: 'Kisumu, Town',
    status: 'matching',
    estimatedCost: 280,
    saved: 0,
  },
  {
    id: 'SHP-003',
    pickupLocation: 'Nairobi, CBD',
    destination: 'Nakuru, Town',
    status: 'delivered',
    estimatedCost: 320,
    saved: 120,
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

  const stats = {
    activeShipments: 2,
    totalSaved: 4250,
    groupsJoined: 5,
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      shipped: { variant: 'primary' as const, label: 'In Transit' },
      matching: { variant: 'warning' as const, label: 'Finding Group' },
      delivered: { variant: 'success' as const, label: 'Delivered' },
      pending: { variant: 'default' as const, label: 'Pending' },
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.pending;
  };

  return (
    <div className="min-h-screen bg-surface-50">
      <Navbar />
      
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 pt-16 lg:pt-20 fade-in">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-surface-900">
                  Welcome back, {MOCK_USER.name.split(' ')[0]}!
                </h1>
                <p className="text-surface-500 mt-1">
                  Here&apos;s what&apos;s happening with your shipments today.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" className="hidden sm:flex gap-2">
                  <Wallet className="w-4 h-4" />
                  KES 2,450
                </Button>
                <Link href="/shipments/create">
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    New Shipment
                  </Button>
                </Link>
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

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-surface-500">Groups Joined</p>
                    <p className="text-2xl font-bold text-surface-900 mt-1">{stats.groupsJoined}</p>
                  </div>
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center text-secondary-600">
                    <Users className="w-6 h-6" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 gradient-bg text-white border-none">
                <div className="flex items-center justify-between h-full">
                  <div>
                    <p className="text-primary-100 text-sm">Quick Action</p>
                    <p className="font-semibold mt-1">Track Package</p>
                  </div>
                  <Link href="/tracking">
                    <Button size="sm" variant="secondary" className="mt-2">
                      Track
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Shipments */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-surface-900">Recent Shipments</h2>
                  <Link href="/shipments">
                    <Button variant="ghost" size="sm" className="gap-1">
                      View all
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {RECENT_SHIPMENTS.map((shipment) => {
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
              </div>

              {/* Available Groups */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-surface-900">Available Groups Near You</h2>
                
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
                      <div className="font-semibold text-surface-900">Savings this month</div>
                      <div className="text-xs text-surface-500">Based on 3 shared shipments</div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-accent-600">KES 4,500</div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}