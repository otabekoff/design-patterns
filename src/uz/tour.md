---
title: Qo'llanma bo'ylab sayohat
description: Loyihalash andozalari hujjatlari imkoniyatlari bo'yicha qo'llanma
icon: BookOpen
---

# 📚 Qo'llanma bo'ylab sayohat

<CoverImage src="/covers/getting-started/tour.webp" alt="Cover">
  <h1>Sayohat</h1>
  <p>Quvnoq robot-gid kichkina, nafis futuristik uchar avtobusni boshqarmoqda; avtobus ichidagi qiziquvchan jajji robotchalar derazadan Yaratuvchi, Tuzilmaviy va Xulq-atvor andozalarini ifodalovchi ulkan, havoda suzib yurgan yodgorliklarga termulib qarashmoqda.</p>
</CoverImage>

Loyihalash andozalari (Design Patterns) bo'yicha keng qamrovli qo'llanmaga xush kelibsiz! Keling, sizga nimalar mavjudligi va ulardan qanday samarali foydalanish bo'yicha sayohat uyushtiramiz.

## 🎯 Sizda nimalar bor

Ushbu sahifa hujjatlar qanday tuzilganini, har bir andoza sahifasida nimalar borligini va maqsadingizga qarab ularda qanday samarali harakatlanishni tushuntiradi.

Ushbu qo'llanma 4 ta toifaga bo'lingan **41 ta loyihalash andozasini** o'z ichiga oladi:

| Toifa                       | Soni | Yo'nalishi                            |
| --------------------------- | ---- | ------------------------------------- |
| Yaratuvchi (Creational)     | 6    | Obyekt yaratish va hayot sikli        |
| Tuzilmaviy (Structural)     | 7    | Obyektlar tarkibi va munosabatlari    |
| Xulq-atvor (Behavioral)     | 12   | Aloqa va mas'uliyat                   |
| Arxitektura (Architectural) | 16   | Tizim tuzilishi va ma'lumotlar oqimi  |

## 🚀 Ishni boshlash

<Cards>
  <Card
    title="Asosiy sahifa"
    description="Barcha andozalarni vizual kartalar yordamida toifalar bo'yicha ko'rib chiqing"
    href="/uz/"
    image="/cards/introduction.webp"
  />
  <Card
    title="Tezkor ma'lumotnoma"
    description="Jadvallar, qarorlar daraxti va andozalarni solishtirish"
    href="/uz/quick-reference"
    image="/cards/quick-reference.webp"
  />
  <Card
    title="Yaratuvchi andozalar"
    description="Obyektlarni yaratish mexanizmlari"
    href="/uz/creational/singleton"
    image="/cards/singleton.webp"
  />
  <Card
    title="Tuzilmaviy andozalar"
    description="Obyektlar tarkibi va aloqalari"
    href="/uz/structural/adapter"
    image="/cards/adapter.webp"
  />
  <Card
    title="Xulq-atvor andozalari"
    description="Obyektlararo aloqa va mas'uliyat"
    href="/uz/behavioral/observer"
    image="/cards/observer.webp"
  />
  <Card
    title="Arxitektura andozalari"
    description="Tizim tuzilishi va parallellik"
    href="/uz/architectural/mvc"
    image="/cards/mvc.webp"
  />
</Cards>

## 📖 Xususiyatlar va komponentlar

### 1. Interaktiv kartalar (Asosiy sahifa)

Asosiy sahifada **Karta komponentlari** quyidagilar uchun ishlatiladi:

- Barcha andozalarni tavsiflari bilan ko'rsatish
- Andozalarni toifalar bo'yicha tartiblash
- Tezkor navigatsiya havolalarini taqdim etish
- Vizual farqlash uchun piktogrammalardan foydalanish

**Misol**: Barcha andozalar uchun kartalarni ko'rish uchun [asosiy sahifani](/uz/) tekshiring.

### 2. Kod tablari (Barcha andoza sahifalari)

Har bir andoza quyidagilar uchun **Tabs** komponentini o'z ichiga oladi:

- TypeScript implementatsiyalari
- Python implementatsiyalari
- Tillar o'rtasida oson almashish
- Tayyor kod namunalari

::: info
Har bir kod misoli to'liq va ishga tushirilishi mumkin. Siz ularni nusxalab, loyihalaringizda to'g'ridan-to'g'ri ishlatishingiz mumkin!
:::

### 3. Solishtirish jadvallari

Tezkor ma'lumotnoma sahifasi quyidagilarni o'z ichiga oladi:

- Andozalarni solishtirish jadvallari
- Andoza tanlash uchun qarorlar daraxti
- Unumdorlik bo'yicha tavsiyalar
- Testlash bo'yicha tavsiyalar
- Umumiy xatolar

### 4. Callout qutilari

Muhim ma'lumotlar **Callout** komponentlari bilan ajratib ko'rsatiladi:

- ⚠️ Anti-andozalar uchun ogohlantirishlar
- 💡 Eng yaxshi amaliyotlar (best practices) uchun maslahatlar
- 📌 Muhim mulohazalar

### 5. Keng qamrovli kontent

Har bir andoza sahifasi quyidagilarni o'z ichiga oladi:

```
Umumiy ko'rinish     → Andoza nima?
Maqsad               → Nima uchun ishlatiladi?
Muammo               → U qanday muammoni hal qiladi?
Yechim               → U qanday ishlaydi?
Implementatsiya      → Kod misollari (TypeScript + Python)
Haqiqiy misol        → Amaliy qo'llanilishi
Afzalliklar          → ✅ Foydali tomonlari
Kamchiliklar         → ❌ Salbiy tomonlari
Qachon ishlatish     → Ideal ssenariylar
Qachon ishlatmaslik  → Anti-andozalar
Bog'liq andozalar    → Aloqador andozalar
```

Har bir sahifa oxiridagi **Bog'liq andozalar** bo'limi ayniqsa foydali — u siz kutmagan bog'lanishlarni ochib beradi va nima uchun andozalar ko'pincha birgalikda ishlatilishini tushunishga yordam beradi.

## 🎓 Tavsiya etilgan o'rganish yo'li

### Boshlovchilar uchun

1. Avval [Loyihalash andozasi nima?](/uz/what-is-design-pattern) sahifasini o'qing
2. Umumiy ko'rinish uchun [Tezkor ma'lumotnoma](/uz/quick-reference)ni ko'rib chiqing
3. **Singleton**ni o'rganing (eng oddiy tuzilma)
4. **Fabrika metodi (Factory Method)**ni o'rganing (amaliy, keng tarqalgan)
5. **Strategiya (Strategy)**ni o'rganing (darhol foydali, moslashuvchan)
6. **Kuzatuvchi (Observer)**ni o'rganing (hodisalarga asoslangan fikrlashni o'rgatadi)

Keyingisiga o'tishdan oldin har birini kichik shaxsiy loyihada amalga oshirib ko'ring.

### O'rta darajadagilar uchun

1. Birinchi navbatda **Yaratuvchi andozalar**ni o'zlashtiring
2. Keyin **Tuzilmaviy andozalar**ni (tarkib)
3. Keyin **Xulq-atvor andozalari**ni (aloqa)
4. Va nihoyat **Arxitektura andozalari**ni (tizimni loyihalash)

Yaratuvchi va Tuzilmaviy toifalar eng qisqasi va qolgan barcha narsalarning asosi hisoblanadi. "Qachon ishlatmaslik" bo'limlariga alohida e'tibor bering: andozaning chegaralarini tushunish uning tuzilishini tushunish kabi muhim.

### Professional darajadagilar uchun

1. **Andozalar kombinatsiyasi**ni tushunib oling
2. **Arxitektura andozalari**ni chuqur o'rganing
3. **Parallellik (concurrency) andozalari**ni o'rganing
4. **CQRS** va **Event Sourcing**ni amaliyotda qo'llang

Kerakli andozaga to'g'ridan-to'g'ri o'ting yoki [Tezkor ma'lumotnoma](/uz/quick-reference)dagi qarorlar daraxtidan foydalaning. Tezkor ma'lumotnoma oxiridagi **Andozalar kombinatsiyalari** va **Umumiy xatolar** jadvallari afzallik va kamchiliklarni baholayotganda yoki boshqa birovning arxitekturasini ko'rib chiqayotganda juda foydali.

## 💡 Ushbu qo'llanmadan qanday foydalanish kerak

### Qaror qabul qilish uchun

1. [Tezkor ma'lumotnoma](/uz/quick-reference)ga o'ting
2. "Qarorlar daraxti" bo'limidan foydalaning
3. O'zingizga mos ssenariyni toping
4. Tavsiya etilgan andoza ustiga bosing

### Implementatsiya uchun

1. Andozaning umumiy ko'rinishini o'qing
2. U hal qiladigan muammoni tushunib oling
3. Kod misollarini o'rganing
4. Haqiqiy hayotiy misolni ko'rib chiqing
5. Afzallik va kamchiliklarini tekshiring

### Jamoaviy muhokamalar uchun

- Umumiy lug'at uchun andoza nomlariga murojaat qiling
- Maxsus andoza sahifalarini jamoangiz bilan baham ko'ring
- Kombinatsiyalarni muhokama qilish uchun "Bog'liq andozalar" bo'limidan foydalaning
- Tuzoqlardan qochish uchun "Umumiy xatolar"ni ko'rib chiqing

### Intervyuga tayyorgarlik ko'rish uchun

- Tezkor ma'lumotnomani muntazam ravishda ko'rib chiqing
- Har bir andozani tushuntirishni mashq qiling
- Kod misollarini o'rganing
- Har bir andozani qachon va nima uchun ishlatishni biling
- Andozalar o'rtasidagi munosabatlarni biling

## 🔍 Navigatsiya bo'yicha maslahatlar

### Qo'llanma ichida

- Barcha andozalarni ko'rish uchun **yon paneldan** foydalaning
- Bog'lanishlarni o'rganish uchun **Bog'liq andozalar** havolalarini bosing
- **Qidiruv funksiyasi**dan foydalaning (Mac-da Cmd+K, Windows-da Ctrl+K)
- Tezkor qidirish uchun **Tezkor ma'lumotnoma**ni tekshiring

### Andozalar o'rtasida o'tish

Har bir andoza sahifasi quyidagilarni o'z ichiga oladi:

- Bog'liq andozalarga havolalar
- Matndagi o'zaro havolalar
- Keyingi o'rganish uchun tavsiya etilgan andozalar bo'yicha takliflar

## 📊 Kontentning asosiy jihatlari

### Haqiqiy hayotiy misollar

Har bir andoza quyidagi kabi amaliy misollarni o'z ichiga oladi:

- Haqiqiy SQL ssenariylaridan foydalangan holda ma'lumotlar bazasi andozalari
- React/UI freymvorklari bilan UI andozalari
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
Tezkor ma'lumotnoma sahifasidan qaror qabul qilish vositasi sifatida foydalaning. Unda qarorlar daraxti, foydalanish holatlari va andoza kombinatsiyalari mavjud.
:::

### Umumiy ssenariylar

**"Menga obyektlarni samarali yaratish kerak"**
→ [Singleton](/uz/creational/singleton) | [Fabrika metodi](/uz/creational/factory-method) | [Quruvchi](/uz/creational/builder)

**"Menga hodisalarni boshqarish kerak"**
→ [Kuzatuvchi](/uz/behavioral/observer) | [Buyruq](/uz/behavioral/command) | [Mas'uliyatlar zanjiri](/uz/behavioral/chain-of-responsibility)

**"Menga ilovamni strukturasi kerak"**
→ [MVC](/uz/architectural/mvc) | [MVP](/uz/architectural/mvp) | [Repozitoriy](/uz/architectural/repository)

**"Menga parallellikni boshqarish kerak"**
→ [Ishlab chiqaruvchi–iste'molchi](/uz/architectural/producer-consumer) | [O'qish-yozish qulfi](/uz/architectural/read-write-lock)

## 📚 Resurslar

### Ushbu saytda

- **Asosiy sahifa** - Barcha 41 ta andozaning umumiy ko'rinishi
- **Tezkor ma'lumotnoma** - Qarorlar daraxti va jadvallar
- **Andoza sahifalari** - Har bir andozani chuqur o'rganish
- **Kod misollari** - Foydalanishga tayyor implementatsiyalar

### Tashqi resurslar

Ushbu qo'llanmani quyidagilar bilan to'ldirishni tavsiya etamiz:

- Gang of Four kitobi ("Design Patterns")
- Refactoring.Guru loyihalash andozalari bo'yicha qo'llanma
- IDE-ingizning o'rnatilgan hujjatlari
- Andoza implementatsiyalarini ko'rsatadigan GitHub repozitariylari

## 🤝 Hissa qo'shish

Agar siz quyidagilarni xohlasangiz:

- Ko'proq misollar qo'shish
- Yaxshilash bo'yicha takliflar berish
- Xatolar haqida xabar berish
- Yangi andozalar qo'shish

[Loyiha repozitariyasini](https://github.com) tekshiring yoki qo'llanma ma'murlari bilan bog'laning.

## ✅ O'rganish uchun nazorat ro'yxati

- [ ] Asosiy sahifani o'qing
- [ ] Tezkor ma'lumotnomani o'rganing
- [ ] 3-5 ta boshlang'ich andozalarni o'rganing
- [ ] Andozani amalga oshirishni mashq qiling
- [ ] Andozani boshqa birovga o'rgating
- [ ] Loyihada ikkita andozani birlashtiring
- [ ] Murakkab arxitektura andozalarini o'rganing
- [ ] O'z misollaringiz bilan hissa qo'shing

---

## 🧭 Andozalardan to'g'ri foydalanish haqida

Hujjatlar andozalarni aslidagidan ko'ra qat'iyroq qoidalardek ko'rsatishi mumkin. Andoza sahifasida bitta toza implementatsiya ko'rsatiladi, lekin real kod bazalari ancha chalkashroq bo'ladi — talablar bir-biriga zid keladi, eski (legacy) kod tanlovingizni cheklaydi va "darslikdagi" variant mos kelmasligi mumkin.

Maqsad — andozaning g'oyasi va tuzilishini uni moslashtira oladigan darajada yaxshi tushunish. Agar andoza murakkablikni kamaytirish o'rniga uni oshira boshlasa, to'g'ri qaror — soddalashtirish. Eng yaxshi muhandislar andozalarni tizimli ravishda emas, tanlab qo'llaydi.

---

## 🎉 Tadqiq qilishga tayyormisiz?

Umumiy ko'rinish uchun **[Asosiy sahifa](/uz/)**dan boshlang yoki o'zingizga kerakli andozani topish uchun **[Tezkor ma'lumotnoma](/uz/quick-reference)**ga o'ting.

O'rganishda omad yor bo'lsin! 🚀

### Professional maslahatlar

1. **Tezkor ma'lumotnomani xatcho'pga qo'shib qo'ying** - Undan tez-tez foydalanasiz
2. **Kod misollarini bir necha bor o'qing** - Tushunish uchun vaqt va amaliyot kerak
3. **Andozalarni kichik loyihalarda qo'llang** - Amaliyot orqali o'rganish eng yaxshisidir
4. **Andozalarni birlashtiring** - Haqiqiy ilovalar bir nechta andozalardan foydalanadi
5. **Boshqalar bilan muhokama qiling** - Boshqalarga o'rgatish sizga o'rganishga yordam beradi

---

**Yordam kerakmi?** Tezkor ma'lumotnomani tekshiring yoki Cmd+K (Mac) yoki Ctrl+K (Windows) tugmalaridan foydalanib kalit so'zlar orqali qidiring.
