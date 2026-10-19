import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { QuantitySelector } from '@/components/widgets';
import { cn } from '@/libs/cn';
import { fn } from 'storybook/test';

type StoryProps = React.ComponentProps<typeof QuantitySelector>;

const meta = {
  title: 'widgets/QuantitySelector',
  component: QuantitySelector,
  args: {
    onChange: fn(),
    value: 1,
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  decorators: (Story, context) => {
    return (
      <div className={cn('min-inline-30')}>
        <Story {...context} />
      </div>
    );
  },

  render: ({ value, ...quantitySelectorProps }) => {
    const [quantity, setQuantity] = useState(value ?? 1);

    const handleQuantityChange = (value: number) => {
      setQuantity(value);
    };

    return (
      <QuantitySelector
        {...quantitySelectorProps}
        value={quantity}
        onChange={handleQuantityChange}
      />
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AtMinimum: Story = {
  name: 'State / At minimum (1)',
  args: {
    min: 1,
  },
};

export const Disabled: Story = {
  name: 'State / Disabled',
  args: {
    disabled: true,
  },
};
