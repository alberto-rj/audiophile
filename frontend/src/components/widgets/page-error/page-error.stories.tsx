import type { Meta, StoryObj } from '@storybook/react-vite';

import { PageError } from '@/components/widgets';
type StoryProps = React.ComponentProps<typeof PageError>;

const meta = {
  title: 'widgets/PageError',
  component: PageError,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
