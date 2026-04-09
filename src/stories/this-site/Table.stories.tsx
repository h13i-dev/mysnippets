import { Table } from '@components/index.tsx';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useEffect } from 'react';
import ScrollHint from 'scroll-hint';

const meta: Meta = {
  title: 'This-Site/テーブル',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource('code'),
    },
  },
  argTypes: {
    config: {
      control: 'text',
      description: 'カスタムconfig設定（例: [2][sm:3][xl:4]）',
    },
    cols: {
      control: 'text',
      description: 'colgroupのcolタグにclassを指定（例: [u-w-10em][]）',
    },
    className: {
      control: 'text',
      description: 'classを指定',
    },
  },
  args: {
    config: '[default]',
    cols: '[][]',
    className: '',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'インタラクティブ',
  tags: ['!dev', '!autodocs'],
  parameters: {
    docs: {
      canvas: {
        sourceState: 'none',
      },
    },
  },
  render: ({ config, cols, className }) => (
    <Table config={config} cols={cols} className={className}>
      <Table.Body>
        <Table.Row>
          <Table.Header>坊ちゃん</Table.Header>
          <Table.Data>
            親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Header>坊ちゃん</Table.Header>
          <Table.Data>
            親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。
          </Table.Data>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const DefaultTable: Story = {
  name: '通常（default）',
  render: () => (
    <Table config="default">
      <Table.Body>
        <Table.Row>
          <Table.Header>坊ちゃん</Table.Header>
          <Table.Data>
            親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Header>坊ちゃん</Table.Header>
          <Table.Data>
            親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。
          </Table.Data>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const ColWidth: Story = {
  name: '列幅指定（cols属性の使用）',
  parameters: {
    docs: {
      description: {
        story: '`cols="[u-w-10em][]"`と指定することで、1列目の幅を10emに固定できます。',
      },
    },
  },
  render: () => (
    <Table config="default" cols="[u-w-10em][]">
      <Table.Body>
        <Table.Row>
          <Table.Header>坊ちゃん</Table.Header>
          <Table.Data>
            親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Header>坊ちゃん</Table.Header>
          <Table.Data>
            親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。
          </Table.Data>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const EqualTable: Story = {
  name: 'セル幅均等（equal）',
  render: () => (
    <Table config="equal">
      <Table.Body>
        <Table.Row>
          <Table.Header>坊ちゃん</Table.Header>
          <Table.Data>
            親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Header>坊ちゃん</Table.Header>
          <Table.Data>
            親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。
          </Table.Data>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const RowTable: Story = {
  name: '横並び（row）',
  render: () => (
    <Table config="row">
      <Table.Body>
        <Table.Row>
          <Table.Header>坊ちゃん</Table.Header>
          <Table.Data>
            親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。
          </Table.Data>
          <Table.Data>
            親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Header>坊ちゃん</Table.Header>
          <Table.Data>
            親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。
          </Table.Data>
          <Table.Data>
            親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。
          </Table.Data>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const ColumnTable: Story = {
  name: '縦並び（column）',
  render: () => (
    <Table config="column">
      <Table.Body>
        <Table.Row>
          <Table.Header>坊ちゃん</Table.Header>
          <Table.Data>
            親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Header>坊ちゃん</Table.Header>
          <Table.Data>
            親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。
          </Table.Data>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const ResponsiveTable: Story = {
  name: 'レスポンシブ（column→sm:row）',
  parameters: {
    docs: {
      description: {
        story: 'デフォルトは縦並び（column）／640px（sm）以上は横並び（row）',
      },
    },
  },
  render: () => (
    <Table config="[column][sm:row]">
      <Table.Body>
        <Table.Row>
          <Table.Header>坊ちゃん</Table.Header>
          <Table.Data>
            親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Header>坊ちゃん</Table.Header>
          <Table.Data>
            親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。
          </Table.Data>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const DefaultTheadTable: Story = {
  name: 'thead付きテーブル（default）',
  render: () => (
    <Table>
      <Table.Head>
        <Table.Header></Table.Header>
        <Table.Header>タイプA</Table.Header>
        <Table.Header>タイプB</Table.Header>
        <Table.Header>タイプC</Table.Header>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Header>特徴</Table.Header>
          <Table.Data>シンプルで使いやすい</Table.Data>
          <Table.Data>多機能で拡張性が高い</Table.Data>
          <Table.Data>カスタマイズ可能で柔軟性がある</Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Header>用途</Table.Header>
          <Table.Data>一般的な日常使用に最適</Table.Data>
          <Table.Data>専門的な業務に対応</Table.Data>
          <Table.Data>特殊なニーズに合わせて調整可能</Table.Data>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const CustomDefaultTheadTable: Story = {
  name: 'thead付きテーブル（cols, colspan, rowspan属性の使用）',
  render: () => (
    <Table cols="[u-w-[10em]][][][]">
      <Table.Head>
        <Table.Header></Table.Header>
        <Table.Header>タイプA</Table.Header>
        <Table.Header>タイプB</Table.Header>
        <Table.Header>タイプC</Table.Header>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Header>特徴</Table.Header>
          <Table.Data colspan="2">シンプルで使いやすい</Table.Data>
          <Table.Data rowspan="2">多機能で拡張性が高い</Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Header>用途</Table.Header>
          <Table.Data>一般的な日常使用に最適</Table.Data>
          <Table.Data>専門的な業務に対応</Table.Data>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const TheadTable: Story = {
  name: 'thead付きテーブル（equal）',
  render: () => (
    <Table config="equal">
      <Table.Head>
        <Table.Header></Table.Header>
        <Table.Header>タイプA</Table.Header>
        <Table.Header>タイプB</Table.Header>
        <Table.Header>タイプC</Table.Header>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Header>特徴</Table.Header>
          <Table.Data>シンプルで使いやすい</Table.Data>
          <Table.Data>多機能で拡張性が高い</Table.Data>
          <Table.Data>カスタマイズ可能で柔軟性がある</Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Header>用途</Table.Header>
          <Table.Data>一般的な日常使用に最適</Table.Data>
          <Table.Data>専門的な業務に対応</Table.Data>
          <Table.Data>特殊なニーズに合わせて調整可能</Table.Data>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const TheadTableWithSPScroll: Story = {
  name: 'thead付きテーブル（SPスクロール）',
  decorators: [
    (Story) => {
      useEffect(() => {
        const scrollableElement = document.querySelector('.c-scrollable');
        if (scrollableElement) {
          new ScrollHint(scrollableElement as HTMLElement, {
            i18n: {
              scrollable: 'スクロールできます',
            },
          });
        }
      }, []);
      return <Story />;
    },
  ],
  render: () => (
    <Table config="[equal][scrollable]">
      <Table.Head>
        <Table.Header></Table.Header>
        <Table.Header>タイプA</Table.Header>
        <Table.Header>タイプB</Table.Header>
        <Table.Header>タイプC</Table.Header>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Header>特徴</Table.Header>
          <Table.Data>シンプルで使いやすい</Table.Data>
          <Table.Data>多機能で拡張性が高い</Table.Data>
          <Table.Data>カスタマイズ可能で柔軟性がある</Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Header>用途</Table.Header>
          <Table.Data>一般的な日常使用に最適</Table.Data>
          <Table.Data>専門的な業務に対応</Table.Data>
          <Table.Data>特殊なニーズに合わせて調整可能</Table.Data>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};
