import type { Meta, StoryObj } from '@storybook/react-vite';

import { Header } from './header';

type StoryProps = React.ComponentProps<typeof Header>;

const meta = {
  title: 'pages/CategoryPage/Header',
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
