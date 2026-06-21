import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import autoprefixer from 'autoprefixer';
import rehypeExternalLinks from 'rehype-external-links';
import utils from './utils/astro/integration/index.ts';

process.env.BROWSER = 'chrome';
process.env.BROWSER_ARGS = '--remote-debugging-port=9222';
const isDev = process.env.NODE_ENV === 'development';

/**
 * Astro設定
 * https://docs.astro.build/ja/reference/configuration-reference/
 */
export default defineConfig({
  site: 'https://mysnippets.com',
  base: '/',
  trailingSlash: 'always',
  server: {
    open: true,
    port: isDev ? 4321 : 4000,
  },
  build: {
    inlineStylesheets: 'never',
  },
  devToolbar: {
    enabled: false,
  },
  vite: {
    css: {
      devSourcemap: isDev,
      postcss: {
        plugins: [autoprefixer],
      },
    },

    build: {
      rollupOptions: {
        output: {
          entryFileNames: (chunkInfo) => {
            if (chunkInfo.name && chunkInfo.name.includes('client')) {
              return '_tmp/[name].[hash].js'; // storybook/react対応
            }
            return 'assets/js/main.js';
          },
        },
      },
    },
    esbuild: {
      drop: isDev ? [] : ['console', 'debugger'],
    },
  },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx({
      rehypePlugins: [[rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]],
    }),
    react(),
    utils(),
    sitemap({
      filter: (page) =>
        page !== 'https://mysnippets.com/demo/' && page !== 'https://mysnippets.com/about/site/',
    }),
  ],
  markdown: {
    remarkRehype: {
      footnoteLabel: '注釈',
      footnoteLabelTagName: 'h3',
      footnoteLabelProperties: {},
      footnoteBackLabel: (referenceIndex) => {
        return `注釈${referenceIndex + 1}へ戻る`;
      },
    },
  },
});
