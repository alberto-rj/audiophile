import type { Meta, StoryObj } from '@storybook/react-vite';

import { Hero } from '@/components/widgets';
import { newProduct, oldProduct } from '@/libs/mocks';

type StoryProps = React.ComponentProps<typeof Hero>;

const meta = {
  title: 'widgets/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: newProduct,
  },
};

export const WithOldProduct: Story = {
  args: {
    product: oldProduct,
  },
};
