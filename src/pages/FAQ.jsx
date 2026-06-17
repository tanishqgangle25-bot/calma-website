import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import SEOHead from '../components/SEOHead.jsx'
import { faqSchema } from '../seo/schemas.js'

const faqs = [
  {
    q: 'What is calma?',
    a: 'calma is an AI-powered reputation management platform that automatically monitors and replies to your Google, Zomato, and Swiggy reviews 24/7. Built specifically for restaurants, cafes, dhabas, and hospitality businesses in India.',
  },
  {
    q: 'How does calma automatically reply to Google reviews?',
    a: 'calma connects to your Google Business Profile using official OAuth. When a new review arrives, calma analyses the sentiment, detects tone and urgency, and generates a personalised reply in your brand voice — posting within minutes without any manual effort.',
  },
  {
    q: 'How long does it take to improve my restaurant rating with calma?',
    a: 'Most calma clients see measurable improvement in their Google rating within 60 days. Consistent review responses signal engagement to Google, which improves local search ranking. We guarantee a visible rating improvement or we refund you in full.',
  },
  {
    q: 'Does calma work for restaurants outside Indore?',
    a: 'Yes. calma works for any restaurant or cafe across India — Mumbai, Delhi, Bangalore, Pune, Hyderabad, Jaipur, and beyond. The platform is built for Indian hospitality businesses and understands Hindi-English mixed reviews.',
  },
  {
    q: 'Can calma handle negative reviews?',
    a: 'Yes. Negative reviews are detected instantly and flagged for priority attention. calma drafts a carefully worded, empathetic reply that protects your brand and shows other customers you take feedback seriously — often convincing upset customers to revise their rating.',
  },
  {
    q: 'Does calma reply to Zomato and Swiggy reviews too?',
    a: 'Yes. calma monitors Google, Zomato, and Swiggy reviews from a single dashboard. No more checking three platforms every day.',
  },
  {
    q: 'Is calma suitable for multiple restaurant locations?',
    a: 'Yes. calma Pro supports unlimited locations. You get one dashboard showing all branches side by side, so you can compare ratings, review volume, and sentiment across every outlet.',
  },
  {
    q: 'How much does calma cost?',
    a: 'calma starts at ₹5,999 per month for a single Google location. Plans go up to ₹16,999/month for unlimited locations, multi-platform coverage, and dedicated account management. All plans come with a 60-day rating guarantee.',
  },
  {
    q: 'Do I need to hire someone to manage calma?',
    a: 'No. calma is fully automated. Setup takes under 10 minutes — connect your accounts, and calma handles everything from there. Most owners spend less than 5 minutes a week reviewing the Monday report.',
  },
  {
    q: 'Is my restaurant data safe with calma?',
    a: 'Yes. calma uses official Google OAuth — no passwords are stored. Your review data stays on secure Indian servers and is never shared with third parties. You can disconnect at any time.',
  },
  {
    q: 'Who built calma?',
    a: 'calma is built by thenightera, a brand intelligence company based in Indore, Madhya Pradesh. thenightera specialises in AI automation, brand identity, and digital systems for Indian businesses.',
  },
  {
    q: 'Can I try calma before paying?',
    a: 'Yes. Contact the calma team on WhatsApp or email for a free 20-minute demo. We will show you exactly how it works with a live example on your restaurant profile.',
  },
]

function Item({ q, a, i }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: i * 0.04 }}
      className="border-b border-black/8"
    >
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left"
      >
        <span className="text-lg font-medium tracking-tight" style={{ color: '#372713' }}>{q}</span>
        <span className="shrink-0 mt-0.5" style={{ color: '#A39670' }}>
          {open ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-base leading-relaxed max-w-2xl" style={{ color: '#4D4828' }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <>
      <SEOHead
        title="FAQ — Common Questions About calma"
        description="Answers to the most common questions about calma: how it works, pricing, platforms supported, and whether it works for your restaurant in India."
        path="/faq"
        schema={faqSchema}
      />
      <section className="bg-white pt-32 pb-32 md:pt-40 md:pb-40 min-h-screen">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[4px] uppercase mb-4"
            style={{ color: '#A39670' }}
          >
            got questions
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-4xl md:text-6xl font-semibold tracking-tight"
            style={{ color: '#372713' }}
          >
            everything you<br />
            <span style={{ color: '#7D2027' }}>wanted to ask.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 text-lg max-w-xl"
            style={{ color: '#4D4828', opacity: 0.7 }}
          >
            honest answers. no jargon. if something is still unclear, WhatsApp us.
          </motion.p>

          <div className="mt-16">
            {faqs.map((item, i) => (
              <Item key={item.q} q={item.q} a={item.a} i={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 rounded-2xl p-8 md:p-10"
            style={{ background: '#ECE6D8' }}
          >
            <p className="text-xl font-semibold tracking-tight" style={{ color: '#372713' }}>
              still have a question?
            </p>
            <p className="mt-2 text-base" style={{ color: '#4D4828' }}>
              our team replies within 2 hours on WhatsApp.
            </p>
            <a
              href="https://wa.me/918251000525?text=Hi%20calma%20team%20%E2%80%94%20I%20have%20a%20question%20about%20calma."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-ink text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#333] transition-colors duration-200"
            >
              chat on whatsapp
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
