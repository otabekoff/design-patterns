<script setup>
import { onMounted, onUnmounted, watch, h, render } from "vue";
import { useRoute } from "vitepress";
import { WrapText } from "@lucide/vue";

const route = useRoute();

// We create a temporary container to render the Lucide icon to an SVG string
const getIconSvg = () => {
  const container = document.createElement("div");
  const vnode = h(WrapText, { size: 20, strokeWidth: 2 });
  render(vnode, container);
  return container.innerHTML;
};

const wrapIcon = getIconSvg();

const initCodeWrap = () => {
  const blocks = document.querySelectorAll('div[class*="language-"]');

  blocks.forEach((block) => {
    if (block.querySelector(".wrap-button")) return;

    const copyBtn = block.querySelector("button.copy");
    if (!copyBtn) return;

    const wrapBtn = document.createElement("button");
    wrapBtn.className = "wrap-button";
    wrapBtn.title = "Toggle Code Wrap";
    wrapBtn.innerHTML = wrapIcon;

    // Check if previously wrapped
    const isWrapped = localStorage.getItem("vp-code-wrap") === "true";
    if (isWrapped) {
      block.classList.add("is-wrapped");
      wrapBtn.classList.add("active");
    }

    wrapBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const active = block.classList.toggle("is-wrapped");
      wrapBtn.classList.toggle("active");

      localStorage.setItem("vp-code-wrap", active);

      document.querySelectorAll('div[class*="language-"]').forEach((b) => {
        b.classList.toggle("is-wrapped", active);
        const bBtn = b.querySelector(".wrap-button");
        if (bBtn) bBtn.classList.toggle("active", active);
      });
    });

    copyBtn.parentNode.insertBefore(wrapBtn, copyBtn);
  });
};

let observer = null;

onMounted(() => {
  initCodeWrap();

  observer = new MutationObserver(() => {
    initCodeWrap();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});

watch(
  () => route.path,
  () => {
    setTimeout(initCodeWrap, 100);
  },
);
</script>

<template>
  <div style="display: none"></div>
</template>

<style>
.wrap-button {
  position: absolute;
  top: 12px;
  right: 56px;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--vp-code-copy-code-border-color);
  border-radius: 4px;
  width: 40px;
  height: 40px;
  background-color: var(--vp-code-copy-code-bg); /* Opaque background */
  opacity: 0;
  cursor: pointer;
  transition:
    opacity 0.25s,
    background-color 0.25s,
    border-color 0.25s;
  color: var(--vp-c-text-2);
}

div[class*="language-"]:hover .wrap-button {
  opacity: 1;
}

.wrap-button:hover {
  border-color: var(--vp-code-copy-code-hover-border-color);
  background-color: var(--vp-code-copy-code-bg);
  color: var(--vp-c-text-1);
}

.wrap-button.active {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-code-copy-code-bg);
  opacity: 1;
}

div[class*="language-"]:not(:hover) .wrap-button {
  opacity: 0 !important;
}

.wrap-button svg {
  width: 20px;
  height: 20px;
}

/* Wrapping Logic */
div[class*="language-"].is-wrapped pre,
div[class*="language-"].is-wrapped code {
  white-space: pre-wrap !important;
  word-break: break-all !important;
  overflow-wrap: break-word !important;
}

@media (max-width: 640px) {
  .wrap-button {
    opacity: 1;
    right: 56px; /* Keep same spacing on mobile */
  }
}
</style>
