# Tasarım Desenleri

Languages: [English](README.md) | [Oʻzbek](README.uz.md) | [Русский](README.ru.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Deutsch](README.de.md) | [Español](README.es.md)

Yazılım tasarım desenleri — yaratımsal, yapısal, davranışsal ve mimari — için diyagramlar ve TypeScript, Python, Java, Go ve Rust ile yan yana örnekler içeren, eksiksiz ve aranabilir bir başvuru kaynağı.

**Canlı site:** https://otabekoff.github.io/design-patterns/

## Özellikler

- 41 desen; her biri için bir benzetme, bir Mermaid yapı diyagramı, beş dilde uygulamalar, yaygın hatalar ve mülakat soruları
- "Desen Seçimi" karar rehberi ve yan yana karşılaştırma sayfaları (Strategy vs State, Decorator vs Proxy, …)
- İngilizce ve Özbekçe sürümler
- Yerel tam metin arama, açık/koyu temalar ve sayfalar arasında hatırlanan kod dili tercihi
- Her sayfada "Copy Markdown" ve "Open in ChatGPT / Claude" eylemleri

## Teknoloji Yığını

[VitePress](https://vitepress.dev) (Vue 3 + Vite), Mermaid, Lucide simgeleri; GitHub Pages üzerinde yayınlanır. Paket yöneticisi ve betik çalıştırıcı olarak [Bun](https://bun.sh) kullanılır.

## Hızlı Başlangıç

```bash
bun install
bun run dev        # http://localhost:5173/design-patterns/
```

## Betikler

| Komut | Ne yapar |
| --- | --- |
| `bun run dev` | Geliştirme sunucusunu başlatır |
| `bun run build` | Statik siteyi `.vitepress/dist` içine derler (kırık bağlantılarda başarısız olur) |
| `bun run preview` | Production derlemesini yerel olarak sunar |
| `bun run check` | Aşağıdaki tüm içerik kontrollerini çalıştırır |
| `bun run check:mermaid` | Her Mermaid diyagramını ayrıştırır |
| `bun run check:code` | Her kod örneğinin sözdizimini denetler (TS/JS esbuild ile, Python, Java, Go, Rust — kurulu olmayan araç zincirleri atlanır) |
| `bun run check:i18n` | Her İngilizce sayfayı Özbekçe çevirisiyle karşılaştırır (eksik sayfalar, kod/diyagram farklılıkları) |
| `bun run images` | Kapak/kart görsellerini WebP olarak yeniden kodlar ve sosyal medya görsellerini yeniden üretir (Python + Pillow gerekir) |

## Proje Yapısı

```
src/                     # İçerik (İngilizce kök dizinde)
  creational/ structural/ behavioral/ architectural/
  comparisons/           # Desen karşılaştırma sayfaları
  uz/                    # Aynı yolları izleyen Özbekçe çeviri
public/                  # Statik dosyalar: covers/, cards/, og/ (sosyal medya görselleri), simgeler
.vitepress/
  config/                # Site yapılandırması, dile göre nav/sidebar (langs/), markdown eklentileri
  theme/                 # Tema özelleştirmeleri ve Vue bileşenleri (CoverImage, Card, Mermaid, …)
scripts/                 # İçerik kontrolleri ve görsel işleme hattı
```

## İçerik Yazma

- Her sayfa frontmatter ile başlar: `title`, `description` ve `icon` (PascalCase biçiminde bir [Lucide](https://lucide.dev/icons) simge adı; kenar çubuğunda gösterilir).
- Uygulamaları `::: code-group` ile gruplayın ve sekmeleri dile göre etiketleyin, ör. ` ```python [Python] `.
- Diyagramlar ` ```mermaid ` bloklarına yazılır.
- Yeni sayfaları `.vitepress/config/langs/en.ts` ve `uz.ts` içindeki kenar çubuğuna ekleyin.
- Çeviriler `src/uz/` altında aynı yolda bulunur; kod bloklarını İngilizce sürümle aynı tutun (yorumlar çevrilebilir) ve `bun run check:i18n` komutunu çalıştırın.

## Destek

Bu projeyi faydalı bulduysanız desteklemeyi düşünebilirsiniz: https://taps.uz/uzhandy

## Katkıda Bulunma

Katkılarınızı memnuniyetle karşılıyoruz — bir issue veya pull request açın. Göndermeden önce lütfen `bun run check` ve `bun run build` komutlarını çalıştırın.

## Lisans

[MIT](LICENSE) © 2025-present Otabek Sadiridinov
