import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spinner } from '@/components/ui';

type StoryProps = React.ComponentProps<typeof Spinner>;

const meta = {
  title: 'ui/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: ({ ...props }) => {
    return (
      <Spinner
        {...props}
        aria-label='Loading something...'
      />
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Primary: Story = {
  name: 'Variant / Primary',
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  name: 'Variant / Secondary',
  args: {
    variant: 'secondary',
  },
};

export const Danger: Story = {
  name: 'Variant / Danger',
  args: {
    variant: 'danger',
  },
};

export const Small: Story = {
  name: 'Size / Small',
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  name: 'Size / Medium',
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  name: 'Size / Large',
  args: {
    size: 'lg',
  },
};
