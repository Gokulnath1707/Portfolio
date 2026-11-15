// Skills.jsx — grouped skill list + LogoLoop marquee
import content from '../../data/content';
import {
  SiFigma,
  SiFlask,
  SiGit,
  SiGoogleanalytics,
  SiGoogleappsscript,
  SiHtml5,
  SiHuggingface,
  SiJavascript,
  SiMysql,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
} from 'react-icons/si';
import { BarChart3, Database, FileSpreadsheet, Search, Trophy } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeading from '../ui/SectionHeading';
import LogoLoop from '../LogoLoop';
import ScrollReveal from '../reactbits/ScrollReveal';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const { skills } = content;
const SKILL_LOGOS = [
  { node: <SiPython />, title: 'Python', hoverColor: '#3776AB' },
  { node: <SiMysql />, title: 'SQL', hoverColor: '#4479A1' },
  { node: <BarChart3 />, title: 'Power BI', hoverColor: '#F2C811' },
  { node: <FileSpreadsheet />, title: 'Excel', hoverColor: '#217346' },
  { node: <SiReact />, title: 'React.js', hoverColor: '#61DAFB' },
  { node: <SiJavascript />, title: 'JavaScript', hoverColor: '#F7DF1E' },
  { node: <SiHtml5 />, title: 'HTML & CSS', hoverColor: '#E34F26' },
  { node: <SiTailwindcss />, title: 'Tailwind CSS', hoverColor: '#38BDF8' },
  { node: <SiFlask />, title: 'Flask', hoverColor: '#6B6560' },
  { node: <SiSupabase />, title: 'Supabase', hoverColor: '#3ECF8E' },
  { node: <SiGoogleappsscript />, title: 'AppScript', hoverColor: '#4285F4' },
  { node: <Search />, title: 'Product Research', hoverColor: '#C4622D' },
  { node: <Trophy />, title: 'Competitive Benchmarking', hoverColor: '#C4622D' },
  { node: <SiGoogleanalytics />, title: 'Market Research', hoverColor: '#E37400' },
  { node: <SiFigma />, title: 'Figma', hoverColor: '#F24E1E' },
  { node: <SiGit />, title: 'Git', hoverColor: '#F05032' },
  { node: <SiHuggingface />, title: 'FAISS', hoverColor: '#FF9D00' },
  { node: <Database />, title: 'Vector Databases', hoverColor: '#C4622D' },
];

export default function Skills() {
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="skills" className="bg-surface">
      <SectionHeading id="skills" label="What I work with" title="Skills" />

      {/* LogoLoop marquee — decorative but fun */}
      <div className="mb-12 -mx-4 sm:-mx-6 lg:-mx-8">
        <LogoLoop
          logos={SKILL_LOGOS}
          speed={120}
          direction="left"
          logoHeight={48}
          gap={56}
          hoverSpeed={0}
          scaleOnHover={false}
          labels="hover"
          ariaLabel="Technology skills"
        />
      </div>

      {/* Grouped grid — this is the accessible version */}
      <div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        aria-label="Skills by category"
      >
        {Object.entries(skills).map(([group, items], i) => (
          <ScrollReveal key={group} delay={i * 70} direction="up" reducedMotion={reduced}>
            <div className="rounded-xl border border-border bg-bg p-5">
              <h3 className="text-sm font-semibold text-accent uppercase tracking-wide mb-4">
                {group}
              </h3>
              <ul className="flex flex-wrap gap-2" role="list">
                {items.map(({ name }) => (
                  <li
                    key={name}
                    className="text-xs font-medium px-3 py-1.5 rounded-full
                      border border-border text-ink-muted bg-surface
                      hover:border-accent hover:text-accent transition-colors duration-150"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
