import type { Meta, StoryObj } from '@storybook/react-vite';
import { createHtmlSource } from '../../assets/utils/htmlTransform';
import './line-break.scss';

const meta = {
  title: '_Dev/Demo/改行デモ',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource('dynamic'),
      description: {
        component:
          '改行しなければテキストがコンテンツボックスからあふれる場合の、改行制御に関するデモです。',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const jaText =
  'メロスは激怒した。必ず、かの邪知暴虐の王を除かなければならぬと決意した。メロスには政治がわからぬ。メロスは、村の牧人である。笛を吹き、羊と遊んで暮らしてきた。けれども邪悪に対しては、人一倍に敏感であった。今日未明、メロスは村を出発し、野を越え山越え、十里離れたこのシラクスの町にやって来た。メロスには父も、母もない。女房もない。十六の、内気な妹と二人暮らしだ。この妹は、村のある律儀な一牧人を、近々花婿として迎えることになっていた。';

const enText =
  'When Gregor Samsa woke up one morning from unsettling dreams, he found himself changed in his bed into a monstrous vermin. He was lying on his back as hard as armor plate, and when he lifted his head a little, he saw his vaulted brown belly, sectioned by arch-shaped ribs, to whose dome the cover, about to slide off completely, could barely cling. https://mysnippets.tech/demo/line-break/#word-break';

export const WordBreak: Story = {
  name: 'word-break プロパティ',
  parameters: {
    docs: {
      description: {
        story:
          '改行しなければテキストがコンテンツボックスからあふれる場合に、ブラウザーが改行を挿入するかどうかを指定します。',
      },
    },
  },
  render: () => {
    return (
      <div className="demo-line-break">
        <section>
          <h3 className="demo-heading">normal（初期値）</h3>
          <p className="demo-comment">言語ごとの改行規則に従って自動改行を許可</p>
          <p className="p-column u-break-normal">{jaText}</p>
          <p className="p-column u-mt-sm u-break-normal" lang="en">
            {enText}
          </p>
        </section>

        <section>
          <h3 className="demo-heading">break-all</h3>
          <p className="demo-comment">単語間に加えて、文字間（単語内）の自動改行を許可</p>
          <p className="p-column u-break-all">{jaText}</p>
          <p className="p-column u-mt-sm u-break-all" lang="en">
            {enText}
          </p>
        </section>

        <section>
          <h3 className="demo-heading">keep-all</h3>
          <p className="demo-comment">文字間（単語内）の自動改行を禁止し、単語間の自動改行を許可</p>
          <p className="p-column u-break-keep">{jaText}</p>
          <p className="p-column u-mt-sm u-break-keep" lang="en">
            {enText}
          </p>
        </section>
      </div>
    );
  },
};

export const OverflowWrap: Story = {
  name: 'overflow-wrap プロパティ',
  parameters: {
    docs: {
      description: {
        story:
          'インライン要素に対して、ブラウザーが不可分な文字列内で改行を行うかどうかを設定します。',
      },
    },
  },
  render: () => {
    return (
      <div className="demo-line-break">
        <section>
          <h3 className="demo-heading">normal（初期値）</h3>
          <p className="demo-comment">言語ごとの改行規則に従って自動改行を許可</p>
          <p className="p-column u-wrap-normal">{jaText}</p>
          <p className="p-column u-mt-sm u-wrap-normal" lang="en">
            {enText}
          </p>
        </section>

        <section>
          <h3 className="demo-heading">anywhere</h3>
          <p className="demo-comment">オーバーフローを避けるために、あらゆる場所で改行可能</p>
          <p className="p-column u-wrap-anywhere">{jaText}</p>
          <p className="p-column u-mt-sm u-wrap-anywhere" lang="en">
            {enText}
          </p>
        </section>

        <section>
          <h3 className="demo-heading">break-word</h3>
          <p className="demo-comment">
            anywhere と break-word
            の表示結果は基本的に同じです。違いが出るのは、文字列を含む要素の横幅をmin-content（最小コンテンツ幅）にした場合です。anywhereでは文字間に、break-wordでは単語間に自動改行を挿入できるものとして処理されます。
          </p>
          <p className="p-column u-wrap-break-word">{jaText}</p>
          <p className="p-column u-mt-sm u-wrap-break-word" lang="en">
            {enText}
          </p>
        </section>
      </div>
    );
  },
};

export const HtmlTags: Story = {
  name: 'HTMLタグ（br / wbr）',
  parameters: {
    docs: {
      description: {
        story: 'brタグとwbrタグを使用した改行制御のデモです。',
      },
    },
  },
  render: () => {
    return (
      <div className="demo-line-break">
        <section>
          <h3 className="demo-heading">brタグ</h3>
          <p className="demo-comment">強制的に改行を挿入します</p>
          <div className="demo-box">
            テキスト
            <br aria-hidden="true" />
            テキスト
          </div>
        </section>

        <section>
          <h3 className="demo-heading">wbrタグ</h3>
          <p className="demo-comment">
            自動改行（折り返し）が入らない文字列の中で、wbrは自動改行を許可する箇所を示す
          </p>
          <div className="demo-box">
            <p className="p-column u-break-keep">{jaText}</p>
          </div>
        </section>
      </div>
    );
  },
};
