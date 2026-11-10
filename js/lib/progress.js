/**
 * Best scores, kept only in this browser (localStorage).
 * No login, no database. If storage is blocked, the site still works
 * and simply doesn't remember scores.
 */
const KEY = 'guesttalk.progress.v1';

function read() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
}
function write(data) {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* storage unavailable */ }
}

export function getBest(sessionId, gameId) {
  return read()[sessionId]?.[gameId] ?? null;
}

export function saveResult(sessionId, gameId, score, total) {
  const data = read();
  data[sessionId] = data[sessionId] || {};
  const prev = data[sessionId][gameId];
  if (!prev || score / total > prev.score / prev.total) {
    data[sessionId][gameId] = { score, total };
    write(data);
  }
  return data[sessionId][gameId];
}

export function sessionProgress(session) {
  const played = read()[session.id] || {};
  const done = session.games.filter((g) => played[g.id]).length;
  return { done, total: session.games.length };
}
