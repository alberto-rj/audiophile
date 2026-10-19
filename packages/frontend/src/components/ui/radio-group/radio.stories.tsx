import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Radio } from '@/components/ui';
import { cn } from '@/libs/cn';

type StoryProps = React.ComponentProps<typeof Radio>;

const meta = {
  title: 'ui/Radio',
  component: Radio,
  tags: ['autodocs'],
  args: {
    name: 'paymentMethod',
    label: 'e-Money',
    value: 'e-money',
    onChange: fn(),
  },
  parameters: {
    layout: 'centered',
  },
  render: (radioProps) => {
    return (
      <div className={cn('min-w-80')}>
        <Radio {...radioProps} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  name: 'State / Checked',
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  name: 'State / Disabled',
  args: {
    disabled: true,
  },
};

export const CheckedAndDisabled: Story = {
  name: 'State / Checked and Disabled',
  args: {
    checked: true,
    disabled: true,
  },
};
