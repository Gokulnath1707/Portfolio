// Footer.jsx — minimal footer
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import content from '../../data/content';

const { meta, footer } = content;

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-8
        flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-ink-muted">{footer.copy}</p>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${meta.email}`}
            aria-label="Email"
            className="text-ink-muted hover:text-accent transition-colors"
          >
            <Mail size={18} strokeWidth={1.75} />
          </a>
          <a
            href={meta.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-ink-muted hover:text-accent transition-colors"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={meta.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-ink-muted hover:text-accent transition-colors"
          >
            <GithubIcon size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
