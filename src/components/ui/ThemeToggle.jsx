// ThemeToggle.jsx — sun/moon icon button that swaps theme
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, toggle }) {
  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg
        border border-border bg-surface text-ink-muted
        hover:text-accent hover:border-accent
        transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
    >
      {theme === 'dark'
        ? <Sun size={16} strokeWidth={1.75} aria-hidden />
        : <Moon size={16} strokeWidth={1.75} aria-hidden />
      }
    </button>
  );
}
