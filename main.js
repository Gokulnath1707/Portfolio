document.addEventListener('DOMContentLoaded', () => {

  // --- GET ALL NECESSARY ELEMENTS ---
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section, .hero-section');
  const backToTopBtn = document.getElementById('backToTop');
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const revealElements = document.querySelectorAll('.reveal');

  // --- THEME TOGGLE (DARK/LIGHT MODE) ---
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      body.classList.add('dark-mode');
    }
  };

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // --- HAMBURGER MENU & NAVIGATION ---
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Close mobile menu on click
      if (navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
      
      // Smooth scroll to section
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();
        const offsetTop = targetSection.offsetTop - 70; // Adjust for fixed navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- ALL SCROLL-RELATED FUNCTIONS IN ONE PLACE ---
  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    // 1. Navbar style on scroll
    if (scrollPosition > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // 2. Back to Top button visibility
    if (scrollPosition > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // 3. Reveal elements on scroll
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        el.classList.add('active');
      }
    });
    
    // 4. Update active navigation link
    let currentSectionId = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if(scrollPosition >= sectionTop - 150) {
            currentSectionId = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href').substring(1) === currentSectionId) {
            link.classList.add('active');
        }
    });
  };

  // Attach a single, efficient scroll listener
  window.addEventListener('scroll', handleScroll);
  
  // Back to top click listener
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- INITIALIZE ON PAGE LOAD ---
  initTheme();
  handleScroll(); // Run once on load to set initial states

});

// --- PROJECT MODAL PLACEHOLDER ---
function openModal(projectId) {
  alert("You clicked on project: " + projectId + ".\nImplement a modal or a new page to show case study details here.");
}
