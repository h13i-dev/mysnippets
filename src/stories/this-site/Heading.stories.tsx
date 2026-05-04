import { Heading } from '@components/index.tsx';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Heading> = {
  title: 'This-Site/見出し',
  component: Heading,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource('dynamic'),
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: '見出しテキスト',
    },
    className: {
      control: 'text',
      description: '任意のクラス',
    },
    as: {
      control: 'text',
      description: '任意のHTMLタグ',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const HeadingLv1: Story = {
  name: '見出しレベル1',
  args: {
    lv: '1',
    children: '見出しレベル1',
  },
};

export const HeadingLv2: Story = {
  name: '見出しレベル2',
  args: {
    lv: '2',
    children: '見出しレベル2',
  },
};

export const HeadingLv3: Story = {
  name: '見出しレベル3',
  args: {
    lv: '3',
    children: '見出しレベル3',
  },
};
