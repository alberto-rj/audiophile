import type { Meta, StoryObj } from '@storybook/react-vite';
import type { Canvas } from 'storybook/internal/types';
import { userEvent, within } from 'storybook/test';

import { APP_ROUTES } from '@/config/app-routes';
import { WithCredentialsDecorator } from '@/config/storybook';
import { demo } from '@/libs/mocks';
import type { ProfileFormData } from '@/libs/schemas';
import { makeUpdateMeHandler } from '@/mocks/handlers';
import { ProfilePage } from '@/pages';

async function fillProfileForm(canvas: Canvas, data: ProfileFormData) {
  await userEvent.type(await canvas.findByTestId('name'), data.name);
  await userEvent.type(await canvas.findByTestId('email'), data.email);
}

async function fillProfileFormAndSubmit(canvas: Canvas, data: ProfileFormData) {
  await userEvent.type(await canvas.findByTestId('name'), data.name);
  await userEvent.type(await canvas.findByTestId('email'), data.email);

  await userEvent.click(await canvas.findByTestId('saveProfile'));
}

async function clearProfileForm(canvas: Canvas) {
  await userEvent.clear(await canvas.findByTestId('name'));
  await userEvent.clear(await canvas.findByTestId('email'));
}

const profileFormData: ProfileFormData = {
  name: 'Jane Doe',
  email: 'jane@example.com',
};

type StoryProps = React.ComponentProps<typeof ProfilePage>;

const meta = {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  parameters: {
    layout: 'fullscreen',
    route: APP_ROUTES.profile,
    routePath: APP_ROUTES.profile,
    test: {
      dangerouslyIgnoreUnhandledErrors: true,
    },
  },
  decorators: [WithCredentialsDecorator],
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FormFilled: Story = {};

export const FilledValid: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await clearProfileForm(canvas);

    await fillProfileForm(canvas, profileFormData);

    userEvent.tab();
  },
};

export const ValidationErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await clearProfileForm(canvas);

    await userEvent.click(await canvas.findByTestId('name'));
    await userEvent.click(await canvas.findByTestId('email'));
    await userEvent.tab();
  },
};

export const SavingChanges: Story = {
  parameters: {
    msw: {
      handlers: [makeUpdateMeHandler({ type: 'infinite' })],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await clearProfileForm(canvas);

    await fillProfileFormAndSubmit(canvas, profileFormData);
  },
};

export const EmailAlreadyInUse: Story = {
  parameters: {
    msw: {
      handlers: [makeUpdateMeHandler()],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await clearProfileForm(canvas);

    await fillProfileFormAndSubmit(canvas, {
      ...profileFormData,
      email: demo.email,
    });
  },
};

export const SavingFailed: Story = {
  parameters: {
    msw: {
      handlers: [makeUpdateMeHandler({ type: 'error' })],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await clearProfileForm(canvas);

    await fillProfileFormAndSubmit(canvas, profileFormData);
  },
};

export const SavingSucceeds: Story = {
  parameters: {
    msw: {
      handlers: [makeUpdateMeHandler()],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await clearProfileForm(canvas);

    await fillProfileFormAndSubmit(canvas, {
      ...profileFormData,
      email: 'updated@example.com',
    });
  },
};
