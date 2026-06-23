import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import htmlParser from '@html-eslint/parser';
import htmlPlugin from '@html-eslint/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  // 1. Global Ignores (This replaces .eslintignore)
  {
    ignores: ['node_modules/', 'dist/', 'build/', 'coverage/', '*.config.js'],
  },

  // 2. Configuration for TypeScript and JavaScript Files
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // Inherit basic recommended rules
      ...tsPlugin.configs.recommended.rules,

      // Custom Adjustments
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // 3. Configuration for HTML Files
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: htmlParser,
    },
    plugins: {
      '@html-eslint': htmlPlugin,
    },
    rules: {
      ...htmlPlugin.configs.recommended.rules,
      '@html-eslint/indent': ['error', 2], // Enforce 2-space indentation
      '@html-eslint/require-img-alt': 'error', // Force images to have alt tags
      '@html-eslint/no-duplicate-attrs': 'error', // Prevent duplicate HTML attributes
    },
  },

  // 4. Prettier Integration (Must be last to override stylistic formatting rules)
  eslintConfigPrettier,
];
