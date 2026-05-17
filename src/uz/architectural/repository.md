---
title: Repository (Ombor)
description: Ma'lumotlar manbaiga kirishni mavhumlashtiradi va ma'lumotlarga to'plam kabi kirish interfeysini taqdim etadi
icon: Database
---

# Repository (Ombor)

<CoverImage src="/covers/architectural/repository.png" alt="Cover">
  <h1>Repository</h1>
  <p>A beautiful marble temple entrance labeled "Data" with a clean catalog desk; behind the desk, the database query monster and the API monster are kept completely out of sight.</p>
</CoverImage>

## Umumiy ko'rinish (Overview)

**Repository Pattern (Ombor patterni)** - bu ma'lumotlar manbaiga kirish mantig'ini mavhumlashtiradigan va quyi darajadagi ma'lumotlar manbaini ko'proq obyektga yo'naltirilgan ko'rinishda taqdim etadigan arxitektura patternidir. U domen obyektlarining xotiradagi to'plami (in-memory collection) kabi ishlaydi.

Asosiy tushunchalar:

- **Repository (Ombor)**: Ma'lumotlar qanday olinishi va saqlanishini mavhumlashtiradi
- **Data Source (Ma'lumotlar manbai)**: Ma'lumotlar bazasi, API, fayl tizimi yoki xotira bo'lishi mumkin
- **Domain Objects (Domen obyektlari)**: Repository tomonidan boshqariladigan biznes obyektlari

Bu pattern biznes mantig'ini ma'lumotlarga kirish mantig'idan ajratadi (decouples).

## Maqsad (Purpose)

Repository patternining maqsadi:

- Ma'lumotlarga kirish mantig'ini biznes mantig'idan ajratish
- Ma'lumotlar operatsiyalari uchun toza, izchil API taqdim etish
- Soxta (mock) repositorylar orqali test qilishni osonlashtirish
- Biznes mantig'iga ta'sir qilmasdan turli xil ma'lumotlar manbalarini qo'llab-quvvatlash
- Ma'lumotlarga kirish mantig'ini markazlashtirish
- Kodni saqlash va qayta ishlatishni yaxshilash

## Muammo (Problem)

To'g'ri mavhumlashtirishsiz ilovalar ko'pincha quyidagi muammolarga duch keladi:

- Biznes mantig'i ma'lumotlar bazasi so'rovlari bilan aralashib ketadi
- Ma'lumotlar bazasiga bog'liq bo'lgan kodni test qilish qiyinlashadi
- Ma'lumotlar manbalarini o'zgartirish (DB dan API ga va hokazo) qiyin
- Ma'lumotlarga kirish mantig'i kod bazasi bo'ylab takrorlanadi
- Biznes mantig'i va saqlash jarayoni (persistence) o'rtasida qattiq bog'liqlik
- Ma'lumotlar bazasidagi o'zgarishlar biznes mantig'ini ham o'zgartirishni talab qiladi

```
❌ To'g'ridan-to'g'ri ma'lumotlar bazasiga kirish
class UserService {
  getUser(id) {
    return database.query('SELECT * FROM users WHERE id = ?', id);
  }
}
```

## Yechim (Solution)

Repository ma'lumotlarga kirish uchun abstraksiya (mavhumlik) qatlamini taqdim etadi:

```
✅ Repository Pattern
┌─────────────────────────────────────┐
│      Biznes Mantig'i (Domen)        │
└────────────────────┬────────────────┘
                     │
┌────────────────────▼────────────────┐
│   IRepository<T> (Interfeys)        │
├─────────────────────────────────────┤
│ • GetById(id)                       │
│ • GetAll()                          │
│ • Add(item)                         │
│ • Update(item)                      │
│ • Delete(id)                        │
└────────────────────┬────────────────┘
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
 Ma'lumotlar bazasi API         Xotira
    Repository  Repository   Repository
```

**Afzalliklari:**

- Biznes mantig'ini ma'lumotlar manbaidan ajratadi
- Yagona javobgarlik (Single responsibility): har bir repository bitta obyekt (entity) uchun javobgar
- Soxta (mock) repositorylar bilan test qilish oson
- Implementatsiyalarni almashtirish juda sodda

## Amalga oshirish (Implementation)

::: code-group

```typescript [typescript]
// Domain Entity
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

// Repository Interface
interface IRepository<T> {
  getById(id: number): Promise<T | null>;
  getAll(): Promise<T[]>;
  add(item: T): Promise<T>;
  update(item: T): Promise<T>;
  delete(id: number): Promise<boolean>;
  find(predicate: (item: T) => boolean): Promise<T[]>;
}

// Database Repository Implementation
class DatabaseUserRepository implements IRepository<User> {
  async getById(id: number): Promise<User | null> {
    console.log(`[DB] SELECT * FROM users WHERE id = ${id}`);
    return {
      id,
      name: "John Doe",
      email: "john@example.com",
      createdAt: new Date(),
    };
  }

  async getAll(): Promise<User[]> {
    console.log("[DB] SELECT * FROM users");
    return [
      { id: 1, name: "John", email: "john@example.com", createdAt: new Date() },
      { id: 2, name: "Jane", email: "jane@example.com", createdAt: new Date() },
    ];
  }

  async add(user: User): Promise<User> {
    console.log(`[DB] INSERT INTO users VALUES (${JSON.stringify(user)})`);
    return { ...user, id: Date.now() };
  }

  async update(user: User): Promise<User> {
    console.log(`[DB] UPDATE users SET name = '${user.name}' WHERE id = ${user.id}`);
    return user;
  }

  async delete(id: number): Promise<boolean> {
    console.log(`[DB] DELETE FROM users WHERE id = ${id}`);
    return true;
  }

  async find(predicate: (item: User) => boolean): Promise<User[]> {
    const users = await this.getAll();
    return users.filter(predicate);
  }
}

// In-Memory Repository Implementation
class InMemoryUserRepository implements IRepository<User> {
  private users: Map<number, User> = new Map();
  private nextId: number = 1;

  async getById(id: number): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async getAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async add(user: User): Promise<User> {
    const newUser = { ...user, id: this.nextId++ };
    this.users.set(newUser.id, newUser);
    console.log(`[Memory] Added user: ${newUser.name}`);
    return newUser;
  }

  async update(user: User): Promise<User> {
    this.users.set(user.id, user);
    console.log(`[Memory] Updated user: ${user.name}`);
    return user;
  }

  async delete(id: number): Promise<boolean> {
    console.log(`[Memory] Deleted user with id: ${id}`);
    return this.users.delete(id);
  }

  async find(predicate: (item: User) => boolean): Promise<User[]> {
    return Array.from(this.users.values()).filter(predicate);
  }
}

// API Repository Implementation
class ApiUserRepository implements IRepository<User> {
  constructor(private apiUrl: string = "https://api.example.com") {}

  async getById(id: number): Promise<User | null> {
    console.log(`[API] GET ${this.apiUrl}/users/${id}`);
    // In real implementation: const response = await fetch(`${this.apiUrl}/users/${id}`);
    return {
      id,
      name: "API User",
      email: "api@example.com",
      createdAt: new Date(),
    };
  }

  async getAll(): Promise<User[]> {
    console.log(`[API] GET ${this.apiUrl}/users`);
    return [{ id: 1, name: "API User 1", email: "user1@example.com", createdAt: new Date() }];
  }

  async add(user: User): Promise<User> {
    console.log(`[API] POST ${this.apiUrl}/users`);
    return { ...user, id: Date.now() };
  }

  async update(user: User): Promise<User> {
    console.log(`[API] PATCH ${this.apiUrl}/users/${user.id}`);
    return user;
  }

  async delete(id: number): Promise<boolean> {
    console.log(`[API] DELETE ${this.apiUrl}/users/${id}`);
    return true;
  }

  async find(predicate: (item: User) => boolean): Promise<User[]> {
    const users = await this.getAll();
    return users.filter(predicate);
  }
}

// Business Logic using Repository
class UserService {
  constructor(private userRepository: IRepository<User>) {}

  async getUserDetails(id: number): Promise<User | null> {
    console.log(`Fetching user ${id}`);
    return await this.userRepository.getById(id);
  }

  async createUser(name: string, email: string): Promise<User> {
    console.log(`Creating user: ${name}`);
    const user: User = {
      id: 0,
      name,
      email,
      createdAt: new Date(),
    };
    return await this.userRepository.add(user);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAll();
  }

  async findUsersByDomain(domain: string): Promise<User[]> {
    return await this.userRepository.find((user) => user.email.endsWith(`@${domain}`));
  }

  async removeUser(id: number): Promise<boolean> {
    return await this.userRepository.delete(id);
  }
}

// Usage - Can easily switch between implementations
async function main() {
  // Using in-memory repository
  const memoryRepo = new InMemoryUserRepository();
  let service = new UserService(memoryRepo);

  await service.createUser("John", "john@example.com");
  const users = await service.getAllUsers();
  console.log("Memory users:", users);

  // Switching to database repository
  const dbRepo = new DatabaseUserRepository();
  service = new UserService(dbRepo);

  const user = await service.getUserDetails(1);
  console.log("DB user:", user);

  // Switching to API repository
  const apiRepo = new ApiUserRepository();
  service = new UserService(apiRepo);

  const apiUsers = await service.getAllUsers();
  console.log("API users:", apiUsers);
}

// main();
```

```python [python]
from abc import ABC, abstractmethod
from typing import List, Optional, Callable, TypeVar, Generic
from dataclasses import dataclass
from datetime import datetime

T = TypeVar('T')

# Domain Entity
@dataclass
class User:
    id: int
    name: str
    email: str
    created_at: datetime

# Repository Interface
class IRepository(ABC, Generic[T]):
    @abstractmethod
    def get_by_id(self, id: int) -> Optional[T]:
        pass

    @abstractmethod
    def get_all(self) -> List[T]:
        pass

    @abstractmethod
    def add(self, item: T) -> T:
        pass

    @abstractmethod
    def update(self, item: T) -> T:
        pass

    @abstractmethod
    def delete(self, id: int) -> bool:
        pass

    @abstractmethod
    def find(self, predicate: Callable[[T], bool]) -> List[T]:
        pass

# Database Repository Implementation
class DatabaseUserRepository(IRepository):
    def get_by_id(self, user_id: int) -> Optional[User]:
        print(f"[DB] SELECT * FROM users WHERE id = {user_id}")
        return User(
            id=user_id,
            name="John Doe",
            email="john@example.com",
            created_at=datetime.now()
        )

    def get_all(self) -> List[User]:
        print("[DB] SELECT * FROM users")
        return [
            User(1, "John", "john@example.com", datetime.now()),
            User(2, "Jane", "jane@example.com", datetime.now())
        ]

    def add(self, user: User) -> User:
        print(f"[DB] INSERT INTO users VALUES ({user})")
        return user

    def update(self, user: User) -> User:
        print(f"[DB] UPDATE users SET name = '{user.name}' WHERE id = {user.id}")
        return user

    def delete(self, user_id: int) -> bool:
        print(f"[DB] DELETE FROM users WHERE id = {user_id}")
        return True

    def find(self, predicate: Callable[[User], bool]) -> List[User]:
        users = self.get_all()
        return [u for u in users if predicate(u)]

# In-Memory Repository Implementation
class InMemoryUserRepository(IRepository):
    def __init__(self):
        self.users: dict[int, User] = {}
        self.next_id: int = 1

    def get_by_id(self, user_id: int) -> Optional[User]:
        return self.users.get(user_id)

    def get_all(self) -> List[User]:
        return list(self.users.values())

    def add(self, user: User) -> User:
        new_user = User(
            id=self.next_id,
            name=user.name,
            email=user.email,
            created_at=user.created_at
        )
        self.next_id += 1
        self.users[new_user.id] = new_user
        print(f"[Memory] Added user: {new_user.name}")
        return new_user

    def update(self, user: User) -> User:
        self.users[user.id] = user
        print(f"[Memory] Updated user: {user.name}")
        return user

    def delete(self, user_id: int) -> bool:
        if user_id in self.users:
            del self.users[user_id]
            print(f"[Memory] Deleted user with id: {user_id}")
            return True
        return False

    def find(self, predicate: Callable[[User], bool]) -> List[User]:
        return [u for u in self.users.values() if predicate(u)]

# API Repository Implementation
class ApiUserRepository(IRepository):
    def __init__(self, api_url: str = "https://api.example.com"):
        self.api_url = api_url

    def get_by_id(self, user_id: int) -> Optional[User]:
        print(f"[API] GET {self.api_url}/users/{user_id}")
        return User(
            id=user_id,
            name="API User",
            email="api@example.com",
            created_at=datetime.now()
        )

    def get_all(self) -> List[User]:
        print(f"[API] GET {self.api_url}/users")
        return [User(1, "API User 1", "user1@example.com", datetime.now())]

    def add(self, user: User) -> User:
        print(f"[API] POST {self.api_url}/users")
        return user

    def update(self, user: User) -> User:
        print(f"[API] PATCH {self.api_url}/users/{user.id}")
        return user

    def delete(self, user_id: int) -> bool:
        print(f"[API] DELETE {self.api_url}/users/{user_id}")
        return True

    def find(self, predicate: Callable[[User], bool]) -> List[User]:
        users = self.get_all()
        return [u for u in users if predicate(u)]

# Business Logic using Repository
class UserService:
    def __init__(self, user_repository: IRepository):
        self.repository = user_repository

    def get_user_details(self, user_id: int) -> Optional[User]:
        print(f"Fetching user {user_id}")
        return self.repository.get_by_id(user_id)

    def create_user(self, name: str, email: str) -> User:
        print(f"Creating user: {name}")
        user = User(id=0, name=name, email=email, created_at=datetime.now())
        return self.repository.add(user)

    def get_all_users(self) -> List[User]:
        return self.repository.get_all()

    def find_users_by_domain(self, domain: str) -> List[User]:
        return self.repository.find(lambda u: u.email.endswith(f"@{domain}"))

    def remove_user(self, user_id: int) -> bool:
        return self.repository.delete(user_id)

# Usage
if __name__ == "__main__":
    # Using in-memory repository
    memory_repo = InMemoryUserRepository()
    service = UserService(memory_repo)

    service.create_user("John", "john@example.com")
    users = service.get_all_users()
    print("Memory users:", users)

    # Switching to database repository
    db_repo = DatabaseUserRepository()
    service = UserService(db_repo)
    user = service.get_user_details(1)
    print("DB user:", user)

    # Switching to API repository
    api_repo = ApiUserRepository()
    service = UserService(api_repo)
    api_users = service.get_all_users()
    print("API users:", api_users)
```

:::

## Haqiqiy hayotdagi misollar (Real-World Examples)

### Entity Framework (C#)

```csharp
using (var context = new DbContext())
{
  var user = context.Users.FirstOrDefault(u => u.Id == 1);
}
```

### Spring Data Repository (Java)

```java
public interface UserRepository extends JpaRepository<User, Long> {
  List<User> findByEmail(String email);
}
```

### SQLAlchemy (Python)

```python
session.query(User).filter(User.email == 'user@example.com').first()
```

## Afzalliklari (Advantages) ✅

- **Mavhumlashtirish (Abstraction)**: Biznes mantig'ini ma'lumotlarga kirishdan ajratadi
- **Test qilish qulayligi (Testability)**: Unit testlar uchun osongina mock qilinadi
- **Moslashuvchanlik (Flexibility)**: Ma'lumotlar manbalarini o'zgartirish oson
- **Kodni qayta ishlatish (Code Reuse)**: Repository mantig'ini bo'lishish mumkin
- **Qo'llab-quvvatlash qulayligi (Maintainability)**: Ma'lumotlarga kirishni o'zgartirish biznes mantig'iga ta'sir qilmaydi
- **Yagona javobgarlik (Single Responsibility)**: Har bir repository bitta obyektni (entity) boshqaradi
- **Markazlashtirilgan mantiq**: Ma'lumotlarga kirish mantig'i bitta joyda jamlanadi
- **Izchillik (Consistency)**: Bir xil ma'lumotlarga kirish interfeysi

## Kamchiliklari (Disadvantages) ❌

- **Qo'shimcha abstraksiya**: Yozish va qo'llab-quvvatlash uchun ko'proq kod
- **Ishlash tezligi (Performance)**: Qo'shimcha qatlam qo'shimcha yuk (overhead) yaratishi mumkin
- **O'rganish egri chizig'i (Learning Curve)**: Dasturchilar patternni tushunishlari kerak
- **Murakkablik (Complexity)**: Oddiy CRUD operatsiyalari uchun ortiqcha bo'lishi mumkin
- **Oqib ketadigan abstraksiyalar (Leaky Abstractions)**: Barcha ma'lumotlar manbai xususiyatlarini to'liq yashirmasligi mumkin
- **Cheklangan imkoniyatlar**: Bazi ma'lumotlar bazasi xususiyatlarini mavhumlashtirish qiyin
- **O'ta murakkablashtirish (Over-Engineering)**: Oddiy ilovalar uchun keraksiz bo'lishi mumkin
- **So'rovlarni optimallashtirish (Query Optimization)**: Murakkab so'rovlarni optimallashtirish qiyinroq

## Qachon foydalanish kerak (When to Use) ✅

- **Murakkab ilovalar**: Bir nechta ma'lumotlar manbasiga ega bo'lganda
- **Test qilinadigan kod**: Unit testlar muhim bo'lgan loyihalarda
- **Bir nechta ma'lumotlar manbalari**: API, ma'lumotlar bazasi, kesh (cache) kombinatsiyalari
- **Jamoaviy dasturlash**: Kodni qayta ishlatish qadrlanganda
- **Uzoq muddatli loyihalar**: Qo'llab-quvvatlash muhim bo'lgan joylarda
- **SOLID Prinsiplari**: Interfeyslarni ajratishga (interface segregation) amal qilinganda
- **Domain-Driven Design (Domen-yo'naltirilgan dizayn)**: Domenni infratuzilmadan ajratganda
- **Korporativ ilovalar (Enterprise Applications)**: Keng ko'lamli biznes ilovalarida

## Qachon foydalanmaslik kerak (When NOT to Use) ❌

- **Oddiy CRUD ilovalar**: Kichik ilovalarni ortiqcha murakkablashtirish (Over-engineering)
- **Oddiy skriptlar**: Tezkor yordamchi dasturlar yoki vositalar
- **Tezkor prototiplash**: Tez yoziladigan va tashlab yuboriladigan kodlar
- **Kechikish muhim bo'lganda (Performance-Critical)**: Har bir millisekund muhim bo'lgan tizimlarda
- **ORM dan allaqachon foydalanilganda**: Entity Framework, Hibernate buni o'zi hal qiladi
- **Bitta ma'lumotlar manbai**: Ma'lumotlar manbai o'zgarmas bo'lsa
- **Mikroservislar**: Har bir xizmat (service) allaqachon izolyatsiya qilingan bo'lsa
- **Prototip bosqichi**: Arxitektura to'liq aniqlanmaguncha

## Aloqador Patternlar (Related Patterns)

- **Data Mapper**: Obyektlarni ma'lumotlar bazasiga moslashtirish uchun o'xshash tushuncha
- **Active Record**: Muqobil ma'lumotlarni saqlash patterni
- **Unit of Work**: Ko'pincha Repository bilan birga ishlatiladi
- **Dependency Injection**: Repositorylarni kiritish (inject) uchun ishlatiladi
- **Factory Pattern**: Repository namunalarini (instances) yaratish uchun
- **Strategy Pattern**: Turli xil repository implementatsiyalari uchun
- **Adapter Pattern**: Turli ma'lumotlar manbalarini moslashtirish uchun
