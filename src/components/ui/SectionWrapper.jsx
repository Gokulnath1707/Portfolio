// SectionWrapper.jsx — consistent padding, max-width, anchor id
export default function SectionWrapper({ id, children, className = '', ariaLabel }) {
  return (
    <section
      id={id}
      className={`w-full px-4 sm:px-6 lg:px-8 py-20 scroll-mt-20 ${className}`}
      role="region"
      aria-labelledby={`${id}-heading`}
      aria-label={ariaLabel}
    >
      <div className="max-w-content mx-auto">
        {children}
      </div>
    </section>
  );
}
