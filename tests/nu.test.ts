import { expect, type Page, test } from '@playwright/test';
import { minify } from 'html-minifier-terser';
import * as path from 'path';
import { rimraf } from 'rimraf';
import config from 'tests.config';

async function validate(page: Page, site: string, pagesPath: string) {
  const url = new URL(pagesPath, site).href;
  const response = await page.goto(url);

  if (!response || !response.ok()) {
    const status = response?.status() || 'unknown';
    test.skip(true, `ページが存在しません: ${url} (ステータス: ${status})`);
    return;
  }

  const html = await page.content();
  const minifyHtml = await minify(html, {
    removeComments: true,
    collapseWhitespace: true,
  });

  // ページ検証を行う
  await page.goto('https://validator.w3.org/nu/#textarea');
  await page.fill('textarea', minifyHtml);
  await page.click('#submit');

  const resultElement = await page.waitForSelector('#results');
  const [warning, error] = await Promise.all([
    resultElement.$$('.warning'),
    resultElement.$$('.error'),
  ]);
  const validationNumber = {
    error: error?.length || 0,
    warning: warning?.length || 0,
  };

  // エラーがあればスクリーンショットを取得し、エラーがなければ削除する。
  const imageName =
    pagesPath === '/' ? 'top' : pagesPath.replace(/(^\/|\/$)/g, '').replace(/\//g, '-');
  const imagePath = path.join(process.cwd(), `tests/results/nu/${imageName}.png`);
  if (validationNumber.error > 0 || validationNumber.warning > 0) {
    await page.screenshot({ path: `${imagePath}`, fullPage: true });
  } else {
    await rimraf(imagePath);
  }

  expect(
    validationNumber.error + validationNumber.warning,
    'エラーまたは警告が見つかりました',
  ).toBe(0);
}

config.pages.forEach((astroPath) => {
  test(`nu test - ${astroPath}`, async ({ page }) => {
    await validate(page, config.site, astroPath);
  });
});
