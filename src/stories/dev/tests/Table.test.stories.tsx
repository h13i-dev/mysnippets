import { Table } from '@components/index.tsx';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: '_Dev/Tests/テスト_テーブル',
  tags: ['autodocs'],
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
    <Table config={config}>
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
});

// テーブルパターン
const settings = [
  {
    items: [
      'default',
      '[default]',
      '[sm:equal]',
      '[default][sm:equal]',
      '[sm:row]',
      '[default][sm:row]',
      '[sm:column]',
      '[default][sm:column]',
    ],
  },
  {
    items: ['equal', '[equal]', '[equal][sm:default]', '[equal][sm:row]', '[equal][sm:column]'],
  },
  {
    items: ['row', '[row]', '[row][sm:default]', '[row][sm:equal]', '[row][sm:column]'],
  },
  {
    items: ['column', '[column]', '[column][sm:default]', '[column][sm:equal]', '[column][sm:row]'],
  },
  {
    items: ['[default][sm:equal][md:column][lg:row]', '[row][sm:column][md:equal][lg:default]'],
  },
];

// Default
export const BareDefault = createStory(settings[0].items[0]);
export const Default = createStory(settings[0].items[1]);
export const ToEqual = createStory(settings[0].items[2]);
export const DefaultToEqual = createStory(settings[0].items[3]);
export const ToRow = createStory(settings[0].items[4]);
export const DefaultToRow = createStory(settings[0].items[5]);
export const ToColumn = createStory(settings[0].items[6]);
export const DefaultToColumn = createStory(settings[0].items[7]);

// Equal
export const BareEqual = createStory(settings[1].items[0]);
export const Equal = createStory(settings[1].items[1]);
export const EqualToDefault = createStory(settings[1].items[2]);
export const EqualToRow = createStory(settings[1].items[3]);
export const EqualToColumn = createStory(settings[1].items[4]);

// Row
export const BareRow = createStory(settings[2].items[0]);
export const Row = createStory(settings[2].items[1]);
export const RowToDefault = createStory(settings[2].items[2]);
export const RowToEqual = createStory(settings[2].items[3]);
export const RowToColumn = createStory(settings[2].items[4]);

// Column
export const BareColumn = createStory(settings[3].items[0]);
export const Column = createStory(settings[3].items[1]);
export const ColumnToDefault = createStory(settings[3].items[2]);
export const ColumnToEqual = createStory(settings[3].items[3]);
export const ColumnToRow = createStory(settings[3].items[4]);

// Breakpoints
export const BreakpointsComplex1 = createStory(settings[4].items[0]);
export const BreakpointsComplex2 = createStory(settings[4].items[1]);
