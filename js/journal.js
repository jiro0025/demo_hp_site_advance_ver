/* ============================
   Journal Data & Filter — Data & Canvas
   ============================ */

// ============================================================
// 📝 記事を追加する場合はこの配列に1オブジェクト追記するだけOK
// ============================================================
const articles = [
  {
    id: 1,
    title: 'Python + yfinanceで株価ダッシュボードを作った',
    excerpt: 'Streamlitを使って株価の推移をインタラクティブに可視化するダッシュボードを構築した記録です。',
    date: '2026-02-20',
    tags: ['Development'],
    image: 'images/journal_stocks.png',
  },
  {
    id: 2,
    title: '近所のコーヒーショップで集中できる作業環境を見つけた',
    excerpt: '静かで電源が確保できる作業向きのカフェを探して、実際に訪れた感想をまとめています。',
    date: '2026-02-14',
    tags: ['Cafe'],
    image: 'images/journal_cafe.png',
  },
  {
    id: 3,
    title: '英語学習：シャドーイング30日チャレンジの振り返り',
    excerpt: '毎日15分のシャドーイングを30日間続けた結果と気づきについてまとめました。',
    date: '2026-02-05',
    tags: ['English'],
    image: 'images/journal_english.png',
  },
  {
    id: 4,
    title: 'マインドフルネス瞑想を習慣化して3ヶ月が経った',
    excerpt: '1日10分の瞑想を継続したことで、集中力やストレス管理にどう変化があったかを記録しています。',
    date: '2026-01-28',
    tags: ['Mindfulness'],
    image: 'images/journal_mindfulness.png',
  },
  {
    id: 5,
    title: 'Google Antigravityを使ったバイブコーディングの始め方',
    excerpt: 'AIアシスタントとの協調作業でWebサイトを効率よく構築するための実践的なアプローチをまとめました。',
    date: '2026-01-15',
    tags: ['Development'],
    image: 'images/journal_coding.png',
  },
  {
    id: 6,
    title: '投資入門：インデックスファンドへの積立を始めた理由',
    excerpt: '長期的な資産形成のためにインデックス積立投資を選んだ背景と、最初の一歩について書いています。',
    date: '2026-01-08',
    tags: ['Mindfulness'],
    image: 'images/journal_investment.png',
  },
];

// Tag colors (for placeholder thumbnails)
const TAG_COLORS = {
  Development : '#3B6B8C',
  English     : '#5A8B5A',
  Cafe        : '#8B5A2B',
  Mindfulness : '#7B5A8B',
};

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
}

function createPlaceholderSvg(tag) {
  const color = TAG_COLORS[tag] || '#888';
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225'%3E%3Crect width='400' height='225' fill='${encodeURIComponent(color)}'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='rgba(255,255,255,0.6)'%3E${tag}%3C/text%3E%3C/svg%3E`;
}

function renderArticles(list) {
  const grid = document.getElementById('article-grid');
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = '<p class="no-results">該当する記事が見つかりませんでした。</p>';
    return;
  }

  grid.innerHTML = list.map(article => {
    const primaryTag = article.tags[0] || 'Development';
    const imgSrc = article.image || createPlaceholderSvg(primaryTag);
    const tagsHtml = article.tags.map(t => `<span class="tag">#${t}</span>`).join('');
    return `
      <article class="article-card fade-in">
        <img class="article-card__image" src="${imgSrc}" alt="${article.title}" loading="lazy">
        <div class="article-card__body">
          <div class="article-card__tags">${tagsHtml}</div>
          <h2 class="article-card__title">${article.title}</h2>
          <p class="article-card__excerpt">${article.excerpt}</p>
          <div class="article-card__meta">
            <span class="article-card__date">${formatDate(article.date)}</span>
          </div>
        </div>
      </article>
    `.trim();
  }).join('');

  // Re-trigger fade-in observers
  if ('IntersectionObserver' in window) {
    const fadeEls = grid.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => observer.observe(el));
  }
}

function initJournal() {
  const filterBar = document.getElementById('tag-filter');
  if (!filterBar) return;

  let activeTag = 'ALL';

  function filter(tag) {
    activeTag = tag;
    const filtered = tag === 'ALL'
      ? articles
      : articles.filter(a => a.tags.includes(tag));
    renderArticles(filtered);

    // Update button states
    filterBar.querySelectorAll('.tag').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tag === tag);
    });
  }

  // Build filter buttons
  const allTags = ['ALL', ...new Set(articles.flatMap(a => a.tags))];
  filterBar.innerHTML = allTags.map(tag => {
    const label = tag === 'ALL' ? 'すべて' : `#${tag}`;
    return `<button class="tag clickable${tag === 'ALL' ? ' active' : ''}" data-tag="${tag}">${label}</button>`;
  }).join('');

  filterBar.addEventListener('click', e => {
    if (e.target.classList.contains('tag')) {
      filter(e.target.dataset.tag);
    }
  });

  // Initial render
  renderArticles(articles);
}

// Home page: render latest 3 articles
function initHomeJournal() {
  const grid = document.getElementById('home-article-grid');
  if (!grid) return;
  const latest = articles.slice(0, 3);
  grid.innerHTML = latest.map(article => {
    const primaryTag = article.tags[0] || 'Development';
    const imgSrc = article.image || createPlaceholderSvg(primaryTag);
    const tagsHtml = article.tags.map(t => `<span class="tag">#${t}</span>`).join('');
    return `
      <article class="article-card fade-in">
        <img class="article-card__image" src="${imgSrc}" alt="${article.title}" loading="lazy">
        <div class="article-card__body">
          <div class="article-card__tags">${tagsHtml}</div>
          <h2 class="article-card__title">${article.title}</h2>
          <p class="article-card__excerpt">${article.excerpt}</p>
          <div class="article-card__meta">
            <span class="article-card__date">${formatDate(article.date)}</span>
          </div>
        </div>
      </article>
    `.trim();
  }).join('');
}

// スクリプトは <body> 末尾で読み込むため、DOM は既に存在する
initJournal();
initHomeJournal();
