/** Small DOM helpers shared by pages, components and games. */

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escape text before inserting it into an HTML template string. */
export const esc = (value = '') => String(value).replace(/[&<>"']/g, (c) => ESC[c]);

/** Fisher–Yates shuffle that returns a new array. */
export function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Shuffle, guaranteeing the result is not in the original order. */
export function shuffleDifferent(list, same = (a, b) => a === b) {
  if (list.length < 2) return [...list];
  let out;
  do { out = shuffle(list); } while (out.every((x, i) => same(x, list[i])));
  return out;
}

/** Build initials from a name: "Nick Goh" → "NG". */
export const initials = (name = '') =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');

export const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
