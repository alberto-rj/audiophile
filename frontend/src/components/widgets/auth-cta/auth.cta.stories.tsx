import type { Meta, StoryObj } from '@storybook/react-vite';

import { AuthCTA } from '@/components/widgets';
import { cn } from '@/libs/cn';

type StoryProps = React.ComponentProps<typeof AuthCTA>;

const meta = {
  title: 'widgets/AuthCTA',
  component: AuthCTA,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    className: cn('flex', 'items-center', 'gap-8'),
  },
  decorators: (Story, ctx) => {
    return (
      <div
        className={cn(
          'min-block-screen',
          'flex',
          'justify-center',
          'items-center',

          'bg-gray-900',
        )}
      >
        <div className={cn('wrapper', 'region')}>
          <Story {...ctx} />
        </div>
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
