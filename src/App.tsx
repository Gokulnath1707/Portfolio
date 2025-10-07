import { useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Navigation from './components/Navigation';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      <main>
        <section id="home" className="min-h-screen">
          <Hero />
        </section>

        <section id="about" className="min-h-screen py-20">
          <About />
        </section>

        <section id="experience" className="min-h-screen py-20">
          <Experience />
        </section>

        <section id="projects" className="min-h-screen py-20">
          <Projects />
        </section>

        <section id="certificates" className="min-h-screen py-20">
          <Certificates />
        </section>

        <section id="skills" className="min-h-screen py-20">
          <Skills />
        </section>

        <section id="contact" className="min-h-screen py-20">
          <Contact />
        </section>
      </main>

      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">© 2025 Your Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
