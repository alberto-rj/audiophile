import type { ApiOrder } from '@audiophile/shared';

import rawOrders from './orders.data.json' with { type: 'json' };

export const orders = rawOrders as ApiOrder[];
