/* ============================================
   THE MARGIN — BLOG SCRIPT
   ============================================ */

'use strict';

/* ---- DATA ---- */
const POSTS = [
  {
    id: 0,
    title: "The Quiet Revolution of Slow Thinking",
    titleItalic: "Slow Thinking",
    category: "Philosophy",
    date: "April 8, 2025",
    dateShort: "Apr 8",
    readTime: "8 min read",
    excerpt: "In a world optimized for speed, there's a growing counterculture of people choosing to think slower, read deeper, and resist the compulsion to react instantly. What can we learn from them?",
    tags: ["mindfulness", "philosophy", "attention"],
    featured: true,
    wide: false,
    body: `
      <p class="drop-cap">There is a particular kind of dread that arrives with the morning. Before you have risen, before coffee, before the window light has made its case—you are already late. The phone pings. The inbox accumulates. Somewhere a deadline writhes.</p>
      <p>This is the texture of modern cognition: reactive, rapid, perpetually behind. We have optimized our tools so thoroughly for speed that we have forgotten to ask whether speed was the point.</p>
      <h2>The Counterculture of Depth</h2>
      <p>Against this, a quiet resistance has formed. Not a Luddite rejection of technology, but a deliberate <em>friction</em>—a chosen slowness that cuts against the current. You see it in the resurgence of long-form newsletters, in the small explosion of reading circles, in the students who are putting their phones away during lectures not because they're told to, but because they want to think.</p>
      <blockquote>"The ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable in our economy." — Cal Newport</blockquote>
      <p>The irony is that slow thinking isn't actually slower. The literature on expertise suggests something counterintuitive: that the experts who make the best decisions under pressure are the ones who have put in the most hours of unhurried, recursive, difficult thought in the years before that pressure arrived.</p>
      <h2>What Deliberation Actually Looks Like</h2>
      <p>Slow thinking is not the absence of urgency. It is not laziness dressed in philosophical clothing. It is something stranger and more demanding: the willingness to sit with a question before moving to an answer, to tolerate ambiguity, to change your mind when the evidence changes.</p>
      <p>It looks like the scientist who runs the same experiment six times not because she doubts herself, but because she doubts the seductiveness of confirmation. It looks like the engineer who writes the function four different ways before choosing the most readable one. It looks like the essayist who throws away three drafts before a single word of the final version is written.</p>
      <h2>A Practice, Not a Product</h2>
      <p>The mistake is to treat slow thinking as a destination rather than a practice. You cannot decide to become a slow thinker this weekend and emerge on Monday transformed. The ability accretes through small, daily rebellions against the reflex to react.</p>
      <p>Put the phone down when you walk between rooms. Finish the thought before you open the tab. Write the paragraph before you fact-check it. Let the discomfort of not-yet-knowing linger a little longer than usual.</p>
      <p>None of this is glamorous. It rarely produces a shareable moment. But over months and years, it produces something more durable: a mind that is genuinely your own.</p>
    `
  },
  {
    id: 1,
    title: "On Living Inside Your Own Head",
    titleItalic: null,
    category: "Personal",
    date: "March 27, 2025",
    dateShort: "Mar 27",
    readTime: "5 min read",
    excerpt: "Some people are more comfortable in the world than others. I am most comfortable somewhere slightly to the left of it, observing.",
    tags: ["introversion", "self", "writing"],
    featured: false,
    wide: true,
    body: `
      <p class="drop-cap">For most of my life I assumed this was a problem to be fixed. I was constitutionally ill-suited to parties, to networking, to the casual brightness that seemed to come so naturally to the people around me.</p>
      <p>What I've come to understand, in the way you understand things only after much unnecessary suffering, is that the inside of your head is a place, just like any other. And some people simply live there.</p>
      <h2>The Architecture of Inner Life</h2>
      <p>The psychologists call it introversion, but the word doesn't quite capture it. It's less about being shy or antisocial and more about where you find the feeling of <em>home</em>. For me, home is thought. It's the moment just before sleep when the day's events crystallize into something almost intelligible. It's a long walk with a problem.</p>
      <blockquote>"I live in my head and it's not always a nice neighborhood." — Somewhere on the internet, probably</blockquote>
      <p>Writing is, I think, what happens when you try to give the inner life an address. A place where other people can visit, briefly, and find something recognizable in the furniture.</p>
      <h2>The Gift and the Cost</h2>
      <p>There are real advantages to this orientation. An interior life is a renewable resource. I am rarely bored. I find the world perpetually interesting in a way that seems, based on available evidence, not to be universally shared.</p>
      <p>The cost is also real. Presence—genuine, full-bodied presence with other people—is effortful for me in a way I suspect it isn't for everyone. I have to remember to look up from the commentary running in my head and actually inhabit the room.</p>
      <p>I'm working on it. I think.</p>
    `
  },
  {
    id: 2,
    title: "What the Web Looked Like When We Loved It",
    titleItalic: null,
    category: "Technology",
    date: "March 14, 2025",
    dateShort: "Mar 14",
    readTime: "10 min read",
    excerpt: "A meditation on the early internet, when websites were handmade and the world felt genuinely new. And whether we can get any of that back.",
    tags: ["internet", "nostalgia", "design"],
    featured: false,
    wide: false,
    body: `
      <p class="drop-cap">There was a version of the web that felt like finding a secret room. You arrived at a webpage and it was just: someone's thoughts, someone's HTML, someone's enthusiasm for a topic that had no category yet. Geocities. Angelfire. The handmade web.</p>
      <p>It looked terrible, mostly. Comic Sans, tiled backgrounds, hit counters that announced how many people had stumbled through. But it felt like <em>people</em>. Not content. Not engagement. Just people.</p>
      <h2>The Standardization Problem</h2>
      <p>The modern web is more sophisticated in every measurable way and more homogeneous in every way that matters. The same typefaces, the same grid systems, the same UX patterns that have been A/B tested to frictionless perfection. You always know where the navigation is. You always know what a button looks like. You are never surprised.</p>
      <blockquote>"The web we have today is not the web we chose. It's the web we let happen."</blockquote>
      <p>The platforms absorbed everything. The blogs migrated to Medium, then Substack. The photos migrated to Instagram. The conversations migrated to Twitter, then fragmented into a dozen anxiety-inducing alternatives. In each migration, something was lost—some quality of ownership, of personal weirdness, of genuine idiosyncrasy.</p>
      <h2>Is There a Way Back?</h2>
      <p>Not exactly back, no. But sideways, maybe. The indie web movement—people building their own sites, owning their own data, writing into the void without the dopamine machinery of algorithmic feeds—is small but real. This blog is part of it, in its modest way.</p>
      <p>The bet is that authenticity still matters. That people still want to feel that they're reading a person and not a content vertical. I believe this. I have to.</p>
    `
  },
  {
    id: 3,
    title: "The Science of Why We Can't Stop Scrolling",
    titleItalic: null,
    category: "Science",
    date: "February 28, 2025",
    dateShort: "Feb 28",
    readTime: "7 min read",
    excerpt: "Variable reward schedules, dopamine, and the neuroscience of infinite feeds—an exploration of why our brains are so poorly equipped for the modern internet.",
    tags: ["neuroscience", "attention", "technology"],
    featured: false,
    wide: false,
    body: `
      <p class="drop-cap">The slot machine metaphor is exhausted by repetition but remains exactly correct. What makes slot machines irresistible is not the reward itself but the unpredictability of the reward. Psychologists call this a <em>variable ratio reinforcement schedule</em>, and it produces behavior that is remarkably difficult to extinguish.</p>
      <p>Your phone is a slot machine you carry in your pocket. Every pull of the feed is a lever pull. Sometimes there's something good. Often there isn't. But often enough that you keep pulling.</p>
      <h2>Dopamine's Real Role</h2>
      <p>We have a folk theory of dopamine: it's the pleasure chemical, the reward molecule. This is close but slightly wrong. The more accurate picture, developed by neuroscientist Wolfram Schultz and others, is that dopamine is primarily a <em>prediction error</em> signal. It fires not when something good happens, but when something good happens and you didn't expect it.</p>
      <blockquote>"Dopamine makes you want things, not like them. It drives seeking, not satisfaction."</blockquote>
      <p>This is the trap. The system was not designed for our current information environment. It evolved in a world where unexpected rewards—food, safety, connection—were rare and worth tracking. Now we have manufactured infinite unexpected rewards, and the tracking system is running continuously, and we are exhausted.</p>
      <h2>The Attention Economy Is Winning</h2>
      <p>The companies that build these systems understand this better than we do. They have entire teams of behavioral psychologists working to increase time-on-app. The notifications are timed. The feeds are tuned. The metrics are clicks and dwell time, which means the product is your attention and you are the thing being sold.</p>
      <p>The only way to win is not to play. Which is easy to say and very hard to do, because the dopamine system doesn't respond to arguments.</p>
    `
  },
  {
    id: 4,
    title: "Six Books That Changed How I Think",
    titleItalic: null,
    category: "Culture",
    date: "February 10, 2025",
    dateShort: "Feb 10",
    readTime: "6 min read",
    excerpt: "Not the best books I've read, or the most important. Just the ones that left me unable to think the same way afterward.",
    tags: ["books", "reading", "recommendations"],
    featured: false,
    wide: false,
    body: `
      <p class="drop-cap">There's a difference between a book you enjoy and a book that reorganizes something inside you. I've read hundreds of the former. Only a handful of the latter. These are six of those few.</p>
      <h2>Thinking, Fast and Slow — Kahneman</h2>
      <p>The one that started it all for me. I was twenty-three and I thought I was a rational agent making reasoned decisions. I was wrong. Kahneman's account of System 1 and System 2 thinking was the first time I genuinely understood that my mind was not the transparent instrument I thought it was.</p>
      <h2>The Death of Ivan Ilyich — Tolstoy</h2>
      <p>Ninety pages. The most concentrated account of a life of conformity and its final reckoning I have ever encountered. I finished it on a train and sat very still for a long time afterward.</p>
      <blockquote>"What if my whole life has been wrong?" Ivan Ilyich asks, in the last hours of his life. It is not a comfortable question.</blockquote>
      <h2>The Uninhabitable Earth — Wallace-Wells</h2>
      <p>I resisted this book for years because I didn't want to be frightened. That resistance was itself information. This is the clearest-eyed account of climate futures I've read, and reading it made me feel both more frightened and, strangely, more clear.</p>
      <h2>Middlemarch — Eliot</h2>
      <p>I read Middlemarch three times before I understood it was not a Victorian novel about provincial life but a precise account of how human beings fool themselves, love imperfectly, and occasionally transcend their circumstances.</p>
      <h2>Surely You're Joking, Mr. Feynman — Feynman</h2>
      <p>The book that taught me that curiosity is a discipline. Feynman's relentless, joyful insistence on understanding things from first principles is the intellectual model I've spent the years since trying to emulate.</p>
      <h2>The Plague — Camus</h2>
      <p>Read in 2020, in circumstances that did not require imagination. The line I've thought about most often: <em>"The habit of despair is worse than despair itself."</em></p>
    `
  },
  {
    id: 5,
    title: "Notes on Attention, January 2025",
    titleItalic: null,
    category: "Personal",
    date: "January 31, 2025",
    dateShort: "Jan 31",
    readTime: "4 min read",
    excerpt: "A loose collection of observations on what I'm paying attention to, and what I'm failing to pay attention to, at the start of a new year.",
    tags: ["attention", "notes", "journal"],
    featured: false,
    wide: false,
    body: `
      <p>These are notes, not arguments. A clearinghouse for the things accumulating in my margins.</p>
      <h2>On Reading</h2>
      <p>I read sixty-one books last year, which sounds like a lot until I remember that I spent approximately eleven times that many hours on my phone. The ratio is wrong and I haven't fixed it.</p>
      <h2>On Mornings</h2>
      <p>I've been waking up thirty minutes earlier and using the time before screens for thinking and writing. The quality of thought in those minutes is different. Quieter. Less reactive. I don't know if it's the hour itself or the absence of input, but I'm keeping it.</p>
      <blockquote>"Morning is an attitude." — someone wiser than me, probably</blockquote>
      <h2>On What I Keep Returning To</h2>
      <p>Long walks. Conversations with people who disagree with me charitably. Books I've already read once. The particular light in cities just before dusk. The feeling, rare but real, of understanding something that had previously been opaque.</p>
      <h2>A Question I'm Sitting With</h2>
      <p>If you removed everything you do out of habit or obligation, what would you actually choose to spend your time on? I've been asking myself this seriously for the first time in years, and the answer is both clarifying and destabilizing.</p>
      <p>More on this when I've worked it out.</p>
    `
  }
];

const TOPICS = [
  { name: 'Philosophy', count: 14 },
  { name: 'Technology', count: 22 },
  { name: 'Culture', count: 18 },
  { name: 'Science', count: 11 },
  { name: 'Personal', count: 19 },
  { name: 'Books', count: 9 },
  { name: 'Attention', count: 7 },
  { name: 'Writing', count: 5 },
];

/* ============================================
   STATE & INIT
   ============================================ */
let currentView = 'home';
let theme = localStorage.getItem('blog-theme') || 'light';

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(theme);
  renderPosts();
  renderArchive();
  renderTopics();
  bindNav();
  bindTheme();
  bindSearch();
  bindHamburger();
  bindNewsletter();
  bindBackTop();
  bindProgressBar();
  bindScrollFade();
  bindFooterLinks();
});

/* ============================================
   THEME
   ============================================ */
function applyTheme(t) {
  theme = t;
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('blog-theme', t);
}
function bindTheme() {
  document.getElementById('themeToggle').addEventListener('click', () => {
    applyTheme(theme === 'light' ? 'dark' : 'light');
  });
}

/* ============================================
   NAVIGATION / VIEWS
   ============================================ */
function switchView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById(`view-${name}`);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.view === name);
  });

  currentView = name;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (name === 'post') {
    bindTOC();
  } else {
    document.getElementById('toc').style.display = 'none';
    document.getElementById('progressBar').style.width = '0';
  }
}

function bindNav() {
  document.querySelectorAll('[data-view]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      switchView(el.dataset.view);
    });
  });
  document.getElementById('logoHome').addEventListener('click', e => {
    e.preventDefault();
    switchView('home');
  });
}

function bindFooterLinks() {
  document.querySelectorAll('.footer-links a').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      switchView(el.dataset.view);
    });
  });
}

/* ============================================
   RENDER POSTS (Home Grid)
   ============================================ */
function renderPosts() {
  const grid = document.getElementById('postsGrid');
  const visiblePosts = POSTS.slice(1); // skip featured (shown in hero)
  grid.innerHTML = '';

  visiblePosts.forEach((post, i) => {
    const card = document.createElement('div');
    card.className = `post-card fade-in${post.wide ? ' wide' : ''}`;
    card.style.transitionDelay = `${i * 0.07}s`;
    card.dataset.postId = post.id;

    if (post.wide) {
      card.innerHTML = `
        <div>
          <div class="card-category">${post.category}</div>
          <h3 class="card-title">${post.title}</h3>
          <p class="card-excerpt">${post.excerpt}</p>
          <div class="card-meta">
            <span>${post.date}</span>
            <span>·</span>
            <span>${post.readTime}</span>
          </div>
        </div>
        <div>
          <span class="card-arrow">↗</span>
        </div>
      `;
    } else {
      card.innerHTML = `
        <div class="card-category">${post.category}</div>
        <h3 class="card-title">${post.title}</h3>
        <p class="card-excerpt">${post.excerpt}</p>
        <div class="card-meta">
          <span>${post.date}</span>
          <span>·</span>
          <span>${post.readTime}</span>
        </div>
        <span class="card-arrow">↗</span>
      `;
    }

    card.addEventListener('click', () => openPost(post.id));
    grid.appendChild(card);
  });

  // Hero "Read Essay" button
  const heroBtn = document.querySelector('.read-btn');
  if (heroBtn) heroBtn.addEventListener('click', e => { e.preventDefault(); openPost(0); });
}

/* ============================================
   RENDER ARCHIVE
   ============================================ */
function renderArchive(filterCat = 'all') {
  const list = document.getElementById('archiveList');
  list.innerHTML = '';

  POSTS.forEach(post => {
    const item = document.createElement('div');
    item.className = `archive-item fade-in${filterCat !== 'all' && post.category !== filterCat ? ' hidden' : ''}`;
    item.dataset.category = post.category;
    item.dataset.postId = post.id;

    item.innerHTML = `
      <div class="ai-date">${post.dateShort}<br>2025</div>
      <div class="ai-content">
        <div class="ai-cat">${post.category}</div>
        <h3 class="ai-title">${post.title}</h3>
        <p class="ai-excerpt">${post.excerpt}</p>
      </div>
      <div class="ai-read">${post.readTime}</div>
    `;
    item.addEventListener('click', () => openPost(post.id));
    list.appendChild(item);
  });

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      document.querySelectorAll('.archive-item').forEach(item => {
        if (cat === 'all' || item.dataset.category === cat) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

/* ============================================
   RENDER TOPICS
   ============================================ */
function renderTopics() {
  const grid = document.getElementById('topicsGrid');
  TOPICS.forEach(t => {
    const chip = document.createElement('button');
    chip.className = 'topic-chip';
    chip.innerHTML = `${t.name}<span class="count">(${t.count})</span>`;
    chip.addEventListener('click', () => {
      document.querySelectorAll('.topic-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      switchView('archive');
      // Trigger filter
      setTimeout(() => {
        document.querySelectorAll('.filter-btn').forEach(b => {
          if (b.dataset.filter === t.name) b.click();
        });
      }, 100);
    });
    grid.appendChild(chip);
  });
}

/* ============================================
   OPEN SINGLE POST
   ============================================ */
function openPost(id) {
  const post = POSTS.find(p => p.id === id);
  if (!post) return;

  const header = document.getElementById('postHeader');
  const body = document.getElementById('postBody');
  const footer = document.getElementById('postFooter');

  header.innerHTML = `
    <div class="post-cat">${post.category}</div>
    <h1 class="post-title">${post.titleItalic ? post.title.replace(post.titleItalic, `<em>${post.titleItalic}</em>`) : post.title}</h1>
    <p class="post-subtitle">${post.excerpt}</p>
    <div class="post-meta">
      <img src="https://i.pravatar.cc/40?img=12" class="author-avatar" alt="Maya Chen"/>
      <span>Maya Chen</span>
      <span>·</span>
      <span>${post.date}</span>
      <span>·</span>
      <span>${post.readTime}</span>
    </div>
  `;

  body.innerHTML = post.body;

  footer.innerHTML = `
    <div class="post-tags">
      ${post.tags.map(t => `<span class="post-tag">${t}</span>`).join('')}
    </div>
    <div class="share-row">
      <span class="share-label">Share:</span>
      <button class="share-btn" onclick="copyLink()">Copy Link</button>
      <button class="share-btn">Twitter</button>
      <button class="share-btn">LinkedIn</button>
    </div>
    <button class="back-btn" id="postBackBtn">← Back to writing</button>
  `;

  document.getElementById('postBackBtn').addEventListener('click', () => switchView('home'));

  switchView('post');
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert('Link copied!');
  });
}

/* ============================================
   TABLE OF CONTENTS
   ============================================ */
function bindTOC() {
  const toc = document.getElementById('toc');
  const body = document.getElementById('postBody');
  const headings = body.querySelectorAll('h2, h3');

  if (headings.length < 2) { toc.style.display = 'none'; return; }

  toc.style.display = 'block';
  toc.innerHTML = `<div class="toc-title">Contents</div>`;

  headings.forEach((h, i) => {
    const anchor = `toc-heading-${i}`;
    h.id = anchor;
    const link = document.createElement('a');
    link.className = `toc-link${h.tagName === 'H3' ? ' toc-sub' : ''}`;
    link.href = `#${anchor}`;
    link.textContent = h.textContent;
    link.addEventListener('click', e => {
      e.preventDefault();
      h.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    toc.appendChild(link);
  });

  // Highlight active on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const link = toc.querySelector(`a[href="#${entry.target.id}"]`);
      if (link) link.classList.toggle('active', entry.isIntersecting);
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  headings.forEach(h => observer.observe(h));
}

/* ============================================
   SEARCH
   ============================================ */
function bindSearch() {
  const overlay = document.getElementById('searchOverlay');
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');

  document.getElementById('searchToggle').addEventListener('click', () => {
    overlay.classList.add('open');
    setTimeout(() => input.focus(), 100);
  });

  document.getElementById('searchClose').addEventListener('click', () => {
    overlay.classList.remove('open');
    input.value = '';
    results.innerHTML = '';
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      overlay.classList.remove('open');
      input.value = '';
      results.innerHTML = '';
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      overlay.classList.remove('open');
      input.value = '';
      results.innerHTML = '';
    }
    // CMD/CTRL + K to open search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      overlay.classList.add('open');
      setTimeout(() => input.focus(), 100);
    }
  });

  input.addEventListener('input', debounce(() => {
    const q = input.value.trim().toLowerCase();
    results.innerHTML = '';
    if (q.length < 2) return;

    const matches = POSTS.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(t => t.includes(q))
    );

    if (matches.length === 0) {
      results.innerHTML = `<p style="color:var(--muted);font-family:var(--mono);font-size:0.8rem;padding:1rem 0">No results for "${q}"</p>`;
      return;
    }

    matches.forEach(post => {
      const item = document.createElement('div');
      item.className = 'search-result-item';
      item.innerHTML = `
        <div class="sri-title">${post.title}</div>
        <div class="sri-meta">${post.category} · ${post.date} · ${post.readTime}</div>
      `;
      item.addEventListener('click', () => {
        overlay.classList.remove('open');
        input.value = '';
        results.innerHTML = '';
        openPost(post.id);
      });
      results.appendChild(item);
    });
  }, 200));
}

/* ============================================
   HAMBURGER
   ============================================ */
function bindHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');

  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
    const spans = btn.querySelectorAll('span');
    if (menu.classList.contains('open')) {
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      const spans = btn.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

/* ============================================
   NEWSLETTER
   ============================================ */
function bindNewsletter() {
  const form = document.getElementById('newsletterForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('nlEmail').value;
    if (!email) return;
    form.innerHTML = `<p class="nl-success">✓ You're in! First letter arrives Sunday.</p>`;
  });
}

/* ============================================
   BACK TO TOP
   ============================================ */
function bindBackTop() {
  const btn = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ============================================
   SCROLL PROGRESS BAR
   ============================================ */
function bindProgressBar() {
  const bar = document.getElementById('progressBar');
  const header = document.getElementById('siteHeader');

  window.addEventListener('scroll', () => {
    // Header shadow
    header.classList.toggle('scrolled', window.scrollY > 10);

    // Progress bar (only on post view)
    if (currentView === 'post') {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = docHeight > 0 ? `${(scrollTop / docHeight) * 100}%` : '0%';
    } else {
      bar.style.width = '0%';
    }
  });
}

/* ============================================
   SCROLL FADE ANIMATIONS
   ============================================ */
function bindScrollFade() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  // Initial observe
  observeFadeIns(observer);

  // Re-observe after view switches (MutationObserver)
  const mo = new MutationObserver(() => observeFadeIns(observer));
  mo.observe(document.getElementById('mainContent'), { childList: true, subtree: true, attributes: true });
}

function observeFadeIns(observer) {
  document.querySelectorAll('.fade-in:not(.observed)').forEach(el => {
    el.classList.add('observed');
    observer.observe(el);
  });
}

/* ============================================
   UTILITY
   ============================================ */
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
