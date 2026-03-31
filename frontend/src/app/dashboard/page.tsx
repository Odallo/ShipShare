'use client';

import React from 'react';
import Link from 'next/link';
import { Package, Users, TrendingDown, Plus, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { mockShipments, mockUser } from '@/utils/mockData';

export default function DashboardPage() {
  const stats = {
    activeShipments: mockShipments.filter(s => s.status !== 'delivered').length,
    totalSaved: 1850,
    pendingMatches: 2,
  };
  
  const recentShipments = mockShipments.slice(0, 3);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Active Shipments</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.activeShipments}</p>
                    </div>
                    <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                      <Package className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Saved</p>
                      <p className="text-3xl font-bold text-green-600">KES {stats.totalSaved.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                      <TrendingDown className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Pending Matches</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.pendingMatches}</p>
                    </div>
                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                      <Users className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <Link href="/shipments/create">
                    <Button fullWidth>
                      <Plus className="h-4 w-4 mr-2" />
                      New Shipment
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Shipments */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Recent Shipments</h2>
                  <Link href="/dashboard/shipments">
                    <Button variant="outline" size="sm">View All</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentShipments.map((shipment) => (
                    <div
                      key={shipment.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                          <Package className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium">{shipment.destination}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            From: {shipment.pickupLocation}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge
                          variant={
                            shipment.status === 'delivered'
                              ? 'success'
                              : shipment.status === 'shipped'
                              ? 'info'
                              : 'warning'
                          }
                        >
                          {shipment.status}
                        </Badge>
                        <p className="font-medium">KES {shipment.estimatedCost}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}