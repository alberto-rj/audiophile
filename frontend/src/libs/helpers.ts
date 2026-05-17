import type { OrderStatus } from './types';

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
    .slice(0, 2)
    .join('');
}

export function toStatusText(status: OrderStatus) {
  const statusTextMap: Record<OrderStatus, string> = {
    cancelled: 'Cancelled',
    delivered: 'Delivered',
    pending: 'Pending',
    processing: 'processing',
    shipped: 'Shipped',
  };

  return statusTextMap[status];
}

export function toStatusColor(status: OrderStatus): string {
  const statusColorMap: Record<OrderStatus, string> = {
    delivered: 'var(--order-delivered)',
    pending: 'var(--order-pending)',
    shipped: 'var(--order-shipped)',
    cancelled: 'var(--order-cancelled)',
    processing: 'var(--order-processing)',
  };

  return statusColorMap[status];
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
