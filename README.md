# calma

your reviews. on autopilot.

Marketing site for calma — smart review management for local businesses in India. Built with React, Vite, Framer Motion, and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Production build

```bash
npm run build
npm run preview
```

Output goes to `dist/`.

## Deploy to Vercel

### Option 1: Vercel CLI

```bash
npm i -g vercel
vercel
```

Accept the defaults — `vercel.json` already configures the framework, build command, and output directory. Run `vercel --prod` to promote to production.

### Option 2: Git integration

1. Push this repo to GitHub.
2. Go to vercel.com → Add New → Project → import the repo.
3. Vercel auto-detects Vite. No settings changes needed.
4. Deploy.

### Custom domain

In Vercel project settings → Domains, add `heycalma.in` and follow the DNS instructions.

## Structure

```
src/
  App.jsx                 section order
  components/
    Nav.jsx               sticky blur nav
    Hero.jsx              headline + CTA
    FeatureRail.jsx       horizontal feature card rail
    Problem.jsx           3 problem cards
    HowItWorks.jsx        4 numbered steps
    LatestRail.jsx        "the latest." card carousel
    Pricing.jsx           3 tiers
    Testimonials.jsx      2 quotes
    FinalCTA.jsx          closing call to action
    Footer.jsx            one-line footer
    FadeUp.jsx            scroll reveal wrapper
```

## Performance notes

- No 3D libraries — main bundle stays small.
- Static assets get immutable cache headers via `vercel.json`.
