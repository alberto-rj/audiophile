import type { Meta, StoryObj } from '@storybook/react-vite';

import { CategoryCardSkeleton } from './category-card-skeleton';

type StoryProps = React.ComponentProps<typeof CategoryCardSkeleton>;

const meta = {
  title: 'widgets/CategoriesListing/CategoryCardSkeleton',
  component: CategoryCardSkeleton,
  parameters: {
    layout: 'centered',
  },
  render: () => {
    return <CategoryCardSkeleton />;
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
