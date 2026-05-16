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
  },
  ru: {
    title: 'СТРАНИЦА НЕ НАЙДЕНА',
    quote: "Но если вы не измените направление и продолжите искать, вы можете оказаться там, куда направляетесь.",
    linkText: 'На главную'
  },
  tr: {
    title: 'SAYFA BULUNAMADI',
    quote: "Ancak yönünüzü değiştirmezseniz ve bakmaya devam ederseniz, gitmekte olduğunuz yere varabilirsiniz.",
    linkText: 'Ana sayfaya dön'
  },
  de: {
    title: 'SEITE NICHT GEFUNDEN',
    quote: "Aber wenn Sie Ihre Richtung nicht ändern und weiter suchen, landen Sie vielleicht dort, wo Sie hinwollen.",
    linkText: 'Zurück zur Startseite'
  },
  es: {
    title: 'PÁGINA NO ENCONTRADA',
    quote: "Pero si no cambias de dirección y sigues buscando, puede que acabes donde te diriges.",
    linkText: 'Ir al inicio'
  },
  ar: {
    title: 'الصفحة غير موجودة',
    quote: "ولكن إذا لم تغير اتجاهك، وإذا استمررت في البحث، فقد ينتهي بك الأمر إلى حيث تتجه.",
    linkText: 'العودة إلى الصفحة الرئيسية'
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
