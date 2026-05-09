import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProfileMenu } from '@/components/widgets';
type StoryProps = React.ComponentProps<typeof ProfileMenu>;

const meta = {
  title: 'widgets/ProfileMenu',
  component: ProfileMenu,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
