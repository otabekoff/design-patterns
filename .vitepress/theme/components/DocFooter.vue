<script setup>
import { useData } from 'vitepress'
import { Lightbulb } from '@lucide/vue'

const { page } = useData()
</script>

<template>
  <div class="doc-footer-wrapper" v-if="page.relativePath !== 'index.md'">
    <div class="support-banner">
      <div class="support-content">
        <Lightbulb :size="20" class="support-icon-svg" />
        <span>Did this guide help you? Support us to make it even better.</span>
      </div>
      <a href="https://tirikchilik.uz/uzhandy" target="_blank" class="support-btn">Support Us</a>
    </div>
  </div>
</template>

<style scoped>
.doc-footer-wrapper {
  margin-top: 32px;
  margin-bottom: 24px;
}

.support-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--vp-c-brand-soft);
  padding: 16px 20px;
  border-radius: 8px;
  flex-wrap: wrap;
  gap: 16px;
}

.support-content {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.support-icon-svg {
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.support-btn {
  background-color: var(--vp-c-brand-1);
  color: white !important;
  padding: 6px 16px;
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
</style>
