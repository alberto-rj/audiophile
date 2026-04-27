import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '@/libs/cn';
import { products } from '@/libs/mocks';

import SuggestionListing from './suggestion-listing';

type StoryProps = React.ComponentProps<typeof SuggestionListing>;

const meta = {
  title: 'pages/ProductPage/SuggestionSection/SuggestionListing',
  component: SuggestionListing,
  parameters: {
    layout: 'fullscreen',
  },
  render: (suggestionListingProps) => {
    return (
      <div className={cn('region', 'wrapper')}>
        <SuggestionListing {...suggestionListingProps} />
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
