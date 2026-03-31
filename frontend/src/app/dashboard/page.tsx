'use client';

import React from 'react';
import Link from 'next/link';
import { Package, Users, TrendingDown, Plus, MapPin, LayoutDashboard, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { mockShipments, mockUser, mockGroups } from '@/utils/mockData';

export default function DashboardPage() {
  const stats = {
    activeShipments: mockShipments.filter(s => s.status !== 'delivered').length,
    totalSaved: 1850,
    pendingMatches: 2,
  };
  
  const recentShipments = mockShipments.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 fade-in">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back, {mockUser.name.split(' ')[0]}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Here's what's happening with your shipments today.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Shipments</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeShipments}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400">
                    <Package className="w-6 h-6" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Saved</p>
                    <p className="text-2xl font-bold text-accent-600 dark:text-accent-400">KES {stats.totalSaved.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center text-accent-600 dark:text-accent-400">
                    <TrendingDown className="w-6 h-6" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Groups Joined</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pendingMatches}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Users className="w-6 h-6" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-900 dark:to-primary-800 text-white border-none">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <p className="text-sm text-primary-100">Ready to ship?</p>
                    <p className="text-lg font-semibold">Create shipment</p>
                  </div>
                  <Link href="/shipments/create">
                    <Button size="sm" variant="accent" className="w-full mt-2">
                      <Plus className="w-4 h-4 mr-2" />
                      New Shipment
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content - Recent Shipments */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Shipments</h2>
                  <Link href="/shipments">
                    <Button variant="ghost" size="sm" className="gap-1">
                      View all
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {recentShipments.map((shipment) => (
                    <Card key={shipment.id} className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400">
                            <Package className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-gray-900 dark:text-white">{shipment.id}</span>
                              <Badge
                                variant={
                                  shipment.status === 'delivered'
                                    ? 'success'
                                    : shipment.status === 'shipped'
                                    ? 'primary'
                                    : 'warning'
                                }
                              >
                                {shipment.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {shipment.pickupLocation} &rarr; {shipment.destination}
                            </div>
                          </div>
                        </div>
                        <div className="text-right sm:pl-4 sm:border-l border-gray-200 dark:border-slate-700">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            KES {shipment.estimatedCost}
                          </div>
                          <div className="text-xs text-accent-600 dark:text-accent-400">
                            Saved KES {shipment.estimatedCost * 0.4}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Sidebar Content - Available Groups */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Available Groups Near You</h2>
                <div className="space-y-4">
                  {mockGroups.slice(0, 3).map((group) => (
                    <Card key={group.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium text-gray-900 dark:text-white text-sm">{group.origin}</div>
                        <Badge variant="accent" className="text-xs">Save 40%</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-3">
                        <ArrowRight className="w-4 h-4 text-primary-500" />
                        {group.destination}
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>{group.participants}/{group.maxParticipants} members</span>
                        <span className="text-accent-600 dark:text-accent-400">2 days left</span>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="bg-accent-50 dark:bg-accent-900/20 rounded-xl p-4 border border-accent-100 dark:border-accent-900/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-accent-100 dark:bg-accent-900/50 flex items-center justify-center text-accent-600 dark:text-accent-400">
                      <TrendingDown className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-accent-900 dark:text-accent-400 text-sm">Savings this month</span>
                  </div>
                  <div className="text-2xl font-bold text-accent-700 dark:text-accent-400">KES 4,500</div>
                  <div className="text-xs text-accent-600/80 dark:text-accent-500 mt-1">Based on 3 shared shipments</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}