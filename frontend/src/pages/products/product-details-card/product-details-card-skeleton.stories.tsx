import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '@/libs/cn';

import ProductDetailsCardSkeleton from './product-details-card-skeleton';

type StoryProps = React.ComponentProps<typeof ProductDetailsCardSkeleton>;

const meta = {
  title: 'pages/ProductPage/ProductDetailsCard/ProductDetailsCardSkeleton',
  component: ProductDetailsCardSkeleton,
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
  render: (props) => {
    return (
      <div className={cn('region', 'wrapper')}>
        <ProductDetailsCardSkeleton {...props} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
