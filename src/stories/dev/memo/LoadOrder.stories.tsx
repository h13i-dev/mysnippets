import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useEffect } from 'react';
import './load-order.scss';

const meta = {
  title: '_Dev/Memo/JavaScriptの読み込み順序',
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: '読み込み順序デモ',
  parameters: {
    docs: {
      description: {
        story:
          'JavaScriptの読み込み順序とスクリプト実行タイミングについての説明です。ブラウザのコンソールを開いて、JavaScriptの実行順序を確認してください。',
      },
    },
  },
  render: () => {
    useEffect(() => {
      // コンソールをクリア（オプション）
      console.clear();
      console.log('=== JavaScriptの読み込み順序デモ開始 ===');

      // 1. 通常のscript（何もなし）
      console.info('1: 何もなし（通常のscript）');

      // 2. defer script のシミュレーション
      const deferScript = document.createElement('script');
      deferScript.text = 'console.info("2: script defer");';
      deferScript.defer = true;
      document.body.appendChild(deferScript);

      // 3. DOMContentLoaded イベント
      const onDOMContentLoaded = () => {
        console.info('3: DOMContentLoaded');
      };

      // 4. load イベント
      const onLoad = () => {
        console.info('4: load');
      };

      // 5. async script のシミュレーション（任意のタイミング）
      const asyncScript = document.createElement('script');
      asyncScript.text = 'console.info("任意のタイミング: script async");';
      asyncScript.async = true;

      // 非同期的に実行（asyncの挙動をシミュレート）
      setTimeout(() => {
        document.body.appendChild(asyncScript);
      }, Math.random() * 1000); // ランダムなタイミングで実行

      // イベントリスナーを登録
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
      } else {
        // 既にDOMContentLoadedが発火済みの場合
        console.info('3: DOMContentLoaded（既に発火済み）');
      }

      window.addEventListener('load', onLoad);

      // クリーンアップ
      return () => {
        document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
        window.removeEventListener('load', onLoad);
        // 追加したスクリプトを削除
        if (deferScript.parentNode) {
          deferScript.parentNode.removeChild(deferScript);
        }
        if (asyncScript.parentNode) {
          asyncScript.parentNode.removeChild(asyncScript);
        }
      };
    }, []);

    return (
      <div className="load-order-demo">
        <section className="demo-section">
          <h2 className="demo-heading">JavaScriptの読み込み順序</h2>
          <p className="demo-description">
            ブラウザのコンソールを開いて、実行順序を確認してください。
          </p>

          <div className="demo-box">
            <h3 className="demo-subheading">コード例</h3>
            <pre className="demo-code">
              {`<script src="/defer.js" defer></script>
<script src="/async.js" async></script>
<script>
  window.addEventListener("load", () => console.info("4: load"));
  document.addEventListener("DOMContentLoaded", () => console.info("3: DOMContentLoaded"));
</script>
<script>
  console.info("1: 何もなし");
</script>`}
            </pre>
          </div>

          <div className="demo-box">
            <h3 className="demo-subheading">JavaScript処理順</h3>
            <p className="demo-note">★ = JavaScript実行</p>
            <pre className="demo-flow">
              {`HTMLパース開始
    ↓
★通常script実行（パースを中断）
    ↓
HTMLパース再開
    ↓
DOM構築完了
    ↓
★defer script実行（記述順）
    ↓
★DOMContentLoadedイベント発火
    ↓
画像等のリソース読み込み継続
    ↓
★loadイベント発火

※（★async scriptは任意のタイミングで割り込み）`}
            </pre>
          </div>

          <div className="demo-box">
            <h3 className="demo-subheading">実行順序の説明</h3>
            <dl className="demo-list">
              <dt>1. 通常のscript（何もなし）</dt>
              <dd>HTMLパース中に即座に実行される。パースを中断して実行。記述順に実行される。</dd>

              <dt>2. defer属性付きscript</dt>
              <dd>
                HTMLパース完了後、DOMContentLoadedイベントの前に実行。複数ある場合は記述順に実行。DOM操作が可能。
              </dd>

              <dt>3. async属性付きscript</dt>
              <dd>
                ダウンロード完了次第、任意のタイミングで実行。HTMLパースを中断して実行される。実行順序は保証されない。
              </dd>

              <dt>4. DOMContentLoadedイベント</dt>
              <dd>
                DOM構築が完了した時点で発火。defer
                scriptの実行後に発火。画像などの外部リソースの読み込みを待たない。
              </dd>

              <dt>5. loadイベント</dt>
              <dd>すべてのリソース（画像、CSS、スクリプトなど）の読み込みが完了した時点で発火。</dd>
            </dl>
          </div>

          <div className="demo-box">
            <h3 className="demo-subheading">期待されるコンソール出力順序</h3>
            <pre className="demo-output">
              {`1: 何もなし
2: script defer
3: DOMContentLoaded
4: load
任意のタイミング: script async`}
            </pre>
          </div>

          <div className="demo-box">
            <h3 className="demo-subheading">使い分けのポイント</h3>
            <table className="demo-table">
              <thead>
                <tr>
                  <th>属性</th>
                  <th>実行タイミング</th>
                  <th>実行順序</th>
                  <th>用途</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>なし</td>
                  <td>パース中（即座）</td>
                  <td>記述順</td>
                  <td>初期化処理が必要な場合</td>
                </tr>
                <tr>
                  <td>defer</td>
                  <td>DOM構築後</td>
                  <td>記述順（保証）</td>
                  <td>DOM操作が必要な場合</td>
                </tr>
                <tr>
                  <td>async</td>
                  <td>ダウンロード完了後</td>
                  <td>不定（保証なし）</td>
                  <td>独立したスクリプト（分析ツールなど）</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="demo-box demo-warning">
            <h3 className="demo-subheading">注意事項</h3>
            <ul>
              <li>
                <strong>async</strong>
                は実行順序が保証されないため、他のスクリプトに依存する場合は使用しない
              </li>
              <li>
                <strong>defer</strong>
                はDOM操作が可能だが、外部リソース（画像など）の読み込みは完了していない可能性がある
              </li>
              <li>
                <strong>通常のscript</strong>
                はHTMLパースをブロックするため、ページの表示速度に影響を与える可能性がある
              </li>
            </ul>
          </div>
        </section>
      </div>
    );
  },
};
