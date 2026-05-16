---
title: Builder Pattern
description: Constructs complex objects step by step, separating construction from representation.
icon: Hammer
---


# Builder Pattern

## Overview

The Builder pattern is a creational design pattern that lets you construct complex objects step by step. The pattern allows you to produce different types and representations of an object using the same construction code.

### Purpose

- Construct complex objects in a clear, readable manner
- Separate object construction from its representation
- Allow optional parameters
- Reduce constructor parameter overloading

## Problem

Creating complex objects with many optional parameters leads to:

- Long, hard-to-read constructor parameters
- Multiple constructor overloads
- Mutable objects that can end up in inconsistent states
- Difficult to understand which parameters are required

```typescript
// Without Builder - Hard to use
const house = new House("brick", true, true, false, true, "wooden", "single", true, "granite");
```

## Solution

The Builder pattern solves this by:

1. Creating a builder class that constructs the object step-by-step
2. Providing chainable methods for each property
3. Producing the final object when complete

## Implementation

::: code-group

```typescript [typescript]
// Product
    class House {
      constructor(
        public walls: string,
        public roof: string,
        public windows: number,
        public doors: number,
        public garage: boolean,
        public pool: boolean
      ) {}

      describe(): string {
        return `House with ${this.walls} walls, ${this.roof} roof,
                ${this.windows} windows, ${this.doors} doors,
                ${this.garage ? 'with' : 'without'} garage,
                ${this.pool ? 'with' : 'without'} pool`;
      }
    }

    // Builder
    class HouseBuilder {
      private walls: string = 'brick';
      private roof: string = 'shingles';
      private windows: number = 4;
      private doors: number = 1;
      private garage: boolean = false;
      private pool: boolean = false;

      setWalls(walls: string): HouseBuilder {
        this.walls = walls;
        return this;
      }

      setRoof(roof: string): HouseBuilder {
        this.roof = roof;
        return this;
      }

      setWindows(windows: number): HouseBuilder {
        this.windows = windows;
        return this;
      }

      setDoors(doors: number): HouseBuilder {
        this.doors = doors;
        return this;
      }

      setGarage(garage: boolean): HouseBuilder {
        this.garage = garage;
        return this;
      }

      setPool(pool: boolean): HouseBuilder {
        this.pool = pool;
        return this;
      }

      build(): House {
        return new House(
          this.walls,
          this.roof,
          this.windows,
          this.doors,
          this.garage,
          this.pool
        );
      }
    }

    // Usage
    const house = new HouseBuilder()
      .setWalls('stone')
      .setRoof('slate')
      .setWindows(8)
      .setGarage(true)
      .setPool(true)
      .build();

    console.log(house.describe());
```

  
  
```python [python]
class House:
        def __init__(self, walls, roof, windows, doors, garage, pool):
            self.walls = walls
            self.roof = roof
            self.windows = windows
            self.doors = doors
            self.garage = garage
            self.pool = pool

        def describe(self):
            return f"""House with {self.walls} walls, {self.roof} roof,
                    {self.windows} windows, {self.doors} doors,
                    {'with' if self.garage else 'without'} garage,
                    {'with' if self.pool else 'without'} pool"""

    class HouseBuilder:
        def __init__(self):
            self.walls = 'brick'
            self.roof = 'shingles'
            self.windows = 4
            self.doors = 1
            self.garage = False
            self.pool = False

        def set_walls(self, walls):
            self.walls = walls
            return self

        def set_roof(self, roof):
            self.roof = roof
            return self

        def set_windows(self, windows):
            self.windows = windows
            return self

        def set_doors(self, doors):
            self.doors = doors
            return self

        def set_garage(self, garage):
            self.garage = garage
            return self

        def set_pool(self, pool):
            self.pool = pool
            return self

        def build(self):
            return House(
                self.walls,
                self.roof,
                self.windows,
                self.doors,
                self.garage,
                self.pool
            )

    # Usage
    house = (HouseBuilder()
             .set_walls('stone')
             .set_roof('slate')
             .set_windows(8)
             .set_garage(True)
             .set_pool(True)
             .build())

    print(house.describe())
```

:::

## Real-World Example: SQL Query Builder

```typescript
class QueryBuilder {
  private select: string[] = [];
  private from: string = "";
  private where: string[] = [];
  private orderBy: string[] = [];
  private limit: number | null = null;

  addSelect(...columns: string[]): QueryBuilder {
    this.select.push(...columns);
    return this;
  }

  fromTable(table: string): QueryBuilder {
    this.from = table;
    return this;
  }

  addWhere(condition: string): QueryBuilder {
    this.where.push(condition);
    return this;
  }

  addOrderBy(column: string, direction: "ASC" | "DESC" = "ASC"): QueryBuilder {
    this.orderBy.push(`${column} ${direction}`);
    return this;
  }

  setLimit(limit: number): QueryBuilder {
    this.limit = limit;
    return this;
  }

  build(): string {
    let query = `SELECT ${this.select.join(", ")} FROM ${this.from}`;

    if (this.where.length > 0) {
      query += ` WHERE ${this.where.join(" AND ")}`;
    }

    if (this.orderBy.length > 0) {
      query += ` ORDER BY ${this.orderBy.join(", ")}`;
    }

    if (this.limit) {
      query += ` LIMIT ${this.limit}`;
    }

    return query;
  }
}

// Usage
const query = new QueryBuilder()
  .addSelect("id", "name", "email")
  .fromTable("users")
  .addWhere("age > 18")
  .addWhere('status = "active"')
  .addOrderBy("created_at", "DESC")
  .setLimit(10)
  .build();

console.log(query);
// SELECT id, name, email FROM users WHERE age > 18 AND status = "active" ORDER BY created_at DESC LIMIT 10
```

## Real-World Example: HTTP Request Builder

```typescript
class RequestBuilder {
  private url: string = "";
  private method: "GET" | "POST" | "PUT" | "DELETE" = "GET";
  private headers: Record<string, string> = {};
  private body: any = null;

  setUrl(url: string): RequestBuilder {
    this.url = url;
    return this;
  }

  setMethod(method: "GET" | "POST" | "PUT" | "DELETE"): RequestBuilder {
    this.method = method;
    return this;
  }

  addHeader(key: string, value: string): RequestBuilder {
    this.headers[key] = value;
    return this;
  }

  setBody(body: any): RequestBuilder {
    this.body = body;
    return this;
  }

  build() {
    return {
      url: this.url,
      method: this.method,
      headers: this.headers,
      body: this.body,
    };
  }
}

// Usage
const request = new RequestBuilder()
  .setUrl("https://api.example.com/users")
  .setMethod("POST")
  .addHeader("Content-Type", "application/json")
  .addHeader("Authorization", "Bearer token123")
  .setBody({ name: "John", email: "john@example.com" })
  .build();
```

## Advantages

- ✅ Clear, readable construction code
- ✅ Optional parameters handled elegantly
- ✅ Separates construction from representation
- ✅ Allows step-by-step construction
- ✅ Chainable method calls (fluent interface)
- ✅ Immutable final objects possible

## Disadvantages

- ❌ More code than simple constructors
- ❌ Overkill for simple objects
- ❌ Extra memory for builder instance
- ❌ Additional complexity

## Variations

### Director Pattern

The Builder pattern is often used with a Director class that knows the construction steps:

```typescript
class HouseDirector {
  private builder: HouseBuilder;

  constructor(builder: HouseBuilder) {
    this.builder = builder;
  }

  constructSimpleHouse(): House {
    return this.builder.setWalls("brick").setRoof("shingles").build();
  }

  constructLuxuryHouse(): House {
    return this.builder
      .setWalls("stone")
      .setRoof("slate")
      .setWindows(12)
      .setGarage(true)
      .setPool(true)
      .build();
  }
}
```

## When to Use

- Objects with many optional parameters
- Complex objects with multiple construction steps
- Need to create different representations of the same data
- Want to improve code readability

## When NOT to Use

- Simple objects with few parameters
- Immutability is not needed
- Performance is critical
- Limited memory constraints

## Related Patterns

- **Abstract Factory**: Can work together with Builder
- **Composite**: Builder can construct Composite structures
- **Template Method**: Builder implements construction steps
