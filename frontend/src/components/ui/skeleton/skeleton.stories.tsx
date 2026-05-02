import type { Meta, StoryObj } from '@storybook/react-vite';

import { Skeleton } from '@/components/ui';
import { cn } from '@/libs/cn';

type StoryProps = React.ComponentProps<typeof Skeleton>;

const meta = {
  title: 'ui/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: ({ ...props }) => {
    return (
      <Skeleton
        {...props}
        aria-label='Loading something...'
        className={cn('inline-20', 'block-6')}
      />
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
