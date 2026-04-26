import type { Meta, StoryObj } from '@storybook/react-vite';

import { CategoryCard } from '@/components/widgets';
import { cn } from '@/libs/cn';
import { categories } from '@/libs/mocks/categories';

type StoryProps = React.ComponentProps<typeof CategoryCard>;

const meta = {
  title: 'widgets/CategoryCard',
  component: CategoryCard,
  args: {
    category: categories.find((c) => c.id === 1),
  },
  parameters: {
    layout: 'centered',
  },
  render: (categoryCardProps) => {
    return (
      <div
        className={cn(
          'grid grid-cols-[repeat(1,minmax(0,37.5rem))] justify-items-center',
        )}
      >
        <CategoryCard {...categoryCardProps} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
