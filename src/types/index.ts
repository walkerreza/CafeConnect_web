export interface Cafe {
  _id: string;
  name: string;
  location: string;
  address?: string;
  rating: number;
  isOpen: boolean;
  openingHours?: string;
  phone?: string;
  description?: string;
  facilities?: string[];
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'owner';
  phone?: string;
  avatar?: string;
  isActive: boolean;
}

export interface Order {
  _id: string;
  cafeId: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  paymentMethod: 'cash' | 'card' | 'e-wallet' | 'bank-transfer';
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
  notes?: string;
  orderDate: string;
  completedAt?: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}
