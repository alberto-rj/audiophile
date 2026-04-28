import type { Meta, StoryObj } from '@storybook/react-vite';

import { GoBack } from '@/components/widgets';

type StoryProps = React.ComponentProps<typeof GoBack>;

const meta = {
  title: 'widgets/GoBack',
  component: GoBack,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <GoBack.Control />,
  },
};
