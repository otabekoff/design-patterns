# Dizayn patternlari

Languages: [English](README.md) | [Oʻzbek](README.uz.md) | [Русский](README.ru.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Deutsch](README.de.md) | [Español](README.es.md)

Dasturiy dizayn patternlari — yaratuvchi, tuzilmaviy, xulq-atvor va arxitekturaviy — boʻyicha toʻliq va qidiruvli qoʻllanma: diagrammalar hamda TypeScript, Python, Java, Go va Rust tillaridagi yonma-yon misollar bilan.

**Jonli sayt:** https://otabekoff.github.io/design-patterns/

## Imkoniyatlar

- 41 ta pattern: har birida hayotiy oʻxshatish, Mermaid tuzilma diagrammasi, besh tildagi implementatsiyalar, keng tarqalgan xatolar va intervyu savollari
- "Patternni tanlash" boʻyicha yoʻriqnoma va yonma-yon taqqoslash sahifalari (Strategy vs State, Decorator vs Proxy, …)
- Ingliz va oʻzbek tilidagi nashrlar
- Toʻliq matnli lokal qidiruv, yorugʻ/qorongʻi mavzular va sahifalar boʻylab eslab qolinadigan kod tili tanlovi
- Har bir sahifada "Copy Markdown" va "Open in ChatGPT / Claude" amallari

## Texnologiyalar steki

[VitePress](https://vitepress.dev) (Vue 3 + Vite), Mermaid, Lucide ikonkalari; sayt GitHub Pages'ga joylashtiriladi. Paket menejeri va skriptlarni ishga tushirish uchun [Bun](https://bun.sh) ishlatiladi.

## Tez boshlash

```bash
bun install
bun run dev        # http://localhost:5173/design-patterns/
```

## Skriptlar

| Buyruq | Nima qiladi |
| --- | --- |
| `bun run dev` | Dev serverni ishga tushiradi |
| `bun run build` | Statik saytni `.vitepress/dist` ichiga yigʻadi (ishlamaydigan havolalar boʻlsa, xato bilan toʻxtaydi) |
| `bun run preview` | Production buildni lokal tarzda ochib beradi |
| `bun run check` | Quyidagi barcha kontent tekshiruvlarini ishga tushiradi |
| `bun run check:mermaid` | Har bir Mermaid diagrammasini tahlil qiladi |
| `bun run check:code` | Har bir kod namunasining sintaksisini tekshiradi (TS/JS esbuild orqali, Python, Java, Go, Rust — oʻrnatilmagan toolchainlar oʻtkazib yuboriladi) |
| `bun run check:i18n` | Har bir inglizcha sahifani uning oʻzbekcha tarjimasi bilan solishtiradi (yetishmayotgan sahifalar, kod/diagrammalardagi farqlar) |
| `bun run images` | Muqova/karta rasmlarini WebP formatiga qayta kodlaydi va ijtimoiy tarmoq rasmlarini qayta yaratadi (Python + Pillow kerak) |

## Loyiha tuzilmasi

```
src/                     # Kontent (inglizchasi ildizda)
  creational/ structural/ behavioral/ architectural/
  comparisons/           # Patternlarni taqqoslash sahifalari
  uz/                    # Oʻzbekcha tarjima, xuddi shu yoʻllar tuzilmasida
public/                  # Statik resurslar: covers/, cards/, og/ (ijtimoiy tarmoq rasmlari), ikonkalar
.vitepress/
  config/                # Sayt konfiguratsiyasi, har bir til uchun nav/sidebar (langs/), markdown plaginlari
  theme/                 # Mavzu sozlamalari va Vue komponentlari (CoverImage, Card, Mermaid, …)
scripts/                 # Kontent tekshiruvlari va rasmlarni qayta ishlash skriptlari
```

## Kontent yozish

- Har bir sahifa frontmatter bilan boshlanadi: `title`, `description` va `icon` (PascalCase koʻrinishidagi [Lucide](https://lucide.dev/icons) ikonka nomi, sidebarda koʻrsatiladi).
- Implementatsiyalarni `::: code-group` bilan guruhlang va tablarni til nomi bilan belgilang, masalan: ` ```python [Python] `.
- Diagrammalar ` ```mermaid ` bloklariga yoziladi.
- Yangi sahifalarni `.vitepress/config/langs/en.ts` va `uz.ts` fayllaridagi sidebarga qoʻshing.
- Tarjimalar `src/uz/` ostida xuddi shu yoʻlda joylashadi; kod bloklarini inglizchadagi bilan bir xil saqlang (izohlarni tarjima qilish mumkin) va `bun run check:i18n` ni ishga tushiring.

## Qoʻllab-quvvatlash

Agar bu loyiha sizga foydali boʻlgan boʻlsa, uni qoʻllab-quvvatlashingiz mumkin: https://taps.uz/uzhandy

## Hissa qoʻshish

Hissalaringizni mamnuniyat bilan qabul qilamiz — issue yoki pull request oching. Yuborishdan oldin `bun run check` va `bun run build` ni ishga tushiring.

## Litsenziya

[MIT](LICENSE) © 2025-present Otabek Sadiridinov
