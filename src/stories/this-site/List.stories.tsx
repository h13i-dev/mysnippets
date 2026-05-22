import { List } from '@components/index.tsx';
import { listMarkerDescription } from '@src/stories/assets/descriptions';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'This-Site/リスト',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource('static'),
    },
  },
  args: {
    className: '',
  },
  argTypes: {
    className: {
      description: 'クラス名を指定',
      control: { type: 'radio' },
      options: ['指定なし', '-number'],
      mapping: {
        指定なし: '',
        '-number': '-number',
      },
    },
  },
} satisfies Meta<typeof List>;

export default meta;
type RootStory = StoryObj<typeof List>;

export const Intaractive: RootStory = {
  name: 'インタラクティブ',
  tags: ['!dev', '!autodocs'],
  parameters: {
    docs: {
      canvas: {
        sourceState: 'none',
      },
    },
  },
  render: ({ className }) => (
    <List className={className}>
      <List.Item>短いテキスト</List.Item>
      <List.Item>やや長めのテキスト項目です</List.Item>
      <List.Item>これは中程度の長さのダミーテキストです</List.Item>
      <List.Item>
        これはとても長いダミーテキストで、複数行になることを想定しています。スタイルのテストにおいて、長いテキストがどのように折り返されるかを確認するために使用します。
        <List className={className}>
          <List.Item>内部リストの最初の項目</List.Item>
          <List.Item>
            内部リストの2番目の項目
            <List className={className}>
              <List.Item>深くネストされた項目</List.Item>
            </List>
          </List.Item>
        </List>
      </List.Item>
      <List.Item>最後の項目</List.Item>
    </List>
  ),
};

export const BasicList: RootStory = {
  name: '項目リスト',
  render: () => (
    <List>
      <List.Item>短いテキスト</List.Item>
      <List.Item>やや長めのテキスト項目です</List.Item>
      <List.Item>これは中程度の長さのダミーテキストです</List.Item>
      <List.Item>
        これはとても長いダミーテキストで、複数行になることを想定しています。スタイルのテストにおいて、長いテキストがどのように折り返されるかを確認するために使用します。
        <List>
          <List.Item>内部リストの最初の項目</List.Item>
          <List.Item>
            内部リストの2番目の項目
            <List>
              <List.Item>深くネストされた項目</List.Item>
            </List>
          </List.Item>
        </List>
      </List.Item>
      <List.Item>最後の項目</List.Item>
    </List>
  ),
};

export const NumberList: RootStory = {
  name: '序列リスト',
  render: () => (
    <List className="-number">
      <List.Item>短いテキスト</List.Item>
      <List.Item>やや長めのテキスト項目です</List.Item>
      <List.Item>これは中程度の長さのダミーテキストです</List.Item>
      <List.Item>
        これはとても長いダミーテキストで、複数行になることを想定しています。スタイルのテストにおいて、長いテキストがどのように折り返されるかを確認するために使用します。
        <List className="-number">
          <List.Item>内部リストの最初の項目</List.Item>
          <List.Item>
            内部リストの2番目の項目
            <List className="-number">
              <List.Item>深くネストされた項目</List.Item>
            </List>
          </List.Item>
        </List>
      </List.Item>
      <List.Item>最後の項目</List.Item>
    </List>
  ),
};

export const AnyList: RootStory = {
  name: 'カスタムリスト',
  parameters: {
    docs: {
      description: {
        story: `${listMarkerDescription}<br>また、連番のListタグには\`as="ol"\`を指定してください。`,
      },
    },
  },
  render: () => (
    <List as="ol">
      <List.Item className="u-pl-1.5em">
        <List.Marker>1)</List.Marker>短いテキスト
      </List.Item>
      <List.Item className="u-pl-1.5em">
        <List.Marker>2)</List.Marker>やや長めのテキスト項目です
      </List.Item>
      <List.Item className="u-pl-1.5em">
        <List.Marker>3)</List.Marker>これは中程度の長さのダミーテキストです
      </List.Item>
      <List.Item className="u-pl-1.5em">
        <List.Marker>4)</List.Marker>
        これはとても長いダミーテキストで、複数行になることを想定しています。スタイルのテストにおいて、長いテキストがどのように折り返されるかを確認するために使用します。
        <List>
          <List.Item className="u-pl-2.5em">
            <List.Marker>4-1)</List.Marker>内部リストの最初の項目
          </List.Item>
          <List.Item className="u-pl-2.5em">
            <List.Marker>4-2)</List.Marker>内部リストの2番目の項目
          </List.Item>
        </List>
      </List.Item>
      <List.Item className="u-pl-1.5em">
        <List.Marker>5)</List.Marker>最後の項目
      </List.Item>
    </List>
  ),
};
