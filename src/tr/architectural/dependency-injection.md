---
title: Dependency Injection Pattern
description: Passes dependencies into objects rather than having them create dependencies
icon: Wrench
---

# Dependency Injection Pattern



## Overview

**Dependency Injection (DI)** is an architectural pattern that provides objects with their dependencies rather than having them create dependencies themselves. Dependencies are injected from outside the object.

Key concepts:

- **Constructor Injection**: Dependencies passed via constructor
- **Setter Injection**: Dependencies set via properties
- **Interface Injection**: Dependencies via interfaces
- **Container**: Manages dependency creation and injection

## Purpose

Dependency Injection aims to:

- Reduce coupling between components
- Improve testability through mocking
- Enable flexible component composition
- Centralize dependency configuration
- Support multiple implementations
- Promote SOLID principles
- Simplify component reuse

## Problem

Without DI:

- Components tightly coupled
- Hard to test (can't mock dependencies)
- Difficult to swap implementations
- Dependencies buried in code
- Hard to understand component relationships

```
❌ Hard-Coded Dependencies
class UserService {
  private logger = new ConsoleLogger();
  private db = new Database();

  // Can't use different logger or DB
}
```

## Solution

DI provides dependencies externally:

```
✅ Dependency Injection
class UserService {
  constructor(logger: Logger, db: Database) {
    this.logger = logger;
    this.db = db;
  }
  // Dependencies configurable
}
```

## Implementation

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

## Real-World Examples

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

## Advantages ✅

- **Loose Coupling**: Components independent
- **Testability**: Easy to mock dependencies
- **Flexibility**: Swap implementations easily
- **Reusability**: Components usable in different contexts
- **Configuration**: Centralized configuration
- **SOLID Compliant**: Follows dependency inversion
- **Clear Dependencies**: Obvious what component needs
- **Framework Support**: Native support in major frameworks

## Disadvantages ❌

- **Complexity**: More code initially
- **Learning Curve**: Developers need to understand DI
- **Container Overhead**: DI container adds overhead
- **Configuration**: Requires setup and configuration
- **Debugging**: Harder to trace component creation
- **Performance**: Container lookup has cost
- **Testing Setup**: Need to configure for tests
- **Magic**: Can feel like "magic" to beginners

## When to Use ✅

- **Enterprise Applications**: Large-scale systems
- **Team Development**: Multiple developers
- **Testing-Heavy**: Unit testing important
- **Long-Term**: Flexibility matters
- **Framework-Based**: Framework supports DI
- **Modular Design**: Multiple independent modules
- **Configuration-Heavy**: Many swappable components
- **Multiple Implementations**: Need different versions

## When NOT to Use ❌

- **Simple Scripts**: Overkill for simple code
- **Rapid Prototyping**: Too much setup
- **Single Developer**: YAGNI principle
- **Performance-Critical**: Container overhead
- **Simple Services**: Straightforward dependencies
- **Legacy Code**: Retrofitting difficult
- **Microservices**: Each service isolated
- **Quick Projects**: Need speed over design

## Related Patterns

- **Service Locator**: Related but different approach
- **Factory Pattern**: For creating objects
- **Builder Pattern**: Complex object creation
- **Singleton Pattern**: Often used with DI
- **Strategy Pattern**: Different implementations via DI
