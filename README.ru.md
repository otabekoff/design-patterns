# Документация по паттернам проектирования

Languages: [English](README.md) | [Oʻzbek](README.uz.md) | [Русский](README.ru.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Deutsch](README.de.md) | [Español](README.es.md)

Современный, быстрый и удобный для поиска сайт документации по шаблонам проектирования. Построен на TanStack Start и Fumadocs и предоставляет удобное чтение для порождающих, структурных, поведенческих и архитектурных паттернов.

## Особенности

- Чистый и удобный для чтения интерфейс
- Быстрая навигация и полнотекстовый поиск
- MDX‑контент в `content/docs`
- Адаптивный интерфейс, оптимизированный для чтения
- Встроенные маршруты документации и дерево страниц

## Стек технологий

- **TanStack Start**
- **Fumadocs UI + Core**
- **React**
- **Vite**
- **Tailwind CSS**

## Быстрый старт

Установите зависимости:

```bash
npm install
# or
pnpm install
# or
yarn
```

Запустите dev‑сервер:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

## Полезные команды

```bash
npm run dev        # Запуск dev‑сервера
npm run build      # Сборка для production
npm run preview    # Просмотр production‑сборки
npm run types:check
npm run lint
```

## Структура проекта

```
content/docs/        # Контент документации (MDX)
src/routes/          # Маршруты (home, docs, api)
src/lib/             # Общие настройки и утилиты
src/components/      # UI‑компоненты
src/styles/          # Глобальные стили
```

## Настройка

- **Название сайта**: обновите `src/lib/shared.ts`
- **Ссылки в navbar**: обновите `src/lib/layout.shared.tsx`
- **Контент docs**: добавляйте или редактируйте файлы в `content/docs`

## Поддержка

Если проект вам полезен, поддержите его:

- https://tirikchilik.uz/uzhandy

## Вклад

Приветствуются issues и PR. Создайте issue или PR с вашими изменениями.

## Лицензия

Проект распространяется по лицензии MIT.
