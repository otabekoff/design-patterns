import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import { joinURL, withoutTrailingSlash } from 'ufo'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { en } from './langs/en'
import { uz } from './langs/uz'
import { injectSidebarIcons } from './icon-injector'
import { MermaidMarkdown } from './mermaid-markdown'

const SITE_URL = 'https://otabekoff.github.io/design-patterns/'

// GitHub Pages serves the site under /design-patterns/; other hosts (Netlify) set SITE_BASE=/
const BASE = process.env.SITE_BASE || '/design-patterns/'

const pageUrl = (relativePath: string) =>
  joinURL(SITE_URL, withoutTrailingSlash(relativePath.replace(/(index)?\.md$/, '')))

// Social preview image: the page's <CoverImage> cover, pre-cropped to 1200x630 JPEG in public/og
// by scripts/optimize-images.py, falling back to the site-wide character image
function ogImageFor(filePath: string) {
  try {
    const cover = fs.readFileSync(filePath, 'utf8').match(/<CoverImage\s+src="\/covers\/([^"]+)\.(?:png|webp)"/)
    if (cover) return joinURL(SITE_URL, 'og', `${cover[1]}.jpg`)
  } catch {}
  return joinURL(SITE_URL, 'og', 'character.jpg')
}

function processLocale(localeObj: any) {
  if (localeObj.themeConfig && localeObj.themeConfig.sidebar) {
    localeObj.themeConfig.sidebar = injectSidebarIcons(localeObj.themeConfig.sidebar)
  }
  return localeObj
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'src',
  base: BASE,
  title: "Design Patterns",
  description: "Complete Reference Guide",
  sitemap: {
    hostname: SITE_URL
  },
  metaChunk: true,
  mpa: false,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: `${BASE}favicon-96x96.png?v=20260516`, sizes: '96x96' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${BASE}favicon.svg?v=20260516` }],
    ['link', { rel: 'shortcut icon', href: `${BASE}favicon.ico?v=20260516` }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: `${BASE}apple-touch-icon.png?v=20260516` }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Design Patterns' }],
    ['link', { rel: 'manifest', href: `${BASE}site.webmanifest?v=20260516` }],
    ['meta', { name: 'twitter:site', content: '@otabekoff' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:type', content: 'image/jpeg' }],
    ['meta', { property: 'og:site_name', content: 'Design Patterns' }],
    ['meta', { property: 'og:type', content: 'website' }]
  ],
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
      MermaidMarkdown(md)

      const fence = md.renderer.rules.fence!
      md.renderer.rules.fence = function (tokens, idx, options, env, self) {
        const { localeIndex = 'root' } = env
        const codeCopyButtonTitle = localeIndex === 'uz' ? 'Kodni nusxalash' : 'Copy code'
        return fence(tokens, idx, options, env, self).replace(
          '<button title="Copy Code" class="copy"></button>',
          `<button title="${codeCopyButtonTitle}" class="copy"></button>`
        )
      }
    },
  },
  transformPageData: async (pageData, context) => {
    const { siteConfig } = context
    pageData.frontmatter.head ??= []

    // Hide navbar on doc pages, but keep it on home/index pages
    if (!pageData.filePath.endsWith('index.md')) {
      pageData.frontmatter.navbar = false
      pageData.frontmatter.aside = true
    }

    const ogImage = ogImageFor(path.join(siteConfig.srcDir, pageData.relativePath))

    pageData.frontmatter.head.push(
      [
        'meta',
        {
          property: 'og:title',
          content: pageData.frontmatter.title || pageData.title || siteConfig.site.title,
        },
      ],
      [
        'meta',
        {
          name: 'twitter:title',
          content: pageData.frontmatter.title || pageData.title || siteConfig.site.title,
        },
      ],
      [
        'meta',
        {
          property: 'og:description',
          content: pageData.frontmatter.description || pageData.description || siteConfig.site.description,
        },
      ],
      [
        'meta',
        {
          name: 'twitter:description',
          content: pageData.frontmatter.description || pageData.description || siteConfig.site.description,
        },
      ],
      ['meta', { property: 'og:image', content: ogImage }],
      ['meta', { name: 'twitter:image', content: ogImage }],
      ['link', { rel: 'canonical', href: pageUrl(pageData.relativePath) }],
      ['meta', { property: 'og:url', content: pageUrl(pageData.relativePath) }]
    )

    // hreflang alternates between the English (root) and Uzbek versions of a page
    const enPath = pageData.relativePath.replace(/^uz\//, '')
    const uzPath = `uz/${enPath}`
    if (fs.existsSync(path.join(siteConfig.srcDir, enPath)) && fs.existsSync(path.join(siteConfig.srcDir, uzPath))) {
      pageData.frontmatter.head.push(
        ['link', { rel: 'alternate', hreflang: 'en', href: pageUrl(enPath) }],
        ['link', { rel: 'alternate', hreflang: 'uz', href: pageUrl(uzPath) }],
        ['link', { rel: 'alternate', hreflang: 'x-default', href: pageUrl(enPath) }]
      )
    }
  },
  locales: {
    root: processLocale(en),
    uz: processLocale(uz)
  },
  cleanUrls: true,
  themeConfig: {
    logo: { light: '/logo-light.svg', dark: '/logo-dark.svg' },
    externalLinkIcon: true,
    // i18nRouting: false,
    search: {
      provider: 'local',
      options: {
        locales: {
          root: (en as any).search || {},
          uz: (uz as any).search || {}
        }
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/otabekoff/design-patterns' }
    ]
  },
  vite: {
    publicDir: path.resolve(__dirname, '../../public'),
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          'ts': 'vscode-icons:file-type-typescript-official',
          'py': 'vscode-icons:file-type-python',
          'typescript': 'vscode-icons:file-type-typescript-official',
          'python': 'vscode-icons:file-type-python',
          'sh': 'vscode-icons:file-type-shell',
          'bash': 'vscode-icons:file-type-shell',
          'java': 'logos:java',
          'rs': 'vscode-icons:file-type-rust',
          'rust': 'vscode-icons:file-type-rust',
          'go': 'vscode-icons:file-type-go'
        }
      })
    ],
  }
})
