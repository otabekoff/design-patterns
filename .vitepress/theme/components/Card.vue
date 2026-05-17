<template>
  <a v-if="href" :href="localizedHref" class="vp-card is-link">
    <div v-if="image" class="image-wrapper">
      <img :src="withBase(image)" class="card-image" :alt="title" loading="lazy" />
    </div>
    <div class="content-wrapper">
      <h3 class="title">{{ title }}</h3>
      <p v-if="description" class="description">{{ description }}</p>
      <slot></slot>
    </div>
  </a>
  <div v-else class="vp-card">
    <div v-if="image" class="image-wrapper">
      <img :src="withBase(image)" class="card-image" :alt="title" loading="lazy" />
    </div>
    <div class="content-wrapper">
      <h3 class="title">{{ title }}</h3>
      <p v-if="description" class="description">{{ description }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const props = defineProps({
  title: String,
  description: String,
  href: String,
  icon: String,
  image: String
})

const { lang } = useData()

const localizedHref = computed(() => {
  if (!props.href) return ''
  
  // Don't modify external links
  if (/^https?:\/\//.test(props.href)) return props.href

  // Get current language code (e.g., 'uz' from 'uz' or 'uz-UZ')
  const currentLang = lang.value || 'en'
  const langKey = currentLang.split('-')[0]
  
  // If we are in a non-English locale and the href is an internal absolute path
  if (langKey !== 'en' && props.href.startsWith('/')) {
    // Prefix with locale if not already prefixed
    const prefix = `/${langKey}`
    if (!props.href.startsWith(prefix)) {
      return withBase(`${prefix}${props.href}`)
    }
  }

  return withBase(props.href)
})
</script>

<style scoped>
.vp-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s, transform 0.25s;
  overflow: hidden;
  height: 100%;
  padding: 0;
}

.is-link {
  text-decoration: none;
}

.is-link:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-4px);
}

.image-wrapper {
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background-color: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-gutter);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
  border: none !important;
  border-radius: 0 !important;
}

.is-link:hover .card-image {
  transform: scale(1.05);
}

.content-wrapper {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.title {
  margin-top: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.description {
  margin: 8px 0 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
</style>
