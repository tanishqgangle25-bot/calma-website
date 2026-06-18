import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead.jsx'
import { aboutPageSchema, breadcrumbSchema } from '../seo/schemas.js'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut', delay },
})

export default function About() {
  return (
    <>
      <SEOHead
        title="About — calma and thenightera"
        description="calma is built by thenightera, a brand intelligence company from Indore, India. Learn about the mission, the founder, and why we built AI review management for Indian restaurants."
        path="/about"
        schema={[aboutPageSchema, breadcrumbSchema([{ name: 'About', url: 'https://heycalma.in/about' }])]}
      />

      <div className="bg-white min-h-screen pt-32 pb-32 md:pt-40 md:pb-40">
        <div className="max-w-3xl mx-auto px-6 md:px-10">

          {/* Header */}
          <motion.p {...fade(0)} className="text-xs font-semibold tracking-[4px] uppercase mb-4" style={{ color: '#A39670' }}>
            who we are
          </motion.p>
          <motion.h1 {...fade(0.05)} className="text-4xl md:text-6xl font-semibold tracking-tight" style={{ color: '#372713' }}>
            built for the<br />
            <span style={{ color: '#7D2027' }}>indian kitchen.</span>
          </motion.h1>
          <motion.p {...fade(0.1)} className="mt-6 text-lg leading-relaxed max-w-xl" style={{ color: '#4D4828' }}>
            calma is an AI-powered reputation management platform built specifically for restaurants, cafes, dhabas, and hospitality businesses in India. It automatically monitors and replies to Google, Zomato, and Swiggy reviews 24/7 — so owners can focus on the food, not the phone.
          </motion.p>

          {/* What is calma — AEO definition block */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 rounded-2xl p-8 md:p-10"
            style={{ background: '#F5F0E8' }}
          >
            <p className="text-xs font-semibold tracking-[4px] uppercase mb-4" style={{ color: '#A39670' }}>what is calma</p>
            <p className="text-lg leading-relaxed" style={{ color: '#372713' }}>
              calma is an AI tool that connects to your Google Business Profile using official OAuth, detects every new review within seconds, analyses the sentiment and urgency, and posts a personalised reply in your brand voice — automatically, around the clock. Most clients see a measurable improvement in their Google rating within 60 days.
            </p>
          </motion.div>

          {/* Founder note */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 rounded-2xl p-8 md:p-10"
            style={{ background: '#ECE6D8' }}
          >
            <p className="text-xs font-semibold tracking-[4px] uppercase mb-6" style={{ color: '#A39670' }}>a note from the founder</p>
            <p className="text-lg leading-relaxed" style={{ color: '#372713' }}>
              i grew up watching my parents run a small business in indore. one bad review on a saturday would ruin their whole week. calma is the tool i wish they had — it sits quietly in the background, handles the noise, and tells you what actually matters. if it doesn't move your rating in two months, you don't pay. that's the promise.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold" style={{ background: '#372713', color: '#ECE6D8' }}>
                T
              </div>
              <div>
                <p className="font-medium" style={{ color: '#372713' }}>Tanishq Gangle</p>
                <p className="text-sm" style={{ color: '#A39670' }}>founder, calma · thenightera · indore, mp</p>
              </div>
            </div>
          </motion.div>

          {/* Built by thenightera */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <p className="text-xs font-semibold tracking-[4px] uppercase mb-4" style={{ color: '#A39670' }}>built by</p>
            <h2 className="text-3xl font-semibold tracking-tight" style={{ color: '#372713' }}>thenightera</h2>
            <p className="mt-4 text-base leading-relaxed max-w-xl" style={{ color: '#4D4828' }}>
              thenightera is a brand intelligence company based in Indore, Madhya Pradesh. We build AI systems, cinematic brand content, and digital tools for Indian businesses. calma is our flagship product — designed from the ground up for the Indian hospitality market.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'founded', value: '2024', sub: 'Indore, MP' },
                { label: 'businesses served', value: '200+', sub: 'across India' },
                { label: 'avg rating improvement', value: '4.8★', sub: 'in 60 days' },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-6" style={{ background: '#F5F0E8' }}>
                  <p className="text-xs font-semibold tracking-[3px] uppercase" style={{ color: '#A39670' }}>{s.label}</p>
                  <p className="text-3xl font-semibold mt-2" style={{ color: '#372713' }}>{s.value}</p>
                  <p className="text-sm mt-1" style={{ color: '#A39670' }}>{s.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact / social */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 pt-10 border-t"
            style={{ borderColor: '#D9C4B1' }}
          >
            <p className="text-xs font-semibold tracking-[4px] uppercase mb-6" style={{ color: '#A39670' }}>get in touch</p>
            <div className="flex flex-col md:flex-row gap-4">
              <a
                href="https://wa.me/918251000525?text=Hi%20calma%20team%20%E2%80%94%20I%27d%20like%20to%20know%20more%20about%20calma."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
                style={{ background: '#372713', color: '#ECE6D8' }}
              >
                chat on whatsapp
              </a>
              <a
                href="mailto:officialnightera@gmail.com"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-medium border transition-opacity hover:opacity-80"
                style={{ color: '#372713', borderColor: '#D9C4B1' }}
              >
                officialnightera@gmail.com
              </a>
              <a
                href="https://www.instagram.com/heycalma"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-medium border transition-opacity hover:opacity-80"
                style={{ color: '#372713', borderColor: '#D9C4B1' }}
              >
                @heycalma on instagram
              </a>
            </div>
            <div className="mt-10">
              <Link to="/pricing" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: '#7D2027' }}>
                see plans and pricing →
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  )
}
