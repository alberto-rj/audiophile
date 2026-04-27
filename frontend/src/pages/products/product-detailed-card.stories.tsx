import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '@/libs/cn';
import type { Product } from '@/libs/types';
import { products } from '@/libs/mocks';

import ProductDetailedCard from './product-detailed-card';

type StoryProps = React.ComponentProps<typeof ProductDetailedCard> & {
  product: Product;
};

const meta = {
  title: 'pages/ProductPage/ProductDetailedCard',
  component: ProductDetailedCard,
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
  render: (props) => {
    return (
      <div className={cn('region', 'wrapper')}>
        <ProductDetailedCard {...props} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: products.find((p) => p.isNew)!,
  },
};

export const Old: Story = {
  args: {
    product: products.find((p) => !p.isNew)!,
  },
};
