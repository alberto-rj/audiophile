import { http, HttpResponse } from 'msw';

import { products } from '@/libs/mocks/products';
import { categories } from '@/libs/mocks/categories';
import type { Product } from '@/libs/types';

function sortProductsByNewFirst(products: Product[]) {
  return [...products].sort((a, b) => {
    if (a.isNew && b.isNew) {
      return 0;
    }

    if (a.isNew && !b.isNew) {
      return -1;
    }

    return 1;
  });
}

export const handlers = [
  http.get('/api/categories', () => {
    return HttpResponse.json(categories);
  }),

  http.get<{ slug: string }>('/api/categories/:slug', ({ params }) => {
    const foundCategory = categories.find(
      (category) => category.slug === params.slug,
    );

    if (!foundCategory) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(foundCategory);
  }),

  http.get<{ slug: string }>('/api/categories/:slug/products', ({ params }) => {
    const foundCategory = categories.find(
      (category) => category.slug === params.slug,
    );

    if (!foundCategory) {
      return new HttpResponse(null, { status: 404 });
    }

    const filteredProducts = sortProductsByNewFirst(
      products.filter((p) => p.category === params.slug),
    );

    return HttpResponse.json({
      ...foundCategory,
      items: filteredProducts,
    });
  }),

  http.get('/api/products', () => {
    return HttpResponse.json(sortProductsByNewFirst(products));
  }),

  http.get<{ slug: string }>('/api/products/:slug', ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);

    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(product);
  }),
];
