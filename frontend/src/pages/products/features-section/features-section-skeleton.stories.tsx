import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '@/libs/cn';

import FeaturesSectionSkeleton from './features-section-skeleton';

type StoryProps = React.ComponentProps<typeof FeaturesSectionSkeleton>;

const meta = {
  title: 'pages/ProductPage/FeaturesSection/FeaturesSectionSkeleton',
  component: FeaturesSectionSkeleton,
  parameters: {
    layout: 'fullscreen',
  },
  render: (featuresSectionSkeletonProps) => {
    return (
      <div className={cn('region', 'wrapper')}>
        <FeaturesSectionSkeleton {...featuresSectionSkeletonProps} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const With12Lines: Story = {
  args: {
    lines: 12,
  },
};
