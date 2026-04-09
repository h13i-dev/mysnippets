import { pageDataSortByOrder } from '@src/utils/frontmatter/pageDataSortByOrder';

export const snippetsModules = pageDataSortByOrder(
  import.meta.glob(
    [
      '/src/pages/snippets/modules/*/index.astro',
      '!/src/pages/snippets/modules/_*/index.astro',
      '!/src/pages/snippets/modules/index.astro',
      '!/src/pages/snippets/modules/tests/**/*.astro',
    ],
    { eager: true },
  ),
);

export const snippetsComponents = pageDataSortByOrder(
  import.meta.glob(
    [
      '/src/pages/snippets/components/*/index.astro',
      '!/src/pages/snippets/components/_*/index.astro',
      '!/src/pages/snippets/components/index.astro',
      '!/src/pages/snippets/components/tests/**/*.astro',
    ],
    { eager: true },
  ),
);
