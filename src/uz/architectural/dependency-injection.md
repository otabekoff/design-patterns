---
title: Dependency Injection Pattern
description: Qaramliklarni obyektlarning o'zi yaratish o'rniga, ularni obyektlarga uzatadi
icon: Wrench
---

# Dependency Injection Pattern



## Umumiy ko'rinish (Overview)

**Dependency Injection (DI)** (Qaramlikni inyeksiya qilish) bu obyektlarni qaramliklarni o'zi yaratishi o'rniga, ularni ta'minlaydigan arxitektura patternidir. Qaramliklar obyektning tashqarisidan uzatiladi (inyeksiya qilinadi).

Asosiy tushunchalar:

- **Constructor Injection**: Qaramliklar konstruktor orqali uzatiladi
- **Setter Injection**: Qaramliklar xususiyatlar (properties) orqali o'rnatiladi
- **Interface Injection**: Qaramliklar interfeyslar orqali amalga oshiriladi
- **Container (Konteyner)**: Qaramliklarni yaratish va uzatishni boshqaradi

## Maqsad (Purpose)

Dependency Injection quyidagilarni maqsad qiladi:

- Komponentlar o'rtasidagi bog'lanishni (coupling) kamaytirish
- Qaramliklarni soxtalashtirish (mocking) orqali testlashni yaxshilash
- Komponentlarning moslashuvchan kompozitsiyasini ta'minlash
- Qaramliklar konfiguratsiyasini markazlashtirish
- Turli xil amalga oshirishlarni (implementations) qo'llab-quvvatlash
- SOLID tamoyillarini targ'ib qilish
- Komponentlarni qayta ishlashni soddalashtirish

## Muammo (Problem)

DI bo'lmaganda yuzaga keladigan holatlar:

- Komponentlar bir-biriga qattiq bog'langan (tightly coupled)
- Test qilish qiyin (qaramliklarni mock qilib bo'lmaydi)
- Amalga oshirishlarni (implementations) almashtirish murakkab
- Qaramliklar kod ichida yashiringan bo'ladi
- Komponentlar o'rtasidagi munosabatlarni tushunish qiyin

```
❌ Kodga yozib qo'yilgan qaramliklar (Hard-Coded Dependencies)
class UserService {
  private logger = new ConsoleLogger();
  private db = new Database();

  // Boshqa logger yoki DB ni ishlata olmaydi
}
```

## Yechim (Solution)

DI qaramliklarni tashqaridan taqdim etadi:

```
✅ Dependency Injection
class UserService {
  constructor(logger: Logger, db: Database) {
    this.logger = logger;
    this.db = db;
  }
  // Qaramliklar sozlanishi (configurable) mumkin
}
```

## Amalga oshirish (Implementation)

::: code-group

```typescript [typescript]
// Dependencies
interface Logger {
  log(message: string): void;
}

interface Database {
  query(sql: string): any[];
}

// Implementations
class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }
}

class MockDatabase implements Database {
  query(sql: string): any[] {
    console.log(`[DB] ${sql}`);
    return [];
  }
}

// Service - receives dependencies
class UserService {
  constructor(
    private logger: Logger,
    private db: Database,
  ) {}

  createUser(name: string, email: string): void {
    this.logger.log(`Creating user: ${name}`);
    this.db.query(`INSERT INTO users VALUES ('${name}', '${email}')`);
  }

  getUsers(): void {
    this.logger.log("Fetching users");
    const results = this.db.query("SELECT * FROM users");
    this.logger.log(`Found ${results.length} users`);
  }
}

// Simple DI Container
class Container {
  private services: Map<string, any> = new Map();

  register(name: string, factory: () => any): void {
    this.services.set(name, factory);
  }

  resolve<T>(name: string): T {
    const factory = this.services.get(name);
    if (!factory) {
      throw new Error(`Service not registered: ${name}`);
    }
    return factory();
  }
}

// Usage
const container = new Container();
container.register("logger", () => new ConsoleLogger());
container.register("database", () => new MockDatabase());
container.register("userService", () => {
  const logger = container.resolve<Logger>("logger");
  const db = container.resolve<Database>("database");
  return new UserService(logger, db);
});

const userService = container.resolve<UserService>("userService");
userService.createUser("John Doe", "john@example.com");
userService.getUsers();

console.log("\n=== Testing with Mocks ===");
const mockLogger: Logger = {
  log: (msg) => console.log(`[MOCK] ${msg}`),
};
const mockDb: Database = {
  query: () => [{ id: 1, name: "Test" }],
};

const testService = new UserService(mockLogger, mockDb);
testService.getUsers();
```



```python [python]
from abc import ABC, abstractmethod
from typing import Dict, Callable, Any, TypeVar

T = TypeVar('T')

# Dependencies
class Logger(ABC):
    @abstractmethod
    def log(self, message: str) -> None:
        pass

class Database(ABC):
    @abstractmethod
    def query(self, sql: str) -> list:
        pass

# Implementations
class ConsoleLogger(Logger):
    def log(self, message: str) -> None:
        print(f"[LOG] {message}")

class MockDatabase(Database):
    def query(self, sql: str) -> list:
        print(f"[DB] {sql}")
        return []

# Service - receives dependencies
class UserService:
    def __init__(self, logger: Logger, database: Database):
        self.logger = logger
        self.db = database

    def create_user(self, name: str, email: str) -> None:
        self.logger.log(f"Creating user: {name}")
        self.db.query(f"INSERT INTO users VALUES ('{name}', '{email}')")

    def get_users(self) -> None:
        self.logger.log("Fetching users")
        results = self.db.query("SELECT * FROM users")
        self.logger.log(f"Found {len(results)} users")

# Simple DI Container
class Container:
    def __init__(self):
        self.services: Dict[str, Callable] = {}

    def register(self, name: str, factory: Callable) -> None:
        self.services[name] = factory

    def resolve(self, name: str) -> Any:
        if name not in self.services:
            raise ValueError(f"Service not registered: {name}")
        return self.services[name]()

# Usage
if __name__ == "__main__":
    container = Container()
    container.register("logger", lambda: ConsoleLogger())
    container.register("database", lambda: MockDatabase())
    container.register("userService", lambda: UserService(
        container.resolve("logger"),
        container.resolve("database")
    ))

    user_service = container.resolve("userService")
    user_service.create_user("John Doe", "john@example.com")
    user_service.get_users()

    print("\n=== Testing with Mocks ===")
    class MockLogger(Logger):
        def log(self, message: str) -> None:
            print(f"[MOCK] {message}")

    class TestDatabase(Database):
        def query(self, sql: str) -> list:
            return [{"id": 1, "name": "Test"}]

    test_service = UserService(MockLogger(), TestDatabase())
    test_service.get_users()
```

:::

## Haqiqiy hayotdagi misollar (Real-World Examples)

### Spring Framework (Java)

```java
@Component
class UserService {
  @Autowired
  private Logger logger;

  @Autowired
  private Database db;
}
```

### Angular (TypeScript)

```typescript
@Injectable()
class UserService {
  constructor(
    private logger: Logger,
    private http: HttpClient,
  ) {}
}
```

## Afzalliklari (Advantages) ✅

- **Bo'sh bog'liqlik (Loose Coupling)**: Komponentlar mustaqil bo'ladi
- **Test qilish osonligi (Testability)**: Qaramliklarni oson mock qilish mumkin
- **Moslashuvchanlik (Flexibility)**: Amalga oshirishlarni osonlik bilan almashtirish
- **Qayta ishlash (Reusability)**: Komponentlarni turli kontekstlarda ishlatish mumkin
- **Konfiguratsiya**: Markazlashtirilgan sozlamalar
- **SOLID ga muvofiq**: Qaramliklarni inversiyalash tamoyiliga amal qiladi (Dependency inversion)
- **Aniq Qaramliklar**: Komponentga nima kerakligi yaqqol ko'rinib turadi
- **Freymvork qo'llab-quvvatlashi**: Asosiy freymvorklarda mahalliy (native) darajada qo'llab-quvvatlanadi

## Kamchiliklari (Disadvantages) ❌

- **Murakkablik (Complexity)**: Dastlab ko'proq kod yoziladi
- **O'rganish vaqti (Learning Curve)**: Dasturchilar DI ni tushunishlari kerak
- **Konteyner yuklamasi**: DI konteyneri qo'shimcha yuklama (overhead) qo'shadi
- **Sozlash (Configuration)**: O'rnatish va sozlashni talab qiladi
- **Nosozliklarni topish (Debugging)**: Komponentlarning qanday yaratilishini kuzatish qiyinroq
- **Ishlash tezligi (Performance)**: Konteynerdan qidirish (lookup) xarajati bor
- **Test sozlamalari**: Testlar uchun sozlash kerak bo'ladi
- **"Sehr" (Magic)**: Yangi boshlovchilarga "sehr"dek tuyulishi mumkin

## Qachon foydalanish kerak (When to Use) ✅

- **Korporativ ilovalar (Enterprise Applications)**: Keng ko'lamli tizimlarda
- **Jamoaviy ishlab chiqish**: Bir nechta dasturchilar ishlayotganda
- **Testga e'tibor qaratilganda**: Unit testlar muhim bo'lgan loyihalarda
- **Uzoq muddatli**: Moslashuvchanlik muhim bo'lsa
- **Freymvorkka asoslangan**: Freymvork DI ni qo'llab-quvvatlasa
- **Modulli dizayn**: Bir nechta mustaqil modullar bo'lsa
- **Sozlamaga boy (Configuration-Heavy)**: Ko'plab almashtiriluvchi komponentlar bo'lsa
- **Bir nechta amalga oshirishlar**: Turli versiyalar kerak bo'lganda

## Qachon foydalanmaslik kerak (When NOT to Use) ❌

- **Oddiy skriptlar**: Oddiy kodlar uchun ortiqcha yuk
- **Tezkor prototiplash**: Sozlashga ko'p vaqt ketadi
- **Yagona dasturchi**: YAGNI (You Aren't Gonna Need It) tamoyili
- **Tezlik muhim bo'lganda**: Konteynerning qo'shimcha yuklamasi sababli
- **Oddiy xizmatlar**: To'g'ridan-to'g'ri bog'liqliklar yetarli bo'lsa
- **Eski kodlar (Legacy Code)**: Moslashtirish qiyin bo'lsa
- **Mikroservislar**: Har bir xizmat butunlay ajratilgan bo'lsa
- **Tezkor loyihalar**: Tezlik dizayndan ko'ra muhim bo'lsa

## Aloqador Patternlar (Related Patterns)

- **Service Locator**: O'xshash, lekin yondashuv farq qiladi
- **Factory Pattern**: Obyektlarni yaratish uchun
- **Builder Pattern**: Murakkab obyektlarni yaratish uchun
- **Singleton Pattern**: Ko'pincha DI bilan birga ishlatiladi
- **Strategy Pattern**: DI orqali turli usullarni amalga oshirish
