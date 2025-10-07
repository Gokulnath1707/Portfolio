import { BarChart3, Briefcase, Code, TrendingUp } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Business Strategy',
      icon: <Briefcase size={28} />,
      skills: [
        { name: 'Strategic Planning', level: 90 },
        { name: 'Market Analysis', level: 85 },
        { name: 'Business Development', level: 88 },
        { name: 'Competitive Intelligence', level: 82 },
      ],
    },
    {
      title: 'Analytics & Data',
      icon: <BarChart3 size={28} />,
      skills: [
        { name: 'Financial Modeling', level: 92 },
        { name: 'Data Analysis', level: 88 },
        { name: 'Excel & Power BI', level: 90 },
        { name: 'Statistical Analysis', level: 85 },
      ],
    },
    {
      title: 'Technical Skills',
      icon: <Code size={28} />,
      skills: [
        { name: 'Python', level: 80 },
        { name: 'SQL', level: 85 },
        { name: 'Tableau', level: 82 },
        { name: 'R Programming', level: 75 },
      ],
    },
    {
      title: 'Leadership & Management',
      icon: <TrendingUp size={28} />,
      skills: [
        { name: 'Project Management', level: 88 },
        { name: 'Team Leadership', level: 85 },
        { name: 'Stakeholder Management', level: 90 },
        { name: 'Change Management', level: 83 },
      ],
    },
  ];

  const additionalSkills = [
    'Financial Analysis',
    'Marketing Strategy',
    'Operations Management',
    'Risk Management',
    'Negotiation',
    'Presentation Skills',
    'Agile Methodologies',
    'Supply Chain Management',
    'Corporate Finance',
    'Business Intelligence',
    'CRM Systems',
    'Process Improvement',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Skills & Expertise
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full mb-6"></div>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          A diverse skill set combining business acumen with technical proficiency
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg text-white">
                {category.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                {category.title}
              </h3>
            </div>

            <div className="space-y-4">
              {category.skills.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-700 font-medium">
                      {skill.name}
                    </span>
                    <span className="text-blue-600 font-semibold">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          Additional Competencies
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {additionalSkills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-slate-700 rounded-full border border-blue-200 hover:border-blue-400 transition-all transform hover:scale-105 font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
