export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: Date;
  userType?: 'individual' | 'business';
  businessName?: string;
  businessRegistration?: string;
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
  origin: string;
  destination: string;
  participants: string[]; // user IDs
  shipments: string[]; // shipment IDs
  totalWeight: number;
  estimatedCost: number;
  maxParticipants: number;
  status: 'forming' | 'confirmed' | 'shipping' | 'completed' | 'open' | 'closing';
  departureDate: Date;
  savingsPercentage: number;
  deadline?: string;
}

export interface Match {
  id: string;
  groupId: string;
  origin: string;
  destination: string;
  participants: number;
  maxParticipants: number;
  totalWeight: number;
  estimatedSavings: number;
  estimatedCost: number;
  distance: string;
  departureDate: Date;
  deadline?: string;
  status?: 'open' | 'closing';
}