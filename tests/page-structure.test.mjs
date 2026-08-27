import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('landing page gives a visitor the essential enrollment details', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

  for (const id of ['about', 'learning', 'pricing', 'visit', 'theme-system', 'theme-light', 'theme-dark']) {
    assert.match(html, new RegExp('id=["\']' + id + '["\']'));
  }

  assert.match(html, /Opposite Shell Pump/i);
  assert.match(html, /15 students/i);
  assert.match(html, /Rs\. 500/i);
  assert.match(html, /assets\/ccs-study-room\.png/);
});
