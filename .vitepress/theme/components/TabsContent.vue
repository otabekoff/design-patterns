<template>
  <div
    v-show="activeTab === value"
    role="tabpanel"
    :id="`${tabsId}-panel-${value}`"
    :aria-labelledby="`${tabsId}-tab-${value}`"
    class="vp-tabs-content"
    style="padding: 16px;"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { inject } from 'vue'

defineProps({
  value: String
})
const activeTab = inject('activeTab')
const tabsId = inject('tabsId')
</script>
