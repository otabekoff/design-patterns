# Dokumentation zu Entwurfsmustern

Languages: [English](README.md) | [Oʻzbek](README.uz.md) | [Русский](README.ru.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Deutsch](README.de.md) | [Español](README.es.md)

Eine moderne, schnelle und durchsuchbare Dokumentationsseite für Software‑Entwurfsmuster. Erstellt mit TanStack Start und Fumadocs und optimiert für ein sauberes Leseerlebnis zu Erzeugungs‑, Struktur‑, Verhaltens‑ und Architekturmustern.

## Funktionen

- Sauberes, gut lesbares Layout
- Schnelle Navigation und Volltextsuche
- MDX‑Inhalte in `content/docs`
- Responsives UI, optimiert fürs Lesen
- Integrierte Docs‑Routen und Seitenbaum

## Technologie‑Stack

- **TanStack Start**
- **Fumadocs UI + Core**
- **React**
- **Vite**
- **Tailwind CSS**

## Schnellstart

Abhängigkeiten installieren:

```bash
npm install
# or
pnpm install
# or
yarn
```

Dev‑Server starten:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

## Nützliche Skripte

```bash
npm run dev        # Dev‑Server starten
npm run build      # Produktion builden
npm run preview    # Production‑Build ansehen
npm run types:check
npm run lint
```

## Projektstruktur

```
content/docs/        # Dokumentationsinhalte (MDX)
src/routes/          # Routen (home, docs, api)
src/lib/             # Geteilte Konfiguration und Helper
src/components/      # UI‑Komponenten
src/styles/          # Globale Styles
```

## Konfiguration

- **Site‑Name**: `src/lib/shared.ts` aktualisieren
- **Navbar‑Links**: `src/lib/layout.shared.tsx` aktualisieren
- **Docs‑Inhalte**: Dateien in `content/docs` hinzufügen oder bearbeiten

## Unterstützung

Wenn dir das Projekt hilft, unterstütze es gerne:

- https://tirikchilik.uz/uzhandy

## Mitwirken

Beiträge sind willkommen. Öffne ein Issue oder PR mit deinen Änderungen.

## Lizenz

Dieses Projekt steht unter der MIT‑Lizenz.
