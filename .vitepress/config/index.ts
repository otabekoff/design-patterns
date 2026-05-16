import { defineConfig } from 'vitepress'
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
  title: "Design Patterns",
  description: "Complete Reference Guide",

  locales: {
    root: processLocale(en),
    uz: processLocale(uz),
    ru: processLocale(ru),
    tr: processLocale(tr),
    de: processLocale(de),
    es: processLocale(es),
    ar: processLocale(ar)
  },

  themeConfig: {
    logo: { light: '/logo-light.svg', dark: '/logo-dark.svg' },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
