import type { Meta, StoryObj } from '@storybook/react-vite';

import { BestGear } from '@/components/widgets';
import { cn } from '@/libs/cn';

type StoryProps = React.ComponentProps<typeof BestGear>;

const meta = {
  title: 'widgets/BestGear',
  component: BestGear,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: (Story, context) => {
    return (
      <div className={cn('wrapper', 'region')}>
        <Story {...context} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
