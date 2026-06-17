import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Sparkles, ShieldCheck, RefreshCcw, Lock } from 'lucide-react'
import PageMoment from '../components/PageMoment.jsx'
import StickyNoteCard from '../components/StickyNoteCard.jsx'
import SEOHead from '../components/SEOHead.jsx'
import { organizationSchema } from '../seo/schemas.js'

const tiers = [
  {
    name: 'basic',
    price: '₹5,999',
    tag: '',
    short: 'for solo locations getting started.',
    features: {
      'Platforms': 'Google only',
      'Locations': '1',
      'Review monitoring': 'Daily',
      'Reply type': 'Manual (professional)',
      'Reports': 'Monthly',
      'Competitor tracking': false,
      'Content calendar': false,
      'Support': 'Email (24hr)',
      'Account manager': false,
      'Strategy calls': false,
      'API access': false,
      'Custom templates': false,
      'Analytics': 'Basic',
    },
  },
  {
    name: 'plus',
    price: '₹9,999',
    tag: 'most popular',
    short: 'for growing brands across 2-3 locations.',
    features: {
      'Platforms': 'Google + Zomato + Swiggy',
      'Locations': '2-3',
      'Review monitoring': 'Daily',
      'Reply type': 'Manual (enhanced)',
      'Reports': 'Weekly',
      'Competitor tracking': '3 competitors',
      'Content calendar': '4 posts/month',
      'Support': 'Email + WhatsApp (12hr)',
      'Account manager': false,
      'Strategy calls': false,
      'API access': false,
      'Custom templates': false,
      'Analytics': 'Advanced',
    },
  },
  {
    name: 'pro',
    price: '₹16,999',
    tag: '',
    short: 'for chains who need everything dialled in.',
    features: {
      'Platforms': 'All platforms + custom',
      'Locations': 'Unlimited (5-10+)',
      'Review monitoring': 'Real-time',
      'Reply type': 'AI-powered + manual',
      'Reports': 'Daily + weekly + monthly',
      'Competitor tracking': 'Unlimited',
      'Content calendar': '8 posts/month',
      'Support': 'Phone + WhatsApp (2hr)',
      'Account manager': 'Dedicated',
      'Strategy calls': 'Weekly',
      'API access': 'Full access',
      'Custom templates': 'Unlimited',
      'Analytics': 'Enterprise',
    },
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

function FeatureRow({ label, value, i }) {
  const isBool = typeof value === 'boolean'
  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.04, duration: 0.3 }}
      className="flex items-start gap-3 py-2.5 border-b border-black/5 last:border-0"
    >
      {isBool ? (
        value ? (
          <Check className="w-4 h-4 text-ink mt-0.5 shrink-0" strokeWidth={2} />
        ) : (
          <X className="w-4 h-4 text-[#d2d2d7] mt-0.5 shrink-0" strokeWidth={2} />
        )
      ) : (
        <Check className="w-4 h-4 text-ink mt-0.5 shrink-0" strokeWidth={2} />
      )}
      <div className="flex-1 flex justify-between items-baseline gap-3">
        <span className="text-sm text-muted">{label}</span>
        {!isBool && <span className="text-sm font-medium text-ink text-right">{value}</span>}
        {isBool && !value && <span className="text-xs text-[#d2d2d7]">not included</span>}
      </div>
    </motion.li>
  )
}

export default function Pricing() {
  const [openTier, setOpenTier] = useState(null)

  return (
    <>
    <SEOHead
      title="Pricing — Restaurant Review Management Plans"
      description="calma starts at ₹5,999/month. Google review management, auto-replies, competitor tracking, and a 60-day rating guarantee for restaurants in India."
      path="/pricing"
      schema={organizationSchema}
    />
    <section className="bg-white pt-32 pb-32 md:pt-40 md:pb-40 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center"
        >
          <p className="text-xs font-semibold tracking-[4px] uppercase" style={{ color: '#7D2027' }}>pricing</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight" style={{ color: '#372713' }}>
            simple pricing.<br />
            <span style={{ color: '#A39670' }}>no surprises.</span>
          </h1>
          <p className="mt-5 text-lg max-w-xl mx-auto" style={{ color: '#4D4828' }}>
            tap any plan to see exactly what's inside.
          </p>
          <div className="mt-8 flex justify-center">
            <StickyNoteCard
              doubt='"price dekh ke dil baith gaya"'
              answer='ek bad review se aapki ₹3,000 ki table cancel ho sakti hai. calma ₹5,999/mo mein un sab reviews ko sambhalta hai. soch lijiye 💡'
              color="#7D2027"
              textColor="#ECE6D8"
              rotate={2}
              delay={0.3}
              from="bottom"
            />
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-16 md:mt-20 grid md:grid-cols-3 gap-6 items-start"
        >
          {tiers.map((tier) => {
            const isOpen = openTier === tier.name
            return (
              <motion.div
                key={tier.name}
                variants={card}
                layout
                transition={{ layout: { duration: 0.4, ease: 'easeOut' } }}
                className={`relative rounded-3xl bg-white p-8 cursor-pointer ${
                  tier.tag ? 'border border-ink' : 'shadow-[0_2px_16px_rgba(0,0,0,0.05)]'
                }`}
                onClick={() => setOpenTier(isOpen ? null : tier.name)}
                whileHover={{ y: -6 }}
              >
                {tier.tag && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ink text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    {tier.tag}
                  </div>
                )}

                <motion.div layout="position">
                  <h3 className="text-xl font-medium">{tier.name}</h3>
                  <p className="mt-4">
                    <span className="text-4xl font-semibold tracking-tight">{tier.price}</span>
                    <span className="text-muted text-base">/mo</span>
                  </p>
                  <p className="mt-3 text-muted text-sm leading-relaxed">{tier.short}</p>

                  <button
                    type="button"
                    className="mt-6 w-full text-sm font-medium text-ink border border-ink/15 rounded-lg py-3 hover:bg-ink hover:text-white transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation()
                      setOpenTier(isOpen ? null : tier.name)
                    }}
                  >
                    {isOpen ? 'hide details' : 'see what\'s included'}
                  </button>
                </motion.div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-6 pt-2">
                        {Object.entries(tier.features).map(([label, value], i) => (
                          <FeatureRow key={label} label={label} value={value} i={i} />
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-2xl bg-cloud p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-xl font-semibold tracking-tight">unique request?</h3>
            <p className="mt-2 text-muted max-w-lg">
              chains, franchises, custom integrations — we'll build it. tell us what you need.
            </p>
          </div>
          <a
            href="mailto:officialnightera@gmail.com"
            className="bg-ink text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#333] transition-colors duration-200 shrink-0"
          >
            let's talk
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-sm text-muted"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-ink" strokeWidth={1.5} />
            <span>60-day rating guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCcw className="w-4 h-4 text-ink" strokeWidth={1.5} />
            <span>cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-ink" strokeWidth={1.5} />
            <span>official Google API, your data stays yours</span>
          </div>
        </motion.div>
      </div>

      <PageMoment
        bg="#372713"
        glow="#7D2027"
        accentText="#D9C4B1"
        headlineColor="#ECE6D8"
        subColor="#A39670"
        eyebrow="real talk"
        headline="less than your<br/><span style='color:#A39670'>monthly chai budget.</span>"
        sub="₹5,999/mo for 24/7 review management. one bad viral review costs you more than a year of calma. be fierce about it."
        pill="60-day guarantee or full refund"
        image="/images/cute-6.jpg"
        imageSide="right"
        imageClass="object-top"
      />
    </section>
    </>
  )
}
