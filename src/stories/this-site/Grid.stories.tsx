import { Grid } from '@components/index.tsx';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';
import clsx from 'clsx';

const isDev = process.env.NODE_ENV === 'development';

interface GridStoryProps {
  itemCount?: number;
  columns?: number;
  config?: string;
  subgrid?: string;
  className?: string;
}

const meta: Meta<GridStoryProps> = {
  title: 'This-Site/グリッドシステム',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource('code'),
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

export const GridColumn: Story = {
  name: '【Grid】カラム指定',
  render: () => (
    <Grid config="[1][sm:2][lg:3]">
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
    </Grid>
  ),
};

export const GridSpan: Story = {
  name: '【Grid】スパン指定',
  render: () => (
    <Grid>
      <Grid.Item className="sg-grid-item" span="[sm:4][xl:8]">
        Grid Item
      </Grid.Item>
      <Grid.Item className="sg-grid-item" span="[sm:8][xl:4]">
        Grid Item
      </Grid.Item>
      <Grid.Item className="sg-grid-item" span="[sm:7][xl:5]">
        Grid Item
      </Grid.Item>
      <Grid.Item className="sg-grid-item" span="[sm:5][xl:7]">
        Grid Item
      </Grid.Item>
      <Grid.Item className="sg-grid-item" span="[sm:6][xl:6]">
        Grid Item
      </Grid.Item>
      <Grid.Item className="sg-grid-item" span="[sm:6][xl:6]">
        Grid Item
      </Grid.Item>
    </Grid>
  ),
};

export const GridSpan2: Story = {
  name: '【Grid】スパン指定（2列目中央配置）',
  render: () => (
    <Grid>
      <Grid.Item className="sg-grid-item" span="[sm:4]">
        Grid Item
      </Grid.Item>
      <Grid.Item className="sg-grid-item" span="[sm:4]">
        Grid Item
      </Grid.Item>
      <Grid.Item className="sg-grid-item" span="[sm:4]">
        Grid Item
      </Grid.Item>
      <Grid.Item className="sg-grid-item sm:u-col-end-7" span="[sm:4]">
        Grid Item
      </Grid.Item>
      <Grid.Item className="sg-grid-item" span="[sm:4]">
        Grid Item
      </Grid.Item>
    </Grid>
  ),
};

export const GridSubgrid: Story = {
  name: '【Grid】サブグリッド',
  parameters: {
    docs: {
      description: {
        story:
          '実装メモ：`[data-subgrid] > *`と設定すると、`c-contents`を指定しても`c-contents`要素にsubgridが当たってしまうため、柔軟性を確保するため`c-subgrid`で明示的に記述する',
      },
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

export const GridAutoFill: Story = {
  name: '【Grid】auto-fill',
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
        transform: (code: string) => code.replace(/className/g, 'class'),
      },
    },
  },
  render: () => (
    <div className="u-grid-fill-[150px] u-gap-sm">
      <p className="sg-grid-item">Grid Item</p>
      <p className="sg-grid-item">Grid Item</p>
      <p className="sg-grid-item">Grid Item</p>
    </div>
  ),
};

export const GridAutoFit: Story = {
  name: '【Grid】auto-fit',
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
        transform: (code: string) => code.replace(/className/g, 'class'),
      },
    },
  },
  render: () => (
    <div className="u-grid-fit-[150px] u-gap-sm">
      <p className="sg-grid-item">Grid Item</p>
      <p className="sg-grid-item">Grid Item</p>
      <p className="sg-grid-item">Grid Item</p>
    </div>
  ),
};

export const FlexColumn: Story = {
  name: '【Flex】カラム指定',
  render: () => (
    <Grid config="[flex][1][sm:2][xl:3]">
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
    </Grid>
  ),
};

export const FlexSpan: Story = {
  name: '【Flex】スパン指定',
  render: () => (
    <Grid config="[flex]">
      <Grid.Item className="sg-grid-item" span="[12][md:4][xl:8]">
        Grid Item
      </Grid.Item>
      <Grid.Item className="sg-grid-item" span="[12][md:8][xl:4]">
        Grid Item
      </Grid.Item>
      <Grid.Item className="sg-grid-item" span="[12][md:7][xl:5]">
        Grid Item
      </Grid.Item>
      <Grid.Item className="sg-grid-item" span="[12][md:5][xl:7]">
        Grid Item
      </Grid.Item>
      <Grid.Item className="sg-grid-item" span="[12][md:6][xl:6]">
        Grid Item
      </Grid.Item>
      <Grid.Item className="sg-grid-item" span="[12][md:6][xl:6]">
        Grid Item
      </Grid.Item>
    </Grid>
  ),
};

export const FlexHorizontalCenter: Story = {
  name: '【Flex】横の中央配置',
  render: () => (
    <Grid config="[flex][center][1][sm:4]">
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
      <Grid.Item className="sg-grid-item">Grid Item</Grid.Item>
    </Grid>
  ),
};

export const FlexVerticalCenter: Story = {
  name: '【Flex】縦の中央配置',
  render: () => (
    <Grid config="[flex][center][1][sm:4]" as="div">
      <Grid.Item className="sg-grid-item" as="p">
        Grid Item
      </Grid.Item>
      <div className="u-flex u-flex-col u-gap-sm">
        <Grid.Item className="sg-grid-item" as="p">
          Grid Item
        </Grid.Item>
        <Grid.Item className="sg-grid-item" as="p">
          Grid Item
        </Grid.Item>
      </div>
      <Grid.Item className="sg-grid-item" as="p">
        Grid Item
      </Grid.Item>
    </Grid>
  ),
};

export const FlexCenter: Story = {
  name: '【Flex】逆順',
  render: () => (
    <Grid config="[flex][reverse][3]">
      <Grid.Item className="sg-grid-item">1</Grid.Item>
      <Grid.Item className="sg-grid-item">2</Grid.Item>
      <Grid.Item className="sg-grid-item">3</Grid.Item>
    </Grid>
  ),
};
