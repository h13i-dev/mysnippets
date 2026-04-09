/**
 * Visual Regression Testing Helpers
 *
 * Shared utilities for VRT tests using Vitest Browser Mode + Storybook Portable Stories
 */

import { composeStories } from '@storybook/react-vite';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { expect, test } from 'vitest';
import { page } from 'vitest/browser';

export type Viewport = {
  width: number;
  height: number;
  name: string;
};

export const VIEWPORTS: Viewport[] = [
  { width: 1920, height: 1080, name: 'PC' },
  { width: 375, height: 667, name: 'SP' },
];

export const INCLUDE_TAGS = import.meta.env.INCLUDE_TAGS?.split(',') || ['test'];

export function shouldIncludeStory(story: any): boolean {
  const storyTags = story.tags || [];
  return INCLUDE_TAGS.some((tag: string) => storyTags.includes(tag));
}

export async function renderStory(
  Story: any,
  viewport: Viewport,
): Promise<{ canvas: HTMLElement; root: any }> {
  const existingRoots = document.querySelectorAll('#storybook-root');
  existingRoots.forEach((el) => el.remove());

  await page.viewport(viewport.width, viewport.height);

  const canvas = document.createElement('div');
  canvas.id = 'storybook-root';
  canvas.style.width = '100%';
  document.body.appendChild(canvas);

  const root = createRoot(canvas);
  root.render(createElement(Story));

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Adjust viewport height to match content height
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 100);
  });
  const contentHeight = canvas.scrollHeight;
  if (contentHeight > 0) {
    await page.viewport(viewport.width, contentHeight);
  }

  return { canvas, root };
}

export async function cleanupStory(canvas: HTMLElement, root: any): Promise<void> {
  root.unmount();
  canvas.remove();
}

export function createVisualRegressionTest(
  componentName: string,
  storyName: string,
  Story: any,
  viewport: Viewport,
): void {
  test(`${componentName}/${storyName} - ${viewport.name}`, async () => {
    const { canvas, root } = await renderStory(Story, viewport);
    await expect(canvas).toMatchScreenshot();
    await cleanupStory(canvas, root);
  });
}

export function createTestsForStories(componentName: string, storiesModule: any): void {
  const stories = composeStories(storiesModule);

  for (const [storyName, Story] of Object.entries(stories)) {
    if (typeof Story !== 'function') continue;

    if (!shouldIncludeStory(Story)) {
      console.log(
        `⊘ Skipping ${componentName}/${storyName} (tags: ${(Story as any).tags?.join(', ') || 'none'})`,
      );
      continue;
    }

    for (const viewport of VIEWPORTS) {
      createVisualRegressionTest(componentName, storyName, Story, viewport);
    }
  }
}
