import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '@/libs/cn';

import ProductCardSkeleton from './product-card.skeleton';

type StoryProps = React.ComponentProps<typeof ProductCardSkeleton>;

const meta = {
  title: 'widgets/ProductListing/ProductCardSkeleton',
  component: ProductCardSkeleton,
  parameters: {
    layout: 'fullscreen',
  },
  render: (props) => {
    return (
      <div className={cn('region', 'wrapper')}>
        <ProductCardSkeleton {...props} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Reversed: Story = {
  args: {
    isReversed: true,
  },
};
