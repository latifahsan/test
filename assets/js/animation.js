document.addEventListener('DOMContentLoaded', () => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        // Animate skill bars
        e.target.querySelectorAll('.bar > span[data-pct]').forEach(s => {
          s.style.width = s.dataset.pct + '%';
        });
        // Animate counters
        e.target.querySelectorAll('[data-count]').forEach(el => {
          if (el.dataset.done) return;
          el.dataset.done = '1';
          const target = +el.dataset.count;
          const dur = 1400;
          const start = performance.now();
          const suffix = el.dataset.suffix || '';
          const tick = (t) => {
            const p = Math.min((t - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.floor(target * eased) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));
});
