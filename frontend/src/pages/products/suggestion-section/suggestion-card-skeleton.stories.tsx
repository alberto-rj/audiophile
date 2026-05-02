import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '@/libs/cn';

import SuggestionCardSkeleton from './suggestion-card-skeleton';

type StoryProps = React.ComponentProps<typeof SuggestionCardSkeleton>;

const meta = {
  title: 'pages/ProductPage/SuggestionSection/SuggestionCardSkeleton',
  component: SuggestionCardSkeleton,
  parameters: {
    layout: 'fullscreen',
  },

  render: (props) => {
    return (
      <div className={cn('region', 'wrapper')}>
        <SuggestionCardSkeleton {...props} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
