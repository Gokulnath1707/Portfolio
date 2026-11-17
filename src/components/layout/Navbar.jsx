// Navbar.jsx — sticky top nav with anchor links, theme toggle, resume button, mobile menu
import { useState, useEffect } from 'react';
import { Menu, X, FileDown } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import GooeyNav from '../GooeyNav';

const NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'PoemBook',   href: '/poem-book' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Education',  href: '#education' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled ? 'bg-bg/90 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'}`}
      >
        <div
          className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        >
          {/* Logo / initials */}
          <a
            href="#hero"
            className="text-ink font-bold text-lg tracking-tight hover:text-accent transition-colors"
            aria-label="Gokulnath B — back to top"
          >
            GB<span className="text-accent">.</span>
          </a>

          {/* Desktop links */}
          <GooeyNav
            items={NAV_LINKS}
            theme={theme}
            color={theme === 'dark' ? '#E07A42' : '#C4622D'}
            size="sm"
            frame={false}
            className="hidden md:inline-flex"
          />

          {/* Right side: theme toggle + resume */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle theme={theme} toggle={toggleTheme} />
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold
                bg-accent text-white hover:bg-accent/90 transition-colors duration-150
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              <FileDown size={15} strokeWidth={2} aria-hidden />
              Resume
            </a>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle theme={theme} toggle={toggleTheme} />
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg
                border border-border bg-surface text-ink hover:text-accent transition-colors"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 z-40 bg-bg flex flex-col pt-24 px-6 pb-10
          transition-all duration-300 md:hidden
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <ul className="flex flex-col gap-1 flex-1" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                onClick={closeMenu}
                className="block py-3 text-2xl font-semibold text-ink hover:text-accent transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/resume.pdf"
          download
          onClick={closeMenu}
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl
            bg-accent text-white font-semibold text-base hover:bg-accent/90 transition-colors"
        >
          <FileDown size={18} aria-hidden />
          Download Resume
        </a>
      </div>
    </>
  );
}
