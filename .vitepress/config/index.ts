import { defineConfig } from 'vitepress'
import path from 'path'
import { joinURL, withoutTrailingSlash } from 'ufo'
import { addOgImage } from 'vitepress-plugin-og'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { en } from './langs/en'
import { uz } from './langs/uz'
import { ru } from './langs/ru'
import { tr } from './langs/tr'
import { de } from './langs/de'
import { es } from './langs/es'
import { ar } from './langs/ar'
import { injectSidebarIcons } from './icon-injector'

function processLocale(localeObj: any) {
  if (localeObj.themeConfig && localeObj.themeConfig.sidebar) {
    localeObj.themeConfig.sidebar = injectSidebarIcons(localeObj.themeConfig.sidebar)
  }
  return localeObj
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'src',
  base: '/design-patterns/',
  title: "Design Patterns",
  description: "Complete Reference Guide",
  sitemap: {
    hostname: 'https://otabekoff.github.io/design-patterns/'
  },
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/design-patterns/favicon/favicon-96x96.png?v=20260516', sizes: '96x96' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/design-patterns/favicon/favicon.svg?v=20260516' }],
    ['link', { rel: 'shortcut icon', href: '/design-patterns/favicon/favicon.ico?v=20260516' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/design-patterns/favicon/apple-touch-icon.png?v=20260516' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Design Patterns' }],
    ['link', { rel: 'manifest', href: '/design-patterns/favicon/site.webmanifest?v=20260516' }],
    ['meta', { name: 'twitter:site', content: '@otabekoff' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:type', content: 'image/png' }],
    ['meta', { property: 'og:site_name', content: 'Design Patterns' }],
    ['meta', { property: 'og:type', content: 'website' }]
  ],
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
  transformPageData: async (pageData, context) => {
    const { siteConfig } = context
    pageData.frontmatter.head ??= []

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
      [
        'link',
        {
          rel: 'canonical',
          href: joinURL(
            'https://otabekoff.github.io/design-patterns/',
            withoutTrailingSlash(pageData.filePath.replace(/(index)?\.md$/, '')),
          ),
        },
      ],
      [
        'meta',
        {
          property: 'og:url',
          content: joinURL(
            'https://otabekoff.github.io/design-patterns/',
            withoutTrailingSlash(pageData.filePath.replace(/(index)?\.md$/, '')),
          ),
        },
      ]
    )

    await addOgImage(pageData, context, {
      domain: 'https://otabekoff.github.io/design-patterns',
      outDir: 'og',
      ogTemplate: '.vitepress/og-template.svg',
      maxTitleSizePerLine: 20,
    })
  },
  locales: {
    root: processLocale(en),
    uz: processLocale(uz),
    ru: processLocale(ru),
    tr: processLocale(tr),
    de: processLocale(de),
    es: processLocale(es),
    ar: processLocale(ar)
  },
  cleanUrls: true,
  themeConfig: {
    logo: { light: '/logo-light.svg', dark: '/logo-dark.svg' },
    externalLinkIcon: true,
    i18nRouting: false,
    search: {
      provider: 'local',
      options: {
        locales: {
          root: (en as any).search || {},
          uz: (uz as any).search || {},
          ru: (ru as any).search || {},
          tr: (tr as any).search || {},
          de: (de as any).search || {},
          es: (es as any).search || {},
          ar: (ar as any).search || {}
        }
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
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
          'bash': 'vscode-icons:file-type-shell'
        }
      })
    ],
  }
})
