import { motion } from 'framer-motion'
import FadeUp from '../components/FadeUp.jsx'
import SEOHead from '../components/SEOHead.jsx'
import { breadcrumbSchema } from '../seo/schemas.js'
import { APP_LOGIN_URL, TRIAL_DAYS } from '../lib/appLinks.js'

const steps = [
  { n: '1', title: 'sign in', text: 'continue with google or an email link. your workspace is ready in seconds.' },
  { n: '2', title: 'add your business', text: 'paste your google maps link so calma can find your reviews.' },
  { n: '3', title: 'run the business audit', text: 'one click. calma reads your recent reviews and prepares your report.' },
]

const journey = [
  { day: 'day 1', text: 'run your audit. calma syncs up to 50 of your latest reviews.' },
  { day: 'day 6', text: 'up to 50 new reviews are synced, and you get your one final report.' },
  { day: 'day 7', text: 'the trial ends. your saved reviews and report stay available.' },
]

const gets = [
  { title: 'business audit', text: 'your rating, recent reviews and what needs attention, in one place.' },
  { title: 'recurring issues', text: 'the problems customers keep mentioning, with a clear way to fix each one.' },
  { title: 'reply drafts', text: 'ai-written replies for your reviews. nothing is published without your approval.' },
  { title: 'plain-language summary', text: 'a short business snapshot in english or hinglish.' },
]

function CtaButtons({ center = false }) {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${center ? 'justify-center' : ''}`}>
      <a
        href={APP_LOGIN_URL}
        className="inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#333]"
      >
        start {TRIAL_DAYS}-day free trial
      </a>
      <a
        href={APP_LOGIN_URL}
        className="inline-flex items-center justify-center rounded-full border px-7 py-3.5 text-sm font-semibold transition-colors duration-200 hover:bg-[#ECE6D8]"
        style={{ borderColor: '#372713', color: '#372713' }}
      >
        log in
      </a>
    </div>
  )
}

export default function Trial() {
  return (
    <>
      <SEOHead
        title="calma is live — start your 7-day free trial"
        description="calma is live. Start your 7-day free trial: run a business audit on your Google reviews, see recurring issues and get AI reply drafts you approve."
        path="/trial"
        schema={breadcrumbSchema([{ name: 'Free trial', url: 'https://heycalma.in/trial' }])}
      />

      {/* Hero */}
      <section className="bg-white pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
            style={{ background: '#ECE6D8', color: '#7D2027' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: '#7D2027' }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#7D2027' }} />
            </span>
            live now
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.08]"
            style={{ color: '#372713' }}
          >
            calma is live.
            <br />
            <span style={{ color: '#7D2027' }}>join the free trial.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 text-lg md:text-xl max-w-xl mx-auto"
            style={{ color: '#4D4828', opacity: 0.8 }}
          >
            {TRIAL_DAYS} days to see what calma does with your google reviews. start in a minute.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-10"
          >
            <CtaButtons center />
            <p className="mt-4 text-xs" style={{ color: '#4D4828', opacity: 0.7 }}>
              continue with google or email.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-cloud py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-center" style={{ color: '#372713' }}>
              three steps. that's it.
            </h2>
          </FadeUp>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <FadeUp key={s.n} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-white p-7 border" style={{ borderColor: '#D9C4B1' }}>
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold"
                    style={{ background: '#ECE6D8', color: '#7D2027' }}
                  >
                    {s.n}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight" style={{ color: '#372713' }}>{s.title}</h3>
                  <p className="mt-2 text-base leading-relaxed" style={{ color: '#4D4828' }}>{s.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 7-day journey */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <FadeUp>
            <p className="text-xs font-semibold tracking-[4px] uppercase mb-4 text-center" style={{ color: '#A39670' }}>
              your {TRIAL_DAYS} days
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-center" style={{ color: '#372713' }}>
              here's what happens.
            </h2>
          </FadeUp>
          <ol className="mt-12 space-y-0">
            {journey.map((j, i) => (
              <li key={j.day} className="relative pl-9 pb-10 last:pb-0">
                <span
                  className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2"
                  style={{ borderColor: '#7D2027', background: i === 0 ? '#7D2027' : '#fff' }}
                />
                {i < journey.length - 1 && (
                  <span className="absolute left-[7px] top-6 bottom-0 w-0.5" style={{ background: '#D9C4B1' }} />
                )}
                <FadeUp delay={i * 0.08}>
                  <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#7D2027' }}>{j.day}</p>
                  <p className="mt-1 text-lg" style={{ color: '#372713' }}>{j.text}</p>
                </FadeUp>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-cloud py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-center" style={{ color: '#372713' }}>
              what you get in the trial.
            </h2>
          </FadeUp>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {gets.map((g, i) => (
              <FadeUp key={g.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl p-7" style={{ background: '#ECE6D8' }}>
                  <h3 className="text-xl font-semibold tracking-tight" style={{ color: '#372713' }}>{g.title}</h3>
                  <p className="mt-2 text-base leading-relaxed" style={{ color: '#4D4828' }}>{g.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight" style={{ color: '#372713' }}>
              ready to try calma?
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#4D4828', opacity: 0.8 }}>
              your {TRIAL_DAYS}-day free trial starts the moment you sign in.
            </p>
            <div className="mt-10">
              <CtaButtons center />
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
