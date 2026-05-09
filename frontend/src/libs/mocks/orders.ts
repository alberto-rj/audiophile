import type { Order } from '@/libs/types';

import rawOrders from './orders.data.json' with { type: 'json' };

export const orders = rawOrders as Order[];
