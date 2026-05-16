<template>
  <a v-if="href" :href="href" class="vp-card" style="display: block; border: 1px solid var(--vp-c-bg-soft); border-radius: 8px; padding: 16px; text-decoration: none; background: var(--vp-c-bg-soft); transition: border-color 0.25s, background-color 0.25s;">
    <h3 style="margin-top: 0; font-size: 16px; font-weight: 600; color: var(--vp-c-text-1);">{{ title }}</h3>
    <p v-if="description" style="margin: 8px 0 0; font-size: 14px; color: var(--vp-c-text-2);">{{ description }}</p>
    <slot></slot>
  </a>
  <div v-else class="vp-card" style="border: 1px solid var(--vp-c-bg-soft); border-radius: 8px; padding: 16px; background: var(--vp-c-bg-soft);">
    <h3 style="margin-top: 0; font-size: 16px; font-weight: 600; color: var(--vp-c-text-1);">{{ title }}</h3>
    <p v-if="description" style="margin: 8px 0 0; font-size: 14px; color: var(--vp-c-text-2);">{{ description }}</p>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  href: String,
  icon: String
})
</script>
<style scoped>
.vp-card:hover {
  border-color: var(--vp-c-brand-1);
}
</style>
