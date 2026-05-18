---
title: Unit of Work Pattern
description: Tranzaksiya davomida ob'ektlardagi barcha o'zgarishlarni kuzatib boradi va ularni atomar tarzda yozadi.
icon: Boxes
---

# Unit of Work Pattern

<CoverImage src="/covers/architectural/unit-of-work.png" alt="Cover">
  <h1>Unit of Work</h1>
  <p>A funny banker robot with a cart full of transactions; it holds all transactions until the cart is full, then pulls a single giant lever to commit them all at once.</p>
</CoverImage>

## Umumiy Tavsif

**Unit of Work** (Ish Birligi) namunasi — bu biznes tranzaksiyasi natijasida o'zgargan ob'ektlar ro'yxatini yurituvchi va o'zgarishlarni yozish hamda konkurensiya (bir vaqtning o'zida ishlash) muammolarini hal qilishni muvofiqlashtiruvchi arxitektura namunasidir.

Asosiy tushunchalar:

- **Tranzaksiyalarni Kuzatish**: Bitta tranzaksiya davomida ob'ektlardagi barcha o'zgarishlarni (yaratish, yangilash, o'chirish) kuzatib boradi.
- **Atomar Amallar**: Barcha o'zgarishlarni ma'lumotlar bazasiga bitta paket sifatida yuboradi (commit).
- **Samaradorlik**: Ma'lumotlar bazasiga murojaatlarni guruhlash orqali ularning sonini kamaytiradi.
- **Konkurensiya Nazorati**: Bir xil ma'lumotlarga bir nechta o'zgarishlar kiritilishini boshqaradi.

## Maqsad

Unit of Work quyidagilarga qaratilgan:

- O'zgarishlarni atomar tarzda saqlash orqali ma'lumotlar yaxlitligini ta'minlash.
- Ma'lumotlar bazasiga borib-kelishlar sonini kamaytirish orqali samaradorlikni oshirish.
- Ma'lumotlar bazasi tranzaksiyalarini boshqarish mantiqini markazlashtirish.
- Domen modelini saqlashni kuzatish mantiqidan xoli saqlash.

## Muammo

Unit of Work ishlatilmaganda, ma'lumotlar bazasi bilan ishlashda quyidagi muammolar yuzaga kelishi mumkin:

- Agar bitta yangilash muvaffaqiyatli bo'lib, ikkinchisi muvaffaqiyatsiz bo'lsa, ma'lumotlar mos kelmasligi.
- Ko'plab kichik so'rovlar tufayli past samaradorlik.
- Qaysi ob'ektlar o'zgarganligini va saqlash kerakligini qo'lda kuzatishning qiyinligi.

```
❌ Qo'lda Kuzatish
repo1.update(user);
repo2.update(order);
// Agar order xato bersa-chi? user allaqachon saqlangan bo'ladi.
```

## Yechim

Unit of Work tranzaksiya hayotiy tsiklini boshqaradi:

```
✅ Unit of Work
uow.registerDirty(user);
uow.registerNew(newOrder);
uow.commit(); // Ikkalasini ham saqlaydi yoki hech qaysisini saqlamaydi
```

## Amalga Oshirish (Implementation)

::: code-group

```typescript [TypeScript]
// Entitilar
class Entity {
  id: string;
  constructor(id: string) {
    this.id = id;
  }
}

class User extends Entity {
  name: string;
  constructor(id: string, name: string) {
    super(id);
    this.name = name;
  }
}

// Unit of Work
class UnitOfWork {
  private newEntities: Set<Entity> = new Set();
  private dirtyEntities: Set<Entity> = new Set();
  private removedEntities: Set<Entity> = new Set();

  registerNew(entity: Entity): void {
    this.newEntities.add(entity);
  }

  registerDirty(entity: Entity): void {
    if (!this.newEntities.has(entity)) {
      this.dirtyEntities.add(entity);
    }
  }

  registerRemoved(entity: Entity): void {
    if (this.newEntities.has(entity)) {
      this.newEntities.delete(entity);
      return;
    }
    this.dirtyEntities.delete(entity);
    this.removedEntities.add(entity);
  }

  commit(): void {
    console.log("--- Tranzaksiya Boshlandi ---");

    this.newEntities.forEach((e) => console.log(`[DB] INSERT: ${e.id}`));
    this.dirtyEntities.forEach((e) => console.log(`[DB] UPDATE: ${e.id}`));
    this.removedEntities.forEach((e) => console.log(`[DB] DELETE: ${e.id}`));

    console.log("✅ Tranzaksiya Muvaffaqiyatli Yakunlandi");

    this.clear();
  }

  private clear(): void {
    this.newEntities.clear();
    this.dirtyEntities.clear();
    this.removedEntities.clear();
  }
}

// Foydalanish
const uow = new UnitOfWork();
const user1 = new User("1", "John");
const user2 = new User("2", "Jane");

uow.registerNew(user1);
user2.name = "Jane Doe";
uow.registerDirty(user2);

uow.commit();
```

```python [Python]
class Entity:
    def __init__(self, id: str):
        self.id = id

class User(Entity):
    def __init__(self, id: str, name: str):
        super().__init__(id)
        self.name = name

class UnitOfWork:
    def __init__(self):
        self.new_entities = set()
        self.dirty_entities = set()
        self.removed_entities = set()

    def register_new(self, entity):
        self.new_entities.add(entity)

    def register_dirty(self, entity):
        if entity not in self.new_entities:
            self.dirty_entities.add(entity)

    def register_removed(self, entity):
        if entity in self.new_entities:
            self.new_entities.remove(entity)
            return
        self.dirty_entities.discard(entity)
        self.removed_entities.add(entity)

    def commit(self):
        print("--- Tranzaksiya Boshlandi ---")

        for e in self.new_entities:
            print(f"[DB] INSERT: {e.id}")
        for e in self.dirty_entities:
            print(f"[DB] UPDATE: {e.id}")
        for e in self.removed_entities:
            print(f"[DB] DELETE: {e.id}")

        print("✅ Tranzaksiya Muvaffaqiyatli Yakunlandi")
        self.clear()

    def clear(self):
        self.new_entities.clear()
        self.dirty_entities.clear()
        self.removed_entities.clear()

# Foydalanish
uow = UnitOfWork()
user1 = User("1", "John")
user2 = User("2", "Jane")

uow.register_new(user1)
user2.name = "Jane Doe"
uow.register_dirty(user2)

uow.commit()
```

:::

## Real Hayotdan Misollar

### Entity Framework (C# / .NET)

`DbContext` ham Unit of Work, ham Repository konteyneri vazifasini bajaradi. `SaveChanges()` chaqirilganda barcha kuzatilgan o'zgarishlar saqlanadi.

### Hibernate / JPA (Java)

`Session` (Hibernate) yoki `EntityManager` (JPA) entitilarni kuzatib boradi va tranzaksiya davomida ularni ma'lumotlar bazasi bilan sinxronlashtiradi.

### SQLAlchemy (Python)

`Session` ob'ekti — ob'ektlar holatini boshqaradigan va ularni ma'lumotlar bazasiga yozadigan klassik Unit of Work implementatsiyasidir.

## Afzalliklari ✅

- **Yaxlitlik (Consistency)**: O'zgarishlar atomar; yo hamma narsa saqlanadi, yo hech narsa.
- **Samaradorlik**: Tarmoq kechikishini kamaytirish uchun ma'lumotlar bazasi amallarini guruhlaydi.
- **Soddalashtirilgan Kod**: Mijoz kodi o'zgarishlarni qo'lda kuzatishi shart emas.

## Kamchiliklari ❌

- **Murakkablik**: Debug qilish qiyin bo'lishi mumkin bo'lgan qo'shimcha qatlam qo'shadi.
- **Xotira Sarfi**: Commit qilinguncha barcha o'zgargan ob'ektlarni xotirada ushlab turadi.

## Qachon Ishlatish Kerak ✅

- **Murakkab Biznes Tranzaksiyalari**: Bir vaqtning o'zida bir nechta ob'ektlar o'zgartirilganda.
- **Yuqori Samaradorlik Kerak Bo'lganda**: Ma'lumotlar bazasiga so'rovlarni minimallashtirish kerak bo'lganda.

## Bog'liq Namunalar

- **Repository Pattern**: Ko'pincha Unit of Work bilan birga ishlatiladi.
- **Data Mapper**: Kuzatilgan ob'ektlarni saqlash uchun fonda ishlaydi.
- **Identity Map**: Ob'ektlarning yagonaligini ta'minlash uchun Unit of Work tomonidan ishlatiladi.
