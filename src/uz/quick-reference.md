---
title: Quick Reference
description: Barcha dizayn namunalari uchun tezkor ma'lumotnoma.
icon: BookMarked
---

# Dizayn Namunalari: Tezkor Ma'lumotnoma

Ushbu sahifa ushbu hujjatda keltirilgan barcha 41 ta dizayn namunasi haqida qisqacha ma'lumot beradi.

## Creational Patterns (6) - Yaratuvchi Namunalar

Ob'ektlarni yaratish mexanizmlari uchun ishlatiladi.

| Namuna               | Maqsadi                                    | Eng Yaxshi Holat                          |
| -------------------- | ------------------------------------------ | ----------------------------------------- |
| **Singleton**        | Global kirishga ega yagona nusxa           | Loggerlar, konfiguratsiyalar, DB ulanishlar |
| **Factory Method**   | Klasslarni aniqlashtirmasdan ob'ekt yaratish | Har xil hujjat turlari, to'lov usullari   |
| **Abstract Factory** | Bog'liq ob'ektlar oilalari                 | UI mavzulari, ma'lumotlar bazasi oilalari |
| **Builder**          | Ob'ektni bosqichma-bosqich qurish          | Murakkab ob'ektlar, fluent APIlar         |
| **Prototype**        | Mavjud ob'ektlarni nusxalash               | Hujjat shablonlari, konfiguratsiya nusxalari |
| **Object Pool**      | Qimmat ob'ektlarni qayta ishlatish         | DB ulanishlari, oqimlar (thread) pullari  |

## Structural Patterns (7) - Strukturaviy Namunalar

Ob'ektlar tarkibi va munosabatlari uchun ishlatiladi.

| Namuna        | Maqsadi                                   | Eng Yaxshi Holat                     |
| ------------- | ----------------------------------------- | ------------------------------------ |
| **Adapter**   | Mos kelmaydigan interfeyslarni o'zgartirish | Ob-havo APIlari, to'lov shlyuzlari   |
| **Bridge**    | Abstraksiyani implementatsiyadan ajratish | Grafika renderlash, qurilma drayverlari |
| **Composite** | Daraxtsimon tuzilmalar                    | Fayl tizimlari, UI komponentlari     |
| **Decorator** | Mas'uliyatlarni dinamik ravishda qo'shish | Ichimliklarni sozlash, ma'lumotlar oqimi |
| **Facade**    | Murakkab quyi tizimlarni soddalashtirish  | Uy avtomatizatsiyasi, freymvork APIlari |
| **Flyweight** | Ob'ektlarni samarali ulashish             | Matn muharrirlari, zarra tizimlari   |
| **Proxy**     | Ob'ektlarga kirishni nazorat qilish       | Keshlar, kechiktirilgan yuklash, xavfsizlik |

## Behavioral Patterns (12) - Xulq-atvor Namunalari

Ob'ektlar o'rtasidagi aloqa va mas'uliyat uchun ishlatiladi.

| Namuna                      | Maqsadi                                   | Eng Yaxshi Holat                      |
| --------------------------- | ----------------------------------------- | ------------------------------------- |
| **Chain of Responsibility** | So'rovlarni zanjir bo'ylab uzatish        | Hodisalarni boshqarish, logging darajalari |
| **Command**                 | So'rovlarni ob'ektlar sifatida inkapsulyatsiya qilish | Orqaga qaytarish (undo/redo), vazifalar navbati |
| **Interpreter**             | Til grammatikasi va talqini               | Ifodalarni baholash, DSLlar           |
| **Iterator**                | Elementlarga ketma-ket kirish             | To'plamlar, maxsus ketma-ketliklar    |
| **Mediator**                | Ob'ektlar o'rtasidagi o'zaro ta'sirni inkapsulyatsiya qilish | Muloqot oynalari, chat tizimlari      |
| **Memento**                 | Holatni suratga olish va tiklash          | Undo/redo, saqlash nuqtalari          |
| **Observer**                | O'zgarishlar haqida bir nechta ob'ektni xabardor qilish | Hodisa tizimlari, pub/sub, data binding |
| **State**                   | Holatga qarab xulq-atvorni o'zgartirish   | Svetoforlar, ish jarayoni holatlari   |
| **Strategy**                | Bir-birini almashtiruvchi algoritmlar     | Saralash, siqish, autentifikatsiya    |
| **Template Method**         | Algoritm skeleti asosiy klassda           | Freymvorklar, ma'lumotlarni qayta ishlash |
| **Visitor**                 | Ob'ektlarni o'zgartirmasdan operatsiyalarni qo'shish | AST traversal, hisobot yaratish       |
| **Null Object**             | Defolt "hech narsa qilma" xulq-atvori     | Fallback handlerlar, mock ob'ektlar   |

## Architectural Patterns (16) - Arxitektura Namunalari

Tizim tuzilishi va konkurensiya uchun yuqori darajadagi namunalar.

| Namuna                   | Maqsadi                            | Eng Yaxshi Holat                       |
| ------------------------ | ---------------------------------- | -------------------------------------- |
| **MVC**                  | Model, view, controller'ni ajratish | Veb-ilovalar, ish stoli ilovalari      |
| **MVP**                  | Presenter UI mantiqini boshqaradi  | Testga yo'naltirilgan ilovalar         |
| **MVVM**                 | UI-ni view modelga bog'lash        | Data-binding freymvorklari             |
| **Repository**           | Ma'lumotlarga kirish qatlamini abstrakt qilish | Ma'lumotlar bazasi bilan ishlash       |
| **CQRS**                 | O'qish va yozishni ajratish        | Murakkab domenlar, hodisaga asoslangan tizimlar |
| **Event Sourcing**       | Holatni hodisalar sifatida saqlash | Audit jurnallari, hodisaga asoslangan tizimlar |
| **Active Record**        | Baza qatori ob'ekt sifatida        | Oddiy CRUD operatsiyalari              |
| **Data Mapper**          | Ob'ektlarni bazadan ajratish       | Murakkab ob'ekt-relyatsion xaritalash  |
| **Identity Map**         | Ob'ektlar yagonaligi keshi         | Takroriy baza yuklashlarining oldini olish |
| **Unit of Work**         | Atomar tranzaksiyalarni kuzatish   | Bir nechta DB yangilanishlarini boshqarish |
| **MVT**                  | Model-View-Template                | Django ilovalari, tezkor veb ishlanmalar |
| **Service Locator**      | Servislar uchun registratura       | Bog'liqliklarni boshqarish, pluginlar  |
| **Dependency Injection** | Bog'liqliklarni tashqaridan uzatish | Testlanadigan kod, kuchsiz bog'lanish  |
| **Producer-Consumer**    | Ishlab chiqaruvchi/iste'molchini ajratish | Xabarlar navbati, data pipelinelar     |
| **Scheduler**            | Oqim resurslariga kirishni nazorat qilish | Oqimlarni sinxronlash, konkurensiya    |
| **Read-Write Lock**      | Bir vaqtda o'qish, eksklyuziv yozish | Keshlar, qidiruv jadvallari            |

## Qaror Daraxti

Ehtiyojingizga qarab namuna tanlang:

### Ob'ektlarni samarali yaratishim kerak

→ **Singleton** (yagona nusxa) yoki **Factory Method** (bir nechta tur) yoki **Builder** (murakkab qurilish)

### Mavjud ob'ektlar bilan boshqacha ishlashim kerak

→ **Adapter** (mos kelmaydigan interfeyslar) yoki **Decorator** (xulq-atvor qo'shish) or **Proxy** (kirishni nazorat qilish)

### Murakkab tuzilmalarni tashkil qilishim kerak

→ **Composite** (iyerarxiyalar) yoki **Facade** (quyi tizimlarni soddalashtirish)

### Hodisalar va xabardor qilishni boshqarishim kerak

→ **Observer** (birdan-ko'pga) yoki **Chain of Responsibility** (ketma-ket handlerlar) yoki **Mediator** (markazlashtirilgan)

### Holat va xulq-atvor o'zgarishlarini boshqarishim kerak

→ **State** (ichki holat) yoki **Strategy** (algoritmni almashtirish) yoki **Template Method** (algoritm skeleti)

### Konkurensiyani (bir vaqtda ishlashni) boshqarishim kerak

→ **Producer-Consumer** (ajratilgan), **Scheduler** (resurs nazorati) yoki **Read-Write Lock** (bir vaqtda kirish)

### Ilovamni strukturaviy tashkil qilishim kerak

→ **MVC** (veb), **MVT** (Django), **MVP** (testlash), **MVVM** (data binding) yoki **Repository** (ma'lumotlarga kirish)

## Namuna Munosabatlari

### Birga ishlaydigan namunalar:

- **Factory Method** + **Template Method**
- **Abstract Factory** + **Factory Method**
- **Composite** + **Iterator** + **Visitor**
- **Decorator** + **Strategy** + **State**
- **Repository** + **Factory Method** + **Singleton**
- **MVC** + **Observer** + **Strategy**
- **Dependency Injection** + **Singleton** + **Factory Method**
- **Unit of Work** + **Repository** + **Identity Map**

## Foydalanish Holatlari Bo'yicha

### Yuqori Samaradorlik / Keshlashtirish

- Object Pool
- Flyweight
- Identity Map
- Proxy (keshlash varianti)
- Read-Write Lock

### Testlash va Qo'llab-quvvatlash

- Dependency Injection
- Strategy
- Template Method
- Null Object

### Murakkab Biznes Mantig'i

- State
- Chain of Responsibility
- Mediator
- Visitor

### Ma'lumotlarni Qayta Ishlash

- Iterator
- Composite
- Visitor
- Pipeline (Producer-Consumer)
- Unit of Work

### Foydalanuvchi Interfeysi (UI)

- Observer
- Command
- Memento (undo/redo)
- State
- MVC / MVP / MVVM

---

Esda tuting: Namunalar talab emas, balki asboblardir. Ulardan faqat haqiqiy muammoni hal qilgandagina foydalaning!
