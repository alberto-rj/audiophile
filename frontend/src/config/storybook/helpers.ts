import type { Canvas } from 'storybook/internal/types';
import { expect } from 'storybook/test';

export async function expectErrorAlert(canvas: Canvas) {
  const alert = await canvas.findByTestId('toast_error');

  await expect(alert).toBeInTheDocument();
}

export async function expectSuccessAlert(canvas: Canvas) {
  const alert = await canvas.findByTestId('toast_success');

  await expect(alert).toBeInTheDocument();
}
