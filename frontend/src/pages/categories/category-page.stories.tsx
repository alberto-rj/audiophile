import type { Meta, StoryObj } from '@storybook/react-vite';

import { APP_ROUTES } from '@/config/app-routes';
import {
  makeGetCategoriesHandler,
  makeGetProductsHandler,
} from '@/mocks/handlers';
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

export const LoadingProducts: Story = {
  parameters: {
    msw: {
      handlers: [],
    },
  },
};

export const FailedToLoadProducts: Story = {
  parameters: {
    msw: {
      handlers: [
        makeGetCategoriesHandler(),
        makeGetProductsHandler({ type: 'error' }),
      ],
    },
  },
};

export const ProductsLoaded: Story = {
  parameters: {
    msw: {
      handlers: [
        makeGetCategoriesHandler(),
        makeGetProductsHandler({ type: 'default' }),
      ],
    },
  },
};

export const SingleProductLoaded: Story = {
  parameters: {
    msw: {
      handlers: [
        makeGetCategoriesHandler(),
        makeGetProductsHandler({ type: 'default', limit: 1 }),
      ],
    },
  },
};

export const NoProductLoaded: Story = {
  parameters: {
    msw: {
      handlers: [
        makeGetCategoriesHandler(),
        makeGetProductsHandler({ type: 'default', limit: 0 }),
      ],
    },
  },
};
