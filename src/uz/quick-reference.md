---
title: Tezkor ma'lumotnoma
description: Barcha 41 ta loyihalash andozasi uchun jadvallar, qarorlar daraxti va andozalar kombinatsiyalari.
icon: BookMarked
---

# Tezkor ma'lumotnoma

<CoverImage src="/covers/getting-started/quick-reference.webp" alt="Cover">
  <h1>Tezkor ma'lumotnoma</h1>
  <p>Ulkan va ozoda boshqaruv paneli: unda har biri loyihalash andozasini ifodalovchi kichik grafik belgiga ega, ranglar bo'yicha ajratilgan yorqin tugmalar chiroyli qatorlashgan, kichkina operator robot esa quvonch bilan slayderni surmoqda.</p>
</CoverImage>

Ushbu hujjatdagi barcha 41 ta andoza uchun qisqacha ma'lumotnoma. Nima kerakligini bilsangiz-u, qaysi andoza mos kelishini bilmasangiz, qarorlar daraxtidan foydalaning. Variantlarni yonma-yon solishtirmoqchi bo'lsangiz, jadvallardan foydalaning.

## Yaratuvchi andozalar (Creational)

| Andoza               | Maqsadi                                         | Eng mos holatlar                              |
| -------------------- | ----------------------------------------------- | --------------------------------------------- |
| **Singleton**        | Global kirishga ega yagona nusxa                | Loggerlar, konfiguratsiyalar, DB ulanishlari  |
| **Fabrika metodi** (Factory Method)   | Aniq klassni ko'rsatmasdan obyekt yaratish      | Hujjat turlari, to'lov usullari               |
| **Abstrakt fabrika** (Abstract Factory) | Bog'liq obyektlar oilalari                      | UI mavzulari, bir nechta ma'lumotlar bazasini qo'llab-quvvatlash |
| **Quruvchi** (Builder)          | Obyektni bosqichma-bosqich qurish               | Murakkab obyektlar, fluent APIlar             |
| **Prototip** (Prototype)        | Mavjud obyektlarni klonlash                     | Hujjat shablonlari, konfiguratsiya nusxalari  |
| **Obyektlar havzasi** (Object Pool)      | Qimmat obyektlarni qayta ishlatish              | DB ulanishlari, oqimlar (thread) pullari      |

## Tuzilmaviy andozalar (Structural)

| Andoza        | Maqsadi                                                       | Eng mos holatlar                                  |
| ------------- | ------------------------------------------------------------- | ------------------------------------------------- |
| **Adapter**   | Mos kelmaydigan interfeyslarni o'zgartirish                   | Uchinchi tomon APIlari, eski (legacy) integratsiyalar |
| **Ko'prik** (Bridge)    | Abstraksiyani implementatsiyadan ajratish                     | Grafika renderlash, kross-platforma drayverlari   |
| **Kompozit** (Composite) | Yakka obyektlar va ularning tarkiblariga bir xil munosabat    | Fayl tizimlari, UI komponentlar daraxti           |
| **Dekorator** (Decorator) | Ish vaqtida obyektlarga mas'uliyat qo'shish                   | Middleware zanjirlari, ma'lumotlar oqimlari       |
| **Fasad** (Facade)    | Murakkab quyi tizimni yagona interfeys ortiga yashirish       | SDK o'ramlari, uy avtomatizatsiyasi APIlari       |
| **Yengilvazn** (Flyweight) | Ko'plab mayda obyektlar o'rtasida umumiy holatni ulashish     | Matn muharrirlari, zarrachalar tizimlari          |
| **O'rinbosar** (Proxy)     | Boshqa obyektga kirishni nazorat qilish                       | Keshlash, kechiktirilgan yuklash, kirish nazorati |

## Xulq-atvor andozalari (Behavioral)

| Andoza                      | Maqsadi                                                                   | Eng mos holatlar                                |
| --------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------- |
| **Mas'uliyatlar zanjiri** (Chain of Responsibility) | So'rovni ishlov beruvchilardan biri qayta ishlamaguncha zanjir bo'ylab uzatish | Middleware, logging zanjirlari             |
| **Buyruq** (Command)                 | So'rovni obyekt sifatida inkapsulyatsiya qilish                           | Undo/redo, vazifalar navbati, makroslar         |
| **Interpretator** (Interpreter)             | Grammatikani belgilash va baholash                                        | Ifoda parserlari, DSLlar                        |
| **Iterator**                | Ichki tuzilmani oshkor qilmasdan elementlarga ketma-ket kirish            | Maxsus to'plamlar, dangasa (lazy) ketma-ketliklar |
| **Vositachi** (Mediator)                | Obyektlar o'rtasidagi muloqotni markazlashtirish                          | Dialog oynalari, chat tizimlari                 |
| **Memento**                 | Obyektning ichki holatini saqlash va tiklash                              | Undo/redo, saqlash nuqtalari                    |
| **Bo'sh obyekt** (Null Object)             | null tekshiruvlarini yo'qotish uchun hech narsa qilmaydigan standart obyekt | Zaxira (fallback) handlerlar, test stublari   |
| **Kuzatuvchi** (Observer)                | Obyekt o'zgarganda unga bog'liqlarni avtomatik xabardor qilish            | Hodisa tizimlari, data binding                  |
| **Holat** (State)                   | Ichki holat o'zgarganda obyekt xulq-atvorini o'zgartirish                 | Ish jarayoni dvigatellari, UI holat mashinalari |
| **Strategiya** (Strategy)                | O'zaro almashtiriladigan algoritmlar oilasini belgilash                   | Saralash, siqish, autentifikatsiya              |
| **Shablon metod** (Template Method)         | Algoritm skeletini belgilash; qadamlarni subklasslarga qoldirish          | Freymvorklar, ma'lumotlarni qayta ishlash zanjirlari |
| **Tashrifchi** (Visitor)                 | Klasslarni o'zgartirmasdan obyektlarga operatsiyalar qo'shish             | AST bo'ylab yurish, hisobotlar yaratish         |

## Arxitektura andozalari (Architectural)

| Andoza                   | Maqsadi                                                                   | Eng mos holatlar                                  |
| ------------------------ | ------------------------------------------------------------------------- | ------------------------------------------------- |
| **MVC**                  | Model, view va controllerni ajratish                                      | Veb-ilovalar, ish stoli ilovalari                 |
| **MVP**                  | Presenter view va model o'rtasida vositachilik qiladi                     | Testlarga boy UI, murakkab view mantig'i          |
| **MVVM**                 | UI-ni reaktiv view modelga deklarativ bog'lash                            | Data-binding freymvorklari, reaktiv ilovalar      |
| **MVT**                  | Model-View-Template (MVC ning Django varianti)                             | Django ilovalari                                  |
| **Repozitoriy** (Repository)           | Ma'lumotlarga kirishni to'plamsimon interfeys ortiga abstraksiyalash      | Har qanday ma'lumot saqlash qatlami               |
| **Active Record**        | Ma'lumotlar bazasi qatorini to'g'ridan-to'g'ri domen obyektiga bog'lash   | Oddiy CRUD operatsiyalari                         |
| **Data Mapper**          | Domen obyektlarini ma'lumotlar bazasi sxemasidan to'liq mustaqil saqlash  | Murakkab obyekt-relyatsion xaritalash             |
| **Identifikatorlar xaritasi** (Identity Map)         | Takroriy o'qishlarning oldini olish uchun yuklangan obyektlarni keshlash  | ORM ichki tuzilmasi, unit-of-work ssenariylari    |
| **Ish birligi** (Unit of Work)         | Domen obyektlaridagi o'zgarishlarni kuzatish va ularni atomar saqlash     | Bir nechta obyektni qamrovchi murakkab tranzaksiyalar |
| **CQRS**                 | O'qish va yozish modellarini ajratish                                     | Yuqori yuklamali o'qishlar, hodisaga asoslangan tizimlar |
| **Event Sourcing**       | Holatni faqat qo'shib boriladigan hodisalar ketma-ketligi sifatida saqlash | Audit jurnallari, vaqt bo'yicha so'rovlar        |
| **Bog'liqliklarni kiritish** (Dependency Injection) | Bog'liqliklarni ichkarida yaratish o'rniga tashqaridan uzatish            | Testlanadigan kod, kuchsiz bog'langan servislar   |
| **Servis lokatori** (Service Locator)      | Bog'liqliklarni markaziy registrdan olish                                 | Plagin tizimlari, eski kodga DI joriy qilish      |
| **Ishlab chiqaruvchi–iste'molchi** (Producer-Consumer)    | Ish yaratish va uni qayta ishlashni umumiy navbat orqali ajratish         | Xabar brokerlari, ma'lumotlar zanjirlari          |
| **Rejalashtiruvchi** (Scheduler)            | Oqimlar umumiy resurslarga qachon va qanday kirishini boshqarish          | Oqimlarni sinxronlash, tezligi cheklangan vazifalar |
| **O'qish-yozish qulfi** (Read-Write Lock)      | Bir vaqtda o'qishga ruxsat berish; yozishni navbatma-navbat bajarish      | O'qish ko'p bo'lgan keshlar, konfiguratsiya omborlari |

---

## Qarorlar daraxti

### Obyektlar yaratish

| Ehtiyoj                                              | Andoza           |
| ---------------------------------------------------- | ---------------- |
| Global ulashiladigan bitta nusxa                     | Singleton        |
| Ish vaqtida aniqlanadigan turli turlar               | Fabrika metodi   |
| Bog'liq turlar oilalari                              | Abstrakt fabrika |
| Ko'plab ixtiyoriy qismlarga ega murakkab qurilish    | Quruvchi          |
| Mavjud obyektning arzon nusxalari                    | Prototip        |
| Yaratilishi qimmat obyektlarni qayta ishlatish       | Obyektlar havzasi      |

### Mavjud obyektlarni moslashtirish yoki birlashtirish

| Ehtiyoj                                                   | Andoza    |
| --------------------------------------------------------- | --------- |
| Mos kelmaydigan interfeyslarni ulash                      | Adapter   |
| Implementatsiyalarni abstraksiyadan mustaqil almashtirish | Ko'prik    |
| Alohida elementlar va guruhlarga bir xil munosabat        | Kompozit |
| Subklass yaratmasdan xulq-atvor qo'shish                  | Dekorator |
| Murakkab quyi tizimni yashirish                           | Fasad    |
| Xotirani ko'p egallaydigan umumiy holatni ulashish        | Yengilvazn |
| Obyektga kirishni nazorat qilish yoki ushlab qolish       | O'rinbosar     |

### Hodisalar va muloqotni boshqarish

| Ehtiyoj                                                 | Andoza                  |
| ------------------------------------------------------- | ----------------------- |
| Bittasi o'zgarganda ko'plab obyektlarni xabardor qilish | Kuzatuvchi                |
| So'rovni tartiblangan handlerlar orqali o'tkazish       | Mas'uliyatlar zanjiri |
| Ko'pdan-ko'pga muloqotni ajratish                       | Vositachi                |
| So'rovni keyinroq bajarish uchun inkapsulyatsiya qilish | Buyruq                 |

### Holat va xulq-atvorni boshqarish

| Ehtiyoj                                                          | Andoza          |
| ---------------------------------------------------------------- | --------------- |
| Ichki holatga qarab turlicha xulq-atvor                          | Holat           |
| Ish vaqtida algoritmlarni almashtirish                           | Strategiya        |
| Moslashuvchan qadamlarga ega qat'iy algoritm tuzilmasini saqlash | Shablon metod |
| Obyekt holatini saqlash va tiklash                               | Memento         |

### Ilovani tuzish

| Ehtiyoj                                                | Andoza         |
| ------------------------------------------------------ | -------------- |
| Standart veb yoki ish stoli ilovasi                    | MVC            |
| Yuqori darajada testlanadigan UI                       | MVP            |
| Reaktiv/data-binding frontend                          | MVVM           |
| Django ilovasi                                         | MVT            |
| Ma'lumotlar bazasiga kirishni ajratib qo'yish          | Repozitoriy     |
| ActiveRecord uslubidagi oddiy saqlash                  | Active Record  |
| Sxemadan mustaqil domen obyektlari                     | Data Mapper    |
| Bir nechta obyektli murakkab tranzaksiyalarni boshqarish | Ish birligi |
| O'qish va yozish vazifalarini ajratish                 | CQRS           |
| Hodisalarning to'liq tarixi va vaqt bo'ylab qaytish    | Event Sourcing |

### Parallellik va resurslarni boshqarish

| Ehtiyoj                                                      | Andoza            |
| ------------------------------------------------------------ | ----------------- |
| Ishlab chiqaruvchilar va iste'molchilarni ajratish           | Ishlab chiqaruvchi–iste'molchi |
| Oqimlarning umumiy resurslarga kirishini rejalashtirish      | Rejalashtiruvchi         |
| O'qishda parallellikni oshirish, yozishni navbatma-navbat bajarish | O'qish-yozish qulfi |

---

## Andozalar kombinatsiyalari

Ba'zi andozalar tabiatan bir-birini to'ldiradi va real tizimlarda tez-tez birga uchraydi.

| Kombinatsiya                                      | Nima uchun birga yaxshi ishlaydi                                                                          |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Repozitoriy + Ish birligi + Identifikatorlar xaritasi          | To'liq saqlash qatlami: abstrakt kirish, yozuvlarni guruhlab saqlash, takroriy yuklashlarning oldini olish |
| Fabrika metodi + Shablon metod                  | Fabrika _nimani_ yaratishni belgilaydi; shablon metod esa undan _qanday_ foydalanishni belgilaydi              |
| Abstrakt fabrika + Fabrika metodi                 | Abstrakt fabrika oiladagi har bir mahsulotni yaratish uchun fabrika metodlaridan foydalanadi              |
| MVC + Kuzatuvchi + Strategiya                         | View model o'zgarishlarini kuzatadi; controller xulq-atvorni strategiya orqali delegatsiya qiladi         |
| Bog'liqliklarni kiritish + Singleton + Fabrika metodi | DI komponentlarni bir-biriga ulaydi; Singleton umumiy nusxalarni boshqaradi; Fabrika yaratish bilan shug'ullanadi |
| CQRS + Event Sourcing                             | Tabiiy uyg'unlik: buyruqlar hodisalar hosil qiladi, so'rovlar proyeksiyalarni o'qiydi                     |
| Kompozit + Iterator + Tashrifchi                    | Kompozit daraxt bo'ylab iterator bilan yuriladi; operatsiyalar tashrifchi bilan qo'llanadi                  |
| Dekorator + Strategiya                              | Dekoratorlar tuzilmaviy qatlamlar qo'shadi; Strategiya algoritmik xulq-atvorni almashtiradi               |

### Foydalanish holatlari bo'yicha

**Yuqori samaradorlik / keshlash:** Obyektlar havzasi, Yengilvazn, Identifikatorlar xaritasi, O'rinbosar (keshlash varianti), O'qish-yozish qulfi

**Testlash va qo'llab-quvvatlash:** Bog'liqliklarni kiritish, Strategiya, Shablon metod, Bo'sh obyekt

**Murakkab biznes mantig'i:** Holat, Mas'uliyatlar zanjiri, Vositachi, Tashrifchi

**Ma'lumotlarni qayta ishlash:** Iterator, Kompozit, Tashrifchi, Pipeline (Ishlab chiqaruvchi–iste'molchi), Ish birligi

**Foydalanuvchi interfeysi (UI):** Kuzatuvchi, Buyruq, Memento (undo/redo), Holat, MVC / MVP / MVVM

---

## Unumdorlik bo'yicha eslatmalar

**Qo'shimcha xarajat keltirishi mumkin bo'lgan andozalar:**

- **Prototip** — katta obyektlar grafigini chuqur klonlash qimmatga tushishi mumkin
- **Kompozit** — rekursiv daraxt bo'ylab yurish chaqiruvlar stekini chuqurlashtiradi
- **Tashrifchi** — murakkab operatsiyalar uchun bir necha marta aylanib chiqish talab qilinishi mumkin
- **O'qish-yozish qulfi** — qulfni olish kechikishga ega; foyda beradi deb taxmin qilishdan oldin profiling qiling

**Odatda yengil andozalar:**

- Singleton, Strategiya, Dekorator, Bo'sh obyekt — joriy qilingandan so'ng minimal bilvositalik
- O'rinbosar — dangasa yuklash qimmat initsializatsiyani ishga tushirmasa, sezilarsiz

---

## Testlash bo'yicha eslatmalar

**Testlash osonroq:**

- Strategiya, Shablon metod, Bog'liqliklarni kiritish, Fabrika metodi — bog'liqliklar aniq ko'rinadi va almashtirilishi mumkin

**Testlash qiyinroq:**

- Singleton — global holat testlarni bir-biriga bog'lab qo'yadi; to'g'ridan-to'g'ri murojaat o'rniga DI ni afzal ko'ring
- Servis lokatori — bog'liqliklarni yashiradi, bu esa testlarni mo'rt qiladi
- Statik fabrika metodlari — qo'shimcha vositalarsiz ularni qayta aniqlab (override) yoki mock qilib bo'lmaydi

---

## Umumiy xatolar

| Andoza         | Umumiy xato                                                           | Yaxshiroq yondashuv                                                                     |
| -------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Singleton      | Global holat sifatida ishlatilib, yashirin bog'liqlik yuzaga keladi   | Uni bog'liqlik sifatida inject qiling                                                   |
| Kuzatuvchi       | Obunalar tozalanmaydi, natijada xotira sizib chiqadi                  | Har doim obunani bekor qilish mexanizmini taqdim eting va uni chaqiring                 |
| Kompozit      | Faqat bargga (leaf) xos operatsiyalar bazaviy interfeysga kiritiladi  | Interfeysni minimal saqlang; barg xulq-atvorini subklasslarda boshqaring                |
| Dekorator      | Bezash tartibi yashirin bog'liqliklarni keltirib chiqaradi            | Iloji boricha dekoratorlarni tartibga bog'liq bo'lmaydigan qilib loyihalang             |
| Fabrika metodi | Fabrika yarata oladigan turlar ro'yxatini qattiq kodlab qo'yadi       | Turlarni dinamik bog'lash uchun registr yoki konfiguratsiyadan foydalaning              |
| Strategiya       | Arzimas farqlar uchun strategiya klasslari ko'payib ketadi            | Oddiy holatlar uchun lambda yoki closure, murakkablari uchun klasslardan foydalaning    |
| Holat          | Shartlar ko'paygani sari holatlar soni portlab ketadi                 | Bog'liq holat o'tishlarini guruhlang; holatlar jadvalini ko'rib chiqing                 |
| CQRS           | Hech qanday foyda bermaydigan oddiy CRUD ga qo'llanadi                | CQRS ni o'qish va yozish murakkabligi haqiqatan ham nosimmetrik bo'lgan domenlar uchun saqlang |

---

::: tip
Andozalar talab emas, balki vositadir. Agar oddiyroq yechim tushunarli va qo'llab-quvvatlash oson bo'lsa, o'shandan foydalaning.
:::
