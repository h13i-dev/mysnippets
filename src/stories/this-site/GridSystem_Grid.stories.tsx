import { Grid } from '@components/index.tsx';
import { breakpointPrefixDescription, gridDescription } from '@src/stories/assets/descriptions.ts';
import { createHtmlSource } from '@src/stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';
import clsx from 'clsx';
import { FlexCenter } from './GridSystem_Flexbox.stories.tsx';

interface GridStoryProps {
  itemCount?: number;
  columns?: number;
  config?: string;
  subgrid?: string;
  className?: string;
}

const meta: Meta<GridStoryProps> = {
  title: 'This-Site/グリッドシステム_Gridプロパティ',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: gridDescription,
      },
    },
  },
  argTypes: {
    itemCount: {
      control: { type: 'range', min: 1, max: 15, step: 1 },
      description: 'グリッドアイテムの数',
    },
    config: {
      control: 'text',
      description: 'カスタムconfig設定（例: [2][sm:3][xl:4]）',
    },
    subgrid: {
      control: 'text',
      description: 'サブグリッド設定（例: [2][sm:3][xl:4]）',
    },
    className: {
      control: 'text',
      description: 'classを指定',
    },
  },
  args: {
    itemCount: 6,
    config: '[1][sm:2][xl:3]',
    subgrid: '',
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
      source: createHtmlSource('static'),
      canvas: {
        sourceState: 'none',
      },
    },
  },
  render: ({ itemCount, config, subgrid, className }) => {
    return (
      <div>
        <Grid className={className} config={config} subgrid={subgrid}>
          {Array.from({ length: itemCount || 6 }, (_, i) => (
            <Grid.Item className={clsx('sg-grid-item', subgrid && 'c-subgrid')}>
              Grid Item {i + 1}
            </Grid.Item>
          ))}
        </Grid>
      </div>
    );
  },
};

export const ConfigUsage: Story = {
  name: 'カラム数の指定（data-config属性の使い方）',
  tags: ['!dev'],
  parameters: {
    docs: {
      source: createHtmlSource('static'),
      description: {
        story: `\`data-config\`属性でブレークポイントごとのカラム数を指定し、レスポンシブなレイアウトに対応します。

**例**: \`data-config="[1][sm:2][xl:4]"\`
- **[1] = 640px未満**: 1カラム（縦に並ぶ）
- **[sm:2] = 640px以上**: 2カラム
- **[xl:4] = 1280px以上**: 4カラム
`,
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <style>{`
          .sb-anchor:has([id*="カラム数の指定data-config属性の使い方"]) {
            .sbdocs-preview{
              margin: initial;
              margin-top: 40px;
              border: initial;
            }
            .docs-story {
              position: absolute;
              width: 1px;
              height: 1px;
              padding: 0;
              margin: -1px;
              overflow: hidden;
              clip: rect(0, 0, 0, 0);
              white-space: nowrap;
              border-width: 0;
            }
          }
      `}</style>
        <Story />
      </>
    ),
  ],
  render: () => <></>,
};

export const ConfigGrid: Story = {
  name: 'カラム数の指定（data-config属性）の例',
  parameters: {
    docs: {
      source: createHtmlSource('static'),
    },
  },
  decorators: [
    (Story) => (
      <>
        <style>{`
          [id*="カラム数の指定data-config属性の例"] {
            font-size: 0.95em;
            font-weight: 500;
          }
      `}</style>
        <Story />
      </>
    ),
  ],
  render: () => (
    <Grid config="[1][sm:2][xl:4]">
      <Grid.Item className="sg-grid-item">Grid Item 1</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item 2</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item 3</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item 4</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item 5</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item 6</Grid.Item>
    </Grid>
  ),
};

export const SpanUsage: Story = {
  name: 'アイテム幅の指定（data-span属性の使い方）',
  tags: ['!dev'],
  parameters: {
    docs: {
      source: createHtmlSource('static'),
      description: {
        story: `\`data-span\`属性で各アイテムが占めるスパン数を指定し、レスポンシブなレイアウトに対応します。

**例**: \`data-span="[12][sm:6][xl:4]"\`
- **[12] = 640px未満**: 12スパン（全幅）
- **[sm:6] = 640px以上**: 6スパン（12分割中の6/12 = 半分の幅）
- **[xl:4] = 1280px以上**: 4スパン（12分割中の4/12 = 3分の1の幅）
`,
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <style>{`
          .sb-anchor:has([id*="アイテム幅の指定data-span属性の使い方"]) {
            .sbdocs-preview{
              margin: initial;
              margin-top: 40px;
              border: initial;
            }
            .docs-story {
              position: absolute;
              width: 1px;
              height: 1px;
              padding: 0;
              margin: -1px;
              overflow: hidden;
              clip: rect(0, 0, 0, 0);
              white-space: nowrap;
              border-width: 0;
            }
          }
      `}</style>
        <Story />
      </>
    ),
  ],
  render: () => <></>,
};

export const SpanGrid: Story = {
  name: 'アイテム幅の指定（data-span属性）の例',
  parameters: {
    docs: {
      source: createHtmlSource('static'),
    },
  },
  decorators: [
    (Story) => (
      <>
        <style>{`
          [id*="アイテム幅の指定data-span属性の例"] {
            font-size: 0.95em;
            font-weight: 500;
          }
      `}</style>
        <Story />
      </>
    ),
  ],
  render: () => (
    <Grid>
      <Grid.Item className="sg-grid-item" span="[12][sm:6][xl:4]">
        Grid Item 1
      </Grid.Item>
      <Grid.Item className="sg-grid-item" span="[12][sm:6][xl:4]">
        Grid Item 2
      </Grid.Item>
      <Grid.Item className="sg-grid-item" span="[12][sm:6][xl:4]">
        Grid Item 3
      </Grid.Item>
      <Grid.Item className="sg-grid-item" span="[12][sm:6][xl:4]">
        Grid Item 4
      </Grid.Item>
      <Grid.Item className="sg-grid-item" span="[12][sm:6][xl:4]">
        Grid Item 5
      </Grid.Item>
      <Grid.Item className="sg-grid-item" span="[12][sm:6][xl:4]">
        Grid Item 6
      </Grid.Item>
    </Grid>
  ),
};

export const GridSubgrid: Story = {
  name: 'サブグリッド',
  parameters: {
    docs: {
      source: createHtmlSource('static'),
    },
  },
  decorators: [
    (Story) => (
      <div className="[&_.c-subgrid]:u-grid">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <Grid config="[1][sm:2]" subgrid="4">
      <Grid.Item className="card c-subgrid">
        <img
          src="https://placehold.jp/600x400.png"
          className="card-img-top"
          alt=""
          width="600"
          height="400"
        />
        <div className="card-body c-subgrid u-gap-y-4">
          <h5 className="u-font-bold u-text-xl">タイトルが入ります</h5>
          <p>
            サブグリッドにより、テキストが少ない場合でも隣のカードを参照してスペースが確保されます。
          </p>
          <a href="★★★" className="btn btn-primary">
            詳しく見る
          </a>
        </div>
      </Grid.Item>
      <Grid.Item className="card c-subgrid">
        <img
          src="https://placehold.jp/600x400.png"
          className="card-img-top"
          alt=""
          width="600"
          height="400"
        />
        <div className="card-body c-subgrid u-gap-y-4">
          <h5 className="u-font-bold u-text-xl">吾輩は猫である</h5>
          <p>
            吾輩わがはいは猫である。名前はまだ無い。どこで生れたかとんと見当けんとうがつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
          </p>
          <a href="★★★" className="btn btn-primary">
            詳しく見る
          </a>
        </div>
      </Grid.Item>
    </Grid>
  ),
};

export const FlexboxCenter: Story = {
  name: '【Flexbox】縦横の中央配置',
  parameters: {
    docs: {
      source: createHtmlSource('static'),
      description: {
        story: `要素を縦横中央に配置する場合は、Flexboxレイアウトを使用し、\`data-config="[flex][center]"\`を指定してください。`,
      },
    },
  },
  render: FlexCenter.render,
};

export const Gap: Story = {
  name: 'gapの指定',
  parameters: {
    docs: {
      source: createHtmlSource('static'),
      description: {
        story: `gapは、\`u-gap-x-8px\`～\`u-gap-x-40px\`（列の余白）、\`u-gap-y-8px\`～\`u-gap-y-40px\`（行の余白）のヘルパークラス（いずれも8px刻み）で調整可能です。${breakpointPrefixDescription}`,
      },
    },
  },
  render: () => (
    <Grid config="[1][sm:3]" className="u-gap-x-40px u-gap-y-8px">
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
    </Grid>
  ),
};
