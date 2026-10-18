# أنماط التصميم

Languages: [English](README.md) | [Oʻzbek](README.uz.md) | [Русский](README.ru.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Deutsch](README.de.md) | [Español](README.es.md)

مرجع شامل وقابل للبحث لأنماط تصميم البرمجيات — الإنشائية والبنيوية والسلوكية والمعمارية — مع مخططات وأمثلة متجاورة بلغات TypeScript وPython وJava وGo وRust.

**الموقع المباشر:** https://otabekoff.github.io/design-patterns/

## المزايا

- 41 نمطًا، لكل منها تشبيه توضيحي، ومخطط بنية بـ Mermaid، وتطبيقات بخمس لغات، وأخطاء شائعة، وأسئلة مقابلات
- دليل "اختيار النمط" لاتخاذ القرار، وصفحات مقارنة متجاورة (Strategy vs State، Decorator vs Proxy، …)
- نسختان باللغتين الإنجليزية والأوزبكية
- بحث محلي في النص الكامل، وسمات فاتحة/داكنة، وتذكّر لغة الشيفرة المفضلة عبر الصفحات
- إجراءا "Copy Markdown" و"Open in ChatGPT / Claude" في كل صفحة

## التقنيات المستخدمة

[VitePress](https://vitepress.dev) (Vue 3 + Vite)، وMermaid، وأيقونات Lucide، والنشر على GitHub Pages. يُستخدم [Bun](https://bun.sh) مديرًا للحزم ومشغّلًا للسكربتات.

## البدء السريع

```bash
bun install
bun run dev        # http://localhost:5173/design-patterns/
```

## السكربتات

| الأمر | ما يفعله |
| --- | --- |
| `bun run dev` | يشغّل خادم التطوير |
| `bun run build` | يبني الموقع الثابت في `.vitepress/dist` (يفشل عند وجود روابط معطّلة) |
| `bun run preview` | يقدّم نسخة الإنتاج محليًا |
| `bun run check` | يشغّل جميع فحوصات المحتوى أدناه |
| `bun run check:mermaid` | يحلّل كل مخطط Mermaid |
| `bun run check:code` | يفحص صياغة كل مثال شيفرة (TS/JS عبر esbuild، وPython، وJava، وGo، وRust — تُتخطّى سلاسل الأدوات غير المثبّتة) |
| `bun run check:i18n` | يقارن كل صفحة إنجليزية بترجمتها الأوزبكية (الصفحات الناقصة، واختلافات الشيفرة/المخططات) |
| `bun run images` | يعيد ترميز صور الأغلفة/البطاقات إلى WebP ويعيد توليد صور الشبكات الاجتماعية (يتطلب Python + Pillow) |

## هيكل المشروع

```
src/                     # المحتوى (الإنجليزية في الجذر)
  creational/ structural/ behavioral/ architectural/
  comparisons/           # صفحات المقارنة بين الأنماط
  uz/                    # الترجمة الأوزبكية بالمسارات نفسها
public/                  # الملفات الثابتة: covers/، cards/، og/ (صور الشبكات الاجتماعية)، الأيقونات
.vitepress/
  config/                # إعدادات الموقع، وnav/sidebar لكل لغة (langs/)، وإضافات markdown
  theme/                 # تخصيصات السمة ومكوّنات Vue (CoverImage، Card، Mermaid، …)
scripts/                 # فحوصات المحتوى وخط معالجة الصور
```

## كتابة المحتوى

- تبدأ كل صفحة بـ frontmatter: `title` و`description` و`icon` (اسم أيقونة من [Lucide](https://lucide.dev/icons) بصيغة PascalCase، تظهر في الشريط الجانبي).
- اجمع التطبيقات باستخدام `::: code-group` وسمِّ علامات التبويب باسم اللغة، مثل ` ```python [Python] `.
- توضع المخططات في كتل ` ```mermaid `.
- أضف الصفحات الجديدة إلى الشريط الجانبي في `.vitepress/config/langs/en.ts` و`uz.ts`.
- توجد الترجمات في المسار نفسه تحت `src/uz/`؛ أبقِ كتل الشيفرة مطابقة للنسخة الإنجليزية (يمكن ترجمة التعليقات) وشغّل `bun run check:i18n`.

## الدعم

إذا وجدت هذا المشروع مفيدًا، فكّر في دعمه: https://taps.uz/uzhandy

## المساهمة

المساهمات مرحّب بها — افتح issue أو pull request. يُرجى تشغيل `bun run check` و`bun run build` قبل الإرسال.

## الترخيص

[MIT](LICENSE) © 2025-present Otabek Sadiridinov
