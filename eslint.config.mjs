import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

const { configs: jsConfigs } = js;
const { configs: tsConfigs } = ts;
const { parser } = tsParser;

export default [
  {
    languageOptions: {
      parser: parser,
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...jsConfigs.recommended.rules,
      ...tsConfigs.recommended.rules,
      'arrow-spacing': ['warn', { before: true, after: true }],
      'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': 'error',
      'comma-style': 'error',
      curly: ['error', 'multi-line', 'consistent'],
      'dot-location': ['error', 'property'],
      'indent': ['error', 2],
      'keyword-spacing': 'error',
      'no-console': 'off',
      'no-empty-function': 'error',
      'no-floating-decimal': 'error',
      'no-lonely-if': 'error',
      'no-multi-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1, maxBOF: 0 }],
      'no-shadow': ['error', { allow: ['err', 'resolve', 'reject'] }],
      '@typescript-eslint/no-shadow': 'error',
      'no-var': 'error',
      'object-curly-spacing': ['error', 'always'],
      'prefer-const': 'error',
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'space-before-blocks': 'error',
      'space-before-function-paren': ['error', {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      }],
    },
  },
];
