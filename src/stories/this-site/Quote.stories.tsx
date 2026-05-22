import Quote from '@components/Quote';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import { sbdocsPreviewHiddenCss } from '@stories/assets/utils/utils';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface QuoteArgs {}

const meta: Meta<QuoteArgs> = {
  title: 'This-Site/引用',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource({ mode: 'static' }),
    },
  },
  decorators: [
    (Story) => (
      <>
        <style>{sbdocsPreviewHiddenCss}</style>
        <Story />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<QuoteArgs>;

export const DefaultQuote: Story = {
  name: '短文の引用ボックス',
  render: () => {
    return (
      <Quote className="p-blockquote">
        <p>親譲りの無鉄砲で小供の時から損ばかりしている。</p>
      </Quote>
    );
  },
};

export const LongQuote: Story = {
  name: 'ネストの引用ボックス',
  render: () => {
    return (
      <Quote className="p-blockquote">
        <p>
          親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。なぜそんな無闇をしたと聞く人があるかも知れぬ。別段深い理由でもない。
        </p>
        <p>
          新築の二階から首を出していたら、同級生の一人が冗談に、いくら威張っても、そこから飛び降りる事は出来まい。弱虫やーい。と囃したからである。小使に負ぶさって帰って来た時、おやじが大きな眼をして二階ぐらいから飛び降りて腰を抜かす奴があるかと云ったから、この次は抜かさずに飛んで見せますと答えた。
        </p>
        <Quote className="p-blockquote">
          <p>
            親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。なぜそんな無闇をしたと聞く人があるかも知れぬ。別段深い理由でもない。
          </p>
        </Quote>
        <Quote.Cite>
          引用：
          <a href="https://www.aozora.gr.jp/cards/000148/files/752_14964.html" target="_blank">
            坊っちゃん - 夏目漱石
          </a>
        </Quote.Cite>
      </Quote>
    );
  },
};

export const InlineQuote: Story = {
  name: 'インライン引用',
  parameters: {
    docs: {
      description: {
        story: '`Quote`タグ内にHTMLが入らない場合、`q`タグが出力されます。',
      },
    },
  },
  render: () => {
    return (
      <p>
        夏目漱石は
        <Quote
          className="p-quote"
          cite="https://www.aozora.gr.jp/cards/000148/files/752_14964.html"
        >
          親譲りの無鉄砲で小供の時から損ばかりしている
        </Quote>
        という書き出しで坊っちゃんを始めた。
      </p>
    );
  },
};
