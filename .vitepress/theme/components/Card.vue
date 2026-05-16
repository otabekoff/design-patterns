<template>
  <a v-if="href" :href="withBase(href)" class="vp-card is-link">
    <h3 class="title">{{ title }}</h3>
    <p v-if="description" class="description">{{ description }}</p>
    <slot></slot>
  </a>
  <div v-else class="vp-card">
    <h3 class="title">{{ title }}</h3>
    <p v-if="description" class="description">{{ description }}</p>
    <slot></slot>
  </div>
</template>

<script setup>
import { withBase } from 'vitepress'
defineProps({
  title: String,
  description: String,
  href: String,
  icon: String
})
</script>

<style scoped>
.vp-card {
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s;
}

.is-link {
  text-decoration: none;
}

.is-link:hover {
  border-color: var(--vp-c-brand-1);
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
}
</style>
