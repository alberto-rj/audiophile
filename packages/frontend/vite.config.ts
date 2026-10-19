/// <reference types="vitest/config" />

import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

const dirname = import.meta.dirname;

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
    tsconfigPaths: true,
  },
  test: {},
});
