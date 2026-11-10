/**
 * Speaker detail page (reusable template for every guest session).
 * Sections: speaker card → recap → key takeaways → highlights → quote → games.
 */
import { esc } from '../lib/dom.js';
import { sessions, getSession } from '../data/sessions.js';
import { speakerCard } from '../components/speakerCard.js';
import { mountGame, typeLabels } from '../games/registry.js';
import { getBest, saveResult } from '../lib/progress.js';
import { renderNotFound } from './notFound.js';

export function renderSession(app, { id }) {
  const session = getSession(id);
  if (!session) return renderNotFound(app);
  const index = sessions.indexOf(session);
  const prev = sessions[index - 1];
  const next = sessions[index + 1];

  app.innerHTML = `
    <article class="container session-page">
      <header class="session-head" data-reveal>
        <a class="back-link" href="#/sessions">← All sessions</a>
        <h1>${esc(session.title)}</h1>
        <p class="lead">${esc(session.subtitle)}</p>
      </header>

      ${speakerCard(session, index)}

      <section class="block">
        <h2 class="block-title" data-reveal><span class="block-kicker">01</span>Session recap</h2>
        <div class="recap">${session.recap.map((p, i) => `<p data-reveal style="--i:${i}">${esc(p)}</p>`).join('')}</div>
      </section>

      <section class="block">
        <h2 class="block-title" data-reveal><span class="block-kicker">02</span>Key takeaways</h2>
        <ol class="takeaways">
          ${session.takeaways.map((t, i) => `
            <li data-reveal style="--i:${i % 2}"><span class="tk-num">${String(i + 1).padStart(2, '0')}</span><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p></li>`).join('')}
        </ol>
      </section>

      <section class="block">
        <h2 class="block-title" data-reveal><span class="block-kicker">03</span>Highlights</h2>
        <ul class="highlights">
          ${session.highlights.map((h, i) => `<li data-reveal style="--i:${i}"><strong data-count>${esc(h.value)}</strong><span>${esc(h.label)}</span></li>`).join('')}
        </ul>
      </section>

      <figure class="quote" data-reveal>
        <blockquote>${esc(session.quote.text)}</blockquote>
        <figcaption>${esc(session.quote.by)}</figcaption>
      </figure>

      <section class="block game-block" id="play" aria-labelledby="play-title">
        <div class="game-head" data-reveal>
          <div>
            <p class="eyebrow">Learning game</p>
            <h2 id="play-title">Test what you learned</h2>
          </div>
          <div class="round-tabs" role="tablist" aria-label="Game rounds"></div>
        </div>
        <div class="game-card" data-reveal>
          <div class="game-intro"></div>
          <div class="game-stage"></div>
        </div>
      </section>

      <nav class="pager" aria-label="Other sessions" data-reveal>
        ${prev ? `<a class="pager-link" href="#/session/${esc(prev.id)}"><span>← Previous</span><strong>#${index} ${esc(prev.tabLabel)}</strong></a>` : '<span></span>'}
        ${next ? `<a class="pager-link is-next" href="#/session/${esc(next.id)}"><span>Next →</span><strong>#${index + 2} ${esc(next.tabLabel)}</strong></a>` : `<a class="pager-link is-next" href="#/sessions"><span>Done here →</span><strong>All sessions</strong></a>`}
      </nav>
    </article>`;

  setupGames(app, session);

  return { title: `#${index + 1} ${session.tabLabel} · GuestTalk`, tab: session.id, nav: null, theme: 'white' };
}

function setupGames(app, session) {
  const tabs = app.querySelector('.round-tabs');
  const intro = app.querySelector('.game-intro');
  const stage = app.querySelector('.game-stage');
  let current = 0;

  function bestText(game) {
    const b = getBest(session.id, game.id);
    return b ? `Best ${b.score}/${b.total}` : 'Not played';
  }

  function drawTabs() {
    tabs.innerHTML = session.games.map((g, i) => `
      <button type="button" role="tab" class="round-tab ${i === current ? 'is-active' : ''}" aria-selected="${i === current}" data-i="${i}">
        <span class="round-num">Round ${i + 1}</span>
        <span class="round-name">${esc(g.title)}</span>
        <span class="round-best ${getBest(session.id, g.id) ? 'is-played' : ''}">${bestText(g)}</span>
      </button>`).join('');
    tabs.querySelectorAll('.round-tab').forEach((b) => b.addEventListener('click', () => {
      current = Number(b.dataset.i);
      play();
    }));
  }

  function play() {
    const game = session.games[current];
    drawTabs();
    intro.innerHTML = `
      <span class="type-pill">${esc(typeLabels[game.type] || game.type)}</span>
      <h3>${esc(game.title)}</h3>
      <p>${esc(game.blurb)}</p>`;
    mountGame(stage, game, {
      onFinish(score, total) {
        saveResult(session.id, game.id, score, total);
        drawTabs();
        const nextGame = session.games[current + 1];
        if (nextGame) {
          const cta = document.createElement('button');
          cta.type = 'button';
          cta.className = 'btn btn-soft g-next-round';
          cta.textContent = `Next round: ${nextGame.title} →`;
          cta.addEventListener('click', () => { current++; play(); });
          stage.querySelector('.g-result-copy')?.appendChild(cta);
        }
      },
    });
  }

  play();
}
