document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.navbar');
  const burger = document.querySelector('.hamburger');
  const mobile = document.querySelector('.mobile-menu');
  const progress = document.querySelector('.scroll-progress');
  const toTop = document.querySelector('.to-top');

  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 20);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (y / h * 100) + '%';
    }
    if (toTop) toTop.classList.toggle('visible', y > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (burger && mobile) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      mobile.classList.toggle('active');
      document.body.style.overflow = mobile.classList.contains('active') ? 'hidden' : '';
    });
    mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      burger.classList.remove('active');
      mobile.classList.remove('active');
      document.body.style.overflow = '';
    }));
  }

  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Active link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });

  // Loader hide
  const loader = document.querySelector('.loader');
  if (loader) {
    window.addEventListener('load', () => setTimeout(() => loader.classList.add('hidden'), 200));
  }
});
