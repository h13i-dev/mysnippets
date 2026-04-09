export default function printPage(selector: string) {
  const selecotr = document.querySelector(selector);

  if (selecotr) {
    selecotr.addEventListener('click', function () {
      const images = document.querySelectorAll('img');
      let imagesLoaded = 0;
      const totalImages = images.length;

      // ページに画像がない場合は、すぐに印刷を実行
      if (totalImages === 0) {
        window.print();
        return;
      }

      /**
       * 遅延読み込み画像の強制読み込み
       */
      images.forEach((img) => {
        // 遅延読み込み属性を削除して強制読み込み
        if (img.loading === 'lazy') img.loading = 'eager';
      });

      /**
       * 全ての画像の読み込み状態を確認し、全て読み込まれたら印刷を実行
       */
      const handleImageProcessed = () => {
        imagesLoaded++;
        if (imagesLoaded === totalImages) window.print();
      };

      images.forEach((img) => {
        if (img.complete) {
          // 画像がすでに読み込まれている場合
          handleImageProcessed();
        } else {
          // 画像が読み込まれていない場合
          img.addEventListener('load', handleImageProcessed); // loadイベントを登録
          img.addEventListener('error', handleImageProcessed); // errorイベントを登録
        }
      });
    });
  }
}
