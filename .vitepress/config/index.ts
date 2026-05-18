import { defineConfig } from 'vitepress'
import path from 'path'
import { joinURL, withoutTrailingSlash } from 'ufo'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { en } from './langs/en'
import { uz } from './langs/uz'
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
  ignoreDeadLinks: true,
  metaChunk: true,
  mpa: false,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/design-patterns/favicon-96x96.png?v=20260516', sizes: '96x96' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/design-patterns/favicon.svg?v=20260516' }],
    ['link', { rel: 'shortcut icon', href: '/design-patterns/favicon.ico?v=20260516' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/design-patterns/apple-touch-icon.png?v=20260516' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Design Patterns' }],
    ['link', { rel: 'manifest', href: '/design-patterns/site.webmanifest?v=20260516' }],
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
      
      const fence = md.renderer.rules.fence!
      md.renderer.rules.fence = function (tokens, idx, options, env, self) {
        const { localeIndex = 'root' } = env
        const codeCopyButtonTitle = (() => {
          switch (localeIndex) {
            case 'uz':
              return 'Kodni nusxalash'
            case 'es':
              return 'Copiar código'
            case 'fa':
              return 'کپی کد'
            case 'ko':
              return '코드 복사'
            case 'pt':
              return 'Copiar código'
            case 'ru':
              return 'Скопировать код'
            case 'zh':
              return '复制代码'
            default:
              return 'Copy code'
          }
        })()
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
          'bash': 'vscode-icons:file-type-shell',
          'java': 'logos:java'
        }
      })
    ],
  }
})
