/**
 * 画像圧縮設定ファイル
 * このファイルをImageCompression.jsから読み込んで使用します
 */

export default {
  baseURL: 'dist', // 圧縮するディレクトリパス
  settings: [
    /**
     * 圧縮設定
     * target: 圧縮対象の画像パス・ファイル名（Globパターン）
     * compressFlag: 圧縮フラグ（boolean）
     * options: sharpのオプション（object）
     * ※optionsの設定によっては画像サイズが大きくなる場合があるので注意
     */

    // Globパターン記述例
    // {
    //   target: '**/assets/images/top/**/*.jpg', // top配下の全JPG
    //   target: '**/assets/images/**/*.{jpg,png}', // 全階層のJPG・PNG
    //   target: '**/assets/images/**/thumb_*', // 全階層のthumbファイル
    //   target: '**/assets/images/*/logo.png', // 1階層下のlogo.png
    //   compressFlag: true, // 圧縮をするかどうか（trueの場合は省略可能）
    //   options: {
    //     // jpegオプション
    //     // docs(jpeg):https://sharp.pixelplumbing.com/api-output#jpeg
    //     jpeg: {
    //       mozjpeg: true, // タイプ：boolean 初期値：true 説明：mozjpegの使用
    //       quality: 80, // タイプ：number 初期値：80 説明：画質を調整（1-100）
    //     }
    //     // pngオプション
    //     // docs(png):https://sharp.pixelplumbing.com/api-output#png
    //     png: {
    //       palette: true, // タイプ：boolean 初期値：false 説明：パレットを使用
    //       compressionLevel: 9, // タイプ：number 初期値：9 説明：圧縮レベル（0-9）
    //       quality: 100, // タイプ：number 初期値：100 説明：画質を調整（1-100）
    //     }
    //   },
    // },

    {
      /**
       * 例：画像を圧縮しない場合（Globパターン）
       * 下記はstep0~9のフォルダ配下にある画像を圧縮しない
       */
      target: '**/assets/images/**/step[0-9]/**/*',
      compressFlag: false,
    },
    {
      /**
       * 例：特定ファイルを圧縮しない場合
       * 特定のファイルを圧縮対象外にする
       */
      target: '**/assets/images/case/thumb_01.jpg',
      compressFlag: false,
    },
    {
      /**
       * 例：オプションを指定して画像を圧縮する場合（jpeg）
       * jpegのオプションを指定する場合は、options内にjpegオブジェクトを設定する
       */
      target: '**/assets/images/_dummy/001.jpg',
      compressFlag: true, // trueの場合省略可能
      options: {
        jpeg: {
          quality: 1,
        },
      },
    },
    {
      /**
       * 例：オプションを指定して画像を圧縮する場合（png）
       * pngのオプションを指定する場合は、options内にpngオブジェクトを設定する
       */
      target: '**/assets/images/_dummy/012.png',
      compressFlag: true, // trueの場合省略可能
      options: {
        png: {
          quality: 1,
        },
      },
    },
    {
      /**
       * 例：フォルダ指定で画像を圧縮する場合（jpeg&png）
       * Globパターンでフォルダ配下の画像を指定
       */
      target: '**/assets/images/top/**/*',
      options: {
        jpeg: {
          quality: 90,
        },
        png: {
          quality: 80,
        },
      },
    },
    {
      /**
       * Globパターンの追加例
       */
      target: '**/assets/images/common/**/*.jpg', // 全フォルダのJPG
      options: {
        jpeg: { quality: 75 },
      },
    },
    {
      target: '**/assets/images/**/thumb_*', // 全階層のthumbファイル
      compressFlag: false, // サムネイルは圧縮しない
    },
  ],
};
