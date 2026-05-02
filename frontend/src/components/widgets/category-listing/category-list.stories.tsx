import type { Meta, StoryObj } from '@storybook/react-vite';

import { categories } from '@/libs/mocks/categories';

import { CategoryList } from './category-list';

type StoryProps = React.ComponentProps<typeof CategoryList>;

const meta = {
  title: 'widgets/CategoryListing/CategoryList',
  component: CategoryList,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [...categories].splice(0, 3),
  },
};

export const Multiple: Story = {
  args: {
    items: [...categories].splice(0, categories.length),
  },
};

export const Single: Story = {
  args: {
    items: [...categories].splice(0, 1),
  },
};
