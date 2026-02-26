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
      if (navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
      
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- ALL SCROLL-RELATED FUNCTIONS ---
  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (scrollPosition > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        el.classList.add('active');
      }
    });
    
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

  window.addEventListener('scroll', handleScroll);
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  initTheme();
  handleScroll(); 

});

// Loading Screen Script
window.addEventListener("load", function() {
  const loader = document.getElementById("loading-screen");
  loader.style.opacity = "0";
  setTimeout(() => {
    loader.style.display = "none";
  }, 800); 
});

// --- ENHANCED PROJECT MODALS ---
const modalData = {
  'mnist-ensemble': {
    title: "MNIST Ensemble Classifier",
    content: "Designed and implemented a multi-model machine learning architecture to classify the MNIST handwritten digit dataset. By combining <strong>Support Vector Machines (SVM)</strong>, Random Forests, and K-Nearest Neighbors (KNN) into a voting ensemble, the system achieved superior accuracy and robustness compared to standalone classifiers.",
    tech: ["Python", "Scikit-Learn", "SVM", "Data Analytics"]
  },
  'text-analytics': {
    title: "Corporate Annual Report Analytics",
    content: "Developed a text and web analytics pipeline to process complex corporate annual report PDFs. Utilizing Natural Language Processing (NLP), the tool extracts strategic management themes, performs sentiment analysis on market outlooks, and visualizes word trends to support investment decision-making.",
    tech: ["NLP", "Python", "Web Scraping", "Text Mining"]
  },
  'green-banking': {
    title: "Green Banking Perception Analysis",
    content: "Conducted extensive market research for an MBA dissertation focusing on sustainable finance. Formulated a conceptual model to measure customer awareness, perception, and adoption barriers regarding Green Banking practices in the Indian banking sector. The findings highlight actionable strategies for financial institutions to improve their 'Green Brand' image.",
    tech: ["Market Research", "Consumer Behavior", "Strategic Planning", "SPSS / Excel"]
  },
  'inventory-app': {
    title: "Dispensary Inventory Manager",
    content: "Engineered a practical, no-code inventory management application using AppSheet and Google Sheets for a local dispensary. The app streamlines daily operations by automating stock tracking, triggering low-inventory alerts, and optimizing the supply chain workflow without requiring expensive enterprise software.",
    tech: ["AppSheet", "Google Workspace", "Operations Management", "No-Code"]
  }
};

function openModal(projectId) {
  const data = modalData[projectId];
  if (!data) return;

  const modal = document.createElement('div');
  modal.className = 'custom-modal-overlay';
  modal.innerHTML = `
    <div class="custom-modal-content">
      <span class="close-modal" title="Close">&times;</span>
      <h3>${data.title}</h3>
      <p>${data.content}</p>
      <div class="modal-tags">
        ${data.tech.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden'; // Prevent background scrolling

  // Close when clicking the X
  modal.querySelector('.close-modal').onclick = closeModal;
  
  // Close when clicking outside the modal content
  modal.onclick = (e) => {
    if (e.target === modal) {
      closeModal();
    }
  };

  function closeModal() {
    modal.remove();
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
}