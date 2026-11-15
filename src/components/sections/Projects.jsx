// Projects.jsx — grid of SpotlightCards linking to detail pages
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../ui/SocialIcons';
import content from '../../data/content';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeading from '../ui/SectionHeading';
import SpotlightCard from '../reactbits/SpotlightCard';
import ScrollReveal from '../reactbits/ScrollReveal';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const { projects } = content;

export default function Projects() {
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="projects" className="bg-surface">
      <SectionHeading id="projects" label="Things I've built" title="Projects" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ScrollReveal key={project.slug} delay={i * 90} direction="up" reducedMotion={reduced}>
            <SpotlightCard className="h-full">
              <div className="p-5 flex flex-col h-full gap-4">
                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 3).map(tech => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Title + summary */}
                <div className="flex-1">
                  <h3 className="font-semibold text-ink text-base mb-1.5">{project.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{project.summary}</p>
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
                  >
                    View details <ArrowUpRight size={13} aria-hidden />
                  </Link>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto text-ink-muted hover:text-accent transition-colors"
                      aria-label={`GitHub — ${project.title}`}
                    >
                      <GithubIcon size={16} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink-muted hover:text-accent transition-colors"
                      aria-label={`Live demo — ${project.title}`}
                    >
                      <ArrowUpRight size={16} strokeWidth={1.75} />
                    </a>
                  )}
                </div>
              </div>
            </SpotlightCard>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
