---
title: Singleton Pattern
description: Ensures a class has only one instance and provides a global access point to it.
icon: CircleDot
---

# Singleton Pattern

<CoverImage src="/covers/creational/singleton.png" alt="Cover">
  <h1>Singleton</h1>
  <p>One single, giant golden egg sitting in a carton of regular white eggs, guarded by a cute tiny security-guard robot with a flashlight.</p>
</CoverImage>

## Overview

The **Singleton** pattern is a creational design pattern that restricts a class to a single instance and provides a global access point to that instance. While straightforward in concept, Singleton is controversial in practice because it trades simplicity for testing difficulty and hidden coupling.

A Singleton solves two problems simultaneously, which itself is a warning sign:

1. **Ensure exactly one instance exists**: Useful when you truly need centralized control over a shared resource.
2. **Provide global access**: Convenient, but often a sign of a deeper design issue.

**Modern perspective**: Most uses of Singleton should be replaced with **Dependency Injection** and explicit dependency passing. Use Singleton only when the pattern genuinely simplifies your architecture without creating testing or maintenance burden.

## Real-World Analogy

Consider a **national capital**: A country has one official capital at any time. It is the central, globally-known reference point for government affairs. However, referencing "the capital" everywhere in your code doesn't mean hardcoding it—you should pass it as a parameter.

Similarly, a configuration system or logger might conceptually need only one instance across your application. But hardcoding access to `Logger.getInstance()` everywhere creates hidden dependencies and makes testing harder than explicitly passing the logger where it is needed.

## The Problem

Without control over instance creation, you risk multiple instances managing the same critical resource:

### Scenario: Inconsistent Configuration

If each module independently loads settings, and one module changes a setting, others don't see it:

```typescript
// ❌ Problem: Multiple independent instances
const config1 = new AppConfig();
const config2 = new AppConfig();

config1.set("theme", "dark");
console.log(config2.get("theme")); // 'light' (Inconsistent state!)
```

### Scenario: Resource Exhaustion

Database connection pools, file handles, or thread pools are expensive. Creating multiple independent pools wastes resources:

```typescript
// ❌ Problem: Each module has its own pool
const dbPool1 = new ConnectionPool(10); // 10 connections
const dbPool2 = new ConnectionPool(10); // 10 more connections
// Total: 20 connections, but designed for 10
```

### Scenario: Synchronization Issues

If multiple parts of your system rely on inconsistent state, concurrency bugs emerge that are hard to trace.

## The Solution

The Singleton pattern enforces instance uniqueness through controlled construction:

1. **Private Constructor**: Prevent direct instantiation via `new`.
2. **Static Instance Storage**: Hold the single instance in a static field.
3. **Static Access Method**: Provide a controlled method to get the instance, creating it on first call (lazy initialization).

```typescript
// ✅ Solution: One authoritative instance
const config1 = AppConfig.getInstance();
const config2 = AppConfig.getInstance();

config1.set("theme", "dark");
console.log(config2.get("theme")); // 'dark' (Consistent!)
console.log(config1 === config2); // true
```

**Key insight**: The pattern guarantees uniqueness but does _not_ guarantee good design. Consider whether explicit dependency injection would be cleaner.

## Implementation

### Core Steps

1. Add a **private static field** to hold the single instance.
2. Declare a **public static method** for retrieving the instance (lazy initialization).
3. Make the **constructor private** to prevent direct construction.
4. Replace all `new ClassName()` calls with `ClassName.getInstance()`.

::: code-group

```typescript [typescript]
/**
 * Database singleton: Lazy initialization, single-threaded safe (JavaScript)
 */
class Database {
  private static instance: Database;
  private connected: boolean = false;

  /**
   * Private constructor prevents direct instantiation.
   */
  private constructor() {
    console.log("Database: Creating instance...");
  }

  /**
   * Lazy initialization: Returns existing instance or creates one on first call.
   */
  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
      Database.instance.connect();
    }
    return Database.instance;
  }

  private connect(): void {
    console.log("Database: Establishing connection...");
    this.connected = true;
  }

  query(sql: string): void {
    if (!this.connected) throw new Error("Not connected");
    console.log(`Database: Executing SQL: ${sql}`);
  }

  isConnected(): boolean {
    return this.connected;
  }
}

// Usage
const db1 = Database.getInstance(); // "Database: Creating instance..."
const db2 = Database.getInstance(); // No output (already created)

console.log(db1 === db2); // true
db1.query("SELECT * FROM users");
```

```python [python]
from threading import Lock

class SingletonMeta(type):
    """
    Metaclass implementation for thread-safe singleton.
    Uses double-checked locking to minimize lock contention.
    """
    _instances = {}
    _lock: Lock = Lock()

    def __call__(cls, *args, **kwargs):
        # First check without lock (performance optimization)
        if cls not in cls._instances:
            # Acquire lock for instance creation
            with cls._lock:
                # Double-check: another thread may have created it
                if cls not in cls._instances:
                    instance = super().__call__(*args, **kwargs)
                    cls._instances[cls] = instance
        return cls._instances[cls]

class Database(metaclass=SingletonMeta):
    """Thread-safe singleton database connection."""

    def __init__(self):
        self.connected = False
        print('Database: Creating instance...')
        self.connect()

    def connect(self) -> None:
        print('Database: Establishing connection...')
        self.connected = True

    def query(self, sql: str) -> None:
        if not self.connected:
            raise RuntimeError('Not connected')
        print(f'Database: Executing SQL: {sql}')

# Usage
db1 = Database()  # "Database: Creating instance..."
db2 = Database()  # No output (already created)

print(db1 is db2)  # True
db1.query('SELECT * FROM users')
```

```java [java]
/**
 * Thread-safe Singleton with double-checked locking.
 * Uses volatile to ensure visibility of instance across threads.
 */
public final class Database {
    // volatile ensures all threads see the most recent instance
    private static volatile Database instance;

    private boolean connected;

    /**
     * Private constructor prevents direct instantiation.
     */
    private Database() {
        System.out.println("Database: Creating instance...");
        connect();
    }

    /**
     * Thread-safe lazy initialization using double-checked locking.
     */
    public static Database getInstance() {
        // First check (no lock) for performance
        if (instance == null) {
            synchronized (Database.class) {
                // Second check (with lock) to prevent race condition
                if (instance == null) {
                    instance = new Database();
                }
            }
        }
        return instance;
    }

    private void connect() {
        System.out.println("Database: Establishing connection...");
        connected = true;
    }

    public void query(String sql) {
        if (!connected) {
            throw new RuntimeException("Not connected");
        }
        System.out.println("Database: Executing SQL: " + sql);
    }

    public boolean isConnected() {
        return connected;
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        Database db1 = Database.getInstance(); // "Database: Creating instance..."
        Database db2 = Database.getInstance(); // No output

        System.out.println(db1 == db2); // true
        db1.query("SELECT * FROM users");
    }
}
```

```go [go]
package main

import (
    "fmt"
    "sync"
)

// Database represents a singleton database connection.
type Database struct {
    connected bool
}

var (
    // Single package-level instance (private)
    instance *Database
    // sync.Once ensures initialization happens exactly once
    once sync.Once
)

// GetInstance returns the singleton Database instance.
// Thread-safe via sync.Once.
func GetInstance() *Database {
    once.Do(func() {
        fmt.Println("Database: Creating instance...")
        instance = &Database{}
        instance.connect()
    })
    return instance
}

func (db *Database) connect() {
    fmt.Println("Database: Establishing connection...")
    db.connected = true
}

func (db *Database) Query(sql string) {
    if !db.connected {
        panic("Not connected")
    }
    fmt.Printf("Database: Executing SQL: %s\n", sql)
}

// Usage
func main() {
    db1 := GetInstance() // "Database: Creating instance..." + connection
    db2 := GetInstance() // No output (already created)

    fmt.Println(db1 == db2) // true
    db1.Query("SELECT * FROM users")
}
```

```rust [rust]
use std::sync::{Arc, Mutex, Once};

/// Lazy-initialized singleton using Arc and Once.
pub struct Database {
    connected: bool,
}

impl Database {
    /// Returns a reference to the singleton instance.
    /// Safe and thread-safe via Rust's type system.
    pub fn get() -> Arc<Mutex<Database>> {
        static mut INSTANCE: Option<Arc<Mutex<Database>>> = None;
        static INIT: Once = Once::new();

        unsafe {
            INIT.call_once(|| {
                println!("Database: Creating instance...");
                let db = Database { connected: false };
                INSTANCE = Some(Arc::new(Mutex::new(db)));
                INSTANCE.as_ref().unwrap().lock().unwrap().connect();
            });

            INSTANCE.as_ref().unwrap().clone()
        }
    }

    fn connect(&mut self) {
        println!("Database: Establishing connection...");
        self.connected = true;
    }

    pub fn query(&self, sql: &str) {
        if !self.connected {
            panic!("Not connected");
        }
        println!("Database: Executing SQL: {}", sql);
    }
}

// Usage
fn main() {
    let db1 = Database::get();
    let db2 = Database::get();

    println!("{:p} == {:p}", db1.as_ptr(), db2.as_ptr()); // Same address
    db1.lock().unwrap().query("SELECT * FROM users");
}
```

:::

### TypeScript: Simple Lazy Initialization

**Advantages of TypeScript approach:**

- Simple and idiomatic to the language.
- Works well in single-threaded JavaScript environments (browsers, Node.js event loop).
- Lazy initialization saves resources if the database is never used.

**Disadvantage:**

- Not thread-safe (though JavaScript is single-threaded by nature).

### Python: Thread-Safe Metaclass

**Advantages of Python approach:**

- Thread-safe via double-checked locking.
- Scales to production multi-threaded environments.
- Metaclass approach is idiomatic Python.

### Java: Double-Checked Locking

**Advantages of Java approach:**

- Explicit synchronization handles thread safety clearly.
- Double-checked locking minimizes lock contention in production.
- Works well for enterprise systems with heavy concurrency.

### Go: Goroutine-Safe with sync.Once

**Advantages of Go approach:**

- `sync.Once` is idiomatic and minimizes boilerplate.
- Goroutine-safe by design.
- Cleaner than manual double-checked locking.
- Reflects Go's philosophy of simplicity.

### Rust: Safe via Type System

**Advantages of Rust approach:**

- Type system enforces thread safety and memory safety.
- `Arc<Mutex<T>>` pattern is idiomatic for shared mutable state.
- No data races possible at compile time.

## Thread Safety and Concurrency

**Single-threaded environments (JavaScript)**: Simple lazy initialization suffices.

**Multi-threaded environments (Java, Python, Go, Rust)**:

- **Java**: Use double-checked locking with `volatile`.
- **Python**: Use metaclass with locks.
- **Go**: Use `sync.Once` (idiomatic and clean).
- **Rust**: Type system prevents races; use `Arc<Mutex<T>>`.

## Lazy vs. Eager Initialization

### Lazy Initialization (Most Common)

```typescript
class Logger {
  private static instance: Logger;

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
}
```

**Pros**: Creates instance only if needed; saves memory.  
**Cons**: First access has initialization overhead; requires thread safety care in multi-threaded environments.

### Eager Initialization

```typescript
class Logger {
  private static instance: Logger = new Logger();

  static getInstance(): Logger {
    return Logger.instance;
  }
}
```

**Pros**: No initialization overhead later; inherently thread-safe.  
**Cons**: Instance always created, even if unused; harder to test (can't replace).

## Advantages and Disadvantages

### ✅ Advantages

- **Guaranteed Uniqueness**: Impossible to have multiple instances.
- **Centralized Access**: No need to pass the instance everywhere.
- **Lazy Initialization**: Resource is created only when first needed.
- **Memory Efficiency**: Single shared object for identical state.

### ❌ Disadvantages

- **Testing Difficulty**: Hard to mock or inject a test double; private constructor blocks customization.
- **Hidden Coupling**: Classes depend on `ClassName.getInstance()`, hiding the dependency.
- **Violates Single Responsibility**: Class manages both its instance lifecycle and business logic.
- **Complicates Refactoring**: If you later need multiple instances, you must refactor all call sites.
- **Hides Architectural Flaws**: Often used as a band-aid for poor design instead of fixing root issues.
- **Thread-Safety Complexity**: Multi-threaded implementations require careful synchronization.

## When to Use

::: tip USE IT WHEN...

- **Shared Resource with True Uniqueness Requirement**: Database connection pools, logger factories, configuration managers where having multiple independent instances would genuinely break functionality.
- **Infrastructure Component**: System-level singletons like thread pools or cache managers that truly benefit from centralized control.
- **Performance Critical**: Initialization is expensive and reusing the same instance saves significant resources.
- **Testing Isn't Difficult**: If your architecture doesn't require testing the Singleton in isolation, the coupling is acceptable.

:::

::: warning AVOID IT WHEN...

- **Testability Matters**: Use **Dependency Injection** instead. Pass the dependency explicitly:

```typescript
// ❌ Hard to test
class UserService {
  private db = Database.getInstance(); // Tightly coupled
}

// ✅ Testable
class UserService {
  constructor(private db: Database) {} // Can inject a mock
}
```

- **You Might Need Multiple Instances**: Singleton makes adding multiple instances later very difficult.
- **The Dependency Is Implicit**: If callers don't see what they depend on, refactoring and understanding becomes harder.

:::

## Common Mistakes

### ❌ Mistake 1: Using Singleton as a Substitute for Dependency Injection

```typescript
// ❌ Bad: Hidden dependency
class PaymentService {
  private config = AppConfig.getInstance();

  process() {
    const apiKey = this.config.get("stripe_key");
  }
}

// ✅ Good: Explicit dependency
class PaymentService {
  constructor(private config: AppConfig) {}

  process() {
    const apiKey = this.config.get("stripe_key");
  }
}
```

**Impact**: The second approach is easier to test, understand, and refactor.

### ❌ Mistake 2: Mutable Singleton State

```typescript
// ❌ Risky: Shared mutable state
class Settings {
  private static instance: Settings;
  public darkMode = false; // Mutable!

  static getInstance(): Settings {
    if (!Settings.instance) {
      Settings.instance = new Settings();
    }
    return Settings.instance;
  }
}

// Elsewhere, state gets modified unexpectedly
const settings = Settings.getInstance();
settings.darkMode = true; // Affects all users
```

**Solution**: Use immutable patterns or explicit change notifications.

### ❌ Mistake 3: Forgetting Thread Safety

```typescript
// ❌ Race condition in multi-threaded environment
class Logger {
  private static instance: Logger;

  static getInstance(): Logger {
    if (!Logger.instance) { // Two threads check simultaneously
      Logger.instance = new Logger(); // Both create instances!
    }
    return Logger.instance;
  }
}

// ✅ Thread-safe version (Go example)
var once sync.Once
func GetLogger() *Logger {
    once.Do(func() {
        instance = &Logger{} // Guaranteed to run once
    })
    return instance
}
```

### ❌ Mistake 4: Circular Initialization Dependency

```typescript
// ❌ Circular initialization
class Logger {
  static getInstance() {
    return Config.getInstance().logger; // Depends on Config
  }
}

class Config {
  constructor() {
    this.logger = Logger.getInstance(); // Depends on Logger
  }
}
// Results in stack overflow or null reference error

// ✅ Solution: Separate initialization
class Logger {
  /* ... */
}
class Config {
  constructor(logger: Logger) {
    this.logger = logger;
  }
}
const logger = Logger.getInstance();
const config = new Config(logger);
```

## Real-World Use Cases

### ✅ Case 1: Logger (With Caveats)

```typescript
class Logger {
  private static instance: Logger;
  private logs: string[] = [];

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(message: string): void {
    const timestamp = new Date().toISOString();
    this.logs.push(`[${timestamp}] ${message}`);
    console.log(`[${timestamp}] ${message}`);
  }

  getLogs(): string[] {
    return [...this.logs];
  }
}

// Usage
const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();

logger1.log("Application started");
console.log(logger2.getLogs()); // Logger is shared
```

**Caveat**: For testability in production, pass the logger as a dependency rather than accessing it globally.

### ✅ Case 2: Database Connection Pool

```typescript
class ConnectionPool {
  private static instance: ConnectionPool;
  private connections: Connection[] = [];
  private readonly maxSize: number = 10;

  private constructor() {
    console.log("Initializing connection pool...");
    for (let i = 0; i < this.maxSize; i++) {
      this.connections.push(new Connection());
    }
  }

  static getInstance(): ConnectionPool {
    if (!ConnectionPool.instance) {
      ConnectionPool.instance = new ConnectionPool();
    }
    return ConnectionPool.instance;
  }

  getConnection(): Connection {
    return this.connections.pop() || new Connection();
  }

  releaseConnection(conn: Connection): void {
    this.connections.push(conn);
  }
}

// Usage across application
const pool = ConnectionPool.getInstance();
const conn = pool.getConnection();
conn.query("SELECT * FROM users");
pool.releaseConnection(conn);
```

### ❌ Case 3: Application State (Often Misused)

```typescript
// ❌ Antipattern: Singleton as global state container
class AppState {
  private static instance: AppState;
  user: User | null = null;
  theme: string = "light";
  notifications: Notification[] = [];

  static getInstance(): AppState {
    if (!AppState.instance) {
      AppState.instance = new AppState();
    }
    return AppState.instance;
  }
}

// Problem: Multiple components depend on this hidden global state
// Refactoring, testing, and understanding become difficult

// ✅ Better: Use state management (Redux, Zustand, etc.)
const appState = createStore((set) => ({
  user: null,
  theme: "light",
  setUser: (user) => set({ user }),
  setTheme: (theme) => set({ theme }),
}));
```

## Related Patterns

- **Factory Method**: Can be implemented as a Singleton to control object creation globally.
- **Abstract Factory**: Often uses Singleton instances as concrete factories.
- **Facade**: Facade objects frequently are Singletons because only one interface to a subsystem is required.
- **Dependency Injection**: The modern, testable alternative to Singleton for managing shared objects.
- **Service Locator**: An older pattern that suffers from similar coupling issues as Singleton (avoid in favor of DI).

## Modern Alternatives

**Dependency Injection Container**:

```typescript
class Container {
  private services = new Map();

  register(name: string, factory: () => any): void {
    this.services.set(name, factory);
  }

  get(name: string): any {
    const factory = this.services.get(name);
    if (!factory) throw new Error(`Service ${name} not found`);
    return factory();
  }
}

// Usage
const container = new Container();
container.register("database", () => new Database());
container.register("logger", () => new Logger());

const db = container.get("database");
const logger = container.get("logger");
```

**Module Pattern (JavaScript/Node.js)**:

```typescript
// database.ts - Module-level singleton
let instance: Database | null = null;

export function getDatabase(): Database {
  if (!instance) {
    instance = new Database();
  }
  return instance;
}

// Other modules import the function
import { getDatabase } from "./database";
const db = getDatabase();
```

## Interview Insights

**Q: When would you use Singleton over Dependency Injection?**

A: Rarely. Dependency Injection is almost always preferable for testable, maintainable code. Use Singleton only for:

- Expensive infrastructure (database pools, thread pools) where a true global instance saves resources.
- System-level concerns where passing the dependency everywhere would pollute function signatures.
- Legacy codebases where refactoring to DI is impractical.

**Q: How do you test code that depends on a Singleton?**

A: Poorly. This is a major drawback. Options:

1. Refactor to use Dependency Injection instead.
2. Use **Seams** (Martin Fowler) to replace the Singleton in tests.
3. Provide a static method to reset the Singleton: `Logger.reset()` for testing.

**Q: What makes Singleton thread-safe?**

A: Proper synchronization:

- **Java**: `volatile` + double-checked locking.
- **Python**: Locks in metaclass.
- **Go**: `sync.Once`.
- **Rust**: Type system + `Arc<Mutex<T>>`.

**Q: How is Singleton different from a static class?**

A:

- **Static class**: All methods are static; no state persists between calls (C#, Java).
- **Singleton**: Instance is stateful and persists across accesses.

Static classes are often preferable for stateless utilities (math functions, helpers).

## References

- Gang of Four: "Design Patterns" (Chapter on Singleton)
- Dependency Injection containers: Spring, NestJS, Autofac
- Concurrency patterns: Java Concurrency in Practice
- Go idioms: https://golang.org/doc/effective_go#concurrency
