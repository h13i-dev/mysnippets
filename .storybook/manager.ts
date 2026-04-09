import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';
import defaultLogo from '../src/assets/images/common/logo.svg?url';
import whiteLogo from '../src/assets/images/common/logo_white.svg?url';

// ブラウザのダークモード設定を検出
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

addons.setConfig({
  theme: create({
    base: prefersDark ? 'dark' : 'light',
    brandTitle: 'My Snippets',
    brandUrl: 'https://mysnippets.tech/',
    brandImage: prefersDark ? whiteLogo : defaultLogo,
    brandTarget: '_blank',
  }),
});
