import { motion } from 'framer-motion'

export default function HowAIWorks() {
  return (
    <section id="how-ai-works" className="bg-white py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
        <p className="text-sm uppercase tracking-wider text-muted">how our ai works</p>
        <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-ink tracking-tight">
          watch calma read, understand and reply, in under a minute.
        </h2>
        <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
          every review is analysed, the real problem is found, and a calm reply is ready for you to approve.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-10 overflow-hidden rounded-3xl bg-cloud shadow-lg"
        >
          <video
            className="w-full aspect-[4/3] bg-black"
            src="/video/how-calma-ai-works.mp4"
            poster="/video/how-calma-ai-works.jpg"
            controls
            playsInline
            preload="none"
            aria-label="How calma's AI works"
          />
        </motion.div>
      </div>
    </section>
  )
}
