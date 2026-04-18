import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '@/libs/cn';
import { productDetailedCardContent } from '@/libs/constants';

import ProductDetailedCard from './product-detailed-card';

type StoryProps = React.ComponentProps<typeof ProductDetailedCard>;

const meta = {
  title: 'pages/Product Detail/ProductDetailedCard',
  component: ProductDetailedCard,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    content: productDetailedCardContent,
  },
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

export const Default: Story = {};

export const Old: Story = {
  args: {
    content: {
      ...productDetailedCardContent,
      isNew: false,
    },
  },
};
