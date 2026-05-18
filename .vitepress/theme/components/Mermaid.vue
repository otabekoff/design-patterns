<template>
  <div v-if="props.showCode">
    <h5>Code:</h5>
    <div class="language-mermaid">
      <button class="copy" title="Copy Code"></button>
      <span class="lang">mermaid</span>
      <pre><code :contenteditable="contentEditable" @input="updateCode" @keydown.meta.enter="renderChart" @keydown.ctrl.enter="renderChart" ref="editableContent" class="editable-code"></code></pre>
      <div class="buttons-container">
        <span>{{ ctrlSymbol }} + Enter</span><span>|</span>
        <button @click="renderChart">Run ▶</button>
      </div>
    </div>
  </div>
  <div v-html="svg"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { render } from './mermaid';

const props = defineProps({
  graph: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  showCode: {
    type: Boolean,
    default: false,
  },
});

const svg = ref('');
const code = ref(decodeURIComponent(props.graph));
const ctrlSymbol = ref(typeof navigator !== 'undefined' && navigator.platform?.includes('Mac') ? '⌘' : 'Ctrl');
const editableContent = ref(null);
const isFirefox = typeof navigator !== 'undefined' && navigator.userAgent?.toLowerCase().includes('firefox');
const contentEditable = ref(isFirefox ? 'true' : 'plaintext-only');

let mut = null;

const updateCode = (event) => {
  code.value = event.target.innerText;
};

onMounted(async () => {
  mut = new MutationObserver(() => renderChart());
  mut.observe(document.documentElement, { attributes: true });

  if (editableContent.value) {
    editableContent.value.textContent = code.value;
  }

  await renderChart();

  const hasImages = /<img([\w\W]+?)>/.exec(code.value)?.length > 0;
  if (hasImages)
    setTimeout(() => {
      let imgElements = document.getElementsByTagName('img');
      let imgs = Array.from(imgElements);
      if (imgs.length) {
        Promise.all(
          imgs
            .filter((img) => !img.complete)
            .map(
              (img) =>
                new Promise((resolve) => {
                  img.onload = img.onerror = resolve;
                })
            )
        ).then(() => {
          renderChart();
        });
      }
    }, 100);
});

onUnmounted(() => mut?.disconnect());

const renderChart = async () => {
  const hasDarkClass = document.documentElement.classList.contains('dark');
  const mermaidConfig = {
    securityLevel: 'loose',
    startOnLoad: false,
    theme: hasDarkClass ? 'dark' : 'default',
  };
  let svgCode = await render(props.id, code.value, mermaidConfig);
  const salt = Math.random().toString(36).substring(7);
  svg.value = `${svgCode} <span style="display: none">${salt}</span>`;
};
</script>

<style scoped>
.editable-code:focus {
  outline: none;
}

.buttons-container {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
}

.buttons-container > span {
  cursor: default;
  opacity: 0.5;
  font-size: 0.8rem;
}

.buttons-container > button {
  color: var(--vp-c-brand-1, #007bff);
  font-weight: bold;
  cursor: pointer;
  background: none;
  border: none;
}

.buttons-container > button:hover {
  color: var(--vp-c-brand-2, #0056b3);
}
</style>
