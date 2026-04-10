import type { Meta, StoryObj } from '@storybook/react-vite';

import { CategoryListing } from '@/components/widgets';

import headphones from '@/assets/shared/desktop/image-category-thumbnail-headphones.png';
import earphones from '@/assets/shared/desktop/image-category-thumbnail-earphones.png';
import speakers from '@/assets/shared/desktop/image-category-thumbnail-speakers.png';

type StoryProps = React.ComponentProps<typeof CategoryListing>;

const meta = {
  title: 'widgets/CategoryListing',
  component: CategoryListing,
  args: {
    items: [
      { category: 'Headphones', image: headphones, slug: '#' },
      { category: 'Speakers', image: speakers, slug: '#' },
      { category: 'Earphones', image: earphones, slug: '#' },
    ],
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
