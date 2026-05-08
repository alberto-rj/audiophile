import type { Meta, StoryObj } from '@storybook/react-vite';

import { AuthCTA } from '@/components/widgets';
type StoryProps = React.ComponentProps<typeof AuthCTA>;

const meta = {
  title: 'widgets/AuthCTA',
  component: AuthCTA,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
