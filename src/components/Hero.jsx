import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spotlight'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import Butterfly3D from '@/components/Butterfly3D'

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      <style>{`
        @keyframes robotBob {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          25%     { transform: translateY(-6px) rotate(1.5deg); }
          50%     { transform: translateY(0px) rotate(0deg); }
          75%     { transform: translateY(-4px) rotate(-1deg); }
        }
        @keyframes butterflyPerch {
          0%,100% { transform: translateY(0px) rotate(-4deg); }
          50%     { transform: translateY(-4px) rotate(3deg); }
        }
        .hero-robot-wrap {
          animation: robotBob 4.5s ease-in-out infinite;
          transform-origin: center bottom;
        }
        .butterfly-perched {
          animation: butterflyPerch 3s ease-in-out infinite;
          transform-origin: center bottom;
        }
      `}</style>

      <Spotlight className="-top-20 left-0 md:left-1/2 md:-top-10" fill="#1d1d1f" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row md:items-center md:min-h-screen pt-24 pb-6 md:pt-12 md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full md:flex-1 max-w-xl z-10 text-center md:text-left"
        >
          <p className="text-sm text-muted mb-6 tracking-wide">
            calma — your reviews. on autopilot.
          </p>
          <h1 className="text-4xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
            your reputation.
            <br />
            automated.
          </h1>
          <p className="mt-6 text-base md:text-xl text-muted max-w-md leading-relaxed mx-auto md:mx-0">
            calma manages your Google reviews 24/7 — so you don't have to.
          </p>
          <div className="inline-block mt-8 relative">
            <Link to="/pricing">
              <LiquidButton size="xl">get started</LiquidButton>
            </Link>
            {/* Butterfly perched on button */}
            <div
              aria-hidden="true"
              className="butterfly-perched"
              style={{
                position: 'absolute',
                top: -60,
                left: '50%',
                transform: 'translateX(-50%)',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            >
              <Butterfly3D size={80} />
            </div>
          </div>
        </motion.div>

        {/* Robot + butterfly seated on head */}
        <div className="w-full md:flex-1 relative h-[260px] md:h-[640px] flex items-center justify-center mt-4 md:mt-0">

          {/* Robot with gentle bob */}
          <div className="absolute inset-0 hero-robot-wrap">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>

        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white z-20" />
    </section>
  )
}
