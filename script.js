/**
 * CCS Coaching Center — browser runtime.
 * Provides theme persistence, mobile navigation, JSON-driven content,
 * scroll reveals, and a reduced-motion-aware capacity counter.
 *
 * The matching TypeScript model lives in script.ts; this file is the
 * browser-ready JavaScript runtime referenced by index.html.
 */

/* ------------------------------------------------------------------ *
 * Theme helpers (exported for tests).
 * ------------------------------------------------------------------ */

const THEME_KEY = 'ccs-theme';

const THEMES = ['system', 'light', 'dark'];

/** Return a safe saved theme mode ('system' is the fallback). */
export function normalizeTheme(raw) {
  return THEMES.includes(raw) ? raw : 'system';
}

/** Resolve a mode to the concrete dark/light preference. */
export function effectiveTheme(mode, isDarkPref) {
  if (mode === 'dark') return 'dark';
  if (mode === 'light') return 'light';
  return isDarkPref ? 'dark' : 'light';
}

/** Format a per-subject rupee amount for visitors. */
export function formatFee(amount, currency = 'Rs.') {
  return `${currency} ${amount}`;
}

/* ------------------------------------------------------------------ */
/* Theme wiring                                                         */
/* ------------------------------------------------------------------ */
function systemPrefersDark() {
  return (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
}

function applyTheme(mode) {
  const dark = effectiveTheme(mode, systemPrefersDark());
  const root = document.documentElement;
  if (dark === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.removeAttribute('data-theme');
  }
  document
    .querySelectorAll('[data-theme-choice]')
    .forEach((button) => {
      button.setAttribute(
        'aria-pressed',
        String(button.dataset.themeChoice === mode),
      );
    });
}

function initTheme() {
  const saved = normalizeTheme(localStorage.getItem(THEME_KEY));
  applyTheme(saved);
  document.querySelectorAll('[data-theme-choice]').forEach((button) => {
    button.addEventListener('click', () => {
      localStorage.setItem(THEME_KEY, button.dataset.themeChoice);
      applyTheme(button.dataset.themeChoice);
    });
  });
  if (window.matchMedia) {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        const current = normalizeTheme(localStorage.getItem(THEME_KEY));
        if (current === 'system') applyTheme(current);
      });
  }
}

/* ------------------------------------------------------------------ */
/* Mobile navigation                                                    */
/* ------------------------------------------------------------------ */
function initMenu() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
}
/* ------------------------------------------------------------------ */
/* Scroll reveals                                                       */
/* ------------------------------------------------------------------ */
function initReveals() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const reducedMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  items.forEach((el) => observer.observe(el));
}

/* ------------------------------------------------------------------ */
/* Content enrichment from data/center.json (fallback-safe)              */
/* ------------------------------------------------------------------ */
function fillFromData(data) {
  if (!data || typeof data !== 'object') return;

  // Stats grid
  const statsGrid = document.getElementById('stats-grid');
  if (statsGrid && Array.isArray(data.stats)) {
    statsGrid.innerHTML = data.stats
      .map(
        (stat) =>
          `<div class="trust-stat"><strong>${stat.value}</strong><span>${stat.label}</span></div>`,
      )
      .join('');
  }

  // Level list
  const levelList = document.getElementById('level-list');
  if (levelList && Array.isArray(data.levels)) {
    levelList.innerHTML = data.levels
      .map((level) => `<span>Class ${level}</span>`)
      .join('');
  }

  // Subject list
  const subjectList = document.getElementById('subject-list');
  if (subjectList && Array.isArray(data.subjects)) {
    subjectList.innerHTML = data.subjects
      .map((subject) => `<span>${subject}</span>`)
      .join('');
  }

  // Pricing card
  if (data.currency && data.feePerSubject) {
    const price = document.querySelector('.price');
    const caption = document.querySelector('.price-card__caption');
    if (price) {
      price.innerHTML = `<small>${data.currency}</small> ${data.feePerSubject}`;
    }
    if (caption) caption.textContent = 'per subject';
  }
}
async function initData() {
  try {
    const response = await fetch('data/center.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    fillFromData(data);
  } catch (error) {
    // Keep the static fallback HTML visible; interactive cards are optional.
    console.warn(
      'CCI: could not load center.json — showing static content',
      error,
    );
  }
}

/* ------------------------------------------------------------------ */
/* Footer year                                                          */
/* ------------------------------------------------------------------ */
function initYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
}

/* ------------------------------------------------------------------ */
/* Boot                                                                 */
/* ------------------------------------------------------------------ */
const canRunBrowserCode =
  typeof window !== 'undefined' &&
  typeof document !== 'undefined' &&
  typeof localStorage !== 'undefined';

if (canRunBrowserCode) {
  // Ensure the `.js` class is present so reveal hiding only applies
  // when this runtime is actually executing.
  document.documentElement.classList.add('js');
  initTheme();
  initMenu();
  initReveals();
  initData();
  initYear();
}