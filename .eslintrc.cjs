const OFF = 0;
const WARN = 1;
const ERROR = 2;

/** @type {import('eslint').Linter.BaseConfig} */
const config = {
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@next/next/google-font-display': OFF,
    '@next/next/google-font-preconnect': OFF,
    '@typescript-eslint/ban-ts-comment': OFF,
    '@typescript-eslint/ban-types': [ERROR, { types: { '{}': false } }],
    '@typescript-eslint/consistent-type-imports': [
      WARN,
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    '@typescript-eslint/no-empty-function': WARN,
    '@typescript-eslint/no-empty-interface': OFF,
    '@typescript-eslint/no-explicit-any': OFF,
    '@typescript-eslint/no-unused-vars': [
      WARN,
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
    ],
    'array-callback-return': [WARN, { allowImplicit: false }],
    eqeqeq: WARN,
    'import/first': WARN,
    'import/no-anonymous-default-export': [WARN, { allowObject: true }],
    'import/no-duplicates': WARN,
    'no-console': OFF,
    'no-multi-assign': WARN,
    'no-unneeded-ternary': WARN,
    'no-empty-function': OFF,
    'no-unused-vars': OFF,
    'object-shorthand': WARN,
    'prefer-const': WARN,
    'prefer-destructuring': [WARN, { array: false }],
    'react/hook-use-state': WARN,
    'react/jsx-curly-brace-presence': [WARN, { props: 'never', children: 'never' }],
    'react/jsx-no-duplicate-props': ERROR,
    'react/jsx-sort-props': [
      WARN,
      {
        shorthandFirst: true,
        callbacksLast: true,
        multiline: 'last',
        reservedFirst: true,
        noSortAlphabetically: true,
      },
    ],
    'react/self-closing-comp': WARN,
    'spaced-comment': [WARN, 'always', { markers: ['/'] }],
  },
};

module.exports = config;
