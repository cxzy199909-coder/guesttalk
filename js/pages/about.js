import { esc } from '../lib/dom.js';
import { course, sessions } from '../data/sessions.js';

export function renderAbout(app) {
  app.innerHTML = `
    <section class="container page-head" data-reveal>
      <p class="eyebrow">About</p>
      <h1>About the speaker programme</h1>
      <p class="lead">${esc(course.name)} is part of the ${esc(course.programme)} curriculum at ${esc(course.school)}. It pairs lectures with sessions led by the people who use these platforms every day.</p>
    </section>

    <section class="container about-grid">
      <div class="about-card about-wide" data-reveal style="--i:0">
        <h2>Why guest speakers?</h2>
        <p>The course gives hands-on experience with the platforms marketers rely on: ad buying, audience targeting, influencer selection, content trends, analytics, and AI for content production and project management.</p>
        <p>Platform representatives, media agencies and partners join the class to demo features built for marketers and share real campaign case studies. Platforms change fast, so hearing from practitioners is how the course stays current.</p>
      </div>

      <div class="about-card" data-reveal style="--i:1">
        <h2>The course</h2>
        <dl class="facts">
          <div><dt>Course</dt><dd>${esc(course.name)}</dd></div>
          <div><dt>School</dt><dd>${esc(course.school)}</dd></div>
          <div><dt>Term</dt><dd>${esc(course.term)}</dd></div>
          <div><dt>Lecturer</dt><dd>${esc(course.lecturer)}</dd></div>
        </dl>
      </div>

      <div class="about-card" data-reveal style="--i:2">
        <h2>Who comes to class</h2>
        <p>Industry representatives from platforms such as Meta, TikTok, Pinterest and Google, plus digital and media agencies. So far this term:</p>
        <ul class="plain-list">
          ${sessions.map((s, i) => `<li><a href="#/session/${esc(s.id)}">#${i + 1} ${esc(s.speaker.name)}</a> · ${esc(s.title)}</li>`).join('')}
        </ul>
      </div>

      <div class="about-card about-wide about-tint" data-reveal style="--i:3">
        <h2>Why this website exists</h2>
        <p>At the end of the vibe-coding session, LaunchLab set the class a challenge: <em>“Create a website that will contain a tab from each guest speaker session this semester. Each tab can be an interactive game to consolidate what you learned in that session.”</em></p>
        <p>This site is that answer. Every game runs in your browser, there’s no sign-up, and your best scores are remembered on this device only.</p>
      </div>
    </section>`;

  return { title: 'About · GuestTalk', tab: null, nav: 'about', theme: 'tint' };
}
