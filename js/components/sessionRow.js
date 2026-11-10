/**
 * One row in the single-column session list.
 * Default: lighter Morandi blue. On hover/focus: light grey, and the
 * speaker's short bio slides open inside the row.
 */
import { esc } from '../lib/dom.js';
import { sessionProgress } from '../lib/progress.js';

export function sessionRow(session, index) {
  const p = sessionProgress(session);
  const sp = session.speaker;
  const who = sp.members ? `${sp.name} · ${sp.members.join(', ')}` : sp.name;
  return `
    <li data-reveal style="--i:${index}">
      <a class="session-row" href="#/session/${esc(session.id)}">
        <span class="row-num">#${index + 1}</span>
        <span class="row-main">
          <span class="row-meta">${esc(session.date)} · ${esc(session.courseSession)}</span>
          <span class="row-title">${esc(session.title)}</span>
          <span class="row-speaker">${esc(who)}</span>
          <span class="row-bio"><span><span class="row-bio-inner">${esc(sp.shortBio)}</span></span></span>
        </span>
        <span class="row-side">
          <span class="row-progress ${p.done === p.total ? 'is-done' : ''}">${p.done === p.total ? '✓ All games done' : `${p.done}/${p.total} games`}</span>
          <span class="row-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </span>
      </a>
    </li>`;
}

export function upcomingRow(u, index = 0) {
  return `
    <li data-reveal style="--i:${index}">
      <div class="session-row is-upcoming" aria-disabled="true">
        <span class="row-num">··</span>
        <span class="row-main">
          <span class="row-meta">${esc(u.when)} · Coming soon</span>
          <span class="row-title">${esc(u.name)}</span>
          <span class="row-speaker">${esc(u.topic)}</span>
        </span>
        <span class="row-side"><span class="row-progress">Soon</span></span>
      </div>
    </li>`;
}
