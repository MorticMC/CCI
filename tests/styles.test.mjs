import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('styles provide theme variants, mobile layout, and motion safety', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(css, /data-theme="light"/);
  assert.match(css, /data-theme="dark"/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /max-width: 760px/);
  assert.match(css, /:focus-visible/);
});
