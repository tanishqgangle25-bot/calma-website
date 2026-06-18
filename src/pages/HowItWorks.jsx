import { motion } from 'framer-motion'
import PageMoment from '../components/PageMoment.jsx'
import StickyNoteCard from '../components/StickyNoteCard.jsx'
import SEOHead from '../components/SEOHead.jsx'
import { howToSchema, breadcrumbSchema } from '../seo/schemas.js'

const steps = [
  { n: '01', title: 'connect your accounts', body: 'link Google, Zomato, Swiggy in 90 seconds. one-click OAuth — no passwords stored.' },
  { n: '02', title: 'calma starts watching', body: 'every new review pings calma instantly. sentiment scored, urgency tagged.' },
  { n: '03', title: 'replies drafted in your voice', body: 'calma learns your tone in the first week. approve or let it post automatically.' },
  { n: '04', title: 'insights every monday', body: 'one short report. what hurt your rating, what helped, what to fix next.' },
]

export default function HowItWorks() {
  return (
    <>
    <SEOHead
      title="How It Works — Setup in 10 Minutes"
      description="Connect Google, Zomato, and Swiggy in 90 seconds. calma monitors reviews, drafts replies in your tone, and sends weekly insights. No engineer needed."
      path="/how-it-works"
      schema={[howToSchema, breadcrumbSchema([{ name: 'How It Works', url: 'https://heycalma.in/how-it-works' }])]}
    />
    <section className="bg-white pt-32 pb-32 md:pt-40 md:pb-40 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[4px] uppercase mb-4"
          style={{ color: '#A39670' }}
        >
          the process
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl md:text-6xl font-semibold tracking-tight"
          style={{ color: '#4D4828' }}
        >
          how calma<br />
          <span style={{ color: '#A39670' }}>works.</span>
        </motion.h1>
        <div className="mt-6 flex flex-col md:flex-row md:items-end gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg max-w-xl"
            style={{ color: '#372713', opacity: 0.6 }}
          >
            four steps. no engineer required. fully running in under ten minutes.
          </motion.p>
          <StickyNoteCard
            doubt='"iska setup bahut complicated hoga"'
            answer='10 minute mein hota hai. aapka beta bhi kar sakta hai. ek baar connect karo phir calma khud dekh lega 🙌'
            color="#7D2027"
            textColor="#ECE6D8"
            rotate={-4}
            delay={0.4}
            from="right"
          />
        </div>

        <div className="mt-20 md:mt-28 space-y-16 md:space-y-24">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.05 }}
              className="grid md:grid-cols-[120px_1fr] gap-6 md:gap-12 items-baseline"
            >
              <span className="text-5xl md:text-7xl font-semibold text-[#d2d2d7] tabular-nums">
                {step.n}
              </span>
              <div>
                <h3 className="text-2xl md:text-4xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-4 text-lg text-muted max-w-xl leading-relaxed">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <PageMoment
        bg="#D9C4B1"
        glow="#A39670"
        accentText="#7D2027"
        headlineColor="#372713"
        subColor="#4D4828"
        eyebrow="literally just"
        headline="connect.<br/><span style='color:#A39670'>then relax.</span>"
        sub="four steps. ten minutes. then calma does its thing and you go touch grass. no IT guy needed. no crying at 2am over a 1-star."
        pill="setup in under 10 mins"
        image="/images/cute-5.jpg"
        imageSide="left"
      />
    </section>
    </>
  )
}
