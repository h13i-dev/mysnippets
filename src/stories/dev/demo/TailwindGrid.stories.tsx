import type { Meta, StoryObj } from '@storybook/react-vite';
import { createHtmlSource } from '../../assets/utils/htmlTransform';

const meta = {
  title: '_Dev/Demo/TailwindCSS グリッド',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource(),
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'デフォルト',
  render: () => {
    return (
      <div className="u-grid u-grid-cols-2 sm:u-grid-cols-3 xl:u-grid-cols-4 u-gap-md">
        <p className="sg-grid-item">Grid Item</p>
        <p className="sg-grid-item">Grid Item</p>
        <p className="sg-grid-item">Grid Item</p>
        <p className="sg-grid-item">Grid Item</p>
        <p className="sg-grid-item">Grid Item</p>
        <p className="sg-grid-item">Grid Item</p>
      </div>
    );
  },
};

export const Column: Story = {
  name: 'カラム制御',
  render: () => {
    return (
      <div className="u-grid u-grid-cols-12 u-gap-md">
        <p className="sg-grid-item u-col-span-4 sm:u-col-span-8">Grid Item</p>
        <p className="sg-grid-item u-col-span-8 sm:u-col-span-4">Grid Item</p>
        <p className="sg-grid-item u-col-span-2 sm:u-col-span-10">Grid Item</p>
        <p className="sg-grid-item u-col-span-10 sm:u-col-span-2">Grid Item</p>
        <p className="sg-grid-item u-col-span-6">Grid Item</p>
        <p className="sg-grid-item u-col-span-6">Grid Item</p>
      </div>
    );
  },
};

export const Subgrid: Story = {
  name: 'サブグリッド',
  render: () => {
    return (
      <div className="u-grid u-gap-md u-grid-cols-2">
        <div className="u-grid u-grid-rows-subgrid u-row-span-3 u-gap-xs">
          <p className="sg-grid-item">1</p>
          <p className="sg-grid-item">
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </p>
          <p className="sg-grid-item">テキスト</p>
        </div>
        <div className="u-grid u-grid-rows-subgrid u-row-span-3 u-gap-xs">
          <p className="sg-grid-item">2</p>
          <p className="sg-grid-item">テキスト</p>
          <p className="sg-grid-item">
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </p>
        </div>
      </div>
    );
  },
};
