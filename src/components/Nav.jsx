import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { X, Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { APP_LOGIN_URL } from '../lib/appLinks.js'

const links = [
  { label: 'features', to: '/features' },
  { label: 'how it works', to: '/how-it-works' },
  { label: 'pricing', to: '/pricing' },
  { label: 'reviews', to: '/testimonials' },
  { label: 'faq', to: '/faq' },
  { label: 'ecosystem', to: '/ecosystem' },
  { label: 'contact', to: '/contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b"
        style={{ background: 'rgba(236,230,216,0.92)', borderColor: '#D9C4B1' }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-12 flex items-center justify-between">
          <Link
            to="/"
            className="text-sm font-bold tracking-tight"
            style={{ color: '#372713' }}
            onClick={() => setOpen(false)}
          >
            calma
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-5 lg:gap-8">
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                className="text-xs transition-colors duration-200"
                style={({ isActive }) => ({
                  color: isActive ? '#7D2027' : '#4D4828',
                  fontWeight: isActive ? '600' : '400',
                })}
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Log in + trial (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={APP_LOGIN_URL}
              className="text-xs font-medium transition-opacity duration-200 hover:opacity-70"
              style={{ color: '#372713' }}
            >
              Log in
            </a>
            <a
              href={APP_LOGIN_URL}
              className="rounded-full bg-ink px-4 py-1.5 text-xs font-semibold text-white transition-colors duration-200 hover:bg-[#333]"
            >
              Start free trial
            </a>
          </div>

          {/* Trial shortcut + hamburger (mobile) */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href={APP_LOGIN_URL}
              className="rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-white"
            >
              Start free trial
            </a>
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8"
              style={{ color: '#372713' }}
              onClick={() => setOpen(o => !o)}
              aria-label="toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-12 inset-x-0 z-40 border-b"
            style={{ background: 'rgba(236,230,216,0.98)', borderColor: '#D9C4B1' }}
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm border-b last:border-0 transition-colors duration-200"
                  style={({ isActive }) => ({
                    color: isActive ? '#7D2027' : '#4D4828',
                    fontWeight: isActive ? '600' : '400',
                    borderColor: '#D9C4B122',
                  })}
                >
                  {l.label}
                </NavLink>
              ))}
              <a
                href={APP_LOGIN_URL}
                className="mt-3 inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold"
                style={{ borderColor: '#372713', color: '#372713' }}
              >
                Log in
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
