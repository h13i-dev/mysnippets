import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Vitest configuration for Storybook visual regression testing
// Using Portable Stories + Vitest Browser Mode
// https://vitest.dev/guide/browser/visual-regression-testing
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@data': path.resolve(__dirname, './src/data'),
      '@utils': path.resolve(__dirname, './utils'),
      '@stories': path.resolve(__dirname, './src/stories'),
    },
  },
  optimizeDeps: {
    include: ['@storybook/addon-a11y/preview', '@storybook/react-vite'],
  },
  test: {
    include: ['**/*.vrt.test.ts', '**/*.vrt.test.tsx'],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      // Visual regression testing settings
      expect: {
        toMatchScreenshot: {
          comparatorName: 'pixelmatch',
          comparatorOptions: {
            threshold: 0,
            allowedMismatchedPixelRatio: 0,
          },
        },
      },
    },
    setupFiles: ['.storybook/vitest.setup.ts'],
  },
});
