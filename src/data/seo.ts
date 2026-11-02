// Imported by vite.config.ts at build time (nodenext resolution), so relative imports need `.ts`.
import { profile } from './profile.ts'
import { socials } from './socials.ts'

// PLACEHOLDER: set to the deployed origin (no trailing slash) so Open Graph URLs are absolute.
const siteUrl = 'https://[your-domain]'

/** Document meta, social cards and structured data. Injected into index.html by vite.config.ts. */
export const seo = {
  siteUrl,
  title: `${profile.name} — ${profile.title}`,
  description: profile.headline,
  themeColor: '#0A0B0D',
  ogImage: {
    url: `${siteUrl}/og-image.png`,
    width: 1200,
    height: 630,
    alt: `${profile.name} — ${profile.title}`,
  },
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title,
    url: siteUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Calgary',
      addressRegion: 'AB',
      addressCountry: 'CA',
    },
    sameAs: socials.map((social) => social.href),
  },
}
