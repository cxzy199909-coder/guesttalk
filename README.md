# GuestTalk: guest-speaker series site

A responsive website for the guest-speaker sessions of **Digital Platforms Test Drive** (ESSEC Business School Asia-Pacific, MMD, October 2026 term).
Each guest session has its own tab with a recap, key takeaways, highlights, a quote and a set of interactive learning games.

- No build step, no backend, no login. Plain HTML, CSS and JavaScript modules.
- Games run fully in the browser. Best scores are saved only in the visitor's browser (`localStorage`).
- Deploys as a static site on Vercel. Every push to `main` updates the live site.

## Folder structure

```
guesttalk/
├── index.html                 # Shell: header, Home/About pills, tab bar, <main id="app">, footer
├── css/
│   └── styles.css             # All styles (design tokens at the top)
└── js/
    ├── main.js                # Hash router (#/, #/sessions, #/session/<id>, #/about)
    ├── data/
    │   └── sessions.js        # ← ALL CONTENT LIVES HERE (sessions, games, upcoming guests)
    ├── components/
    │   ├── tabs.js            # Main tab bar (built from sessions data)
    │   ├── sessionRow.js      # Single-column list row with hover bio
    │   └── speakerCard.js     # Pale-blue speaker "business card"
    ├── pages/
    │   ├── home.js            # Hero + line-up + how it works
    │   ├── sessions.js        # All sessions list + upcoming guests
    │   ├── session.js         # Reusable speaker detail template + game rounds
    │   ├── about.js
    │   └── notFound.js
    ├── games/
    │   ├── registry.js        # type → engine map
    │   ├── quiz.js            # Multiple choice with explanations
    │   ├── sequence.js        # Put steps in the right order
    │   ├── match.js           # Match terms to definitions
    │   ├── sort.js            # Deal cards into buckets
    │   └── shared.js          # Result screen, progress bar, confetti
    └── lib/
        ├── dom.js             # escape, shuffle, initials
        ├── motion.js          # scroll reveals, headline word reveal, count-ups, parallax
        └── progress.js        # Best scores in localStorage
```

## Change the hero photo

The photo behind the home-page headline is set in `js/data/sessions.js` → `course.heroImage`.
To use your own, add it to an `images/` folder (e.g. `images/lecture.jpg`) and set `src: 'images/lecture.jpg'` and a new `credit`.

## Add a new guest speaker

Open `js/data/sessions.js`, copy one session object and edit it:

```js
{
  id: 'm-c-saatchi-performance',   // used in the URL
  tabLabel: 'M+C Saatchi',         // text on the tab
  date: '20 Nov 2026',
  courseSession: 'Session 7',
  title: '…', subtitle: '…',
  speaker: { name, role, shortBio, bio, tags: [] },   // add `members: []` for a team
  recap: ['paragraph', 'paragraph'],
  takeaways: [{ title, text }],
  highlights: [{ value, label }],
  quote: { text, by },
  games: [
    { id: 'round-1', type: 'quiz', title, blurb, questions: [{ q, options, answer, explain }] },
    { id: 'round-2', type: 'sequence', title, blurb, items: ['step 1', 'step 2'] },
    { id: 'round-3', type: 'match', title, blurb, pairs: [{ term, def }] },
    { id: 'round-4', type: 'sort', title, blurb, buckets: [{ id, label, emoji }], items: [{ text, bucket, explain }] },
  ],
}
```

The tab bar, home page, session list and game rounds update automatically. Remove the guest from `upcoming` once their session has happened.

## Add a new game type

1. Create `js/games/<type>.js` exporting `mount(root, config, { onFinish(score, total) })`.
2. Register it in `js/games/registry.js`.
3. Use `type: '<type>'` in any session.

## Run locally

ES modules need a local server (opening the file directly won't work):

```bash
npx serve .        # or: python3 -m http.server 8000
```

## Deploy

1. Push this folder to a GitHub repository.
2. On vercel.com: **Add New → Project → Import Git Repository** → pick the repo.
3. Framework preset: **Other**. No build command, no output directory. Click **Deploy**.

## Key design decisions

- **Data-driven content.** Every session lives in one data file, so adding a guest is a copy-paste job, not a refactor.
- **Pluggable game engines.** Four reusable engines (quiz, sequence, match, sort) cover most "check your understanding" formats. Each session mixes them as rounds.
- **Hash routing.** `#/session/<id>` URLs work on any static host without server rewrites, so the site deploys to Vercel with zero config.
- **Calm Morandi palette.** Soft pale blue for the hero and speaker cards, a lighter blue for list rows that turn light grey on hover, and pure white session pages for readability.
- **Touch-friendly games.** Everything is tap-based (no drag and drop), with 44px+ targets. On touch screens the speaker bio in each row is shown by default because there is no hover.
- **No accounts.** Scores stay on the visitor's device, so the site needs no database or privacy notice.
- **Motion with restraint.** Word-by-word headline reveal, drifting hero light, gliding tab indicator, scroll reveals and count-ups. All of it switches off for visitors who prefer reduced motion.
- **Accessible by default.** Semantic headings, visible focus rings, `aria-live` feedback in games and reduced-motion support.
