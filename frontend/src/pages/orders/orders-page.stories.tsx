import type { Meta, StoryObj } from '@storybook/react-vite';

import { OrdersPage } from '@/pages';
type StoryProps = React.ComponentProps<typeof OrdersPage>;

const meta = {
  title: 'pages/OrdersPage',
  component: OrdersPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
