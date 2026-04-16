import type { StorybookConfig } from '@storybook/react-vite';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/react-vite',
  async viteFinal(config) {
    return defineConfig({
      ...config,
      plugins: [...(config.plugins || []), svgr()],
    });
  },
};

export default config;
