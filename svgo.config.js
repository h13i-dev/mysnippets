export default {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          /**
           * デフォルト設定値から変更する場合は上書き
           * docs: https://svgo.dev/docs/preset-default/
           */
          cleanupIds: false,
          removeUnknownsAndDefaults: false,
          removeUnusedNS: false,
        },
      },
    },
  ],
};
