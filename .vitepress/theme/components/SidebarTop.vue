<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute } from "vitepress";
import VPNavBarTitle from "vitepress/dist/client/theme-default/components/VPNavBarTitle.vue";
import VPNavBarSearch from "vitepress/dist/client/theme-default/components/VPNavBarSearch.vue";

const route = useRoute();

const wrapGroups = () => {
  // Wait for next tick to ensure groups are rendered
  setTimeout(() => {
    const nav = document.getElementById("VPSidebarNav");
    if (!nav) return;

    // Prevent double wrapping
    if (nav.querySelector(".sidebar-groups-wrapper")) return;

    const top = nav.querySelector(".sidebar-top");
    const bottom = nav.querySelector(".sidebar-bottom");

    if (!top || !bottom) return;

    const wrapper = document.createElement("div");
    wrapper.className = "sidebar-groups-wrapper";

    // Move all elements between top and bottom into the wrapper
    let current = top.nextSibling;
    while (current && current !== bottom) {
      const next = current.nextSibling;
      wrapper.appendChild(current);
      current = next;
    }

    nav.insertBefore(wrapper, bottom);
  }, 50);
};

onMounted(wrapGroups);

// Re-wrap on route change as VitePress might re-render the sidebar
watch(() => route.path, wrapGroups);
</script>

<template>
  <div class="sidebar-top">
    <div class="sidebar-title">
      <VPNavBarTitle />
    </div>
    <div class="sidebar-search">
      <VPNavBarSearch />
    </div>
  </div>
</template>

<style scoped>
.sidebar-top {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.sidebar-title {
  padding-left: 8px;
}

.sidebar-search {
  width: 100%;
}

:deep(.VPNavBarTitle) {
  padding-top: 0;
  height: auto;
  transition: none;
}

:deep(.VPNavBarTitle:hover) {
  opacity: 1;
}

:deep(.VPNavBarTitle .title) {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  border-bottom: none !important;
  transition: none !important;
}

:deep(.VPNavBarTitle .logo) {
  margin-right: 10px;
  height: 24px;
}

:deep(.VPNavBarSearch) {
  display: flex;
  align-items: center;
  width: 100%;
}

:deep(.VPNavBarSearch #docsearch),
:deep(.VPNavBarSearch #local-search) {
  width: 100%;
}

:deep(.DocSearch-Button) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0 12px;
  width: 100% !important;
  height: 40px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: border-color 0.25s, background-color 0.25s;
}

:deep(.DocSearch-Button:hover) {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-mute);
}

:deep(.DocSearch-Button-Container) {
  display: flex;
  align-items: center;
}

:deep(.DocSearch-Button-Placeholder) {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  padding-left: 8px;
}

:deep(.DocSearch-Search-Icon) {
  width: 16px;
  height: 16px;
  color: var(--vp-c-text-2);
}

:deep(.DocSearch-Button-Keys) {
  display: flex;
  align-items: center;
  min-width: auto;
  gap: 2px;
}

:deep(.DocSearch-Button-Key) {
  background: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  color: var(--vp-c-text-2);
  font-size: 11px;
  height: 18px;
  line-height: 18px;
  margin: 0;
  padding: 0 4px;
  width: auto;
  box-shadow: none;
  font-weight: 600;
  top: 0;
}
</style>

