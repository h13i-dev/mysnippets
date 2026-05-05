import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'This-Site/コンテンツタイトル',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource({ extract: 'dynamic' }),
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'コンテンツタイトル',
  render: () => {
    return <h1 className="p-contents-title">コンテンツタイトル</h1>;
  },
};
