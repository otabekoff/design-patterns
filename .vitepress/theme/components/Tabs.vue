<template>
  <div class="vp-tabs" style="margin: 16px 0; border: 1px solid var(--vp-c-divider); border-radius: 8px; overflow: hidden;">
    <slot></slot>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue'

const activeTab = ref(null)
provide('activeTab', activeTab)
provide('registerTab', (value) => {
  if (!activeTab.value) activeTab.value = value
})
</script>
