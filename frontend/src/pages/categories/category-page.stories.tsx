import type { Meta, StoryObj } from '@storybook/react-vite';
import { http, HttpResponse } from 'msw';

import { APP_ROUTES } from '@/config/app-routes';
import { API_ENDPOINTS } from '@/config/api-endpoints';
import { withInfiniteDelay } from '@/mocks';
import { getCategories, getCategoryProducts } from '@/mocks/handlers';
import { CategoryPage } from '@/pages';

type StoryProps = React.ComponentProps<typeof CategoryPage>;

const meta = {
  title: 'pages/CategoryPage',
  component: CategoryPage,
  parameters: {
    layout: 'fullscreen',
    routePath: `${APP_ROUTES.categoryProducts}`,
    route: `${APP_ROUTES.categories}/headphones/products`,
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

const categoryProductsEndpoint = `/api${API_ENDPOINTS.categories}/:slug/products`;

export const FetchingProducts: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(
          categoryProductsEndpoint,
          withInfiniteDelay(async () => {
            return HttpResponse.json(undefined);
          }),
        ),
      ],
    },
  },
};

export const CategoryNotFound: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(categoryProductsEndpoint, async () => {
          return new HttpResponse(undefined, { status: 404 });
        }),
      ],
    },
  },
};

export const WithProducts: Story = {
  parameters: {
    msw: {
      handlers: [getCategoryProducts, getCategories],
    },
  },
};
