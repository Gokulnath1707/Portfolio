import { Briefcase, Calendar } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      role: 'Business Analyst Intern',
      company: 'Company Name',
      period: 'Jun 2024 - Aug 2024',
      description: [
        'Conducted market research and competitive analysis to identify growth opportunities',
        'Developed financial models and forecasts to support strategic decision-making',
        'Collaborated with cross-functional teams to streamline business processes',
        'Presented insights and recommendations to senior management',
      ],
    },
    {
      role: 'Marketing Associate',
      company: 'Previous Company',
      period: 'Jan 2023 - May 2024',
      description: [
        'Managed social media campaigns resulting in 40% increase in engagement',
        'Analyzed customer data to optimize marketing strategies and ROI',
        'Coordinated with design and content teams for brand consistency',
        'Organized promotional events and product launches',
      ],
    },
    {
      role: 'Project Coordinator',
      company: 'Another Organization',
      period: 'Aug 2021 - Dec 2022',
      description: [
        'Led project teams in delivering initiatives on time and within budget',
        'Developed project timelines and monitored progress using Agile methodologies',
        'Facilitated stakeholder meetings and maintained clear communication channels',
        'Improved project efficiency by 25% through process optimization',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Experience
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"></div>
      </div>

      <div className="relative">
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-cyan-600 to-blue-600 transform md:-translate-x-1/2"></div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row gap-8 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="md:w-1/2"></div>

              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-blue-600 rounded-full transform -translate-x-1/2 md:translate-x-0 md:-translate-x-1/2 ring-4 ring-blue-100"></div>

              <div className="md:w-1/2 pl-8 md:pl-0">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-slate-200">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg text-white flex-shrink-0">
                      <Briefcase size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-1">
                        {exp.role}
                      </h3>
                      <p className="text-blue-600 font-medium mb-2">
                        {exp.company}
                      </p>
                      <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <Calendar size={16} />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.description.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-slate-700 leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-blue-600 before:font-bold"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
