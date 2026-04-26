import type { Meta, StoryObj } from '@storybook/react-vite';

import { CategoryListing } from '@/components/widgets';
import { cn } from '@/libs/cn';

type StoryProps = React.ComponentProps<typeof CategoryListing>;

const meta = {
  title: 'widgets/CategoryListing',
  component: CategoryListing,
  parameters: {
    layout: 'fullscreen',
  },
  render: () => {
    return (
      <div className={cn('py-10', 'wrapper')}>
        <CategoryListing />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Multiple: Story = {
  args: {},
};
