---
title: Tezkor ma'lumotnoma
description: Barcha 41 ta dizayn namunasi uchun jadvallar, qarorlar daraxti va namunalar kombinatsiyalari.
icon: BookMarked
---

# Tezkor ma'lumotnoma

<CoverImage src="/covers/getting-started/quick-reference.webp" alt="Cover">
  <h1>Tezkor ma'lumotnoma</h1>
  <p>Ulkan va ozoda boshqaruv paneli: unda har biri dizayn namunasini ifodalovchi kichik grafik belgiga ega, ranglar bo'yicha ajratilgan yorqin tugmalar chiroyli qatorlashgan, kichkina operator robot esa quvonch bilan slayderni surmoqda.</p>
</CoverImage>

Ushbu hujjatdagi barcha 41 ta namuna uchun qisqacha ma'lumotnoma. Nima kerakligini bilsangiz-u, qaysi namuna mos kelishini bilmasangiz, qarorlar daraxtidan foydalaning. Variantlarni yonma-yon solishtirmoqchi bo'lsangiz, jadvallardan foydalaning.

## Yaratuvchi namunalar (Creational)

| Namuna               | Maqsadi                                         | Eng mos holatlar                              |
| -------------------- | ----------------------------------------------- | --------------------------------------------- |
| **Singleton**        | Global kirishga ega yagona nusxa                | Loggerlar, konfiguratsiyalar, DB ulanishlari  |
| **Factory Method**   | Aniq klassni ko'rsatmasdan obyekt yaratish      | Hujjat turlari, to'lov usullari               |
| **Abstract Factory** | Bog'liq obyektlar oilalari                      | UI mavzulari, bir nechta ma'lumotlar bazasini qo'llab-quvvatlash |
| **Builder**          | Obyektni bosqichma-bosqich qurish               | Murakkab obyektlar, fluent APIlar             |
| **Prototype**        | Mavjud obyektlarni klonlash                     | Hujjat shablonlari, konfiguratsiya nusxalari  |
| **Object Pool**      | Qimmat obyektlarni qayta ishlatish              | DB ulanishlari, oqimlar (thread) pullari      |

## Strukturaviy namunalar (Structural)

| Namuna        | Maqsadi                                                       | Eng mos holatlar                                  |
| ------------- | ------------------------------------------------------------- | ------------------------------------------------- |
| **Adapter**   | Mos kelmaydigan interfeyslarni o'zgartirish                   | Uchinchi tomon APIlari, eski (legacy) integratsiyalar |
| **Bridge**    | Abstraksiyani implementatsiyadan ajratish                     | Grafika renderlash, kross-platforma drayverlari   |
| **Composite** | Yakka obyektlar va ularning tarkiblariga bir xil munosabat    | Fayl tizimlari, UI komponentlar daraxti           |
| **Decorator** | Ish vaqtida obyektlarga mas'uliyat qo'shish                   | Middleware zanjirlari, ma'lumotlar oqimlari       |
| **Facade**    | Murakkab quyi tizimni yagona interfeys ortiga yashirish       | SDK o'ramlari, uy avtomatizatsiyasi APIlari       |
| **Flyweight** | Ko'plab mayda obyektlar o'rtasida umumiy holatni ulashish     | Matn muharrirlari, zarrachalar tizimlari          |
| **Proxy**     | Boshqa obyektga kirishni nazorat qilish                       | Keshlash, kechiktirilgan yuklash, kirish nazorati |

## Xulq-atvor namunalari (Behavioral)

| Namuna                      | Maqsadi                                                                   | Eng mos holatlar                                |
| --------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------- |
| **Chain of Responsibility** | So'rovni ishlov beruvchilardan biri qayta ishlamaguncha zanjir bo'ylab uzatish | Middleware, logging zanjirlari             |
| **Command**                 | So'rovni obyekt sifatida inkapsulyatsiya qilish                           | Undo/redo, vazifalar navbati, makroslar         |
| **Interpreter**             | Grammatikani belgilash va baholash                                        | Ifoda parserlari, DSLlar                        |
| **Iterator**                | Ichki tuzilmani oshkor qilmasdan elementlarga ketma-ket kirish            | Maxsus to'plamlar, dangasa (lazy) ketma-ketliklar |
| **Mediator**                | Obyektlar o'rtasidagi muloqotni markazlashtirish                          | Dialog oynalari, chat tizimlari                 |
| **Memento**                 | Obyektning ichki holatini saqlash va tiklash                              | Undo/redo, saqlash nuqtalari                    |
| **Null Object**             | null tekshiruvlarini yo'qotish uchun hech narsa qilmaydigan standart obyekt | Zaxira (fallback) handlerlar, test stublari   |
| **Observer**                | Obyekt o'zgarganda unga bog'liqlarni avtomatik xabardor qilish            | Hodisa tizimlari, data binding                  |
| **State**                   | Ichki holat o'zgarganda obyekt xulq-atvorini o'zgartirish                 | Ish jarayoni dvigatellari, UI holat mashinalari |
| **Strategy**                | O'zaro almashtiriladigan algoritmlar oilasini belgilash                   | Saralash, siqish, autentifikatsiya              |
| **Template Method**         | Algoritm skeletini belgilash; qadamlarni subklasslarga qoldirish          | Freymvorklar, ma'lumotlarni qayta ishlash zanjirlari |
| **Visitor**                 | Klasslarni o'zgartirmasdan obyektlarga operatsiyalar qo'shish             | AST bo'ylab yurish, hisobotlar yaratish         |

## Arxitektura namunalari (Architectural)

| Namuna                   | Maqsadi                                                                   | Eng mos holatlar                                  |
| ------------------------ | ------------------------------------------------------------------------- | ------------------------------------------------- |
| **MVC**                  | Model, view va controllerni ajratish                                      | Veb-ilovalar, ish stoli ilovalari                 |
| **MVP**                  | Presenter view va model o'rtasida vositachilik qiladi                     | Testlarga boy UI, murakkab view mantig'i          |
| **MVVM**                 | UI-ni reaktiv view modelga deklarativ bog'lash                            | Data-binding freymvorklari, reaktiv ilovalar      |
| **MVT**                  | Model-View-Template (MVC ning Django varianti)                             | Django ilovalari                                  |
| **Repository**           | Ma'lumotlarga kirishni to'plamsimon interfeys ortiga abstraksiyalash      | Har qanday ma'lumot saqlash qatlami               |
| **Active Record**        | Ma'lumotlar bazasi qatorini to'g'ridan-to'g'ri domen obyektiga bog'lash   | Oddiy CRUD operatsiyalari                         |
| **Data Mapper**          | Domen obyektlarini ma'lumotlar bazasi sxemasidan to'liq mustaqil saqlash  | Murakkab obyekt-relyatsion xaritalash             |
| **Identity Map**         | Takroriy o'qishlarning oldini olish uchun yuklangan obyektlarni keshlash  | ORM ichki tuzilmasi, unit-of-work ssenariylari    |
| **Unit of Work**         | Domen obyektlaridagi o'zgarishlarni kuzatish va ularni atomar saqlash     | Bir nechta obyektni qamrovchi murakkab tranzaksiyalar |
| **CQRS**                 | O'qish va yozish modellarini ajratish                                     | Yuqori yuklamali o'qishlar, hodisaga asoslangan tizimlar |
| **Event Sourcing**       | Holatni faqat qo'shib boriladigan hodisalar ketma-ketligi sifatida saqlash | Audit jurnallari, vaqt bo'yicha so'rovlar        |
| **Dependency Injection** | Bog'liqliklarni ichkarida yaratish o'rniga tashqaridan uzatish            | Testlanadigan kod, kuchsiz bog'langan servislar   |
| **Service Locator**      | Bog'liqliklarni markaziy registrdan olish                                 | Plagin tizimlari, eski kodga DI joriy qilish      |
| **Producer-Consumer**    | Ish yaratish va uni qayta ishlashni umumiy navbat orqali ajratish         | Xabar brokerlari, ma'lumotlar zanjirlari          |
| **Scheduler**            | Oqimlar umumiy resurslarga qachon va qanday kirishini boshqarish          | Oqimlarni sinxronlash, tezligi cheklangan vazifalar |
| **Read-Write Lock**      | Bir vaqtda o'qishga ruxsat berish; yozishni navbatma-navbat bajarish      | O'qish ko'p bo'lgan keshlar, konfiguratsiya omborlari |

---

## Qarorlar daraxti

### Obyektlar yaratish

| Ehtiyoj                                              | Namuna           |
| ---------------------------------------------------- | ---------------- |
| Global ulashiladigan bitta nusxa                     | Singleton        |
| Ish vaqtida aniqlanadigan turli turlar               | Factory Method   |
| Bog'liq turlar oilalari                              | Abstract Factory |
| Ko'plab ixtiyoriy qismlarga ega murakkab qurilish    | Builder          |
| Mavjud obyektning arzon nusxalari                    | Prototype        |
| Yaratilishi qimmat obyektlarni qayta ishlatish       | Object Pool      |

### Mavjud obyektlarni moslashtirish yoki birlashtirish

| Ehtiyoj                                                   | Namuna    |
| --------------------------------------------------------- | --------- |
| Mos kelmaydigan interfeyslarni ulash                      | Adapter   |
| Implementatsiyalarni abstraksiyadan mustaqil almashtirish | Bridge    |
| Alohida elementlar va guruhlarga bir xil munosabat        | Composite |
| Subklass yaratmasdan xulq-atvor qo'shish                  | Decorator |
| Murakkab quyi tizimni yashirish                           | Facade    |
| Xotirani ko'p egallaydigan umumiy holatni ulashish        | Flyweight |
| Obyektga kirishni nazorat qilish yoki ushlab qolish       | Proxy     |

### Hodisalar va muloqotni boshqarish

| Ehtiyoj                                                 | Namuna                  |
| ------------------------------------------------------- | ----------------------- |
| Bittasi o'zgarganda ko'plab obyektlarni xabardor qilish | Observer                |
| So'rovni tartiblangan handlerlar orqali o'tkazish       | Chain of Responsibility |
| Ko'pdan-ko'pga muloqotni ajratish                       | Mediator                |
| So'rovni keyinroq bajarish uchun inkapsulyatsiya qilish | Command                 |

### Holat va xulq-atvorni boshqarish

| Ehtiyoj                                                          | Namuna          |
| ---------------------------------------------------------------- | --------------- |
| Ichki holatga qarab turlicha xulq-atvor                          | State           |
| Ish vaqtida algoritmlarni almashtirish                           | Strategy        |
| Moslashuvchan qadamlarga ega qat'iy algoritm tuzilmasini saqlash | Template Method |
| Obyekt holatini saqlash va tiklash                               | Memento         |

### Ilovani tuzish

| Ehtiyoj                                                | Namuna         |
| ------------------------------------------------------ | -------------- |
| Standart veb yoki ish stoli ilovasi                    | MVC            |
| Yuqori darajada testlanadigan UI                       | MVP            |
| Reaktiv/data-binding frontend                          | MVVM           |
| Django ilovasi                                         | MVT            |
| Ma'lumotlar bazasiga kirishni ajratib qo'yish          | Repository     |
| ActiveRecord uslubidagi oddiy saqlash                  | Active Record  |
| Sxemadan mustaqil domen obyektlari                     | Data Mapper    |
| Bir nechta obyektli murakkab tranzaksiyalarni boshqarish | Unit of Work |
| O'qish va yozish vazifalarini ajratish                 | CQRS           |
| Hodisalarning to'liq tarixi va vaqt bo'ylab qaytish    | Event Sourcing |

### Parallellik va resurslarni boshqarish

| Ehtiyoj                                                      | Namuna            |
| ------------------------------------------------------------ | ----------------- |
| Ishlab chiqaruvchilar va iste'molchilarni ajratish           | Producer-Consumer |
| Oqimlarning umumiy resurslarga kirishini rejalashtirish      | Scheduler         |
| O'qishda parallellikni oshirish, yozishni navbatma-navbat bajarish | Read-Write Lock |

---

## Namunalar kombinatsiyalari

Ba'zi namunalar tabiatan bir-birini to'ldiradi va real tizimlarda tez-tez birga uchraydi.

| Kombinatsiya                                      | Nima uchun birga yaxshi ishlaydi                                                                          |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Repository + Unit of Work + Identity Map          | To'liq saqlash qatlami: abstrakt kirish, yozuvlarni guruhlab saqlash, takroriy yuklashlarning oldini olish |
| Factory Method + Template Method                  | Factory _nimani_ yaratishni belgilaydi; template esa undan _qanday_ foydalanishni belgilaydi              |
| Abstract Factory + Factory Method                 | Abstract Factory oiladagi har bir mahsulotni yaratish uchun Factory Methodlardan foydalanadi              |
| MVC + Observer + Strategy                         | View model o'zgarishlarini kuzatadi; controller xulq-atvorni strategiya orqali delegatsiya qiladi         |
| Dependency Injection + Singleton + Factory Method | DI komponentlarni bir-biriga ulaydi; Singleton umumiy nusxalarni boshqaradi; Factory yaratish bilan shug'ullanadi |
| CQRS + Event Sourcing                             | Tabiiy uyg'unlik: buyruqlar hodisalar hosil qiladi, so'rovlar proyeksiyalarni o'qiydi                     |
| Composite + Iterator + Visitor                    | Composite daraxt bo'ylab iterator bilan yuriladi; operatsiyalar visitor bilan qo'llanadi                  |
| Decorator + Strategy                              | Decoratorlar strukturaviy qatlamlar qo'shadi; Strategy algoritmik xulq-atvorni almashtiradi               |

### Foydalanish holatlari bo'yicha

**Yuqori samaradorlik / keshlash:** Object Pool, Flyweight, Identity Map, Proxy (keshlash varianti), Read-Write Lock

**Testlash va qo'llab-quvvatlash:** Dependency Injection, Strategy, Template Method, Null Object

**Murakkab biznes mantig'i:** State, Chain of Responsibility, Mediator, Visitor

**Ma'lumotlarni qayta ishlash:** Iterator, Composite, Visitor, Pipeline (Producer-Consumer), Unit of Work

**Foydalanuvchi interfeysi (UI):** Observer, Command, Memento (undo/redo), State, MVC / MVP / MVVM

---

## Unumdorlik bo'yicha eslatmalar

**Qo'shimcha xarajat keltirishi mumkin bo'lgan namunalar:**

- **Prototype** — katta obyektlar grafigini chuqur klonlash qimmatga tushishi mumkin
- **Composite** — rekursiv daraxt bo'ylab yurish chaqiruvlar stekini chuqurlashtiradi
- **Visitor** — murakkab operatsiyalar uchun bir necha marta aylanib chiqish talab qilinishi mumkin
- **Read-Write Lock** — qulfni olish kechikishga ega; foyda beradi deb taxmin qilishdan oldin profiling qiling

**Odatda yengil namunalar:**

- Singleton, Strategy, Decorator, Null Object — joriy qilingandan so'ng minimal bilvositalik
- Proxy — dangasa yuklash qimmat initsializatsiyani ishga tushirmasa, sezilarsiz

---

## Testlash bo'yicha eslatmalar

**Testlash osonroq:**

- Strategy, Template Method, Dependency Injection, Factory Method — bog'liqliklar aniq ko'rinadi va almashtirilishi mumkin

**Testlash qiyinroq:**

- Singleton — global holat testlarni bir-biriga bog'lab qo'yadi; to'g'ridan-to'g'ri murojaat o'rniga DI ni afzal ko'ring
- Service Locator — bog'liqliklarni yashiradi, bu esa testlarni mo'rt qiladi
- Statik factory metodlar — qo'shimcha vositalarsiz ularni qayta aniqlab (override) yoki mock qilib bo'lmaydi

---

## Umumiy xatolar

| Namuna         | Umumiy xato                                                           | Yaxshiroq yondashuv                                                                     |
| -------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Singleton      | Global holat sifatida ishlatilib, yashirin bog'liqlik yuzaga keladi   | Uni bog'liqlik sifatida inject qiling                                                   |
| Observer       | Obunalar tozalanmaydi, natijada xotira sizib chiqadi                  | Har doim obunani bekor qilish mexanizmini taqdim eting va uni chaqiring                 |
| Composite      | Faqat bargga (leaf) xos operatsiyalar bazaviy interfeysga kiritiladi  | Interfeysni minimal saqlang; barg xulq-atvorini subklasslarda boshqaring                |
| Decorator      | Bezash tartibi yashirin bog'liqliklarni keltirib chiqaradi            | Iloji boricha decoratorlarni tartibga bog'liq bo'lmaydigan qilib loyihalang             |
| Factory Method | Factory yarata oladigan turlar ro'yxatini qattiq kodlab qo'yadi       | Turlarni dinamik bog'lash uchun registr yoki konfiguratsiyadan foydalaning              |
| Strategy       | Arzimas farqlar uchun strategiya klasslari ko'payib ketadi            | Oddiy holatlar uchun lambda yoki closure, murakkablari uchun klasslardan foydalaning    |
| State          | Shartlar ko'paygani sari holatlar soni portlab ketadi                 | Bog'liq holat o'tishlarini guruhlang; holatlar jadvalini ko'rib chiqing                 |
| CQRS           | Hech qanday foyda bermaydigan oddiy CRUD ga qo'llanadi                | CQRS ni o'qish va yozish murakkabligi haqiqatan ham nosimmetrik bo'lgan domenlar uchun saqlang |

---

::: tip
Namunalar talab emas, balki vositadir. Agar oddiyroq yechim tushunarli va qo'llab-quvvatlash oson bo'lsa, o'shandan foydalaning.
:::
