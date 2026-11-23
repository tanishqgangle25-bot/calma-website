import { Link } from 'react-router-dom'
import FadeUp from './FadeUp.jsx'
import { APP_LOGIN_URL, TRIAL_DAYS } from '../lib/appLinks.js'

// "calma is live" entry card: log in or start the trial, like the ChatGPT / Claude landing screens.
export default function TrialJoin() {
  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="calma-live-title">
      <div className="max-w-md mx-auto px-6">
        <FadeUp>
          <div
            className="rounded-3xl p-8 md:p-10 text-center border"
            style={{ background: '#ECE6D8', borderColor: '#D9C4B1' }}
          >
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: '#fff', color: '#7D2027' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: '#7D2027' }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#7D2027' }} />
              </span>
              Live now
            </span>

            <h2
              id="calma-live-title"
              className="mt-5 text-3xl md:text-4xl font-semibold tracking-tight"
              style={{ color: '#372713' }}
            >
              calma is live.
            </h2>
            <p className="mt-3 text-base" style={{ color: '#4D4828' }}>
              Join the {TRIAL_DAYS}-day free trial and see your reviews on autopilot.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href={APP_LOGIN_URL}
                className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#333]"
              >
                Start {TRIAL_DAYS}-day free trial
              </a>
              <a
                href={APP_LOGIN_URL}
                className="inline-flex items-center justify-center rounded-full border px-6 py-3.5 text-sm font-semibold transition-colors duration-200 hover:bg-white"
                style={{ borderColor: '#372713', color: '#372713' }}
              >
                Log in
              </a>
            </div>

            <p className="mt-5 text-xs" style={{ color: '#4D4828', opacity: 0.75 }}>
              Continue with Google or email.{' '}
              <Link to="/trial" className="underline underline-offset-2 hover:opacity-70">
                How the trial works
              </Link>
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
