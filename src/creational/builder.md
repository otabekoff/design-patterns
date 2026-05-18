---
title: Builder Pattern
description: Constructs complex objects step-by-step, separating construction logic from representation.
icon: Hammer
---

# Builder Pattern

<CoverImage src="/covers/creational/builder.png" alt="Cover">
  <h1>Builder</h1>
  <p>A tiny mechanical chef robot carefully stacking ingredients of a gigantic, premium multi-layered hamburger step-by-step using a detailed architectural blueprint.</p>
</CoverImage>

## Overview

The **Builder** pattern is a creational design pattern that lets you construct complex objects step-by-step. It separates the construction process from the object's representation, allowing the same construction logic to produce different representations.

**Key advantage**: Eliminates long constructor parameter lists and improves code readability through method chaining.

**Modern perspective**: In many modern languages, Builder is being replaced by:

- Named parameters (Python, C#)
- Immutable record types (Rust, Java records)
- Dataclass defaults (Python)
- Configuration objects/maps

However, Builder remains valuable for validation-heavy construction, multi-stage building, and creating different representations of the same object.

## Real-World Analogy

Consider **building a custom pizza**. You don't order with a constructor like `Pizza("Margherita", true, false, true, false, "extra cheese")`. Instead, you say:

- Start with a large crust
- Add tomato sauce
- Add mozzarella cheese
- Add pepperoni
- Add extra garlic
- Done

Each step is clear, optional steps are obvious, and the final pizza is exactly what you wanted.

## The Problem

Complex objects with many constructor parameters lead to fragile, hard-to-understand code:

### Scenario: Complex Configuration

```typescript
// ❌ Problem: Constructor with many parameters
const config = new AppConfig(
  "production", // environment
  true, // enableLogging
  false, // enableCaching
  3600, // timeout
  ["192.168.1.1"], // allowedHosts
  true, // enableSSL
  "TLS1.3", // tlsVersion
  "/var/logs", // logPath
  5432, // dbPort
  undefined, // optional feature
  undefined, // another optional
  true, // and another...
);

// Problems:
// - Which parameters are required?
// - Hard to read and understand intent
// - Wrong parameter order breaks everything
// - Adding new parameters requires updating all callers
```

### Scenario: Multiple Representations

```typescript
// ❌ Problem: Multiple constructors for different representations
const pdfReport = new Report(
  "pdf", // format
  "compact", // layout
);

const htmlReport = new Report("html", "detailed");

const csvReport = new Report("csv", "raw");

// Maintainability nightmare with many combinations
```

## The Solution

The Builder pattern solves this by:

1. **Creating a builder class** that holds construction state
2. **Providing chainable methods** for each property
3. **Calling build()** to create the final immutable object
4. **Validating constraints** during building, not in the product

```typescript
// ✅ Solution: Clear, readable, chainable construction
const config = new AppConfigBuilder()
  .environment("production")
  .enableLogging(true)
  .enableCaching(false)
  .timeout(3600)
  .allowedHosts(["192.168.1.1"])
  .enableSSL(true)
  .tlsVersion("TLS1.3")
  .logPath("/var/logs")
  .dbPort(5432)
  .build();

// Clear intent, optional parameters obvious, easy to extend
```

## Implementation

::: code-group

```typescript [TypeScript]
// Immutable configuration object
interface AppConfig {
  environment: string;
  enableLogging: boolean;
  timeout: number;
  allowedHosts: string[];
  tlsVersion: string;
}

// Builder with validation
class AppConfigBuilder {
  private environment: string = "development";
  private enableLogging: boolean = true;
  private timeout: number = 5000;
  private allowedHosts: string[] = ["localhost"];
  private tlsVersion: string = "TLS1.2";

  environment(env: string): AppConfigBuilder {
    if (!["development", "staging", "production"].includes(env)) {
      throw new Error(`Invalid environment: ${env}`);
    }
    this.environment = env;
    return this;
  }

  enableLogging(enable: boolean): AppConfigBuilder {
    this.enableLogging = enable;
    return this;
  }

  timeout(ms: number): AppConfigBuilder {
    if (ms <= 0) throw new Error("Timeout must be positive");
    this.timeout = ms;
    return this;
  }

  allowedHosts(hosts: string[]): AppConfigBuilder {
    if (hosts.length === 0) throw new Error("Must have at least one host");
    this.allowedHosts = hosts;
    return this;
  }

  tlsVersion(version: string): AppConfigBuilder {
    if (!["TLS1.2", "TLS1.3"].includes(version)) {
      throw new Error(`Invalid TLS version: ${version}`);
    }
    this.tlsVersion = version;
    return this;
  }

  build(): AppConfig {
    return {
      environment: this.environment,
      enableLogging: this.enableLogging,
      timeout: this.timeout,
      allowedHosts: this.allowedHosts,
      tlsVersion: this.tlsVersion,
    };
  }
}

// Usage
const prodConfig = new AppConfigBuilder()
  .environment("production")
  .enableLogging(true)
  .timeout(10000)
  .allowedHosts(["api.example.com", "app.example.com"])
  .tlsVersion("TLS1.3")
  .build();

console.log(prodConfig);
```

```python [Python]
from typing import List
from dataclasses import dataclass
from enum import Enum

class Environment(Enum):
    DEVELOPMENT = "development"
    STAGING = "staging"
    PRODUCTION = "production"

@dataclass(frozen=True)
class AppConfig:
    environment: Environment
    enable_logging: bool
    timeout: int
    allowed_hosts: List[str]
    tls_version: str

class AppConfigBuilder:
    def __init__(self):
        self.environment: Environment = Environment.DEVELOPMENT
        self.enable_logging: bool = True
        self.timeout: int = 5000
        self.allowed_hosts: List[str] = ["localhost"]
        self.tls_version: str = "TLS1.2"

    def environment(self, env: Environment) -> "AppConfigBuilder":
        self.environment = env
        return self

    def enable_logging(self, enable: bool) -> "AppConfigBuilder":
        self.enable_logging = enable
        return self

    def timeout(self, ms: int) -> "AppConfigBuilder":
        if ms <= 0:
            raise ValueError("Timeout must be positive")
        self.timeout = ms
        return self

    def allowed_hosts(self, hosts: List[str]) -> "AppConfigBuilder":
        if not hosts:
            raise ValueError("Must have at least one host")
        self.allowed_hosts = hosts
        return self

    def tls_version(self, version: str) -> "AppConfigBuilder":
        if version not in ["TLS1.2", "TLS1.3"]:
            raise ValueError(f"Invalid TLS version: {version}")
        self.tls_version = version
        return self

    def build(self) -> AppConfig:
        return AppConfig(
            environment=self.environment,
            enable_logging=self.enable_logging,
            timeout=self.timeout,
            allowed_hosts=self.allowed_hosts.copy(),
            tls_version=self.tls_version,
        )

# Usage
config = (AppConfigBuilder()
    .environment(Environment.PRODUCTION)
    .enable_logging(True)
    .timeout(10000)
    .allowed_hosts(["api.example.com", "app.example.com"])
    .tls_version("TLS1.3")
    .build())

print(f"Config: {config}")
```

```java [Java]
import java.util.*;

public class AppConfig {
    private final String environment;
    private final boolean enableLogging;
    private final int timeout;
    private final List<String> allowedHosts;
    private final String tlsVersion;

    private AppConfig(Builder builder) {
        this.environment = builder.environment;
        this.enableLogging = builder.enableLogging;
        this.timeout = builder.timeout;
        this.allowedHosts = Collections.unmodifiableList(
            new ArrayList<>(builder.allowedHosts)
        );
        this.tlsVersion = builder.tlsVersion;
    }

    public static class Builder {
        private String environment = "development";
        private boolean enableLogging = true;
        private int timeout = 5000;
        private List<String> allowedHosts = new ArrayList<>(
            Arrays.asList("localhost")
        );
        private String tlsVersion = "TLS1.2";

        public Builder environment(String env) {
            if (!Arrays.asList("development", "staging", "production")
                    .contains(env)) {
                throw new IllegalArgumentException("Invalid environment: " + env);
            }
            this.environment = env;
            return this;
        }

        public Builder enableLogging(boolean enable) {
            this.enableLogging = enable;
            return this;
        }

        public Builder timeout(int ms) {
            if (ms <= 0) throw new IllegalArgumentException(
                "Timeout must be positive"
            );
            this.timeout = ms;
            return this;
        }

        public Builder allowedHosts(List<String> hosts) {
            if (hosts.isEmpty()) throw new IllegalArgumentException(
                "Must have at least one host"
            );
            this.allowedHosts = hosts;
            return this;
        }

        public Builder tlsVersion(String version) {
            if (!Arrays.asList("TLS1.2", "TLS1.3").contains(version)) {
                throw new IllegalArgumentException("Invalid TLS: " + version);
            }
            this.tlsVersion = version;
            return this;
        }

        public AppConfig build() {
            return new AppConfig(this);
        }
    }

    @Override
    public String toString() {
        return "AppConfig{" +
            "environment='" + environment + '\'' +
            ", timeout=" + timeout +
            ", allowedHosts=" + allowedHosts +
            '}';
    }
}

// Usage
AppConfig config = new AppConfig.Builder()
    .environment("production")
    .enableLogging(true)
    .timeout(10000)
    .allowedHosts(Arrays.asList("api.example.com"))
    .tlsVersion("TLS1.3")
    .build();
```

```go [Go]
package main

type AppConfig struct {
    Environment   string
    EnableLogging bool
    Timeout       int
    AllowedHosts  []string
    TLSVersion    string
}

type AppConfigBuilder struct {
    environment   string
    enableLogging bool
    timeout       int
    allowedHosts  []string
    tlsVersion    string
}

func NewAppConfigBuilder() *AppConfigBuilder {
    return &AppConfigBuilder{
        environment:   "development",
        enableLogging: true,
        timeout:       5000,
        allowedHosts:  []string{"localhost"},
        tlsVersion:    "TLS1.2",
    }
}

func (b *AppConfigBuilder) Environment(env string) *AppConfigBuilder {
    validEnvs := map[string]bool{
        "development": true,
        "staging":     true,
        "production":  true,
    }
    if !validEnvs[env] {
        panic("Invalid environment: " + env)
    }
    b.environment = env
    return b
}

func (b *AppConfigBuilder) EnableLogging(enable bool) *AppConfigBuilder {
    b.enableLogging = enable
    return b
}

func (b *AppConfigBuilder) Timeout(ms int) *AppConfigBuilder {
    if ms <= 0 {
        panic("Timeout must be positive")
    }
    b.timeout = ms
    return b
}

func (b *AppConfigBuilder) AllowedHosts(hosts []string) *AppConfigBuilder {
    if len(hosts) == 0 {
        panic("Must have at least one host")
    }
    b.allowedHosts = make([]string, len(hosts))
    copy(b.allowedHosts, hosts)
    return b
}

func (b *AppConfigBuilder) TLSVersion(version string) *AppConfigBuilder {
    validVersions := map[string]bool{
        "TLS1.2": true,
        "TLS1.3": true,
    }
    if !validVersions[version] {
        panic("Invalid TLS version: " + version)
    }
    b.tlsVersion = version
    return b
}

func (b *AppConfigBuilder) Build() *AppConfig {
    return &AppConfig{
        Environment:   b.environment,
        EnableLogging: b.enableLogging,
        Timeout:       b.timeout,
        AllowedHosts:  b.allowedHosts,
        TLSVersion:    b.tlsVersion,
    }
}
```

```rust [Rust]
#[derive(Debug, Clone)]
pub struct AppConfig {
    pub environment: String,
    pub enable_logging: bool,
    pub timeout: u32,
    pub allowed_hosts: Vec<String>,
    pub tls_version: String,
}

pub struct AppConfigBuilder {
    environment: String,
    enable_logging: bool,
    timeout: u32,
    allowed_hosts: Vec<String>,
    tls_version: String,
}

impl Default for AppConfigBuilder {
    fn default() -> Self {
        Self::new()
    }
}

impl AppConfigBuilder {
    pub fn new() -> Self {
        AppConfigBuilder {
            environment: "development".to_string(),
            enable_logging: true,
            timeout: 5000,
            allowed_hosts: vec!["localhost".to_string()],
            tls_version: "TLS1.2".to_string(),
        }
    }

    pub fn environment(mut self, env: &str) -> Self {
        match env {
            "development" | "staging" | "production" => {
                self.environment = env.to_string();
                self
            }
            _ => panic!("Invalid environment: {}", env),
        }
    }

    pub fn enable_logging(mut self, enable: bool) -> Self {
        self.enable_logging = enable;
        self
    }

    pub fn timeout(mut self, ms: u32) -> Self {
        if ms == 0 {
            panic!("Timeout must be positive");
        }
        self.timeout = ms;
        self
    }

    pub fn allowed_hosts(mut self, hosts: Vec<String>) -> Self {
        if hosts.is_empty() {
            panic!("Must have at least one host");
        }
        self.allowed_hosts = hosts;
        self
    }

    pub fn tls_version(mut self, version: &str) -> Self {
        match version {
            "TLS1.2" | "TLS1.3" => {
                self.tls_version = version.to_string();
                self
            }
            _ => panic!("Invalid TLS version: {}", version),
        }
    }

    pub fn build(self) -> AppConfig {
        AppConfig {
            environment: self.environment,
            enable_logging: self.enable_logging,
            timeout: self.timeout,
            allowed_hosts: self.allowed_hosts,
            tls_version: self.tls_version,
        }
    }
}

fn main() {
    let config = AppConfigBuilder::new()
        .environment("production")
        .enable_logging(true)
        .timeout(10000)
        .allowed_hosts(vec![
            "api.example.com".to_string(),
            "app.example.com".to_string(),
        ])
        .tls_version("TLS1.3")
        .build();

    println!("{:?}", config);
}
```

:::

## Real-World Example: SQL Query Builder

A query builder takes a fluent approach to constructing SQL queries, making complex queries readable:

```typescript
class QueryBuilder {
  private select: string[] = [];
  private from: string = "";
  private joins: string[] = [];
  private where: string[] = [];
  private orderBy: string[] = [];
  private limit: number | null = null;
  private offset: number | null = null;

  select(...columns: string[]): QueryBuilder {
    this.select.push(...columns);
    return this;
  }

  from(table: string): QueryBuilder {
    this.from = table;
    return this;
  }

  join(
    table: string,
    condition: string,
    type: "INNER" | "LEFT" | "RIGHT" = "INNER",
  ): QueryBuilder {
    this.joins.push(`${type} JOIN ${table} ON ${condition}`);
    return this;
  }

  where(condition: string, operator: "AND" | "OR" = "AND"): QueryBuilder {
    this.where.push(condition);
    return this;
  }

  orderBy(column: string, direction: "ASC" | "DESC" = "ASC"): QueryBuilder {
    this.orderBy.push(`${column} ${direction}`);
    return this;
  }

  limit(count: number): QueryBuilder {
    this.limit = count;
    return this;
  }

  offset(count: number): QueryBuilder {
    this.offset = count;
    return this;
  }

  build(): string {
    if (this.select.length === 0 || !this.from) {
      throw new Error("SELECT and FROM are required");
    }

    let query = `SELECT ${this.select.join(", ")} FROM ${this.from}`;

    if (this.joins.length > 0) {
      query += ` ${this.joins.join(" ")}`;
    }

    if (this.where.length > 0) {
      query += ` WHERE ${this.where.join(" AND ")}`;
    }

    if (this.orderBy.length > 0) {
      query += ` ORDER BY ${this.orderBy.join(", ")}`;
    }

    if (this.limit !== null) {
      query += ` LIMIT ${this.limit}`;
    }

    if (this.offset !== null) {
      query += ` OFFSET ${this.offset}`;
    }

    return query;
  }
}

// Usage - Complex query becomes readable
const query = new QueryBuilder()
  .select("u.id", "u.name", "u.email", "o.order_id", "o.total")
  .from("users u")
  .join("orders o", "u.id = o.user_id")
  .where("u.age > 18")
  .where("o.status = 'completed'", "AND")
  .orderBy("o.created_at", "DESC")
  .limit(20)
  .offset(0)
  .build();

console.log(query);
// SELECT u.id, u.name, u.email, o.order_id, o.total
// FROM users u
// INNER JOIN orders o ON u.id = o.user_id
// WHERE u.age > 18 AND o.status = 'completed'
// ORDER BY o.created_at DESC
// LIMIT 20 OFFSET 0
```

## Advantages and Disadvantages

### ✅ Advantages

- **Readability**: Clear, chainable method calls document intent
- **Flexibility**: Easy to add/remove optional parameters
- **Immutability**: Final object can be made immutable
- **Validation**: Can validate constraints during building, not after
- **Separation**: Separates construction logic from product logic
- **Testability**: Easy to test different configurations

### ❌ Disadvantages

- **Verbosity**: Requires more code than simple constructors
- **Complexity**: Overkill for simple objects with few parameters
- **Memory overhead**: Builder instance persists in memory
- **Learning curve**: More complex than direct instantiation
- **Mutability**: Builder itself is mutable (though final product can be immutable)
- **Thread safety**: Builder is not thread-safe by default

## Variations

### 1. Director Pattern

Encapsulates construction algorithms in a separate Director class:

```typescript
class HouseBlueprintDirector {
  constructor(private builder: HouseBuilder) {}

  buildSimpleHouse(): House {
    return this.builder.walls("brick").roof("shingles").windows(4).build();
  }

  buildLuxuryHouse(): House {
    return this.builder
      .walls("stone")
      .roof("slate")
      .windows(12)
      .garage(true)
      .pool(true)
      .build();
  }
}
```

### 2. Fluent Interface (Method Chaining)

Returns the builder itself for chaining (as shown in examples).

### 3. Step Builder

Enforce construction step order through different builder classes:

```typescript
class StepBuilder {
  static begin(): StepOneBuilder {
    return new StepOneBuilder();
  }
}

class StepOneBuilder {
  setEnvironment(env: string): StepTwoBuilder {
    return new StepTwoBuilder(env);
  }
}

class StepTwoBuilder {
  private environment: string;

  constructor(env: string) {
    this.environment = env;
  }

  setTimeout(ms: number): StepThreeBuilder {
    return new StepThreeBuilder(this.environment, ms);
  }
}

// Usage enforces order
const config = StepBuilder.begin()
  .setEnvironment("production")
  .setTimeout(10000)
  .build();
```

## When to Use

- Complex objects with many optional parameters
- Multiple representations of the same data
- Step-by-step construction logic
- Validation needed during construction
- Want to avoid constructor parameter pollution
- Creating immutable objects

## When NOT to Use

- Simple objects with 1-3 parameters
- Performance is extremely critical
- Memory constraints are severe
- Simple dataclasses with default values suffice
- Named parameters available in language

## Common Mistakes

### ❌ Mistake 1: No Validation

```typescript
// ❌ Bad: No validation
class ConfigBuilder {
  timeout: number = 0; // Can be 0!

  build() {
    return { timeout: this.timeout };
  }
}

// ✅ Good: Validate before building
class ConfigBuilder {
  private timeout: number = 5000;

  setTimeout(ms: number): ConfigBuilder {
    if (ms <= 0) throw new Error("Timeout must be positive");
    this.timeout = ms;
    return this;
  }

  build() {
    return { timeout: this.timeout };
  }
}
```

### ❌ Mistake 2: Mutable Final Object

```typescript
// ❌ Bad: Final object is mutable
class ConfigBuilder {
  build() {
    return {
      timeout: this.timeout, // Can be modified after!
    };
  }
}

config.timeout = -1; // Oops!

// ✅ Good: Make final object immutable
class ConfigBuilder {
  build(): Readonly<AppConfig> {
    return Object.freeze({
      timeout: this.timeout,
    });
  }
}
```

### ❌ Mistake 3: Missing Required Fields

```typescript
// ❌ Bad: Can build incomplete objects
class ConfigBuilder {
  private url: string = ""; // Empty!

  build() {
    return { url: this.url };
  }
}

// ✅ Good: Enforce required fields
class ConfigBuilder {
  private url: string | null = null;

  setUrl(url: string): ConfigBuilder {
    this.url = url;
    return this;
  }

  build() {
    if (!this.url) throw new Error("URL is required");
    return { url: this.url };
  }
}
```

### ❌ Mistake 4: Overusing for Simple Objects

```typescript
// ❌ Bad: Over-engineered
const point = new PointBuilder().x(10).y(20).build(); // 4 parameters needed!

// ✅ Good: Use simple constructor
const point = new Point(10, 20);

// ✅ Builder for complex cases
const chart = new ChartBuilder()
  .title("Sales")
  .type("bar")
  .animate(true)
  .colors(["red", "blue"])
  .dimensions(800, 600)
  .build();
```

### ❌ Mistake 5: Thread-Unsafe Builders

```typescript
// ❌ Bad: Not thread-safe
class ConfigBuilder {
  private config: any = {};

  setValue(key: string, value: any) {
    this.config[key] = value;
    return this;
  }

  build() {
    return this.config;
  }
}

// ✅ Good: Thread-safe (immutable state)
class ConfigBuilder {
  readonly config: Readonly<Record<string, any>>;

  constructor(config: Record<string, any> = {}) {
    this.config = Object.freeze({ ...config });
  }

  setValue(key: string, value: any) {
    return new ConfigBuilder({ ...this.config, [key]: value });
  }

  build() {
    return this.config;
  }
}
```

## Related Patterns

- **Abstract Factory**: Can work with Builder to create families of objects
- **Composite**: Builder useful for constructing composite tree structures
- **Template Method**: Can define construction steps that subclasses implement
- **Singleton**: Can use Builder pattern for immutable configuration Singletons
- **Prototype**: Builder vs. Prototype - Builder for step-by-step, Prototype for cloning

## Modern Alternatives

### Language Features

- **Python**: Named parameters with defaults replace Builder:
  ```python
  config = AppConfig(environment="prod", timeout=10000)
  ```
- **Kotlin**: Data classes with default parameters
- **C# / C++**: Named and default parameters
- **JavaScript/TypeScript**: Object literals with defaults
  ```typescript
  const config = { ...defaultConfig, timeout: 10000 };
  ```

### Frameworks

- **Spring Boot**: `@ConfigurationProperties` with property files
- **Lombok**: `@Builder` annotation (Java)
- **Dataclasses**: Python 3.7+ with `@dataclass`

### Functional Approaches

- Configuration as immutable maps/dictionaries
- Dependency injection containers
- Configuration management frameworks

## Interview Insights

**Q1: When would you use Builder over simple constructor parameters?**

A: When an object has more than 3-4 parameters, or when many parameters are optional. Builder makes code readable (`config.timeout(1000)`) vs. confusing (`new Config(..., 1000, ...)`). It also allows validation during construction.

**Q2: How is Builder different from Facade?**

A: Facade simplifies a complex subsystem interface. Builder constructs a single complex object step-by-step. Facade is about simplification; Builder is about construction.

**Q3: Should the final object be mutable or immutable?**

A: Typically immutable. The Builder is mutable (holds state), but `build()` returns an immutable object. This provides benefits of both: easy construction + safe final object.

**Q4: How do you handle circular dependencies in Builder?**

A: Set references after `build()` completes, or use a separate `finalize()` method. Or structure so circular dependencies don't occur (favor composition).

**Q5: Why not just use constructors with default values?**

A: Default values don't scale well. With 6 parameters and 4 being optional, you need 4 constructor overloads. Builder provides one clear interface that's obviously incomplete if required fields missing.

**Q6: Can Builder pattern be used with immutable objects?**

A: Yes, and it's the ideal combination. Builder is mutable during construction, then returns an immutable final object. This prevents accidental modification while keeping construction flexible.

**Q7: How does Builder relate to the principle of fluent interfaces?**

A: Fluent interfaces (method chaining) are the mechanism that makes Builder readable. Every method returns `this`, enabling `.method1().method2().build()` chains.
