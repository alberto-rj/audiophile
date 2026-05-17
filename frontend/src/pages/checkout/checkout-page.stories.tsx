import type { Meta, StoryObj } from '@storybook/react-vite';

import { CheckoutPage } from '@/pages';

type StoryProps = React.ComponentProps<typeof CheckoutPage>;

const meta = {
  title: 'pages/CheckoutPage',
  component: CheckoutPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
