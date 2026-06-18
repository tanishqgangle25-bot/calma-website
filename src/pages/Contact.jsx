import { motion } from 'framer-motion'
import { Mail, Globe, MessageCircle } from 'lucide-react'
import PageMoment from '../components/PageMoment.jsx'
import StickyNoteCard from '../components/StickyNoteCard.jsx'
import SEOHead from '../components/SEOHead.jsx'
import { localBusinessSchema, breadcrumbSchema } from '../seo/schemas.js'

const EMAIL = 'officialnightera@gmail.com'
const WA_NUMBER = '918251000525'
const WA_DISPLAY = '+91 82510 00525'
const WA_MSG = encodeURIComponent("Hi calma team — I'm interested in calma for my business.")

const channels = [
  {
    icon: Mail,
    label: 'email',
    value: EMAIL,
    href: `mailto:${EMAIL}?subject=${encodeURIComponent('calma enquiry')}`,
  },
  {
    icon: MessageCircle,
    label: 'whatsapp',
    value: WA_DISPLAY,
    href: `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`,
    external: true,
  },
  {
    icon: Globe,
    label: 'website',
    value: 'heycalma.in',
    href: 'https://heycalma.in',
    external: true,
  },
]

export default function Contact() {
  return (
    <>
    <SEOHead
      title="Contact — Talk to the calma Team"
      description="Reach calma by email or WhatsApp. Based in Indore, MP. We reply within 2 hours. Ask about Google review management for your restaurant or hotel."
      path="/contact"
      schema={[localBusinessSchema, breadcrumbSchema([{ name: 'Contact', url: 'https://heycalma.in/contact' }])]}
    />
    <section className="bg-white pt-32 pb-32 md:pt-40 md:pb-40 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[4px] uppercase mb-4"
          style={{ color: '#A39670' }}
        >
          get in touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl md:text-6xl font-semibold tracking-tight"
          style={{ color: '#4D4828' }}
        >
          let's<br />
          <span style={{ color: '#7D2027' }}>talk.</span>
        </motion.h1>
        <div className="mt-6 flex flex-col md:flex-row md:items-end gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg max-w-xl"
            style={{ color: '#372713', opacity: 0.6 }}
          >
            one quick reply. usually under two hours. pick whatever's easiest for you.
          </motion.p>
          <StickyNoteCard
            doubt='"message karenge toh koi sunега nahi"'
            answer='hum 2 ghante mein reply karte hain. WhatsApp pe. real insaan. koi bot nahi. koi ticket nahi 🤝'
            color="#4D4828"
            textColor="#ECE6D8"
            rotate={4}
            delay={0.4}
            from="right"
          />
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {channels.map(({ icon: Icon, label, value, href, external }, i) => (
            <motion.a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="block bg-cloud rounded-2xl p-8 hover:bg-[#ececef] transition-colors duration-300 cursor-pointer"
            >
              <Icon className="w-7 h-7 text-ink" strokeWidth={1.5} />
              <p className="mt-6 text-sm text-muted uppercase tracking-wider">{label}</p>
              <p className="mt-2 text-lg font-medium text-ink break-words">{value}</p>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-16 pt-12 border-t border-black/5"
        >
          <p className="text-sm text-muted">calma | by thenightera</p>
          <p className="mt-2 text-muted max-w-xl">
            calma is a smart review management product for local businesses in India. one quiet system handling Google, Zomato, Swiggy and more.
          </p>
        </motion.div>
      </div>

      <PageMoment
        bg="#ECE6D8"
        glow="#D9C4B1"
        accentText="#7D2027"
        headlineColor="#372713"
        subColor="#4D4828"
        eyebrow="hey you"
        headline="don't just sit there.<br/><span style='color:#A39670'>say something.</span>"
        sub="drop a message. a real person picks up, usually within 2 hours. no bots. no ticket number. no being put on hold to listen to jazz."
        pill="we don't bite"
        image="/images/cute-3.jpg"
        imageSide="right"
      />
    </section>
    </>
  )
}
