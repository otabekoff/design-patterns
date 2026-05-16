---
title: Service Locator Pattern
description: Centralized registry for locating services
icon: Settings
---

# Service Locator Pattern



## Overview

The **Service Locator** pattern is a centralized registry that provides a single point for obtaining service instances. It acts as a service factory, managing the lifecycle and access to services throughout the application.

Key concepts:

- **Service Registry**: Central location storing service instances
- **Locator**: Responsible for retrieving services
- **Lazy Initialization**: Services created on-demand
- **Centralized Management**: Single point of control

## Purpose

Service Locator aims to:

- Provide centralized service access
- Decouple service consumers from providers
- Manage service lifecycle
- Enable runtime service substitution
- Simplify service management
- Support service configuration

## Problem

Without centralization:

- Services scattered throughout application
- Hard to track which services exist
- Difficult to switch implementations
- Service creation logic duplicated
- Unclear dependencies

```
❌ Scattered Service Creation
const logger = new Logger();
const db = new Database();
const service = new UserService(logger, db);
```

## Solution

Service Locator centralizes access:

```
✅ Service Locator
class ServiceLocator {
  register(name, instance) { /* store */ }
  get(name) { /* retrieve */ }
}

const logger = locator.get('logger');
const db = locator.get('database');
```

## Implementation

::: code-group

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

## Advantages ✅

- **Centralization**: Single point for service management
- **Flexibility**: Easy to swap implementations
- **Lazy Loading**: Services created on demand
- **Singleton Support**: Natural for singleton management
- **Configuration**: Centralized service configuration
- **Decoupling**: Services don't know about each other

## Disadvantages ❌

- **Hidden Dependencies**: Hard to see what services are needed
- **Testing**: Difficult to test in isolation (use mocks carefully)
- **Tight Coupling**: Couples code to locator
- **Anti-Pattern**: Often considered an anti-pattern
- **Runtime Discovery**: Services found at runtime
- **Global State**: Creates implicit global dependencies
- **Debugging**: Hard to trace service access
- **Poor Testability**: Complicates unit testing

## When to Use ✅

- **Legacy Systems**: Retrofitting dependency injection difficult
- **Plugin Architecture**: Dynamic service loading
- **Rapid Prototyping**: Quick service management
- **Simple Projects**: Lightweight service management
- **Configuration-Heavy**: Complex service configuration
- **Runtime Substitution**: Frequently swapping implementations
- **Existing Frameworks**: Framework already uses pattern
- **Startup Code**: Initializing many services

## When NOT to Use ❌

- **New Projects**: Use Dependency Injection instead
- **Testable Code**: Use Dependency Injection
- **Long-Term**: Dependency Injection scales better
- **Team Development**: Clear dependencies preferred
- **Performance-Critical**: Hidden performance costs
- **Microservices**: Each service already isolated
- **Complex Logic**: Hard to debug
- **Code Quality**: Reduces code clarity

## Related Patterns

- **Dependency Injection**: Better alternative
- **Factory Pattern**: For service creation
- **Singleton Pattern**: Often combined
- **Registry Pattern**: Similar concept
- **Façade Pattern**: Simplifies complex services
