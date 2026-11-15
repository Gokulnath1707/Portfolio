/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // All colours are wired to CSS variables — swap themes by toggling .dark on <html>
        bg:           'var(--color-bg)',
        surface:      'var(--color-surface)',
        border:       'var(--color-border)',
        ink:          'var(--color-ink)',
        'ink-muted':  'var(--color-ink-muted)',
        accent:       'var(--color-accent)',
        'accent-muted':'var(--color-accent-muted)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1152px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)',
        'card-hover': '0 4px 16px 0 rgb(0 0 0 / 0.12)',
      },
    },
  },
  plugins: [],
};
