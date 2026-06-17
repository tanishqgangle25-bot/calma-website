import Hero from '../components/Hero.jsx'
import ImageMoments from '../components/ImageMoments.jsx'
import TrustStrip from '../components/TrustStrip.jsx'
import FeatureRail from '../components/FeatureRail.jsx'
import Problem from '../components/Problem.jsx'
import Guarantees from '../components/Guarantees.jsx'
import StickyNotes from '../components/StickyNotes.jsx'
import LatestRail from '../components/LatestRail.jsx'
import Testimonials from '../components/Testimonials.jsx'
import FounderNote from '../components/FounderNote.jsx'
import FinalCTA from '../components/FinalCTA.jsx'
import SEOHead from '../components/SEOHead.jsx'
import { homePageSchema } from '../seo/schemas.js'

export default function Home() {
  return (
    <>
      <SEOHead
        title="AI Review Management for Restaurants in India"
        description="calma automates Google review replies for restaurants in India. AI-powered reputation management, 24/7 monitoring, and rating improvement — so you focus on the food."
        path="/"
        schema={homePageSchema}
      />
      <Hero />
      <ImageMoments />
      <TrustStrip />
      <FeatureRail />
      <Problem />
      <Guarantees />
      <StickyNotes />
      <LatestRail />
      <Testimonials />
      <FounderNote />
      <FinalCTA />
    </>
  )
}
