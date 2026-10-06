import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    ignores: ['dist', 'node_modules', 'build', 'coverage', 'logs'],
  },

  ...tseslint.configs.recommended,

  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],

    languageOptions: {
      globals: globals.browser,
    },

    plugins: {
      prettier: prettierPlugin,
    },

    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'no-console': 'warn',

      'prettier/prettier': 'error',
    },
  },

  prettierConfig,
]);
