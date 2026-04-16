import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';

import { Input } from '@/components/ui';
import { cn } from '@/libs/cn';

type StoryProps = React.ComponentProps<typeof Input>;

const meta = {
  title: 'ui/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: 'Insert your name',
  },
  parameters: {
    layout: 'centered',
  },
  render: (inputProps) => {
    return (
      <div className=''>
        <div className={cn('min-w-80')}>
          <Input {...inputProps} />
        </div>
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Focused: Story = {
  name: 'State / Focused',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('textbox'));
  },
};

export const Invalid: Story = {
  name: 'State / Invalid',
  args: {
    isInvalid: true,
  },
};

export const InvalidWithValue: Story = {
  name: 'State / Invalid with value',
  args: {
    isInvalid: true,
    value: 'John Doe',
  },
};

export const Disabled: Story = {
  name: 'State / Disabled',
  args: {
    disabled: true,
  },
};

export const DisabledWithValue: Story = {
  name: 'State / Disabled with value',
  args: {
    disabled: true,
    value: 'John Doe',
  },
};
