import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { QuantitySelector } from '@/components/widgets';
import { cn } from '@/libs/cn';

type StoryProps = React.ComponentProps<typeof QuantitySelector>;

const meta = {
  title: 'widgets/QuantitySelector',
  component: QuantitySelector,
  args: {
    onChange: fn(),
    value: 1,
    min: 1,
  },
  parameters: {
    layout: 'centered',
  },
  render: (quantitySelectorProps) => {
    return (
      <div className={cn('min-w-30')}>
        <QuantitySelector {...quantitySelectorProps} />
      </div>
    );
  },
  tags: ['autodocs'],
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

const ControlledQuantitySelector = (props: Partial<StoryProps>) => {
  const [value, setValue] = useState(props.value ?? 1);
  return (
    <div className='min-w-30'>
      <QuantitySelector
        {...props}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          props.onChange?.(newValue);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <ControlledQuantitySelector {...args} />,
};

export const AtMinimum: Story = {
  name: 'State / At minimum',
  render: (args) => (
    <ControlledQuantitySelector
      {...args}
      value={1}
    />
  ),
};

export const Disabled: Story = {
  name: 'State / Disabled',
  render: (args) => (
    <ControlledQuantitySelector
      {...args}
      disabled
    />
  ),
};
