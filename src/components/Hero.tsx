import { ArrowDown, Linkedin, Mail, Github, FileText } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-slate-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="inline-block p-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6">
            <div className="bg-slate-900 rounded-full p-8">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                YN
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Your Name
        </h1>

        <p className="text-xl md:text-2xl text-blue-200 mb-4 font-light">
          MBA Student & Business Strategy Enthusiast
        </p>

        <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Passionate about driving business growth through data-driven insights, strategic planning, and innovative solutions.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get in Touch
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/20 transition-all border border-white/30"
          >
            View Projects
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 mb-12">
          <a
            href="#"
            className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin className="text-white" size={24} />
          </a>
          <a
            href="#"
            className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all transform hover:scale-110"
            aria-label="Email"
          >
            <Mail className="text-white" size={24} />
          </a>
          <a
            href="#"
            className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all transform hover:scale-110"
            aria-label="GitHub"
          >
            <Github className="text-white" size={24} />
          </a>
          <a
            href="#"
            className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all transform hover:scale-110"
            aria-label="Resume"
          >
            <FileText className="text-white" size={24} />
          </a>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          className="animate-bounce inline-block p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
          aria-label="Scroll down"
        >
          <ArrowDown className="text-white" size={32} />
        </button>
      </div>
    </div>
  );
};

export default Hero;
