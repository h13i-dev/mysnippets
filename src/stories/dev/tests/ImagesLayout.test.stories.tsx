import { ImageLayout } from '@components/index.tsx';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: '_Dev/Tests/テスト_画像3枚レイアウト',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="html-contents u-px-0">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      canvas: {
        sourceState: 'none',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const createStory = (config: string): Story => ({
  name: config,
  render: () => (
    <ImageLayout config={config}>
      <ImageLayout.Image
        src="https://placehold.jp/600x400.png"
        width="600"
        height="400"
        alt="altが入ります"
      >
        キャプションが入ります
      </ImageLayout.Image>
      <ImageLayout.Image
        src="https://placehold.jp/600x400.png"
        width="600"
        height="400"
        alt="altが入ります"
      >
        キャプションが入ります
      </ImageLayout.Image>
      <ImageLayout.Image
        src="https://placehold.jp/600x400.png"
        width="600"
        height="400"
        alt="altが入ります"
      >
        キャプションが入ります
      </ImageLayout.Image>
      <ImageLayout.Contents>
        <p>
          吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
        </p>
        <p>
          吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
        </p>
        <p>
          吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
        </p>
        <p>
          吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
        </p>
        <p>
          吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
        </p>
        <p>
          吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
        </p>
        <p>
          吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
        </p>
        <p>
          吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
        </p>
        <p>
          吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
        </p>
        <p>
          吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
        </p>
        <p>
          吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
        </p>
      </ImageLayout.Contents>
    </ImageLayout>
  ),
});

// ImageLayout設定を整理（table.astroと同様の構造）
const settings = [
  {
    items: [
      'float-left',
      '[float-left]',
      '[float-left][sm:float-right]',
      '[float-left][sm:row]',
      '[float-left][sm:row-reverse]',
      '[float-left][sm:column]',
      '[float-left][sm:column-reverse]',
    ],
  },
  {
    items: [
      'float-right',
      '[float-right]',
      '[float-right][sm:float-left]',
      '[float-right][sm:row]',
      '[float-right][sm:row-reverse]',
      '[float-right][sm:column]',
      '[float-right][sm:column-reverse]',
    ],
  },
  {
    items: [
      'row',
      '[row]',
      '[row][sm:float-left]',
      '[row][sm:float-right]',
      '[row][sm:row-reverse]',
      '[row][sm:column]',
      '[row][sm:column-reverse]',
    ],
  },
  {
    items: [
      'row-reverse',
      '[row-reverse]',
      '[row-reverse][sm:float-left]',
      '[row-reverse][sm:float-right]',
      '[row-reverse][sm:row]',
      '[row-reverse][sm:column]',
      '[row-reverse][sm:column-reverse]',
    ],
  },
  {
    items: [
      'column',
      '[column]',
      '[column][sm:float-left]',
      '[column][sm:float-right]',
      '[column][sm:row]',
      '[column][sm:row-reverse]',
      '[column][sm:column-reverse]',
    ],
  },
  {
    items: [
      'column-reverse',
      '[column-reverse]',
      '[column-reverse][sm:float-left]',
      '[column-reverse][sm:float-right]',
      '[column-reverse][sm:row]',
      '[column-reverse][sm:row-reverse]',
      '[column-reverse][sm:column]',
    ],
  },
  {
    items: [
      '[float-left][sm:float-right][md:row][lg:row-reverse][xl:column][2xl:column-reverse]',
      '[column-reverse][sm:column][md:row-reverse][lg:row][xl:float-right][2xl:float-left]',
    ],
  },
];

// Float Left
export const BareFloatLeft = createStory(settings[0].items[0]);
export const FloatLeft = createStory(settings[0].items[1]);
export const FloatLeftToFloatRight = createStory(settings[0].items[2]);
export const FloatLeftToRow = createStory(settings[0].items[3]);
export const FloatLeftToRowReverse = createStory(settings[0].items[4]);
export const FloatLeftToColumn = createStory(settings[0].items[5]);
export const FloatLeftToColumnReverse = createStory(settings[0].items[6]);

// Float Right
export const BareFloatRight = createStory(settings[1].items[0]);
export const FloatRight = createStory(settings[1].items[1]);
export const FloatRightToFloatLeft = createStory(settings[1].items[2]);
export const FloatRightToRow = createStory(settings[1].items[3]);
export const FloatRightToRowReverse = createStory(settings[1].items[4]);
export const FloatRightToColumn = createStory(settings[1].items[5]);
export const FloatRightToColumnReverse = createStory(settings[1].items[6]);

// Row
export const BareRow = createStory(settings[2].items[0]);
export const Row = createStory(settings[2].items[1]);
export const RowToFloatLeft = createStory(settings[2].items[2]);
export const RowToFloatRight = createStory(settings[2].items[3]);
export const RowToRowReverse = createStory(settings[2].items[4]);
export const RowToColumn = createStory(settings[2].items[5]);
export const RowToColumnReverse = createStory(settings[2].items[6]);

// Row Reverse
export const BareRowReverse = createStory(settings[3].items[0]);
export const RowReverse = createStory(settings[3].items[1]);
export const RowReverseToFloatLeft = createStory(settings[3].items[2]);
export const RowReverseToFloatRight = createStory(settings[3].items[3]);
export const RowReverseToRow = createStory(settings[3].items[4]);
export const RowReverseToColumn = createStory(settings[3].items[5]);
export const RowReverseToColumnReverse = createStory(settings[3].items[6]);

// Column
export const BareColumn = createStory(settings[4].items[0]);
export const Column = createStory(settings[4].items[1]);
export const ColumnToFloatLeft = createStory(settings[4].items[2]);
export const ColumnToFloatRight = createStory(settings[4].items[3]);
export const ColumnToRow = createStory(settings[4].items[4]);
export const ColumnToRowReverse = createStory(settings[4].items[5]);
export const ColumnToColumnReverse = createStory(settings[4].items[6]);

// Column Reverse
export const BareColumnReverse = createStory(settings[5].items[0]);
export const ColumnReverse = createStory(settings[5].items[1]);
export const ColumnReverseToFloatLeft = createStory(settings[5].items[2]);
export const ColumnReverseToFloatRight = createStory(settings[5].items[3]);
export const ColumnReverseToRow = createStory(settings[5].items[4]);
export const ColumnReverseToRowReverse = createStory(settings[5].items[5]);
export const ColumnReverseToColumn = createStory(settings[5].items[6]);

// Breakpoints
export const BreakpointsComplex1 = createStory(settings[6].items[0]);
export const BreakpointsComplex2 = createStory(settings[6].items[1]);
