<script setup>
import VPNavBarTranslations from "vitepress/dist/client/theme-default/components/VPNavBarTranslations.vue";
import VPNavBarAppearance from "vitepress/dist/client/theme-default/components/VPNavBarAppearance.vue";
import VPNavBarSocialLinks from "vitepress/dist/client/theme-default/components/VPNavBarSocialLinks.vue";
</script>

<template>
  <div class="sidebar-bottom">
    <!-- Controls Row -->
    <div class="controls-row">
      <div class="control-item">
        <VPNavBarAppearance />
      </div>
      <div class="control-item">
        <VPNavBarTranslations />
      </div>
      <div class="control-item">
        <VPNavBarSocialLinks />
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar-bottom {
  padding: 12px 24px;
  background-color: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
}

.controls-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.control-item {
  display: flex;
  align-items: center;
}

:deep(.VPNavBarTranslations),
:deep(.VPNavBarAppearance),
:deep(.VPNavBarSocialLinks) {
  display: flex;
  align-items: center;
}

:deep(.VPSocialLink) {
  width: 32px;
  height: 32px;
  color: var(--vp-c-text-2);
}

:deep(.VPSocialLink:hover) {
  color: var(--vp-c-brand-1);
}

.sidebar-bottom,
.controls-row,
.control-item {
  overflow: visible !important;
}

/* Force language flyout to open upwards and center it */
:deep(.VPFlyout .menu) {
  top: auto !important;
  bottom: calc(100% + 12px) !important;
  left: 50% !important;
  right: auto !important;
  opacity: 0;
  visibility: hidden;
  transform: translateX(-50%) translateY(8px) !important;
}

/* Invisible bridge to prevent closing on hover gap */
:deep(.VPFlyout .menu::before) {
  content: "";
  position: absolute;
  bottom: -15px;
  left: 0;
  right: 0;
  height: 20px;
  background-color: transparent;
}

:deep(.VPFlyout:hover .menu),
:deep(.VPFlyout .button[aria-expanded="true"] + .menu) {
  opacity: 1 !important;
  visibility: visible !important;
  transform: translateX(-50%) translateY(0) !important;
}
</style>
