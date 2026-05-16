export type UserRole = 'shipper' | 'filler' | 'both';

export type ContainerType = '20ft' | '40ft' | '40HC';

export type ListingStatus = 'draft' | 'published' | 'fully_booked' | 'departed' | 'arrived';

export type BookingStatus = 'pending' | 'approved' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

export interface Port {
  id: string;
  name: string;
  country: string;
  region: string;
}

export const CONTAINER_CBM: Record<ContainerType, number> = {
  '20ft': 33.1,
  '40ft': 67.3,
  '40HC': 76.3,
};

export const KNOWN_PORTS: Port[] = [
  { id: 'shenzhen', name: 'Shenzhen', country: 'China', region: 'Asia' },
  { id: 'ningbo', name: 'Ningbo', country: 'China', region: 'Asia' },
  { id: 'shanghai', name: 'Shanghai', country: 'China', region: 'Asia' },
  { id: 'guangzhou', name: 'Guangzhou', country: 'China', region: 'Asia' },
  { id: 'qingdao', name: 'Qingdao', country: 'China', region: 'Asia' },
  { id: 'mombasa', name: 'Mombasa', country: 'Kenya', region: 'East Africa' },
  { id: 'nairobi_icd', name: 'Nairobi ICD', country: 'Kenya', region: 'East Africa' },
  { id: 'dar_es_salaam', name: 'Dar es Salaam', country: 'Tanzania', region: 'East Africa' },
  { id: 'kampala', name: 'Kampala', country: 'Uganda', region: 'East Africa' },
  { id: 'kigali', name: 'Kigali', country: 'Rwanda', region: 'East Africa' },
  { id: 'durban', name: 'Durban', country: 'South Africa', region: 'Southern Africa' },
  { id: 'rotterdam', name: 'Rotterdam', country: 'Netherlands', region: 'Europe' },
  { id: 'hamburg', name: 'Hamburg', country: 'Germany', region: 'Europe' },
  { id: 'jebel_ali', name: 'Jebel Ali', country: 'UAE', region: 'Middle East' },
];

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  location?: string;
  createdAt: string;
  updatedAt?: string;
  userType?: 'individual' | 'business';
  businessName?: string;
  businessRegistration?: string;
  kraPin?: string;
  verified: boolean;
  trustScore: number;
  avatar?: string;
}

export interface ContainerListing {
  id: string;
  shipperId: string;
  shipperName?: string;
  shipperVerified?: boolean;
  originPort: string;
  destinationPort: string;
  containerType: ContainerType;
  totalCbm: number;
  availableCbm: number;
  pricePerCbm: number;
  departureDate: string;
  cutoffDate: string;
  shippingLine: string;
  containerNumber?: string;
  restrictions?: string;
  notes?: string;
  status: ListingStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface Booking {
  id: string;
  listingId: string;
  fillerId: string;
  fillerName?: string;
  cbmBooked: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface Message {
  id: string;
  listingId: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: string;
}

export interface DashboardStats {
  totalListings: number;
  activeListings: number;
  totalBookings: number;
  cbmSold: number;
  totalEarned: number;
  moneySaved: number;
}
