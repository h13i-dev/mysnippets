import { Note } from '@components/index.tsx';
import { listMarkerDescription } from '@src/stories/assets/descriptions';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'This-Site/注釈',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource({ extract: 'code' }),
    },
  },
  args: {
    className: '',
    children: 'text',
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
    children: {
      description: 'コンテンツタイプを指定',
      control: { type: 'radio' },
      options: ['text', 'list'],
      mapping: {
        text: '吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。',
        list: [
          <Note.Item>
            吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
          </Note.Item>,
          <Note.Item>
            吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
          </Note.Item>,
        ],
      },
    },
  },
} satisfies Meta<typeof Note>;

export default meta;
type RootStory = StoryObj<typeof Note>;

export const Interactive: RootStory = {
  name: 'インタラクティブ',
  tags: ['!dev', '!autodocs'],
  parameters: {
    docs: {
      canvas: {
        sourceState: 'none',
      },
    },
  },
  render: ({ className, children }) => <Note className={className}>{children}</Note>,
};

export const BasicNote: RootStory = {
  name: '注釈（単体）',
  render: () => (
    <Note>
      吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
    </Note>
  ),
};

export const NoteList: RootStory = {
  name: '注釈（リスト）',
  render: () => (
    <Note>
      <Note.Item>
        吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
      </Note.Item>
      <Note.Item>
        吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
      </Note.Item>
    </Note>
  ),
};

export const NoteNumberList: RootStory = {
  name: '注釈（番号リスト）',
  render: () => (
    <Note className="-number">
      <Note.Item>
        吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
      </Note.Item>
      <Note.Item>
        吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
      </Note.Item>
    </Note>
  ),
};

export const CustomNoteList: RootStory = {
  name: '注釈（カスタムリスト）',
  parameters: {
    docs: {
      description: {
        story: listMarkerDescription,
      },
    },
  },
  render: () => (
    <Note as="ol" className="u-pl-3.5em">
      <Note.Item>
        <Note.Marker>その１</Note.Marker>
        吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
      </Note.Item>
      <Note.Item>
        <Note.Marker>その２</Note.Marker>
        吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
      </Note.Item>
    </Note>
  ),
};
