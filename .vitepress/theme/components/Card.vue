<template>
  <a v-if="href" :href="localizedHref" class="vp-card is-link">
    <div v-if="image" class="image-wrapper">
      <img
        :src="withBase(image)"
        class="card-image"
        :alt="title"
        loading="lazy"
      />
      <button @click.stop.prevent="openDialog" class="zoom-btn" title="Zoom image">
        <Maximize2 :size="16" />
      </button>
    </div>
    <div class="content-wrapper">
      <h3 class="title">{{ title }}</h3>
      <p v-if="description" class="description">{{ description }}</p>
      <slot></slot>
    </div>
  </a>
  <div v-else class="vp-card">
    <div v-if="image" class="image-wrapper">
      <img
        :src="withBase(image)"
        class="card-image"
        :alt="title"
        loading="lazy"
      />
      <button @click.stop.prevent="openDialog" class="zoom-btn" title="Zoom image">
        <Maximize2 :size="16" />
      </button>
    </div>
    <div class="content-wrapper">
      <h3 class="title">{{ title }}</h3>
      <p v-if="description" class="description">{{ description }}</p>
      <slot></slot>
    </div>
  </div>

  <Transition name="dialog">
    <div v-if="isDialogOpen" class="dialog-overlay" @click="closeDialog">
      <div class="dialog-container" @click.stop>
        <img
          :src="withBase(image)"
          class="dialog-image"
          :alt="title"
        />
        <button class="dialog-close" @click="closeDialog" title="Close">
          <X :size="20" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onUnmounted } from "vue";
import { useData, withBase } from "vitepress";
import { Maximize2, X } from "@lucide/vue";

const props = defineProps({
  title: String,
  description: String,
  href: String,
  icon: String,
  image: String,
});

const { lang } = useData();
const isDialogOpen = ref(false);

const openDialog = () => {
  isDialogOpen.value = true;
  if (typeof window !== "undefined") {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
  }
};

const closeDialog = () => {
  isDialogOpen.value = false;
  if (typeof window !== "undefined") {
    document.body.style.overflow = "";
    window.removeEventListener("keydown", handleKeyDown);
  }
};

const handleKeyDown = (e) => {
  if (e.key === "Escape") {
    closeDialog();
  }
};

onUnmounted(() => {
  if (typeof window !== "undefined") {
    document.body.style.overflow = "";
    window.removeEventListener("keydown", handleKeyDown);
  }
});

const localizedHref = computed(() => {
  if (!props.href) return "";

  // Don't modify external links
  if (/^https?:\/\//.test(props.href)) return props.href;

  // Get current language code (e.g., 'uz' from 'uz' or 'uz-UZ')
  const currentLang = lang.value || "en";
  const langKey = currentLang.split("-")[0];

  // If we are in a non-English locale and the href is an internal absolute path
  if (langKey !== "en" && props.href.startsWith("/")) {
    // Prefix with locale if not already prefixed
    const prefix = `/${langKey}`;
    if (!props.href.startsWith(prefix)) {
      return withBase(`${prefix}${props.href}`);
    }
  }

  return withBase(props.href);
});
</script>

<style scoped>
.vp-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-gutter);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  transition:
    border-color 0.25s,
    background-color 0.25s,
    transform 0.25s;
  overflow: hidden;
  height: 100%;
  padding: 0;
  position: relative;
}

.is-link {
  text-decoration: none;
}

.is-link:hover {
  border-color: var(--vp-c-brand-1);
}

.image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background-color: white !important;
  border-bottom: 1px solid var(--vp-c-gutter);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none !important;
  border-radius: 0 !important;
}

.vp-card:hover .card-image {
  transform: scale(1.03);
}

.zoom-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f8fafc;
  cursor: pointer;
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.vp-card:hover .zoom-btn {
  opacity: 1;
  transform: scale(1);
}

.zoom-btn:hover {
  background: rgba(15, 23, 42, 0.85);
  border-color: rgba(255, 255, 255, 0.3);
  transform: scale(1.08) !important;
}

.zoom-btn:active {
  transform: scale(0.95) !important;
}

.content-wrapper {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.title {
  margin-top: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.description {
  margin: 8px 0 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

/* Dialog Styles */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
}

.dialog-container {
  position: relative;
  max-width: 90vw;
  max-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
}

.dialog-image {
  max-width: 90vw;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.15);
  background-color: white;
  padding: 8px;
}

.dialog-close {
  position: absolute;
  top: -48px;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f1f5f9;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dialog-close:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.4);
  transform: scale(1.05);
  color: white;
}

@media (max-width: 768px) {
  .dialog-close {
    top: 16px;
    right: 16px;
    position: fixed;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }
}

/* Transitions */
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-active .dialog-image {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.dialog-leave-active .dialog-image {
  transition: transform 0.2s cubic-bezier(0.4, 0, 1, 1);
}

.dialog-enter-from .dialog-image,
.dialog-leave-to .dialog-image {
  transform: scale(0.92);
}
</style>
