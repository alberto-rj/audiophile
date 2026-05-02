import type { Meta, StoryObj } from '@storybook/react-vite';

import { CategoryListSkeleton } from './category-list-skeleton';

type StoryProps = React.ComponentProps<typeof CategoryListSkeleton>;

const meta = {
  title: 'widgets/CategoryListing/CategoryListSkeleton',
  component: CategoryListSkeleton,
  parameters: {
    layout: 'centered',
  },
  render: () => {
    return <CategoryListSkeleton />;
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Multiple: Story = {
  args: {
    count: 6,
  },
};
