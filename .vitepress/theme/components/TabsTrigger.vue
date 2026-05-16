<template>
  <button 
    @click="activeTab = value" 
    :class="{ 'active': activeTab === value }"
    class="vp-tabs-trigger"
    :style="activeTab === value ? 'color: var(--vp-c-brand-1); border-bottom-color: var(--vp-c-brand-1);' : ''"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { inject, onMounted } from 'vue'

const props = defineProps({
  value: String
})
const activeTab = inject('activeTab')
const registerTab = inject('registerTab')

onMounted(() => {
  if (props.value) registerTab(props.value)
})
</script>

<style scoped>
.vp-tabs-trigger {
  padding: 12px 16px;
  cursor: pointer;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  border-bottom: 2px solid transparent;
  font-weight: 500;
  white-space: nowrap;
  transition: color 0.25s;
}
.vp-tabs-trigger:hover {
  color: var(--vp-c-text-1);
}
</style>
