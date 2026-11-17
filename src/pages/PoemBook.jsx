import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import PoemBook from '../components/sections/PoemBook';

export default function PoemBookPage() {
  return (
    <main className="pt-16">
      <div className="mx-auto max-w-content px-4 pt-6 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted
            transition-colors hover:text-accent"
        >
          <ArrowLeft size={16} aria-hidden />
          Back to portfolio
        </Link>
      </div>
      <PoemBook />
    </main>
  );
}
