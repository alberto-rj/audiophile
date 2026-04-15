import type { Meta, StoryObj } from '@storybook/react-vite';

import { CategoryListing } from '@/components/widgets';

import { categoriesContent } from '@/libs/constants';
import { cn } from '@/libs/cn';

type StoryProps = React.ComponentProps<typeof CategoryListing>;

const categoryProps: StoryProps = {
  items: categoriesContent,
};

const meta = {
  title: 'widgets/CategoryListing',
  component: CategoryListing,
  parameters: {
    layout: 'fullscreen',
  },
  render: (categoryProps) => {
    return (
      <div className={cn('py-10', 'wrapper')}>
        <CategoryListing {...categoryProps} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [...categoryProps.items],
  },
};

export const Multiple: Story = {
  args: {
    items: [
      ...categoryProps.items,
      ...categoryProps.items,
      ...categoryProps.items,
    ],
  },
};
