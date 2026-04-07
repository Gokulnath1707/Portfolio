window.addEventListener('load', () => {
  setTimeout(() => {
    const screen = document.getElementById('loading-screen');
    if (screen) {
      screen.style.opacity = '0';
      setTimeout(() => {
        screen.style.display = 'none';
      }, 800);
    }
  }, 800);
});

const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem(
      'theme',
      document.body.classList.contains('dark-mode') ? 'dark' : 'light'
    );
  });
}

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    if (hamburger) hamburger.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
  });
});

window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }

  const btn = document.getElementById('backToTop');
  if (btn) {
    btn.classList.toggle('visible', window.scrollY > 400);
  }

  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  sections.forEach((section) => {
    const top = section.getBoundingClientRect().top;
    if (top < 120 && top > -section.offsetHeight + 100) {
      document.querySelectorAll('.nav-link').forEach((anchor) => {
        const href = anchor.getAttribute('href');
        anchor.classList.toggle('active', href === `#${section.id}`);
      });
    }
  });
});

const backToTopButton = document.getElementById('backToTop');
if (backToTopButton) {
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const finePointerMedia = window.matchMedia('(pointer: fine)');

function setupCustomCursor() {
  if (!finePointerMedia.matches || document.querySelector('.custom-cursor')) return;

  const cursor = document.createElement('div');
  const follower = document.createElement('div');

  cursor.className = 'custom-cursor';
  follower.className = 'custom-cursor-follower';
  document.body.appendChild(cursor);
  document.body.appendChild(follower);
  document.body.classList.add('custom-cursor-enabled');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  const moveCursor = (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  };

  const animateFollower = () => {
    followerX += (mouseX - followerX) * 0.18;
    followerY += (mouseY - followerY) * 0.18;
    follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    window.requestAnimationFrame(animateFollower);
  };

  const setHoverState = (isHovering) => {
    cursor.classList.toggle('is-hovering', isHovering);
    follower.classList.toggle('is-hovering', isHovering);
  };

  document.addEventListener('mousemove', moveCursor);
  document.addEventListener('mousedown', () => setHoverState(true));
  document.addEventListener('mouseup', () => setHoverState(false));

  document
    .querySelectorAll('a, button, .project-card, .project-detail-toggle, .theme-toggle, .hamburger')
    .forEach((element) => {
      element.addEventListener('mouseenter', () => setHoverState(true));
      element.addEventListener('mouseleave', () => setHoverState(false));
    });

  window.requestAnimationFrame(animateFollower);
}

setupCustomCursor();

const aboutSlides = document.querySelectorAll('.about-slide');

if (aboutSlides.length > 1) {
  let activeSlideIndex = 0;

  window.setInterval(() => {
    aboutSlides[activeSlideIndex].classList.remove('active');
    activeSlideIndex = (activeSlideIndex + 1) % aboutSlides.length;
    aboutSlides[activeSlideIndex].classList.add('active');
  }, 1800);
}
