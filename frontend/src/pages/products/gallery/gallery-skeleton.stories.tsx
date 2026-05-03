import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '@/libs/cn';

import GallerySkeleton from './gallery-skeleton';

type StoryProps = React.ComponentProps<typeof GallerySkeleton>;

const meta = {
  title: 'pages/ProductPage/Gallery/GallerySkeleton',
  component: GallerySkeleton,
  parameters: {
    layout: 'fullscreen',
  },
  render: (gallerySGallerySkeletonProps) => {
    return (
      <div className={cn('region', 'wrapper')}>
        <GallerySkeleton {...gallerySGallerySkeletonProps} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
