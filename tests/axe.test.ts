import { AxeBuilder } from '@axe-core/playwright';
import { expect, type Page, test } from '@playwright/test';
import { createHtmlReport } from 'axe-html-reporter';
import * as path from 'path';
import { rimraf } from 'rimraf';
import config from 'tests.config';

async function runAxeAnalysis(page: Page, site: string, pagesPath: string) {
  const url = new URL(pagesPath, site).href;
  const response = await page.goto(url);

  if (!response || !response.ok()) {
    const status = response?.status() || 'unknown';
    test.skip(true, `ページが存在しません: ${url} (ステータス: ${status})`);
    return;
  }

  const results = await new AxeBuilder({ page })
    .withTags(config.axeOptions.withTags)
    .disableRules(config.axeOptions.disableRules)
    .analyze();
  if (results.violations.length > 0) {
    createHtmlReport({
      results,
      options: {
        outputDir: pagesPath,
        reportFileName: 'index.html',
        outputDirPath: path.join(process.cwd(), '/tests/results/axe/'),
      },
    });
  } else {
    await rimraf(path.join(process.cwd(), 'src', 'pages', pagesPath, 'axe'));
  }

  expect(results.violations, 'アクセシビリティ上の違反が見つかりました').toHaveLength(0);
}

config.pages.forEach((astroPath) => {
  test(`axe test - ${astroPath}`, async ({ page }) => {
    await runAxeAnalysis(page, config.site, astroPath);
  });
});
