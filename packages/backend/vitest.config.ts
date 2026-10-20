/// <reference types="vitest" />

import path from 'node:path';
import { defineConfig } from 'vitest/config';

const dirname = import.meta.dirname;

export default defineConfig({
  test: {
    globals: true,

    include: ['src/**/*.{spec,test}.ts'],

    testTimeout: 10000,

    coverage: {
      reportsDirectory: './coverage',

      include: ['src/**/*.ts'],

      exclude: [
        '**/node_modules/**',
        '**/dist/**',

        // Ignore openapi and seed files
        '**/openapi/**',
        '**/seeds/**',

        // Ignore test files
        '**/*.spec.ts',
        '**/*.test.ts',

        // Ignore files that contains only types
        '**/types/**',
        '**/*.d.ts',
        '**/*.types.ts',
        '**/*.contract.ts',
        '**/*.protocol.ts',
        '**/*.interface.ts',

        // Ignore mock, directories and test utilities
        '**/*.mock.ts',
        '**/*.mocks.ts',
        '**/mocks/**',
        '**/__mocks__/**',
        '**/__tests__/**',
        '**/__test-utils__/**',
        '**/__test-helpers__/**',
        '**/*.test-utils.ts',
        '**/*.test-helpers.ts',
      ],
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(dirname, 'src'),
    },
  },
});
