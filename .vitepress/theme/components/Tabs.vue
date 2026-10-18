<template>
  <div class="vp-tabs" style="margin: 16px 0; border: 1px solid var(--vp-c-divider); border-radius: 8px; overflow: hidden;">
    <slot></slot>
  </div>
</template>

<script setup>
import { provide, ref, useId } from 'vue'

const props = defineProps({
  defaultValue: String
})

const activeTab = ref(props.defaultValue ?? null)
const uid = useId()
provide('activeTab', activeTab)
provide('tabsId', uid)
// Called during child setup (not onMounted) so the first tab is already active in the server-rendered HTML
provide('registerTab', (value) => {
  if (!activeTab.value) activeTab.value = value
})
</script>
