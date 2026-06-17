import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white py-12 border-t border-cloud">
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <p>calma | by thenightera</p>
          <span className="hidden md:inline">·</span>
          <Link to="/ecosystem" className="hover:text-ink transition-colors text-xs tracking-wide">
            the ecosystem
          </Link>
        </div>
        <p>
          <a href="https://heycalma.in" className="hover:text-ink transition-colors">
            heycalma.in
          </a>
          <span className="mx-3">·</span>
          <a
            href="mailto:officialnightera@gmail.com"
            className="hover:text-ink transition-colors"
          >
            officialnightera@gmail.com
          </a>
        </p>
      </div>
    </footer>
  )
}
