// Experience.jsx — vertical timeline
import { Briefcase } from 'lucide-react';
import content from '../../data/content';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../reactbits/ScrollReveal';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const { experience } = content;

export default function Experience() {
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="experience">
      <SectionHeading id="experience" label="Where I've worked" title="Experience" />

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-2 bottom-2 w-px bg-border hidden sm:block" aria-hidden />

        <ul className="flex flex-col gap-10" role="list">
          {experience.map((job, i) => (
            <ScrollReveal key={i} delay={i * 100} direction="up" reducedMotion={reduced}>
              <li className="relative sm:pl-14">
                {/* Dot on timeline */}
                <div
                  className="hidden sm:flex absolute left-0 top-1 w-8 h-8 rounded-full
                    border-2 border-accent bg-bg items-center justify-center"
                  aria-hidden
                >
                  <Briefcase size={14} strokeWidth={2} className="text-accent" />
                </div>

                <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-ink">{job.role}</h3>
                      <p className="text-sm font-medium text-accent">{job.company}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-medium bg-accent/10 text-accent px-2.5 py-1 rounded-full">
                        {job.type}
                      </span>
                      <p className="text-xs text-ink-muted mt-1">{job.period}</p>
                      <p className="text-xs text-ink-muted">{job.location}</p>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-2 mt-3" role="list">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-ink-muted leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}
