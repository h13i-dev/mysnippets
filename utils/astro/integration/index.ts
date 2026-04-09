import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { glob } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';
import type { Plugin } from 'vite';

const PATTERNS = {
  eslintComment: /\n\s*<!--\s?eslint-disable-next-line.*?-->/gi,
  selfClosingTag: /\s?\/>/g,
} as const;

function createReplaceHtmlPlugin(): Plugin {
  return {
    name: 'replace-html',
    transform(code: string, id: string): string | undefined {
      if (!id.endsWith('.astro')) return;
      return code.replace(PATTERNS.eslintComment, '').replace('&emsp;', ' ');
    },
  };
}

async function processHtmlFiles(distPath: string): Promise<void> {
  const htmlFiles = await Array.fromAsync(glob(`${distPath}/**/*.html`));

  for (const file of htmlFiles) {
    const content = readFileSync(file, 'utf-8');
    const processed = content.replace(PATTERNS.selfClosingTag, '>');
    writeFileSync(file, processed, 'utf-8');
  }
}

function removeTmpDirectory(distPath: string): void {
  const tmpPath = join(distPath, '_tmp'); // buildの一時ディレクトリを削除
  if (existsSync(tmpPath)) {
    rmSync(tmpPath, { recursive: true, force: true });
  }
}

export default function utils(): AstroIntegration {
  return {
    name: 'main',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [createReplaceHtmlPlugin()],
          },
        });
      },
      'astro:build:done': async ({ dir }) => {
        const distPath = fileURLToPath(dir);
        await processHtmlFiles(distPath);
        removeTmpDirectory(distPath);
      },
    },
  };
}
