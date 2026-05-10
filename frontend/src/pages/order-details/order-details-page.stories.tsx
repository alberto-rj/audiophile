import type { Meta, StoryObj } from '@storybook/react-vite';

import { OrderDetailsPage } from '@/pages';
type StoryProps = React.ComponentProps<typeof OrderDetailsPage>;

const meta = {
  title: 'pages/OrderDetailsPage',
  component: OrderDetailsPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
