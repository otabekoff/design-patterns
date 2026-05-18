import mermaid, { type MermaidConfig } from 'mermaid';

export const render = async (id: string, code: string, config: MermaidConfig): Promise<string> => {
  mermaid.initialize(config);
  try {
    const { svg } = await mermaid.render(id, code);
    return svg;
  } catch (error) {
    console.error('Mermaid render error:', error);
    return `<div class="mermaid-error">Error rendering diagram: ${error instanceof Error ? error.message : String(error)}</div>`;
  }
};
