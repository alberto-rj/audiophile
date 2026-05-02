import type { Meta, StoryObj } from '@storybook/react-vite';

import { PageLoader } from '@/components/widgets';
type StoryProps = React.ComponentProps<typeof PageLoader>;

const meta = {
  title: 'widgets/PageLoader',
  component: PageLoader,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
