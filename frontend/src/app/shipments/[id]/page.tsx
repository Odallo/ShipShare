'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { MapPin, Package, Calendar, Users, TrendingDown, Truck, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { mockShipments, mockGroups } from '@/utils/mockData';

export default function ShipmentDetailsPage() {
  const params = useParams();
  const shipmentId = params.id as string;
  
  const shipment = mockShipments.find(s => s.id === shipmentId);
  const group = shipment?.groupId ? mockGroups.find(g => g.id === shipment.groupId) : null;
  
  if (!shipment) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Shipment not found</h2>
            </div>
          </main>
        </div>
      </div>
    );
  }
  
  const statusIcon = {
    pending: Clock,
    matching: Users,
    confirmed: CheckCircle,
    shipped: Truck,
    delivered: CheckCircle,
  }[shipment.status];
  
  const StatusIcon = statusIcon;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <StatusIcon className="h-6 w-6 text-primary-600" />
                <Badge variant={
                  shipment.status === 'shipped' || shipment.status === 'delivered' ? 'success' :
                  shipment.status === 'confirmed' ? 'info' : 'warning'
                }>
                  {shipment.status.toUpperCase()}
                </Badge>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Shipment #{shipment.id}
              </h1>
            </div>
            
            <Card className="mb-6">
              <CardHeader>
                <h2 className="text-xl font-semibold">Shipment Details</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Pickup Location</p>
                      <p className="font-medium">{shipment.pickupLocation}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Destination</p>
                      <p className="font-medium">{shipment.destination}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Package Details</p>
                      <p className="font-medium">{shipment.weight} kg • {shipment.packageType}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Preferred Date</p>
                      <p className="font-medium">{shipment.preferredDate.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardHeader>
                <h2 className="text-xl font-semibold">Cost Breakdown</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-600">Estimated Individual Cost</span>
                    <span className="font-semibold">KES {shipment.estimatedCost}</span>
                  </div>
                  {group && (
                    <>
                      <div className="flex justify-between items-center pb-2 border-b text-green-600">
                        <span className="flex items-center gap-2">
                          <TrendingDown className="h-4 w-4" />
                          Group Savings ({group.savingsPercentage}%)
                        </span>
                        <span>- KES {Math.round(shipment.estimatedCost * (group.savingsPercentage / 100))}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="font-semibold text-lg">Your Cost with Group</span>
                        <span className="font-bold text-2xl text-green-600">
                          KES {group.estimatedCostPerUser}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {group && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Group Information</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Participants</span>
                      <span className="font-semibold">{group.participants.length} people</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Weight</span>
                      <span className="font-semibold">{group.totalWeight} kg</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Departure Date</span>
                      <span className="font-semibold">{group.departureDate.toLocaleDateString()}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <h3 className="font-semibold mb-2">Participants</h3>
                      <div className="space-y-2">
                        {group.participants.map((participant, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                              <Users className="h-3 w-3 text-primary-600" />
                            </div>
                            <span>Participant {idx + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}