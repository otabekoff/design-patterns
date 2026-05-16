# Dizayn naqshlari hujjatlari

Languages: [English](README.md) | [Oʻzbek](README.uz.md) | [Русский](README.ru.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Deutsch](README.de.md) | [Español](README.es.md)

Dizayn naqshlari uchun zamonaviy, tez va qidiruvga qulay hujjatlar sayti. TanStack Start va Fumadocs asosida qurilgan bo‘lib, kreasion, strukturaviy, xulq-atvor va arxitektura naqshlarini o‘qishga qulay tarzda taqdim etadi.

## Xususiyatlar

- Toza va o‘qishga qulay layout
- Tez navigatsiya va to‘liq matnli qidiruv
- `content/docs` ichida MDX kontent
- O‘qish uchun moslashtirilgan responsiv UI
- Tayyor docs routing va page tree

## Texnologiyalar steki

- **TanStack Start**
- **Fumadocs UI + Core**
- **React**
- **Vite**
- **Tailwind CSS**

## Tez boshlash

Bog‘liqliklarni o‘rnating:

```bash
npm install
# or
pnpm install
# or
yarn
```

Dev serverni ishga tushiring:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

## Foydali skriptlar

```bash
npm run dev        # Dev serverni ishga tushirish
npm run build      # Production build
npm run preview    # Production buildni ko‘rish
npm run types:check
npm run lint
```

## Loyiha tuzilmasi

```
content/docs/        # Hujjatlar kontenti (MDX)
src/routes/          # Marshrutlar (home, docs, api)
src/lib/             # Umumiy konfiguratsiya va yordamchi fayllar
src/components/      # UI komponentlari
src/styles/          # Global uslublar
```

## Sozlash

- **Sayt nomi**: `src/lib/shared.ts` faylini yangilang
- **Navbar linklari**: `src/lib/layout.shared.tsx` faylini yangilang
- **Docs kontent**: `content/docs` ichida fayllarni qo‘shing yoki tahrirlang

## Qo‘llab-quvvatlash

Loyiha sizga foydali bo‘lsa, qo‘llab-quvvatlang:

- https://tirikchilik.uz/uzhandy

## Hissa qo‘shish

Takliflar va PRlar uchun xush kelibsiz. O‘zgartirishlaringiz bilan issue yoki PR oching.

## Litsenziya

Ushbu loyiha MIT litsenziyasi ostida.
