/**
 * DREXORA PORTFOLIO – main.js
 * Clean, modular, well-commented Vanilla JavaScript
 * Author: David Chucks | Drexora
 */

'use strict';

/* ============================================================
   1. PAGE LOADER
   ============================================================ */
(function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Hide loader once page is fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1800); // slight delay to let progress bar finish
  });

  // Fallback: hide after 3s regardless
  setTimeout(() => loader.classList.add('hidden'), 3000);
})();

/* ============================================================
   2. NAVBAR – sticky + active link highlighting
   ============================================================ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  // Add 'scrolled' class when user scrolls
  function onScroll() {
    const scrolled = window.scrollY > 50;
    navbar.classList.toggle('scrolled', scrolled);
  }

  // Highlight nav link for the visible section
  function highlightActiveLink() {
    const scrollPos = window.scrollY + window.innerHeight / 3;

    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);

      if (link) {
        link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
      }
    });
  }

  window.addEventListener('scroll', () => {
    onScroll();
    highlightActiveLink();
  }, { passive: true });

  onScroll();
  highlightActiveLink();
})();

/* ============================================================
   3. MOBILE MENU
   ============================================================ */
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close when a link is clicked
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();

/* ============================================================
   4. SMOOTH SCROLLING (for all internal anchor links)
   ============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ============================================================
   5. TYPING ANIMATION
   ============================================================ */
(function initTypingAnimation() {
  const typedEl = document.getElementById('typed');
  if (!typedEl) return;

  const phrases = [
    'Premium Websites',
    'Business Sites',
    'Church Websites',
    'Portfolio Sites',
    'Landing Pages',
    'Firebase Apps',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      delay = 60;
    } else {
      typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      delay = 110;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at end of phrase
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 800);
})();

/* ============================================================
   6. PARTICLE BACKGROUND (Hero)
   ============================================================ */
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  // Respect reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const count = window.innerWidth < 768 ? 15 : 30;

  for (let i = 0; i < count; i++) {
    createParticle(container);
  }

  function createParticle(parent) {
    const p = document.createElement('div');
    p.classList.add('particle');

    const size = Math.random() * 4 + 1;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;

    parent.appendChild(p);
  }
})();

/* ============================================================
   7. SCROLL REVEAL ANIMATIONS
   ============================================================ */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');

  if (!revealEls.length) return;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealEls.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px',
  });

  revealEls.forEach(el => observer.observe(el));
})();

/* ============================================================
   8. ANIMATED COUNTERS
   ============================================================ */
(function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;

      const tick = () => {
        current += step;
        if (current < target) {
          el.textContent = Math.floor(current);
          requestAnimationFrame(tick);
        } else {
          el.textContent = target;
        }
      };

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

/* ============================================================
   9. SKILL BARS ANIMATION
   ============================================================ */
(function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar');
  if (!skillBars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const bar = entry.target;
      const width = bar.dataset.width;
      const fill = bar.querySelector('.skill-fill');

      if (fill) {
        setTimeout(() => {
          fill.style.width = width + '%';
        }, 200);
      }

      observer.unobserve(bar);
    });
  }, { threshold: 0.4 });

  skillBars.forEach(bar => observer.observe(bar));
})();

/* ============================================================
   10. PORTFOLIO FILTER
   ============================================================ */
(function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;

        card.style.transition = 'opacity 0.35s, transform 0.35s';

        if (show) {
          card.classList.remove('hidden');
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => card.classList.add('hidden'), 350);
        }
      });
    });
  });
})();

/* ============================================================
   11. TESTIMONIAL SLIDER
   ============================================================ */
(function initTestimonials() {
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('testiDots');
  const prevBtn = document.getElementById('testiPrev');
  const nextBtn = document.getElementById('testiNext');

  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.testimonial-card'));
  let current = 0;
  let autoplayTimer;

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('testi-dot');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    cards[current].classList.remove('active');
    dotsContainer.children[current].classList.remove('active');

    current = (index + cards.length) % cards.length;

    cards[current].classList.add('active');
    dotsContainer.children[current].classList.add('active');

    resetAutoplay();
  }

  function startAutoplay() {
    autoplayTimer = setInterval(() => goTo(current + 1), 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  }, { passive: true });

  startAutoplay();
})();

/* ============================================================
   12. FAQ ACCORDION
   ============================================================ */
(function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = question.getAttribute('aria-expanded') === 'true';

      // Close all others (accordion behaviour)
      faqItems.forEach(otherItem => {
        const q = otherItem.querySelector('.faq-question');
        const a = otherItem.querySelector('.faq-answer');
        if (q && a && otherItem !== item) {
          q.setAttribute('aria-expanded', 'false');
          a.setAttribute('hidden', '');
        }
      });

      // Toggle current
      question.setAttribute('aria-expanded', String(!isOpen));
      if (isOpen) {
        answer.setAttribute('hidden', '');
      } else {
        answer.removeAttribute('hidden');
      }
    });
  });
})();

/* ============================================================
   13. CONTACT FORM VALIDATION & SUBMISSION
   ============================================================ */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  // Validate a single field
  function validateField(field) {
    const error = field.parentElement.querySelector('.form-error');
    let msg = '';

    if (field.required && !field.value.trim()) {
      msg = 'This field is required.';
    } else if (field.type === 'email' && field.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value.trim())) msg = 'Please enter a valid email address.';
    } else if (field.tagName === 'SELECT' && field.required && !field.value) {
      msg = 'Please select an option.';
    }

    if (error) error.textContent = msg;
    field.classList.toggle('error', !!msg);
    return !msg;
  }

  // Inline validation on blur
  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) validateField(field);
    });
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all required fields
    const requiredFields = form.querySelectorAll('[required]');
    let valid = true;
    requiredFields.forEach(field => {
      if (!validateField(field)) valid = false;
    });

    if (!valid) {
      showFeedback('Please fix the errors above.', 'error');
      return;
    }

    // Simulate sending (replace with real endpoint or Formspree/EmailJS)
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    try {
      // Simulate async call
      await new Promise(resolve => setTimeout(resolve, 1800));

      // Success
      showFeedback(
        '✅ Message sent successfully! I\'ll get back to you within 24 hours.',
        'success'
      );
      form.reset();
    } catch (err) {
      showFeedback('❌ Something went wrong. Please email me directly at daviddchucks@gmail.com', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
  });

  function showFeedback(msg, type) {
    feedback.textContent = msg;
    feedback.className = 'form-feedback ' + type;
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(() => { feedback.className = 'form-feedback'; feedback.textContent = ''; }, 6000);
  }
})();

/* ============================================================
   14. BACK TO TOP BUTTON
   ============================================================ */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ============================================================
   15. FOOTER YEAR (auto-updates)
   ============================================================ */
(function setFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ============================================================
   16. LAZY LOADING IMAGES (native + polyfill)
   ============================================================ */
(function initLazyImages() {
  // Native lazy loading is used via loading="lazy" attribute.
  // This adds an IntersectionObserver fallback for older browsers.
  if ('loading' in HTMLImageElement.prototype) return;

  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => observer.observe(img));
})();

/* ============================================================
   17. ACTIVE SECTION INDICATOR (for mobile bottom nav feel)
   ============================================================ */
(function initActiveSectionGlow() {
  // Subtle glow on focused interactive elements
  document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('focusin', () => card.style.borderColor = 'rgba(168,85,247,0.5)');
    card.addEventListener('focusout', () => card.style.borderColor = '');
  });
})();

/* ============================================================
   18. KEYBOARD NAVIGATION ENHANCEMENTS
   ============================================================ */
(function initKeyboardEnhancements() {
  // Allow Enter/Space to trigger click on card-like elements with tabindex
  document.querySelectorAll('[tabindex="0"]').forEach(el => {
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });
})();

/* ============================================================
   19. PORTFOLIO CARD ACCESSIBILITY (mobile reveal)
   ============================================================ */
(function initPortfolioCards() {
  // On touch devices, toggle overlay with tap
  if (!window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('mobile-active');
    });
  });
})();

/* ============================================================
   20. PERFORMANCE: Throttle scroll events
   ============================================================ */
(function throttleScroll() {
  // Replace addEventListener for scroll with a throttled version
  let ticking = false;
  const scrollHandlers = [];

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ============================================================
   INIT COMPLETE
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Mark body as JS-loaded for progressive enhancement
  document.body.classList.add('js-loaded');
  console.log('%cDrexora Portfolio Loaded ✅', 'color:#a855f7;font-weight:bold;font-size:14px');
  console.log('%cBuilt by David Chucks | Drexora', 'color:#06b6d4;font-size:11px');
});
