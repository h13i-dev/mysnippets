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

const parsePayload = (raw) => {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const extractFilesFromPatch = (patch) => {
  const files = new Set();

  for (const line of patch.split(/\r?\n/)) {
    const codex = line.match(/^\*\*\* (?:Update|Add) File:\s*(.+)$/);
    if (codex) {
      files.add(codex[1].trim());
      continue;
    }

    const unified = line.match(/^\+\+\+ b\/(.+)$/);
    if (unified) {
      files.add(unified[1].trimEnd());
    }
  }

  return [...files];
};

const getPatchString = (toolInput) => {
  if (typeof toolInput === 'string') return toolInput;

  return toolInput?.command ?? toolInput?.patch ?? '';
};

const resolveFiles = (toolInput) => {
  if (toolInput?.file_path) return [toolInput.file_path];

  return extractFilesFromPatch(getPatchString(toolInput));
};

const formatFile = (file) => {
  const quotedFile = JSON.stringify(file);
  const rule = rules.find(({ pattern }) => pattern.test(file));

  rule?.tools.forEach((tool) => run(cmds[tool](quotedFile)));
};

let data = '';
process.stdin.on('data', (chunk) => (data += chunk));
process.stdin.on('end', () => {
  const payload = parsePayload(data);
  if (!payload) process.exit(0);

  const files = resolveFiles(payload.tool_input);
  for (const file of files) {
    formatFile(file);
  }
});
