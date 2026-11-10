/**
 * QUIZ — multiple choice, one question at a time, with explanations.
 * Config: { questions: [{ q, options: [..], answer: <index>, explain }] }
 */
import { esc, shuffle } from '../lib/dom.js';
import { renderResult, progressBar } from './shared.js';

export function mount(root, game, { onFinish }) {
  const qs = game.questions;
  let i = 0;
  let score = 0;

  function renderQuestion() {
    const q = qs[i];
    const order = shuffle(q.options.map((_, idx) => idx));
    root.innerHTML = `
      ${progressBar(i, qs.length, `Question ${i + 1} of ${qs.length}`, `Score ${score}`)}
      <h4 class="g-question">${esc(q.q)}</h4>
      <div class="g-options">
        ${order.map((idx, n) => `
          <button type="button" class="g-option" data-idx="${idx}">
            <span class="g-key" aria-hidden="true">${'ABCD'[n] || n + 1}</span>${esc(q.options[idx])}
          </button>`).join('')}
      </div>
      <div class="g-feedback" aria-live="polite"></div>`;
    root.querySelectorAll('.g-option').forEach((btn) =>
      btn.addEventListener('click', () => choose(Number(btn.dataset.idx))));
  }

  function choose(idx) {
    const q = qs[i];
    const correct = idx === q.answer;
    if (correct) score++;
    root.querySelectorAll('.g-option').forEach((b) => {
      b.disabled = true;
      const k = Number(b.dataset.idx);
      if (k === q.answer) b.classList.add('is-correct');
      else if (k === idx) b.classList.add('is-wrong');
    });
    const last = i === qs.length - 1;
    const fb = root.querySelector('.g-feedback');
    fb.innerHTML = `
      <p class="g-note ${correct ? 'ok' : 'no'}"><strong>${correct ? 'Nice!' : 'Not quite.'}</strong> ${esc(q.explain || '')}</p>
      <button type="button" class="btn btn-primary g-next">${last ? 'See my score' : 'Next question →'}</button>`;
    const next = fb.querySelector('.g-next');
    next.addEventListener('click', () => { i++; last ? finish() : renderQuestion(); });
    next.focus({ preventScroll: true });
  }

  function finish() {
    renderResult(root, { score, total: qs.length, onRetry: restart });
    onFinish(score, qs.length);
  }

  function restart() { i = 0; score = 0; renderQuestion(); }

  renderQuestion();
}
