import React from 'react';
import Link from 'next/link';
import { MapPin, Package } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Shipment } from '@/types';

interface RecentShipmentsProps {
  shipments: Shipment[];
}

export const RecentShipments: React.FC<RecentShipmentsProps> = ({ shipments }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Shipments</h2>
        <Link href="/dashboard/shipments">
          <Button variant="outline" size="sm">View All</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {shipments.map((shipment) => (
            <Link key={shipment.id} href={`/shipments/${shipment.id}`}>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                    <Package className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={shipment.status === 'shipped' ? 'success' : 'warning'}>
                        {shipment.status.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {new Date(shipment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">
                        {shipment.pickupLocation} → {shipment.destination}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">KES {shipment.estimatedCost}</p>
                  <p className="text-sm text-green-600">Est. cost</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};