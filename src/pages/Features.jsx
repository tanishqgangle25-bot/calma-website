import { motion } from 'framer-motion'
import { Search, MessageCircle, Smile, TrendingUp, Send, Star, MapPin } from 'lucide-react'
import PageMoment from '../components/PageMoment.jsx'
import StickyNoteCard from '../components/StickyNoteCard.jsx'
import SEOHead from '../components/SEOHead.jsx'
import { featureFaqSchema, breadcrumbSchema } from '../seo/schemas.js'

const features = [
  { icon: Search, title: 'review monitoring', body: 'calma watches every Google, Zomato and Swiggy review the moment it lands. nothing slips through.' },
  { icon: MessageCircle, title: 'auto replies', body: 'every review answered in your tone. approve or let it run on autopilot.' },
  { icon: Smile, title: 'sentiment radar', body: 'know what customers feel — not just what they wrote. anger, joy, frustration, surfaced in seconds.' },
  { icon: TrendingUp, title: 'insight reports', body: 'monthly digest of what to fix, ranked by impact on your rating.' },
  { icon: Send, title: 'review campaigns', body: 'ask the right customer at the right moment. WhatsApp, SMS, email — all hooked up.' },
  { icon: Star, title: 'rating recovery', body: 'go from 3.8 to 4.6 stars in 60 days. tested on 200+ local businesses.' },
  { icon: MapPin, title: 'multi-location', body: 'one dashboard, every branch. compare locations side by side.' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Features() {
  return (
    <>
    <SEOHead
      title="Features — AI Review Management for Restaurants"
      description="calma monitors Google, Zomato, and Swiggy reviews 24/7, replies in your voice, tracks sentiment, and helps restaurants in India improve ratings in 60 days."
      path="/features"
      schema={[featureFaqSchema, breadcrumbSchema([{ name: 'Features', url: 'https://heycalma.in/features' }])]}
    />
    <section className="bg-white pt-32 pb-32 md:pt-40 md:pb-40 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[4px] uppercase mb-4"
          style={{ color: '#7D2027' }}
        >
          what's inside
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl md:text-6xl font-semibold tracking-tight max-w-2xl"
          style={{ color: '#372713' }}
        >
          everything calma<br />
          <span style={{ color: '#A39670' }}>does for you.</span>
        </motion.h1>
        <div className="mt-6 flex flex-col md:flex-row md:items-end gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg max-w-xl"
            style={{ color: '#4D4828' }}
          >
            one quiet system handling the noisy parts of reputation.
          </motion.p>
          <StickyNoteCard
            doubt='"itni saari features — samjh bhi nahi aayengi"'
            answer='aap sirf reviews dekho. calma baaki sab sambhal leta hai. ek cheez bhi manually karne ki zarurat nahi 😌'
            color="#4D4828"
            textColor="#ECE6D8"
            rotate={3}
            delay={0.4}
            from="right"
          />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-16 md:mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={item}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-cloud rounded-2xl p-8 cursor-default"
            >
              <Icon className="w-7 h-7 text-ink" strokeWidth={1.5} />
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 text-muted leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <PageMoment
        bg="#ECE6D8"
        glow="#A39670"
        accentText="#7D2027"
        headlineColor="#372713"
        subColor="#4D4828"
        eyebrow="built different"
        headline="sharp. quick.<br/><span style='color:#A39670'>misses nothing.</span>"
        sub="like a leopard who reads reviews. calma catches every word before you even open the app. ngl it's kinda scary how good it is."
        pill="seven features. zero excuses"
        image="/images/cute-4.jpg"
        imageSide="right"
        imageClass="object-top"
      />
    </section>
    </>
  )
}
