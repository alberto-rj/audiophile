import type { Meta, StoryObj } from '@storybook/react-vite';

import { Footer } from '@/components/widgets';

type StoryProps = React.ComponentProps<typeof Footer>;

const meta = {
  title: 'widgets/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
