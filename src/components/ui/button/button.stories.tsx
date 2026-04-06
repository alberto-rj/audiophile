import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppIcon, Button } from '@/components/ui';
import { ArrowRight } from '@/assets/icons';

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
      options: ['primary', 'outline', 'ghost'],
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

export const Outline: Story = {
  name: 'Variant / Outfile',
  args: {
    variant: 'outline',
    buttonText: 'Outline',
  },
};

export const Ghost: Story = {
  name: 'Variant / Ghost',
  args: {
    variant: 'ghost',
    buttonText: 'Ghost',
  },
  render: ({ buttonText, ...props }) => {
    return (
      <Button {...props}>
        {buttonText}
        <AppIcon Icon={ArrowRight} />
      </Button>
    );
  },
};

export const Small: Story = {
  name: 'Size / Small',
  args: {
    size: 'sm',
    buttonText: 'Small',
  },
};

export const Medium: Story = {
  name: 'Size / Medium',
  args: {
    size: 'md',
    buttonText: 'Medium',
  },
};

export const Disabled: Story = {
  name: 'State / Disabled',
  args: {
    disabled: true,
    buttonText: 'Disabled',
  },
};
