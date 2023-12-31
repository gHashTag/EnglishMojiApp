module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['@typescript-eslint', 'react', 'prettier', 'react-native', 'import'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal', 'sibling'],
            pathGroups: [
              {
                pattern: 'react',
                group: 'builtin',
                position: 'before'
              }
            ],
            pathGroupsExcludedImportTypes: ['react'],
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true
            }
          }
        ],
        'sort-imports': [
          'error',
          {
            ignoreDeclarationSort: true
          }
        ],
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        semi: 'off',
        'no-catch-shadow': 'off',
        'import/no-default-export': 'off',
        'react-native/no-unused-styles': 2,
        'react-native/split-platform-components': 'off',
        'react-native/no-inline-styles': 2,
        'react-native/no-color-literals': 'off',
        'react-native/no-single-element-style-arrays': 2,
        'react-hooks/exhaustive-deps': 'warn'
      }
    }
  ]
}
