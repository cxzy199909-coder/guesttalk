/**
 * App entry: a tiny hash router plus page-level motion.
 * Hash URLs (#/session/<id>) work on any static host, Vercel included,
 * with no server rewrites needed.
 */
import { renderHome } from './pages/home.js';
import { renderSessions } from './pages/sessions.js';
import { renderSession } from './pages/session.js';
import { renderAbout } from './pages/about.js';
import { renderNotFound } from './pages/notFound.js';
import { renderTabs, setNavActive } from './components/tabs.js';
import { revealOnScroll } from './lib/motion.js';

const routes = [
  { pattern: /^\/?$/, render: renderHome },
  { pattern: /^\/sessions\/?$/, render: renderSessions },
  { pattern: /^\/session\/([\w-]+)\/?$/, render: (app, m) => renderSession(app, { id: m[1] }) },
  { pattern: /^\/about\/?$/, render: renderAbout },
];

const app = document.getElementById('app');
const tabbar = document.getElementById('tabbar');
const header = document.querySelector('.site-header');
const progress = document.querySelector('.scroll-progress span');

function route() {
  const path = decodeURIComponent(location.hash.replace(/^#/, '')) || '/';
  let meta;
  for (const r of routes) {
    const m = path.match(r.pattern);
    if (m) { meta = r.render(app, m); break; }
  }
  if (!meta) meta = renderNotFound(app);

  document.title = meta.title;
  document.body.dataset.theme = meta.theme;
  renderTabs(tabbar, meta.tab);
  setNavActive(meta.nav);
  window.scrollTo(0, 0);
  app.focus({ preventScroll: true });

  // Page entrance: restart the animation on every route change.
  app.classList.remove('page-enter');
  void app.offsetWidth;
  app.classList.add('page-enter');
  revealOnScroll(app);
  onScroll();
}

function onScroll() {
  const y = window.scrollY;
  header.classList.toggle('is-scrolled', y > 8);
  const max = document.documentElement.scrollHeight - innerHeight;
  if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
}

window.addEventListener('hashchange', route);
window.addEventListener('scroll', onScroll, { passive: true });
route();

document.getElementById('year').textContent = new Date().getFullYear();
