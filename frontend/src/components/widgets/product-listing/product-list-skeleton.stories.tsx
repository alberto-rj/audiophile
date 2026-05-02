import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProductListSkeleton } from './product-list-skeleton';
import { cn } from '@/libs/cn';

type StoryProps = React.ComponentProps<typeof ProductListSkeleton>;

const meta = {
  title: 'widgets/ProductListing/ProductListSkeleton',
  component: ProductListSkeleton,
  parameters: {
    layout: 'centered',
  },
  render: (props) => {
    return (
      <div className={cn('region', 'wrapper')}>
        <ProductListSkeleton {...props} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Multiple: Story = {
  args: {
    count: 6,
  },
};
