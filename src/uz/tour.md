---
title: Qo'llanma bo'ylab sayohat
description: Dizayn patternlari hujjatlari imkoniyatlari bo'yicha qo'llanma
icon: BookOpen
---


# 📚 Qo'llanma bo'ylab sayohat

Dizayn patternlari bo'yicha keng qamrovli qo'llanmaga xush kelibsiz! Keling, sizga nimalar mavjudligi va ulardan qanday samarali foydalanish bo'yicha sayohat uyushtiramiz.

## 🎯 Sizda nimalar bor

Ushbu qo'llanma 4 ta toifaga bo'lingan **38 ta dizayn patternini** o'z ichiga oladi:

- **6 ta Yaratuvchi (Creational) patternlar** - Obyekt yaratishga qaratilgan
- **7 ta Strukturaviy (Structural) patternlar** - Obyektlar tarkibiga qaratilgan
- **12 ta Xulq-atvor (Behavioral) patternlar** - Obyektlararo aloqaga qaratilgan
- **13 ta Arxitektura (Architectural) patternlar** - Tizim tuzilishiga qaratilgan

## 🚀 Ishni boshlash

<Cards>
  <Card
    title="Asosiy sahifa"
    description="Barcha patternlarni vizual kartalar yordamida toifalar bo'yicha ko'rib chiqing"
    href="/uz/"
  />
  <Card
    title="Tezkor ma'lumotnoma"
    description="Jadvallar, qarorlar daraxti va patternlarni solishtirish"
    href="/uz/quick-reference"
  />
  <Card
    title="Yaratuvchi patternlar"
    description="Obyektlarni yaratish mexanizmlari"
    href="/uz/creational/singleton"
  />
  <Card
    title="Strukturaviy patternlar"
    description="Obyektlar tarkibi va aloqalari"
    href="/uz/structural/adapter"
  />
  <Card
    title="Xulq-atvor patternlari"
    description="Obyektlararo aloqa va mas'uliyat"
    href="/uz/behavioral/observer"
  />
  <Card
    title="Arxitektura patternlari"
    description="Tizim tuzilishi va parallellik"
    href="/uz/architectural/mvc"
  />
</Cards>

## 📖 Xususiyatlar va komponentlar

### 1. Interaktiv kartalar (Asosiy sahifa)

Asosiy sahifada **Karta komponentlari** quyidagilar uchun ishlatiladi:

- Barcha patternlarni tavsiflari bilan ko'rsatish
- Patternlarni toifalar bo'yicha tartiblash
- Tezkor navigatsiya havolalarini taqdim etish
- Vizual farqlash uchun piktogrammalardan foydalanish

**Misol**: Barcha patternlar uchun kartalarni ko'rish uchun [asosiy sahifani](/uz/) tekshiring.

### 2. Kod tablari (Barcha pattern sahifalari)

Har bir pattern quyidagilar uchun **Tabs** komponentini o'z ichiga oladi:

- TypeScript implementatsiyalari
- Python implementatsiyalari
- Tillar o'rtasida oson almashish
- Tayyor kod namunalari

::: info
Har bir kod misoli to'liq va ishga tushirilishi mumkin. Siz ularni nusxalab, loyihalaringizda to'g'ridan-to'g'ri ishlatishingiz mumkin!
:::

### 3. Solishtirish jadvallari

Tezkor ma'lumotnoma sahifasi quyidagilarni o'z ichiga oladi:

- Patternlarni solishtirish jadvallari
- Pattern tanlash uchun qarorlar daraxti
- Unumdorlik bo'yicha tavsiyalar
- Testlash bo'yicha tavsiyalar
- Umumiy xatolar

### 4. Callout qutilari

Muhim ma'lumotlar **Callout** komponentlari bilan ajratib ko'rsatiladi:

- ⚠️ Anti-patternlar uchun ogohlantirishlar
- 💡 Eng yaxshi amaliyotlar (best practices) uchun maslahatlar
- 📌 Muhim mulohazalar

### 5. Keng qamrovli kontent

Har bir pattern sahifasi quyidagilarni o'z ichiga oladi:

```
Umumiy ko'rinish     → Pattern nima?
Maqsad               → Nima uchun ishlatiladi?
Muammo               → U qanday muammoni hal qiladi?
Yechim               → U qanday ishlaydi?
Implementatsiya      → Kod misollari (TypeScript + Python)
Haqiqiy misol        → Amaliy qo'llanilishi
Afzalliklar          → ✅ Foydali tomonlari
Kamchiliklar         → ❌ Salbiy tomonlari
Qachon ishlatish     → Ideal ssenariylar
Qachon ishlatmaslik  → Anti-patternlar
Bog'liq patternlar   → Aloqador patternlar
```

## 🎓 Tavsiya etilgan o'rganish yo'li

### Boshlovchilar uchun

1. Kontekst uchun **Tezkor ma'lumotnoma**dan boshlang
2. **Singleton**ni o'rganing (oddiy, fundamental)
3. **Factory Method**ni o'rganing (amaliy, keng tarqalgan)
4. **Strategy**ni o'rganing (foydali, moslashuvchan)
5. **Observer**ni o'rganing (hodisalarga asoslangan tushuncha)

### O'rta darajadagilar uchun

1. Birinchi navbatda **Yaratuvchi patternlar**ni o'zlashtiring
2. Keyin **Strukturaviy patternlar**ni (tarkib)
3. Keyin **Xulq-atvor patternlari**ni (aloqa)
4. Va nihoyat **Arxitektura patternlari**ni (tizim dizayni)

### Professional darajadagilar uchun

1. **Patternlar kombinatsiyasi**ni tushunib oling
2. **Arxitektura patternlari**ni chuqur o'rganing
3. **Parallellik (concurrency) patternlari**ni o'rganing
4. **CQRS** va **Event Sourcing**ni amaliyotda qo'llang

## 💡 Ushbu qo'llanmadan qanday foydalanish kerak

### Qaror qabul qilish uchun

1. [Tezkor ma'lumotnoma](/uz/quick-reference)ga o'ting
2. "Qarorlar daraxti" bo'limidan foydalaning
3. O'zingizga mos ssenariyni toping
4. Tavsiya etilgan patternni ustiga bosing

### Implementatsiya uchun

1. Patternning umumiy ko'rinishini o'qing
2. U hal qiladigan muammoni tushunib oling
3. Kod misollarini o'rganing
4. Haqiqiy hayotiy misolni ko'rib chiqing
5. Afzallik va kamchiliklarini tekshiring

### Jamoaviy muhokamalar uchun

- Umumiy lug'at uchun pattern nomlariga murojaat qiling
- Maxsus pattern sahifalarini jamoangiz bilan baham ko'ring
- Kombinatsiyalarni muhokama qilish uchun "Bog'liq patternlar" bo'limidan foydalaning
- Tuzoqlardan qochish uchun "Umumiy xatolar"ni ko'rib chiqing

### Intervyuga tayyorgarlik ko'rish uchun

- Tezkor ma'lumotnomani muntazam ravishda ko'rib chiqing
- Har bir patternni tushuntirishni mashq qiling
- Kod misollarini o'rganing
- Har bir patternni qachon va nima uchun ishlatishni biling
- Patternlar o'rtasidagi munosabatlarni biling

## 🔍 Navigatsiya bo'yicha maslahatlar

### Qo'llanma ichida

- Barcha patternlarni ko'rish uchun **yon paneldan** foydalaning
- Bog'lanishlarni o'rganish uchun **Bog'liq patternlar** havolalarini bosing
- **Qidiruv funksiyasi**dan foydalaning (Mac-da Cmd+K, Windows-da Ctrl+K)
- Tezkor qidirish uchun **Tezkor ma'lumotnoma**ni tekshiring

### Patternlar o'rtasida o'tish

Har bir pattern sahifasi quyidagilarni o'z ichiga oladi:

- Bog'liq patternlarga havolalar
- Matndagi o'zaro havolalar
- Keyingi o'rganish uchun tavsiya etilgan patternlar bo'yicha takliflar

## 📊 Kontentning asosiy jihatlari

### Haqiqiy hayotiy misollar

Har bir pattern quyidagi kabi amaliy misollarni o'z ichiga oladi:

- Haqiqiy SQL ssenariylaridan foydalangan holda ma'lumotlar bazasi patternlari
- React/UI freymvorklari bilan UI patternlari
- Bir nechta usullar bilan to'lovlarni qayta ishlash
- Parallellikka ega kesh tizimlari

### Bir nechta kodlash tillari

Barcha misollar quyidagilarni o'z ichiga oladi:

- **TypeScript** - Veb dasturchilar uchun
- **Python** - Umumiy dasturlash uchun

### To'liq implementatsiyalar

Kod misollari:

- ✅ Ishlab chiqarishga tayyor (Production-ready)
- ✅ Yaxshi izohlangan
- ✅ Xatolar qayta ishlangan
- ✅ Type-safe (tur xavfsizligi ta'minlangan)
- ✅ Tushunish oson

## 🎯 Tezkor kirish

::: info
Tezkor ma'lumotnoma sahifasidan qaror qabul qilish vositasi sifatida foydalaning. Unda qarorlar daraxti, foydalanish holatlari va pattern kombinatsiyalari mavjud.
:::

### Umumiy ssenariylar

**"Menga obyektlarni samarali yaratish kerak"**
→ [Singleton](/uz/creational/singleton) | [Factory Method](/uz/creational/factory-method) | [Builder](/uz/creational/builder)

**"Menga hodisalarni boshqarish kerak"**
→ [Observer](/uz/behavioral/observer) | [Command](/uz/behavioral/command) | [Chain of Responsibility](/uz/behavioral/chain-of-responsibility)

**"Menga ilovamni strukturasi kerak"**
→ [MVC](/uz/architectural/mvc) | [MVP](/uz/architectural/mvp) | [Repository](/uz/architectural/repository)

**"Menga parallellikni boshqarish kerak"**
→ [Producer-Consumer](/uz/architectural/producer-consumer) | [Read-Write Lock](/uz/architectural/read-write-lock)

## 📚 Resurslar

### Ushbu saytda

- **Asosiy sahifa** - Barcha 38 ta patternning umumiy ko'rinishi
- **Tezkor ma'lumotnoma** - Qarorlar daraxti va jadvallar
- **Pattern sahifalari** - Har bir patternni chuqur o'rganish
- **Kod misollari** - Foydalanishga tayyor implementatsiyalar

### Tashqi resurslar

Ushbu qo'llanmani quyidagilar bilan to'ldirishni tavsiya etamiz:

- Gang of Four kitobi ("Design Patterns")
- Refactoring.Guru dizayn patternlari bo'yicha qo'llanma
- IDE-ingizning o'rnatilgan hujjatlari
- Pattern implementatsiyalarini ko'rsatadigan GitHub repozitariylari

## 🤝 Hissa qo'shish

Agar siz quyidagilarni xohlasangiz:

- Ko'proq misollar qo'shish
- Yaxshilash bo'yicha takliflar berish
- Xatolar haqida xabar berish
- Yangi patternlar qo'shish

[Loyiha repozitariyasini](https://github.com) tekshiring yoki qo'llanma ma'murlari bilan bog'laning.

## ✅ O'rganish uchun nazorat ro'yxati

- [ ] Asosiy sahifani o'qing
- [ ] Tezkor ma'lumotnomani o'rganing
- [ ] 3-5 ta boshlang'ich patternlarni o'rganing
- [ ] Patternni amalga oshirishni mashq qiling
- [ ] Patternni boshqa birovga o'rgating
- [ ] Loyihada ikkita patternni birlashtiring
- [ ] Murakkab arxitektura patternlarini o'rganing
- [ ] O'z misollaringiz bilan hissa qo'shing

---

## 🎉 Tadqiq qilishga tayyormisiz?

Umumiy ko'rinish uchun **[Asosiy sahifa](/uz/)**dan boshlang yoki o'zingizga kerakli patternni topish uchun **[Tezkor ma'lumotnoma](/uz/quick-reference)**ga o'ting.

O'rganishda omad yor bo'lsin! 🚀

### Professional maslahatlar

1. **Tezkor ma'lumotnomani xatcho'pga qo'shib qo'ying** - Undan tez-tez foydalanasiz
2. **Kod misollarini bir necha bor o'qing** - Tushunish uchun vaqt va amaliyot kerak
3. **Patternlarni kichik loyihalarda qo'llang** - Amaliyot orqali o'rganish eng yaxshisidir
4. **Patternlarni birlashtiring** - Haqiqiy ilovalar bir nechta patternlardan foydalanadi
5. **Boshqalar bilan muhokama qiling** - Boshqalarga o'rgatish sizga o'rganishga yordam beradi

---

**Yordam kerakmi?** Tezkor ma'lumotnomani tekshiring yoki Cmd+K (Mac) yoki Ctrl+K (Windows) tugmalaridan foydalanib kalit so'zlar orqali qidiring.
