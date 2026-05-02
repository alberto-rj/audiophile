import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '@/libs/cn';

import { SuggestionSectionSkeleton } from './suggestion-section-skeleton';

type StoryProps = React.ComponentProps<typeof SuggestionSectionSkeleton>;

const meta = {
  title: 'pages/ProductPage/SuggestionSectionSkeleton',
  component: SuggestionSectionSkeleton,
  parameters: {
    layout: 'fullscreen',
  },
  render: (suggestionSectionSkeletonProps) => {
    return (
      <div className={cn('region', 'wrapper')}>
        <SuggestionSectionSkeleton {...suggestionSectionSkeletonProps} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
