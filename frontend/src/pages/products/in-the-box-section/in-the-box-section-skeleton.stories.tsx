import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '@/libs/cn';

import InTheBoxSectionSkeleton from './in-the-box-section.-skeleton';

type StoryProps = React.ComponentProps<typeof InTheBoxSectionSkeleton>;

const meta = {
  title: 'pages/ProductPage/InTheBoxSection/InTheBoxSectionSkeleton',
  component: InTheBoxSectionSkeleton,
  parameters: {
    layout: 'fullscreen',
  },
  render: (inTheBoxSectionSkeletonProps) => {
    return (
      <div className={cn('region', 'wrapper')}>
        <InTheBoxSectionSkeleton {...inTheBoxSectionSkeletonProps} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    itemsCount: 10,
  },
};
