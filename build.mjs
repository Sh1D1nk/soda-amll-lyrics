import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dir = path.dirname(fileURLToPath(import.meta.url));
const stub = path.join(dir, 'src', 'pixi-stub.js');

const alias = {};
for (const p of [
  '@pixi/app',
  '@pixi/core',
  '@pixi/display',
  '@pixi/filter-blur',
  '@pixi/filter-bulge-pinch',
  '@pixi/filter-color-matrix',
  '@pixi/sprite',
]) {
  alias[p] = stub;
}

const res = await build({
  entryPoints: [path.join(dir, 'src', 'inject.js')],
  bundle: true,
  format: 'iife',
  target: 'chrome100',
  platform: 'browser',
  outfile: path.join(dir, 'dist', 'soda-amll.js'),
  loader: { '.css': 'text' },
  alias,
  legalComments: 'none',
  logLevel: 'info',
});

console.log('built', res.outputFiles ? res.outputFiles.length : 'ok');
