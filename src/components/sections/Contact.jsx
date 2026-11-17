// Contact.jsx — direct email and social links
import { Mail, MapPin } from 'lucide-react';
import { GithubIcon, InstagramIcon, LinkedinIcon } from '../ui/SocialIcons';
import content from '../../data/content';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeading from '../ui/SectionHeading';

const { contact, meta } = content;

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: meta.linkedin, Icon: LinkedinIcon },
  { label: 'GitHub', href: meta.github, Icon: GithubIcon },
  { label: 'Instagram', href: meta.instagram, Icon: InstagramIcon },
];

export default function Contact() {
  return (
    <SectionWrapper id="contact" className="bg-surface">
      <SectionHeading id="contact" label="Say hello" title={contact.heading} />

      <div className="rounded-3xl border border-border bg-bg p-6 shadow-card sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
              {meta.availability}
            </p>
            <h3 className="mb-4 text-2xl font-semibold text-ink sm:text-3xl">
              Let&apos;s make something meaningful.
            </h3>
            <p className="mb-6 max-w-xl text-base leading-relaxed text-ink-muted">
              {contact.description}
            </p>
            <a
              href={`mailto:${meta.email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3
                text-sm font-semibold text-white transition-colors hover:bg-accent/90"
            >
              <Mail size={21} strokeWidth={1.75} aria-hidden />
              Email me
            </a>
            <p className="mt-3 text-sm text-ink-muted">{meta.email}</p>
          </div>

          <nav aria-label="Social profiles" className="flex flex-wrap gap-3 lg:flex-col">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-3 rounded-xl border border-border
                  px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-accent
                  hover:text-accent"
              >
                <Icon size={22} className="text-accent" aria-hidden />
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex items-center gap-2 border-t border-border pt-5 text-sm text-ink-muted">
          <MapPin size={20} strokeWidth={1.75} className="text-accent" aria-hidden />
          {meta.location}
        </div>
      </div>
    </SectionWrapper>
  );
}
