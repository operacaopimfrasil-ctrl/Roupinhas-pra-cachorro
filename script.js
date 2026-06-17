'use strict';

/* ══════════════════════════════════════
   INTERSECTION OBSERVER — Scroll Reveal
   .reveal → .in
══════════════════════════════════════ */
(function () {
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    obs.observe(el);
  });
})();

/* ══════════════════════════════════════
   HERO SOCIAL PROOF COUNTERS
   data-target attribute drives the animation
══════════════════════════════════════ */
(function () {
  var counters = document.querySelectorAll('.proof-number[data-target]');
  if (!counters.length) return;

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var duration = 1400;
    var startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + (target >= 500 ? '+' : '');
    }
    requestAnimationFrame(step);
  }

  var triggered = false;
  var heroObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !triggered) {
        triggered = true;
        counters.forEach(animateCounter);
      }
    });
  }, { threshold: 0.5 });

  var heroProof = document.querySelector('.hero-proof');
  if (heroProof) heroObs.observe(heroProof);
})();

/* ══════════════════════════════════════
   FAQ ACCORDION
   .faq-btn → toggle .faq-item.open
══════════════════════════════════════ */
document.querySelectorAll('.faq-item').forEach(function (item) {
  var btn = item.querySelector('.faq-btn');
  var ico = item.querySelector('.faq-ico');
  if (!btn) return;

  btn.addEventListener('click', function () {
    var isOpen = item.classList.contains('open');

    // Close all others
    document.querySelectorAll('.faq-item.open').forEach(function (other) {
      other.classList.remove('open');
      other.querySelector('.faq-btn').setAttribute('aria-expanded', 'false');
      var otherIco = other.querySelector('.faq-ico');
      if (otherIco) otherIco.textContent = '+';
    });

    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      if (ico) ico.textContent = '×';
    }
  });
});

/* ══════════════════════════════════════
   MOBILE STICKY BAR
   .mob-bar → .show after hero leaves viewport
══════════════════════════════════════ */
(function () {
  var bar = document.getElementById('mobBar');
  var hero = document.querySelector('.hero');
  if (!bar || !hero) return;

  function toggleBar() {
    var heroBottom = hero.getBoundingClientRect().bottom;
    if (heroBottom < 0) {
      bar.classList.add('show');
    } else {
      bar.classList.remove('show');
    }
  }

  window.addEventListener('scroll', toggleBar, { passive: true });
  toggleBar();
})();

/* ══════════════════════════════════════
   CTA BUTTONS → CHECKOUT
══════════════════════════════════════ */
var CHECKOUT_URL = 'https://checkout.exemplo.com';
document.querySelectorAll('.btn-cta').forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = CHECKOUT_URL;
  });
});

/* ══════════════════════════════════════
   SMOOTH SCROLL — anchor links
══════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var id = this.getAttribute('href');
    if (id === '#') return;
    var target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
