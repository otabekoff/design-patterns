# Tasarım Desenleri Dokümantasyonu

Languages: [English](README.md) | [Oʻzbek](README.uz.md) | [Русский](README.ru.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Deutsch](README.de.md) | [Español](README.es.md)

Yazılım tasarım desenleri için modern, hızlı ve araması kolay bir dokümantasyon sitesi. TanStack Start ve Fumadocs ile oluşturuldu; yaratıcı, yapısal, davranışsal ve mimari desenler için temiz bir okuma deneyimi sunar.

## Özellikler

- Temiz ve okunabilir dokümantasyon düzeni
- Hızlı gezinme ve tam metin arama
- `content/docs` içinde MDX içerik
- Okuma için optimize edilmiş duyarlı arayüz
- Yerleşik docs yönlendirmesi ve sayfa ağacı

## Teknoloji Yığını

- **TanStack Start**
- **Fumadocs UI + Core**
- **React**
- **Vite**
- **Tailwind CSS**

## Hızlı Başlangıç

Bağımlılıkları kurun:

```bash
npm install
# or
pnpm install
# or
yarn
```

Geliştirme sunucusunu başlatın:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

## Yararlı Komutlar

```bash
npm run dev        # Geliştirme sunucusu
npm run build      # Production derlemesi
npm run preview    # Production önizleme
npm run types:check
npm run lint
```

## Proje Yapısı

```
content/docs/        # Dokümantasyon içeriği (MDX)
src/routes/          # Rotalar (home, docs, api)
src/lib/             # Paylaşılan yapılandırma ve yardımcılar
src/components/      # UI bileşenleri
src/styles/          # Global stiller
```

## Yapılandırma

- **Site adı**: `src/lib/shared.ts` dosyasını güncelleyin
- **Navbar linkleri**: `src/lib/layout.shared.tsx` dosyasını güncelleyin
- **Docs içeriği**: `content/docs` içine dosya ekleyin veya düzenleyin

## Destek

Bu proje işinize yarıyorsa destek olabilirsiniz:

- https://tirikchilik.uz/uzhandy

## Katkıda Bulunma

Katkılar memnuniyetle karşılanır. Önerileriniz için issue veya PR açın.

## Lisans

Bu proje MIT lisansı ile lisanslanmıştır.
