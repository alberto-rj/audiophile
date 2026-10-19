import type { Meta, StoryObj } from '@storybook/react-vite';

import { CategoriesListing } from '@/components/widgets';
import { cn } from '@/libs/cn';
import { makeGetCategoriesHandler } from '@/mocks/handlers';

type StoryProps = React.ComponentProps<typeof CategoriesListing>;

const meta = {
  title: 'widgets/CategoriesListing',
  component: CategoriesListing,
  parameters: {
    layout: 'fullscreen',
  },
  render: () => {
    return (
      <div className={cn('py-10', 'wrapper')}>
        <CategoriesListing />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoadingCategories: Story = {
  parameters: {
    msw: {
      handlers: [makeGetCategoriesHandler({ type: 'infinite' })],
    },
  },
};

export const FailedToLoadCategories: Story = {
  parameters: {
    msw: {
      handlers: [makeGetCategoriesHandler({ type: 'error' })],
    },
  },
};

export const ThreeCategoriesLoaded: Story = {
  parameters: {
    msw: {
      handlers: [makeGetCategoriesHandler({ limit: 3 })],
    },
  },
};

export const SingleCategoryLoaded: Story = {
  parameters: {
    msw: {
      handlers: [makeGetCategoriesHandler({ limit: 1 })],
    },
  },
};

export const NoCategoryLoaded: Story = {
  parameters: {
    msw: {
      handlers: [makeGetCategoriesHandler({ limit: 0 })],
    },
  },
};
