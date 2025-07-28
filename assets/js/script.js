'use strict';

/**
 * ----------------------------------------------------------------------
 * # 1. UTILITY FUNCTION
 * ----------------------------------------------------------------------
 * Attaches an event listener to an array of elements.
 */
const addEventOnElements = (elements, eventType, callback) => {
  elements.forEach(element => element.addEventListener(eventType, callback));
};


/**
 * ----------------------------------------------------------------------
 * # 2. MOBILE NAVIGATION
 * ----------------------------------------------------------------------
 * Toggles the mobile navigation menu.
 * Also closes the menu when a navigation link is clicked.
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");
const navbarLinks = document.querySelectorAll(".navbar-link");

const toggleNavbar = () => {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

// Add toggle functionality to hamburger and close buttons
addEventOnElements(navTogglers, "click", toggleNavbar);

// Close navbar when a link is clicked (for mobile view)
addEventOnElements(navbarLinks, "click", () => {
  if (navbar.classList.contains("active")) {
    toggleNavbar();
  }
});


/**
 * ----------------------------------------------------------------------
 * # 3. STICKY HEADER
 * ----------------------------------------------------------------------
 * Makes the header sticky after scrolling past a certain point.
 */
const header = document.querySelector("[data-header]");
const STICKY_THRESHOLD = 50; // Pixels to scroll before header becomes sticky

const handleScroll = () => {
  // Add 'active' class to header when scrolled past the threshold
  header.classList.toggle("active", window.scrollY > STICKY_THRESHOLD);
};

window.addEventListener("scroll", handleScroll);


/**
 * ----------------------------------------------------------------------
 * # 4. SCROLL REVEAL ANIMATION
 * ----------------------------------------------------------------------
 * Uses the modern Intersection Observer API for high-performance animations.
 */
const revealElements = document.querySelectorAll("[data-reveal]");

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // If the element is in the viewport
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      // Stop observing the element after it has been revealed
      observer.unobserve(entry.target);
    }
  });
}, {
  root: null,         // Observes intersections relative to the viewport
  rootMargin: '0px',
  threshold: 0.15     // Triggers when 15% of the element is visible
});

// Attach the observer to each reveal element
revealElements.forEach(element => {
  // Set transition delays from data attributes immediately
  if (element.dataset.revealDelay) {
    element.style.transitionDelay = element.dataset.revealDelay;
  }
  revealObserver.observe(element);
});


/**
 * ----------------------------------------------------------------------
 * # 5. DYNAMIC COPYRIGHT YEAR
 * ----------------------------------------------------------------------
 * Automatically updates the copyright year in the footer.
 */
const copyrightElement = document.querySelector(".copyright");
if (copyrightElement) {
    const currentYear = new Date().getFullYear();
    copyrightElement.innerHTML = `&copy; ${currentYear} Gokulnath B. All Rights Reserved.`;
}
