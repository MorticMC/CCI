import test from 'node:test';
import assert from 'node:assert/strict';

const { normalizeTheme, effectiveTheme, formatFee } = await import('../script.js');

test('theme helpers choose a safe saved mode and honor system preference', () => {
  assert.equal(normalizeTheme('dark'), 'dark');
  assert.equal(normalizeTheme('anything-else'), 'system');
  assert.equal(effectiveTheme('system', true), 'dark');
  assert.equal(effectiveTheme('system', false), 'light');
  assert.equal(effectiveTheme('light', true), 'light');
});

test('fee helper formats a per-subject rupee amount for visitors', () => {
  assert.equal(formatFee(500), 'Rs. 500');
});
