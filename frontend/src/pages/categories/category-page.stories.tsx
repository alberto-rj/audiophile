import type { Meta, StoryObj } from '@storybook/react-vite';

import { APP_ROUTES } from '@/config/app-routes';
import { makeGetCategoriesHandler } from '@/mocks/handlers';
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
      handlers: [makeGetCategoriesHandler()],
    },
  },
};

export const ProductsLoaded: Story = {
  parameters: {
    msw: {
      handlers: [makeGetCategoriesHandler()],
    },
  },
};

export const SingleProductLoaded: Story = {
  parameters: {
    msw: {
      handlers: [makeGetCategoriesHandler()],
    },
  },
};

export const NoProductLoaded: Story = {
  parameters: {
    msw: {
      handlers: [makeGetCategoriesHandler()],
    },
  },
};
