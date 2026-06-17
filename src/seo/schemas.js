// Shared structured data schemas for calma

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://heycalma.in/#organization',
  name: 'calma',
  url: 'https://heycalma.in',
  logo: 'https://heycalma.in/images/cute-1.png',
  description: 'calma is an AI-powered reputation management platform for restaurants in India that automates Google review responses 24/7.',
  email: 'officialnightera@gmail.com',
  parentOrganization: {
    '@type': 'Organization',
    name: 'thenightera',
    url: 'https://www.thenightera.in',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Indore',
    addressRegion: 'Madhya Pradesh',
    addressCountry: 'IN',
  },
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  sameAs: [
    'https://www.instagram.com/heycalma',
    'https://www.thenightera.in',
  ],
}

export const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': 'https://heycalma.in/#software',
  name: 'calma',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://heycalma.in',
  description: 'AI-powered Google review management and reputation automation for Indian restaurants and cafes.',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
  },
  provider: {
    '@id': 'https://heycalma.in/#organization',
  },
  featureList: [
    '24/7 automated Google review replies',
    'AI-generated personalised responses',
    'Sentiment analysis and rating tracking',
    'Multi-location restaurant dashboard',
    'Weekly reputation reports',
    'Negative review damage control',
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Restaurant owners, cafe owners, hospitality businesses in India',
  },
}

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://heycalma.in/#localbusiness',
  name: 'calma — AI Review Management',
  url: 'https://heycalma.in',
  description: 'calma automates Google review replies for restaurants across India. AI-powered reputation management based in Indore, Madhya Pradesh.',
  email: 'officialnightera@gmail.com',
  image: 'https://heycalma.in/images/restaurant.jpg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Indore',
    addressRegion: 'Madhya Pradesh',
    postalCode: '452001',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 22.7196,
    longitude: 75.8577,
  },
  areaServed: [
    { '@type': 'City', name: 'Indore' },
    { '@type': 'City', name: 'Mumbai' },
    { '@type': 'City', name: 'Delhi' },
    { '@type': 'City', name: 'Bangalore' },
    { '@type': 'Country', name: 'India' },
  ],
  priceRange: '₹₹',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://heycalma.in/#website',
  name: 'calma',
  url: 'https://heycalma.in',
  description: 'AI review management for restaurants in India. Automated Google review replies, reputation monitoring, and rating improvement.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://heycalma.in/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
  publisher: {
    '@id': 'https://heycalma.in/#organization',
  },
}

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is calma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'calma is an AI-powered reputation management platform that automatically monitors and replies to your Google reviews 24/7. It is built specifically for restaurants, cafes, and hospitality businesses in India.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does calma manage Google reviews automatically?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'calma connects to your Google Business Profile and uses AI to detect new reviews, analyse sentiment, and post personalised, on-brand replies within minutes — without any manual effort from the restaurant owner.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to improve my Google rating with calma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most calma clients see a measurable improvement in their Google rating within 60 days. Responding to reviews consistently signals engagement to Google, which boosts local search visibility.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is calma suitable for restaurants in Indore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. calma is headquartered in Indore, Madhya Pradesh, and was built specifically for Indian restaurant owners. It understands local context, Hindi-English mixed reviews, and the hospitality culture in India.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the price of calma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'calma offers flexible monthly plans for restaurants of all sizes. Visit the pricing page on heycalma.in or contact the team at officialnightera@gmail.com for a custom quote.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can calma handle negative reviews?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. calma detects negative reviews instantly and responds with carefully crafted, empathetic replies that protect your brand reputation and show other customers you care about their experience.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who built calma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'calma is built by thenightera, a brand intelligence company based in Indore, India, that specialises in AI automation, brand identity, and digital positioning for Indian businesses.',
      },
    },
  ],
}

export const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to set up calma for your restaurant',
  description: 'Connect calma to your restaurant accounts and start getting automated Google review replies in under 10 minutes.',
  totalTime: 'PT10M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Connect your accounts',
      text: 'Link your Google Business Profile, Zomato, and Swiggy accounts in 90 seconds using one-click OAuth. No passwords stored.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'calma starts watching',
      text: 'Every new review triggers calma instantly. Sentiment is scored and urgency tagged automatically.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Replies drafted in your voice',
      text: 'calma learns your brand tone in the first week. Approve replies manually or let calma post them automatically.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Get weekly insights',
      text: 'Every Monday you receive a short report: what hurt your rating, what helped, and what to fix next.',
    },
  ],
}

export const featureFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does calma reply to Zomato and Swiggy reviews?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. calma monitors and replies to reviews across Google, Zomato, and Swiggy from a single dashboard.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can calma track competitor restaurant reviews?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. calma Plus and Pro plans include competitor tracking, letting you monitor ratings and review trends for up to unlimited competitors.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does calma work for multiple restaurant locations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. calma supports multi-location management from a single dashboard. You can compare performance across branches side by side.',
      },
    },
  ],
}

export const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://heycalma.in/#webpage',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.speakable'],
  },
  url: 'https://heycalma.in',
}

export const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://heycalma.in/about#webpage',
      url: 'https://heycalma.in/about',
      name: 'About calma — AI Review Management for Indian Restaurants',
      description: 'calma is built by thenightera, a brand intelligence company based in Indore, Madhya Pradesh. Founded by Tanishq Gangle to help Indian restaurants improve their reputation through AI automation.',
      publisher: { '@id': 'https://heycalma.in/#organization' },
    },
    {
      '@type': 'Person',
      '@id': 'https://heycalma.in/#founder',
      name: 'Tanishq Gangle',
      jobTitle: 'Founder',
      worksFor: { '@id': 'https://heycalma.in/#organization' },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Indore',
        addressRegion: 'Madhya Pradesh',
        addressCountry: 'IN',
      },
      sameAs: ['https://www.instagram.com/thenightera'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://heycalma.in/#organization',
      name: 'calma',
      url: 'https://heycalma.in',
      logo: 'https://heycalma.in/images/cute-1.png',
      email: 'officialnightera@gmail.com',
      foundingDate: '2024',
      founder: { '@id': 'https://heycalma.in/#founder' },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Indore',
        addressRegion: 'Madhya Pradesh',
        postalCode: '452001',
        addressCountry: 'IN',
      },
      sameAs: [
        'https://www.instagram.com/heycalma',
        'https://www.instagram.com/thenightera',
        'https://www.thenightera.in',
      ],
    },
  ],
}

export const homePageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    websiteSchema,
    organizationSchema,
    softwareSchema,
    localBusinessSchema,
    faqSchema,
    speakableSchema,
  ],
}
