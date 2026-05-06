import type { Meta, StoryObj } from '@storybook/react-vite';

import { UserProfileMenu } from '@/components/widgets';
type StoryProps = React.ComponentProps<typeof UserProfileMenu>;

const meta = {
  title: 'widgets/UserProfileMenu',
  component: UserProfileMenu,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
