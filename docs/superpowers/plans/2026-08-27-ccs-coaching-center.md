# CCS Coaching Center Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Build a responsive, accessible one-page website for CCS Coaching Center in Tando Muhammad Khan.

**Architecture:** index.html is the semantic static foundation. styles.css contains responsive design and theme tokens. script.js adds JSON-driven content and interactions. data/center.json centralizes editable facts, and script.ts documents the matching type model.

**Tech Stack:** Semantic HTML5, CSS custom properties, vanilla JavaScript, TypeScript definitions, JSON, Node.js built-in test runner.

**Spec:** docs/superpowers/specs/2026-08-27-ccs-coaching-center-design.md

## Global Constraints

- No runtime framework or package installation.
- Keep content understandable if JSON fetching fails.
- Provide System, Light, and Dark modes, persisting a manual choice.
- State Rs. 500 per selected subject.
- List classes 6 through 12 and exclude Sindhi, Urdu, and Islamiat.
- State a 15-student total capacity per class, girls and boys welcome.
- Never expose an IP address to visitors.

---

### Task 1: Create Center Data

**Files:**
- Create: data/center.json
- Create: script.ts
- Test: tests/center-data.test.mjs

**Interfaces:**
- Produces CenterData with name, location, feePerSubject, capacity, levels, subjects, and stats.
- Produces editable JSON with the same fields.

- [ ] **Step 1: Write failing contract test**

Use this source:

    import test from 'node:test';
    import assert from 'node:assert/strict';
    import { readFile } from 'node:fs/promises';

    test('center data preserves core enrolment facts', async () => {
      const data = JSON.parse(await readFile(new URL('../data/center.json', import.meta.url)));
      assert.equal(data.feePerSubject, 500);
      assert.equal(data.capacity, 15);
      assert.deepEqual(data.levels, [6, 7, 8, 9, 10, 11, 12]);
      assert.ok(!data.subjects.some((item) => /sindhi|urdu|islamiat/i.test(item)));
    });

- [ ] **Step 2: Confirm failure**

Run: node --test tests/center-data.test.mjs

Expected: failure because data/center.json does not exist.

- [ ] **Step 3: Add data and matching type model**

Create JSON with the approved TMK location, classes, valid subjects, fee, capacity, teacher/admin stats, and benefit copy. In script.ts, define a matching CenterData interface.

- [ ] **Step 4: Confirm pass**

Run: node --test tests/center-data.test.mjs

Expected: PASS.

- [ ] **Step 5: Commit**

Run: git add data/center.json script.ts tests/center-data.test.mjs
Run: git commit -m "feat: add CCS center content model"

### Task 2: Build the Accessible Page Structure

**Files:**
- Create: index.html
- Test: tests/page-structure.test.mjs

**Interfaces:**
- Produces anchors #about, #learning, #pricing, and #visit.
- Produces controls #theme-system, #theme-light, #theme-dark, and #menu-toggle.
- Produces enhancement targets #level-list, #subject-list, and #stats-grid.

- [ ] **Step 1: Write failing structural test**

Use this source:

    import test from 'node:test';
    import assert from 'node:assert/strict';
    import { readFile } from 'node:fs/promises';

    test('page presents all enrollment decisions and themes', async () => {
      const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
      for (const id of ['about', 'learning', 'pricing', 'visit', 'theme-system', 'theme-light', 'theme-dark']) {
        assert.match(html, new RegExp('id=["' + id + '"]'));
      }
      assert.match(html, /Opposite Shell Pump/i);
      assert.match(html, /15 students/i);
    });

- [ ] **Step 2: Confirm failure**

Run: node --test tests/page-structure.test.mjs

Expected: failure because index.html does not exist.

- [ ] **Step 3: Create semantic landing page**

Add an announcement, responsive header, theme switcher, hero, trust strip, About, Learning, Pricing, Visit, and footer. Include static fallback course content, external Google Maps search link, image URLs, and references to styles.css and script.js.

- [ ] **Step 4: Confirm pass**

Run: node --test tests/page-structure.test.mjs

Expected: PASS.

- [ ] **Step 5: Commit**

Run: git add index.html tests/page-structure.test.mjs
Run: git commit -m "feat: add CCS landing page structure"

### Task 3: Add Responsive Design and Themes

**Files:**
- Create: styles.css
- Test: tests/styles.test.mjs

**Interfaces:**
- Consumes HTML classes and root data-theme.
- Produces responsive styling and token sets for explicit light and dark themes.

- [ ] **Step 1: Write failing style test**

Use this source:

    import test from 'node:test';
    import assert from 'node:assert/strict';
    import { readFile } from 'node:fs/promises';

    test('styles define explicit themes and reduced motion', async () => {
      const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
      assert.match(css, /data-theme="light"/);
      assert.match(css, /data-theme="dark"/);
      assert.match(css, /prefers-reduced-motion/);
      assert.match(css, /max-width: 760px/);
    });

- [ ] **Step 2: Confirm failure**

Run: node --test tests/styles.test.mjs

Expected: failure because styles.css does not exist.

- [ ] **Step 3: Implement visual system**

Use deep blue, teal, and gold tokens; light/dark variants; grid and gradient details; responsive card, section, hero, and image styles; keyboard focus; mobile menu styles; and reduced-motion rules.

- [ ] **Step 4: Confirm pass**

Run: node --test tests/styles.test.mjs

Expected: PASS.

- [ ] **Step 5: Commit**

Run: git add styles.css tests/styles.test.mjs
Run: git commit -m "feat: style CCS responsive themes"

### Task 4: Add Interaction and Data Enrichment

**Files:**
- Create: script.js
- Test: tests/script.test.mjs

**Interfaces:**
- Consumes data/center.json, theme controls, menu control, and content targets.
- Produces applyTheme(mode), localStorage key ccs-theme, accessible menu state, and generated stat/course cards.

- [ ] **Step 1: Write failing source behavior test**

Use this source:

    import test from 'node:test';
    import assert from 'node:assert/strict';
    import { readFile } from 'node:fs/promises';

    test('script supports themes, content data, and menu state', async () => {
      const js = await readFile(new URL('../script.js', import.meta.url), 'utf8');
      assert.match(js, /localStorage.setItem/);
      assert.match(js, /ccs-theme/);
      assert.match(js, /data\/center.json/);
      assert.match(js, /aria-expanded/);
      assert.match(js, /prefers-color-scheme/);
    });

- [ ] **Step 2: Confirm failure**

Run: node --test tests/script.test.mjs

Expected: failure because script.js does not exist.

- [ ] **Step 3: Implement progressive enhancement**

Implement system/light/dark preference and persistence, menu toggle/close logic, safe JSON fetch/rendering, scroll reveals, and a reduced-motion-aware capacity counter. Keep static fallback content visible if fetching fails.

- [ ] **Step 4: Confirm pass**

Run: node --test tests/script.test.mjs

Expected: PASS.

- [ ] **Step 5: Commit**

Run: git add script.js tests/script.test.mjs
Run: git commit -m "feat: add CCS themes and data interactions"

### Task 5: Verify the Whole Site

**Files:**
- Modify: index.html, styles.css, script.js, data/center.json only if verification finds an issue.

- [ ] **Step 1: Run all automated checks**

Run: node --test tests/*.test.mjs

Expected: all tests PASS.

- [ ] **Step 2: Validate JSON and source links**

Run: node -e "JSON.parse(require('node:fs').readFileSync('data/center.json')); console.log('valid JSON')"
Run: rg -n "styles.css|script.js|data/center.json" index.html script.js

Expected: valid JSON and every runtime asset reference.

- [ ] **Step 3: Preview the static site**

Run: python3 -m http.server 4173

Expected: browser preview at http://localhost:4173.

- [ ] **Step 4: Manually check visitor paths**

Check System, Light, Dark, keyboard focus, mobile navigation, all section links, map link, pricing/capacity copy, desktop/mobile presentation, and fallback reading state.

- [ ] **Step 5: Commit verification fixes**

Run: git add index.html styles.css script.js data/center.json
Run: git commit -m "chore: verify CCS landing site"

