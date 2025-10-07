import { GraduationCap, Target, Lightbulb, TrendingUp } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: <GraduationCap size={28} />,
      title: 'MBA Student',
      description: 'Currently pursuing Masters in Business Administration with a focus on strategic management and entrepreneurship.',
    },
    {
      icon: <Target size={28} />,
      title: 'Goal-Oriented',
      description: 'Driven by results and committed to achieving excellence in every project and initiative.',
    },
    {
      icon: <Lightbulb size={28} />,
      title: 'Innovative Thinker',
      description: 'Passionate about finding creative solutions to complex business challenges.',
    },
    {
      icon: <TrendingUp size={28} />,
      title: 'Growth Focused',
      description: 'Continuously learning and adapting to the evolving business landscape.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          About Me
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="relative">
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 p-1">
            <div className="w-full h-full bg-slate-100 rounded-2xl flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-6xl font-bold mb-4">
                  YN
                </div>
                <p className="text-slate-600 text-lg">Your Photo Here</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-slate-900">
            Transforming Vision into Reality
          </h3>
          <p className="text-lg text-slate-700 leading-relaxed">
            As an MBA student with a passion for business strategy and innovation, I bring a unique blend of analytical thinking and creative problem-solving to every challenge.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            My journey in business education has equipped me with comprehensive knowledge in finance, marketing, operations, and leadership. I'm dedicated to leveraging these skills to drive meaningful impact in the organizations I work with.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            Beyond academics, I actively engage in case competitions, consulting projects, and networking events to bridge the gap between theory and practice.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-slate-200"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center text-white mb-4">
              {item.icon}
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">
              {item.title}
            </h4>
            <p className="text-slate-600 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
