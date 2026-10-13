import type {
  ApiCategoryPaginationResponse,
  ApiCategoryResultListResponse,
} from '@audiophile/shared';
import { http, HttpResponse } from 'msw';

import { categories } from '@/libs/mocks';

import { withDelay, withInfiniteDelay } from '../middlewares/with-delay';

export const makeGetCategoriesHandler = (
  options: {
    type?: 'error' | 'infinite' | 'default';
    limit?: number;
  } = {},
) => {
  const endpoint = '/api/categories';

  const { type = 'default', limit = categories.length } = options;

  if (type === 'infinite') {
    return http.get(
      endpoint,
      withInfiniteDelay(async () => {
        return HttpResponse.json(undefined);
      }),
    );
  }

  if (type === 'error') {
    return http.get(
      endpoint,
      withDelay(async () => {
        return HttpResponse.json(undefined, { status: 500 });
      }),
    );
  }

  return http.get(
    endpoint,
    withDelay(async () => {
      const filteredCategories = categories.slice(0, limit);

      const response: ApiCategoryPaginationResponse = {
        results: filteredCategories,
        pagination: {
          hasNext: false,
          hasPrev: false,
          page: 1,
          totalPages: 1,
        },
      };

      return HttpResponse.json(response);
    }),
  );
};

export const makeGetCategoryBySlugHandler = (
  options: {
    type?: 'error' | 'infinite' | 'default';
  } = {},
) => {
  const endpoint = '/api/categories/:slug';

  const { type = 'default' } = options;

  if (type === 'infinite') {
    return http.get(
      endpoint,
      withInfiniteDelay(async () => {
        return HttpResponse.json(undefined);
      }),
    );
  }

  if (type === 'error') {
    return http.get(
      endpoint,
      withDelay(async () => {
        return HttpResponse.json(undefined, { status: 500 });
      }),
    );
  }

  return http.get(
    endpoint,
    withDelay(async ({ params }) => {
      const { slug } = params as { slug?: string };

      const foundCategory = categories.find(
        (category) => category.slug.toLowerCase() === slug?.toLowerCase(),
      );

      if (!foundCategory) {
        return new HttpResponse(undefined, { status: 404 });
      }

      const categoryResponse: ApiCategoryResultListResponse = {
        results: [foundCategory],
      };

      return HttpResponse.json(categoryResponse);
    }),
  );
};

export const categoryHandlers = [
  makeGetCategoriesHandler(),
  makeGetCategoryBySlugHandler(),
];
