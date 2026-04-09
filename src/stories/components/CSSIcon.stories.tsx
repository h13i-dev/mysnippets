import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '@stories/assets/sass/storybook/icon.scss';

const meta: Meta = {
  title: 'Components/CSSアイコン',
  component: undefined,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource('code'),
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'ハンバーガーアイコン',
  render: () => {
    return (
      <button type="button" className="sb-css-icon">
        <span className="sb-css-icon_inner">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    );
  },
};

export const Active: Story = {
  name: '閉じるアイコン',
  render: () => {
    return (
      <button type="button" className="sb-css-icon is-active">
        <span className="sb-css-icon_inner">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    );
  },
};

export const CloseIcon: Story = {
  name: '閉じるアイコン',
  parameters: {
    docs: {
      description: {
        story: '閉じるアイコンのみであれば、`&times;`を使用することを検討',
      },
    },
  },
  render: () => {
    return (
      <button type="button" className="u-text-[25px]">
        &times;
      </button>
    );
  },
};
