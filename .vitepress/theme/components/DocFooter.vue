<script setup>
import { useData } from 'vitepress'
import SupportBanner from './SupportBanner.vue'

const { page } = useData()
</script>

<template>
  <div class="doc-footer-wrapper" v-if="page.relativePath !== 'index.md'">
    <SupportBanner />
  </div>
</template>

<style scoped>
.doc-footer-wrapper {
  margin-top: 32px;
  margin-bottom: 24px;
}
</style>

