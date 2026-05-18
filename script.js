// ==============================
// NAVBAR SCROLL EFFECT
// ==============================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ==============================
// MOBILE MENU TOGGLE
// ==============================
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

// ==============================
// ACTIVE NAV LINK ON SCROLL
// ==============================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.style.color = '';
        link.style.fontWeight = '';
      });
      const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.style.color = 'var(--accent)';
      }
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// ==============================
// FADE-IN ON SCROLL
// ==============================
const fadeElements = document.querySelectorAll(
  '#about .about-grid, #skills .skill-card, #projects .project-card, #contact .contact-grid, .home-text, .home-photo-wrap'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeElements.forEach(el => observer.observe(el));

// ==============================
// CONTACT FORM
// ==============================
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formNote.textContent = 'Please fill in all fields.';
    formNote.style.color = '#c0392b';
    return;
  }

  // Simulate form submission
  formNote.textContent = 'Thank you! Your message has been received.';
  formNote.style.color = 'var(--accent)';
  contactForm.reset();

  setTimeout(() => { formNote.textContent = ''; }, 5000);
});

// ==============================
// SMOOTH SCROLL FOR ALL NAV ANCHORS
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==============================
// HOME TEXT ENTRANCE ANIMATION
// ==============================
window.addEventListener('load', () => {
  const homeEl = document.querySelector('.home-text');
  const homePhoto = document.querySelector('.home-photo-wrap');
  if (homeEl) {
    setTimeout(() => homePhoto && homePhoto.classList.add('visible'), 100);
    setTimeout(() => homeEl.classList.add('visible'), 250);
  }
});
