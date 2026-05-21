import { http, HttpResponse } from 'msw';

import { products, categories } from '@/libs/mocks';
import type {
  CategoryListResponse,
  CategoryResponse,
  Product,
} from '@/libs/types';

import { withDelay } from '../middlewares/with-delay';

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

export const getCategoryProducts = http.get(
  '/api/categories/:slug/products',
  withDelay(async ({ params }) => {
    const { slug } = params as { slug?: string };

    const foundCategory = categories.find(
      (category) => category.slug.toLowerCase() === slug?.toLowerCase(),
    );

    if (!foundCategory) {
      return new HttpResponse(undefined, { status: 404 });
    }

    const filteredProducts = sortProductsByNewFirst(
      products.filter((p) => p.category.toLowerCase() === slug?.toLowerCase()),
    );

    const categoryResponse: CategoryResponse = {
      category: {
        ...foundCategory,
        products: filteredProducts,
      },
    };

    return HttpResponse.json(categoryResponse);
  }),
);

export const getCategoryBySlug = http.get(
  '/api/categories/:slug',
  withDelay(async ({ params }) => {
    const { slug } = params as { slug?: string };

    const foundCategory = categories.find(
      (category) => category.slug.toLowerCase() === slug?.toLowerCase(),
    );

    if (!foundCategory) {
      return new HttpResponse(undefined, { status: 404 });
    }

    const categoryResponse: CategoryResponse = {
      category: foundCategory,
    };

    return HttpResponse.json(categoryResponse);
  }),
);

export const getCategories = http.get(
  '/api/categories',
  withDelay(async () => {
    const categoryListResponse: CategoryListResponse = {
      categories: categories,
    };

    return HttpResponse.json(categoryListResponse);
  }),
);

export const makeGetCategoriesHandler = (
  options: { limit?: number } = { limit: undefined },
) => {
  const { limit = categories.length } = options;

  return http.get(
    '/api/categories',
    withDelay(async () => {
      const filteredCategories = categories.slice(0, limit);

      const response: CategoryListResponse = {
        categories: filteredCategories,
      };

      return HttpResponse.json(response);
    }),
  );
};

export const makeGetCategoryProductsHandler = (
  options: { limit?: number } = { limit: undefined },
) => {
  const { limit = categories.length } = options;

  return http.get(
    '/api/categories/:slug/products',
    withDelay(async ({ params }) => {
      const { slug } = params as { slug?: string };

      const foundCategory = categories.find(
        (category) => category.slug.toLowerCase() === slug?.toLowerCase(),
      );

      if (!foundCategory) {
        return new HttpResponse(undefined, { status: 404 });
      }

      const filteredProducts = sortProductsByNewFirst(
        products.filter(
          (p) => p.category.toLowerCase() === slug?.toLowerCase(),
        ),
      ).slice(0, limit);

      const categoryResponse: CategoryResponse = {
        category: {
          ...foundCategory,
          products: filteredProducts,
        },
      };

      return HttpResponse.json(categoryResponse);
    }),
  );
};

export const categoryHandlers = [
  getCategories,
  getCategoryBySlug,
  getCategoryProducts,
];
