import type { Meta, StoryObj } from '@storybook/react-vite';

import { Navbar } from '@/components/widgets';

type StoryProps = React.ComponentProps<typeof Navbar>;

const meta = {
  title: 'widgets/Navbar',
  component: Navbar,
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
