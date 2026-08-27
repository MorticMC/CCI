import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('center data preserves core enrolment facts', async () => {
  const source = await readFile(new URL('../data/center.json', import.meta.url), 'utf8');
  const data = JSON.parse(source);

  assert.equal(data.feePerSubject, 500);
  assert.equal(data.capacity, 15);
  assert.deepEqual(data.levels, [6, 7, 8, 9, 10, 11, 12]);
  assert.ok(!data.subjects.some((item) => /sindhi|urdu|islamiat/i.test(item)));
});
