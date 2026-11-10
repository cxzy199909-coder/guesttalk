export function renderNotFound(app) {
  app.innerHTML = `
    <section class="container page-head not-found">
      <p class="eyebrow">404</p>
      <h1>This tab doesn’t exist (yet).</h1>
      <p class="lead">Maybe it’s a guest who hasn’t spoken yet.</p>
      <p><a class="btn btn-primary" href="#/">Back to home</a></p>
    </section>`;
  return { title: 'Not found · GuestTalk', tab: null, nav: null, theme: 'tint' };
}
