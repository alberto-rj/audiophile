import type { Meta, StoryObj } from '@storybook/react-vite';

import { APP_ROUTES } from '@/config/app-routes';
import { WithCredentialsDecorator } from '@/config/storybook';
import { makeGetOrderHandler } from '@/mocks/handlers';
import { OrderDetailsPage } from '@/pages';

type StoryProps = React.ComponentProps<typeof OrderDetailsPage>;

const meta = {
  title: 'pages/OrderDetailsPage',
  component: OrderDetailsPage,
  parameters: {
    layout: 'fullscreen',
    route: `${APP_ROUTES.orders}/1`,
    routePath: `${APP_ROUTES.orders}/:slug`,
  },
  decorators: [WithCredentialsDecorator],
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoadingOrder: Story = {
  parameters: {
    msw: {
      handlers: [makeGetOrderHandler({ type: 'infinite' })],
    },
  },
};

export const FailedToLoadOrder: Story = {
  parameters: {
    msw: {
      handlers: [makeGetOrderHandler({ type: 'error' })],
    },
  },
};

export const OrderLoaded: Story = {
  parameters: {
    msw: {
      handlers: [makeGetOrderHandler()],
    },
  },
};
