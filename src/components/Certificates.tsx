import { Award, ExternalLink, Calendar } from 'lucide-react';

const Certificates = () => {
  const certificates = [
    {
      title: 'Financial Modeling & Valuation',
      issuer: 'Wall Street Prep',
      date: 'March 2024',
      credentialId: 'WSP-FM-123456',
      description: 'Comprehensive financial modeling techniques including DCF, LBO, and M&A valuation',
      link: '#',
    },
    {
      title: 'Digital Marketing Professional',
      issuer: 'Google',
      date: 'January 2024',
      credentialId: 'GOOGLE-DM-789012',
      description: 'Digital marketing strategies, SEO, SEM, and analytics',
      link: '#',
    },
    {
      title: 'Business Analytics Specialization',
      issuer: 'Coursera - Wharton',
      date: 'December 2023',
      credentialId: 'WHARTON-BA-345678',
      description: 'Data-driven decision making, predictive analytics, and business intelligence',
      link: '#',
    },
    {
      title: 'Project Management Professional',
      issuer: 'PMI',
      date: 'October 2023',
      credentialId: 'PMI-PMP-901234',
      description: 'Project management methodologies, leadership, and risk management',
      link: '#',
    },
    {
      title: 'Strategic Leadership',
      issuer: 'Harvard Business School Online',
      date: 'August 2023',
      credentialId: 'HBS-SL-567890',
      description: 'Leadership frameworks, organizational behavior, and change management',
      link: '#',
    },
    {
      title: 'Data Science for Business',
      issuer: 'MIT Professional Education',
      date: 'June 2023',
      credentialId: 'MIT-DSB-234567',
      description: 'Machine learning applications, data visualization, and statistical analysis',
      link: '#',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Certificates & Achievements
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full mb-6"></div>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Professional certifications and continuous learning achievements
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {certificates.map((cert, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-slate-200 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-bl-full"></div>

            <div className="relative">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg text-white flex-shrink-0">
                  <Award size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-blue-600 font-medium mb-2">
                    {cert.issuer}
                  </p>
                </div>
              </div>

              <p className="text-slate-700 mb-4 leading-relaxed">
                {cert.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <Calendar size={16} />
                  <span>Issued: {cert.date}</span>
                </div>
                <div className="text-slate-600 text-sm">
                  <span className="font-medium">Credential ID:</span> {cert.credentialId}
                </div>
              </div>

              <a
                href={cert.link}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                View Certificate
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
