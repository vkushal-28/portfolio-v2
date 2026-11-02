import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'
import { seo } from './src/data/seo.ts'

/** The placeholder `siteUrl` isn't a real origin; skip tags and files that need one until it's set. */
const hasSiteUrl = !seo.siteUrl.includes('[')

/**
 * Writes title, description, social cards, theme colour and JSON-LD into index.html from
 * `src/data/seo.ts`, and emits robots.txt (+ sitemap.xml once `siteUrl` is real).
 */
function seoTags(): Plugin {
  const meta = (attrs: Record<string, string>): HtmlTagDescriptor => ({
    tag: 'meta',
    attrs,
    injectTo: 'head',
  })
  return {
    name: 'seo-tags',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => ({
        html: html.replace(/<title>.*<\/title>/, `<title>${seo.title}</title>`),
        tags: [
          meta({ name: 'description', content: seo.description }),
          meta({ name: 'theme-color', content: seo.themeColor }),
          ...(hasSiteUrl
            ? [
                {
                  tag: 'link',
                  attrs: { rel: 'canonical', href: `${seo.siteUrl}/` },
                  injectTo: 'head',
                } as const,
                meta({ property: 'og:url', content: `${seo.siteUrl}/` }),
              ]
            : []),
          meta({ property: 'og:type', content: 'website' }),
          meta({ property: 'og:title', content: seo.title }),
          meta({ property: 'og:description', content: seo.description }),
          meta({ property: 'og:image', content: seo.ogImage.url }),
          meta({ property: 'og:image:width', content: String(seo.ogImage.width) }),
          meta({ property: 'og:image:height', content: String(seo.ogImage.height) }),
          meta({ property: 'og:image:alt', content: seo.ogImage.alt }),
          meta({ name: 'twitter:card', content: 'summary_large_image' }),
          meta({ name: 'twitter:title', content: seo.title }),
          meta({ name: 'twitter:description', content: seo.description }),
          meta({ name: 'twitter:image', content: seo.ogImage.url }),
          {
            tag: 'script',
            attrs: { type: 'application/ld+json' },
            children: JSON.stringify(seo.jsonLd),
            injectTo: 'head',
          },
        ],
      }),
    },
    generateBundle() {
      const sitemap = `${seo.siteUrl}/sitemap.xml`
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n${hasSiteUrl ? `\nSitemap: ${sitemap}\n` : ''}`,
      })
      if (hasSiteUrl) {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${seo.siteUrl}/</loc></url>\n</urlset>\n`,
        })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seoTags()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
