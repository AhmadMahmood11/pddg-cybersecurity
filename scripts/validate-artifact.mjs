import { access, readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const workerPath = 'dist/server/index.js';
const hostingPath = 'dist/.openai/hosting.json';
await access(workerPath);
JSON.parse(await readFile(hostingPath, 'utf8'));
const url = pathToFileURL(new URL(`../${workerPath}`, import.meta.url).pathname);
url.searchParams.set('validation', String(Date.now()));
const worker = await import(url.href);
if (!worker.default || typeof worker.default.fetch !== 'function') throw new Error('Worker entry must export default.fetch');
console.log('Validated Sites artifact: worker entry and hosting manifest are present.');
