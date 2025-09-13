'use strict';

/**
 * ----------------------------------------------------------------------
 * # 1. UTILITY FUNCTION
 * ----------------------------------------------------------------------
 */
const addEventOnElements = (elements, eventType, callback) => {
  elements.forEach(element => element.addEventListener(eventType, callback));
};


/**
 * ----------------------------------------------------------------------
 * # 2. MOBILE NAVIGATION (for future use if needed)
 * ----------------------------------------------------------------------
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = () => {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);


/**
 * ----------------------------------------------------------------------
 * # 3. ACTIVE PAGE LINK HIGHLIGHTER
 * ----------------------------------------------------------------------
 */
const navbarLinks = document.querySelectorAll(".navbar-link");
const currentPage = window.location.pathname.split('/').pop();
const currentHash = window.location.hash;

navbarLinks.forEach(link => {
  const linkPage = link.getAttribute('href').split('/').pop().split('#')[0];
  const linkHash = link.hash;

  // Check for homepage (index.html or empty path)
  if ((currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) && !linkHash) {
    link.classList.add('active');
  }
  // Check for other pages
  if (currentPage === linkPage && currentPage !== 'index.html' && currentPage !== '') {
    link.classList.add('active');
  }
  // Check for hash links like #contact
  if (linkHash && currentHash === linkHash) {
    link.classList.add('active');
  }
});


/**
 * ----------------------------------------------------------------------
 * # 4. SCROLL REVEAL ANIMATION
 * ----------------------------------------------------------------------
 */
const revealElements = document.querySelectorAll("[data-reveal]");

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    }
  });
}, {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
});

revealElements.forEach(element => {
  if (element.dataset.revealDelay) {
    element.style.transitionDelay = element.dataset.revealDelay;
  }
  revealObserver.observe(element);
});


/**
 * ----------------------------------------------------------------------
 * # 5. DYNAMIC COPYRIGHT YEAR
 * ----------------------------------------------------------------------
 */
const copyrightElement = document.querySelector(".copyright");
if (copyrightElement) {
    const currentYear = new Date().getFullYear();
    copyrightElement.innerHTML = `&copy; ${currentYear} Gokulnath B. All Rights Reserved.`;
}
