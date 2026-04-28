import type { Meta, StoryObj } from '@storybook/react-vite';

import { CategoryPage } from '@/pages';
import { createCategoryRoute } from '@/libs/app-routes';

type StoryProps = React.ComponentProps<typeof CategoryPage>;

const meta = {
  title: 'pages/CategoryPage',
  component: CategoryPage,
  parameters: {
    layout: 'fullscreen',
    routePath: createCategoryRoute(':slug'),
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Headphones: Story = {
  parameters: {
    route: createCategoryRoute('headphones'),
  },
};

export const Speakers: Story = {
  parameters: {
    route: createCategoryRoute('speakers'),
  },
};

export const Earphones: Story = {
  parameters: {
    route: createCategoryRoute('earphones'),
  },
};
