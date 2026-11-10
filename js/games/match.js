/**
 * MATCH — pair each term with its definition.
 * Config: { pairs: [{ term, def }] }
 * Tap a term, then its definition (or the other way round).
 * Score = pairs minus wrong guesses (never below zero).
 */
import { esc, shuffleDifferent } from '../lib/dom.js';
import { renderResult } from './shared.js';

export function mount(root, game, { onFinish }) {
  const n = game.pairs.length;
  let defs, matched, mistakes, picked;

  function reset() {
    defs = shuffleDifferent(game.pairs.map((p, idx) => ({ text: p.def, idx })), (a, b) => a.idx === b.idx);
    matched = new Map(); // pair idx -> colour slot
    mistakes = 0;
    picked = null;       // { side: 'term'|'def', idx }
    render();
  }

  function render(message = '') {
    root.innerHTML = `
      <div class="g-progress"><span>${matched.size} of ${n} matched</span><span>${mistakes} miss${mistakes === 1 ? '' : 'es'}</span></div>
      <div class="g-bar" aria-hidden="true"><span style="width:${(matched.size / n) * 100}%"></span></div>
      <div class="match-grid">
        <div class="match-terms" role="group" aria-label="Terms">
          ${game.pairs.map((p, idx) => btn('term', idx, p.term)).join('')}
        </div>
        <div class="match-defs" role="group" aria-label="Definitions">
          ${defs.map((d) => btn('def', d.idx, d.text)).join('')}
        </div>
      </div>
      <div class="g-feedback" aria-live="polite">${message || '<p class="g-small">Tap a term, then the definition that fits it.</p>'}</div>`;

    root.querySelectorAll('.match-item').forEach((b) =>
      b.addEventListener('click', () => pick(b.dataset.side, Number(b.dataset.idx))));
  }

  function btn(side, idx, text) {
    const done = matched.has(idx);
    const sel = picked && picked.side === side && picked.idx === idx;
    return `<button type="button" class="match-item match-${side} ${done ? `is-matched c${matched.get(idx)}` : ''} ${sel ? 'is-picked' : ''}"
      data-side="${side}" data-idx="${idx}" ${done ? 'disabled' : ''} aria-pressed="${sel}">${esc(text)}</button>`;
  }

  function pick(side, idx) {
    if (!picked || picked.side === side) {
      picked = picked && picked.side === side && picked.idx === idx ? null : { side, idx };
      return render();
    }
    // One from each side: check it.
    const ok = picked.idx === idx;
    const other = picked;
    picked = null;
    if (ok) {
      matched.set(idx, matched.size % 6);
      if (matched.size === n) return finish();
      return render(`<p class="g-note ok"><strong>Match!</strong> ${esc(game.pairs[idx].term)}: locked in.</p>`);
    }
    mistakes++;
    render('<p class="g-note no"><strong>Not a pair.</strong> Read the definition again and try another.</p>');
    // Brief shake on the two wrong cards.
    [[other.side, other.idx], [side, idx]].forEach(([s, i]) =>
      root.querySelector(`.match-item[data-side="${s}"][data-idx="${i}"]`)?.classList.add('is-wrong'));
  }

  function finish() {
    const score = Math.max(0, n - mistakes);
    renderResult(root, {
      score,
      total: n,
      onRetry: reset,
      extra: `<p class="g-small">${mistakes ? `${mistakes} wrong guess${mistakes === 1 ? '' : 'es'} along the way.` : 'Zero wrong guesses!'}</p>`,
    });
    onFinish(score, n);
  }

  reset();
}
