import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')

const pages = [
  {
    route: '',
    outFile: 'index.html',
    title: 'AI Review Management for Restaurants in India | calma',
    description: 'calma automates Google review replies for restaurants in India. AI-powered reputation management, 24/7 monitoring, and rating improvement — so you focus on the food.',
    canonical: 'https://heycalma.in/',
  },
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
    title: 'About calma — Built in Indore for Indian Restaurants | calma',
    description: 'calma is built by thenightera, a brand intelligence company from Indore, India. Learn about the mission, the founder, and why we built AI review management for Indian restaurants.',
  },
]

const OG_IMAGE = 'https://heycalma.in/images/restaurant.jpg'
const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf-8')

for (const page of pages) {
  const canonical = page.canonical || `https://heycalma.in/${page.route}`
  const { title, description } = page

  const metaBlock = `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonical}" />
    <meta name="robots" content="index, follow" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="calma" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:alt" content="calma — AI review management for restaurants in India" />
    <meta property="og:locale" content="en_IN" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@heycalma" />
    <meta name="twitter:creator" content="@thenightera" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />`

  // Remove any existing title/description/canonical/og/twitter injected by Vite build
  let html = baseHtml
  html = html.replace(/<title>[^<]*<\/title>/, '')
  html = html.replace(/<meta name="description"[^>]*>/g, '')
  html = html.replace(/<link rel="canonical"[^>]*>/g, '')
  html = html.replace(/<meta name="robots"[^>]*>/g, '')
  html = html.replace(/<meta property="og:[^>]*>/g, '')
  html = html.replace(/<meta name="twitter:[^>]*>/g, '')

  // Inject clean meta block right after <head>
  html = html.replace('<head>', `<head>${metaBlock}`)

  const outFile = page.outFile || null
  if (outFile) {
    writeFileSync(join(distDir, outFile), html, 'utf-8')
    console.log('prerendered / (home)')
  } else {
    const dir = join(distDir, page.route)
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, 'index.html'), html, 'utf-8')
    console.log(`prerendered /${page.route}`)
  }
}

console.log(`done — ${pages.length} pages prerendered with per-page meta`)
