import type { Meta, StoryObj } from '@storybook/react-vite';
import { createHtmlSource } from '../../assets/utils/htmlTransform';
import './container-layout.scss';

const meta = {
  title: '_Dev/Demo/コンテナレイアウト',
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'レイアウトデモ',
  render: () => {
    return (
      <main className="demo-container-layout">
        <div className="c-container u-space-y-10">
          <section>
            <h2 className="p-heading-lv2">通常利用</h2>
            <p>このセクションは通常のレイアウトです。コンテナの幅内に収まっています。</p>
          </section>
          <section className="full">
            <h2 className="p-heading-lv2">full</h2>
            <p>
              このセクションは左右いっぱいに広がります。margin-inline: calc(50% - 50cqw)
              を使用しています。
            </p>
          </section>
          <section className="left">
            <h2 className="p-heading-lv2">left</h2>
            <p>
              このセクションは左側に広がります。margin-left: calc(50% - 50cqw) を使用しています。
            </p>
          </section>
          <section className="right">
            <h2 className="p-heading-lv2">right</h2>
            <p>
              このセクションは右側に広がります。margin-right: calc(50% - 50cqw) を使用しています。
            </p>
          </section>
        </div>
      </main>
    );
  },
};
