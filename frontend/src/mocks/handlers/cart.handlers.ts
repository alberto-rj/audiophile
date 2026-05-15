import { http, HttpResponse } from 'msw';

import { API_ENDPOINTS } from '@/config/api-endpoints';
import { cart } from '@/libs/mocks/cart';
import { products } from '@/libs/mocks';
import type {
  AddCartItemPayload,
  CartItem,
  UpdateCartItemQuantityPayload,
} from '@/libs/types';

import { withAuth } from '../middlewares/with-auth';
import { withDelay } from '../middlewares/with-delay';

export const getCart = http.get(
  `/api${API_ENDPOINTS.cart}`,

  withDelay(
    withAuth(async () => {
      cart.items.sort((a, b) => a.name.localeCompare(b.name));
      return HttpResponse.json({ cart });
    }),
  ),
);

export const addCartItem = http.post(
  `/api${API_ENDPOINTS.cartItems}`,

  withDelay(
    withAuth(async ({ request }) => {
      const { productId, quantity } =
        (await request.json()) as AddCartItemPayload;

      const foundProduct = products.find((product) => product.id === productId);

      if (typeof foundProduct === 'undefined') {
        return HttpResponse.json(undefined, { status: 404 });
      }

      const createdCartItem: CartItem = {
        id: cart.items.length + 1,
        productId,
        name: foundProduct.name,
        slug: foundProduct.slug,
        image: foundProduct.image,
        price: foundProduct.price,
        quantity,
      };

      cart.items.push(createdCartItem);
      cart.items.sort((a, b) => a.name.localeCompare(b.name));

      return HttpResponse.json({ cart }, { status: 201 });
    }),
  ),
);

export const updateCartItemQuantity = http.patch(
  `/api${API_ENDPOINTS.cartItems}/:slug`,

  withDelay(
    withAuth(async ({ params, request }) => {
      const { slug } = params as { slug?: string };

      if (typeof slug === 'undefined') {
        return HttpResponse.json(undefined, { status: 404 });
      }

      const productId = parseInt(slug, 10);

      const { quantity } =
        (await request.json()) as UpdateCartItemQuantityPayload;

      const foundItemIndex = cart.items.findIndex(
        (item) => item.productId === productId,
      );

      if (foundItemIndex < 0) {
        return HttpResponse.json(undefined, { status: 404 });
      }

      const foundItem = cart.items[foundItemIndex];
      const updatedItem: CartItem = {
        ...foundItem,
        quantity,
      };

      cart.items.splice(foundItemIndex, 1);
      cart.items.push(updatedItem);
      cart.items.sort((a, b) => a.name.localeCompare(b.name));

      return HttpResponse.json({ cart }, { status: 200 });
    }),
  ),
);

export const deleteCartItem = http.delete(
  `/api${API_ENDPOINTS.cartItems}/:slug`,

  withDelay(
    withAuth(async ({ params }) => {
      const { slug } = params as { slug?: string };

      if (typeof slug === 'undefined') {
        return HttpResponse.json(undefined, { status: 404 });
      }

      const productId = parseInt(slug, 10);

      const foundItemIndex = cart.items.findIndex(
        (item) => item.productId === productId,
      );

      if (foundItemIndex < 0) {
        return HttpResponse.json(undefined, { status: 404 });
      }

      cart.items.splice(foundItemIndex, 1);
      cart.items.sort((a, b) => a.name.localeCompare(b.name));

      return HttpResponse.json({ cart }, { status: 200 });
    }),
  ),
);

export const clearCart = http.delete(
  `/api${API_ENDPOINTS.cart}`,

  withDelay(
    withAuth(async () => {
      cart.items = [];

      return HttpResponse.json({ cart }, { status: 200 });
    }),
  ),
);

export const cartHandlers = [
  getCart,
  addCartItem,
  updateCartItemQuantity,
  clearCart,
];
