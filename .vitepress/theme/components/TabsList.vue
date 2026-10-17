<template>
  <div
    class="vp-tabs-list"
    role="tablist"
    @keydown="onKeydown"
    style="display: flex; background: var(--vp-c-bg-soft); border-bottom: 1px solid var(--vp-c-divider); overflow-x: auto;"
  >
    <slot></slot>
  </div>
</template>

<script setup>
// Arrow keys / Home / End move between tabs, following the WAI-ARIA tabs pattern
const onKeydown = (e) => {
  const tabs = Array.from(e.currentTarget.querySelectorAll('[role="tab"]'))
  const i = tabs.indexOf(document.activeElement)
  if (i < 0) return
  const next = {
    ArrowRight: (i + 1) % tabs.length,
    ArrowLeft: (i - 1 + tabs.length) % tabs.length,
    Home: 0,
    End: tabs.length - 1
  }[e.key]
  if (next === undefined) return
  e.preventDefault()
  tabs[next].focus()
  tabs[next].click()
}
</script>
