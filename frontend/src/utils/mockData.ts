import { Match, Shipment, ShipmentGroup, User } from '@/types';

export const mockUser: User = {
  id: '1',
  name: 'John Odallo',
  email: 'john@example.com',
  phone: '+254 712 345 678',
  location: 'Nairobi, CBD',
  joinDate: new Date('2024-01-15'),
};

export const mockShipments: Shipment[] = [
  {
    id: '1',
    userId: '1',
    pickupLocation: 'Nairobi, Westlands',
    destination: 'Mombasa, CBD',
    weight: 5.5,
    packageType: 'medium',
    preferredDate: new Date('2024-04-05'),
    status: 'shipped',
    estimatedCost: 450,
    actualCost: 320,
    groupId: 'group1',
    createdAt: new Date('2024-03-20'),
  },
  {
    id: '2',
    userId: '1',
    pickupLocation: 'Nairobi, Kilimani',
    destination: 'Kisumu, Town',
    weight: 2.0,
    packageType: 'small',
    preferredDate: new Date('2024-04-10'),
    status: 'matching',
    estimatedCost: 280,
    groupId: 'group2',
    createdAt: new Date('2024-03-25'),
  },
];

export const mockGroups: ShipmentGroup[] = [
  {
    id: 'group1',
    destination: 'Mombasa, CBD',
    participants: ['1', '2', '3'],
    shipments: ['1', '4', '5'],
    totalWeight: 18.5,
    estimatedCostPerUser: 320,
    status: 'shipping',
    departureDate: new Date('2024-04-02'),
    savingsPercentage: 28,
  },
  {
    id: 'group2',
    destination: 'Kisumu, Town',
    participants: ['1', '6'],
    shipments: ['2', '7'],
    totalWeight: 5.5,
    estimatedCostPerUser: 280,
    status: 'forming',
    departureDate: new Date('2024-04-08'),
    savingsPercentage: 35,
  },
];

export const mockMatches: Match[] = [
  {
    id: 'match1',
    groupId: 'available1',
    destination: 'Mombasa, CBD',
    participants: 3,
    totalWeight: 12.5,
    estimatedSavings: 450,
    distance: '485 km',
    departureDate: new Date('2024-04-05'),
  },
  {
    id: 'match2',
    groupId: 'available2',
    destination: 'Nakuru, Town',
    participants: 2,
    totalWeight: 8.0,
    estimatedSavings: 280,
    distance: '160 km',
    departureDate: new Date('2024-04-06'),
  },
  {
    id: 'match3',
    groupId: 'available3',
    destination: 'Eldoret, CBD',
    participants: 4,
    totalWeight: 22.0,
    estimatedSavings: 620,
    distance: '310 km',
    departureDate: new Date('2024-04-07'),
  },
];