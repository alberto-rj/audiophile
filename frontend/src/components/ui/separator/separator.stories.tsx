import type { Meta, StoryObj } from '@storybook/react-vite';

import { Separator } from '@/components/ui';
import { cn } from '@/libs/cn';

type StoryProps = React.ComponentProps<typeof Separator>;

const meta = {
  title: 'ui/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: (Story, ctx) => {
    return (
      <div
        className={cn(
          'flex',
          'justify-center',
          'items-center',
          'inline-screen',
          'block-screen',

          'bg-gray-900',
        )}
      >
        <Story {...ctx} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Horizontal: Story = {
  name: 'Orientation / Horizontal',
  args: {
    orientation: 'horizontal',
  },
};

export const Vertical: Story = {
  name: 'Orientation / Vertical',
  args: {
    orientation: 'vertical',
  },
};
