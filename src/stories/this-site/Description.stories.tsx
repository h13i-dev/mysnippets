import { Description, List } from '@components/index.tsx';
import { listMarkerDescription } from '@src/stories/assets/descriptions';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'This-Site/説明リスト',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource({ extract: 'code' }),
    },
  },
  args: {
    className: '',
  },
  argTypes: {
    className: {
      description: 'クラス名を指定',
      control: { type: 'radio' },
      options: ['指定なし', '-list', '-number'],
      mapping: {
        指定なし: '',
        '-list': '-list',
        '-number': '-number',
      },
    },
  },
} satisfies Meta<typeof Description>;

export default meta;
type Story = StoryObj<typeof Description>;

export const Interactive: Story = {
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
    <Description className={className}>
      <Description.Term>吾輩は猫である</Description.Term>
      <Description.Details>
        吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
      </Description.Details>
      <Description.Term>吾輩は猫である</Description.Term>
      <Description.Details>
        吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
        <Description className={className}>
          <Description.Term>入れ子説明</Description.Term>
          <Description.Details>
            説明リストの中に、さらに詳細な説明を含めることができます。
          </Description.Details>
          <Description.Term>入れ子説明</Description.Term>
          <Description.Details>
            説明リストの中に、さらに詳細な説明を含めることができます。
          </Description.Details>
        </Description>
      </Description.Details>
      <Description.Term>吾輩は猫である</Description.Term>
      <Description.Details>
        <Description className={className}>
          <Description.Term>入れ子説明</Description.Term>
          <Description.Details>
            説明リストの中に、さらに詳細な説明を含めることができます。
          </Description.Details>
          <Description.Term>入れ子説明</Description.Term>
          <Description.Details>
            説明リストの中に、さらに詳細な説明を含めることができます。
          </Description.Details>
        </Description>
      </Description.Details>
    </Description>
  ),
};

export const DefaultDescription: Story = {
  name: '通常（default）',
  render: () => (
    <Description>
      <Description.Term>吾輩は猫である</Description.Term>
      <Description.Details>
        吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
      </Description.Details>
      <Description.Term>吾輩は猫である</Description.Term>
      <Description.Details>
        吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
      </Description.Details>
    </Description>
  ),
};

export const DescriptionList: Story = {
  name: '項目説明リスト',
  render: () => (
    <>
      <Description className="-list">
        <Description.Term>吾輩は猫である</Description.Term>
        <Description.Details>
          吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
        </Description.Details>
        <Description.Term>吾輩は猫である</Description.Term>
        <Description.Details>
          吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
        </Description.Details>
      </Description>
    </>
  ),
};

export const DescriptionNumber: Story = {
  name: '序列説明リスト',
  render: () => (
    <Description className="-number">
      <Description.Term>吾輩は猫である</Description.Term>
      <Description.Details>
        吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
      </Description.Details>
      <Description.Term>吾輩は猫である</Description.Term>
      <Description.Details>
        吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
      </Description.Details>
    </Description>
  ),
};

export const OptionalDescription: Story = {
  name: '任意説明リスト',
  parameters: {
    docs: {
      description: {
        story: listMarkerDescription,
      },
    },
  },
  render: () => (
    <Description>
      <Description.Term className="u-pl-4em">
        <Description.Marker>その１）</Description.Marker>
        吾輩は猫である
      </Description.Term>
      <Description.Details className="u-pl-4em">
        吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
      </Description.Details>
      <Description.Term className="u-pl-4em">
        <Description.Marker>その２）</Description.Marker>
        吾輩は猫である
      </Description.Term>
      <Description.Details className="u-pl-4em">
        吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
      </Description.Details>
    </Description>
  ),
};

export const DescriptionAndList: Story = {
  name: '入れ子説明リスト',
  render: () => (
    <Description>
      <Description.Term>吾輩は猫である</Description.Term>
      <Description.Details>
        <Description className="-number">
          <Description.Term>吾輩は猫である</Description.Term>
          <Description.Details>
            吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
          </Description.Details>
          <Description.Term>吾輩は猫である</Description.Term>
          <Description.Details>
            吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
          </Description.Details>
        </Description>
      </Description.Details>
      <Description.Term>吾輩は猫である</Description.Term>
      <Description.Details>
        <List>
          <List.Item>短いテキスト</List.Item>
          <List.Item>やや長めのテキスト項目です</List.Item>
        </List>
      </Description.Details>
    </Description>
  ),
};
