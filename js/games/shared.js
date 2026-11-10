import { prefersReducedMotion } from '../lib/dom.js';

/** Friendly end-of-game message based on score ratio. */
function verdict(ratio) {
  if (ratio === 1) return { emoji: '🏆', title: 'Perfect run!', text: 'You clearly paid attention in this one.' };
  if (ratio >= 0.75) return { emoji: '🎉', title: 'Great job!', text: 'Nearly there. One more go for a perfect score?' };
  if (ratio >= 0.5) return { emoji: '💪', title: 'Solid start', text: 'Skim the key takeaways above, then try again.' };
  return { emoji: '🌱', title: 'Keep going', text: 'Every round makes it stick. Re-read the recap and give it another shot.' };
}

/** Render the shared result screen inside a game stage. */
export function renderResult(root, { score, total, onRetry, extra = '' }) {
  const ratio = total ? score / total : 0;
  const v = verdict(ratio);
  const deg = Math.round(ratio * 360);
  root.innerHTML = `
    <div class="g-result" role="status">
      <div class="g-ring" style="--deg:${deg}deg"><div><strong>${score}</strong><span>/ ${total}</span></div></div>
      <div class="g-result-copy">
        <p class="g-result-emoji" aria-hidden="true">${v.emoji}</p>
        <h4>${v.title}</h4>
        <p>${v.text}</p>
        ${extra}
        <button type="button" class="btn btn-primary g-retry">Play again</button>
      </div>
    </div>`;
  root.querySelector('.g-retry').addEventListener('click', onRetry);
  if (ratio >= 0.75) confetti();
}

/** Tiny dependency-free confetti burst. */
export function confetti() {
  if (prefersReducedMotion()) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'confetti';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const W = (canvas.width = innerWidth * dpr);
  const H = (canvas.height = innerHeight * dpr);
  const colors = ['#7f9bb6', '#b9cddd', '#3f5a75', '#e6c9a8', '#a9c4b5', '#d9a6a0'];
  const parts = Array.from({ length: 140 }, () => ({
    x: W / 2 + (Math.random() - 0.5) * W * 0.3,
    y: H * 0.35,
    vx: (Math.random() - 0.5) * 16 * dpr,
    vy: (-Math.random() * 14 - 4) * dpr,
    s: (Math.random() * 6 + 4) * dpr,
    r: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
    c: colors[(Math.random() * colors.length) | 0],
  }));
  const start = performance.now();
  (function frame(t) {
    const elapsed = t - start;
    ctx.clearRect(0, 0, W, H);
    for (const p of parts) {
      p.vy += 0.35 * dpr; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.globalAlpha = Math.max(0, 1 - elapsed / 1800);
      ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      ctx.restore();
    }
    if (elapsed < 1800) requestAnimationFrame(frame); else canvas.remove();
  })(start);
}

/** Progress header used by step-based games. */
export const progressBar = (current, total, label, scoreText = '') => `
  <div class="g-progress"><span>${label}</span><span>${scoreText}</span></div>
  <div class="g-bar" aria-hidden="true"><span style="width:${(current / total) * 100}%"></span></div>`;
