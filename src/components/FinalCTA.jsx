import { Link } from 'react-router-dom'
import FadeUp from './FadeUp.jsx'
import { LiquidButton } from '@/components/ui/liquid-glass-button'

export default function FinalCTA() {
  return (
    <section className="bg-cloud py-32 md:py-44">
      <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
        <FadeUp>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
            your reputation is
            <br />
            your business.
          </h2>
          <p className="mt-6 text-lg md:text-xl text-muted">
            let calma handle it.
          </p>
          <Link to="/pricing" className="inline-block mt-12">
            <LiquidButton size="xxl">start today</LiquidButton>
          </Link>
        </FadeUp>
      </div>
    </section>
  )
}
