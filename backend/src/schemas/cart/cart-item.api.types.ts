import type { z } from '@/config';

import type { ApiCartItemSchema } from './cart-item.api.schema';

export type ApiCartItem = z.infer<typeof ApiCartItemSchema>;
