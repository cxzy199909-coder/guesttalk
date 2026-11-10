/**
 * Speaker "business card" on each session page.
 * Uses the same soft pale blue as the home hero.
 */
import { esc, initials } from '../lib/dom.js';

function avatar(sp) {
  if (sp.members) {
    return `<div class="avatar-stack" aria-hidden="true">
      ${sp.members.map((m) => `<span class="avatar avatar-sm">${esc(m[0])}</span>`).join('')}
    </div>`;
  }
  return `<span class="avatar" aria-hidden="true">${esc(sp.initials || initials(sp.name))}</span>`;
}

export function speakerCard(session, index) {
  const sp = session.speaker;
  return `
    <section class="speaker-card" aria-label="About the speaker">
      ${avatar(sp)}
      <div class="speaker-body">
        <p class="eyebrow">Guest #${index + 1} · ${esc(session.date)} · ${esc(session.courseSession)}</p>
        <h2 class="speaker-name">${esc(sp.name)}</h2>
        ${sp.members ? `<p class="speaker-members">${esc(sp.members.join(' · '))}</p>` : ''}
        <p class="speaker-role">${esc(sp.role)}</p>
        <p class="speaker-bio">${esc(sp.bio)}</p>
        <ul class="tag-list">${sp.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
      </div>
    </section>`;
}
