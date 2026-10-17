<template>
  <button
    type="button"
    role="tab"
    :id="`${tabsId}-tab-${value}`"
    :aria-selected="activeTab === value"
    :aria-controls="`${tabsId}-panel-${value}`"
    :tabindex="activeTab === value ? 0 : -1"
    @click="activeTab = value"
    :class="{ 'active': activeTab === value }"
    class="vp-tabs-trigger"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { inject } from 'vue'

const props = defineProps({
  value: String
})
const activeTab = inject('activeTab')
const tabsId = inject('tabsId')
const registerTab = inject('registerTab')

if (props.value) registerTab(props.value)
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
.vp-tabs-trigger.active {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
}
.vp-tabs-trigger:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}
</style>
