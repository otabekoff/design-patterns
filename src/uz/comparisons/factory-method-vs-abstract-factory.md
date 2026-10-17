---
title: Factory Method va Abstract Factory
description: Biri override qilinadigan metod orqali bitta mahsulot yaratadi; ikkinchisi obyekt orqali bog'liq mahsulotlarning butun oilasini yaratadi.
icon: Scale
---

# Factory Method va Abstract Factory

[Factory Method](/uz/creational/factory-method) ham, [Abstract Factory](/uz/creational/abstract-factory) ham mijoz kodini `new ConcreteClass()` ni to'g'ridan-to'g'ri chaqirishdan saqlaydi. Ikkalasi ham interfeys turidagi mahsulotlarni qaytaradi. Amalda esa Abstract Factory odatda factory metodlar _yordamida_ implementatsiya qilinadi, bu esa chegarani yanada xiralashtiradi.

GoF farqi **ko'lam va mexanizm** haqida:

- **Factory Method** — _bitta metod_ _bir turdagi_ mahsulotni yaratadi. Variatsiya o'sha metodni subklassda override qilishdan (meros) keladi. Creator klassning odatda boshqa mas'uliyatlari bor va u faqat bitta yaratish qadamini kechiktiradi.
- **Abstract Factory** — butun vazifasi bog'liq mahsulotlar _oilasini_ yaratish bo'lgan _obyekt_. Variatsiya boshqa factory obyektini uzatishdan (kompozitsiya) keladi. Uning asosiy va'dasi — u qaytaradigan mahsulotlar bir-biriga mos keladi.

## Tuzilma

```mermaid
classDiagram
    direction LR
    class Creator {
        +operation() void
        #createProduct() Product*
    }
    class WebCreator {
        #createProduct() Product
    }
    Creator <|-- WebCreator

    class UIFactory {
        <<interface>>
        +createButton() Button
        +createDialog() Dialog
    }
    class DarkFactory
    class LightFactory
    UIFactory <|.. DarkFactory
    UIFactory <|.. LightFactory
```

Chapda: Factory Method — boshqa ish ham bajaradigan klass ichidagi hook. O'ngda: Abstract Factory — oiladagi har bir mahsulot uchun bittadan yaratish metodiga ega maxsus obyekt.

## Yonma-yon taqqoslash

| Jihat                            | Factory Method                                                  | Abstract Factory                                                         |
| -------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Maqsad (GoF)**                 | Qaysi klassni yaratishni subklasslar hal qilishiga imkon berish | Konkret klasslarni nomlamasdan bog'liq obyektlar oilalarini yaratish     |
| **Mahsulotlar soni**             | Bitta mahsulot turi                                             | Birga ishlatiladigan bir nechta mahsulot turi                            |
| **Mexanizm**                     | Meros: metodni override qilish                                  | Kompozitsiya: factory obyektini inject qilish                            |
| **Variatsiyani kim boshqaradi**  | Creator'ning subklassi                                          | Qaysi factory uzatilishini tanlaydigan tomon                             |
| **Creator'ning boshqa ishi**     | Ha — creator'da mahsulotdan foydalanadigan biznes mantiq bor    | Yo'q — yaratish factory'ning yagona mas'uliyati                          |
| **Moslik kafolati**              | Mahsulotlar o'rtasida yo'q                                      | Bitta factory'dan chiqqan mahsulotlar birga ishlashga mo'ljallangan     |
| **Odatiy qo'llanilishi**         | Freymvork hook'lari, hujjat/parser yaratish, plagin nuqtalari   | UI mavzulari, kross-platforma vidjetlar, DB drayverlar oilalari          |
| **Xatarlar**                     | Bitta metodni override qilish uchun har bir mahsulotga subklass | Yangi mahsulot turini qo'shish har bir factory'ni o'zgartiradi           |

## Koddagi hal qiluvchi farq

::: code-group

```typescript [Factory Method]
interface Notifier {
  send(to: string, msg: string): void;
}

abstract class AlertService {
  // O'zi qurmaydigan mahsulotdan foydalanadigan biznes mantiq.
  alert(user: string, event: string): void {
    const notifier = this.createNotifier(); // factory metod
    notifier.send(user, `Alert: ${event}`);
  }

  protected abstract createNotifier(): Notifier;
}

class EmailAlertService extends AlertService {
  protected createNotifier(): Notifier {
    return { send: (to, m) => console.log(`email ${to}: ${m}`) };
  }
}

class SmsAlertService extends AlertService {
  protected createNotifier(): Notifier {
    return { send: (to, m) => console.log(`sms ${to}: ${m}`) };
  }
}
```

```typescript [Abstract Factory]
interface Button { render(): string; }
interface Dialog { open(content: string): string; }

// Bitta obyekt — mos mahsulotlarning butun oilasi.
interface UIFactory {
  createButton(label: string): Button;
  createDialog(): Dialog;
}

const darkTheme: UIFactory = {
  createButton: (l) => ({ render: () => `<button class="dark">${l}</button>` }),
  createDialog: () => ({ open: (c) => `<dialog class="dark">${c}</dialog>` }),
};

const lightTheme: UIFactory = {
  createButton: (l) => ({ render: () => `<button class="light">${l}</button>` }),
  createDialog: () => ({ open: (c) => `<dialog class="light">${c}</dialog>` }),
};

// Mijoz factory'ni qabul qiladi; u hech qachon dark va light vidjetlarni aralashtira olmaydi.
function renderSettings(ui: UIFactory): string {
  return ui.createDialog().open(ui.createButton("Save").render());
}

renderSettings(darkTheme);
```

:::

`AlertService` factory emas — bu bitta yaratish hook'iga ega servis. `UIFactory` esa faqat narsalarni yaratish uchun mavjud va uning qadri shundaki, `createButton` va `createDialog` mavzu bo'yicha doimo mos keladi.

::: tip Foydali test
Mahsulotlarni sanang va variatsiya qanday berilishini so'rang. Bitta mahsulot, subklass orqali tanlanadi → Factory Method. Bir-biriga mos kelishi kerak bo'lgan bir nechta mahsulot, obyekt uzatish orqali tanlanadi → Abstract Factory.
:::

## Ular qanday bog'liq

- Abstract Factory'dagi har bir metod tuzilmaviy jihatdan factory metoddir. GoF konkret factory'lar ko'pincha factory metodlar yoki [Prototype](/uz/creational/prototype) yordamida implementatsiya qilinishini ta'kidlaydi.
- Konkret factory'lar ko'pincha har bir oila uchun yagona nusxa bo'ladi, shuning uchun Abstract Factory yonida [Singleton](/uz/creational/singleton) uchraydi — garchi bunga erishishning yaxshiroq yo'li odatda DI registratsiyasi bo'lsa ham.
- "Simple factory" (ichida `switch` bo'lgan statik `create(type)` funksiyasi) GoF ma'nosida bu ikkisining hech biri emas. Bu foydali idioma, lekin unda polimorf creator yo'q.

## Kengaytirish o'qlari

| Kerakli o'zgarish                       | Factory Method                         | Abstract Factory                                    |
| --------------------------------------- | -------------------------------------- | --------------------------------------------------- |
| Yangi variant qo'shish (masalan, Push)  | Bitta subklass qo'shish                | Har bir metodni implementatsiya qiluvchi bitta factory qo'shish |
| Yangi mahsulot turi qo'shish (masalan, Toast) | Kerakli joyga yangi factory metod qo'shish | Interfeysni va har bir factory'ni o'zgartirish |

Abstract Factory _oilalar_ qo'shishni oson, _mahsulot turlari_ qo'shishni esa qimmat qiladi. Mahsulot turlari to'plami barqaror bo'lganda uni tanlang.

## Qaysi birini qachon tanlash kerak

**Factory Method'ni tanlang, agar:**

- Klass foydali ish bajarsa, lekin unga kerak bo'lgan bitta obyektni subklasslar yoki freymvork hook'i hal qilishi kerak bo'lsa.
- Faqat bitta mahsulot turi ishtirok etsa.
- Siz foydalanuvchilar kengaytiradigan freymvork yoki bazaviy klass yozayotgan bo'lsangiz.

**Abstract Factory'ni tanlang, agar:**

- Bir nechta mahsulot birga ishlatilishi kerak bo'lsa va variantlarni aralashtirish xato bo'lsa.
- Butun oilani (mavzu, platforma, vendor) konfiguratsiya orqali birdaniga almashtirmoqchi bo'lsangiz.
- Mahsulot turlari to'plami barqaror, oilalar soni esa o'sishi mumkin bo'lsa.

::: warning Ko'pincha ikkalasi ham kerak emas
Agar konkret klass ishga tushishda bir marta tanlansa, mahsulotning o'zini oddiy [Dependency Injection](/uz/architectural/dependency-injection) orqali uzatish ikkala patterndan ham soddaroq. Factory'dan yaratish _keyinroq_, _takroran_ yoki _har bir so'rov uchun_ bo'lishi kerak bo'lganda foydalaning.
:::

## Tegishli sahifalar

- [Factory Method](/uz/creational/factory-method)
- [Abstract Factory](/uz/creational/abstract-factory)
- [Builder](/uz/creational/builder) — bosqichma-bosqich quriladigan bitta murakkab mahsulot uchun
- [Patternni tanlash](/uz/choosing-a-pattern)
