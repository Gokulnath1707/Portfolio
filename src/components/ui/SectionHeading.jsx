// SectionHeading.jsx — consistent section label + title
export default function SectionHeading({ id, label, title, className = '' }) {
  return (
    <div className={`mb-12 ${className}`}>
      {label && (
        <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">
          {label}
        </p>
      )}
      <h2
        id={`${id}-heading`}
        className="text-3xl font-semibold text-ink"
      >
        {title}
      </h2>
      <div className="mt-3 w-10 h-0.5 bg-accent rounded-full" />
    </div>
  );
}
