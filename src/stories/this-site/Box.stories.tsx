import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface BoxArgs {
  background?: string;
}

const meta: Meta<BoxArgs> = {
  title: 'This-Site/ボックス',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource({ extract: 'dynamic' }),
    },
  },
  args: {
    background: '',
  },
  argTypes: {
    background: {
      description: '背景色をグレーに変更',
      control: { type: 'select' },
      options: ['', '-gray'],
    },
  },
  decorators: [
    (Story) => (
      <div className="html-contents">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<BoxArgs>;

export const Interactive: Story = {
  name: 'インタラクティブ',
  tags: ['!dev', '!autodocs'],
  render: ({ background }) => {
    const className = `${background || ''}`;
    return (
      <div className={`p-box ${className}`}>
        <h3 className="u-text-xl u-font-bold u-mb-sm">坊っちゃん</h3>
        <p>
          親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。なぜそんな無闇をしたと聞く人があるかも知れぬ。別段深い理由でもない。
        </p>
        <p>
          新築の二階から首を出していたら、同級生の一人が冗談に、いくら威張っても、そこから飛び降りる事は出来まい。弱虫やーい。と囃したからである。小使に負ぶさって帰って来た時、おやじが大きな眼をして二階ぐらいから飛び降りて腰を抜かす奴があるかと云ったから、この次は抜かさずに飛んで見せますと答えた。
        </p>
      </div>
    );
  },
};

export const DefaultBox: Story = {
  name: '通常のボックス',
  render: () => {
    return (
      <div className="p-box">
        <h3 className="u-text-xl u-font-bold u-mb-sm">坊っちゃん</h3>
        <p>
          親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。なぜそんな無闇をしたと聞く人があるかも知れぬ。別段深い理由でもない。
        </p>
        <p>
          新築の二階から首を出していたら、同級生の一人が冗談に、いくら威張っても、そこから飛び降りる事は出来まい。弱虫やーい。と囃したからである。小使に負ぶさって帰って来た時、おやじが大きな眼をして二階ぐらいから飛び降りて腰を抜かす奴があるかと云ったから、この次は抜かさずに飛んで見せますと答えた。
        </p>
      </div>
    );
  },
};

export const GrayBox: Story = {
  name: 'グレー背景ボックス',
  render: () => {
    return (
      <div className="p-box -gray">
        <h3 className="u-text-xl u-font-bold u-mb-sm">坊っちゃん</h3>
        <p>
          親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。なぜそんな無闇をしたと聞く人があるかも知れぬ。別段深い理由でもない。
        </p>
        <p>
          新築の二階から首を出していたら、同級生の一人が冗談に、いくら威張っても、そこから飛び降りる事は出来まい。弱虫やーい。と囃したからである。小使に負ぶさって帰って来た時、おやじが大きな眼をして二階ぐらいから飛び降りて腰を抜かす奴があるかと云ったから、この次は抜かさずに飛んで見せますと答えた。
        </p>
      </div>
    );
  },
};
