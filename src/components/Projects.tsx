import { ExternalLink, Github, Folder } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Market Entry Strategy Analysis',
      category: 'Strategy Consulting',
      description: 'Conducted comprehensive market analysis for a tech startup looking to enter the Southeast Asian market. Developed go-to-market strategy and financial projections.',
      tags: ['Market Research', 'Financial Modeling', 'Strategy'],
      link: '#',
      github: '#',
    },
    {
      title: 'Digital Transformation Roadmap',
      category: 'Operations',
      description: 'Created a digital transformation roadmap for a traditional retail company. Identified key areas for automation and digital innovation.',
      tags: ['Digital Strategy', 'Change Management', 'Process Optimization'],
      link: '#',
      github: '#',
    },
    {
      title: 'Customer Segmentation Analysis',
      category: 'Marketing Analytics',
      description: 'Performed data-driven customer segmentation for an e-commerce platform using clustering algorithms and behavioral analysis.',
      tags: ['Data Analytics', 'Python', 'Marketing'],
      link: '#',
      github: '#',
    },
    {
      title: 'Sustainability Initiative Business Case',
      category: 'Corporate Strategy',
      description: 'Developed a business case for implementing sustainable practices in manufacturing operations, including ROI analysis and implementation plan.',
      tags: ['Sustainability', 'Business Planning', 'Financial Analysis'],
      link: '#',
      github: '#',
    },
    {
      title: 'Competitive Intelligence Dashboard',
      category: 'Business Intelligence',
      description: 'Built an interactive dashboard to track competitor activities, market trends, and industry benchmarks for strategic decision-making.',
      tags: ['Data Visualization', 'Power BI', 'Market Analysis'],
      link: '#',
      github: '#',
    },
    {
      title: 'Supply Chain Optimization',
      category: 'Operations Management',
      description: 'Analyzed and optimized supply chain operations for a logistics company, resulting in 20% cost reduction and improved delivery times.',
      tags: ['Supply Chain', 'Operations', 'Lean Management'],
      link: '#',
      github: '#',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Projects
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full mb-6"></div>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          A collection of academic and professional projects showcasing analytical thinking and strategic problem-solving
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-slate-200"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg text-white">
                  <Folder size={24} />
                </div>
                <div className="flex gap-2">
                  <a
                    href={project.github}
                    className="p-2 text-slate-600 hover:text-blue-600 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={project.link}
                    className="p-2 text-slate-600 hover:text-blue-600 transition-colors"
                    aria-label="External link"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>

              <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full mb-3">
                {project.category}
              </span>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {project.title}
              </h3>

              <p className="text-slate-600 mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs text-slate-600 bg-slate-100 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
