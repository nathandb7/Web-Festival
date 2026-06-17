(() => {
  const doc = document.documentElement;
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setScrollState() {
    const y = window.scrollY || window.pageYOffset;
    doc.style.setProperty('--irl-scroll-y', String(Math.round(y)));
    body.classList.toggle('is-scrolled', y > 12);
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      setScrollState();
      ticking = false;
    });
  }, { passive: true });

  setScrollState();

  const revealItems = document.querySelectorAll('[data-reveal]');

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.16,
      rootMargin: '0px 0px -8% 0px'
    });

    revealItems.forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${Math.min(index * 45, 280)}ms`);
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const magneticItems = document.querySelectorAll('[data-magnetic]');

  if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    magneticItems.forEach((item) => {
      item.addEventListener('mousemove', (event) => {
        const rect = item.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        item.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
      });

      item.addEventListener('mouseleave', () => {
        item.style.transform = '';
      });
    });
  }
})();
