// Docs: https://prettier.io/docs/en/options.html

export default {
  printWidth: 10000,
  htmlWhitespaceSensitivity: 'ignore', // htmlの空白の感度について無視する
  plugins: ['prettier-plugin-astro'], // インポートしたプラグインを配列に追加
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
