<script setup>
import { ref } from "vue";
import { Lightbulb, X } from "@lucide/vue";
import { withBase } from "vitepress";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: "Cover",
  },
});

const showOverlay = ref(false);
</script>

<template>
  <div class="cover-image-container">
    <img :src="withBase(src)" :alt="alt" class="cover-image" />
    
    <button 
      class="info-btn" 
      @click="showOverlay = true"
      title="Show Visual Blueprint Prompt"
    >
      <Lightbulb :size="18" />
    </button>

    <Transition name="fade-slide">
      <div class="cover-overlay" v-if="showOverlay" @click="showOverlay = false">
        <div class="overlay-content" @click.stop>
          <button class="close-btn" @click="showOverlay = false">
            <X :size="18" />
          </button>
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.cover-image-container {
  position: relative;
  width: 100%;
  border-radius: 24px;
  border: 2px solid var(--vp-c-border);
  overflow: hidden;
  margin-top: 16px;
  margin-bottom: 24px;
  background-color: var(--vp-c-bg-soft);
  /* Save the exact look & height aspect ratio */
  aspect-ratio: 16 / 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  margin: 0 !important;
  border: none !important;
  border-radius: 0 !important;
}

.info-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(20, 20, 20, 0.65);
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 10;
}

/* Make it visible on container hover */
.cover-image-container:hover .info-btn {
  opacity: 1;
  transform: scale(1);
}

.info-btn:hover {
  background: var(--vp-c-brand-1);
  border-color: transparent;
  transform: scale(1.05) !important;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.cover-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  z-index: 20;
}

.overlay-content {
  position: relative;
  max-width: 540px;
  text-align: center;
  color: #ffffff;
  animation: content-scale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

@keyframes content-scale {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: -48px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

/* Slotted elements styling */
.overlay-content :deep(h1) {
  font-size: 28px;
  font-weight: 700;
  margin: 0 !important;
  color: #ffffff !important;
  letter-spacing: -0.02em;
  line-height: 1.2;
  border: none !important;
  padding: 0 !important;
}

.overlay-content :deep(p) {
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85) !important;
  margin: 0 !important;
  font-weight: 400;
  text-align: center;
}

/* Transition Animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
}

/* Dark mode image adjustments (if needed) */
:root.dark .cover-image {
  opacity: 0.9;
}
</style>
