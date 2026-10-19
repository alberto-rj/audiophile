import type { Meta, StoryObj } from '@storybook/react-vite';

import { Hero } from '@/components/widgets';
import { heroNewProduct, heroOldProduct } from '@/libs/constants';

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
    product: heroNewProduct,
  },
};

export const WithOldProduct: Story = {
  args: {
    product: heroOldProduct,
  },
};
