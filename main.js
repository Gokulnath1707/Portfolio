

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
const cursorHoverSelector = 'a, button, img, input, textarea, select, .project-card, .project-detail-toggle, .theme-toggle, .hamburger, .skill-badge, .trait-card, .cert-card, .social-icon, .nav-link, .achievement-item, .internship-card, .nav-overlay-btn, .control-btn, .footer-nav-btn, .book-page-slider, .jump-page-input';

function setupCustomCursor() {
  if (!finePointerMedia.matches || document.querySelector('.custom-cursor')) return;

  const dot = document.createElement('div');
  const borderDot = document.createElement('div');

  dot.className = 'custom-cursor';
  borderDot.className = 'custom-cursor-follower';

  document.body.appendChild(borderDot);
  document.body.appendChild(dot);
  document.body.classList.add('custom-cursor-enabled');

  const mousePosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const dotPosition = { x: mousePosition.x, y: mousePosition.y };
  const borderDotPosition = { x: mousePosition.x, y: mousePosition.y };

  const DOT_SMOOTHNESS = 0.2;
  const BORDER_DOT_SMOOTHNESS = 0.1;

  const setPos = (el, x, y) => {
    el.style.setProperty('--cx', `${x}px`);
    el.style.setProperty('--cy', `${y}px`);
  };

  const handleMouseMove = (e) => {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
  };

  const lerp = (start, end, factor) => start + (end - start) * factor;

  const animate = () => {
    dotPosition.x = lerp(dotPosition.x, mousePosition.x, DOT_SMOOTHNESS);
    dotPosition.y = lerp(dotPosition.y, mousePosition.y, DOT_SMOOTHNESS);
    setPos(dot, dotPosition.x, dotPosition.y);

    borderDotPosition.x = lerp(borderDotPosition.x, mousePosition.x, BORDER_DOT_SMOOTHNESS);
    borderDotPosition.y = lerp(borderDotPosition.y, mousePosition.y, BORDER_DOT_SMOOTHNESS);
    setPos(borderDot, borderDotPosition.x, borderDotPosition.y);

    requestAnimationFrame(animate);
  };

  const setHoverState = (isHovering) => {
    borderDot.classList.toggle('is-hovering', isHovering);
  };

  document.addEventListener('mousemove', handleMouseMove);

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(cursorHoverSelector)) setHoverState(true);
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(cursorHoverSelector)) setHoverState(false);
  });

  requestAnimationFrame(animate);
}

setupCustomCursor();

/* === Scroll Progress Bar === */
function setupScrollProgress() {
  if (document.querySelector('.scroll-progress-bar')) return;
  const bar = document.createElement('div');
  bar.className = 'scroll-progress-bar';
  bar.innerHTML = '<div class="scroll-progress-fill" id="scrollProgressFill"></div>';
  document.body.appendChild(bar);

  const fill = bar.querySelector('.scroll-progress-fill');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    fill.style.width = `${progress}%`;
  });
}

setupScrollProgress();

const aboutSlides = document.querySelectorAll('.about-slide');

if (aboutSlides.length > 1) {
  let activeSlideIndex = 0;

  window.setInterval(() => {
    aboutSlides[activeSlideIndex].classList.remove('active');
    activeSlideIndex = (activeSlideIndex + 1) % aboutSlides.length;
    aboutSlides[activeSlideIndex].classList.add('active');
  }, 1800);
}
