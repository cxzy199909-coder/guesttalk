import { sessions, upcoming } from '../data/sessions.js';
import { sessionRow, upcomingRow } from '../components/sessionRow.js';

export function renderSessions(app) {
  app.innerHTML = `
    <section class="container page-head">
      <p class="eyebrow">All sessions</p>
      <h1>Guest speakers this semester</h1>
      <p class="lead">Hover a row for a quick intro to the speaker. Click it for the recap and the games.</p>
    </section>

    <section class="container section section-tight">
      <ul class="session-list">${sessions.map(sessionRow).join('')}</ul>
    </section>

    ${upcoming.length ? `
    <section class="container section">
      <div class="section-head"><div><p class="eyebrow">Up next</p><h2>Announced in the syllabus</h2></div></div>
      <ul class="session-list">${upcoming.map(upcomingRow).join('')}</ul>
    </section>` : ''}`;

  return { title: 'All sessions · GuestTalk', tab: 'sessions', nav: null, theme: 'tint' };
}
