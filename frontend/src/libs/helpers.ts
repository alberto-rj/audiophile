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
  const statusList: Record<OrderStatus, string> = {
    cancelled: 'Cancelled',
    delivered: 'Delivered',
    pending: 'Pending',
    processing: 'processing',
    shipped: 'Shipped',
  };

  return statusList[status];
}

export function toTimeAgo(time: string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
  }).format(new Date(time));
}
