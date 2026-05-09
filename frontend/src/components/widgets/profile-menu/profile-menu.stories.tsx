import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProfileMenu } from '@/components/widgets';
import { cn } from '@/libs/cn';
type StoryProps = React.ComponentProps<typeof ProfileMenu>;

const meta = {
  title: 'widgets/ProfileMenu',
  component: ProfileMenu,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: (Story, ctx) => {
    return (
      <div
        className={cn(
          'min-block-screen',
          'region',
          'flex',
          'justify-center',
          'items-center',

          'bg-gray-900',
        )}
      >
        <div className={cn('wrapper', 'flex', 'justify-center')}>
          <Story {...ctx} />
        </div>
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
