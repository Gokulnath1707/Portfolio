// Hero.jsx — name, role, CTAs, Lanyard badge, social links, Aurora background
import { Mail, ArrowDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { useEffect, useState } from 'react';
import content from '../../data/content';
import Aurora from '../reactbits/Aurora';
import ElectricLogo from '../ElectricLogo';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const { hero, meta } = content;

export default function Hero() {
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-dvh flex items-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Background */}
      <Aurora isMobile={isMobile} className="opacity-80" />

      <div className="relative z-10 max-w-content mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <div className="flex flex-col gap-6">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest">
              {hero.greeting}
            </p>

            <h1 className="text-5xl sm:text-6xl font-bold text-ink leading-tight">{hero.name}</h1>

            <p className="text-xl text-ink-muted font-medium">{hero.role}</p>

            <p className="text-base text-ink-muted max-w-lg leading-relaxed">
              {hero.valueStatement}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mt-2">
              <a
                href={hero.cta.primary.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                  bg-accent text-white font-semibold hover:bg-accent/90
                  transition-colors duration-150 text-sm"
              >
                {hero.cta.primary.label}
              </a>
              <a
                href={hero.cta.secondary.href}
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                  border border-border bg-surface text-ink font-semibold
                  hover:border-accent hover:text-accent
                  transition-colors duration-150 text-sm"
              >
                {hero.cta.secondary.label}
              </a>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4 mt-1">
              <a
                href={`mailto:${meta.email}`}
                aria-label="Email Gokulnath"
                className="text-ink-muted hover:text-accent transition-colors"
              >
                <Mail size={20} strokeWidth={1.75} />
              </a>
              <a
                href={meta.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-ink-muted hover:text-accent transition-colors"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href={meta.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-ink-muted hover:text-accent transition-colors"
              >
                <GithubIcon size={20} />
              </a>
            </div>
          </div>

          {/* Right — Lanyard 3D badge */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-72 h-72 sm:w-80 sm:h-80" aria-hidden="true">
              <ElectricLogo
                color="#C4622D"
                glowColor="#E07A42"
                scale={0.9}
                interactive={!reduced}
                speed={reduced ? 0 : 2.5}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1
          text-ink-muted animate-bounce" aria-hidden>
          <ArrowDown size={18} strokeWidth={1.5} />
        </div>
      </div>
    </section>
  );
}
