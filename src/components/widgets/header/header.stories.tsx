import type { Meta, StoryObj } from '@storybook/react-vite';

import { Header } from '@/components/widgets';

type StoryProps = React.ComponentProps<typeof Header>;

const meta = {
  title: 'widgets/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'headphones',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
