import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import SEOHead from '../components/SEOHead.jsx'
import { softwareSchema } from '../seo/schemas.js'

const pillars = [
  {
    n: '01',
    title: 'brand identity',
    body: "how your brand looks, feels, and sits in someone's memory. logos, colors, fonts — built so your business looks expensive before anyone even tries your food.",
  },
  {
    n: '02',
    title: 'AI systems & automation',
    body: 'systems that run your business behind the scenes. lead generation, content pipelines, ad creatives — all connected, all automated, no manual work.',
  },
  {
    n: '03',
    title: 'PR & positioning',
    body: "how the world talks about you. strategic messaging that builds authority so people take your brand seriously — even before you say a word.",
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Ecosystem() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const smooth = useSpring(scrollYProgress, { stiffness: 28, damping: 16, restDelta: 0.001 })

  /* Curved flight path across the page */
  const bLeft = useTransform(smooth,
    [0,   0.15, 0.35, 0.55, 0.75, 0.9,  1],
    ['98vw','72vw','80vw','48vw','62vw','58vw','60vw']
  )
  const bTop = useTransform(smooth,
    [0,   0.15, 0.35, 0.55, 0.75, 0.9,  1],
    ['8vh','18vh','32vh','50vh','64vh','76vh','80vh']
  )
  const bRotate = useTransform(smooth,
    [0,   0.2,  0.4,  0.6,  0.8,  1],
    [-18,  12,  -14,   8,   -6,   0]
  )
  const bRotateY = useTransform(smooth,
    [0,   0.2,  0.45, 0.7,  1],
    [0,    50,  -35,   22,   0]
  )
  const bScale = useTransform(smooth,
    [0,   0.1,  0.6,  0.88, 1],
    [0,   0.55, 0.72, 0.78, 0]
  )

  return (
    <>
      <SEOHead
        title="The calma Ecosystem — Full-Stack Reputation System"
        description="calma is more than review replies. Brand identity, content, AI automation, and Google reputation — one ecosystem built for restaurants in India."
        path="/ecosystem"
        schema={softwareSchema}
      />
      {/* Wing flap keyframe */}
      <style>{`
        @keyframes wingFlap {
          0%,100% { transform: perspective(180px) rotateY(0deg) scaleX(1); }
          28%     { transform: perspective(180px) rotateY(28deg) scaleX(0.65); }
          72%     { transform: perspective(180px) rotateY(-18deg) scaleX(0.7); }
        }
        .butterfly-fly {
          animation: wingFlap 0.6s ease-in-out infinite;
          transform-origin: 50% 60%;
          will-change: transform;
        }
        @keyframes butterflyHeartbeat {
          0%,100% { transform: scale(1) rotate(0deg); }
          12%     { transform: scale(1.10) rotate(-3deg); }
          22%     { transform: scale(0.95) rotate(2deg); }
          34%     { transform: scale(1.07) rotate(-2deg); }
          46%     { transform: scale(0.97) rotate(1deg); }
          60%     { transform: scale(1.02) rotate(-1deg); }
        }
        .butterfly-landed {
          animation: butterflyHeartbeat 2.4s ease-in-out infinite;
          transform-origin: 50% 60%;
        }
      `}</style>

      {/* Fixed scroll-driven butterfly */}
      <motion.div
        style={{
          position: 'fixed',
          left: bLeft,
          top: bTop,
          rotate: bRotate,
          rotateY: bRotateY,
          scale: bScale,
          zIndex: 45,
          pointerEvents: 'none',
          perspective: 300,
        }}
      >
        <img
          src="/images/ecosystem%20page/no%20bg.png"
          alt=""
          aria-hidden="true"
          className="butterfly-fly w-32 md:w-44"
          style={{
            filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.15))',
          }}
        />
      </motion.div>

      {/* Page */}
      <section ref={sectionRef} style={{ background: '#fff' }} className="min-h-screen">

        {/* Hero */}
        <div className="pt-32 md:pt-0 min-h-screen grid md:grid-cols-2">
          <div className="flex flex-col justify-center px-6 md:px-16 py-20 md:py-0">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-block text-xs font-semibold tracking-[3px] uppercase px-3 py-1 rounded-full mb-6 w-fit"
              style={{ background: '#4D4828', color: '#fff' }}
            >
              the bigger picture
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]"
              style={{ color: '#1a1a1a' }}
            >
              calma lives inside<br />
              <span style={{ color: '#4D4828' }}>thenightera.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-6 text-base max-w-sm leading-relaxed"
              style={{ color: '#555' }}
            >
              thenightera is a brand intelligence company. they build brands, automate businesses, and now — with calma — help restaurants control how the world sees them.
            </motion.p>

            <motion.a
              href="https://www.thenightera.in"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="inline-block mt-8 w-fit text-sm font-medium px-6 py-3 rounded-lg border transition-colors duration-200 hover:bg-[#4D4828] hover:text-white hover:border-[#4D4828]"
              style={{ borderColor: '#4D4828', color: '#4D4828' }}
            >
              visit thenightera
            </motion.a>
          </div>

          {/* Leopard */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="relative overflow-hidden"
            style={{ minHeight: 480 }}
          >
            <img
              src="/images/ecosystem%20page/Reflecting_.jpg"
              alt="thenightera ecosystem — power and precision"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 hidden md:block"
              style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.18) 0%, transparent 30%)' }}
            />
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="py-24 md:py-32 px-6 md:px-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold tracking-[4px] uppercase mb-5" style={{ color: '#4D4828' }}>
              what thenightera does
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.08]" style={{ color: '#1a1a1a' }}>
              one company.<br />
              <span style={{ color: '#4D4828' }}>three things that change brands.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-16 md:mt-20"
          >
            {pillars.map((p) => (
              <motion.div
                key={p.n}
                variants={item}
                className="grid md:grid-cols-[80px_1fr] gap-6 md:gap-12 py-10 border-b"
                style={{ borderColor: 'rgba(0,0,0,0.07)' }}
              >
                <span className="text-4xl font-semibold tabular-nums" style={{ color: 'rgba(0,0,0,0.1)' }}>
                  {p.n}
                </span>
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ color: '#1a1a1a' }}>
                    {p.title}
                  </h3>
                  <p className="mt-3 text-base max-w-2xl leading-relaxed" style={{ color: '#555' }}>
                    {p.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Calma's place */}
        <div className="py-24 md:py-32 px-6 md:px-16 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-semibold tracking-[4px] uppercase mb-5" style={{ color: '#4D4828' }}>
              calma in the ecosystem
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.08]" style={{ color: '#1a1a1a' }}>
              their first<br />AI product.
            </h2>
            <p className="mt-5 text-base leading-relaxed" style={{ color: '#555' }}>
              thenightera builds brands. calma protects them. when someone leaves a bad review at 2am, calma handles it — so the reputation thenightera helped you build doesn't fall apart overnight.
            </p>
            <div className="mt-8 pl-4 border-l-2" style={{ borderColor: '#4D4828' }}>
              <p className="text-sm leading-relaxed italic" style={{ color: '#4D4828' }}>
                "intelligence, not just automation. built by the same people who understand that how you're perceived is everything."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {[
              { label: 'parent company', value: 'thenightera' },
              { label: 'product type', value: 'AI reputation intelligence' },
              { label: "who it's for", value: 'restaurants, cafes, hospitality brands' },
              { label: 'what it does', value: 'monitors, replies, and improves your ratings — automatically' },
              { label: 'launched in', value: 'indore, madhya pradesh' },
            ].map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-baseline justify-between py-4 border-b"
                style={{ borderColor: 'rgba(0,0,0,0.07)' }}
              >
                <span className="text-xs font-semibold uppercase tracking-[3px]" style={{ color: '#aaa' }}>
                  {row.label}
                </span>
                <span className="text-sm font-medium text-right max-w-[55%]" style={{ color: '#1a1a1a' }}>
                  {row.value}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA — butterfly lands here */}
        <div className="pb-24 md:pb-32 px-6 md:px-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden px-10 py-16 md:px-16 grid md:grid-cols-[1fr_auto] gap-10 items-center"
            style={{ background: '#4D4828' }}
          >
            <div>
              <h2 className="text-2xl md:text-4xl font-semibold tracking-tight leading-[1.1]" style={{ color: '#fff' }}>
                want more than reviews?<br />
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>thenightera builds the whole brand.</span>
              </h2>
              <p className="mt-4 text-sm max-w-md leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                brand identity, automation, content, AI systems — the full engine.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://www.thenightera.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-85"
                  style={{ background: '#fff', color: '#4D4828' }}
                >
                  explore thenightera
                </a>
                <a
                  href="/contact"
                  className="inline-block px-6 py-3 rounded-lg text-sm font-medium border transition-colors hover:bg-white/10"
                  style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}
                >
                  talk to calma
                </a>
              </div>
            </div>

            {/* Static butterfly — the one that "landed" */}
            <motion.img
              src="/images/ecosystem%20page/no%20bg.png"
              alt=""
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.4, rotate: -12 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="hidden md:block w-48 object-contain rounded-xl butterfly-landed"
              style={{ mixBlendMode: 'luminosity', opacity: 0.85 }}
            />
          </motion.div>
        </div>

      </section>
    </>
  )
}
