---
title: Singleton Pattern
description: Ensures a class has only one instance and provides a global access point to it.
icon: CircleDot
---

![Singleton Concept](/images/patterns/singleton.png)

# Singleton Pattern

## Overview

The **Singleton** pattern is a creational design pattern that ensures a class has only one instance while providing a global access point to this instance. It is one of the simplest yet most debated patterns in software engineering.

The pattern addresses two problems at the same time, violating the _Single Responsibility Principle_:

1. **Ensure that a class has just a single instance**: This is useful for controlling access to shared resources, such as a database, a file system, or a global configuration object.
2. **Provide a global access point to that instance**: This allows any part of the program to access the object without passing it around as a dependency (though this can lead to tight coupling).

## Real-World Analogy

Imagine the **Government** of a country. A country can have only one official government at a time. Regardless of the personal identities of the individuals who form the government, the title "The Government of [Country]" is a global point of access that identifies the group of people in charge.

Similarly, in a software system, you might have a **Configuration Manager** that loads settings from a file. You don't want to load that file ten times in ten different parts of your app; you want one object to hold those settings and provide them to everyone.

## The Problem

Most of the time, we create objects by calling a constructor. But what if you want to prevent users from creating a second instance?

### Scenario: Database Connections

If you create a new database connection object every time you need to make a query, you will soon exhaust the database's connection limit. Even if you don't hit the limit, you're wasting memory and CPU cycles on redundant setup.

### Scenario: Shared State

If two different parts of your application create their own "Settings" objects, and one part changes a setting, the other part won't see that change. This leads to inconsistent application behavior.

```typescript
// ❌ Problem: Multiple instances lead to inconsistency
const settings1 = new Settings();
const settings2 = new Settings();

settings1.setDarkMode(true);
console.log(settings2.isDarkMode()); // false (Inconsistent!)
```

## The Solution

The Singleton pattern implements a "Self-Preservation" mechanism:

1. **Private Constructor**: Make the default constructor private to prevent other objects from using the `new` operator with the Singleton class.
2. **Static Instance Field**: Create a static field that will hold the single instance.
3. **Static Accessor Method**: Create a public static method that acts as a gatekeeper. It checks if an instance already exists; if not, it creates one. If yes, it returns the existing one.

```typescript
// ✅ Solution: One shared instance
const settings1 = Settings.getInstance();
const settings2 = Settings.getInstance();

settings1.setDarkMode(true);
console.log(settings2.isDarkMode()); // true (Perfect sync!)
```

## Implementation

To implement a Singleton, you generally follow these steps:

1. Add a **private static field** to the class for storing the singleton instance.
2. Declare a **public static creation method** for getting the singleton instance.
3. Implement **"lazy initialization"** inside the static method. It should create a new object on its first call and put it into the static field. The method should always return that instance on all subsequent calls.
4. Make the **constructor of the class private**. The static method of the class will still be able to call the constructor, but other objects will not.
5. Go over the client code and replace all direct calls to the singleton's constructor with calls to its static creation method.

::: code-group

```typescript [typescript]
/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
class Database {
  private static instance: Database;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    console.log("Establishing database connection...");
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation lets you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public query(sql: string): void {
    console.log(`Executing SQL: ${sql}`);
  }
}

/**
 * The client code.
 */
function clientCode() {
  const s1 = Database.getInstance();
  const s2 = Database.getInstance();

  if (s1 === s2) {
    console.log("Singleton works, both variables contain the same instance.");
  } else {
    console.log("Singleton failed, variables contain different instances.");
  }
}

clientCode();
```

```python [python]
class SingletonMeta(type):
    """
    The Singleton class can be implemented in different ways in Python. Some
    possible methods include: base class, decorator, metaclass. We will use the
    metaclass because it is best suited for this purpose.
    """

    _instances = {}

    def __call__(cls, *args, **kwargs):
        """
        Possible changes to the value of the `__init__` argument do not affect
        the returned instance.
        """
        if cls not in cls._instances:
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        return cls._instances[cls]


class Database(metaclass=SingletonMeta):
    def query(self, sql: str):
        print(f"Executing SQL: {sql}")


if __name__ == "__main__":
    # The client code.

    s1 = Database()
    s2 = Database()

    if id(s1) == id(s2):
        print("Singleton works, both variables contain the same instance.")
    else:
        print("Singleton failed, variables contain different instances.")
```

```java [java]
/**
 * The Singleton class defines the `getInstance` method that serves as an
 * alternative to constructor and lets clients access the same instance of this
 * class over and over.
 */
public final class Database {
    // The field must be declared volatile so that double check lock would work
    // correctly.
    private static volatile Database instance;

    public String value;

    private Database(String value) {
        this.value = value;
    }

    public static Database getInstance(String value) {
        // The approach taken here is called double-checked locking (DCL). It
        // exists to prevent race condition between multiple threads that may
        // attempt to get singleton instance at the same time, creating separate
        // instances as a result.
        //
        // It may seem that having the `result` variable here is completely
        // pointless. There is, however, a very important caveat when
        // implementing double-checked locking in Java, which is solved by
        // introducing this local variable.
        //
        // You can read more info about DCL issues in Java here:
        // https://refactoring.guru/java-dcl-issue
        Database result = instance;
        if (result != null) {
            return result;
        }
        synchronized(Database.class) {
            if (instance == null) {
                instance = new Database(value);
            }
            return instance;
        }
    }
}
```

:::

## Technical Nuances

### Lazy vs. Eager Initialization

- **Lazy Initialization**: The instance is created only when it is requested for the first time. This saves memory if the object is never used.
- **Eager Initialization**: The instance is created at the time of class loading. This is simpler and inherently thread-safe in most languages but wastes memory if the object is large and unused.

### Thread Safety

In multi-threaded environments, two threads might call `getInstance()` at the exact same millisecond when the instance is still `null`. Both will see that it's `null` and both will create a new instance.

To fix this, you must use **Synchronization** (like `synchronized` in Java or `Lock` in Python) or **Double-Checked Locking** as shown in the Java example above.

## Advantages and Disadvantages

### ✅ Advantages

- **Guaranteed Uniqueness**: You can be 100% sure that a class has a single instance.
- **Strict Control**: You gain absolute control over how and when the instance is accessed.
- **Memory Efficiency**: You avoid creating duplicate objects that hold identical data.
- **Lazy Initialization**: The object is only initialized when actually needed.

### ❌ Disadvantages

- **Violates Single Responsibility Principle**: The class manages its own lifecycle _and_ its business logic.
- **Masks Bad Design**: It's often used as a "quick fix" for global variables, hiding deeper architectural flaws.
- **Testing Difficulties**: Since the constructor is private and the state is global, it's very hard to mock Singletons in unit tests.
- **Tight Coupling**: Clients become tightly coupled to the Singleton class, making it hard to swap implementations.

## When to Use

::: tip USE IT WHEN...

- You need to manage a shared resource (Database, Logger, Config).
- You want to save memory on heavy objects.
- You need to strictly control global state.
  :::

::: warning AVOID IT WHEN...

- You want to write highly testable code.
- You might need multiple instances in the future (e.g., connecting to two databases).
- You can use **Dependency Injection** instead.
  :::

## Related Patterns

- **Abstract Factory**, **Builder**, and **Prototype** can all be implemented as Singletons.
- **Facade** objects are often Singletons because only one Facade object is required.
- **Dependency Injection** is the most common alternative to Singleton, allowing for global access without the rigid constraints.
