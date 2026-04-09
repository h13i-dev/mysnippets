import { readdir, stat, writeFile } from 'fs/promises';
import minimatch from 'minimatch';
import { cpus } from 'os';
import { join, resolve } from 'path';
import sharp from 'sharp';
import { pathToFileURL } from 'url';

// Sharp最適化設定
sharp.cache({ memory: 50, files: 0, items: 100 });
sharp.concurrency(Math.min(cpus().length, 8));

// 定数定義
const IMAGE_EXTENSIONS = /\.(jpe?g|png)$/i;
const JPEG_EXTENSIONS = /\.jpe?g$/i;
const PNG_EXTENSIONS = /\.png$/i;
const KIB_PRECISION = 1000;
const COMPRESSION_PRECISION = 10;
const MIN_COMPRESSION_THRESHOLD = 5; // 最小圧縮率閾値（%）

const ANSI_COLORS = {
  GREEN: '\u001b[32m',
  RED: '\u001b[31m',
  YELLOW: '\u001b[33m',
  RESET: '\u001b[0m',
};

const DEFAULT_OPTIONS = {
  jpeg: {
    mozjpeg: true,
  },
  png: {
    compressionLevel: 9,
    palette: true,
  },
};

export default class ImageCompression {
  constructor(baseURL) {
    this.rootPath = process.cwd();
    this.targetImagePath = baseURL;
    this.allConsole = false;
    this.concurrency = Math.min(cpus().length * 2, 10);
  }

  async main(settings = []) {
    try {
      const startTime = Date.now();
      const paths = await this.getImagesPaths();

      this.displayProcessingInfo(paths.length);
      await this.processInBatches(paths, settings);
      this.displayCompletion(paths.length, startTime);
    } catch (error) {
      console.error('Error in main processing:', error);
      throw error;
    }
  }

  displayProcessingInfo(imageCount) {
    console.log(
      `\n▼sharpライブラリの画像処理\n・画像パスの右側にある「${ANSI_COLORS.YELLOW}*${ANSI_COLORS.RESET}」は、settings.jsのオプションが適用されていることを示しています。`,
    );
    console.log(`・対象画像数: ${imageCount}枚 (${this.concurrency}並列処理)`);
    console.log(`・圧縮効果${MIN_COMPRESSION_THRESHOLD}%以上の画像のみ処理・表示されます`);
    console.log(`・処理済み画像は自動的にスキップされます\n`);
    console.log(`${ANSI_COLORS.YELLOW}処理中...${ANSI_COLORS.RESET}\n`);
  }

  displayCompletion(imageCount, startTime) {
    const endTime = Date.now();
    const elapsedTime = ((endTime - startTime) / 1000).toFixed(2);
    console.log(
      `${ANSI_COLORS.GREEN}✓ 処理完了: ${imageCount}枚の画像を${elapsedTime}秒で処理しました${ANSI_COLORS.RESET}\n`,
    );
  }

  async processInBatches(paths, settings) {
    const semaphore = Array(this.concurrency).fill(null);
    let index = 0;

    const processNext = async () => {
      while (index < paths.length) {
        const currentIndex = index++;
        const path = paths[currentIndex];

        const targetSettings = this.checkPath(path, settings);
        if (targetSettings && targetSettings.compressFlag === false) {
          continue;
        }

        const options = targetSettings ? targetSettings.options : {};
        await this.compress(path, options);
      }
    };

    await Promise.all(semaphore.map(() => processNext()));
  }

  checkPath(path, settings = []) {
    if (!Array.isArray(settings) || settings.length === 0) {
      return null;
    }

    const normalizedPath = path.replace(/\\/g, '/');

    return (
      settings.find((setting) => {
        if (!setting || !setting.target || typeof setting.target !== 'string') {
          return false;
        }

        // Globパターンマッチング
        return minimatch(normalizedPath, setting.target) || minimatch(path, setting.target);
      }) || null
    );
  }

  async getImagesPaths() {
    const targetDir = resolve(this.rootPath, this.targetImagePath);
    return this.scanDirectory(targetDir);
  }

  async scanDirectory(directory) {
    const files = await readdir(directory);
    const imagePromises = files.map(async (file) => {
      const fullPath = join(directory, file);
      const fileStat = await stat(fullPath);

      if (fileStat.isDirectory()) {
        return this.scanDirectory(fullPath);
      } else if (this.isImageFile(file)) {
        const relativePath = fullPath.replace(this.rootPath, '.').replace(/\\/g, '/');
        return relativePath;
      }
      return null;
    });

    const results = await Promise.all(imagePromises);
    return results.flat().filter(Boolean);
  }

  isImageFile(file) {
    return IMAGE_EXTENSIONS.test(file);
  }

  async compress(path, customOptions = {}) {
    const mergedOptions = {
      jpeg: { ...DEFAULT_OPTIONS.jpeg, ...customOptions.jpeg },
      png: { ...DEFAULT_OPTIONS.png, ...customOptions.png },
    };

    if (JPEG_EXTENSIONS.test(path)) {
      const optionLength = customOptions.jpeg ? Object.values(customOptions.jpeg).length : 0;
      await this.compressImage(path, mergedOptions.jpeg, optionLength, 'jpeg');
    } else if (PNG_EXTENSIONS.test(path)) {
      const optionLength = customOptions.png ? Object.values(customOptions.png).length : 0;
      await this.compressImage(path, mergedOptions.png, optionLength, 'png');
    }
  }

  async compressImage(filePath, options, optionLength, format) {
    try {
      // 処理済みチェック
      if (await this.isAlreadyProcessed(filePath)) {
        return;
      }

      // メモリ内処理で高速化
      const originalBuffer = await this.readFileBuffer(filePath);
      const originalSize = originalBuffer.length;

      // 圧縮処理
      const compressedData = await this.performCompression(originalBuffer, options, format);

      // 効果判定
      const compressionResult = this.calculateCompressionEffect(
        originalSize,
        compressedData.length,
      );

      if (compressionResult.percentage < MIN_COMPRESSION_THRESHOLD) {
        return; // 効果が薄い場合はスキップ
      }

      // ファイル更新と結果表示を並列実行
      await Promise.all([
        this.updateFile(filePath, compressedData, format),
        Promise.resolve().then(() => {
          this.displayCompressionResult(compressionResult, filePath, optionLength);
        }),
      ]);
    } catch (error) {
      console.error(`Error compressing ${format} file ${filePath}:`, error.message);
    }
  }

  async isAlreadyProcessed(filePath) {
    try {
      const metadata = await sharp(filePath).metadata();
      return metadata.comment?.includes('processed-by-imagecompression');
    } catch {
      return false;
    }
  }

  async readFileBuffer(filePath) {
    const fs = await import('fs/promises');
    return fs.readFile(filePath);
  }

  async performCompression(buffer, options, format) {
    if (format === 'jpeg') {
      const currentDate = new Date().toISOString().split('T')[0];
      const commentMarker = `processed-by-imagecompression-${currentDate}`;
      return sharp(buffer)
        .jpeg({ ...options, comment: commentMarker })
        .toBuffer();
    }
    return sharp(buffer).png(options).toBuffer();
  }

  calculateCompressionEffect(originalSize, compressedSize) {
    const percentage = Math.round((1 - compressedSize / originalSize) * 1000) / 10;
    return {
      originalSize,
      compressedSize,
      percentage,
      originalKiB: Math.floor((originalSize / 1024) * KIB_PRECISION) / KIB_PRECISION,
      compressedKiB: Math.floor((compressedSize / 1024) * KIB_PRECISION) / KIB_PRECISION,
    };
  }

  async updateFile(filePath, data, format) {
    await writeFile(filePath, data);
  }

  displayCompressionResult(result, filePath, optionLength) {
    const colorCode = result.percentage > 0 ? ANSI_COLORS.GREEN : ANSI_COLORS.RED;
    const optionMark = optionLength > 0 ? `${ANSI_COLORS.YELLOW}*${ANSI_COLORS.RESET}` : '';
    const relativePath = filePath.replace(this.rootPath, '').replace(/\\/g, '/');

    console.log(relativePath + optionMark);

    if (result.percentage < 0) {
      const increasedPercentage = Math.abs(result.percentage);
      console.log(
        `${result.originalKiB} KiB + ${colorCode}${increasedPercentage}%${ANSI_COLORS.RESET} = ${result.compressedKiB} KiB (サイズ増加)\n`,
      );
    } else {
      console.log(
        `${result.originalKiB} KiB - ${colorCode}${result.percentage}%${ANSI_COLORS.RESET} = ${result.compressedKiB} KiB\n`,
      );
    }
  }

  async getFileSize(path) {
    const stats = await stat(path);
    return stats.size;
  }
}

// 設定ファイルを読み込んで実行
const configPath = resolve(process.cwd(), 'image.config.js');
const configUrl = pathToFileURL(configPath).href;
const configModule = await import(configUrl);
const config = configModule.default;

const imageCompression = new ImageCompression(config.baseURL);
await imageCompression.main(config.settings);
