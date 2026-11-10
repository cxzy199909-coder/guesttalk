/**
 * App entry: a tiny hash router.
 * Hash URLs (#/session/<id>) work on any static host, Vercel included,
 * with no server rewrites needed.
 */
import { renderHome } from './pages/home.js';
import { renderSessions } from './pages/sessions.js';
import { renderSession } from './pages/session.js';
import { renderAbout } from './pages/about.js';
import { renderNotFound } from './pages/notFound.js';
import { renderTabs, setNavActive } from './components/tabs.js';

const routes = [
  { pattern: /^\/?$/, render: renderHome },
  { pattern: /^\/sessions\/?$/, render: renderSessions },
  { pattern: /^\/session\/([\w-]+)\/?$/, render: (app, m) => renderSession(app, { id: m[1] }) },
  { pattern: /^\/about\/?$/, render: renderAbout },
];

const app = document.getElementById('app');
const tabbar = document.getElementById('tabbar');

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
}

window.addEventListener('hashchange', route);
route();

document.getElementById('year').textContent = new Date().getFullYear();
