/**
 * ─────────────────────────────────────────────────────────────
 *  GUEST SESSIONS — the single source of truth for the site.
 * ─────────────────────────────────────────────────────────────
 *  To add a new guest speaker:
 *    1. Copy one object in `sessions` below and edit the fields.
 *    2. Give it a unique `id` (used in the URL: #/session/<id>).
 *    3. Add one or more games. `type` must be one of the engines in
 *       js/games/registry.js: "quiz" | "sequence" | "match" | "sort".
 *  The tab bar, the session list, the home page and the game
 *  rounds all update automatically — no other file needs editing.
 */

export const course = {
  name: 'Digital Platforms Test Drive',
  school: 'ESSEC Business School Asia-Pacific',
  programme: 'MMD',
  term: 'October 2026 term',
  lecturer: 'Madina Kalyayeva',
  /** Photo behind the home-page headline. Swap `src` for 'images/your-photo.jpg' to use your own. */
  heroImage: {
    src: 'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&w=2000&q=70',
    credit: 'Photo: Mikael Kristenson / Unsplash',
    creditUrl: 'https://unsplash.com/photos/high-angle-photography-of-group-of-people-sitting-at-chairs-3aVlWP-7bg8',
  },
};

export const sessions = [
  /* ───────────────────────── #1 LaunchLab ───────────────────────── */
  {
    id: 'launchlab-vibe-coding',
    tabLabel: 'LaunchLab',
    date: 'Fri 9 Oct 2026',
    courseSession: 'Session 2',
    title: 'Vibe Coding: From Prompt to Live Website',
    subtitle: 'Claude Design, Claude Code, GitHub and Vercel',
    speaker: {
      name: 'LaunchLab',
      members: ['Yibo Yang', 'Nirvan Anand', 'Rishabh Modi'],
      role: 'Student builders · ISS LaunchLab',
      shortBio:
        'A student team who build real apps with AI. They walked the class through designing, building and shipping a website in a single session, with no coding background needed.',
      bio:
        'LaunchLab is a team of student builders (Yibo Yang, Nirvan Anand and Rishabh Modi) who showed the class how to go from a plain-English prompt to a live, shareable website using Claude Design, Claude Code, GitHub and Vercel. They closed with the challenge this site answers: build a tab for every guest session, each with a game that helps the lesson stick.',
      tags: ['Claude Design', 'Claude Code', 'GitHub', 'Vercel', 'Supabase'],
    },
    recap: [
      'A three-part crash course in shipping something real. Part 1 covered the build loop: design the front end first in Claude Design, use “Handoff to Claude Code” to turn it into working files, then launch.',
      'Part 2 explained where code lives (GitHub) and how it becomes a website (Vercel). Part 3 looked at what a basic site still can’t do, like remembering users or showing live data, and introduced Supabase for logins and databases.',
    ],
    takeaways: [
      { title: 'Prompt like a brief, not a wish', text: '“Create a website for my course” gets a generic result. Give a role, goal, audience, design style, the pages you need, key features and the outputs you expect.' },
      { title: 'Design first, then build', text: 'Claude Design builds the visual shell without code. The “Handoff to Claude Code…” option in the Share menu sends it to Claude Code, which turns it into real files.' },
      { title: 'GitHub stores, Vercel serves', text: 'GitHub keeps every file and every version. Vercel reads the repo, builds the site and hosts it at a public link that updates every time you push.' },
      { title: 'Commit ≠ push', text: 'A commit saves a snapshot on your computer. A push sends it to GitHub. A pull request asks teammates to review before changes are merged.' },
      { title: 'Three files, three jobs', text: 'index.html holds the words and structure, styles.css holds the look, script.js holds the behaviour when someone clicks or types.' },
      { title: 'Static sites forget', text: 'On its own a site can’t remember users or fetch live data. A backend such as Supabase adds sign-up, log-in and a database.' },
    ],
    highlights: [
      { value: '3', label: 'steps in the workflow: Design → Build → Deploy' },
      { value: '0', label: 'manual uploads once GitHub is linked to Vercel' },
      { value: '1', label: 'preview link for every pull request' },
    ],
    quote: {
      text: 'GitHub stores your code. But nothing there is a website yet. Vercel turns that code into one.',
      by: 'LaunchLab',
    },
    games: [
      {
        id: 'ship-it',
        type: 'sequence',
        title: 'Ship It!',
        blurb: 'Put the vibe-coding workflow in order, from first idea to live link.',
        items: [
          'Write a detailed prompt: role, goal, audience, style, pages',
          'Design the front end in Claude Design',
          'Share → “Handoff to Claude Code…”',
          'Claude Code builds the real website files',
          'Commit: save a snapshot with a short message',
          'Push the commit up to your GitHub repo',
          'On Vercel: New Project → Import Git Repository',
          'Click Deploy and share your live link',
        ],
      },
      {
        id: 'git-lingo',
        type: 'match',
        title: 'Git Lingo',
        blurb: 'Match each GitHub term to what it actually does.',
        pairs: [
          { term: 'Fork', def: 'Make your own copy of someone else’s repo on your account, so you can change it without touching the original.' },
          { term: 'Clone', def: 'Copy a repo from GitHub down onto your computer so you can edit the files locally.' },
          { term: 'Commit', def: 'Save a snapshot of your changes with a short note. It stays on your computer, not on GitHub yet.' },
          { term: 'Push', def: 'Send the commits saved on your computer up to GitHub so the online copy is up to date.' },
          { term: 'Pull request', def: 'Propose your changes and ask teammates to review them before they join the main project.' },
          { term: 'Merge', def: 'Approve a pull request and combine its changes into the main version of the project.' },
        ],
      },
      {
        id: 'which-file',
        type: 'quiz',
        title: 'Which File?',
        blurb: 'Quick-fire questions on files, deploying and what a site can’t do alone.',
        questions: [
          { q: 'You want to change the words on your main button. Which file do you open?', options: ['index.html', 'styles.css', 'script.js', 'README.md'], answer: 0, explain: 'index.html holds the words and structure: every heading, button and paragraph.' },
          { q: 'Now you want that button to be orange. Which file?', options: ['index.html', 'styles.css', 'script.js', 'vercel.json'], answer: 1, explain: 'styles.css controls the look: colours, fonts, spacing and how it changes on a phone.' },
          { q: 'And to make it do something when clicked?', options: ['index.html', 'styles.css', 'script.js', 'package.json'], answer: 2, explain: 'script.js holds the behaviour: what happens when someone clicks, types or hits submit.' },
          { q: 'What’s the real difference between GitHub and Vercel?', options: ['GitHub stores the code; Vercel builds and hosts it at a public link', 'GitHub hosts the website; Vercel stores the code', 'They do the same thing', 'Vercel writes the code for you'], answer: 0, explain: 'GitHub stores every file and version. Vercel reads the repo, builds the site and hosts it.' },
          { q: 'Your repo is linked to Vercel and you push a new commit. What happens?', options: ['Nothing until you re-upload the files', 'Vercel rebuilds and updates the live site automatically', 'GitHub emails your teacher', 'The site goes offline'], answer: 1, explain: 'Once linked, every push triggers a fresh build. No manual uploading, ever.' },
          { q: 'Your Wordle clone forgets every player when they close the tab. What fixes that?', options: ['A bigger styles.css', 'A backend like Supabase for logins and a database', 'Pushing more often', 'Making the repo private'], answer: 1, explain: 'A static site only knows its own files. Supabase adds authentication and a database.' },
          { q: 'When you log in, the site hands your browser a token. What is it?', options: ['Your password, saved in plain text', 'A temporary “sticker” that says who you are on each request', 'A permanent copy of the database', 'A crypto coin'], answer: 1, explain: 'The token lets the site recognise you without re-asking for your password. It expires on its own; logging out throws it away.' },
          { q: 'Which prompt will get the better website?', options: ['“Create a website for my course.”', '“Make it nice.”', 'One that sets a role, goal, audience, design style, pages and outputs', '“Website. Modern. Fast.”'], answer: 2, explain: 'Detailed prompts work like a brief: the more context you give, the closer the first draft lands.' },
        ],
      },
    ],
  },

  /* ───────────────────────── #2 Nick Goh ───────────────────────── */
  {
    id: 'nick-goh-ai-marketing-team',
    tabLabel: 'Nick Goh',
    date: 'Fri 30 Oct 2026',
    courseSession: 'Session 4',
    title: 'Building an AI Marketing Team',
    subtitle: 'A lite agentic workflow with Claude',
    speaker: {
      name: 'Nick Goh',
      initials: 'NG',
      role: 'CMO, Yellow Pages Singapore · CEO, INSPIRO Consulting',
      shortBio:
        'Marketing strategist and AI practitioner leading Yellow Pages Singapore and YP Academy into an AI-driven training & MarTech ecosystem. Former agency leader at Lowe & Partners and Euro RSCG.',
      bio:
        'Nick Goh is CEO of INSPIRO Consulting, CMO of Yellow Pages Singapore and Marketing Lead at YP Academy. He has led agencies across Lowe & Partners, Euro RSCG (now Havas) and local shops, working with brands such as SAP, Red Hat, Prudential and UOB. He holds an MSc in Marketing (Distinction) from King’s College London, is a Fellow of the Chartered Institute of Marketing (UK), trains at SMU Academy and SUTD Academy, and has judged the Effie Awards Singapore and the Singapore Media Awards.',
      tags: ['Claude Projects', 'Skills', 'Scheduled tasks', 'Higgsfield', 'Agent workflows'],
    },
    recap: [
      'Nick opened with a hard truth: AI transformation is a people problem, not a tool problem. Then he showed what the alternative looks like, live.',
      'Inside one Claude Project he built a small “AI marketing team”: a planning team (Brief Writer, Brief Validator, Strategist) and a production team (Designer / Art Director, Copywriter, Reviewer), each powered by a reusable skill. A scheduled email trigger starts the Marketing Brief Builder, work moves down a handoff chain with a human approval in the middle, key visuals come from Higgsfield, and a Creative Score skill rates the output. The demo case was a fictional Louis Vuitton “Terra” handbag launch in Singapore, built for teaching.',
    ],
    takeaways: [
      { title: 'It’s a people problem', text: '96% of CMOs say they are transforming with AI, yet only about 8% run campaigns with connected agents. Culture, managers and talent practices explain 67% of the impact.' },
      { title: 'Split the work into agent jobs', text: 'Planning: Brief Writer → Brief Validator → Strategist. Production: Designer / Art Director → Copywriter → Reviewer. Each job is a reusable skill.' },
      { title: 'Fresh eyes, fresh chat', text: 'The Brief Validator critiques the draft in a new chat, so it isn’t biased by the conversation that wrote it.' },
      { title: 'Keep a human in the chain', text: 'After the Strategist shapes the Big Idea, you approve it and save it to the knowledge base before any production starts.' },
      { title: 'Automate the start', text: 'A scheduled email trigger runs the Marketing Brief Builder daily, so new briefs arrive without anyone pressing go.' },
      { title: 'Redesign, don’t bolt on', text: 'The 6-step roadmap: map the work, group it into agent jobs, redesign the workflow, start small, upskill & govern, then measure.' },
    ],
    highlights: [
      { value: '32%', label: 'of marketers get formal AI training at work' },
      { value: '86%', label: 'of Singapore workers use AI at work, but only 37% had AI training last year' },
      { value: '21%', label: 'of companies have redesigned any workflow' },
      { value: '75%', label: 'of CMOs are moving to small pods built around goals' },
    ],
    quote: {
      text: 'Building an AI marketing team is a people problem, not a tool problem.',
      by: 'Nick Goh, Yellow Pages Singapore',
    },
    games: [
      {
        id: 'whos-on-the-team',
        type: 'sort',
        title: 'Who’s on the Team?',
        blurb: 'Each card is a job from Nick’s workflow. Send it to the right team.',
        buckets: [
          { id: 'plan', label: 'Planning team', emoji: '🧭' },
          { id: 'prod', label: 'Production team', emoji: '🎨' },
          { id: 'you', label: 'You (the human)', emoji: '🙋' },
        ],
        items: [
          { text: 'Drafts the brief from the Project’s context', bucket: 'plan', explain: 'That’s the Brief Writer, first agent on the planning team.' },
          { text: 'Critiques the brief in a fresh chat and lists top fixes', bucket: 'plan', explain: 'That’s the Brief Validator. New chat, fresh eyes.' },
          { text: 'Digests the validated brief and develops the Big Idea', bucket: 'plan', explain: 'That’s the Strategist. Output: a Big Idea one-pager.' },
          { text: 'Approves the Big Idea and saves it to the knowledge base', bucket: 'you', explain: 'The human checkpoint sits in the middle of the chain.' },
          { text: 'Creates key visuals using connectors like Higgsfield', bucket: 'prod', explain: 'That’s the Designer / Art Director.' },
          { text: 'Builds the messaging hierarchy and adapts it per channel', bucket: 'prod', explain: 'That’s the Copywriter, with channel-by-channel copy.' },
          { text: 'Checks the work against brand voice and signs off', bucket: 'prod', explain: 'That’s the Reviewer, last agent in the chain.' },
          { text: 'Decides the objective, budget and final big idea', bucket: 'you', explain: 'AI drafts, humans decide.' },
        ],
      },
      {
        id: 'handoff-chain',
        type: 'sequence',
        title: 'The Handoff Chain',
        blurb: 'Rebuild the order in which work moves through the AI team.',
        items: [
          'Brief Writer drafts the brief',
          'Brief Validator checks it in a new chat',
          'Strategist digests the brief and shapes the Big Idea',
          'You approve it and save it to the knowledge base',
          'Designer + Copywriter create KVs and channel messaging',
          'Reviewer checks brand voice and signs off',
        ],
      },
      {
        id: 'people-over-tools',
        type: 'quiz',
        title: 'People > Tools',
        blurb: 'The numbers and ideas behind building an AI-ready team.',
        questions: [
          { q: '96% of CMOs say they are transforming end to end with AI. Roughly how many run campaigns with connected agents?', options: ['About 8%', 'About 42%', 'About 67%', 'Nearly all of them'], answer: 0, explain: 'Big claims, small change: 42% still use GenAI mainly as a task helper, and only ~8% use connected agents.' },
          { q: 'What explains most (67%) of the impact people get from AI?', options: ['Which tool they pick', 'Their individual prompting skill', 'Culture, managers and talent practices', 'The size of the AI budget'], answer: 2, explain: 'Individual skills account for only 32%. The environment people work in matters more.' },
          { q: 'Why does the Brief Validator work in a brand-new chat?', options: ['It’s cheaper', 'To get fresh eyes, unbiased by the chat that wrote the brief', 'Old chats get deleted', 'Agents can’t share chats'], answer: 1, explain: 'A fresh context means the validator judges the brief on its own merits.' },
          { q: 'What is step 1 of the 6-step roadmap?', options: ['Buy an AI platform', 'Hire an AI engineer', 'Map the work: every activity and the systems behind it', 'Measure the KPIs'], answer: 2, explain: 'Map the work → group into agent jobs → redesign → start small → upskill & govern → measure.' },
          { q: 'Which skill tops the list of what matters most in an AI marketing team?', options: ['Checking AI output', 'Typing speed', 'Video editing', 'Coding in Python'], answer: 0, explain: 'Checking AI output (50%) and critical thinking (46%) come first, ahead of AI literacy and data fluency.' },
          { q: 'In the demo, what started the Marketing Brief Builder automatically?', options: ['A Slack message from the boss', 'A scheduled email trigger', 'A TikTok trend', 'Nothing, it was all manual'], answer: 1, explain: 'A scheduled task picks up the brief email daily and runs the skill.' },
          { q: 'How should you treat AI agents, according to the “agent boss” idea?', options: ['Like a search engine', 'Like staff: identity, permissions and a review cycle', 'Like a free intern with no rules', 'Like a one-off experiment'], answer: 1, explain: 'Every marketer builds, delegates to and manages agents, so agents need clear roles and oversight.' },
        ],
      },
    ],
  },
];

/** Guests named in the syllabus whose sessions are still to come. */
export const upcoming = [
  { name: 'M+C Saatchi Performance', topic: 'Agency talk on campaign optimisation', when: 'Date TBC' },
  { name: 'Media Publishers', topic: 'Industry insights on publishing & platforms', when: 'Date TBC' },
  { name: 'CPXI · Mujo AI · Cape.io', topic: 'Expert talk on AI for content & campaigns', when: 'Date TBC' },
];

export const getSession = (id) => sessions.find((s) => s.id === id);
