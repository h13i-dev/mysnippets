// src/middleware.ts
import { defineMiddleware } from 'astro:middleware';

const PASSWORD = import.meta.env.STAGING_PASSWORD;

export const onRequest = defineMiddleware((context, next) => {
  // staging環境以外はスキップ
  if (import.meta.env.MODE !== 'staging') {
    return next();
  }

  const url = new URL(context.request.url);

  // パスワード送信処理
  if (context.request.method === 'POST' && url.pathname === '/__auth') {
    return context.request.formData().then((data) => {
      if (data.get('password') === PASSWORD) {
        const res = Response.redirect(url.origin, 302);
        res.headers.set('Set-Cookie', `stg_auth=${PASSWORD}; Path=/; HttpOnly`);
        return res;
      }
      return new Response(loginHtml('パスワードが違います'), {
        status: 401,
        headers: { 'Content-Type': 'text/html' },
      });
    });
  }

  // Cookie確認
  const cookie = context.request.headers.get('cookie') ?? '';
  if (cookie.includes(`stg_auth=${PASSWORD}`)) {
    return next();
  }

  // ログイン画面を表示
  return new Response(loginHtml(), {
    status: 401,
    headers: { 'Content-Type': 'text/html' },
  });
});

function loginHtml(error = '') {
  return `<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><title>Staging - 認証</title>
<style>
  body { display:flex; justify-content:center; align-items:center; height:100vh; margin:0; background:#f5f5f5; font-family:sans-serif; }
  form { background:white; padding:2rem; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1); }
  input { display:block; width:100%; padding:.5rem; margin:.5rem 0 1rem; border:1px solid #ccc; border-radius:4px; }
  button { width:100%; padding:.5rem; background:#000; color:white; border:none; border-radius:4px; cursor:pointer; }
  .error { color:red; font-size:.875rem; }
</style>
</head>
<body>
  <form method="POST" action="/__auth">
    <h2>Staging環境</h2>
    ${error ? `<p class="error">${error}</p>` : ''}
    <label>パスワード<input type="password" name="password" autofocus /></label>
    <button type="submit">ログイン</button>
  </form>
</body>
</html>`;
}
