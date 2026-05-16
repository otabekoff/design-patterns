# توثيق أنماط التصميم

Languages: [English](README.md) | [Oʻzbek](README.uz.md) | [Русский](README.ru.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Deutsch](README.de.md) | [Español](README.es.md)

موقع توثيق حديث وسريع وقابل للبحث لأنماط التصميم البرمجية. مبني باستخدام TanStack Start و Fumadocs ويوفر تجربة قراءة واضحة للأنماط الإنشائية والبنيوية والسلوكية والمعمارية.

## المزايا

- واجهة نظيفة وسهلة القراءة
- تنقل سريع وبحث نصّي كامل
- محتوى MDX داخل `content/docs`
- واجهة متجاوبة ومهيأة للقراءة
- مسارات توثيق وشجرة صفحات مدمجة

## التقنيات المستخدمة

- **TanStack Start**
- **Fumadocs UI + Core**
- **React**
- **Vite**
- **Tailwind CSS**

## البدء السريع

ثبّت الاعتمادات:

```bash
npm install
# or
pnpm install
# or
yarn
```

شغّل خادم التطوير:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

## أوامر مفيدة

```bash
npm run dev        # تشغيل خادم التطوير
npm run build      # بناء للإنتاج
npm run preview    # معاينة بناء الإنتاج
npm run types:check
npm run lint
```

## هيكل المشروع

```
content/docs/        # محتوى التوثيق (MDX)
src/routes/          # المسارات (home, docs, api)
src/lib/             # إعدادات ومساعدات مشتركة
src/components/      # مكوّنات الواجهة
src/styles/          # أنماط عامة
```

## الإعداد

- **اسم الموقع**: حدّث `src/lib/shared.ts`
- **روابط شريط التنقل**: حدّث `src/lib/layout.shared.tsx`
- **محتوى التوثيق**: أضف أو عدّل الملفات في `content/docs`

## الدعم

إذا كان هذا المشروع مفيدًا لك، يمكنك دعمه:

- https://tirikchilik.uz/uzhandy

## المساهمة

المساهمات مرحّب بها. افتح issue أو PR بتغييراتك المقترحة.

## الترخيص

هذا المشروع مرخّص تحت رخصة MIT.
