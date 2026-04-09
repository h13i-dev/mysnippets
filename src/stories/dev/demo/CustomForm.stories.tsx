import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useEffect } from 'react';
import CustomDropdown from '../../../assets/js/modules/CustomDropdown';
import './_dropdown.scss';

const meta = {
  title: '_Dev/Demo/カスタムフォーム',
};

export default meta;
type Story = StoryObj;

export const SelectBox: Story = {
  name: 'セレクトボックス',
  parameters: {
    docs: {
      description: {
        story:
          'カスタムセレクトボックスと通常のセレクトボックスの比較デモです。カスタムセレクトボックスは、アクセシビリティを考慮した独自実装版です。',
      },
    },
  },
  render: () => {
    useEffect(() => {
      // CustomDropdownの初期化
      new CustomDropdown({ selector: '.js-customDropdown' });
    }, []);

    return (
      <div className="custom-form-demo">
        <h2 className="demo-heading">セレクトボックス</h2>

        <form role="search" className="c-grid" data-config="[1][sm:2]" action="★★★" method="get">
          <section className="demo-section">
            <h3 className="demo-subheading">カスタムセレクトボックス</h3>
            <div className="p-dropdown js-customDropdown">
              <p
                role="combobox"
                className="p-dropdown_selected"
                aria-label="並び順の選択"
                aria-activedescendant="option-saved-desc"
                aria-controls="dropdown-options"
                aria-expanded="false"
                tabIndex={0}
              >
                保存した順に表示（新しい記事が上）
              </p>
              <ul
                role="listbox"
                id="dropdown-options"
                className="p-dropdown_options"
                aria-label="並び順の選択"
                hidden
              >
                <li
                  role="option"
                  id="option-saved-desc"
                  className="p-dropdown_option is-selected"
                  aria-selected="true"
                  data-value="saved_desc"
                >
                  保存した順に表示（新しい記事が上）
                </li>
                <li
                  role="option"
                  id="option-saved-asc"
                  className="p-dropdown_option"
                  aria-selected="false"
                  data-value="saved_asc"
                >
                  保存した順に表示（古い記事が上）
                </li>
                <li
                  role="option"
                  id="option-published-desc"
                  className="p-dropdown_option"
                  aria-selected="false"
                  data-value="published_desc"
                >
                  公開日順に表示（新しい記事が上）
                </li>
                <li
                  role="option"
                  id="option-published-asc"
                  className="p-dropdown_option"
                  aria-selected="false"
                  data-value="published_asc"
                >
                  公開日順に表示（古い記事が上）
                </li>
              </ul>
              <input type="hidden" id="sort-order-hidden" name="sort_order" value="saved_desc" />
            </div>
          </section>

          <section className="demo-section">
            <h3 className="demo-subheading">通常のセレクトボックス</h3>
            <select
              id="sort-order-select"
              className="c-form-select"
              name="normal-sort-order"
              aria-label="並び順の選択"
            >
              <option value="saved_desc">保存した順に表示（新しい記事が上）</option>
              <option value="saved_asc">保存した順に表示（古い記事が上）</option>
              <option value="published_desc">公開日順に表示（新しい記事が上）</option>
              <option value="published_asc">公開日順に表示（古い記事が上）</option>
            </select>
            <p className="demo-note">
              <code>::picker</code>
              疑似要素はまだ全ての主要ブラウザで対応していないため、現状ではタグのスタイルを制御することができない。（
              <a
                href="https://caniuse.com/?search=%3A%3Apicker"
                target="_blank"
                rel="noopener noreferrer"
              >
                Can I use
              </a>
              ）
            </p>
          </section>
        </form>
      </div>
    );
  },
};
