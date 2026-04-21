import type { Meta, StoryObj } from '@storybook/react-vite';

import { CategoryPage } from '@/pages';

type StoryProps = React.ComponentProps<typeof CategoryPage>;

const meta = {
  title: 'pages/CategoryPage',
  component: CategoryPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
