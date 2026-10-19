import type { Meta, StoryObj } from '@storybook/react-vite';

import { HeaderSkeleton } from './header-skeleton';

type StoryProps = React.ComponentProps<typeof HeaderSkeleton>;

const meta = {
  title: 'pages/categoryPage/HeaderSkeleton',
  component: HeaderSkeleton,
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
