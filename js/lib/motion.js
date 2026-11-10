/**
 * Motion helpers: scroll reveals, word-by-word headline reveal,
 * number count-ups and a gentle pointer parallax.
 * Everything is skipped when the visitor prefers reduced motion.
 */
import { prefersReducedMotion } from './dom.js';

const reduced = () => prefersReducedMotion();
let observer;

/** Fade/slide in every [data-reveal] element as it enters the viewport. */
export function revealOnScroll(root = document) {
  const els = [...root.querySelectorAll('[data-reveal]:not(.is-in)')];
  if (reduced() || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  observer?.disconnect();
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
      const counter = entry.target.matches('[data-count]') ? entry.target : null;
      counter && countUp(counter);
      entry.target.querySelectorAll('[data-count]').forEach(countUp);
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
  els.forEach((el) => observer.observe(el));
}

/** Wrap each word of an element in masked spans so it can rise into view. */
export function splitWords(el) {
  if (!el) return;
  let i = 0;
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const outer = document.createElement('span');
          outer.className = 'w';
          const inner = document.createElement('span');
          inner.style.setProperty('--i', i++);
          inner.textContent = part;
          outer.appendChild(inner);
          frag.appendChild(outer);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'BR') {
        walk(child);
      }
    });
  };
  walk(el);
  el.classList.add('is-split');
}

/** Animate the first number inside an element from 0 to its value. */
export function countUp(el) {
  if (el.dataset.counted) return;
  el.dataset.counted = '1';
  const original = el.textContent;
  const m = original.match(/(\d+(?:\.\d+)?)/);
  if (!m || reduced()) return;
  const target = parseFloat(m[1]);
  const decimals = (m[1].split('.')[1] || '').length;
  const start = performance.now();
  const dur = 1100;
  const tick = (t) => {
    const p = Math.min(1, (t - start) / dur);
    const eased = 1 - Math.pow(1 - p, 4);
    el.textContent = original.replace(m[1], (target * eased).toFixed(decimals));
    if (p < 1) requestAnimationFrame(tick); else el.textContent = original;
  };
  requestAnimationFrame(tick);
}

/** Subtle pointer parallax: children with [data-depth] drift with the cursor. */
export function parallax(container) {
  if (!container || reduced() || !window.matchMedia('(pointer: fine)').matches) return;
  const layers = [...container.querySelectorAll('[data-depth]')];
  let raf = 0;
  container.addEventListener('pointermove', (e) => {
    const r = container.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => layers.forEach((l) => {
      const d = Number(l.dataset.depth);
      l.style.setProperty('--px', `${(-x * d).toFixed(1)}px`);
      l.style.setProperty('--py', `${(-y * d).toFixed(1)}px`);
    }));
  });
  container.addEventListener('pointerleave', () => layers.forEach((l) => {
    l.style.setProperty('--px', '0px');
    l.style.setProperty('--py', '0px');
  }));
}
