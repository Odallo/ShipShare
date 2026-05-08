'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Package, Calendar, Truck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';

export default function ShipmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const shipmentId = params.id as string;

  const mockShipment = {
    id: shipmentId,
    pickupLocation: 'Nairobi, Westlands',
    destination: 'Mombasa, CBD',
    weight: 5.5,
    packageType: 'medium',
    preferredDate: '2024-04-05',
    status: 'shipped',
    estimatedCost: 450,
    actualCost: 320,
    groupId: 'grp-001',
    provider: 'G4S Logistics',
    createdAt: '2024-03-20',
    timeline: [
      { date: '2024-03-20', status: 'Order Created', completed: true },
      { date: '2024-03-21', status: 'Group Matched', completed: true },
      { date: '2024-03-22', status: 'Payment Confirmed', completed: true },
      { date: '2024-03-23', status: 'Package Picked Up', completed: true },
      { date: '2024-03-24', status: 'In Transit', completed: true },
      { date: '2024-03-25', status: 'Out for Delivery', completed: false },
      { date: '2024-03-25', status: 'Delivered', completed: false },
    ],
  };

  const getStatusVariant = (status: string) => {
    const map: Record<string, 'success' | 'warning' | 'primary' | 'secondary'> = {
      pending: 'secondary',
      matching: 'warning',
      confirmed: 'primary',
      shipped: 'primary',
      delivered: 'success',
    };
    return map[status] || 'secondary';
  };

  return (
    <div className="min-h-screen bg-surface-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 pt-16 lg:pt-20 lg:pl-64 fade-in">
          <div className="p-6 lg:p-8 max-w-4xl mx-auto">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>

            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-surface-900">
                  Shipment {mockShipment.id}
                </h1>
                <p className="text-surface-500 mt-1">
                  Created on {mockShipment.createdAt}
                </p>
              </div>
              <Badge variant={getStatusVariant(mockShipment.status)} className="text-sm px-4 py-2">
                {mockShipment.status.charAt(0).toUpperCase() + mockShipment.status.slice(1)}
              </Badge>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-surface-900 mb-4">Shipment Details</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary-500" />
                    <div>
                      <div className="text-sm text-surface-500">Route</div>
                      <div className="font-medium text-surface-900">
                        {mockShipment.pickupLocation} - {mockShipment.destination}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-primary-500" />
                    <div>
                      <div className="text-sm text-surface-500">Package</div>
                      <div className="font-medium text-surface-900 capitalize">
                        {mockShipment.packageType} ({mockShipment.weight}kg)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary-500" />
                    <div>
                      <div className="text-sm text-surface-500">Preferred Date</div>
                      <div className="font-medium text-surface-900">{mockShipment.preferredDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-primary-500" />
                    <div>
                      <div className="text-sm text-surface-500">Provider</div>
                      <div className="font-medium text-surface-900">{mockShipment.provider}</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-semibold text-surface-900 mb-4">Cost Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-surface-500">Estimated Cost</span>
                    <span className="font-medium text-surface-900">KES {mockShipment.estimatedCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-500">Actual Cost</span>
                    <span className="font-medium text-surface-900">KES {mockShipment.actualCost}</span>
                  </div>
                  <div className="border-t border-surface-100 pt-4">
                    <div className="flex justify-between">
                      <span className="text-surface-500">You Saved</span>
                      <span className="font-bold text-accent-600">
                        KES {mockShipment.estimatedCost - mockShipment.actualCost}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-surface-900 mb-4">Shipment Timeline</h2>
              <div className="space-y-4">
                {mockShipment.timeline.map((event, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${event.completed ? 'bg-accent-500' : 'bg-surface-200'}`} />
                    <div className="flex-1">
                      <div className="font-medium text-surface-900">{event.status}</div>
                    </div>
                    <div className="text-sm text-surface-500">{event.date}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
