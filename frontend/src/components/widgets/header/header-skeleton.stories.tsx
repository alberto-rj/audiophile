import type { Meta, StoryObj } from '@storybook/react-vite';

import { HeaderSkeleton } from '@/components/widgets';

type StoryProps = React.ComponentProps<typeof HeaderSkeleton>;

const meta = {
  title: 'widgets/Header/HeaderSkeleton',
  component: HeaderSkeleton,
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
