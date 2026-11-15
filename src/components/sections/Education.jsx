// Education.jsx — education cards + certifications + accolades
import { GraduationCap, Award, Star } from 'lucide-react';
import content from '../../data/content';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../reactbits/ScrollReveal';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const { education, certifications, accolades } = content;

export default function Education() {
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="education">
      <SectionHeading id="education" label="Academic background" title="Education" />

      {/* Education cards */}
      <div className="flex flex-col gap-4 mb-14">
        {education.map((edu, i) => (
          <ScrollReveal key={i} delay={i * 80} direction="up" reducedMotion={reduced}>
            <div className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <GraduationCap size={18} strokeWidth={1.75} className="text-accent" aria-hidden />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-ink text-base">{edu.degree}</h3>
                <p className="text-sm text-ink-muted">{edu.institution}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-accent">{edu.grade}</p>
                <p className="text-xs text-ink-muted">{edu.period}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Two-column: Certifications + Accolades */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Certifications */}
        <ScrollReveal direction="up" delay={100} reducedMotion={reduced}>
          <div>
            <h3 className="text-base font-semibold text-ink mb-4 flex items-center gap-2">
              <Award size={18} strokeWidth={1.75} className="text-accent" aria-hidden />
              Certifications
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {certifications.map((cert, i) => (
                <li key={i} className="text-sm border-l-2 border-accent/30 pl-3">
                  <p className="font-medium text-ink">{cert.name}</p>
                  <p className="text-ink-muted text-xs">
                    {cert.issuer} · {cert.status || cert.year}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        {/* Accolades */}
        <ScrollReveal direction="up" delay={160} reducedMotion={reduced}>
          <div>
            <h3 className="text-base font-semibold text-ink mb-4 flex items-center gap-2">
              <Star size={18} strokeWidth={1.75} className="text-accent" aria-hidden />
              Accolades
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {accolades.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-muted">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
