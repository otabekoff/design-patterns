---
title: Service Locator
description: Xizmatlarni topish uchun markazlashtirilgan reestr
icon: Settings
---

import { Callout } from "fumadocs-ui/components/callout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "fumadocs-ui/components/tabs";

## Umumiy ko'rinish (Overview)

**Service Locator** patterni - bu xizmat (service) namunalarini olish uchun yagona nuqtani taqdim etadigan markazlashtirilgan reestr. U xizmat fabrikasi (service factory) kabi ishlaydi, ilova bo'ylab xizmatlarning ishlash davrini (lifecycle) va ularga kirishni boshqaradi.

Asosiy tushunchalar:

- **Service Registry (Xizmatlar reestri)**: Xizmat namunalarini saqlaydigan markaziy joy
- **Locator (Qidiruvchi)**: Xizmatlarni olish uchun javobgar
- **Lazy Initialization (Kechiktirilgan initsializatsiya)**: Xizmatlar faqat kerak bo'lganda yaratiladi
- **Centralized Management (Markazlashtirilgan boshqaruv)**: Yagona boshqaruv nuqtasi

## Maqsad (Purpose)

Service Locator patternining maqsadi:

- Xizmatlarga markazlashtirilgan kirishni taqdim etish
- Xizmat iste'molchilarini (consumers) xizmat taqdim etuvchilardan (providers) ajratish (decouple)
- Xizmatning ishlash davrini boshqarish
- Ishlash vaqtida (runtime) xizmatlarni almashtirish imkonini berish
- Xizmatlarni boshqarishni soddalashtirish
- Xizmat konfiguratsiyasini qo'llab-quvvatlash

## Muammo (Problem)

Markazlashtirishsiz ilovalar quyidagi muammolarga duch keladi:

- Xizmatlar ilova bo'ylab sochilib ketgan
- Qaysi xizmatlar mavjudligini kuzatish qiyin
- Implementatsiyalarni almashtirish murakkab
- Xizmat yaratish mantig'i takrorlanadi
- Bog'liqliklar (dependencies) noaniq

```
❌ Sochilib ketgan xizmatlar yaratilishi
const logger = new Logger();
const db = new Database();
const service = new UserService(logger, db);
```

## Yechim (Solution)

Service Locator kirishni markazlashtiradi:

```
✅ Service Locator
class ServiceLocator {
  register(name, instance) { /* saqlash */ }
  get(name) { /* olish */ }
}

const logger = locator.get('logger');
const db = locator.get('database');
```

## Amalga oshirish (Implementation)

::: code-group
<TabsList>
<TabsTrigger value="typescript">TypeScript</TabsTrigger>
<TabsTrigger value="python">Python</TabsTrigger>
</TabsList>


```typescript [typescript]
// Service interfaces
interface Logger {
  log(message: string): void;
}

interface Database {
  query(sql: string): any[];
}

// Service implementations
class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }
}

class MockDatabase implements Database {
  query(sql: string): any[] {
    console.log(`[DB] Executing: ${sql}`);
    return [];
  }
}

// Service Locator
class ServiceLocator {
  private static instance: ServiceLocator;
  private services: Map<string, any> = new Map();
  private factories: Map<string, () => any> = new Map();

  private constructor() {}

  static getInstance(): ServiceLocator {
    if (!ServiceLocator.instance) {
      ServiceLocator.instance = new ServiceLocator();
    }
    return ServiceLocator.instance;
  }

  register(name: string, service: any): void {
    this.services.set(name, service);
    console.log(`✅ Registered service: ${name}`);
  }

  registerFactory(name: string, factory: () => any): void {
    this.factories.set(name, factory);
    console.log(`✅ Registered factory: ${name}`);
  }

  get<T>(name: string): T {
    // Check if service exists
    if (this.services.has(name)) {
      return this.services.get(name);
    }

    // Check if factory exists
    if (this.factories.has(name)) {
      const factory = this.factories.get(name);
      const service = factory();
      this.services.set(name, service);
      return service;
    }

    throw new Error(`Service not found: ${name}`);
  }

  has(name: string): boolean {
    return this.services.has(name) || this.factories.has(name);
  }

  unregister(name: string): void {
    this.services.delete(name);
    this.factories.delete(name);
    console.log(`✅ Unregistered service: ${name}`);
  }
}

// Usage
const locator = ServiceLocator.getInstance();

// Register services
locator.register("logger", new ConsoleLogger());
locator.registerFactory("database", () => new MockDatabase());

// Usage in services
class UserService {
  constructor(private locator: ServiceLocator) {}

  createUser(name: string): void {
    const logger = this.locator.get<Logger>("logger");
    const db = this.locator.get<Database>("database");

    logger.log(`Creating user: ${name}`);
    db.query(`INSERT INTO users VALUES ('${name}')`);
  }

  getUsers(): void {
    const logger = this.locator.get<Logger>("logger");
    const db = this.locator.get<Database>("database");

    logger.log("Fetching users");
    db.query("SELECT * FROM users");
  }
}

// Application
const service = new UserService(locator);
service.createUser("John Doe");
service.getUsers();
```



```python [python]
from typing import Dict, Callable, Any, TypeVar, Generic

T = TypeVar('T')

# Service interfaces
class Logger:
    def log(self, message: str) -> None:
        pass

class Database:
    def query(self, sql: str) -> list:
        pass

# Service implementations
class ConsoleLogger(Logger):
    def log(self, message: str) -> None:
        print(f"[LOG] {message}")

class MockDatabase(Database):
    def query(self, sql: str) -> list:
        print(f"[DB] Executing: {sql}")
        return []

# Service Locator (Singleton)
class ServiceLocator:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.services: Dict[str, Any] = {}
            cls._instance.factories: Dict[str, Callable] = {}
        return cls._instance

    @staticmethod
    def get_instance():
        return ServiceLocator()

    def register(self, name: str, service: Any) -> None:
        self.services[name] = service
        print(f"✅ Registered service: {name}")

    def register_factory(self, name: str, factory: Callable) -> None:
        self.factories[name] = factory
        print(f"✅ Registered factory: {name}")

    def get(self, name: str) -> Any:
        # Check if service exists
        if name in self.services:
            return self.services[name]

        # Check if factory exists
        if name in self.factories:
            factory = self.factories[name]
            service = factory()
            self.services[name] = service
            return service

        raise ValueError(f"Service not found: {name}")

    def has(self, name: str) -> bool:
        return name in self.services or name in self.factories

    def unregister(self, name: str) -> None:
        self.services.pop(name, None)
        self.factories.pop(name, None)
        print(f"✅ Unregistered service: {name}")

# Usage
if __name__ == "__main__":
    locator = ServiceLocator.get_instance()

    # Register services
    locator.register("logger", ConsoleLogger())
    locator.register_factory("database", lambda: MockDatabase())

    # Usage in services
    class UserService:
        def __init__(self, service_locator: ServiceLocator):
            self.locator = service_locator

        def create_user(self, name: str) -> None:
            logger = self.locator.get("logger")
            db = self.locator.get("database")

            logger.log(f"Creating user: {name}")
            db.query(f"INSERT INTO users VALUES ('{name}')")

        def get_users(self) -> None:
            logger = self.locator.get("logger")
            db = self.locator.get("database")

            logger.log("Fetching users")
            db.query("SELECT * FROM users")

    # Application
    service = UserService(locator)
    service.create_user("John Doe")
    service.get_users()
```

:::

## Afzalliklari (Advantages) ✅

- **Markazlashtirish (Centralization)**: Xizmatlarni boshqarish uchun yagona nuqta
- **Moslashuvchanlik (Flexibility)**: Implementatsiyalarni almashtirish oson
- **Kechiktirilgan yuklash (Lazy Loading)**: Xizmatlar talab qilinganda yaratiladi
- **Singleton qo'llab-quvvatlashi**: Singletonlarni boshqarish uchun tabiiy usul
- **Konfiguratsiya (Configuration)**: Markazlashtirilgan xizmat konfiguratsiyasi
- **Ajratish (Decoupling)**: Xizmatlar bir-biri haqida bilmaydi

## Kamchiliklari (Disadvantages) ❌

- **Yashirin bog'liqliklar (Hidden Dependencies)**: Qaysi xizmatlar kerakligini ko'rish qiyin
- **Test qilish (Testing)**: Izolyatsiyada test qilish qiyin (mocklardan ehtiyotkorlik bilan foydalanish kerak)
- **Qattiq bog'liqlik (Tight Coupling)**: Kod Service Locator'ga qattiq bog'lanib qoladi
- **Anti-Pattern (Anti-pattern)**: Ko'pincha anti-pattern deb hisoblanadi
- **Ishlash vaqtida aniqlash (Runtime Discovery)**: Xizmatlar faqat ishlash vaqtida topiladi
- **Global holat (Global State)**: Yashirin global bog'liqliklarni yaratadi
- **Nosozliklarni topish (Debugging)**: Xizmatga kirishni kuzatish qiyin
- **Yomon test qilinuvchanlik (Poor Testability)**: Unit testlarni murakkablashtiradi

## Qachon foydalanish kerak (When to Use) ✅

- **Eski tizimlar (Legacy Systems)**: Dependency Injection'ni qo'shish qiyin bo'lganda
- **Plagin arxitekturasi (Plugin Architecture)**: Xizmatlarni dinamik yuklash
- **Tezkor prototiplash (Rapid Prototyping)**: Xizmatlarni tez boshqarish
- **Oddiy loyihalar (Simple Projects)**: Yengil xizmatlarni boshqarish
- **Og'ir konfiguratsiya (Configuration-Heavy)**: Murakkab xizmat konfiguratsiyasi
- **Ishlash vaqtida almashtirish (Runtime Substitution)**: Implementatsiyalarni tez-tez almashtirish kerak bo'lganda
- **Mavjud freymvorklar (Existing Frameworks)**: Freymvork allaqachon shu patterndan foydalansa
- **Boshlang'ich kod (Startup Code)**: Ko'plab xizmatlarni initsializatsiya qilish

## Qachon foydalanmaslik kerak (When NOT to Use) ❌

- **Yangi loyihalar (New Projects)**: Buning o'rniga Dependency Injection ishlating
- **Test qilinadigan kod (Testable Code)**: Dependency Injection ishlating
- **Uzoq muddatli (Long-Term)**: Dependency Injection yaxshiroq kengayadi
- **Jamoaviy dasturlash (Team Development)**: Aniq bog'liqliklar afzal ko'riladi
- **Ishlash tezligi muhim (Performance-Critical)**: Yashirin ishlash xarajatlari
- **Mikroservislar (Microservices)**: Har bir xizmat allaqachon izolyatsiya qilingan
- **Murakkab mantiq (Complex Logic)**: Nosozliklarni topish (debugging) qiyin
- **Kod sifati (Code Quality)**: Kod ravshanligini pasaytiradi

## Aloqador Patternlar (Related Patterns)

- **Dependency Injection**: Yaxshiroq muqobil (alternative)
- **Factory Pattern**: Xizmatlarni yaratish uchun
- **Singleton Pattern**: Ko'pincha birga ishlatiladi
- **Registry Pattern**: O'xshash tushuncha
- **Façade Pattern**: Murakkab xizmatlarni soddalashtiradi
