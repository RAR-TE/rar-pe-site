// Smooth scroll for internal anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
  a.addEventListener('click', function(e) {
    var href = a.getAttribute('href');
    if (href === '#') return;
    var target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Nav: backdrop + shadow on scroll
var nav = document.getElementById('main-nav');
window.addEventListener('scroll', function() {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ─── Counter animation ────────────────────────────────────────────────────────
function animateCounter(el) {
  var target   = parseFloat(el.dataset.count);
  var prefix   = el.dataset.prefix  || '';
  var suffix   = el.dataset.suffix  || '';
  var decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
  var duration = 1400;
  var start    = null;

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = Math.min((timestamp - start) / duration, 1);
    var value    = easeOutCubic(progress) * target;
    el.textContent = prefix + value.toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ─── Scroll-triggered animations ─────────────────────────────────────────────
var animateSelectors = [
  '.problema-card',
  '.fase-card',
  '.evidencia-card',
  '.problema-header',
  '.como-header',
  '.evidencia-header',
  '.contacto-inner h2',
  '.contacto-inner .contacto-sub',
  '.paso',
  '.contact-bar',
  '.booking-block',
];

// Mark elements for animation
animateSelectors.forEach(function(sel) {
  document.querySelectorAll(sel).forEach(function(el, i) {
    el.classList.add('animate-in');
    // Stagger siblings within the same parent
    el.style.transitionDelay = (i * 80) + 'ms';
  });
});

// Observe and trigger
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (!entry.isIntersecting) return;

    var el = entry.target;
    el.classList.add('is-visible');

    // Trigger counter if applicable
    var counter = el.querySelector('[data-counter]');
    if (counter) animateCounter(counter);

    // If the element itself is a counter (evidencia panels)
    if (el.dataset && el.dataset.counter !== undefined) animateCounter(el);

    observer.unobserve(el);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.animate-in').forEach(function(el) {
  observer.observe(el);
});

// Also observe ev-metric-number directly for counter (they're inside evidencia-card)
document.querySelectorAll('[data-counter]').forEach(function(el) {
  var counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  counterObserver.observe(el);
});
