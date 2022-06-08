module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@vue/standard',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    BMapGL: true,
    BMAP_STATUS_SUCCESS: true,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 3,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    'vue/html-closing-bracket-spacing': [
      'error',
      {
        selfClosingTag: 'never',
      },
    ],
    'import/first': 0,
    'import/no-duplicates': 0,
    'operator-linebreak': ['error', 'before'],
    'vue/no-setup-props-destructure': 0,
    'vue/multi-word-component-names': 0,
    'no-unused-vars': 0,
  },
}
