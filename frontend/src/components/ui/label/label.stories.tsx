import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from '@/components/ui';

type StoryProps = React.ComponentProps<typeof Label> & {
  labelText: string;
};

const meta = {
  title: 'ui/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: ({ labelText, ...labelProps }) => {
    return <Label {...labelProps}>{labelText}</Label>;
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labelText: 'Default',
  },
};

export const Invalid: Story = {
  name: 'State / Invalid',
  args: {
    labelText: 'Invalid',
    isInvalid: true,
  },
};
