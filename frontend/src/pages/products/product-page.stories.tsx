import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProductPage } from '@/pages';
import { createProductRoute } from '@/libs/app-routes';

type StoryProps = React.ComponentProps<typeof ProductPage>;

const meta = {
  title: 'pages/ProductPage',
  component: ProductPage,
  parameters: {
    layout: 'fullscreen',
    routePath: createProductRoute(':slug'),
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const XX59Headphones: Story = {
  name: 'Headphones / XX59',
  parameters: {
    route: createProductRoute('xx59-headphones'),
  },
};

export const YX1Earphones: Story = {
  name: 'Earphones / YX1',
  parameters: {
    route: createProductRoute('yx1-earphones'),
  },
};

export const XX99Headphones: Story = {
  name: 'Headphones / XX99 Mark Two',
  parameters: {
    route: createProductRoute('xx99-mark-two-headphones'),
  },
};
