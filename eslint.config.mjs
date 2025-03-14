import { dirname } from 'path';
import globals from 'globals';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import jsLint from '@eslint/js';
import tsLint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  jsLint.configs.recommended,
  ...tsLint.configs.recommended,
  ...[eslintConfigPrettier],
  ...compat.extends('plugin:@next/next/recommended'),
  ...compat.extends('plugin:react-hooks/recommended'),
  ...compat.plugins('simple-import-sort'),
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    // Base
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      // Allow unused variables that start with an underscore.
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'no-console': 'error',
      'prefer-const': 'error',
      'no-useless-escape': 'off',
      'no-useless-catch': 'off',
      'import/no-anonymous-default-export': 'off',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'], // Side effects (e.g., `import 'normalize.css'`)
            ['^react$'],
            ['^[^.]'], // Libs
            ['^../|^~/|^./'],
          ],
        },
      ],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: 'if', next: '*' },
        { blankLine: 'any', prev: '*', next: 'export' },
        { blankLine: 'always', prev: '*', next: 'function' },
        { blankLine: 'always', prev: ['case', 'default'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'any', prev: 'directive', next: 'directive' },
      ],
    },
  },
  {
    // React rules
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/jsx-no-literals': 'off',
    },
  },
  {
    ignores: ['.next/**', 'node_modules/**', '*.config.{ts,js,cjs,mjs}'],
  },
];

export default eslintConfig;
