import type { Meta, StoryObj } from '@storybook/react-vite';

import { APP_ROUTES } from '@/config/app-routes';
import { WithCredentialsDecorator } from '@/config/storybook';
import { makeGetOrdersHandler } from '@/mocks/handlers';
import { OrdersPage } from '@/pages';

type StoryProps = React.ComponentProps<typeof OrdersPage>;

const meta = {
  title: 'pages/OrdersPage',
  component: OrdersPage,
  parameters: {
    layout: 'fullscreen',
    route: APP_ROUTES.orders,
    routePath: APP_ROUTES.orders,
  },
  decorators: [WithCredentialsDecorator],
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoadingOrders: Story = {
  parameters: {
    msw: {
      handlers: [makeGetOrdersHandler({ type: 'infinite' })],
    },
  },
};

export const FailedToLoadOrders: Story = {
  parameters: {
    msw: {
      handlers: [makeGetOrdersHandler({ type: 'error' })],
    },
  },
};

export const OrdersLoaded: Story = {
  parameters: {
    msw: {
      handlers: [makeGetOrdersHandler()],
    },
  },
};

export const WithSingleOrder: Story = {
  parameters: {
    msw: {
      handlers: [makeGetOrdersHandler({ limit: 1 })],
    },
  },
};

export const EmptyOrders: Story = {
  parameters: {
    msw: {
      handlers: [makeGetOrdersHandler({ limit: 0 })],
    },
  },
};
