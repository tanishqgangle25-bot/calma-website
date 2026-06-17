import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')

const pages = [
  {
    route: 'features',
    title: 'Features — AI Review Management for Restaurants | calma',
    description: 'calma monitors Google, Zomato, and Swiggy reviews 24/7, replies in your brand voice, tracks sentiment, and helps restaurants across India improve ratings in 60 days.',
  },
  {
    route: 'how-it-works',
    title: 'How It Works — Set Up calma in 10 Minutes | calma',
    description: 'Connect your Google Business Profile, Zomato, and Swiggy in 90 seconds. calma starts monitoring and replying to reviews automatically — no manual effort needed.',
  },
  {
    route: 'pricing',
    title: 'Pricing — Plans Starting at Rs. 5,999/month | calma',
    description: 'calma pricing starts at Rs. 5,999 per month for single-location restaurants. All plans include a 60-day rating improvement guarantee or full refund.',
  },
  {
    route: 'testimonials',
    title: 'Reviews — What Restaurant Owners Say About calma | calma',
    description: 'See how restaurants across India improved their Google ratings with calma. Real results from cafe and restaurant owners who use calma to manage reviews automatically.',
  },
  {
    route: 'contact',
    title: 'Contact — Get a Free Demo of calma | calma',
    description: 'Get a free 20-minute demo of calma for your restaurant. Chat on WhatsApp or email the calma team to see how AI review management works on your real restaurant profile.',
  },
  {
    route: 'ecosystem',
    title: 'Ecosystem — calma Products and Integrations | calma',
    description: 'Explore the calma ecosystem: review management, reputation intelligence, and AI automation tools for Indian restaurants and hospitality businesses.',
  },
  {
    route: 'faq',
    title: 'FAQ — Common Questions About calma | calma',
    description: 'Answers to the most common questions about calma: how it works, pricing, platforms supported, and whether it works for your restaurant in India.',
  },
  {
    route: 'about',
    title: 'About — calma and thenightera | calma',
    description: 'calma is built by thenightera, a brand intelligence company from Indore, India. Learn about the mission, the founder, and why we built AI review management for Indian restaurants.',
  },
]

const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf-8')

for (const page of pages) {
  const canonical = `https://heycalma.in/${page.route}`
  const title = page.title
  const desc = page.description

  let html = baseHtml
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
  html = html.replace(/(<meta name="description" content=")[^"]*"/, `$1${desc}"`)
  html = html.replace(/(<link rel="canonical" href=")[^"]*"/, `$1${canonical}"`)
  html = html.replace(/(<meta property="og:title" content=")[^"]*"/, `$1${title}"`)
  html = html.replace(/(<meta property="og:description" content=")[^"]*"/, `$1${desc}"`)
  html = html.replace(/(<meta property="og:url" content=")[^"]*"/, `$1${canonical}"`)
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${title}"`)
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*"/, `$1${desc}"`)

  const dir = join(distDir, page.route)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html, 'utf-8')
  console.log(`prerendered /${page.route}`)
}

console.log(`done — ${pages.length} pages prerendered with per-page meta`)
