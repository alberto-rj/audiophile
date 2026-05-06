import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

import { Button, Select } from '@/components/ui';
import { ChevronDown, ChevronUp } from '@/assets/icons';

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
                <Select.Item value='apple'>Apple</Select.Item>
                <Select.Item value='banana'>Banana</Select.Item>
                <Select.Item value='blueberry'>Blueberry</Select.Item>
                <Select.Item value='grapes'>Grapes</Select.Item>
                <Select.Item value='pineapple'>Pineapple</Select.Item>
              </Select.Group>

              <Select.Separator />

              <Select.Group>
                <Select.Label>Vegetables</Select.Label>
                <Select.Item value='aubergine'>Aubergine</Select.Item>
                <Select.Item value='broccoli'>Broccoli</Select.Item>
                <Select.Item
                  value='carrot'
                  disabled
                >
                  Carrot
                </Select.Item>
                <Select.Item value='courgette'>Courgette</Select.Item>
                <Select.Item value='leek'>Leek</Select.Item>
              </Select.Group>

              <Select.Separator />

              <Select.Group>
                <Select.Label>Meat</Select.Label>
                <Select.Item value='beef'>Beef</Select.Item>
                <Select.Item value='chicken'>Chicken</Select.Item>
                <Select.Item value='lamb'>Lamb</Select.Item>
                <Select.Item value='pork'>Pork</Select.Item>
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton>
              <ChevronDown
                aria-hidden={true}
                focusable={false}
              />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select>
    );
  },
};

export const Controlled = {
  render: () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
      <Select
        open={open}
        onOpenChange={setOpen}
      >
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
                <Select.Item value='apple'>Apple</Select.Item>
                <Select.Item value='banana'>Banana</Select.Item>
                <Select.Item value='blueberry'>Blueberry</Select.Item>
                <Select.Item value='grapes'>Grapes</Select.Item>
                <Select.Item value='pineapple'>Pineapple</Select.Item>
              </Select.Group>

              <Select.Separator />

              <Select.Group>
                <Select.Label>Vegetables</Select.Label>
                <Select.Item value='aubergine'>Aubergine</Select.Item>
                <Select.Item value='broccoli'>Broccoli</Select.Item>
                <Select.Item
                  value='carrot'
                  disabled
                >
                  Carrot
                </Select.Item>
                <Select.Item value='courgette'>Courgette</Select.Item>
                <Select.Item value='leek'>Leek</Select.Item>
              </Select.Group>

              <Select.Separator />

              <Select.Group>
                <Select.Label>Meat</Select.Label>
                <Select.Item value='beef'>Beef</Select.Item>
                <Select.Item value='chicken'>Chicken</Select.Item>
                <Select.Item value='lamb'>Lamb</Select.Item>
                <Select.Item value='pork'>Pork</Select.Item>
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton>
              <ChevronDown
                aria-hidden={true}
                focusable={false}
              />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select>
    );
  },
};
