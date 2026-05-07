import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ComponentProps } from 'react';
import { fn } from 'storybook/test';

import { Button, Select } from '@/components/ui';
import { Check, ChevronDown, ChevronUp } from '@/assets/icons';

type StoryProps = React.ComponentProps<typeof Select>;

const meta = {
  title: 'ui/Select',
  component: Select,
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
  render: (selectProps) => {
    return (
      <Select {...selectProps}>
        <Select.Trigger asChild>
          <Button type='button'>
            Select
            <ChevronDown
              focusable={false}
              aria-hidden={true}
            />
          </Button>
        </Select.Trigger>
        <Select.Portal>
          <SelectContent />
        </Select.Portal>
      </Select>
    );
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'banana',
  },
  render: ({ ...selectProps }) => {
    return (
      <Select {...selectProps}>
        <Select.Trigger asChild>
          <Button type='button'>
            Select
            <ChevronDown
              focusable={false}
              aria-hidden={true}
            />
          </Button>
        </Select.Trigger>
        <Select.Portal>
          <SelectContent />
        </Select.Portal>
      </Select>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string>('banana');
    const [open, setOpen] = useState<boolean>(false);

    return (
      <Select
        open={open}
        value={value}
        onOpenChange={setOpen}
        onValueChange={setValue}
      >
        <Select.Trigger asChild>
          <Button type='button'>
            {value}
            <ChevronDown
              focusable={false}
              aria-hidden={true}
            />
          </Button>
        </Select.Trigger>

        <Select.Portal>
          <SelectContent />
        </Select.Portal>
      </Select>
    );
  },
};

const SelectItem = ({
  children,
  ...props
}: ComponentProps<typeof Select.Item>) => {
  return (
    <Select.Item {...props}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator>
        <Check
          focusable={false}
          aria-hidden={true}
        />
      </Select.ItemIndicator>
    </Select.Item>
  );
};

const SelectContent = () => {
  return (
    <Select.Content>
      <Select.ScrollUpButton>
        <ChevronUp
          aria-hidden={true}
          focusable={false}
        />
      </Select.ScrollUpButton>
      <Select.Viewport>
        <Select.Group>
          <Select.Label>Fruits</Select.Label>
          <SelectItem value='apple'>Apple</SelectItem>
          <SelectItem value='banana'>Banana</SelectItem>
          <SelectItem value='blueberry'>Blueberry</SelectItem>
          <SelectItem value='grapes'>Grapes</SelectItem>
          <SelectItem value='pineapple'>Pineapple</SelectItem>
        </Select.Group>

        <Select.Separator />

        <Select.Group>
          <Select.Label>Vegetables</Select.Label>
          <SelectItem value='aubergine'>Aubergine</SelectItem>
          <SelectItem value='broccoli'>Broccoli</SelectItem>
          <SelectItem
            value='carrot'
            disabled
          >
            Carrot
          </SelectItem>
          <SelectItem value='courgette'>Courgette</SelectItem>
          <SelectItem value='leek'>Leek</SelectItem>
        </Select.Group>

        <Select.Separator />

        <Select.Group>
          <Select.Label>Meat</Select.Label>
          <SelectItem value='beef'>Beef</SelectItem>
          <SelectItem value='chicken'>Chicken</SelectItem>
          <SelectItem value='lamb'>Lamb</SelectItem>
          <SelectItem value='pork'>Pork</SelectItem>
        </Select.Group>
      </Select.Viewport>
      <Select.ScrollDownButton>
        <ChevronDown
          focusable={false}
          aria-hidden={true}
        />
      </Select.ScrollDownButton>
    </Select.Content>
  );
};
