import type { Meta, StoryObj } from '@storybook/react-vite';

import { NotFoundPage } from '@/pages';
type StoryProps = React.ComponentProps<typeof NotFoundPage>;

const meta = {
  title: 'pages/NotFoundPage',
  component: NotFoundPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
