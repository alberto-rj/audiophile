import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '@/libs/cn';
import { products } from '@/libs/mocks';

import SuggestionList from './suggestion-list';

type StoryProps = React.ComponentProps<typeof SuggestionList>;

const meta = {
  title: 'pages/ProductPage/SuggestionSection/SuggestionList',
  component: SuggestionList,
  parameters: {
    layout: 'fullscreen',
  },
  render: (suggestionListProps) => {
    return (
      <div className={cn('region', 'wrapper')}>
        <SuggestionList {...suggestionListProps} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [...products].splice(0, 3),
  },
};

export const Multiple: Story = {
  args: {
    items: [...products].splice(0, products.length),
  },
};
