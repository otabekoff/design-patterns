---
title: Identity Map Pattern
description: Har bir yuklangan ob'ektni xaritada saqlash orqali har bir ob'ekt faqat bir marta yuklanishini ta'minlaydi.
icon: Fingerprint
---

# Identity Map Pattern

![Cover](/covers/architectural/identity-map.png)

## Umumiy Tavsif

**Identity Map** (Identifikatsiya Xaritasi) namunasi — sessiya davomida har bir ma'lumotlar bazasi yozuvi xotirada bitta yagona ob'ekt nusxasiga yuklanishini ta'minlaydi. U ma'lumotlar bazasidan olingan ob'ektlar uchun kesh vazifasini bajaradi va bir xil yozuvning bir vaqtning o'zida bir nechta nusxalari mavjud bo'lishining oldini oladi.

Asosiy tushunchalar:

- **Yagona Nusxa**: Har qanday berilgan bazadagi ID uchun xotirada faqat bitta ob'ekt bo'ladi.
- **Xotiradagi Kesh**: Ob'ektlarni ularning birlamchi kaliti (primary key) bo'yicha saqlaydi.
- **Birinchi Tekshirish**: Bazaga so'rov yuborishdan oldin, xaritani tekshiradi.
- **Muvofiqlik (Consistency)**: Bir xil yozuvni ifodalovchi ikki xil ob'ekt o'rtasidagi nomuvofiq holatlarning oldini oladi.

## Maqsad

Identity Map quyidagilarga qaratilgan:

- Xotirada havolalar yaxlitligini (referential integrity) saqlash.
- Bir xil ma'lumotlar uchun ortiqcha bazaviy so'rovlardan qochish.
- Ob'ektga kiritilgan o'zgarishlar ushbu yozuvdan foydalanadigan barcha qismlar uchun ko'rinishini ta'minlash.
- Murakkab ob'ekt grafiklarida takroriy tugunlardan qochish orqali ularni soddalashtirish.

## Muammo

Identity Map ishlatilmaganda, bitta yozuvni bir necha marta yuklash alohida ob'ektlarni yaratadi:

```typescript
const user1 = userRepository.findById(1);
const user2 = userRepository.findById(1);

user1.name = "Yangi Ism";
console.log(user2.name); // Hali ham "Eski Ism"! ❌
```

Bu holat, agar ikkala ob'ekt ham bazaga qayta saqlansa, ma'lumotlarning yo'qolishiga (lost updates) olib keladi.

## Yechim

Identity Map yuklash so'rovini tutib qoladi:

```typescript
const map = new IdentityMap();

function findById(id) {
  if (map.has(id)) return map.get(id); // O'sha nusxani qaytaradi ✅
  const user = db.query(...);
  map.set(id, user);
  return user;
}
```

## Amalga Oshirish (Implementation)

::: code-group

```typescript [typescript]
class User {
  constructor(public id: number, public name: string) {}
}

class IdentityMap {
  private static instanceMap = new Map<number, any>();

  static get<T>(id: number): T | undefined {
    return this.instanceMap.get(id);
  }

  static add(id: number, object: any): void {
    this.instanceMap.set(id, object);
  }

  static clear(): void {
    this.instanceMap.clear();
  }
}

class UserRepository {
  findById(id: number): User {
    // 1. Identity Map'ni tekshirish
    const cached = IdentityMap.get<User>(id);
    if (cached) {
      console.log(`[Kesh] Foydalanuvchi ${id} xaritadan topildi`);
      return cached;
    }

    // 2. Bazadan olish
    console.log(`[DB] Foydalanuvchi ${id} bazadan yuklanmoqda...`);
    const user = new User(id, "User " + id);
    
    // 3. Xaritada saqlash
    IdentityMap.add(id, user);
    return user;
  }
}

// Foydalanish
const repo = new UserRepository();
const u1 = repo.findById(1);
const u2 = repo.findById(1);

console.log(u1 === u2); // true ✅
```

```python [python]
class User:
    def __init__(self, id_val, name):
        self.id = id_val
        self.name = name

class IdentityMap:
    _instance_map = {}

    @classmethod
    def get(cls, id_val):
        return cls._instance_map.get(id_val)

    @classmethod
    def add(cls, id_val, obj):
        cls._instance_map[id_val] = obj

    @classmethod
    def clear(cls):
        cls._instance_map.clear()

class UserRepository:
    def find_by_id(self, id_val):
        # 1. Identity Map'ni tekshirish
        cached = IdentityMap.get(id_val)
        if cached:
            print(f"[Kesh] Foydalanuvchi {id_val} xaritadan topildi")
            return cached

        # 2. Bazadan olish
        print(f"[DB] Foydalanuvchi {id_val} bazadan yuklanmoqda...")
        user = User(id_val, f"User {id_val}")
        
        # 3. Xaritada saqlash
        IdentityMap.add(id_val, user)
        return user

# Foydalanish
repo = UserRepository()
u1 = repo.find_by_id(1)
u2 = repo.find_by_id(1)

print(u1 is u2) # True ✅
```

:::

## Real Hayotdan Misollar

### Hibernate / JPA
Hibernate'dagi "First-Level Cache" — bu klassik Identity Map hisoblanadi. U `Session` doirasida ishlaydi.

### SQLAlchemy
SQLAlchemy'ning `Session` ob'ekti o'z doirasida yuklangan barcha ob'ektlar uchun Identity Map yuritadi.

### JavaScript ORMlar (TypeORM, MikroORM)
MikroORM ob'ektlar yagonaligini ta'minlash uchun o'zining `EntityManager`i tarkibida Identity Map'dan foydalanadi.

## Afzalliklari ✅

- **Ma'lumotlar Muvofiqligi**: Bir nechta ob'ektlar bitta bazaviy yozuvni ifodalashining oldini oladi.
- **Samaradorlik**: Qisqa muddatli kesh vazifasini bajarib, baza yuklamasini kamaytiradi.
- **Tsiklik Havolalar**: Murakkab, aylanma (circular) ob'ekt tuzilmalarini yuklashga imkon beradi.

## Kamchiliklari ❌

- **Xotira Sarfi**: Sessiya davomida barcha yuklangan ob'ektlar xotirada saqlanadi.
- **Eskirgan Ma'lumotlar**: Agar baza tashqaridan o'zgarsa, xaritada eski versiyalar qolib ketishi mumkin.

## Qachon Ishlatish Kerak ✅

- **Sessiyaga asoslangan ilovalar**: Bir tranzaksiya bir nechta so'rovlarni qamrab olgan veb-so'rovlarda.
- **Murakkab ob'ekt grafiklari**: Ob'ektlar bir-biriga ko'p havola qilganda.

## Bog'liq Namunalar

- **Unit of Work**: Qaysi ob'ektlarni boshqarish kerakligini bilish uchun Identity Map'dan foydalanadi.
- **Data Mapper**: Ob'ektlar hayotiy tsiklini boshqarish uchun Identity Map'ni ishlatadi.
- **Active Record**: Ko'pincha ichki Identity Map'ni amalga oshiradi.
