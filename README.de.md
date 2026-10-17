# Entwurfsmuster

Languages: [English](README.md) | [Oʻzbek](README.uz.md) | [Русский](README.ru.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Deutsch](README.de.md) | [Español](README.es.md)

Eine vollständige, durchsuchbare Referenz für Software-Entwurfsmuster — Erzeugungs-, Struktur-, Verhaltens- und Architekturmuster — mit Diagrammen und Beispielen in TypeScript, Python, Java, Go und Rust im direkten Vergleich.

**Live-Seite:** https://otabekoff.github.io/design-patterns/

## Funktionen

- 41 Muster, jeweils mit einer Analogie, einem Mermaid-Strukturdiagramm, Implementierungen in fünf Sprachen, typischen Fehlern und Interviewfragen
- Ein Entscheidungsleitfaden „Ein Muster wählen“ und Vergleichsseiten (Strategy vs State, Decorator vs Proxy, …)
- Englische und usbekische Ausgabe
- Lokale Volltextsuche, helles/dunkles Theme und eine seitenübergreifend gespeicherte Wahl der Code-Sprache
- Aktionen „Copy Markdown“ und „Open in ChatGPT / Claude“ auf jeder Seite

## Technologie-Stack

[VitePress](https://vitepress.dev) (Vue 3 + Vite), Mermaid, Lucide-Icons, bereitgestellt auf GitHub Pages. [Bun](https://bun.sh) dient als Paketmanager und Skript-Runner.

## Schnellstart

```bash
bun install
bun run dev        # http://localhost:5173/design-patterns/
```

## Skripte

| Befehl | Funktion |
| --- | --- |
| `bun run dev` | Startet den Dev-Server |
| `bun run build` | Baut die statische Seite nach `.vitepress/dist` (schlägt bei toten Links fehl) |
| `bun run preview` | Stellt den Production-Build lokal bereit |
| `bun run check` | Führt alle unten aufgeführten Inhaltsprüfungen aus |
| `bun run check:mermaid` | Parst jedes Mermaid-Diagramm |
| `bun run check:code` | Prüft die Syntax jedes Codebeispiels (TS/JS über esbuild, Python, Java, Go, Rust — fehlende Toolchains werden übersprungen) |
| `bun run check:i18n` | Vergleicht jede englische Seite mit ihrer usbekischen Übersetzung (fehlende Seiten, Abweichungen in Code/Diagrammen) |
| `bun run images` | Kodiert Cover-/Kartenbilder neu als WebP und erzeugt die Social-Media-Bilder neu (benötigt Python + Pillow) |

## Projektstruktur

```
src/                     # Inhalte (Englisch auf oberster Ebene)
  creational/ structural/ behavioral/ architectural/
  comparisons/           # Seiten zum Vergleich von Mustern
  uz/                    # Usbekische Übersetzung mit denselben Pfaden
public/                  # Statische Dateien: covers/, cards/, og/ (Social-Media-Bilder), Icons
.vitepress/
  config/                # Seitenkonfiguration, Navigation/Sidebar pro Sprache (langs/), Markdown-Plugins
  theme/                 # Theme-Anpassungen und Vue-Komponenten (CoverImage, Card, Mermaid, …)
scripts/                 # Inhaltsprüfungen und Bild-Pipeline
```

## Inhalte schreiben

- Jede Seite beginnt mit Frontmatter: `title`, `description` und `icon` (ein [Lucide](https://lucide.dev/icons)-Iconname in PascalCase, der in der Sidebar angezeigt wird).
- Gruppiere Implementierungen mit `::: code-group` und beschrifte die Tabs nach Sprache, z. B. ` ```python [Python] `.
- Diagramme gehören in ` ```mermaid `-Blöcke.
- Füge neue Seiten der Sidebar in `.vitepress/config/langs/en.ts` und `uz.ts` hinzu.
- Übersetzungen liegen unter demselben Pfad in `src/uz/`; halte Codeblöcke identisch zum Englischen (Kommentare dürfen übersetzt werden) und führe `bun run check:i18n` aus.

## Unterstützung

Wenn dir dieses Projekt nützlich ist, freuen wir uns über deine Unterstützung: https://taps.uz/uzhandy

## Mitwirken

Beiträge sind willkommen — öffne ein Issue oder einen Pull Request. Bitte führe vor dem Einreichen `bun run check` und `bun run build` aus.

## Lizenz

[MIT](LICENSE) © 2025-present Otabek Sadiridinov
