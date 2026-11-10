/**
 * SORT — deal one card at a time; send it to the right bucket.
 * Config: { buckets: [{ id, label, emoji }], items: [{ text, bucket, explain }] }
 */
import { esc, shuffle } from '../lib/dom.js';
import { renderResult, progressBar } from './shared.js';

export function mount(root, game, { onFinish }) {
  let deck, i, score;

  function reset() {
    deck = shuffle(game.items);
    i = 0;
    score = 0;
    render();
  }

  function render() {
    const card = deck[i];
    root.innerHTML = `
      ${progressBar(i, deck.length, `Card ${i + 1} of ${deck.length}`, `Score ${score}`)}
      <div class="sort-card" tabindex="-1">
        <span class="sort-card-label">Who does this?</span>
        <p>${esc(card.text)}</p>
      </div>
      <div class="sort-buckets" role="group" aria-label="Choose a team">
        ${game.buckets.map((b) => `
          <button type="button" class="sort-bucket" data-id="${esc(b.id)}">
            <span class="sort-emoji" aria-hidden="true">${b.emoji || '•'}</span>${esc(b.label)}
          </button>`).join('')}
      </div>
      <div class="g-feedback" aria-live="polite"></div>`;
    root.querySelectorAll('.sort-bucket').forEach((b) => b.addEventListener('click', () => choose(b.dataset.id)));
  }

  function choose(id) {
    const card = deck[i];
    const ok = id === card.bucket;
    if (ok) score++;
    root.querySelectorAll('.sort-bucket').forEach((b) => {
      b.disabled = true;
      if (b.dataset.id === card.bucket) b.classList.add('is-correct');
      else if (b.dataset.id === id) b.classList.add('is-wrong');
    });
    root.querySelector('.sort-card').classList.add(ok ? 'is-correct' : 'is-wrong');
    const last = i === deck.length - 1;
    const right = game.buckets.find((b) => b.id === card.bucket);
    const fb = root.querySelector('.g-feedback');
    fb.innerHTML = `
      <p class="g-note ${ok ? 'ok' : 'no'}"><strong>${ok ? 'Correct!' : `It’s ${esc(right.label)}.`}</strong> ${esc(card.explain || '')}</p>
      <button type="button" class="btn btn-primary g-next">${last ? 'See my score' : 'Next card →'}</button>`;
    const next = fb.querySelector('.g-next');
    next.addEventListener('click', () => { i++; last ? finish() : render(); });
    next.focus({ preventScroll: true });
  }

  function finish() {
    renderResult(root, { score, total: deck.length, onRetry: reset });
    onFinish(score, deck.length);
  }

  reset();
}
