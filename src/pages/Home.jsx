// Home.jsx — single page, all sections in order
import Hero       from '../components/sections/Hero';
import About      from '../components/sections/About';
import Experience from '../components/sections/Experience';
import Projects   from '../components/sections/Projects';
import Skills     from '../components/sections/Skills';
import Education  from '../components/sections/Education';
import Resume     from '../components/sections/Resume';
import Contact    from '../components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Resume />
      <Contact />
    </main>
  );
}
