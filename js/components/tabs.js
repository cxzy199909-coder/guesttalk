/**
 * Main tab navigation: "All sessions" + one tab per guest session.
 * Built from the sessions data, so new sessions appear automatically.
 * A pill indicator glides from the previous tab to the new one.
 */
import { esc, prefersReducedMotion } from '../lib/dom.js';
import { sessions } from '../data/sessions.js';

let last = null; // { x, w } of the previously active tab

export function renderTabs(container, activeKey) {
  const tabs = [
    { key: 'sessions', href: '#/sessions', label: 'All sessions', num: '' },
    ...sessions.map((s, i) => ({ key: s.id, href: `#/session/${s.id}`, label: s.tabLabel, num: `#${i + 1}` })),
  ];
  container.innerHTML = `
    <div class="tabbar-inner container">
      <span class="tab-indicator" aria-hidden="true"></span>
      ${tabs.map((t) => `
        <a class="tab ${t.key === activeKey ? 'is-active' : ''}" href="${t.href}" ${t.key === activeKey ? 'aria-current="page"' : ''}>
          ${t.num ? `<span class="tab-num">${t.num}</span>` : ''}${esc(t.label)}
        </a>`).join('')}
    </div>`;

  const inner = container.querySelector('.tabbar-inner');
  const ind = container.querySelector('.tab-indicator');
  const active = container.querySelector('.tab.is-active');
  const place = (r) => { ind.style.transform = `translateX(${r.x}px)`; ind.style.width = `${r.w}px`; };

  if (!active) {
    if (last) { ind.style.transition = 'none'; place(last); ind.style.opacity = '1'; requestAnimationFrame(() => { ind.style.transition = ''; ind.style.opacity = '0'; }); }
    last = null;
    return;
  }
  const to = { x: active.offsetLeft, w: active.offsetWidth };
  if (last && !prefersReducedMotion()) {
    ind.style.transition = 'none';
    place(last);
    ind.style.opacity = '1';
    void ind.offsetWidth; // commit start position
    ind.style.transition = '';
  }
  place(to);
  ind.style.opacity = '1';
  last = to;

  const left = active.offsetLeft - 16;
  if (left < inner.scrollLeft || active.offsetLeft + active.offsetWidth > inner.scrollLeft + inner.clientWidth) {
    inner.scrollTo({ left, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }
}

/** Keep the indicator aligned after a resize. */
window.addEventListener('resize', () => {
  const active = document.querySelector('.tab.is-active');
  const ind = document.querySelector('.tab-indicator');
  if (!active || !ind) return;
  ind.style.transition = 'none';
  last = { x: active.offsetLeft, w: active.offsetWidth };
  ind.style.transform = `translateX(${last.x}px)`;
  ind.style.width = `${last.w}px`;
  requestAnimationFrame(() => { ind.style.transition = ''; });
});

/** Highlight the top-right Home / About pills. */
export function setNavActive(key) {
  document.querySelectorAll('.nav-pill').forEach((a) => {
    const on = a.dataset.nav === key;
    a.classList.toggle('is-active', on);
    if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
}
