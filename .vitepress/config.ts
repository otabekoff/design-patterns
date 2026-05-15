import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Design Patterns",
  description: "Design Patterns - Complete Reference Guide",
  
  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    uz: {
      label: 'Oʻzbekcha',
      lang: 'uz',
      link: '/uz/'
    },
    ru: {
      label: 'Русский',
      lang: 'ru',
      link: '/ru/'
    },
    tr: {
      label: 'Türkçe',
      lang: 'tr',
      link: '/tr/'
    },
    de: {
      label: 'Deutsch',
      lang: 'de',
      link: '/de/'
    },
    es: {
      label: 'Español',
      lang: 'es',
      link: '/es/'
    },
    ar: {
      label: 'العربية',
      lang: 'ar',
      link: '/ar/',
      dir: 'rtl'
    }
  },

  themeConfig: {
    logo: { light: '/logo-light.svg', dark: '/logo-dark.svg' },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
