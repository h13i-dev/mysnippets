import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import { sbdocsPreviewHiddenCss } from '@stories/assets/utils/utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '@stories/assets/sass/storybook/icon.scss';

const meta: Meta = {
  title: 'Components/背景画像',
  component: undefined,
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
type Story = StoryObj;

export const ImgBackgroundImage: Story = {
  name: 'imgタグの背景画像',
  render: () => {
    return (
      <div className="c-container u-border-2 u-border-dashed u-border-sky-500">
        <p className="u-text-white">テキストが入ります</p>
        <img
          src="https://picsum.photos/id/112/4200/2800.jpg"
          className="u-bg-img u-brightness-50"
          alt=""
        />
      </div>
    );
  },
};

export const PictureBackgroundImage: Story = {
  name: 'pictureタグの背景画像',
  render: () => {
    return (
      <div className="c-container u-border-2 u-border-dashed u-border-sky-500">
        <p className="u-text-white">テキストが入ります</p>
        <picture className="u-bg-img u-brightness-50">
          <source media="(min-width: 640px)" srcSet="https://picsum.photos/id/112/4200/2800.jpg" />
          <img src="https://picsum.photos/id/559/4288/2848.jpg" alt="" />
        </picture>
      </div>
    );
  },
};
