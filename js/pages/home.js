import { esc } from '../lib/dom.js';
import { sessions, upcoming } from '../data/sessions.js';
import { sessionRow } from '../components/sessionRow.js';
import { splitWords, parallax, countUp } from '../lib/motion.js';

export function renderHome(app) {
  const gameCount = sessions.reduce((n, s) => n + s.games.length, 0);
  const latest = sessions[sessions.length - 1];
  const next = upcoming[0];

  app.innerHTML = `
    <section class="hero container">
      <div class="hero-card">
        <div class="hero-aurora" aria-hidden="true"><span></span><span></span><span></span></div>
        <div class="hero-grid" aria-hidden="true"></div>

        <div class="hero-copy">
          <p class="hero-eyebrow hero-in" style="--d:0"><span class="dot" aria-hidden="true"></span>This semester</p>
          <h1 class="hero-title">Learn from people who’ve <em>been there.</em></h1>
          <p class="hero-lead hero-in" style="--d:6">Guest sessions throughout the semester, one place to catch up on what they shared.</p>
          <div class="hero-cta hero-in" style="--d:7">
            <a class="btn btn-primary btn-lg" href="#/session/${esc(latest.id)}">Explore the latest session <span class="btn-arrow" aria-hidden="true">→</span></a>
            <a class="btn btn-soft btn-lg" href="#/sessions">All sessions</a>
          </div>
          <dl class="hero-stats hero-in" style="--d:8">
            <div><dt>Guest sessions</dt><dd data-count>${sessions.length}</dd></div>
            <div><dt>Mini-games</dt><dd data-count>${gameCount}</dd></div>
            <div><dt>Logins needed</dt><dd>0</dd></div>
          </dl>
        </div>

        <div class="hero-visual" aria-hidden="true">
          ${sessions.slice(-2).map((s, i) => `
            <div class="float-card fc-${i + 1}" data-depth="${14 + i * 10}">
              <div class="fc-inner">
                <span class="fc-num">#${sessions.indexOf(s) + 1}</span>
                <span class="fc-title">${esc(s.title)}</span>
                <span class="fc-meta">${esc(s.speaker.name)} · ${esc(s.date)}</span>
              </div>
            </div>`).join('')}
          ${next ? `
            <div class="float-card fc-3 is-ghost" data-depth="34">
              <div class="fc-inner">
                <span class="fc-num">Next up</span>
                <span class="fc-title">${esc(next.name)}</span>
                <span class="fc-meta">Coming soon</span>
              </div>
            </div>` : ''}
          <div class="float-chip" data-depth="44"><div class="fc-inner"><span>🏆</span> 8 / 8 · Perfect run!</div></div>
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

  const title = app.querySelector('.hero-title');
  splitWords(title);
  parallax(app.querySelector('.hero-card'));
  setTimeout(() => app.querySelectorAll('.hero [data-count]').forEach(countUp), 650);

  return { title: 'GuestTalk · Semester guest speaker series', tab: null, nav: 'home', theme: 'tint' };
}
