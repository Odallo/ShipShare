export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: Date;
}

export interface Shipment {
  id: string;
  userId: string;
  pickupLocation: string;
  destination: string;
  weight: number; // in kg
  packageType: 'document' | 'small' | 'medium' | 'large' | 'fragile';
  preferredDate: Date;
  status: 'pending' | 'matching' | 'confirmed' | 'shipped' | 'delivered';
  groupId?: string;
  estimatedCost: number;
  actualCost?: number;
  createdAt: Date;
}

export interface ShipmentGroup {
  id: string;
  destination: string;
  participants: string[]; // user IDs
  shipments: string[]; // shipment IDs
  totalWeight: number;
  estimatedCostPerUser: number;
  status: 'forming' | 'confirmed' | 'shipping' | 'completed';
  departureDate: Date;
  savingsPercentage: number;
}

export interface Match {
  id: string;
  groupId: string;
  destination: string;
  participants: number;
  totalWeight: number;
  estimatedSavings: number;
  distance: string;
  departureDate: Date;
}