<template>
  <div :class="['custom-block', type || 'info']">
    <p class="custom-block-title">{{ title || defaultTitle }}</p>
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'info'
  },
  title: {
    type: String,
    default: ''
  }
})

const defaultTitle = computed(() => {
  if (props.type === 'warning') return 'WARNING'
  if (props.type === 'danger') return 'DANGER'
  if (props.type === 'tip') return 'TIP'
  return 'INFO'
})
</script>
