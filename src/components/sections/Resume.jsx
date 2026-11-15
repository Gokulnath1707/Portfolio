// Resume.jsx — download section
import { FileDown, ExternalLink } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeading from '../ui/SectionHeading';

export default function Resume() {
  return (
    <SectionWrapper id="resume">
      <SectionHeading id="resume" label="My CV" title="Resume" />

      <div className="rounded-xl border border-border bg-surface p-8 flex flex-col sm:flex-row
        items-center justify-between gap-6">
        <div>
          <h3 className="font-semibold text-ink text-lg mb-1">Gokulnath B — Resume</h3>
          <p className="text-sm text-ink-muted">
            MBA in Marketing & Analytics · Risk Management Analyst · Full-Stack Developer
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold
              border border-border bg-bg text-ink hover:border-accent hover:text-accent
              transition-colors duration-150"
          >
            <ExternalLink size={15} aria-hidden />
            Preview
          </a>
          <a
            href="/resume.pdf"
            download="Gokulnath_B_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold
              bg-accent text-white hover:bg-accent/90 transition-colors duration-150"
          >
            <FileDown size={15} aria-hidden />
            Download PDF
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
