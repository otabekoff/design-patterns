<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { lang } = useData()

const translations = {
  en: {
    title: 'PAGE NOT FOUND',
    quote: "But if you don't change your direction, and if you keep looking, you may end up where you are heading.",
    linkText: 'Take me home'
  },
  uz: {
    title: 'SAHIFA TOPILMADI',
    quote: "Lekin yo'nalishingizni o'zgartirmasangiz va qidirishda davom etsangiz, oxiri boradigan joyingizga yetib borasiz.",
    linkText: 'Bosh sahifaga qaytish'
  }
}

const t = computed(() => {
  const currentLang = lang.value || 'en'
  const langKey = currentLang.split('-')[0]
  return translations[langKey] || translations.en
})

const homeLink = computed(() => {
  const currentLang = lang.value || 'en'
  const langKey = currentLang.split('-')[0]
  return langKey === 'en' ? '/' : `/${langKey}/`
})
</script>

<template>
  <div class="not-found-container">
    <p class="code">404</p>
    <h1 class="title">{{ t.title }}</h1>
    <div class="divider"></div>
    <blockquote class="quote">{{ t.quote }}</blockquote>
    <div class="action">
      <a class="link" :href="withBase(homeLink)" :aria-label="t.linkText">
        {{ t.linkText }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  padding: 64px 24px 96px;
  text-align: center;
}

@media (min-width: 768px) {
  .not-found-container {
    padding: 96px 32px 168px;
  }
}

.code {
  line-height: 64px;
  font-size: 64px;
  font-weight: 600;
}

.title {
  padding-top: 12px;
  letter-spacing: 2px;
  line-height: 20px;
  font-size: 20px;
  font-weight: 700;
}

.divider {
  margin: 24px auto 18px;
  width: 64px;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.quote {
  margin: 0 auto;
  max-width: 256px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.action {
  padding-top: 20px;
}

.link {
  display: inline-block;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 16px;
  padding: 3px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: border-color 0.25s, color 0.25s;
  text-decoration: none;
}

.link:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-2);
}
</style>
