<script setup lang="ts">
// Replaces VitePress's VPDocFooterLastUpdated (aliased in config). Browsers ship little Uzbek locale
// data, so Intl renders "2026 M10 18"; Uzbek dates are formatted by hand instead.
import { ref, computed, watchEffect, onMounted } from 'vue'
import { useData } from 'vitepress'

const { theme, page, lang } = useData()

const UZ_MONTHS = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']

// The footer only renders this when the page has a timestamp, but the pre-flush watcher below can still
// run once during navigation to a page without one; Intl throws on an invalid date, so guard it
const date = computed(() => (page.value.lastUpdated ? new Date(page.value.lastUpdated) : null))
const isoDatetime = computed(() => date.value?.toISOString() ?? '')
const datetime = ref('')

// "18-oktabr, 2026-yil, 08:26"
function formatUz(d: Date) {
  const time = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  return `${d.getDate()}-${UZ_MONTHS[d.getMonth()]}, ${d.getFullYear()}-yil, ${time}`
}

// Formatted after mount to avoid a hydration mismatch between server and reader time zones
onMounted(() => {
  watchEffect(() => {
    if (!date.value) return
    datetime.value = lang.value.startsWith('uz')
      ? formatUz(date.value)
      : new Intl.DateTimeFormat(
          theme.value.lastUpdated?.formatOptions?.forceLocale ? lang.value : undefined,
          theme.value.lastUpdated?.formatOptions ?? { dateStyle: 'short', timeStyle: 'short' }
        ).format(date.value)
  })
})
</script>

<template>
  <p class="VPLastUpdated">
    {{ theme.lastUpdated?.text || theme.lastUpdatedText || 'Last updated' }}:
    <time :datetime="isoDatetime">{{ datetime }}</time>
  </p>
</template>

<style scoped>
.VPLastUpdated {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

@media (min-width: 640px) {
  .VPLastUpdated {
    line-height: 32px;
  }
}
</style>
