import type { Meta, StoryObj } from '@storybook/react-vite';

import { orders } from '@/libs/mocks/orders';

import OrderCard from './order-card';

type StoryProps = React.ComponentProps<typeof OrderCard>;

const meta = {
  title: 'pages/OrdersPage/OrderCard',
  component: OrderCard,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Pending: Story = {
  args: {
    order: orders.find((order) => order.status === 'pending')!,
  },
};

export const Processing: Story = {
  args: {
    order: orders.find((order) => order.status === 'processing')!,
  },
};

export const Shipped: Story = {
  args: {
    order: orders.find((order) => order.status === 'shipped')!,
  },
};

export const Delivered: Story = {
  args: {
    order: orders.find((order) => order.status === 'delivered')!,
  },
};

export const Cancelled: Story = {
  args: {
    order: orders.find((order) => order.status === 'cancelled')!,
  },
};
