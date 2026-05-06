import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

import { Button, DropdownMenu } from '@/components/ui';
import { ChevronDown } from '@/assets/icons';

type StoryProps = React.ComponentProps<typeof DropdownMenu>;

const meta = {
  title: 'ui/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  args: {
    onOpenChange: fn(),
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (dropdownMenuProps) => {
    return (
      <DropdownMenu {...dropdownMenuProps}>
        <DropdownMenu.Trigger asChild>
          <Button type='button'>
            Dropdown menu
            <ChevronDown
              focusable={false}
              aria-hidden={true}
            />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content>
            <DropdownMenu.Label>Label 1</DropdownMenu.Label>
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Label>Label 2</DropdownMenu.Label>
            <DropdownMenu.Item>Item 3</DropdownMenu.Item>
            <DropdownMenu.Item>Item 4</DropdownMenu.Item>
            <DropdownMenu.Item disabled>Item disabled</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu>
    );
  },
};

export const Controlled = {
  render: () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
      <DropdownMenu
        open={open}
        onOpenChange={setOpen}
      >
        <DropdownMenu.Trigger asChild>
          <Button type='button'>
            Dropdown menu
            <ChevronDown
              focusable={false}
              aria-hidden={true}
            />
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content>
            <DropdownMenu.Label>Label 1</DropdownMenu.Label>
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Label>Label 2</DropdownMenu.Label>
            <DropdownMenu.Item>Item 3</DropdownMenu.Item>
            <DropdownMenu.Item>Item 4</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu>
    );
  },
};
