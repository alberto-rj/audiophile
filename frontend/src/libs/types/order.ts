export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 'e-money' | 'cash-on-delivery';

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: number;
  userId: number;
  status: OrderStatus;
  name: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shipping: number;
  vat: number;
  total: number;
  createdAt: Date;
  items?: OrderItem[];
}
