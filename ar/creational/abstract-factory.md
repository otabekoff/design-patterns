---
title: Abstract Factory Pattern
description: Creates families of related objects without specifying their concrete classes.
icon: Boxes
---


# Abstract Factory Pattern

## Overview

The Abstract Factory pattern is a creational design pattern that lets you produce families of related or dependent objects without specifying their concrete classes.

### Purpose

- Create families of related objects together
- Ensure consistency between created objects
- Isolate client code from concrete classes
- Make it easy to swap entire families of objects

## Problem

Imagine you're building a UI framework that needs to support multiple operating systems (Windows, macOS, Linux). Each OS has different button, checkbox, and window styles. Creating these objects directly would mix OS-specific code throughout your application.

## Solution

The Abstract Factory pattern solves this by:

1. Defining abstract factory interfaces
2. Creating concrete factories for each family
3. Letting the factory create the appropriate objects

## Implementation

::: code-group

```typescript [typescript]
// Abstract products
    abstract class Button {
      abstract click(): void;
    }

    abstract class Checkbox {
      abstract toggle(): void;
    }

    // Concrete products for Windows
    class WindowsButton extends Button {
      click(): void {
        console.log('Windows button clicked');
      }
    }

    class WindowsCheckbox extends Checkbox {
      toggle(): void {
        console.log('Windows checkbox toggled');
      }
    }

    // Concrete products for macOS
    class MacButton extends Button {
      click(): void {
        console.log('Mac button clicked');
      }
    }

    class MacCheckbox extends Checkbox {
      toggle(): void {
        console.log('Mac checkbox toggled');
      }
    }

    // Abstract factory
    abstract class UIFactory {
      abstract createButton(): Button;
      abstract createCheckbox(): Checkbox;
    }

    // Concrete factories
    class WindowsUIFactory extends UIFactory {
      createButton(): Button {
        return new WindowsButton();
      }
      createCheckbox(): Checkbox {
        return new WindowsCheckbox();
      }
    }

    class MacUIFactory extends UIFactory {
      createButton(): Button {
        return new MacButton();
      }
      createCheckbox(): Checkbox {
        return new MacCheckbox();
      }
    }

    // Client code
    class Application {
      private factory: UIFactory;
      private button: Button;
      private checkbox: Checkbox;

      constructor(factory: UIFactory) {
        this.factory = factory;
        this.button = factory.createButton();
        this.checkbox = factory.createCheckbox();
      }

      render(): void {
        this.button.click();
        this.checkbox.toggle();
      }
    }

    // Usage
    const os = 'windows'; // or 'mac'
    let factory: UIFactory;

    if (os === 'windows') {
      factory = new WindowsUIFactory();
    } else {
      factory = new MacUIFactory();
    }

    const app = new Application(factory);
    app.render();
```


  
```python [python]
from abc import ABC, abstractmethod

    # Abstract products
    class Button(ABC):
        @abstractmethod
        def click(self):
            pass

    class Checkbox(ABC):
        @abstractmethod
        def toggle(self):
            pass

    # Concrete products for Windows
    class WindowsButton(Button):
        def click(self):
            print("Windows button clicked")

    class WindowsCheckbox(Checkbox):
        def toggle(self):
            print("Windows checkbox toggled")

    # Concrete products for macOS
    class MacButton(Button):
        def click(self):
            print("Mac button clicked")

    class MacCheckbox(Checkbox):
        def toggle(self):
            print("Mac checkbox toggled")

    # Abstract factory
    class UIFactory(ABC):
        @abstractmethod
        def create_button(self):
            pass

        @abstractmethod
        def create_checkbox(self):
            pass

    # Concrete factories
    class WindowsUIFactory(UIFactory):
        def create_button(self):
            return WindowsButton()

        def create_checkbox(self):
            return WindowsCheckbox()

    class MacUIFactory(UIFactory):
        def create_button(self):
            return MacButton()

        def create_checkbox(self):
            return MacCheckbox()

    # Client code
    class Application:
        def __init__(self, factory: UIFactory):
            self.factory = factory
            self.button = factory.create_button()
            self.checkbox = factory.create_checkbox()

        def render(self):
            self.button.click()
            self.checkbox.toggle()

    # Usage
    os = "windows"
    factory = WindowsUIFactory() if os == "windows" else MacUIFactory()
    app = Application(factory)
    app.render()
```

:::

## Real-World Example: Database Factory

```typescript
interface Connection {
  connect(): void;
  query(sql: string): void;
  close(): void;
}

interface ConnectionPool {
  getConnection(): Connection;
  releaseConnection(conn: Connection): void;
}

// MySQL implementations
class MySQLConnection implements Connection {
  connect(): void {
    console.log("Connecting to MySQL...");
  }
  query(sql: string): void {
    console.log(`MySQL executing: ${sql}`);
  }
  close(): void {
    console.log("Closing MySQL connection");
  }
}

class MySQLConnectionPool implements ConnectionPool {
  private connections: MySQLConnection[] = [];

  getConnection(): Connection {
    return new MySQLConnection();
  }
  releaseConnection(conn: Connection): void {
    this.connections.push(conn as MySQLConnection);
  }
}

// PostgreSQL implementations
class PostgreSQLConnection implements Connection {
  connect(): void {
    console.log("Connecting to PostgreSQL...");
  }
  query(sql: string): void {
    console.log(`PostgreSQL executing: ${sql}`);
  }
  close(): void {
    console.log("Closing PostgreSQL connection");
  }
}

class PostgreSQLConnectionPool implements ConnectionPool {
  private connections: PostgreSQLConnection[] = [];

  getConnection(): Connection {
    return new PostgreSQLConnection();
  }
  releaseConnection(conn: Connection): void {
    this.connections.push(conn as PostgreSQLConnection);
  }
}

// Abstract factory
abstract class DatabaseFactory {
  abstract createConnection(): Connection;
  abstract createConnectionPool(): ConnectionPool;
}

class MySQLFactory extends DatabaseFactory {
  createConnection(): Connection {
    return new MySQLConnection();
  }
  createConnectionPool(): ConnectionPool {
    return new MySQLConnectionPool();
  }
}

class PostgreSQLFactory extends DatabaseFactory {
  createConnection(): Connection {
    return new PostgreSQLConnection();
  }
  createConnectionPool(): ConnectionPool {
    return new PostgreSQLConnectionPool();
  }
}

// Usage
const dbType = "postgresql";
let factory: DatabaseFactory;

if (dbType === "mysql") {
  factory = new MySQLFactory();
} else {
  factory = new PostgreSQLFactory();
}

const connection = factory.createConnection();
connection.connect();
connection.query("SELECT * FROM users");
connection.close();
```

## Advantages

- ✅ Ensures consistency between related objects
- ✅ Isolates client code from concrete classes
- ✅ Easy to swap entire families of objects
- ✅ Follows Open/Closed Principle
- ✅ Centralizes family creation logic

## Disadvantages

- ❌ Can be overkill for simple cases
- ❌ Difficult to add new product types to existing families
- ❌ More complex code structure
- ❌ Many classes and interfaces required

::: warn
If you need to add a new product type (e.g., ScrollBar) to all factories, you must modify every
  factory implementation.
:::

## When to Use

- System needs to work with multiple families of related objects
- The concrete classes should not be hard-coded in client code
- You need to provide a library of objects revealing only interfaces
- Family consistency is important

## When NOT to Use

- Only one family of objects exists
- Simple cases with few types
- Families change frequently and need extension

## Related Patterns

- **Factory Method**: Often implemented within Abstract Factory
- **Singleton**: Factories are often Singletons
- **Builder**: Can be used to create complex family members
