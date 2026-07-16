import { spawn } from 'node:child_process';

const server = spawn('./node_modules/.bin/vinext', ['start'], { stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, WRANGLER_WRITE_LOGS: 'false', WRANGLER_LOG_PATH: '.wrangler/wrangler.log' } });
let stderr = '';
server.stderr.on('data', chunk => { stderr += String(chunk); });
try {
  for (let attempt = 0; attempt < 50; attempt++) {
    try { const res = await fetch('http://127.0.0.1:3000/'); if (res.ok) break; } catch {}
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  await import('./audit-links.mjs');
} finally {
  server.kill('SIGTERM');
}
server.on('exit', code => { if (code && code !== 143) console.error(stderr); });
