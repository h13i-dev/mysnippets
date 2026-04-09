const PAGE_TYPES = {
  '/modules/': 'Modules',
  '/components/': 'Components',
} as const;

export const getCategory = (path: string): string | null => {
  for (const [prefix, type] of Object.entries(PAGE_TYPES)) {
    if (path.startsWith(prefix)) return type;
  }
  return null;
};
