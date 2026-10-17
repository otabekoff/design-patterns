import type { MermaidConfig } from 'mermaid';

// Loaded lazily so the ~600 KB mermaid bundle is only fetched on pages that contain diagrams
let mermaidPromise: Promise<typeof import('mermaid')['default']> | null = null;
const loadMermaid = () => (mermaidPromise ??= import('mermaid').then((m) => m.default));

export const render = async (id: string, code: string, config: MermaidConfig): Promise<string> => {
  const mermaid = await loadMermaid();
  mermaid.initialize(config);
  try {
    const { svg } = await mermaid.render(id, code);
    return svg;
  } catch (error) {
    console.error('Mermaid render error:', error);
    const message = (error instanceof Error ? error.message : String(error))
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<div class="mermaid-error">Error rendering diagram: ${message}</div>`;
  }
};
