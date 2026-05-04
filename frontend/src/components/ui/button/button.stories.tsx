import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';

import { Button } from '@/components/ui';

type StoryProps = React.ComponentProps<typeof Button> & {
  buttonText: string;
};

const meta = {
  title: 'ui/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'link'],
    },
    disabled: {
      control: 'boolean',
    },
    asChild: {
      control: false,
    },
  },
  render: ({ buttonText, ...props }) => {
    return <Button {...props}>{buttonText}</Button>;
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    buttonText: 'Default',
  },
};

export const Primary: Story = {
  name: 'Variant / Primary',
  args: {
    variant: 'primary',
    buttonText: 'Primary',
  },
};

export const Secondary: Story = {
  name: 'Variant / Secondary',
  args: {
    variant: 'secondary',
    buttonText: 'Secondary',
  },
};

export const Outline: Story = {
  name: 'Variant / Outfile',
  args: {
    variant: 'outline',
    buttonText: 'Outline',
  },
};

export const Link: Story = {
  name: 'Variant / Link',
  args: {
    variant: 'link',
    buttonText: 'Link',
  },
  render: ({ buttonText, ...props }) => {
    return <Button {...props}>{buttonText}</Button>;
  },
};

export const Focused: Story = {
  name: 'State / Focused',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /Focused/i }));
  },
  args: {
    buttonText: 'Focused',
  },
};

export const Disabled: Story = {
  name: 'State / Disabled',
  args: {
    disabled: true,
    buttonText: 'Disabled',
  },
};
