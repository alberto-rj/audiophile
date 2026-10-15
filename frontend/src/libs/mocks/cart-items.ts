import type { ApiCartItem } from '@audiophile/shared';

import rawCartItems from './cart-items.json' with { type: 'json' };

export const cartItems = rawCartItems as ApiCartItem[];
