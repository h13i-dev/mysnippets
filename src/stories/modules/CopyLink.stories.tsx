import copyLink from '@assets/js/modules/utils/copyLink';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useEffect } from 'react';

const meta = {
  title: 'Modules/リンクコピー',

  parameters: {
    layout: 'centered',
    docs: {
      source: createHtmlSource('dynamic'),
    },
  },
  tags: ['autodocs', '!dev'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'リンクコピー',
  parameters: {
    docs: {
      description: {
        story: '`to`属性は必須です。カウントアップ後に最終的に表示させたい数値を入力してください。',
      },
    },
  },
  render: () => {
    useEffect(() => {
      copyLink('.js-copy', (result) => {
        console.log(result);
      });
    }, []);

    return (
      <button type="button" className="btn btn-primary js-copy">
        リンクコピー
      </button>
    );
  },
};
