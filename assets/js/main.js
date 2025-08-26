// Utility: select
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

// Theme toggle
(function initThemeToggle() {
  const html = document.documentElement;
  const stored = localStorage.getItem('theme');
  if (stored) html.setAttribute('data-theme', stored);
  const toggle = $('#themeToggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

// Mobile menu
(function initMobileMenu() {
  const btn = $('#menuToggle');
  const menu = $('.nav-links');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => menu.classList.toggle('open'));
})();

// Smooth scrolling for same-page anchors
(function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (targetId.length > 1 && $(targetId)) {
        e.preventDefault();
        $(targetId).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

// Animate on scroll
(function initAOS() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { threshold: 0.15 });
  $$('[data-animate]').forEach(el => observer.observe(el));
})();

// Testimonials carousel
(function initCarousel() {
  const track = $('.carousel-track');
  const dotsContainer = $('.carousel-dots');
  if (!track || !dotsContainer) return;
  const slides = $$('.testimonial', track);
  let index = 0;
  const setIndex = (i) => {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    $$('.carousel-dots button', dotsContainer).forEach((d, di) => d.classList.toggle('active', di === index));
  };
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.addEventListener('click', () => setIndex(i));
    if (i === 0) b.classList.add('active');
    dotsContainer.appendChild(b);
  });
  setInterval(() => setIndex(index + 1), 5000);
})();

// Before/After sliders
(function initBeforeAfter() {
  $$('.ba-slider').forEach(slider => {
    const overlay = $('.ba-overlay', slider);
    const handle = $('.ba-handle', slider);
    const range = $('.ba-range', slider);
    if (!overlay || !handle || !range) return;
    const setPos = (value) => {
      const pct = Number(value);
      overlay.style.width = pct + '%';
      handle.style.left = pct + '%';
    };
    setPos(50);
    range.addEventListener('input', (e) => setPos(e.target.value));
  });
})();

// Gallery filter
(function initGalleryFilters() {
  const controls = $('.filter-controls');
  const items = $$('.gallery-item');
  if (!controls || !items.length) return;
  controls.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-filter]');
    if (!btn) return;
    const filter = btn.getAttribute('data-filter');
    $$('.filter-controls button').forEach(b => b.classList.toggle('btn-primary', b === btn));
    items.forEach(item => {
      const cat = item.getAttribute('data-category');
      item.style.display = (filter === 'all' || filter === cat) ? '' : 'none';
    });
  });
})();

// Contact form validation and handling
(function initContactForm() {
  const form = $('#contactForm');
  const confirm = $('#formConfirm');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const required = ['name', 'email', 'phone', 'service', 'message'];
    const invalid = required.find(f => !data[f] || String(data[f]).trim() === '');
    if (invalid) {
      alert('Please fill in all required fields.');
      return;
    }
    // Simulate success
    await new Promise(r => setTimeout(r, 400));
    if (confirm) confirm.textContent = 'Thank you! We will reach out within 24 hours.';
    form.reset();
  });
})();

// Prefill service on contact page from query param
(function prefillService() {
  const select = $('#serviceSelect');
  if (!select) return;
  const params = new URLSearchParams(location.search);
  const s = params.get('service');
  if (s) select.value = s;
})();

// Sticky header shadow on scroll
(function stickyHeader() {
  const header = $('.header');
  if (!header) return;
  const onScroll = () => {
    const scrolled = window.scrollY > 8;
    header.style.boxShadow = scrolled ? 'var(--shadow-sm)' : 'none';
  };
  window.addEventListener('scroll', onScroll);
  onScroll();
})();