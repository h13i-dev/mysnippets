import { Link } from '@components/index.tsx';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'This-Site/リンク',
  component: Link,
  parameters: {
    docs: {
      source: createHtmlSource('dynamic'),
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'リンクラベル',
      table: { category: '基本' },
    },
    href: {
      control: 'text',
      description: 'リンク先URL',
      table: { category: '基本' },
    },
    icon: {
      control: 'radio',
      description:
        'アイコン表示（externalは外部リンクアイコン、pdfはPDFアイコン、未指定の場合はアイコンなし）',
      options: ['external', 'pdf'],
      table: { category: '基本' },
    },
    target: {
      control: 'select',
      description: '外部リンク',
      options: ['', '_blank'],
      table: { category: '基本' },
    },
    className: {
      control: 'text',
      description: '任意のクラス',
      table: { category: '任意の設定' },
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HTML: Story = {
  name: '通常リンク',
  args: {
    href: '★★★',
    children: 'リンク',
  },
};

export const ExternalLink: Story = {
  name: '外部リンクアイコン',
  args: {
    href: 'https://example.com/',
    children: '外部リンクアイコン',
    icon: 'external',
    target: '_blank',
  },
  parameters: {
    docs: {
      description: {
        story: '`icon="external"`を指定すると、外部リンクアイコンが表示されます。',
      },
    },
  },
};

export const PdfLink: Story = {
  name: 'PDFアイコン',
  args: {
    href: '/document.pdf',
    children: 'PDFアイコン',
    icon: 'pdf',
  },
  parameters: {
    docs: {
      description: {
        story: '`icon="pdf"`を指定すると、PDFアイコンが表示されます。',
      },
    },
  },
};
