<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { Lightbulb } from '@lucide/vue'

const { lang } = useData()

const translations = {
  en: {
    supportText: 'Did this guide help you? Support us to make it even better.',
    supportBtn: 'Support Us'
  },
  uz: {
    supportText: 'Qo\'llanma sizga foydali bo\'ldimi? Uni yaxshilash uchun bizni qo\'llab-quvvatlang.',
    supportBtn: 'Qo\'llab-quvvatlash'
  },
  ru: {
    supportText: 'Помогло ли вам это руководство? Поддержите нас, чтобы сделать его еще лучше.',
    supportBtn: 'Поддержать'
  },
  tr: {
    supportText: 'Bu rehber size yardımcı oldu mu? Daha iyi hale getirmek için bizi destekleyin.',
    supportBtn: 'Destek Ol'
  },
  de: {
    supportText: 'Hat Ihnen diese Anleitung geholfen? Unterstützen Sie uns, um sie noch besser zu machen.',
    supportBtn: 'Unterstützen'
  },
  es: {
    supportText: '¿Te ayudó esta guía? Apóyanos para mejorarla aún más.',
    supportBtn: 'Apóyanos'
  },
  ar: {
    supportText: 'هل ساعدك هذا الدليل؟ ادعمنا لجعله أفضل.',
    supportBtn: 'ادعمنا'
  }
}

const t = computed(() => {
  const currentLang = lang.value || 'en'
  const langKey = currentLang.split('-')[0]
  return translations[langKey] || translations.en
})
</script>

<template>
  <div class="support-banner">
    <div class="support-content">
      <div class="icon-wrapper">
        <Lightbulb :size="20" class="support-icon-svg" />
      </div>
      <span class="support-text">{{ t.supportText }}</span>
    </div>
    <a href="https://tirikchilik.uz/uzhandy" target="_blank" class="support-btn">
      {{ t.supportBtn }}
    </a>
  </div>
</template>

<style scoped>
.support-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--vp-c-brand-soft);
  padding: 16px 20px;
  border-radius: 12px;
  gap: 16px;
  border: 1px solid var(--vp-c-brand-soft);
  transition: all 0.3s ease;
}

.support-banner:hover {
  border-color: var(--vp-c-brand-2);
  background-color: var(--vp-c-brand-soft-hover, var(--vp-c-brand-soft));
}

.support-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: var(--vp-c-brand-1);
  border-radius: 50%;
  flex-shrink: 0;
  color: white;
}

.support-icon-svg {
  color: white;
}

.support-text {
  font-weight: 500;
  font-size: 14px;
  line-height: 1.4;
  color: var(--vp-c-text-1);
}

.support-btn {
  background-color: var(--vp-c-brand-1);
  color: white !important;
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none !important;
  white-space: nowrap;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.support-btn:hover {
  background-color: var(--vp-c-brand-2);
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .support-banner {
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    gap: 12px;
  }

  .support-btn {
    width: 100%;
  }

  .support-content {
    align-items: flex-start;
  }
}
</style>
