import { http, HttpResponse } from 'msw';

import { products } from '@/libs/mocks/products';
import { categories } from '@/libs/mocks/categories';

export const handlers = [
  http.get('/api/categories', () => {
    return HttpResponse.json(categories);
  }),

  http.get('/api/categories/:slug', ({ params }) => {
    const foundCategory = categories.find(
      (category) => category.slug === params.slug,
    );

    if (!foundCategory) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(foundCategory);
  }),

  http.get('/api/categories/:slug/products', ({ params }) => {
    const foundCategory = categories.find(
      (category) => category.slug === params.slug,
    );

    if (!foundCategory) {
      return new HttpResponse(null, { status: 404 });
    }

    const filteredProducts = products.filter((p) => p.category === params.slug);

    return HttpResponse.json({
      ...foundCategory,
      items: filteredProducts,
    });
  }),

  http.get('/api/products', () => {
    return HttpResponse.json(products);
  }),

  http.get('/api/products/:slug', ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);

    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(product);
  }),
];
