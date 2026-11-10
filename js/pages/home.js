import { esc } from '../lib/dom.js';
import { sessions, upcoming, course } from '../data/sessions.js';
import { sessionRow } from '../components/sessionRow.js';
import { splitWords, countUp, scrollParallax } from '../lib/motion.js';

export function renderHome(app) {
  const gameCount = sessions.reduce((n, s) => n + s.games.length, 0);
  const latest = sessions[sessions.length - 1];
  const next = upcoming[0];
  const img = course.heroImage;

  const cards = [
    ...sessions.slice(-2).map((s) => ({
      href: `#/session/${s.id}`,
      num: `#${sessions.indexOf(s) + 1}`,
      title: s.title,
      meta: `${s.speaker.name} · ${s.date}`,
    })),
    ...(next ? [{ href: '#/sessions', num: 'Next up', title: next.name, meta: 'Coming soon', ghost: true }] : []),
  ];

  app.innerHTML = `
    <section class="hero container">
      <div class="hero-card">
        <div class="hero-top">
          ${img ? `
          <div class="hero-photo" aria-hidden="true">
            <img src="${esc(img.src)}" alt="" decoding="async" fetchpriority="high" onerror="this.closest('.hero-photo').remove()">
          </div>` : ''}
          <div class="hero-veil" aria-hidden="true"></div>
          <div class="hero-grid" aria-hidden="true"></div>

          <div class="hero-copy">
            <p class="hero-eyebrow hero-in" style="--d:0"><span class="dot" aria-hidden="true"></span>This semester</p>
            <h1 class="hero-title">Learn from people who’ve <em>been there.</em></h1>
            <p class="hero-lead hero-in" style="--d:6">Guest sessions throughout the semester, one place to catch up on what they shared.</p>
            <div class="hero-cta hero-in" style="--d:7">
              <a class="btn btn-primary btn-lg" href="#/session/${esc(latest.id)}">Explore the latest session <span class="btn-arrow" aria-hidden="true">→</span></a>
              <a class="btn btn-soft btn-lg" href="#/sessions">All sessions</a>
            </div>
          </div>
          ${img?.credit ? `<a class="hero-credit" href="${esc(img.creditUrl || '#')}" target="_blank" rel="noopener">${esc(img.credit)}</a>` : ''}
        </div>

        <div class="hero-bottom">
          <ul class="hero-cards">
            ${cards.map((c, i) => `
              <li class="hero-card-item ${c.ghost ? 'is-ghost' : ''}" style="--delay:${0.75 + i * 0.12}s; --float:${-i * 2.2}s">
                <a href="${esc(c.href)}">
                  <span class="fc-num">${esc(c.num)}</span>
                  <span class="fc-title">${esc(c.title)}</span>
                  <span class="fc-meta">${esc(c.meta)}</span>
                  <span class="fc-go" aria-hidden="true">→</span>
                </a>
              </li>`).join('')}
          </ul>
          <dl class="hero-stats hero-in" style="--d:11">
            <div><dt>Guest sessions</dt><dd data-count>${sessions.length}</dd></div>
            <div><dt>Mini-games</dt><dd data-count>${gameCount}</dd></div>
            <div><dt>Logins needed</dt><dd>0</dd></div>
          </dl>
        </div>
      </div>
    </section>

    <section class="container section">
      <div class="section-head" data-reveal>
        <div>
          <p class="eyebrow">The line-up</p>
          <h2>Guest speakers so far</h2>
        </div>
        <a class="link-arrow" href="#/sessions">All sessions <span aria-hidden="true">→</span></a>
      </div>
      <ul class="session-list">${sessions.map(sessionRow).join('')}</ul>
      ${upcoming.length ? `<p class="list-note" data-reveal>+ ${upcoming.length} more guests announced in the syllabus. <a href="#/sessions">See what’s coming</a>.</p>` : ''}
    </section>

    <section class="container section">
      <div class="section-head" data-reveal><div><p class="eyebrow">How it works</p><h2>Three minutes per session</h2></div></div>
      <ol class="steps">
        <li data-reveal style="--i:0"><span class="step-num">1</span><h3>Pick a tab</h3><p>Each guest session has its own tab at the top of the page.</p></li>
        <li data-reveal style="--i:1"><span class="step-num">2</span><h3>Skim the recap</h3><p>Key takeaways, highlights and one line worth remembering.</p></li>
        <li data-reveal style="--i:2"><span class="step-num">3</span><h3>Play the rounds</h3><p>Order steps, match terms, sort cards or take a quiz. Your best scores are saved in this browser.</p></li>
      </ol>
    </section>`;

  splitWords(app.querySelector('.hero-title'));
  scrollParallax(app.querySelector('.hero-photo img'), 0.18);
  setTimeout(() => app.querySelectorAll('.hero [data-count]').forEach(countUp), 1300);

  return { title: 'GuestTalk · Semester guest speaker series', tab: null, nav: 'home', theme: 'tint' };
}
