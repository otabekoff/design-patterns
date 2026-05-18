---
title: Data Mapper Pattern
description: Xotiradagi obyektlarni ularning ma'lumotlar bazasidagi ifodasidan ajratadi
icon: GitGraph
---

# Data Mapper Pattern

<CoverImage src="/covers/architectural/data-mapper.png" alt="Cover">
  <h1>Data Mapper</h1>
  <p>A friendly postman robot translating letters written in an ancient scroll format into neat modern digital tablets, keeping the scroll and the tablet completely separate.</p>
</CoverImage>

## Umumiy ko'rinish (Overview)

**Data Mapper** patterni bu obyektlarning xotiradagi ko'rinishini ularning ma'lumotlar bazasidagi saqlanadigan ko'rinishidan ajratadigan arxitektura yondashuvidir. Mapper qatlami ikkalasi o'rtasidagi tarjimani (translation) boshqaradi.

Asosiy tushunchalar:

- **Domen Obyektlari (Domain Objects)**: Sof biznes mantig'i, saqlash (persistence) haqida bexabar
- **Data Mapper**: Obyekt va ma'lumotlar bazasi o'rtasidagi konversiyani boshqaradi
- **Vazifalarni ajratish (Separation of Concerns)**: Obyektlar ma'lumotlar bazasi haqida bilmaydi
- **Moslashuvchan Xaritalash (Flexible Mapping)**: Obyekt va ma'lumotlar bazasining turli xil tuzilmalari

## Maqsad (Purpose)

Data Mapper quyidagilarni maqsad qiladi:

- Domen obyektlarini saqlash bazasidan mustaqil saqlash
- Ma'lumotlarni saqlashda moslashuvchanlikni ta'minlash
- Bir nechta ma'lumotlar ifodalanishini (representations) qo'llab-quvvatlash
- Soxta obyektlar (mocks) yordamida test qilishni osonlashtirish
- Murakkab obyekt/ma'lumotlar bazasi xaritalashni (mapping) qo'llab-quvvatlash
- Kodni tashkil qilish va texnik xizmat ko'rsatishni (maintainability) yaxshilash

## Muammo (Problem)

To'g'ri xaritalashsiz (mapping) quyidagi muammolar yuzaga keladi:

- Obyektlar ma'lumotlar bazasi sxemasiga qattiq bog'langan (tightly coupled) bo'ladi
- Obyektlarni alohida test qilish qiyin
- Saqlash mexanizmini o'zgartirish murakkab
- Obyekt va ma'lumotlar bazasi tuzilmalari bir-biriga mos kelishi shart
- Saqlash mantig'i biznes mantig'i bilan aralashib ketadi

```
❌ Qattiq bog'langan (Tightly Coupled)
class User {
  constructor(db) {
    this.db = db;  // Ma'lumotlar bazasi haqida biladi
  }
  save() {
    this.db.execute(...);  // Saqlash mantig'i
  }
}
```

## Yechim (Solution)

Data Mapper obyektlarni saqlashdan (persistence) ajratadi:

```
✅ Data Mapper
class User {
  name: string
  email: string
  // Ma'lumotlar bazasi haqida bilmaydi
}

class UserMapper {
  toPersistence(user) { /* ma'lumotlar bazasiga o'giradi */ }
  toDomain(row) { /* obyektga o'giradi */ }
}
```

## Amalga oshirish (Implementation)

::: code-group

```typescript [TypeScript]
// Domain Object - Pure business logic
class User {
  constructor(
    public id: number | undefined,
    public name: string,
    public email: string,
    public age: number,
  ) {}

  isAdult(): boolean {
    return this.age >= 18;
  }

  isValidEmail(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
  }
}

// Database Row
interface UserRow {
  id: number;
  name: string;
  email: string;
  age: number;
  created_at: string;
}

// Data Mapper
class UserMapper {
  // Convert domain object to database row
  toPersistence(user: User): Partial<UserRow> {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
    };
  }

  // Convert database row to domain object
  toDomain(row: UserRow): User {
    return new User(row.id, row.name, row.email, row.age);
  }

  // Convert collection of rows
  toDomainCollection(rows: UserRow[]): User[] {
    return rows.map((row) => this.toDomain(row));
  }
}

// Repository - Uses mapper
class UserRepository {
  private mapper = new UserMapper();
  private storage: Map<number, UserRow> = new Map();
  private nextId = 1;

  save(user: User): User {
    const row = this.mapper.toPersistence(user) as UserRow;

    if (user.id === undefined) {
      user.id = this.nextId++;
      row.id = user.id;
      row.created_at = new Date().toISOString();
    }

    this.storage.set(user.id, row);
    console.log(`✅ User saved: ${user.name}`);
    return user;
  }

  findById(id: number): User | null {
    const row = this.storage.get(id);
    return row ? this.mapper.toDomain(row) : null;
  }

  findAll(): User[] {
    const rows = Array.from(this.storage.values());
    return this.mapper.toDomainCollection(rows);
  }

  delete(id: number): boolean {
    return this.storage.delete(id);
  }
}

// Usage
const repository = new UserRepository();

const user = new User(undefined, "John Doe", "john@example.com", 30);
repository.save(user);

const user2 = new User(undefined, "Jane Smith", "jane@example.com", 25);
repository.save(user2);

console.log("\n=== All Users ===");
const allUsers = repository.findAll();
allUsers.forEach((u) => {
  console.log(
    `${u.name}: Adult=${u.isAdult()}, Email Valid=${u.isValidEmail()}`,
  );
});

console.log("\n=== Find Specific User ===");
const found = repository.findById(1);
if (found) {
  console.log(`Found: ${found.name} (${found.email})`);
}
```

```python [Python]
from typing import Optional, List, Dict
from dataclasses import dataclass
from datetime import datetime

# Domain Object - Pure business logic
@dataclass
class User:
    id: Optional[int]
    name: str
    email: str
    age: int

    def is_adult(self) -> bool:
        return self.age >= 18

    def is_valid_email(self) -> bool:
        return "@" in self.email and "." in self.email

# Database Row
@dataclass
class UserRow:
    id: int
    name: str
    email: str
    age: int
    created_at: str

# Data Mapper
class UserMapper:
    @staticmethod
    def to_persistence(user: User) -> dict:
        return {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "age": user.age
        }

    @staticmethod
    def to_domain(row: UserRow) -> User:
        return User(row.id, row.name, row.email, row.age)

    @staticmethod
    def to_domain_collection(rows: List[UserRow]) -> List[User]:
        return [UserMapper.to_domain(row) for row in rows]

# Repository - Uses mapper
class UserRepository:
    def __init__(self):
        self.mapper = UserMapper()
        self.storage: Dict[int, UserRow] = {}
        self.next_id = 1

    def save(self, user: User) -> User:
        row_data = self.mapper.to_persistence(user)

        if user.id is None:
            user.id = self.next_id
            self.next_id += 1
            row_data["created_at"] = datetime.now().isoformat()
        else:
            row_data["created_at"] = datetime.now().isoformat()

        row = UserRow(**row_data)
        self.storage[user.id] = row
        print(f"✅ User saved: {user.name}")
        return user

    def find_by_id(self, user_id: int) -> Optional[User]:
        row = self.storage.get(user_id)
        return self.mapper.to_domain(row) if row else None

    def find_all(self) -> List[User]:
        rows = list(self.storage.values())
        return self.mapper.to_domain_collection(rows)

    def delete(self, user_id: int) -> bool:
        if user_id in self.storage:
            del self.storage[user_id]
            return True
        return False

# Usage
if __name__ == "__main__":
    repository = UserRepository()

    user = User(None, "John Doe", "john@example.com", 30)
    repository.save(user)

    user2 = User(None, "Jane Smith", "jane@example.com", 25)
    repository.save(user2)

    print("\n=== All Users ===")
    all_users = repository.find_all()
    for u in all_users:
        print(f"{u.name}: Adult={u.is_adult()}, Email Valid={u.is_valid_email()}")

    print("\n=== Find Specific User ===")
    found = repository.find_by_id(1)
    if found:
        print(f"Found: {found.name} ({found.email})")
```

:::

## Haqiqiy hayotdagi misollar (Real-World Examples)

### TypeORM

TypeORM ma'lumotlar bazasini xaritalash uchun Data Mapper (va Active Record) patternlaridan foydalanadi.

### Doctrine ORM

Doctrine murakkab obyekt-ma'lumotlar bazasi xaritalash uchun Data Mapper-dan foydalanadi.

## Afzalliklari (Advantages) ✅

- **Vazifalarni ajratish (Separation of Concerns)**: Obyektlar ma'lumotlar bazasidan mustaqil
- **Test qilish osonligi (Testability)**: Obyektlarni mock qilish va testlash oson
- **Moslashuvchanlik**: Obyektlarga ta'sir qilmasdan ma'lumotlar bazasini o'zgartirish mumkin
- **Murakkab Xaritalash (Complex Mappings)**: Oddiy bo'lmagan obyekt/ma'lumotlar bazasi xaritalashni boshqarish
- **Qayta ishlash (Reusability)**: Obyektlarni turli kontekstlarda qayta ishlash mumkin
- **Toza Obyektlar**: Domen obyektlarida sof biznes mantig'i
- **Ko'p xil ko'rinishlar**: Turli xil saqlash mexanizmlari
- **Jamoalarni ajratish**: Ma'lumotlarga kirish guruhi domen guruhidan alohida ishlaydi

## Kamchiliklari (Disadvantages) ❌

- **Murakkablik (Complexity)**: Ko'proq kod va abstraksiya qatlamlari
- **O'rganish vaqti (Learning Curve)**: Dasturchilar xaritalashni tushunishlari kerak
- **Ishlash tezligi (Performance)**: Qo'shimcha qatlam ortiqcha yuklama qo'shadi
- **Sinxronizatsiya**: Obyektlar va ma'lumotlar bazasini sinxron holda ushlab turish qiyin
- **Xaritalash kodi**: Xaritalash mantig'ini takrorlash kerak bo'ladi
- **Nosozliklarni topish (Debugging)**: Xatolarni kuzatish qiyinroq
- **O'ta murakkab (Over-Engineering)**: Oddiy modellar uchun ortiqcha ish
- **Shablon kod (Boilerplate)**: Yozish kerak bo'lgan ko'p xaritalash kodi

## Qachon foydalanish kerak (When to Use) ✅

- **Murakkab domenlar**: Qiyin biznes mantiqlari
- **Testlash muhim bo'lganda**: Kuchli unit testlar talab qilinganda
- **Bir nechta ma'lumot manbalari**: Turli saqlash mexanizmlaridan foydalanilganda
- **Jamoaviy ishlab chiqish**: Turli vazifalarni bajargan katta jamoalarda
- **Uzoq muddatli loyihalar**: Moslashuvchanlik muhim bo'lgan hollarda
- **Domain-Driven Design**: DDD qoidalariga rioya qilinganda
- **Korporativ ilovalar**: Keng ko'lamli tizimlarda
- **Obyekt murakkabligi**: Murakkab obyekt ierarxiyalari

## Qachon foydalanmaslik kerak (When NOT to Use) ❌

- **Oddiy CRUD**: Oddiy operatsiyalarni o'ta murakkablashtirish
- **Tezkor prototiplar**: Moslashuvchanlikdan ko'ra tezlik kerak bo'lganda
- **Yagona ma'lumotlar manbasi**: Ma'lumotlar bazasi o'zgarmas bo'lganda
- **Kichik jamoalar**: Qo'shimcha murakkablik oqlanmaganda
- **Ishlash tezligi kritik bo'lganda**: Qo'shimcha yuklama (overhead) qabul qilinmasligi
- **To'g'ridan-to'g'ri xaritalash**: Oddiy jadvaldan obyektga
- **Tezkor ishlab chiqish**: Tezlik dizayndan muhimroq bo'lganda
- **Eski kodlar (Legacy Code)**: O'zgartirish juda murakkab bo'lganda

## Aloqador Patternlar (Related Patterns)

- **Active Record**: Muqobil (Alternative) pattern
- **Repository**: Ko'pincha birgalikda qo'llaniladi
- **Adapter**: Ma'lumotlar bazasini moslashtirish uchun
- **Factory**: Obyekt yaratish uchun
- **Visitor**: Xaritalangan obyektlarni aylanib chiqish (traversing) uchun
