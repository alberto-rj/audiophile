import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '@/libs/cn';

import ProductDetailedCardSkeleton from './product-detailed-card-skeleton';

type StoryProps = React.ComponentProps<typeof ProductDetailedCardSkeleton>;

const meta = {
  title: 'pages/ProductPage/ProductDetailedCardSkeleton',
  component: ProductDetailedCardSkeleton,
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
  render: (props) => {
    return (
      <div className={cn('region', 'wrapper')}>
        <ProductDetailedCardSkeleton {...props} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
