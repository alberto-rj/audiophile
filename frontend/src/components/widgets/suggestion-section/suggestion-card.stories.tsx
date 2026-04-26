import type { Meta, StoryObj } from '@storybook/react-vite';

import SuggestionCard from './suggestion-card';

import { cn } from '@/libs/cn';
import { products } from '@/libs/mocks';

type StoryProps = React.ComponentProps<typeof SuggestionCard>;

const meta = {
  title: 'widgets/SuggestionSection/SuggestionCard',
  component: SuggestionCard,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    product: products.find((p) => p.id === 6),
  },
  render: (props) => {
    return (
      <div className={cn('region', 'wrapper')}>
        <SuggestionCard {...props} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
