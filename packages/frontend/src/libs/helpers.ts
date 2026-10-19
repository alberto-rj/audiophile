import type { OrderStatus, PaymentMethod } from '@/libs/types';

export function formatPrice(price: number) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

  return formattedPrice;
}

export function toMoney(value: number) {
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

  return formattedValue;
}

export function getNameInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0]?.toUpperCase())
    .filter((_, i, arr) => i === 0 || i === arr.length - 1)
    .join('');
}

export function toOrderStatusText(status: OrderStatus) {
  const statusTextMap: Record<OrderStatus, string> = {
    cancelled: 'Cancelled',
    delivered: 'Delivered',
    pending: 'Pending',
    processing: 'processing',
    shipped: 'Shipped',
    paid: 'Paid',
  };

  return statusTextMap[status];
}

export function toPaymentMethodText(status: PaymentMethod) {
  const statusTextMap: Record<PaymentMethod, string> = {
    'cash-on-delivery': 'COD',
    'e-money': 'e-Money',
  };

  return statusTextMap[status];
}

export function toTimeAgo(time: string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
  }).format(new Date(time));
}

export function toOrderNumber(number: number) {
  return `#${number}`;
}

export {
  getPendingCartItem,
  removePendingCartItem,
  setPendingCartItem,
} from './pending-cart-item-storage';

export { getItemsCount } from './get-items-count';
