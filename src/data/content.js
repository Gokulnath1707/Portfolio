// ============================================================
// content.js — ALL portfolio copy lives here.
// Edit this file; never touch component files for text changes.
// ============================================================

const content = {
  // ── Meta ──────────────────────────────────────────────────
  meta: {
    name:        'Gokulnath B',
    initials:    'GB',
    role:        'Product Manager & Developer',
    tagline:     'Turning user needs into AI-powered products that make a real impact.',
    location:    'Bengaluru, India',
    email:       'bgokulnath567@gmail.com',
    phone:       '+91 7339397567',
    linkedin:    'https://www.linkedin.com/in/gokulnath-b', // TODO: confirm exact URL from your LinkedIn
    github:      'https://github.com/gokulnath',            // TODO: confirm exact GitHub username
    portfolio:   'https://gokulnath.dev',                   // TODO: update once deployed
    availability: 'Open to PM & full-stack roles',
  },

  // ── Hero ──────────────────────────────────────────────────
  hero: {
    greeting:    'Hi, I\'m',
    name:        'Gokulnath B',
    role:        'Risk Management Analyst | Aspiring Product Manager',
    valueStatement: 'I work at the intersection of technology, business, and AI — building products grounded in data, designed around users.',
    cta: {
      primary:   { label: 'View Projects', href: '#projects' },
      secondary: { label: 'Download Resume', href: '/resume.pdf' },
    },
    photo:       '/images/gklog.png',
  },

  // ── About ─────────────────────────────────────────────────
  about: {
    bio: [
      'I hold an MBA in Marketing & Analytics from Sri Sathya Sai Institute of Higher Learning and a BCA from NGM College. My work sits at the junction of product thinking, data, and software engineering.',
      'At TCS, I support risk management operations — flagging issues early through data analysis and helping coordinate ongoing marketing campaigns. Before that, I interned at ShorterLoop, where I benchmarked ten PM platforms and built 30+ product management templates that went directly into their product library.',
      'Outside of corporate work, I build websites for small businesses and have shipped projects ranging from an AI-powered Tamil literature chatbot to a full-stack alumni management system. I write Tamil poetry too — discipline in one craft sharpens thinking in another.',
    ],
    quickFacts: [
      { label: 'Location',      value: 'Bengaluru, India' },
      { label: 'Focus',         value: 'Product Management, AI, Analytics' },
      { label: 'Availability',  value: 'Open to opportunities' },
      { label: 'Languages',     value: 'Tamil, English' },
    ],
    photo: '/images/Lanyard%20image.png',
  },

  // ── Experience ────────────────────────────────────────────
  experience: [
    {
      company:   'Tata Consultancy Services',
      role:      'Risk Management Analyst',
      type:      'Full-time',
      period:    'July 2026 — Present',
      location:  'Bengaluru, India',
      bullets: [
        'Support identifying, assessing, and monitoring business and operational risks using data-driven analysis to flag issues early.',
        'Prepare risk reports and documentation for stakeholders in line with TCS\'s risk and compliance frameworks.',
        'Coordinate an ongoing marketing campaign — handling execution, stakeholder alignment, and progress tracking.',
      ],
    },
    {
      company:   'Tata Consultancy Services',
      role:      'BFSI Analyst Relations Intern',
      type:      'Internship',
      period:    'May 2025 - July 2025',
      location:  'Bengaluru, India',
      bullets: [
        'Mapped 160+ key industry analysts and their coverage areas in the BFSI domain and across Tech domains',
        'Created a comprehensive analyst database to support TCS\'s analyst relations strategy and engagement planning.',
        'Developed a structured workflow for the Sentiment Analysis of vendor evaluation reports using Python.',
        'Performed competitive intelligence for 7 peers by benchmarking to support strategic positioning.',
        ],
    },
    {
      company:   'ShorterLoop',
      role:      'Template Research Intern',
      type:      'Internship',
      period:    'Feb 2025 — Apr 2025',
      location:  'Remote',
      bullets: [
        'Benchmarked 10 product management platforms to surface template structures, feature gaps, and improvement opportunities.',
        'Designed and developed 30+ structured PM templates integrated into ShorterLoop\'s platform, strengthening its template library and user value proposition.',
      ],
    },
    {
      company:   'Freelance',
      role:      'Web Developer',
      type:      'Freelance',
      period:    'Ongoing',
      location:  'Remote',
      bullets: [
        'Design and build responsive websites for small businesses, owning the full cycle from requirements gathering to delivery.',
      ],
    },
  ],

  // ── Projects ──────────────────────────────────────────────
  projects: [
    {
      slug:       'thirukkural-ai',
      title:      'Thirukkural AI Chat',
      summary:    'A retrieval-augmented chatbot that answers questions grounded in the Thirukkural using vector search.',
      problem:    'The Thirukkural is one of Tamil literature\'s most revered texts, but finding contextually accurate answers across its 1,330 couplets is hard for general audiences. Existing tools either keyword-match or hallucinate meaning.',
      role:       'Solo developer — designed the RAG pipeline, built the FAISS index, integrated the embedding model, and implemented the prosodic validation engine.',
      techStack:  ['Python', 'FAISS', 'BAAI Embeddings', 'RAG', 'FastAPI'],
      liveUrl:    null, // TODO: add if deployed
      githubUrl:  null, // TODO: add GitHub link
      screenshots: [],  // TODO: add screenshot paths
      featured:   true,
    },
    {
      slug:       'leave-management',
      title:      'Leave Management System — Hostel Dispensary',
      summary:    'Replaced paper logbooks with a web app for data entry and automated record generation.',
      problem:    'The hostel dispensary tracked student leave manually in logbooks — error-prone, hard to query, and impossible to audit at scale.',
      role:       'Sole developer. Built the full-stack web application and automated report generation using Google AppScript and Sheets.',
      techStack:  ['Google AppScript', 'Google Sheets', 'HTML', 'CSS', 'JavaScript'],
      liveUrl:    null,
      githubUrl:  null,
      screenshots: [],
      featured:   true,
    },
    {
      slug:       'alma-matters',
      title:      'Alma Matters — Alumni Management System',
      summary:    'A full-stack platform for alumni networking, event management, and role-based access for Arulmigu Palaniandavar College.',
      problem:    'The college had no structured way for alumni to stay connected, find each other by batch or department, or receive event announcements.',
      role:       'Led backend architecture — designed the database schema, implemented role-based access control, alumni directory, and event modules.',
      techStack:  ['React.js', 'Bootstrap 5', 'Flask', 'Supabase'],
      liveUrl:    null,
      githubUrl:  null,
      screenshots: [],
      featured:   true,
    },
  ],

  // ── Skills ────────────────────────────────────────────────
  skills: {
    'Data Analytics & Visualisation': [
      { name: 'Python',    icon: null },
      { name: 'SQL',       icon: null },
      { name: 'Power BI',  icon: null },
      { name: 'Excel',     icon: null },
    ],
    'Frontend Development': [
      { name: 'React.js',    icon: null },
      { name: 'JavaScript',  icon: null },
      { name: 'HTML & CSS',  icon: null },
      { name: 'Tailwind CSS',icon: null },
    ],
    'Backend & Database': [
      { name: 'Flask',      icon: null },
      { name: 'Supabase',   icon: null },
      { name: 'AppScript',  icon: null },
    ],
    'Product & Business': [
      { name: 'Product Research',          icon: null },
      { name: 'Competitive Benchmarking',  icon: null },
      { name: 'Market Research',           icon: null },
      { name: 'Data-Driven Decisions',     icon: null },
    ],
    'Tools': [
      { name: 'Figma',  icon: null },
      { name: 'Git',    icon: null },
      { name: 'FAISS',  icon: null },
    ],
  },

  // ── All skills flat list (for LogoLoop marquee) ───────────
  skillsMarquee: [
    'Python', 'SQL', 'Power BI', 'Excel',
    'React.js', 'JavaScript', 'HTML & CSS', 'Tailwind CSS',
    'Flask', 'Supabase', 'AppScript',
    'Product Research', 'Market Research',
    'Figma', 'Git', 'FAISS',
  ],

  // ── Education ─────────────────────────────────────────────
  education: [
    {
      degree:      'MBA in Marketing and Analytics',
      institution: 'Sri Sathya Sai Institute of Higher Learning',
      period:      '2024 — 2026',
      grade:       '81%',
    },
    {
      degree:      'BCA (Computer Applications)',
      institution: 'NGM College, Bharathiar University',
      period:      '2021 — 2024',
      grade:       '85%',
    },
    {
      degree:      'Higher Secondary Education',
      institution: 'Forest Hill Academy M.H.S.S',
      period:      '2019 — 2021',
      grade:       '91%',
    },
  ],

  // ── Certifications ────────────────────────────────────────
  certifications: [
    { name: 'IBM Product Manager Professional Certificate', issuer: 'IBM / Coursera', status: 'Pursuing' },
    { name: 'Python for Data Science',                      issuer: 'Udemy',          year: '2025' },
    { name: 'Tata Data Visualisation: Effective Insights',  issuer: 'Forage',         year: '2024' },
    { name: 'Diploma in Acupuncture and Human Science',     issuer: 'Cumbum Academy / Zain University', year: '2022' },
  ],

  // ── Accolades ─────────────────────────────────────────────
  accolades: [
    'Proficiency Award for outstanding academic performance in BCA (2022–23).',
    'Author of the Tamil poetry book "Ilaigalin Narambugal"; contributed to four published anthologies.',
    'Conference Presenter on Cultural Diplomacy and Soft Power in G20 Countries (2022).',
  ],

  // ── Contact ───────────────────────────────────────────────
  contact: {
    heading:     'Get in touch',
    description: 'Whether you have a role to discuss, a project to collaborate on, or just want to connect — my inbox is open.',
    // EmailJS credentials — fill these in from your EmailJS dashboard
    emailjs: {
      serviceId:  'TODO_SERVICE_ID',
      templateId: 'TODO_TEMPLATE_ID',
      publicKey:  'TODO_PUBLIC_KEY',
    },
  },

  // ── Footer ────────────────────────────────────────────────
  footer: {
    copy: `© ${new Date().getFullYear()} Gokulnath B. Built with React & Tailwind.`,
  },
};

export default content;
