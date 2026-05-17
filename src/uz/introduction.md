---
title: Dasturlashda dizayn patternlari
description: Dasturiy ta'minotni ishlab chiqishda qo'llaniladigan dizayn patternlari bo'yicha to'liq qo'llanma.
icon: Palette
---

# Dasturlashda dizayn patternlari

![Cover](/covers/getting-started/introduction.png)

Dizayn patternlari — dasturiy ta'minotni loyihalashda ko'p uchraydigan muammolarning qayta ishlatilishi mumkin bo'lgan yechimlaridir. Ular eng yaxshi tajribalarni (best practices) ifodalaydi va sinovdan o'tgan rivojlanish paradigmalarini taqdim etish orqali ishlab chiqish jarayonini tezlashtirishi mumkin.

Dizayn patternlari odatda maqsadiga ko'ra **uchta asosiy toifaga** bo'linadi:

## 🏗️ Yaratuvchi (Creational) patternlar

Obyektlarni yaratish mexanizmlari bilan shug'ullanadi. Ular obyektlarning qanday yaratilishi va qanday tuzilishidan qat'i nazar, tizimlarni mustaqil qilish uchun instansiya jarayonini mavhumlashtiradi.

<Cards>
  <Card
    title="Singleton"
    description="Klassning faqat bitta instansiyasi va unga global kirish nuqtasi mavjudligini ta'minlaydi"
    href="/creational/singleton"
    image="/cards/singleton.png"
  />
  <Card
    title="Factory Method"
    description="Aniq klasslarni ko'rsatmasdan obyektlarni yaratadi"
    href="/creational/factory-method"
    image="/cards/factory-method.png"
  />
  <Card
    title="Abstract Factory"
    description="Bog'liq obyektlar oilalarini yaratadi"
    href="/creational/abstract-factory"
    image="/cards/abstract-factory.png"
  />
  <Card
    title="Builder"
    description="Murakkab obyektlarni bosqichma-bosqich quradi"
    href="/creational/builder"
    image="/cards/builder.png"
  />
  <Card
    title="Prototype"
    description="Mavjud obyektlarni klonlash orqali yangi obyektlar yaratadi"
    href="/creational/prototype"
    image="/cards/prototype.png"
  />
  <Card
    title="Object Pool"
    description="Initsializatsiya qilingan obyektlarni samarali qayta ishlatadi"
    href="/creational/object-pool"
    image="/cards/object-pool.png"
  />
</Cards>

## 🔧 Tuzilmaviy (Structural) patternlar

Obyektlarning tarkibi va munosabatlari bilan shug'ullanadi. Ular obyektlarni kattaroq tuzilmalarga birlashtirishga yordam beradi, shu bilan birga bu tuzilmalarni moslashuvchan va samarali saqlaydi.

<Cards>
  <Card
    title="Adapter"
    description="Mos kelmaydigan obyektlarni birga ishlashi uchun interfeyslarni o'zgartiradi"
    href="/structural/adapter"
    image="/cards/adapter.png"
  />
  <Card
    title="Bridge"
    description="Abstraksiyani amalga oshirishdan ajratadi"
    href="/structural/bridge"
    image="/cards/bridge.png"
  />
  <Card
    title="Composite"
    description="Obyektlarni daraxtsimon tuzilmalarga birlashtiradi"
    href="/structural/composite"
    image="/cards/composite.png"
  />
  <Card
    title="Decorator"
    description="Obyektlarga dinamik ravishda mas'uliyatlarni qo'shadi"
    href="/structural/decorator"
    image="/cards/decorator.png"
  />
  <Card
    title="Facade"
    description="Murakkab quyi tizimga soddalashtirilgan interfeys taqdim etadi"
    href="/structural/facade"
    image="/cards/facade.png"
  />
  <Card
    title="Flyweight"
    description="Xotirani tejash uchun obyektlarni samarali baham ko'radi"
    href="/structural/flyweight"
    image="/cards/flyweight.png"
  />
  <Card
    title="Proxy"
    description="Kirishni nazorat qilish uchun o'rinbosar taqdim etadi"
    href="/structural/proxy"
    image="/cards/proxy.png"
  />
</Cards>

## 🔄 Xulq-atvor (Behavioral) patternlar

Obyektlar orasidagi aloqa va mas'uliyat bilan shug'ullanadi. Ular obyektlarning qanday o'zaro ta'sir qilishini va mas'uliyatni qanday taqsimlashini belgilaydi.

<Cards>
  <Card
    title="Chain of Responsibility"
    description="So'rovlarni ishlov beruvchilar zanjiri bo'ylab uzatadi"
    href="/behavioral/chain-of-responsibility"
    image="/cards/chain-of-responsibility.png"
  />
  <Card
    title="Command"
    description="So'rovlarni obyektlar sifatida inkapsulyatsiya qiladi"
    href="/behavioral/command"
    image="/cards/command.png"
  />
  <Card
    title="Interpreter"
    description="Til grammatikasi va interpretatorini belgilaydi"
    href="/behavioral/interpreter"
    image="/cards/interpreter.png"
  />
  <Card
    title="Iterator"
    description="To'plam elementlariga ketma-ket kirish imkonini beradi"
    href="/behavioral/iterator"
    image="/cards/iterator.png"
  />
  <Card
    title="Mediator"
    description="Obyektlarning o'zaro ta'sirini inkapsulyatsiya qiladi"
    href="/behavioral/mediator"
    image="/cards/mediator.png"
  />
  <Card
    title="Memento"
    description="Obyekt holatini saqlaydi va tiklaydi"
    href="/behavioral/memento"
    image="/cards/memento.png"
  />
  <Card
    title="Observer"
    description="Holat o'zgarishi haqida bir nechta obyektlarni xabardor qiladi"
    href="/behavioral/observer"
    image="/cards/observer.png"
  />
  <Card
    title="State"
    description="Ichki holatga qarab xatti-harakatni o'zgartiradi"
    href="/behavioral/state"
    image="/cards/state.png"
  />
  <Card
    title="Strategy"
    description="O'zaro almashinadigan algoritmlarni inkapsulyatsiya qiladi"
    href="/behavioral/strategy"
    image="/cards/strategy.png"
  />
  <Card
    title="Template Method"
    description="Bazaviy klassda algoritm skeletini belgilaydi"
    href="/behavioral/template-method"
    image="/cards/template-method.png"
  />
  <Card
    title="Visitor"
    description="Obyektlarni o'zgartirmasdan ularga yangi operatsiyalarni qo'shadi"
    href="/behavioral/visitor"
    image="/cards/visitor.png"
  />
  <Card
    title="Null Object"
    description="Hech narsa qilmaydigan standart xatti-harakatni taqdim etadi"
    href="/behavioral/null-object"
    image="/cards/null-object.png"
  />
</Cards>

## 🏛️ Arxitektura va parallellik patternlari

Tizim tuzilishi va ko'p oqimli ishlov berish uchun yuqori darajadagi patternlar. Bu patternlar kattaroq arxitektura masalalarini hal qiladi.

<Cards>
  <Card
    title="MVC"
    description="Model, view va controllerni ajratadi"
    href="/architectural/mvc"
    image="/cards/mvc.png"
  />
  <Card
    title="MVP"
    description="Presenter barcha UI mantiqini boshqaradi"
    href="/architectural/mvp"
    image="/cards/mvp.png"
  />
  <Card
    title="MVVM"
    description="UI-ni reaktiv view modeliga bog'laydi"
    href="/architectural/mvvm"
    image="/cards/mvvm.png"
  />
  <Card
    title="Repository"
    description="Ma'lumotlarga kirish qatlamini mavhumlashtiradi"
    href="/architectural/repository"
    image="/cards/repository.png"
  />
  <Card
    title="CQRS"
    description="O'qish va yozish operatsiyalarini ajratadi"
    href="/architectural/cqrs"
    image="/cards/cqrs.png"
  />
  <Card
    title="Event Sourcing"
    description="Holatni voqealar ketma-ketligi sifatida saqlaydi"
    href="/architectural/event-sourcing"
    image="/cards/event-sourcing.png"
  />
  <Card
    title="Active Record"
    description="Ma'lumotlar bazasi qatorini obyekt bilan o'raydi"
    href="/architectural/active-record"
    image="/cards/active-record.png"
  />
  <Card
    title="Data Mapper"
    description="Xotiradagi obyektlarni ma'lumotlar bazasidan ajratadi"
    href="/architectural/data-mapper"
    image="/cards/data-mapper.png"
  />
  <Card
    title="Service Locator"
    description="Servislarni registrdan topadi"
    href="/architectural/service-locator"
    image="/cards/service-locator.png"
  />
  <Card
    title="Dependency Injection"
    description="Bog'liqliklarni obyektlarga uzatadi"
    href="/architectural/dependency-injection"
    image="/cards/dependency-injection.png"
  />
  <Card
    title="Producer-Consumer"
    description="Ishlab chiqaruvchilar va iste'molchilarni ajratadi"
    href="/architectural/producer-consumer"
    image="/cards/producer-consumer.png"
  />
  <Card
    title="Scheduler"
    description="Oqim resurslaridan foydalanishni boshqaradi"
    href="/architectural/scheduler"
    image="/cards/scheduler.png"
  />
  <Card
    title="Read-Write Lock"
    description="Bir vaqtning o'zida o'qish va eksklyuziv yozish imkonini beradi"
    href="/architectural/read-write-lock"
    image="/cards/read-write-lock.png"
  />
</Cards>

---

## Dizayn patternlari haqida

Dastlabki 23 ta pattern (Yaratuvchi, Tuzilmaviy va Xulq-atvor) Gamma, Helm, Johnson va Vlissides tomonidan 1994-yilda yozilgan *Design Patterns* kitobidagi klassik **Gang of Four (GoF)** patternlaridir. Qolgan patternlar kengroq dasturiy muhandislik hamjamiyati tomonidan e'tirof etilgan kengaytmalardir.

### Nima uchun dizayn patternlarini o'rganish kerak?

- **Tasdiqlangan yechimlar**: Ular umumiy muammolarga sinovdan o'tgan yechimlarni taqdim etadi
- **Yaxshiroq muloqot**: Ular dasturchilar uchun umumiy lug'atni taqdim etadi
- **Tezroq ishlab chiqish**: Velosipedni qayta ixtiro qilish o'rniga mavjud yechimlardan foydalanishingiz mumkin
- **Kod sifati**: Ular kodni yanada qulay va moslashuvchan qiladi
- **Eng yaxshi amaliyotlar**: Ular dasturiy muhandislikning eng yaxshi amaliyotlarini o'zida mujassam etadi

Yuqoridagi toifalardan birini tanlash orqali patternlarni o'rganishni boshlang!

