import printPage from '@assets/js/modules/utils/printPage';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useEffect } from 'react';

const meta = {
  title: 'Modules/ページプリント',
  parameters: {
    layout: 'centered',
    docs: {
      source: { type: 'code' },
    },
  },
  tags: ['autodocs', '!dev'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'ページプリント',
  render: () => {
    useEffect(() => {
      printPage('.js-print');
    }, []);

    return (
      <button type="button" className="btn btn-primary js-print">
        ページプリント
      </button>
    );
  },
};
