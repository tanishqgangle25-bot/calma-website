import { Link, NavLink } from 'react-router-dom'

export default function Nav() {
  const links = [
    { label: 'features', to: '/features' },
    { label: 'how it works', to: '/how-it-works' },
    { label: 'pricing', to: '/pricing' },
    { label: 'reviews', to: '/testimonials' },
    { label: 'ecosystem', to: '/ecosystem' },
    { label: 'contact', to: '/contact' },
  ]
  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b" style={{ background: 'rgba(236,230,216,0.85)', borderColor: '#D9C4B1' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-12 flex items-center justify-between">
        <Link to="/" className="text-sm font-semibold tracking-tight" style={{ color: '#372713' }}>
          calma
        </Link>
        <div className="flex items-center gap-6 md:gap-8">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className="text-xs transition-colors duration-200 cursor-pointer"
              style={({ isActive }) => ({
                color: isActive ? '#7D2027' : '#4D4828',
                fontWeight: isActive ? '600' : '400',
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
