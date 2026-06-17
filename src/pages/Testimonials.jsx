import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import PageMoment from '../components/PageMoment.jsx'
import StickyNoteCard from '../components/StickyNoteCard.jsx'
import SEOHead from '../components/SEOHead.jsx'
import { localBusinessSchema } from '../seo/schemas.js'

const featured = {
  body: "Honestly we used to check Zomato maybe once a week. By Sunday night there'd be 12 reviews and we'd reply to two of them. Calma started replying within an hour, in our voice, and the angry ones it would flag for us first. Our rating moved from 3.9 to 4.4 in about two months. The owner kept asking if we hired someone new.",
  name: 'Rohan Verma',
  role: 'Manager',
  biz: 'Cafe Madras Coffee',
  area: 'Vijay Nagar, Indore',
  stars: 5,
}

const grid = [
  {
    body: "Reviews used to stress me out. Specially the 1 stars on Saturday nights when we're already running. Calma replied to a tough one about service delay before I even saw it, and the customer actually came back and edited the review to 4 stars. That alone paid for the year.",
    name: 'Aakash Joshi',
    biz: 'Mehfil Restaurant',
    area: 'AB Road',
  },
  {
    body: "We have 3 outlets and the worst part of my Monday was checking each Google page. Now it's one screen, one report, done in 4 minutes. The competitor tracking thing was a bonus — we found out a new cafe nearby was buying fake reviews.",
    name: 'Priya Agrawal',
    biz: 'The Brew Lab',
    area: 'New Palasia',
  },
  {
    body: "I'm 52 and I don't really do apps. My son set up calma in 20 minutes. Now every morning I get a small WhatsApp message that says how many reviews came in and what people said. That's it. Rating went from 4.1 to 4.6 without me touching anything.",
    name: 'Mahendra Patel',
    biz: 'Padmavati Sweets',
    area: 'Rajwada',
  },
  {
    body: "Hotel reviews are different — people complain about specific things like AC noise or breakfast timing. Calma actually picked up that breakfast complaints went up after we changed our chef. We caught it in week one instead of three months later.",
    name: 'Sneha Kulkarni',
    biz: 'Hotel Surya',
    area: 'Saket Nagar',
  },
  {
    body: "The review request campaign is what got me. I was scared of asking customers for reviews because it feels weird. Calma's WhatsApp message goes out 90 minutes after they leave. 31 new reviews in the first month. Not a single complaint from a customer about the message.",
    name: 'Dr. Anjali Shah',
    biz: 'Glow Beauty Lounge',
    area: 'South Tukoganj',
  },
  {
    body: "Look, we tried two other tools before calma. Both were either too expensive or replied in robot English that made us look bad. This one writes the way we actually talk. My wife who handles ops said she doesn't want to go back, and she hates everything new.",
    name: 'Imran Sheikh',
    biz: 'Saffron Kitchen',
    area: 'MG Road',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-ink text-ink" strokeWidth={0} />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <>
    <SEOHead
      title="Reviews — What Restaurant Owners Say About calma"
      description="200+ restaurants and cafes in Indore trust calma. Real results: ratings improved from 3.8 to 4.6 in 60 days. Read what local owners say."
      path="/testimonials"
      schema={localBusinessSchema}
    />
    <section className="bg-white pt-32 pb-32 md:pt-40 md:pb-40 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-xs font-semibold tracking-[4px] uppercase" style={{ color: '#7D2027' }}>trusted across indore</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl" style={{ color: '#372713' }}>
            what local<br />
            <span style={{ color: '#7D2027' }}>owners say.</span>
          </h1>
          <div className="mt-5 flex flex-col md:flex-row md:items-end gap-6">
            <p className="text-lg max-w-xl" style={{ color: '#4D4828' }}>
              real businesses. real ratings. mostly cafes and one hotel owner who didn't want to be named.
            </p>
            <StickyNoteCard
              doubt='"sab fake reviews likhwate hain"'
              answer='hum samjhe. isliye 60-din ka result guarantee hai. agar rating na badhe — paise wapas. jhooth mein itna confidence nahi hota 😌'
              color="#ECE6D8"
              textColor="#372713"
              rotate={-3}
              delay={0.4}
              from="right"
            />
          </div>
        </motion.div>

        {/* Featured big quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
          className="mt-16 md:mt-20 relative rounded-3xl bg-cloud p-10 md:p-14 overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute -top-4 -left-4 md:-top-6 md:-left-6"
          >
            <Quote className="w-24 h-24 md:w-32 md:h-32 text-[#e8e8ed]" strokeWidth={1.2} />
          </motion.div>

          <div className="relative">
            <Stars count={featured.stars} />
            <p className="mt-6 text-2xl md:text-4xl font-medium tracking-tight leading-snug text-ink max-w-4xl">
              {featured.body}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-ink text-white flex items-center justify-center text-sm font-semibold">
                {featured.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium text-ink">{featured.name}</p>
                <p className="text-sm text-muted">
                  {featured.role}, {featured.biz} — {featured.area}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid of testimonials */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {grid.map((t) => (
            <motion.div
              key={t.name}
              variants={item}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              className="group relative bg-white rounded-2xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] transition-shadow duration-300 cursor-default overflow-hidden"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-black/[0.03] to-transparent group-hover:translate-x-full transition-transform duration-1000" />
              <div className="relative">
                <Stars />
                <p className="mt-5 text-ink leading-relaxed text-[15px]">{t.body}</p>
                <div className="mt-6 pt-6 border-t border-black/5">
                  <p className="font-medium text-ink text-sm">{t.name}</p>
                  <p className="text-xs text-muted mt-1">
                    {t.biz} · {t.area}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Subtle stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 md:mt-24 grid grid-cols-3 gap-6 md:gap-12 border-t border-black/5 pt-12"
        >
          {[
            { n: '4.5★', l: 'average rating after 60 days' },
            { n: '7 min', l: 'avg reply time, around the clock' },
            { n: '200+', l: 'businesses across MP' },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-3xl md:text-5xl font-semibold tracking-tight">{s.n}</p>
              <p className="mt-2 text-sm text-muted leading-relaxed">{s.l}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <PageMoment
        bg="#A39670"
        glow="#ECE6D8"
        accentText="#ECE6D8"
        headlineColor="#ECE6D8"
        subColor="#ECE6D8cc"
        eyebrow="real people. real calma."
        headline="they focused.<br/><span style='color:rgba(236,230,216,0.45)'>calma handled the rest.</span>"
        sub="200+ business owners who stopped stressing about reviews. some of them actually cried (happy tears). we don't talk about the before."
        pill="join 200+ businesses"
        image="/images/cute-1.png"
        imageSide="left"
      />
    </section>
    </>
  )
}
