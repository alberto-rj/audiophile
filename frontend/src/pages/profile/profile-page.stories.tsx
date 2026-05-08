import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProfilePage } from '@/pages';

type StoryProps = React.ComponentProps<typeof ProfilePage>;

const meta = {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
