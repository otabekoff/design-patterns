---
title: Dasturlashda loyihalash andozalari
description: Dasturiy ta'minotni ishlab chiqishda qo'llaniladigan loyihalash andozalari bo'yicha to'liq qo'llanma.
icon: Palette
---

# Dasturlashda loyihalash andozalari

<CoverImage src="/covers/getting-started/introduction.webp" alt="Cover">
  <h1>Kirish</h1>
  <p>Ulkan, yorqin "Hello World" qo'llanmasini ushlab olgan jajji, yoqimtoy oq robot futuristik geometrik me'morchilikdan iborat go'zal, jilvalanuvchi labirintning ulug'vor tosh darvozasi oldida hayajon bilan turibdi.</p>
</CoverImage>

Loyihalash andozalari (Design Patterns) — dasturiy ta'minotni loyihalashda ko'p uchraydigan muammolarning qayta ishlatilishi mumkin bo'lgan yechimlaridir. Ular eng yaxshi tajribalarni (best practices) ifodalaydi va sinovdan o'tgan rivojlanish paradigmalarini taqdim etish orqali ishlab chiqish jarayonini tezlashtirishi mumkin. Andozalar import qilinadigan kutubxona ham, ko'chirib qo'yiladigan shablon ham emas — ular mulohaza bilan qo'llanadigan g'oyalardir. Andoza yechimga umumiy nom, muammoga aniq tuzilma va jamoangiz bilan afzallik va kamchiliklarni muhokama qilish uchun umumiy lug'at beradi.

Ushbu qo'llanma to'rtta toifadagi 41 ta andozani qamrab oladi: Yaratuvchi, Tuzilmaviy, Xulq-atvor va Arxitektura. Har bir andoza sahifasi bir xil tuzilishga ega — muammo, yechim, TypeScript va Python kabi beshta mashhur dasturlash tilidagi implementatsiya, real hayotiy misol hamda xolis afzallik va kamchiliklar.

## Ushbu qo'llanmadan qanday foydalanish kerak

Agar siz **andozalar bilan endi tanishayotgan bo'lsangiz**, umumiy manzarani ko'rish uchun [Tezkor ma'lumotnoma](/uz/quick-reference)dan boshlang, so'ng Yaratuvchi va Xulq-atvor bo'limlaridan ikki-uchta andozani tanlab, ularni kichik loyihada amalga oshiring. Ketma-ket o'qishdan ko'ra amalda qilib ko'rish muhimroq.

Agar siz **tajribali bo'lsangiz**, qo'llanmadan qaror qabul qilish vositasi sifatida foydalaning. Tezkor ma'lumotnomada afzallik va kamchiliklarni tezda tahlil qilishga yordam beradigan qarorlar daraxti va andozalar kombinatsiyalari mavjud.

Agar siz **o'qituvchi yoki mentor bo'lsangiz**, har bir andoza sahifasi mustaqil va bog'liq andozalarga havolalarga ega — bu kerakli sahifalarni ulashish va ular orasidagi bog'lanishlarni kuzatishni osonlashtiradi.

::: tip Qayerdan boshlashni bilmayapsizmi?
Real hayotdagi ssenariylarning aksariyatini to'rtta andoza qamrab oladi: **Singleton**, **Fabrika metodi** (Factory Method), **Strategiya** (Strategy) va **Kuzatuvchi** (Observer). Avval shularni o'zlashtiring.
:::

Loyihalash andozalari maqsadiga ko'ra **to'rtta asosiy toifaga** bo'linadi:

## 🏗️ Yaratuvchi (Creational) andozalar

Obyektlarni yaratish mexanizmlari bilan shug'ullanadi. Ular obyektlarning qanday yaratilishi va qanday tuzilishidan qat'i nazar, tizimlarni mustaqil qilish uchun instansiya jarayonini mavhumlashtiradi.

<Cards>
  <Card
    title="Singleton"
    description="Klassning faqat bitta instansiyasi va unga global kirish nuqtasi mavjudligini ta'minlaydi"
    href="/uz/creational/singleton"
    image="/cards/singleton.webp"
  />
  <Card
    title="Fabrika metodi"
    description="Aniq klasslarni ko'rsatmasdan obyektlarni yaratadi"
    href="/uz/creational/factory-method"
    image="/cards/factory-method.webp"
  />
  <Card
    title="Abstrakt fabrika"
    description="Bog'liq obyektlar oilalarini yaratadi"
    href="/uz/creational/abstract-factory"
    image="/cards/abstract-factory.webp"
  />
  <Card
    title="Quruvchi"
    description="Murakkab obyektlarni bosqichma-bosqich quradi"
    href="/uz/creational/builder"
    image="/cards/builder.webp"
  />
  <Card
    title="Prototip"
    description="Mavjud obyektlarni klonlash orqali yangi obyektlar yaratadi"
    href="/uz/creational/prototype"
    image="/cards/prototype.webp"
  />
  <Card
    title="Obyektlar havzasi"
    description="Initsializatsiya qilingan obyektlarni samarali qayta ishlatadi"
    href="/uz/creational/object-pool"
    image="/cards/object-pool.webp"
  />
</Cards>

## 🔧 Tuzilmaviy (Structural) andozalar

Obyektlarning tarkibi va munosabatlari bilan shug'ullanadi. Ular obyektlarni kattaroq tuzilmalarga birlashtirishga yordam beradi, shu bilan birga bu tuzilmalarni moslashuvchan va samarali saqlaydi.

<Cards>
  <Card
    title="Adapter"
    description="Mos kelmaydigan obyektlarni birga ishlashi uchun interfeyslarni o'zgartiradi"
    href="/uz/structural/adapter"
    image="/cards/adapter.webp"
  />
  <Card
    title="Ko'prik"
    description="Abstraksiyani amalga oshirishdan ajratadi"
    href="/uz/structural/bridge"
    image="/cards/bridge.webp"
  />
  <Card
    title="Kompozit"
    description="Obyektlarni daraxtsimon tuzilmalarga birlashtiradi"
    href="/uz/structural/composite"
    image="/cards/composite.webp"
  />
  <Card
    title="Dekorator"
    description="Obyektlarga dinamik ravishda mas'uliyatlarni qo'shadi"
    href="/uz/structural/decorator"
    image="/cards/decorator.webp"
  />
  <Card
    title="Fasad"
    description="Murakkab quyi tizimga soddalashtirilgan interfeys taqdim etadi"
    href="/uz/structural/facade"
    image="/cards/facade.webp"
  />
  <Card
    title="Yengilvazn"
    description="Xotirani tejash uchun obyektlarni samarali baham ko'radi"
    href="/uz/structural/flyweight"
    image="/cards/flyweight.webp"
  />
  <Card
    title="O'rinbosar"
    description="Kirishni nazorat qilish uchun o'rinbosar taqdim etadi"
    href="/uz/structural/proxy"
    image="/cards/proxy.webp"
  />
</Cards>

## 🔄 Xulq-atvor (Behavioral) andozalar

Obyektlar orasidagi aloqa va mas'uliyat bilan shug'ullanadi. Ular obyektlarning qanday o'zaro ta'sir qilishini va mas'uliyatni qanday taqsimlashini belgilaydi.

<Cards>
  <Card
    title="Mas'uliyatlar zanjiri"
    description="So'rovlarni ishlov beruvchilar zanjiri bo'ylab uzatadi"
    href="/uz/behavioral/chain-of-responsibility"
    image="/cards/chain-of-responsibility.webp"
  />
  <Card
    title="Buyruq"
    description="So'rovlarni obyektlar sifatida inkapsulyatsiya qiladi"
    href="/uz/behavioral/command"
    image="/cards/command.webp"
  />
  <Card
    title="Interpretator"
    description="Til grammatikasi va interpretatorini belgilaydi"
    href="/uz/behavioral/interpreter"
    image="/cards/interpreter.webp"
  />
  <Card
    title="Iterator"
    description="To'plam elementlariga ketma-ket kirish imkonini beradi"
    href="/uz/behavioral/iterator"
    image="/cards/iterator.webp"
  />
  <Card
    title="Vositachi"
    description="Obyektlarning o'zaro ta'sirini inkapsulyatsiya qiladi"
    href="/uz/behavioral/mediator"
    image="/cards/mediator.webp"
  />
  <Card
    title="Memento"
    description="Obyekt holatini saqlaydi va tiklaydi"
    href="/uz/behavioral/memento"
    image="/cards/memento.webp"
  />
  <Card
    title="Bo'sh obyekt"
    description="Hech narsa qilmaydigan standart xatti-harakatni taqdim etadi"
    href="/uz/behavioral/null-object"
    image="/cards/null-object.webp"
  />
  <Card
    title="Kuzatuvchi"
    description="Holat o'zgarishi haqida bir nechta obyektlarni xabardor qiladi"
    href="/uz/behavioral/observer"
    image="/cards/observer.webp"
  />
  <Card
    title="Holat"
    description="Ichki holatga qarab xatti-harakatni o'zgartiradi"
    href="/uz/behavioral/state"
    image="/cards/state.webp"
  />
  <Card
    title="Strategiya"
    description="O'zaro almashinadigan algoritmlarni inkapsulyatsiya qiladi"
    href="/uz/behavioral/strategy"
    image="/cards/strategy.webp"
  />
  <Card
    title="Shablon metod"
    description="Bazaviy klassda algoritm skeletini belgilaydi"
    href="/uz/behavioral/template-method"
    image="/cards/template-method.webp"
  />
  <Card
    title="Tashrifchi"
    description="Obyektlarni o'zgartirmasdan ularga yangi operatsiyalarni qo'shadi"
    href="/uz/behavioral/visitor"
    image="/cards/visitor.webp"
  />
</Cards>

## 🏛️ Arxitektura va parallellik andozalari

Tizim tuzilishi va ko'p oqimli ishlov berish uchun yuqori darajadagi andozalar: ma'lumotlar oqimi, servislar chegaralari, parallellik va ma'lumotlarni saqlash. Yuqoridagi andozalardan farqli o'laroq, arxitektura andozalari bitta komponentni emas, balki butun ilova tuzilishini shakllantiradi.

<Cards>
  <Card
    title="Active Record"
    description="Ma'lumotlar bazasi qatorini obyekt bilan o'raydi"
    href="/uz/architectural/active-record"
    image="/cards/active-record.webp"
  />
  <Card
    title="CQRS"
    description="O'qish va yozish operatsiyalarini ajratadi"
    href="/uz/architectural/cqrs"
    image="/cards/cqrs.webp"
  />
  <Card
    title="Data Mapper"
    description="Xotiradagi obyektlarni ma'lumotlar bazasidan ajratadi"
    href="/uz/architectural/data-mapper"
    image="/cards/data-mapper.webp"
  />
  <Card
    title="Bog'liqliklarni kiritish"
    description="Bog'liqliklarni obyektlarga uzatadi"
    href="/uz/architectural/dependency-injection"
    image="/cards/dependency-injection.webp"
  />
  <Card
    title="Event Sourcing"
    description="Holatni voqealar ketma-ketligi sifatida saqlaydi"
    href="/uz/architectural/event-sourcing"
    image="/cards/event-sourcing.webp"
  />
  <Card
    title="Identifikatorlar xaritasi"
    description="Biznes tranzaksiyasi davomida har bir yozuvni faqat bir marta yuklaydi"
    href="/uz/architectural/identity-map"
    image="/cards/identity-map.webp"
  />
  <Card
    title="MVC"
    description="Model, view va controllerni ajratadi"
    href="/uz/architectural/mvc"
    image="/cards/mvc.webp"
  />
  <Card
    title="MVP"
    description="Presenter barcha UI mantiqini boshqaradi"
    href="/uz/architectural/mvp"
    image="/cards/mvp.webp"
  />
  <Card
    title="MVT"
    description="Model, View va Template qatlamlariga ajratadi"
    href="/uz/architectural/mvt"
    image="/cards/mvt.webp"
  />
  <Card
    title="MVVM"
    description="UI-ni reaktiv view modeliga bog'laydi"
    href="/uz/architectural/mvvm"
    image="/cards/mvvm.webp"
  />
  <Card
    title="Ishlab chiqaruvchi–iste'molchi"
    description="Ishlab chiqaruvchilar va iste'molchilarni ajratadi"
    href="/uz/architectural/producer-consumer"
    image="/cards/producer-consumer.webp"
  />
  <Card
    title="O'qish-yozish qulfi"
    description="Bir vaqtning o'zida o'qish va eksklyuziv yozish imkonini beradi"
    href="/uz/architectural/read-write-lock"
    image="/cards/read-write-lock.webp"
  />
  <Card
    title="Repozitoriy"
    description="Ma'lumotlarga kirish qatlamini mavhumlashtiradi"
    href="/uz/architectural/repository"
    image="/cards/repository.webp"
  />
  <Card
    title="Rejalashtiruvchi"
    description="Oqim resurslaridan foydalanishni boshqaradi"
    href="/uz/architectural/scheduler"
    image="/cards/scheduler.webp"
  />
  <Card
    title="Servis lokatori"
    description="Servislarni registrdan topadi"
    href="/uz/architectural/service-locator"
    image="/cards/service-locator.webp"
  />
  <Card
    title="Ish birligi"
    description="Tranzaksiya ta'sir qiladigan biznes obyektlari ro'yxatini yuritadi"
    href="/uz/architectural/unit-of-work"
    image="/cards/unit-of-work.webp"
  />
</Cards>

---

## Loyihalash andozalari haqida

Dastlabki 23 ta andoza (Yaratuvchi, Tuzilmaviy va Xulq-atvor) Gamma, Helm, Johnson va Vlissides tomonidan 1994-yilda yozilgan *Design Patterns* kitobidagi klassik **Gang of Four (GoF)** andozalaridir. Qolgan andozalar kengroq dasturiy muhandislik hamjamiyati tomonidan e'tirof etilgan kengaytmalardir.

### Nima uchun loyihalash andozalarini o'rganish kerak?

- **Tasdiqlangan yechimlar**: Ular umumiy muammolarga sinovdan o'tgan yechimlarni taqdim etadi
- **Yaxshiroq muloqot**: Ular dasturchilar uchun umumiy lug'atni taqdim etadi
- **Tezroq ishlab chiqish**: Velosipedni qayta ixtiro qilish o'rniga mavjud yechimlardan foydalanishingiz mumkin
- **Kod sifati**: Ular kodni yanada qulay va moslashuvchan qiladi
- **Eng yaxshi amaliyotlar**: Ular dasturiy muhandislikning eng yaxshi amaliyotlarini o'zida mujassam etadi

Yuqoridagi toifalardan birini tanlash orqali andozalarni o'rganishni boshlang!

## Ehtiyot bo'lish haqida bir og'iz so'z

Andozalar — maqsad emas, vosita. Andozani kod bazangizdagi haqiqiy muammoni hal qilgani uchun emas, balki chiroyli tuyulgani uchun ishlatish — dasturchilar ular bilan ilk bor tanishgandan keyin eng ko'p yo'l qo'yadigan xatolardan biridir. Agar andoza qiyinchilikni kamaytirmasdan, faqat qo'shimcha bilvositalik qo'shsa, deyarli har doim soddaroq kod yaxshiroqdir.

