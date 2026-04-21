import type { Meta, StoryObj } from '@storybook/react-vite';

import { HomePage } from '@/pages';

type StoryProps = React.ComponentProps<typeof HomePage>;

const meta = {
  title: 'pages/HomePage',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
