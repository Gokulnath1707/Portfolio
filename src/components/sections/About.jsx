// About.jsx — bio, photo, quick facts, ScrollReveal animation
import { MapPin, Briefcase, Globe, BookOpen } from 'lucide-react';
import content from '../../data/content';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../reactbits/ScrollReveal';
import Lanyard from '../Lanyard';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const { about } = content;

const FACT_ICONS = { Location: MapPin, Focus: Briefcase, Availability: Globe, Languages: BookOpen };

export default function About() {
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="about" className="bg-surface">
      <SectionHeading id="about" label="Who I am" title="About Me" />

      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Bio — 3 columns */}
        <div className="lg:col-span-3 flex flex-col gap-5">
          {about.bio.map((para, i) => (
            <ScrollReveal key={i} delay={i * 80} direction="up" reducedMotion={reduced}>
              <p className="text-base text-ink-muted leading-relaxed">{para}</p>
            </ScrollReveal>
          ))}
        </div>

        {/* Right column — photo + quick facts */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Interactive profile badge */}
          <ScrollReveal direction="left" delay={120} reducedMotion={reduced}>
            <div
              className="h-[26rem] w-full max-w-sm mx-auto lg:mx-0"
              aria-label="Interactive profile lanyard"
            >
              <Lanyard
                frontImage={about.photo}
                backImage={about.photo}
                cardColor="#EFEBE3"
                strapColor="#C4622D"
                size={0.7}
                interactive={!reduced}
                intro={!reduced}
                className="h-full w-full"
              />
            </div>
          </ScrollReveal>

          {/* Quick facts */}
          <ScrollReveal direction="left" delay={200} reducedMotion={reduced}>
            <ul className="flex flex-col gap-3" role="list">
              {about.quickFacts.map(({ label, value }) => {
                const Icon = FACT_ICONS[label] || MapPin;
                return (
                  <li key={label} className="flex items-start gap-3">
                    <Icon size={16} strokeWidth={1.75} className="text-accent mt-0.5 shrink-0" aria-hidden />
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</span>
                      <p className="text-sm text-ink">{value}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </SectionWrapper>
  );
}
