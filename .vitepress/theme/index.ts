import { h } from 'vue'
import { useRoute } from 'vitepress'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'virtual:group-icons.css'
import './style.css'

import Callout from './components/Callout.vue'
import Cards from './components/Cards.vue'
import Card from './components/Card.vue'
import Tabs from './components/Tabs.vue'
import TabsList from './components/TabsList.vue'
import TabsTrigger from './components/TabsTrigger.vue'
import TabsContent from './components/TabsContent.vue'

import HomeCategoriesHeader from './components/HomeCategoriesHeader.vue'
import DocHeader from './components/DocHeader.vue'
import DocFooter from './components/DocFooter.vue'
import NotFound from './components/NotFound.vue'
import SidebarTop from './components/SidebarTop.vue'
import SidebarBottom from './components/SidebarBottom.vue'
import CoverImage from './components/CoverImage.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'home-features-before': () => h(HomeCategoriesHeader),
      'doc-before': () => h(DocHeader),
      'doc-footer-before': () => h(DocFooter),
      'not-found': () => h(NotFound),
      'sidebar-nav-before': () => h(SidebarTop),
      'sidebar-nav-after': () => h(SidebarBottom)
    })
  },

  setup() {
    const route = useRoute()
  },

  enhanceApp({ app }) {
    app.component('Callout', Callout)
    app.component('Cards', Cards)
    app.component('Card', Card)
    app.component('Tabs', Tabs)
    app.component('TabsList', TabsList)
    app.component('TabsTrigger', TabsTrigger)
    app.component('TabsContent', TabsContent)
    app.component('CoverImage', CoverImage)
  }
} satisfies Theme
