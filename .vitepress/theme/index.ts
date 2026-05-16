import { h, onMounted, watch, nextTick, render } from 'vue'
import { useRoute } from 'vitepress'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { WrapText } from '@lucide/vue'
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

const getIconSvg = () => {
  if (typeof document === 'undefined') return '';
  const container = document.createElement("div");
  const vnode = h(WrapText, { size: 20, strokeWidth: 2 });
  render(vnode, container);
  return container.innerHTML;
};

const wrapIcon = getIconSvg();

const initCodeWrap = () => {
  if (typeof document === 'undefined') return;

  const blocks = document.querySelectorAll('div[class*="language-"]');

  blocks.forEach((block) => {
    if (block.querySelector(".wrap-button")) return;

    const copyBtn = block.querySelector("button.copy");
    if (!copyBtn) return;

    const wrapBtn = document.createElement("button");
    wrapBtn.className = "wrap-button";
    wrapBtn.title = "Toggle Code Wrap";
    wrapBtn.innerHTML = wrapIcon;

    const isWrapped = localStorage.getItem("vp-code-wrap") === "true";
    if (isWrapped) {
      block.classList.add("is-wrapped");
      wrapBtn.classList.add("active");
    }

    wrapBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const active = block.classList.toggle("is-wrapped");
      wrapBtn.classList.toggle("active");
      localStorage.setItem("vp-code-wrap", String(active));

      document.querySelectorAll('div[class*="language-"]').forEach((b) => {
        b.classList.toggle("is-wrapped", active);
        const bBtn = b.querySelector(".wrap-button");
        if (bBtn) bBtn.classList.toggle("active", active);
      });
    });

    copyBtn.parentNode?.insertBefore(wrapBtn, copyBtn);
  });
};

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

    onMounted(() => {
      // Small delay to ensure layout stability
      setTimeout(initCodeWrap, 500)
    })

    watch(() => route.path, () => {
      nextTick(() => setTimeout(initCodeWrap, 300))
    })
  },

  enhanceApp({ app }) {
    app.component('Callout', Callout)
    app.component('Cards', Cards)
    app.component('Card', Card)
    app.component('Tabs', Tabs)
    app.component('TabsList', TabsList)
    app.component('TabsTrigger', TabsTrigger)
    app.component('TabsContent', TabsContent)
  }
} satisfies Theme
