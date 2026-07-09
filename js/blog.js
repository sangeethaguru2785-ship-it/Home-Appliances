/* ============================================
   Stackly - Blog Page
   ============================================ */
'use strict';

document.getElementById('app-header').innerHTML = renderHeader('blog');
document.getElementById('app-footer').innerHTML = renderFooter();
initCommon();

const blogGrid = document.getElementById('blogGrid');

function renderBlogPosts(filter = 'all') {
  const filtered = filter === 'all' ? blogPosts : blogPosts.filter(p => p.category === filter);
  blogGrid.innerHTML = filtered.map((post, i) => `
    <article class="blog-card" style="transition-delay: ${i * 0.06}s">
      <div class="blog-card-image">${post.image ? `<img src="${post.image}" alt="${post.title}">` : post.svg}</div>
      <div class="blog-card-body">
        <div class="blog-meta">
          <span class="blog-category">${post.category}</span>
          <span class="blog-date">${post.date}</span>
        </div>
        <h3 class="blog-card-title">${post.title}</h3>
        <p class="blog-card-excerpt">${post.excerpt}</p>
        <div class="blog-card-footer">
          <span class="blog-author">By ${post.author}</span>
          <span class="blog-read-time">${post.readTime}</span>
        </div>
      </div>
    </article>
  `).join('');
  setTimeout(() => {
    blogGrid.querySelectorAll('.blog-card').forEach(card => card.classList.add('visible'));
  }, 100);
}

// Filters
document.querySelectorAll('#blogFilters .filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#blogFilters .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderBlogPosts(btn.dataset.filter);
  });
});

renderBlogPosts('all');
