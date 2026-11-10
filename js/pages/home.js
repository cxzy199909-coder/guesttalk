import { esc } from '../lib/dom.js';
import { sessions, upcoming, course } from '../data/sessions.js';
import { sessionRow } from '../components/sessionRow.js';

export function renderHome(app) {
  const gameCount = sessions.reduce((n, s) => n + s.games.length, 0);
  const [first] = sessions;

  app.innerHTML = `
    <section class="hero container">
      <div class="hero-card">
        <div class="hero-copy">
          <p class="hero-eyebrow"><span class="dot" aria-hidden="true"></span>${esc(course.name)} · ${esc(course.term)}</p>
          <h1 class="hero-title">Every guest talk,<br><em>turned into a game.</em></h1>
          <p class="hero-lead">Recaps, key takeaways and a quick interactive game for each guest speaker session this semester, so what you heard in class actually sticks.</p>
          <div class="hero-cta">
            <a class="btn btn-primary btn-lg" href="#/session/${esc(first.id)}">Start with #1 ${esc(first.tabLabel)} →</a>
            <a class="btn btn-soft btn-lg" href="#/sessions">See all sessions</a>
          </div>
          <dl class="hero-stats">
            <div><dt>Guest sessions</dt><dd>${sessions.length}</dd></div>
            <div><dt>Mini-games</dt><dd>${gameCount}</dd></div>
            <div><dt>Logins needed</dt><dd>0</dd></div>
          </dl>
        </div>
        <div class="hero-visual" aria-hidden="true">
          ${sessions.slice(0, 3).map((s, i) => `
            <div class="float-card fc-${i + 1}">
              <span class="fc-num">#${i + 1}</span>
              <span class="fc-title">${esc(s.title)}</span>
              <span class="fc-meta">${esc(s.speaker.name)} · ${esc(s.date)}</span>
            </div>`).join('')}
          <div class="float-chip"><span>🏆</span> 8 / 8 · Perfect run!</div>
        </div>
      </div>
    </section>

    <section class="container section">
      <div class="section-head">
        <div>
          <p class="eyebrow">This semester</p>
          <h2>The guest-speaker line-up</h2>
        </div>
        <a class="link-arrow" href="#/sessions">All sessions →</a>
      </div>
      <ul class="session-list">${sessions.map(sessionRow).join('')}</ul>
      ${upcoming.length ? `<p class="list-note">+ ${upcoming.length} more guests announced in the syllabus. <a href="#/sessions">See what’s coming</a>.</p>` : ''}
    </section>

    <section class="container section">
      <div class="section-head"><div><p class="eyebrow">How it works</p><h2>Three minutes per session</h2></div></div>
      <ol class="steps">
        <li><span class="step-num">1</span><h3>Pick a tab</h3><p>Each guest session has its own tab at the top of the page.</p></li>
        <li><span class="step-num">2</span><h3>Skim the recap</h3><p>Key takeaways, highlights and one line worth remembering.</p></li>
        <li><span class="step-num">3</span><h3>Play the rounds</h3><p>Order steps, match terms, sort cards or take a quiz. Your best scores are saved in this browser.</p></li>
      </ol>
    </section>`;

  return { title: 'GuestTalk · Guest speaker series', tab: null, nav: 'home', theme: 'tint' };
}
