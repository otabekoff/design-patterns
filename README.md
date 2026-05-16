# Design Patterns Documentation

Languages: [English](README.md) | [Oʻzbek](README.uz.md) | [Русский](README.ru.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Deutsch](README.de.md) | [Español](README.es.md)

A modern, fast, and searchable documentation site for software design patterns. Built with TanStack Start and Fumadocs, this project provides a clean reading experience for creational, structural, behavioral, and architectural patterns.

## Features

- Clean, readable documentation layout
- Fast navigation and full‑text search
- MDX-based content in `content/docs`
- Responsive UI optimized for reading
- Built‑in docs routing and page tree

## Tech Stack

- **TanStack Start**
- **Fumadocs UI + Core**
- **React**
- **Vite**
- **Tailwind CSS**

## Quick Start

Install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn
```

Start the dev server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

## Useful Scripts

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run types:check
npm run lint
```

## Project Structure

```
content/docs/        # Documentation content (MDX)
src/routes/          # Routes (home, docs, api)
src/lib/             # Shared config and helpers
src/components/      # UI components
src/styles/          # Global styles
```

## Configuration

- **Site name**: update `src/lib/shared.ts`
- **Navbar links**: update `src/lib/layout.shared.tsx`
- **Docs content**: add or edit files in `content/docs`

## Support

If you find this project useful, consider supporting it:

- https://tirikchilik.uz/uzhandy

## Contributing

Contributions are welcome. Open an issue or PR with your proposed changes.

## License

This project is licensed under the MIT License.
