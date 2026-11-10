/**
 * Main tab navigation: "All sessions" + one tab per guest session.
 * Built from the sessions data, so new sessions appear automatically.
 */
import { esc } from '../lib/dom.js';
import { sessions } from '../data/sessions.js';

export function renderTabs(container, activeKey) {
  const tabs = [
    { key: 'sessions', href: '#/sessions', label: 'All sessions', num: '' },
    ...sessions.map((s, i) => ({ key: s.id, href: `#/session/${s.id}`, label: s.tabLabel, num: `#${i + 1}` })),
  ];
  container.innerHTML = `
    <div class="tabbar-inner container">
      ${tabs.map((t) => `
        <a class="tab ${t.key === activeKey ? 'is-active' : ''}" href="${t.href}" ${t.key === activeKey ? 'aria-current="page"' : ''}>
          ${t.num ? `<span class="tab-num">${t.num}</span>` : ''}${esc(t.label)}
        </a>`).join('')}
    </div>`;
  container.querySelector('.tab.is-active')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
}

/** Highlight the top-right Home / About pills. */
export function setNavActive(key) {
  document.querySelectorAll('.nav-pill').forEach((a) => {
    const on = a.dataset.nav === key;
    a.classList.toggle('is-active', on);
    if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
}
