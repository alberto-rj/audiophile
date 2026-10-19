import type {
  ApiCart,
  ApiCartItem,
  ApiCartResultListResponse,
} from '@audiophile/shared';
import { http, HttpResponse } from 'msw';

import { API_ENDPOINTS } from '@/config/api-endpoints';
import {
  cart,
  getGrandTotal,
  getShipping,
  getSubtotal,
  getVAT,
} from '@/libs/mocks/cart';
import { products } from '@/libs/mocks';
import type {
  AddCartItemPayload,
  UpdateCartItemQuantityPayload,
} from '@/libs/types';

import { withAuth } from '../middlewares/with-auth';
import { withDelay, withInfiniteDelay } from '../middlewares/with-delay';

function getUpdatedCart(cart: ApiCart, newItems: ApiCartItem[]): ApiCart {
  const customCart = {
    ...cart,
    items: newItems,
    shipping: getShipping(),
    vat: getVAT(newItems),
    subtotal: getSubtotal(newItems),
    grandTotal: getGrandTotal(newItems),
  };

  return customCart;
}

export const makeGetCartHandler = (
  options: { type?: 'error' | 'infinite' | 'default'; limit?: number } = {},
) => {
  const endpoint = `/api${API_ENDPOINTS.cart}`;

  const { type = 'default', limit = cart.items.length } = options;

  if (type === 'infinite') {
    return http.get(
      endpoint,
      withAuth(
        withInfiniteDelay(async () => {
          return HttpResponse.json(undefined);
        }),
      ),
    );
  }

  if (type === 'error') {
    return http.get(
      endpoint,
      withAuth(
        withDelay(async () => {
          return HttpResponse.json(undefined, { status: 500 });
        }),
      ),
    );
  }

  return http.get(
    endpoint,

    withDelay(
      withAuth(async () => {
        cart.items.sort((a, b) => a.name.localeCompare(b.name));

        const response: ApiCartResultListResponse = {
          results: [getUpdatedCart(cart, cart.items.slice(0, limit))],
        };

        return HttpResponse.json(response);
      }),
    ),
  );
};

export const makeClearCartHandler = (
  options: { type?: 'error' | 'infinite' | 'default' } = {},
) => {
  const endpoint = `/api${API_ENDPOINTS.cart}`;

  const { type = 'default' } = options;

  if (type === 'infinite') {
    return http.delete(
      endpoint,
      withAuth(
        withInfiniteDelay(async () => {
          return HttpResponse.json(undefined);
        }),
      ),
    );
  }

  if (type === 'error') {
    return http.delete(
      endpoint,
      withAuth(
        withDelay(async () => {
          return HttpResponse.json(undefined, { status: 500 });
        }),
      ),
    );
  }

  return http.delete(
    endpoint,
    withDelay(
      withAuth(async () => {
        cart.items = [];

        const response: ApiCartResultListResponse = {
          results: [getUpdatedCart(cart, cart.items)],
        };

        return HttpResponse.json(response, { status: 200 });
      }),
    ),
  );
};

export function makeAddCartItemHandler(
  options: { type?: 'error' | 'infinite' | 'default' } = {},
) {
  const endpoint = `/api${API_ENDPOINTS.cart}`;

  const { type = 'default' } = options;

  if (type === 'infinite') {
    return http.post(
      endpoint,
      withAuth(
        withInfiniteDelay(async () => {
          return HttpResponse.json(undefined);
        }),
      ),
    );
  }

  if (type === 'error') {
    return http.post(
      endpoint,
      withAuth(
        withDelay(async () => {
          return HttpResponse.json(undefined, { status: 500 });
        }),
      ),
    );
  }

  return http.post(
    endpoint,

    withDelay(
      withAuth(async ({ request }) => {
        const { productId, quantity } =
          (await request.json()) as AddCartItemPayload;

        const foundProduct = products.find(
          (product) => product.id === productId,
        );

        if (typeof foundProduct === 'undefined') {
          return HttpResponse.json(undefined, { status: 404 });
        }

        const createdCartItem: ApiCartItem = {
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

        const response: ApiCartResultListResponse = {
          results: [getUpdatedCart(cart, cart.items)],
        };

        return HttpResponse.json(response, { status: 201 });
      }),
    ),
  );
}

export function makeUpdateCartItemQuantityHandler(
  options: { type?: 'error' | 'infinite' | 'default' } = {},
) {
  const endpoint = `/api${API_ENDPOINTS.cart}/:itemId`;

  const { type = 'default' } = options;

  if (type === 'infinite') {
    return http.patch(
      endpoint,
      withAuth(
        withInfiniteDelay(async () => {
          return HttpResponse.json(undefined);
        }),
      ),
    );
  }

  if (type === 'error') {
    return http.patch(
      endpoint,
      withAuth(
        withDelay(async () => {
          return HttpResponse.json(undefined, { status: 500 });
        }),
      ),
    );
  }

  return http.patch(
    endpoint,

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
        const updatedItem: ApiCartItem = {
          ...foundItem,
          quantity,
        };

        cart.items.splice(foundItemIndex, 1);
        cart.items.push(updatedItem);
        cart.items = cart.items.filter((item) => item.quantity > 0);
        cart.items.sort((a, b) => a.name.localeCompare(b.name));

        const response: ApiCartResultListResponse = {
          results: [getUpdatedCart(cart, cart.items)],
        };

        return HttpResponse.json(response, { status: 200 });
      }),
    ),
  );
}

export function makeDeleteCartItemHandler(
  options: { type?: 'error' | 'infinite' | 'default' } = {},
) {
  const endpoint = `/api${API_ENDPOINTS.cart}/:itemId`;

  const { type = 'default' } = options;

  if (type === 'infinite') {
    return http.delete(
      endpoint,
      withAuth(
        withInfiniteDelay(async () => {
          return HttpResponse.json(undefined);
        }),
      ),
    );
  }

  if (type === 'error') {
    return http.delete(
      endpoint,
      withAuth(
        withDelay(async () => {
          return HttpResponse.json(undefined, { status: 500 });
        }),
      ),
    );
  }

  return http.delete(
    endpoint,
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

        const response: ApiCartResultListResponse = {
          results: [getUpdatedCart(cart, cart.items)],
        };

        return HttpResponse.json(response, { status: 200 });
      }),
    ),
  );
}

export const cartHandlers = [
  makeGetCartHandler(),
  makeClearCartHandler(),
  makeAddCartItemHandler(),
  makeUpdateCartItemQuantityHandler(),
  makeDeleteCartItemHandler(),
];
