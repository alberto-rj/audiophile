import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '@/libs/cn';
import { productCardContent } from '@/libs/constants';

import { ProductCard } from './product-card';

type StoryProps = React.ComponentProps<typeof ProductCard>;

const meta = {
  title: 'widgets/ProductListing/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    content: productCardContent,
  },
  render: (props) => {
    return (
      <div className={cn('region', 'wrapper')}>
        <ProductCard {...props} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Reversed: Story = {
  args: {
    content: {
      ...productCardContent,
      isReversed: true,
    },
  },
};

export const Old: Story = {
  args: {
    content: {
      ...productCardContent,
      isNew: false,
    },
  },
};

export const OldAndReversed: Story = {
  args: {
    content: {
      ...productCardContent,
      isReversed: true,
      isNew: false,
    },
  },
};
