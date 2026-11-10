/**
 * SEQUENCE — tap the steps into the right order.
 * Config: { items: ['first step', 'second step', ...] }   ← list them in the CORRECT order.
 * Score = steps in the right place on the first check. After that, correct steps
 * lock in place and the player fixes the rest until the chain is complete.
 */
import { esc, shuffleDifferent } from '../lib/dom.js';
import { renderResult } from './shared.js';

export function mount(root, game, { onFinish }) {
  const n = game.items.length;
  let pool;        // items not yet placed
  let slots;       // array(n) of item | null
  let locked;      // Set of slot indexes confirmed correct
  let firstScore;  // score from the first check
  let checks;
  let marks;       // array(n) of booleans after a failed check, else null

  function reset() {
    pool = shuffleDifferent(game.items.map((text, idx) => ({ text, idx })), (a, b) => a.idx === b.idx);
    slots = Array(n).fill(null);
    locked = new Set();
    firstScore = null;
    checks = 0;
    marks = null;
    render();
  }

  const nextGap = () => slots.findIndex((s) => !s);

  function render(message = '') {
    const gap = nextGap();
    const full = gap === -1;
    const unlockedPlaced = slots.some((s, k) => s && !locked.has(k));

    const list = slots.map((it, k) => {
      if (!it) {
        return `<li class="seq-slot is-empty"><span class="seq-num">${k + 1}</span><span class="seq-hint">${k === gap ? 'Tap the next step below' : ''}</span></li>`;
      }
      const isLocked = locked.has(k);
      const state = isLocked ? 'is-correct' : marks ? (marks[k] ? 'is-correct' : 'is-wrong') : '';
      const disabled = isLocked || marks ? 'disabled' : '';
      return `<li class="seq-slot ${state}">
        <button type="button" class="seq-placed" data-pos="${k}" ${disabled} aria-label="Step ${k + 1}: ${esc(it.text)}${disabled ? '' : '. Tap to remove'}">
          <span class="seq-num">${k + 1}</span><span class="seq-text">${esc(it.text)}</span>
          <span class="seq-icon" aria-hidden="true">${isLocked ? '✓' : marks ? (marks[k] ? '✓' : '✕') : '×'}</span>
        </button></li>`;
    }).join('');

    const chips = pool.length
      ? pool.map((it, k) => `<button type="button" class="seq-chip" data-k="${k}" ${marks ? 'disabled' : ''}>${esc(it.text)}</button>`).join('')
      : `<p class="seq-done-hint">${marks ? '' : 'All steps placed. Check your order!'}</p>`;

    const actions = marks
      ? `<button type="button" class="btn btn-primary" data-act="fix">Fix the red ones</button>
         <button type="button" class="btn btn-ghost" data-act="reveal">Show answer</button>`
      : `<button type="button" class="btn btn-primary" data-act="check" ${full ? '' : 'disabled'}>Check order</button>
         <button type="button" class="btn btn-ghost" data-act="clear" ${unlockedPlaced ? '' : 'disabled'}>Clear</button>`;

    root.innerHTML = `
      <div class="g-progress"><span>${slots.filter(Boolean).length} of ${n} placed</span><span>${checks ? `Check #${checks}` : 'Tap to place'}</span></div>
      <ol class="seq-list">${list}</ol>
      <div class="seq-pool" aria-label="Steps to place">${chips}</div>
      <div class="g-feedback" aria-live="polite">${message}</div>
      <div class="g-actions">${actions}</div>`;

    root.querySelectorAll('.seq-chip').forEach((b) => b.addEventListener('click', () => {
      slots[nextGap()] = pool.splice(Number(b.dataset.k), 1)[0];
      render();
    }));
    root.querySelectorAll('.seq-placed').forEach((b) => b.addEventListener('click', () => {
      const pos = Number(b.dataset.pos);
      pool.push(slots[pos]);
      slots[pos] = null;
      render();
    }));
    root.querySelectorAll('[data-act]').forEach((b) => b.addEventListener('click', () => actions_[b.dataset.act]()));
  }

  const actions_ = {
    check() {
      checks++;
      marks = slots.map((it, k) => it.idx === k);
      const right = marks.filter(Boolean).length;
      if (firstScore === null) firstScore = right;
      if (right === n) return finish();
      render(`<p class="g-note no"><strong>${right} of ${n}</strong> in the right spot. Lock in the green ones and fix the rest.</p>`);
    },
    fix() {
      slots.forEach((it, k) => {
        if (marks[k]) locked.add(k);
        else { pool.push(it); slots[k] = null; }
      });
      marks = null;
      render();
    },
    clear() {
      slots.forEach((it, k) => { if (it && !locked.has(k)) { pool.push(it); slots[k] = null; } });
      render();
    },
    reveal() {
      const answer = game.items.map((t) => `<li>${esc(t)}</li>`).join('');
      finish(`<ol class="seq-answer">${answer}</ol>`);
    },
  };

  function finish(extra = '') {
    const score = firstScore ?? 0;
    renderResult(root, {
      score,
      total: n,
      onRetry: reset,
      extra: extra || '<p class="g-small">Your score counts the steps that were right on your first check.</p>',
    });
    onFinish(score, n);
  }

  reset();
}
