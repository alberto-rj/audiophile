import { http, HttpResponse } from 'msw';

import { products } from '@/libs/mocks';
import { categories } from '@/libs/mocks';
import type { Category, Product } from '@/libs/types';

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

export const getCategoryProducts = http.get<{ slug: string }, Product[]>(
  '/api/categories/:slug/products',
  async ({ params }) => {
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
  },
);

export const getCategoryBySlug = http.get<{ slug: string }, never, Category>(
  '/api/categories/:slug',
  async ({ params }) => {
    const foundCategory = categories.find(
      (category) => category.slug === params.slug,
    );

    if (!foundCategory) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(foundCategory);
  },
);

export const getCategories = http.get<never, never, Category[]>(
  '/api/categories',
  async () => {
    return HttpResponse.json(categories);
  },
);

export const categoryHandlers = [
  getCategories,

  getCategoryBySlug,

  getCategoryProducts,
];
