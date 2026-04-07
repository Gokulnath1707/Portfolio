window.projectsData = [
  {
    id: 'leave-mgmt',
    title: 'Leave Management System',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=800',
    badge: { label: 'New', className: 'badge-new' },
    summary:
      'Developed a digital Leave Management System for Hostel Dispensary, replacing manual logbooks with a responsive web application for data entry and automated record generation using Google Apps Script and Google Sheets.',
    overview:
      'A comprehensive Leave Management System designed to digitize and streamline the entire employee leave lifecycle, from request submission to manager approval and record keeping.',
    features: [
      'Digital leave request submission with streamlined form-based entry',
      'Automated record generation through Google Apps Script workflows',
      'Centralized leave data management using Google Sheets',
      'Faster retrieval of past leave records compared with manual registers',
      'Reduced paperwork and improved administrative accuracy'
    ],
    tech: ['Google Sheets', 'Google Apps Script', 'Web App', 'Workflow Automation'],
    outcome:
      'Reduced manual administrative effort and created a more reliable, searchable leave tracking process.',
    links: {
      github: '',
      live: ''
    }
  },
  {
    id: 'ai-resume',
    title: 'AI Resume Analyser',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800',
    badge: { label: 'AI', className: 'badge-ai' },
    summary:
      'Developing an AI Resume Analyzer, a full-stack web app that uses AI to analyze resumes, match job descriptions, and review LinkedIn profiles, powered by Flask, Groq API, and JavaScript.',
    overview:
      'An intelligent resume analysis platform that compares resumes with job requirements and provides actionable feedback for stronger candidate-job alignment.',
    features: [
      'Resume parsing and structured information extraction',
      'Job description matching for relevance scoring',
      'AI-assisted feedback on resume improvements',
      'LinkedIn profile review support for a broader candidate snapshot',
      'Full-stack workflow built around Python and JavaScript'
    ],
    tech: ['Python', 'Flask', 'Groq API', 'JavaScript', 'NLP', 'AI'],
    outcome:
      'Speeds up resume evaluation and helps users understand how well their profile aligns with specific roles.',
    links: {
      github: 'https://github.com/Gokulnath1707/AI_ResumeAnalyser',
      live: ''
    }
  },
  {
    id: 'dissertation',
    title: 'Consumer Behavior in Sustainable Personal Care',
    image: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?q=80&w=800',
    badge: { label: 'Research', className: 'badge-research' },
    summary:
      'Researching how product design elements influence consumer buying behavior in sustainable personal care products.',
    overview:
      'MBA dissertation focused on how packaging, labeling, color, and sustainability cues shape consumer perceptions and purchase decisions in the personal care segment.',
    features: [
      'Research framework connecting design elements with buying behavior',
      'Primary consumer data collection through survey-based methods',
      'Analysis of eco-labeling, packaging appeal, and sustainability perception',
      'Insights for brand strategy in sustainable personal care markets',
      'Recommendations grounded in consumer behavior research'
    ],
    tech: ['Dissertation', 'Consumer Behavior', 'Sustainability', 'Market Research', 'SPSS'],
    outcome:
      'Generates research-backed guidance for brands seeking stronger market positioning through sustainable product design.',
    links: {
      github: '',
      live: ''
    }
  },
  {
    id: 'iv-monitor',
    title: 'Smart IV Drip Monitoring System',
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=800',
    badge: { label: 'IoT', className: 'badge-iot' },
    summary:
      'Built an IoT-based IV monitoring system with real-time tracking and automated alert notifications, reducing manual monitoring and improving patient safety.',
    overview:
      'An IoT-based healthcare solution that tracks IV drip flow in real time and alerts caretakers when attention is needed, helping reduce risk in hospital environments.',
    features: [
      'Real-time IV drip monitoring using hardware sensors',
      'Automated alerts when drip flow becomes irregular or low',
      'Live data synchronization for visibility across devices',
      'Frontend dashboard for monitoring patient-wise IV status',
      'Reduced dependency on repeated manual checks'
    ],
    tech: ['IoT', 'Arduino', 'Firebase', 'Embedded C/C++', 'HTML', 'CSS', 'JavaScript'],
    outcome:
      'Improved patient safety and reduced caregiver workload with continuous, automated monitoring.',
    links: {
      github: 'https://github.com/Gokulnath1707/smartiv.github.io',
      live: ''
    }
  },
  {
    id: 'ceo-letter-insights',
    title: 'CEO Letter Insights',
    image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=800',
    badge: { label: 'Analytics', className: 'badge-ai' },
    summary:
      'A master\'s-level text analytics study of five years of CEO letters from India\'s five largest IT companies to understand how leaders communicate strategy, disruption response, and differentiation.',
    overview:
      'This project studies 25 annual report CEO letters from TCS, Infosys, HCLTech, Tech Mahindra, and Wipro to decode whether top executives genuinely communicate with distinct strategic thinking or largely use similar corporate language with minor variation.',
    features: [
      'Processed five years of CEO letters from India\'s five largest IT companies',
      'Applied FinBERT-based sentiment analysis to identify tone across leadership communication',
      'Used NMF topic modelling and TF-IDF signature extraction to surface recurring and unique themes',
      'Measured strategic pillar emphasis, readability, hedging ratio, and forward-looking statement density',
      'Built the analysis to compare how CEOs communicate strategy during disruption and growth cycles'
    ],
    tech: ['Python', 'NLP', 'FinBERT', 'NMF', 'TF-IDF', 'Text Analytics'],
    outcome:
      'Revealed how executive language can be quantitatively compared to uncover strategic patterns, communication style differences, and leadership positioning across major IT firms.',
    links: {
      github: 'https://github.com/Gokulnath1707/CEO_Letter_Insights',
      live: ''
    }
  },
  {
    id: 'online-shopper-intention',
    title: 'Online Shopper Purchase Intention Prediction',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800',
    badge: { label: 'ML', className: 'badge-ai' },
    summary:
      'A machine learning project that predicts whether an online visitor will complete a purchase using session behavior, visitor profile, and browsing activity.',
    overview:
      'This project uses the Online Shoppers Purchasing Intention dataset to analyze browsing behavior, session-level characteristics, and visitor attributes in order to predict purchase completion and support real-time intervention for e-commerce teams.',
    features: [
      'Built a full ML pipeline with data cleaning, preprocessing, and exploratory data analysis',
      'Handled class imbalance using SMOTE to improve buyer prediction reliability',
      'Trained and compared Logistic Regression, Decision Tree, Random Forest, and XGBoost models',
      'Evaluated models using Recall, Precision, F1 Score, and ROC-AUC',
      'Designed a real-time intervention framework for discount popups, chatbot support, and cart abandonment reduction'
    ],
    tech: ['Python', 'Machine Learning', 'SMOTE', 'Decision Tree', 'Random Forest', 'XGBoost'],
    outcome:
      'Enabled a practical purchase-probability workflow where e-commerce teams can intervene earlier, reduce abandonment, and protect revenue using model-driven triggers.',
    links: {
      github: 'https://github.com/Gokulnath1707/Online_Shopper_Purchase_Intention_Prediction/tree/main',
      live: ''
    }
  }
];
