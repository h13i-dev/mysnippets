import { describe, expect, it } from 'vitest';
import { ImageCompression } from '../src/ImageCompression';

describe('isImageFile', () => {
  const compress = new ImageCompression();
  it('正常系：.png', async () => {
    const flg = compress.isImageFile('test.png');
    expect(flg).toBe(true);
  });
  it('正常系：.PNG', async () => {
    const flg = compress.isImageFile('test.PNG');
    expect(flg).toBe(true);
  });
  it('正常系：.jpg', async () => {
    const flg = compress.isImageFile('test.jpg');
    expect(flg).toBe(true);
  });
  it('正常系：.JPG', async () => {
    const flg = compress.isImageFile('test.JPG');
    expect(flg).toBe(true);
  });
  it('正常系：.jpeg', async () => {
    const flg = compress.isImageFile('test.jpeg');
    expect(flg).toBe(true);
  });
  it('正常系：.JPEG', async () => {
    const flg = compress.isImageFile('test.JPEG');
    expect(flg).toBe(true);
  });
  it('異常系：.webp', async () => {
    const flg = compress.isImageFile('test.webp');
    expect(flg).toBe(false);
  });
  it('異常系：.WEBP', async () => {
    const flg = compress.isImageFile('test.WEBP');
    expect(flg).toBe(false);
  });
  it('異常系：.html', async () => {
    const flg = compress.isImageFile('test.html');
    expect(flg).toBe(false);
  });
});

describe('checkPath', () => {
  const compress = new ImageCompression();
  const path =
    '.\\images\\9999x9999.jpg';

  it('正常系：windows path', async () => {
    const settings = [{ target: 'image-compression\\tests' }];
    const result = compress.checkPath(path, settings);
    expect(result).toBe(settings[0]);
  });
  it('正常系：unix path', async () => {
    const settings = [{ target: 'image-compression/tests' }];
    const result = compress.checkPath(path, settings);
    expect(result).toBe(settings[0]);
  });
  it('正常系：正規表現 .jpg', async () => {
    const settings = [{ target: /images\/.*?.(jpg)/ }];
    const result = compress.checkPath(path, settings);
    expect(result).toBe(settings[0]);
  });
  it('異常系：正規表現 .jpg', async () => {
    const settings = [{ target: /ies\/.*?.(jpg)/ }];
    const result = compress.checkPath(path, settings);
    expect(result).toBe(null);
  });
});
