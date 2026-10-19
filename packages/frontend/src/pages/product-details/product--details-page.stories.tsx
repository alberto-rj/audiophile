import type { Meta, StoryObj } from '@storybook/react-vite';

import { APP_ROUTES } from '@/config/app-routes';
import {
  makeGetCategoriesHandler,
  makeGetProductBySlugHandler,
} from '@/mocks/handlers';
import { ProductDetailsPage } from '@/pages';

type StoryProps = React.ComponentProps<typeof ProductDetailsPage>;

const meta = {
  title: 'pages/ProductDetailsPage',
  component: ProductDetailsPage,
  parameters: {
    layout: 'fullscreen',
    routePath: `${APP_ROUTES.productDetails}`,
    route: `${APP_ROUTES.products}/xx99-mark-two-headphones`,
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoadingProductDetails: Story = {
  parameters: {
    msw: {
      handlers: [
        makeGetProductBySlugHandler({ type: 'infinite' }),
        makeGetCategoriesHandler(),
      ],
    },
  },
};

export const FailedToLoadProductDetails: Story = {
  parameters: {
    msw: {
      handlers: [
        makeGetProductBySlugHandler({ type: 'error' }),
        makeGetCategoriesHandler(),
      ],
    },
  },
};

export const ProductDetailsLoaded: Story = {
  parameters: {
    msw: {
      handlers: [makeGetProductBySlugHandler(), makeGetCategoriesHandler()],
    },
  },
};
