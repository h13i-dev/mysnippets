import { execSync } from 'child_process';

const run = (cmd) => {
  try {
    execSync(cmd, { stdio: 'ignore' });
  } catch {
    // ignore
  }
};

const cmds = {
  prettier: (f) => `pnpm exec prettier --write ${f}`,
  stylelint: (f) => `pnpm exec stylelint --fix ${f}`,
  biome: (f) => `pnpm exec biome check --write ${f}`,
  eslint: (f) => `pnpm exec eslint --fix ${f}`,
};

const rules = [
  { pattern: /\.scss$/, tools: ['prettier', 'stylelint'] },
  { pattern: /\.astro$/, tools: ['prettier'] },
  { pattern: /\.(tsx?|js)$/, tools: ['prettier', 'biome', 'eslint'] },
];

let data = '';
process.stdin.on('data', (chunk) => (data += chunk));
process.stdin.on('end', () => {
  let toolInput;
  try {
    ({ tool_input: toolInput } = JSON.parse(data));
  } catch {
    process.exit(0);
  }

  const file = toolInput?.file_path;
  if (!file) process.exit(0);

  const f = JSON.stringify(file);
  const rule = rules.find(({ pattern }) => pattern.test(file));
  rule?.tools.forEach((tool) => run(cmds[tool](f)));
});
