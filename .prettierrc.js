module.exports = {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  plugins: [
    'prettier-plugin-mdx',
    '@ianvs/prettier-plugin-sort-imports',
  ],
  overrides: [
    {
      files: '*.mdx',
      options: {
        printWidth: 80,
        proseWrap: 'always',
        embeddedLanguageFormatting: 'auto'
      }
    }
  ]
} 