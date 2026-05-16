<script setup>
import { ref, computed } from "vue";
import { useData, withBase } from "vitepress";
import { Copy, Share2, ChevronDown, Check, Lightbulb } from "@lucide/vue";

const { page, theme } = useData();

const isOpen = ref(false);
const isCopied = ref(false);
const isCopying = ref(false);
const isShared = ref(false);

// Read raw markdown from local file system during build/dev
const rawMarkdownFiles = import.meta.glob("../../../src/**/*.md", {
  query: "?raw",
  import: "default",
});

const copyMarkdown = async () => {
  if (isCopying.value) return;
  isCopying.value = true;

  try {
    const filePath = `../../../src/${page.value.relativePath}`;
    let text = "";
    if (rawMarkdownFiles[filePath]) {
      text = await rawMarkdownFiles[filePath]();
    } else {
      const res = await fetch(
        `https://raw.githubusercontent.com/otabekoff/design-patterns/main/src/${page.value.relativePath}`,
      );
      if (!res.ok) throw new Error("Not found");
      text = await res.text();
    }

    await navigator.clipboard.writeText(text);
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  } catch (e) {
    console.error("Failed to copy markdown", e);
  } finally {
    isCopying.value = false;
  }
};

import { onMounted } from 'vue';

const shareLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    isShared.value = true;
    setTimeout(() => {
      isShared.value = false;
    }, 2000);
  } catch (e) {
    console.error("Failed to copy link", e);
  }
};

const currentUrl = ref('');
const currentOrigin = ref('');

onMounted(() => {
  currentUrl.value = window.location.href;
  currentOrigin.value = window.location.origin;
});

const aiPrompt = computed(() => {
  if (!currentUrl.value) return '';
  return `Read ${currentUrl.value}, I want to ask questions about it.`;
});

const encodedPrompt = computed(() => encodeURIComponent(aiPrompt.value));

const sciraUrl = computed(() => currentUrl.value ? `https://scira.ai/?q=${encodedPrompt.value}` : '#');
const chatgptUrl = computed(() => currentUrl.value ? `https://chatgpt.com/?q=${encodedPrompt.value}` : '#');
const claudeUrl = computed(() => currentUrl.value ? `https://claude.ai/new?q=${encodedPrompt.value}` : '#');
const cursorUrl = computed(() => currentUrl.value ? `https://cursor.com/link/prompt?text=${encodedPrompt.value}` : '#');

const githubUrl = computed(
  () =>
    `https://github.com/otabekoff/design-patterns/blob/main/src/${page.value.relativePath}`,
);
const rawUrl = computed(
  () => currentOrigin.value ? `${currentOrigin.value}/${page.value.relativePath}` : '#',
);
</script>

<template>
  <div class="doc-header-wrapper" v-if="page.relativePath !== 'index.md'">
    <!-- Support Banner -->
    <div class="support-banner">
      <div class="support-content">
        <Lightbulb :size="20" class="support-icon-svg" />
        <span>Did this guide help you? Support us to make it even better.</span>
      </div>
      <a
        href="https://tirikchilik.uz/uzhandy"
        target="_blank"
        class="support-btn"
        >Support Us</a
      >
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons">
      <button
        @click="copyMarkdown"
        class="action-btn"
        :class="{ 'is-disabled': isCopying }"
        :disabled="isCopying"
      >
        <span v-if="isCopying" class="spinner"></span>
        <Check v-else-if="isCopied" :size="16" />
        <Copy v-else :size="16" />
        <span v-if="!isCopying">{{
          isCopied ? "Copied" : "Copy Markdown"
        }}</span>
        <span v-else>Copying...</span>
      </button>

      <div
        class="dropdown-wrapper"
        @mouseenter="isOpen = true"
        @mouseleave="isOpen = false"
      >
        <button class="action-btn">
          <span>Open in...</span>
          <ChevronDown :size="16" />
        </button>

        <div v-if="isOpen" class="dropdown-menu">
          <a :href="githubUrl" target="_blank" class="dropdown-item">
            <span
              class="item-icon custom-icon"
              :style="{
                '-webkit-mask-image': `url(${withBase('/icons/github.svg')})`,
                'mask-image': `url(${withBase('/icons/github.svg')})`
              }"
            ></span>
            <span>GitHub</span>
          </a>
          <a :href="rawUrl" target="_blank" class="dropdown-item">
            <span
              class="item-icon custom-icon"
              :style="{
                '-webkit-mask-image': `url(${withBase('/icons/markdown-text.svg')})`,
                'mask-image': `url(${withBase('/icons/markdown-text.svg')})`
              }"
            ></span>
            <span>Markdown</span>
          </a>
          <a :href="sciraUrl" target="_blank" class="dropdown-item">
            <span
              class="item-icon custom-icon"
              :style="{
                '-webkit-mask-image': `url(${withBase('/icons/scira.svg')})`,
                'mask-image': `url(${withBase('/icons/scira.svg')})`
              }"
            ></span>
            <span>Scira AI</span>
          </a>
          <a :href="chatgptUrl" target="_blank" class="dropdown-item">
            <span
              class="item-icon custom-icon"
              :style="{
                '-webkit-mask-image': `url(${withBase('/icons/openai.svg')})`,
                'mask-image': `url(${withBase('/icons/openai.svg')})`
              }"
            ></span>
            <span>ChatGPT</span>
          </a>
          <a :href="claudeUrl" target="_blank" class="dropdown-item">
            <span
              class="item-icon custom-icon"
              :style="{
                '-webkit-mask-image': `url(${withBase('/icons/antrophic.svg')})`,
                'mask-image': `url(${withBase('/icons/antrophic.svg')})`
              }"
            ></span>
            <span>Claude</span>
          </a>
          <a :href="cursorUrl" class="dropdown-item">
            <span
              class="item-icon custom-icon"
              :style="{
                '-webkit-mask-image': `url(${withBase('/icons/cursor.svg')})`,
                'mask-image': `url(${withBase('/icons/cursor.svg')})`
              }"
            ></span>
            <span>Cursor</span>
          </a>
        </div>
      </div>

      <button
        @click="shareLink"
        class="action-btn icon-only"
        title="Share page link"
      >
        <Check v-if="isShared" :size="16" />
        <Share2 v-else :size="16" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.doc-header-wrapper {
  margin-bottom: 32px;
}

.support-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--vp-c-brand-soft);
  padding: 16px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
}

.support-content {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.support-icon-svg {
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.support-btn {
  background-color: var(--vp-c-brand-1);
  color: white !important;
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none !important;
  white-space: nowrap;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.support-btn:hover {
  background-color: var(--vp-c-brand-2);
  transform: translateY(-1px);
}

.action-buttons {
  display: flex;
  gap: 12px;
  align-items: center;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover:not(.is-disabled) {
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-brand-1);
}

.action-btn.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.action-btn.icon-only {
  padding: 6px;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid var(--vp-c-text-3);
  border-top-color: var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.dropdown-wrapper {
  position: relative;
}

.dropdown-wrapper::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 8px;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 8px;
  min-width: 180px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none !important;
  transition: all 0.2s;
}

.dropdown-item:hover {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
}

.item-icon {
  width: 16px;
  height: 16px;
  opacity: 0.8;
}

.custom-icon {
  background-color: currentColor;
  mask-size: cover;
  -webkit-mask-size: cover;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  display: inline-block;
}
</style>
