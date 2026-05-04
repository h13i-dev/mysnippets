import { Grid } from '@components/index.tsx';
import {
  breakpointPrefixDescription,
  gridDescription,
  gridSystemNote,
} from '@src/stories/assets/descriptions.ts';
import { createHtmlSource } from '@src/stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';
import clsx from 'clsx';

interface GridStoryProps {
  itemCount?: number;
  columns?: number;
  config?: string;
  subgrid?: string;
  className?: string;
}

const meta: Meta<GridStoryProps> = {
  title: 'This-Site/グリッドシステム_Flexboxプロパティ',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `${gridSystemNote}


${gridDescription}`,
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
      description: 'カスタムconfig設定（例: [flex][2][sm:3][xl:4]）',
    },
    className: {
      control: 'text',
      description: 'classを指定',
    },
  },
  args: {
    itemCount: 6,
    config: '[flex][1][sm:2][xl:3]',
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
      source: createHtmlSource('code'),
      canvas: {
        sourceState: 'none',
      },
    },
  },
  render: ({ itemCount, config, className }) => {
    return (
      <div>
        <Grid className={className} config={config}>
          {Array.from({ length: itemCount || 6 }, (_, i) => (
            <Grid.Item className="sg-grid-item">Flexbox Item {i + 1}</Grid.Item>
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
      source: createHtmlSource('code'),
      description: {
        story: `${gridSystemNote}

\`data-config\`属性でブレークポイントごとのカラム数を指定し、レスポンシブなレイアウトに対応します。

**Flexboxレイアウトを使用する場合は、\`data-config\`に\`[flex]\`を指定してください。**

**例**: \`data-config="[flex][1][sm:2][xl:4]"\`
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

export const ConfigFlex: Story = {
  name: 'カラム数の指定（data-config属性）の例',
  parameters: {
    docs: {
      source: createHtmlSource('code'),
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
    <Grid config="[flex][1][sm:2][xl:4]">
      <Grid.Item className="sg-grid-item">Flexbox Item 1</Grid.Item>
      <Grid.Item className="sg-grid-item">Flexbox Item 2</Grid.Item>
      <Grid.Item className="sg-grid-item">Flexbox Item 3</Grid.Item>
      <Grid.Item className="sg-grid-item">Flexbox Item 4</Grid.Item>
      <Grid.Item className="sg-grid-item">Flexbox Item 5</Grid.Item>
      <Grid.Item className="sg-grid-item">Flexbox Item 6</Grid.Item>
    </Grid>
  ),
};

export const SpanUsage: Story = {
  name: 'アイテム幅の指定（data-span属性の使い方）',
  tags: ['!dev'],
  parameters: {
    docs: {
      source: createHtmlSource('code'),
      description: {
        story: `${gridSystemNote}

\`data-span\`属性で各アイテムが占めるスパン数を指定し、レスポンシブなレイアウトに対応します。

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

export const SpanFlex: Story = {
  name: 'アイテム幅の指定（data-span属性）の例',
  parameters: {
    docs: {
      source: createHtmlSource('code'),
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
    <Grid config="[flex]">
      <Grid.Item className="sg-grid-item" span="[12][sm:6][xl:4]">
        Flexbox Item 1
      </Grid.Item>
      <Grid.Item className="sg-grid-item" span="[12][sm:6][xl:4]">
        Flexbox Item 2
      </Grid.Item>
      <Grid.Item className="sg-grid-item" span="[12][sm:6][xl:4]">
        Flexbox Item 3
      </Grid.Item>
      <Grid.Item className="sg-grid-item" span="[12][sm:6][xl:4]">
        Flexbox Item 4
      </Grid.Item>
      <Grid.Item className="sg-grid-item" span="[12][sm:6][xl:4]">
        Flexbox Item 5
      </Grid.Item>
      <Grid.Item className="sg-grid-item" span="[12][sm:6][xl:4]">
        Flexbox Item 6
      </Grid.Item>
    </Grid>
  ),
};

export const FlexItemsCenter: Story = {
  name: '縦横の中央配置（PC: 2列）_要素がコンテンツ幅の場合',
  parameters: {
    docs: {
      source: createHtmlSource('code'),
      description: {
        story: `縦横中央に配置する場合は、\`data-config="[center]"\`を指定してください。`,
      },
    },
  },
  render: () => (
    <Grid config="[flex][center][1][sm:2]">
      <Grid.Item className="sg-grid-item u-w-fit">Flexbox Item</Grid.Item>
      <Grid.Item className="sg-grid-item u-w-fit">
        Flexbox Item
        <br />
        Flexbox Item
      </Grid.Item>
    </Grid>
  ),
};

export const FlexCenter: Story = {
  name: '縦横の中央配置（PC: 2行・4列）',
  parameters: {
    docs: {
      source: createHtmlSource('code'),
      description: {
        story: `縦横中央に配置する場合は、\`data-config="[center]"\`を指定してください。`,
      },
    },
  },
  render: () => (
    <Grid config="[flex][center][1][sm:4]">
      <Grid.Item className="sg-grid-item">Flexbox Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Flexbox Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Flexbox Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Flexbox Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Flexbox Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Flexbox Item</Grid.Item>
      <Grid.Item className="sg-grid-item">
        Flexbox Item
        <br />
        Flexbox Item
      </Grid.Item>
    </Grid>
  ),
};

export const FlexVerticalCenter: Story = {
  name: '縦の中央配置',
  parameters: {
    docs: {
      source: createHtmlSource('code'),
    },
  },
  render: () => (
    <Grid config="[flex][center][1][sm:4]" as="div">
      <Grid.Item className="sg-grid-item" as="p">
        Flexbox Item
      </Grid.Item>
      <div className="u-flex u-flex-col u-gap-6">
        <Grid.Item className="sg-grid-item" as="p">
          Flexbox Item
        </Grid.Item>
        <Grid.Item className="sg-grid-item" as="p">
          Flexbox Item
        </Grid.Item>
      </div>
      <Grid.Item className="sg-grid-item" as="p">
        Flexbox Item
      </Grid.Item>
    </Grid>
  ),
};

export const FlexReverse: Story = {
  name: '逆順',
  parameters: {
    docs: {
      source: createHtmlSource('code'),
    },
  },
  render: () => (
    <Grid config="[flex][reverse][3]">
      <Grid.Item className="sg-grid-item">1</Grid.Item>
      <Grid.Item className="sg-grid-item">2</Grid.Item>
      <Grid.Item className="sg-grid-item">3</Grid.Item>
    </Grid>
  ),
};

export const Gap: Story = {
  name: 'gapの指定',
  parameters: {
    docs: {
      source: createHtmlSource('code'),
      description: {
        story: `gapは、\`u-gap-x-8px\`～\`u-gap-x-40px\`（列の余白）、\`u-gap-y-8px\`～\`u-gap-y-40px\`（行の余白）のヘルパークラス（いずれも8px刻み）で調整可能です。${breakpointPrefixDescription}`,
      },
    },
  },
  render: () => (
    <Grid config="[flex][1][sm:3]" className="u-gap-x-40px u-gap-y-8px">
      <Grid.Item className="sg-grid-item">Flexbox Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Flexbox Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Flexbox Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Flexbox Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Flexbox Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Flexbox Item</Grid.Item>
    </Grid>
  ),
};
