import { defineConfig } from 'vitepress'
import path from 'path'
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
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
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
