import type { Meta, StoryObj } from '@storybook/react-vite';

import { BestGear } from '@/components/widgets';

type StoryProps = React.ComponentProps<typeof BestGear>;

const meta = {
  title: 'widgets/BestGear',
  component: BestGear,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
