# Design Patterns

Languages: [English](README.md) | [Oʻzbek](README.uz.md) | [Русский](README.ru.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Deutsch](README.de.md) | [Español](README.es.md)

A complete, searchable reference for software design patterns — creational, structural, behavioral and architectural — with diagrams and side-by-side examples in TypeScript, Python, Java, Go and Rust.

**Live site:** https://otabekoff.github.io/design-patterns/

## Features

- 41 patterns, each with an analogy, a Mermaid structure diagram, implementations in five languages, common mistakes and interview questions
- A "Choosing a Pattern" decision guide and side-by-side comparison pages (Strategy vs State, Decorator vs Proxy, …)
- English and Uzbek editions
- Full-text local search, light/dark themes, and a remembered code-language preference across pages
- "Copy Markdown" and "Open in ChatGPT / Claude" actions on every page

## Tech Stack

[VitePress](https://vitepress.dev) (Vue 3 + Vite), Mermaid, Lucide icons, deployed to GitHub Pages. [Bun](https://bun.sh) is used as the package manager and script runner.

## Quick Start

```bash
bun install
bun run dev        # http://localhost:5173/design-patterns/
```

## Scripts

| Command | What it does |
| --- | --- |
| `bun run dev` | Start the dev server |
| `bun run build` | Build the static site into `.vitepress/dist` (fails on dead links) |
| `bun run preview` | Serve the production build locally |
| `bun run check` | Run all content checks below |
| `bun run check:mermaid` | Parse every Mermaid diagram |
| `bun run check:code` | Syntax-check every code sample (TS/JS via esbuild, Python, Java, Go, Rust — missing toolchains are skipped) |
| `bun run check:i18n` | Compare each English page with its Uzbek translation (missing pages, code/diagram drift) |
| `bun run images` | Re-encode cover/card images to WebP and regenerate social images (needs Python + Pillow) |

## Project Structure

```
src/                     # Content (English at the root)
  creational/ structural/ behavioral/ architectural/
  comparisons/           # Pattern-vs-pattern pages
  uz/                    # Uzbek translation, mirroring the same paths
public/                  # Static assets: covers/, cards/, og/ (social images), icons
.vitepress/
  config/                # Site config, per-locale nav/sidebar (langs/), markdown plugins
  theme/                 # Theme overrides and Vue components (CoverImage, Card, Mermaid, …)
scripts/                 # Content checks and the image pipeline
```

## Writing Content

- Each page starts with frontmatter: `title`, `description` and `icon` (a [Lucide](https://lucide.dev/icons) icon name in PascalCase, shown in the sidebar).
- Group implementations with `::: code-group` and label tabs by language, e.g. ` ```python [Python] `.
- Diagrams go in ` ```mermaid ` blocks.
- Add new pages to the sidebar in `.vitepress/config/langs/en.ts` and `uz.ts`.
- Translations live at the same path under `src/uz/`; keep code blocks identical to English (comments may be translated) and run `bun run check:i18n`. Uzbek wording follows [GLOSSARY.uz.md](GLOSSARY.uz.md) ("Loyihalash andozalari", pattern = andoza).

## Support

If you find this project useful, consider supporting it: https://taps.uz/uzhandy

## Contributing

Contributions are welcome — open an issue or a pull request. Please run `bun run check` and `bun run build` before submitting.

## License

[MIT](LICENSE) © 2025-present Otabek Sadiridinov
