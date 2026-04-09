import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Vitest configuration for unit tests
export default defineConfig({
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
  test: {
    include: ['**/tests/utils/**/*.{test,spec}.{js,ts}'],
    exclude: [
      '**/node_modules/**',
      '**/.git/**',
      '**/*.vrt.test.{ts,tsx}',
      '**/tests/axe.test.ts',
      '**/tests/nu.test.ts',
    ],
    environment: 'node',
  },
});
