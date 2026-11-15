// ProjectDetail.jsx — /projects/:slug — full project page
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft } from 'lucide-react';
import { GithubIcon } from '../components/ui/SocialIcons';
import { useEffect } from 'react';
import content from '../data/content';

const { projects } = content;

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const idx = projects.findIndex(p => p.slug === slug);
  const project = projects[idx];

  // Scroll to top on slug change
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!project) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-ink text-lg font-semibold">Project not found.</p>
        <Link to="/#projects" className="text-accent text-sm hover:underline flex items-center gap-1">
          <ChevronLeft size={15} /> Back to Projects
        </Link>
      </div>
    );
  }

  const prev = projects[idx - 1];
  const next = projects[idx + 1];

  return (
    <main className="min-h-dvh bg-bg pt-24 pb-20">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <Link
          to="/#projects"
          className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-accent
            transition-colors duration-150 mb-10"
        >
          <ChevronLeft size={16} aria-hidden /> Back to Projects
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map(t => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-medium">
                {t}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-bold text-ink mb-3">{project.title}</h1>
          <p className="text-lg text-ink-muted leading-relaxed max-w-2xl">{project.summary}</p>

          {/* Live / GitHub links */}
          <div className="flex flex-wrap gap-3 mt-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold
                  bg-accent text-white hover:bg-accent/90 transition-colors"
              >
                <ArrowUpRight size={15} aria-hidden /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold
                  border border-border bg-surface text-ink hover:border-accent hover:text-accent
                  transition-colors"
              >
                <GithubIcon size={15} /> GitHub
              </a>
            )}
          </div>
        </div>

        {/* Content grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-14">
          {/* Problem */}
          <div className="md:col-span-2 rounded-xl border border-border bg-surface p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-accent mb-3">The Problem</h2>
            <p className="text-sm text-ink-muted leading-relaxed">{project.problem}</p>
          </div>
          {/* My role */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-accent mb-3">My Role</h2>
            <p className="text-sm text-ink-muted leading-relaxed">{project.role}</p>
          </div>
        </div>

        {/* Screenshots */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mb-14">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-accent mb-4">Screenshots</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.screenshots.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  className="rounded-xl border border-border w-full object-cover"
                  loading="lazy"
                  width={640}
                  height={400}
                />
              ))}
            </div>
          </div>
        )}

        {/* Prev / Next navigation */}
        <div className="flex items-center justify-between gap-4 pt-8 border-t border-border">
          {prev ? (
            <Link
              to={`/projects/${prev.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted
                hover:text-accent transition-colors"
            >
              <ArrowLeft size={16} aria-hidden /> {prev.title}
            </Link>
          ) : <span />}
          {next ? (
            <Link
              to={`/projects/${next.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted
                hover:text-accent transition-colors"
            >
              {next.title} <ArrowRight size={16} aria-hidden />
            </Link>
          ) : <span />}
        </div>
      </div>
    </main>
  );
}
