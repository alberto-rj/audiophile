import type { Meta, StoryObj } from '@storybook/react-vite';

import { CategoryListing } from '@/components/widgets';

import headphones from '@/assets/shared/desktop/image-category-thumbnail-headphones.png';
import earphones from '@/assets/shared/desktop/image-category-thumbnail-earphones.png';
import speakers from '@/assets/shared/desktop/image-category-thumbnail-speakers.png';

type StoryProps = React.ComponentProps<typeof CategoryListing>;

const categoryProps: StoryProps = {
  items: [
    { category: 'Headphones', image: headphones, slug: '#' },
    { category: 'Speakers', image: speakers, slug: '#' },
    { category: 'Earphones', image: earphones, slug: '#' },
  ],
};

const meta = {
  title: 'widgets/CategoryListing',
  component: CategoryListing,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [...categoryProps.items],
  },
};

export const Multiple: Story = {
  args: {
    items: [
      ...categoryProps.items,
      ...categoryProps.items,
      ...categoryProps.items,
    ],
  },
};
