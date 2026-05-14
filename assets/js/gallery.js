document.addEventListener('DOMContentLoaded', () => {
  // Filters (projects, blog, gallery)
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const target = group.dataset.filterGroup;
    const items = document.querySelectorAll('[data-filter-item="' + target + '"]');
    group.querySelectorAll('button').forEach(b => {
      b.addEventListener('click', () => {
        group.querySelectorAll('button').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        const f = b.dataset.f;
        items.forEach(it => {
          it.style.display = (f === 'all' || it.dataset.cat === f) ? '' : 'none';
        });
      });
    });
  });

  // Gallery modal
  const modal = document.querySelector('#imgModal');
  if (modal) {
    const content = modal.querySelector('.content');
    document.querySelectorAll('.gallery-item').forEach(g => {
      g.addEventListener('click', () => {
        content.querySelector('.preview').textContent = g.dataset.title || '';
        content.querySelector('.preview-sub').textContent = g.dataset.cat || '';
        modal.classList.add('active');
      });
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.closest('.close')) modal.classList.remove('active');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') modal.classList.remove('active');
    });
  }

  // Contact form (frontend only)
  const form = document.querySelector('#contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      status.textContent = 'Message ready — opening your email client...';
      const data = new FormData(form);
      const subject = encodeURIComponent(data.get('subject') || 'Hello Latif');
      const body = encodeURIComponent(`From: ${data.get('name')} <${data.get('email')}>\n\n${data.get('message')}`);
      window.location.href = `mailto:latif@example.com?subject=${subject}&body=${body}`;
    });
  }
});
