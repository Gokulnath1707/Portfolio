/* ── LOADING SCREEN ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const screen = document.getElementById('loading-screen');
    if (screen) { screen.style.opacity = '0'; setTimeout(() => screen.style.display = 'none', 800); }
  }, 800);
});

/* ── THEME TOGGLE ── */
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') document.body.classList.add('dark-mode');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

/* ── NAVBAR SCROLL ── */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  // Back to top
  const btn = document.getElementById('backToTop');
  btn.classList.toggle('visible', window.scrollY > 400);

  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < 120 && top > -section.offsetHeight + 100) {
      document.querySelectorAll('.nav-link').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + section.id);
      });
    }
  });
});

document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── PROJECT MODAL DATA ── */
const projects = {
  'leave-mgmt': {
    title: 'Leave Management System',
    img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=800',
    tags: ['Full Stack', 'HR Tech', 'Dashboard', 'Web App'],
    overview: 'A comprehensive Leave Management System designed to digitize and streamline the entire employee leave lifecycle — from request submission to manager approval and HR reporting.',
    features: [
      'Role-based access for Employees, Managers, and HR Admins',
      'Leave request submission with type selection (casual, sick, earned, etc.)',
      'Manager approval/rejection workflow with email notifications',
      'Real-time leave balance tracking and calendar view',
      'HR dashboard with leave analytics, trends, and exportable reports',
      'Holiday calendar management and department-wise leave overview',
    ],
    tech: ['Python / Django', 'HTML, CSS, JavaScript', 'SQLite / PostgreSQL', 'REST API', 'Chart.js'],
    outcome: 'Reduces manual HR effort, eliminates paperwork, and provides real-time visibility into workforce availability.',
  },
  'ai-resume': {
    title: 'AI Resume Analyser',
    img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800',
    tags: ['NLP', 'AI', 'Python', 'Machine Learning', 'HR Tech'],
    overview: 'An intelligent, NLP-powered resume screening tool that parses resumes, compares them against a job description, and provides an actionable match score with feedback — cutting recruiter screening time significantly.',
    features: [
      'PDF and DOCX resume parsing with structured data extraction',
      'Job Description (JD) input and skill keyword extraction',
      'TF-IDF and cosine similarity-based match scoring engine',
      'Named Entity Recognition (NER) for skills, education, and experience',
      'Ranked candidate shortlist with visual score breakdown',
      'Feedback module suggesting areas for resume improvement',
    ],
    tech: ['Python', 'spaCy / NLTK', 'scikit-learn', 'PyMuPDF / python-docx', 'Streamlit / Flask', 'Pandas'],
    outcome: 'Automates resume screening, reduces bias in shortlisting, and provides candidates with transparent improvement feedback.',
  },
  'iv-monitor': {
  title: 'Smart IV Drip Monitoring System',
  img: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=800',
  tags: ['IoT', 'Arduino', 'Firebase', 'Frontend', 'Healthcare'],
  overview: 'An IoT-based IV drip monitoring system that provides real-time tracking of drip flow rates and automates alert notifications to caretakers — reducing manual rounds and improving patient safety.',
  features: [
    'Real-time IV drip level and flow rate monitoring via Arduino sensors',
    'Automated alerts sent to caretakers when drip is low or flow is irregular',
    'Firebase backend for live data sync across devices',
    'Frontend dashboard displaying patient-wise drip status',
    'Reduced manual monitoring workload for nursing staff',
  ],
  tech: ['Arduino', 'C/C++ (Embedded)', 'Firebase Realtime Database', 'HTML / CSS / JavaScript', 'IoT Sensors'],
  outcome: 'Streamlined caretaker workflows, minimized human error in IV monitoring, and enhanced patient safety through real-time automated alerts.',
  },
  'dissertation': {
  title: 'Consumer Behavior in Sustainable Personal Care',
  img: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?q=80&w=800',
  tags: ['Dissertation', 'Consumer Behavior', 'Sustainability', 'Product Design', 'Market Research'],
  overview: 'MBA Dissertation researching how product design elements — such as packaging, labeling, color, and eco-branding — influence consumer buying behavior in sustainable personal care products.',
  features: [
    'Conceptual framework linking design elements to purchase intent',
    'Primary data collection via structured consumer survey',
    'Analysis of packaging, eco-labels, and visual appeal as decision drivers',
    'Segmentation of consumer attitudes toward sustainable products',
    'Recommendations for brands on design-led sustainability marketing',
  ],
  tech: ['SPSS', 'Survey Design', 'Factor Analysis', 'Regression Analysis', 'Consumer Behavior Frameworks'],
  outcome: 'Provides actionable insights for sustainable personal care brands on how to leverage product design as a competitive differentiator to drive purchase intent.',
}
};

/* ── MODAL FUNCTIONS ── */
function openModal(id) {
  const p = projects[id];
  if (!p) return;

  document.getElementById('modalBody').innerHTML = `
    <img src="${p.img}" alt="${p.title}" class="modal-img">
    <h3>${p.title}</h3>
    <p>${p.overview}</p>
    <div class="modal-section">
      <h4>Key Features</h4>
      <ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
    </div>
    <div class="modal-section">
      <h4>Outcome</h4>
      <p style="margin-bottom:0">${p.outcome}</p>
    </div>
    <div class="modal-tags">
      ${p.tech.map(t => `<span class="tag">${t}</span>`).join('')}
    </div>
  `;

  const modal = document.getElementById('projectModal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('projectModal').style.display = 'none';
  document.body.style.overflow = '';
}

function closeModalOnOverlay(e) {
  if (e.target === document.getElementById('projectModal')) closeModal();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });