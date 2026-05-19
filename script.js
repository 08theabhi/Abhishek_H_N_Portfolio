// ============================================================
// PRELOADER
// ============================================================
const preloader = document.getElementById('preloader');
const preloaderBar = document.getElementById('preloaderBar');
let progress = 0;

const fillBar = setInterval(() => {
  progress += Math.random() * 18;
  if (progress >= 100) {
    progress = 100;
    clearInterval(fillBar);
    setTimeout(() => {
      preloader.classList.add('done');
    }, 300);
  }
  preloaderBar.style.width = progress + '%';
}, 80);

// ============================================================
// CUSTOM CURSOR
// ============================================================
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

if (cursor && cursorRing) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Scale ring on interactive elements
  document.querySelectorAll('a, button, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.width = '56px';
      cursorRing.style.height = '56px';
      cursorRing.style.opacity = '0.35';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.width = '36px';
      cursorRing.style.height = '36px';
      cursorRing.style.opacity = '0.6';
    });
  });
}

// ============================================================
// NAVBAR SCROLL
// ============================================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
});

// ============================================================
// ACTIVE NAV ON SCROLL
// ============================================================
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.pageYOffset;
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < bottom);
    }
  });
}

// ============================================================
// HAMBURGER / MOBILE MENU
// ============================================================
const hamburger = document.getElementById('hamburger');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobLinks = document.querySelectorAll('.mob-link');

hamburger.addEventListener('click', () => {
  const open = mobileOverlay.classList.toggle('open');
  hamburger.classList.toggle('open', open);
});

mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileOverlay.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealEls = document.querySelectorAll('.sr-reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

// Stagger children within the same parent
revealEls.forEach((el, i) => {
  // If no explicit --d is set via inline style, auto-stagger siblings
  if (!el.style.getPropertyValue('--d')) {
    const siblings = [...el.parentElement.querySelectorAll('.sr-reveal')];
    const idx = siblings.indexOf(el);
    el.style.setProperty('--d', (idx * 100) + 'ms');
  }
  revealObserver.observe(el);
});

// ============================================================
// CONTACT FORM
// ============================================================
const contactForm = document.getElementById('contactForm');
const cFeedback = document.getElementById('cFeedback');

if (contactForm) {
  contactForm.addEventListener('submit', () => {
    const btn = contactForm.querySelector('.btn-send span');
    btn.textContent = 'Sending…';
  });
}
    const btn = contactForm.querySelector('.btn-send span');
    btn.textContent = 'Sending…';

    setTimeout(() => {
      cFeedback.textContent = '✓ Message received! I\'ll get back to you soon.';
      cFeedback.style.color = 'var(--accent)';
      contactForm.reset();
      btn.textContent = 'Send Message';
      setTimeout(() => { cFeedback.textContent = ''; }, 6000);
    }, 1000);
  });
}

// ============================================================
// SMOOTH SCROLL
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

// ============================================================
// PARALLAX — BIG BG TEXT
// ============================================================
const bgText = document.querySelector('.big-bg-text');

if (bgText) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    bgText.style.transform = `translateY(calc(-50% + ${scrolled * 0.12}px))`;
  });
}
