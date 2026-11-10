/**
 * GAME REGISTRY — maps a game `type` (used in js/data/sessions.js) to its engine.
 *
 * Every engine exports `mount(rootElement, gameConfig, { onFinish(score, total) })`.
 * To add a brand-new game type:
 *   1. Create js/games/<type>.js exporting `mount`.
 *   2. Import it here and add it to `engines`.
 *   3. Use `type: '<type>'` in any session's `games` list.
 */
import * as quiz from './quiz.js';
import * as sequence from './sequence.js';
import * as match from './match.js';
import * as sort from './sort.js';

export const engines = { quiz, sequence, match, sort };

export const typeLabels = {
  quiz: 'Quiz',
  sequence: 'Put in order',
  match: 'Match up',
  sort: 'Sort it',
};

export function mountGame(root, game, api) {
  const engine = engines[game.type];
  if (!engine) {
    root.innerHTML = `<p class="g-note no">Unknown game type “${game.type}”. Add it to js/games/registry.js.</p>`;
    return;
  }
  engine.mount(root, game, api);
}
