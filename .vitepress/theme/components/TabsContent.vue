<template>
  <div v-show="activeTab === value" class="vp-tabs-content" style="padding: 16px;">
    <slot></slot>
  </div>
</template>

<script setup>
import { inject } from 'vue'

defineProps({
  value: String
})
const activeTab = inject('activeTab')
</script>
