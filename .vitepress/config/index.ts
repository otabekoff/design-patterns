import { defineConfig } from 'vitepress'
import { en } from './langs/en'
import { uz } from './langs/uz'
import { ru } from './langs/ru'
import { tr } from './langs/tr'
import { de } from './langs/de'
import { es } from './langs/es'
import { ar } from './langs/ar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Design Patterns",
  description: "Complete Reference Guide",
  
  locales: {
    root: en,
    uz,
    ru,
    tr,
    de,
    es,
    ar
  },

  themeConfig: {
    logo: { light: '/logo-light.svg', dark: '/logo-dark.svg' },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
