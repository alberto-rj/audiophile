import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '@/libs/cn';

import { SuggestionListSkeleton } from './suggestion-list-skeleton';

type StoryProps = React.ComponentProps<typeof SuggestionListSkeleton>;

const meta = {
  title:
    'pages/ProductPage/SuggestionSection/SuggestionList/SuggestionListSkeleton',
  component: SuggestionListSkeleton,
  parameters: {
    layout: 'fullscreen',
  },
  render: (suggestionListSkeletonProps) => {
    return (
      <div className={cn('region', 'wrapper')}>
        <SuggestionListSkeleton {...suggestionListSkeletonProps} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
