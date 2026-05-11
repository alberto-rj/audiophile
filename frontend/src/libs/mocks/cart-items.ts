import type { CartItem } from '@/libs/types';

import rawCartItems from './cart-items.json' with { type: 'json' };

export const cartItems = rawCartItems as CartItem[];
