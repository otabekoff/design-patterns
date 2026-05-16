---
title: Identity Map Pattern
description: Ensures that each object gets loaded only once by keeping every loaded object in a map.
icon: Fingerprint
---

# Identity Map Pattern

## Overview

The **Identity Map** pattern ensures that each database record is loaded into a single, unique object instance in memory during a session. It acts as a cache for objects retrieved from the database, preventing multiple instances of the same record from existing simultaneously.

Key concepts:

- **Single Instance**: For any given database ID, there is only one object in memory.
- **In-Memory Cache**: Stores objects by their primary key.
- **Lookup First**: Before querying the database, check the map first.
- **Consistency**: Prevents "double-updates" and inconsistent state between two objects representing the same record.

## Purpose

Identity Map aims to:

- Maintain referential integrity in memory.
- Avoid redundant database queries for the same data.
- Ensure that updates to an object are visible to all parts of the application using that record.
- Simplify complex object graphs by avoiding duplicate nodes.

## Problem

Without an Identity Map, loading the same record multiple times creates distinct objects:

```typescript
const user1 = userRepository.findById(1);
const user2 = userRepository.findById(1);

user1.name = "Updated Name";
console.log(user2.name); // Still "Original Name"! ❌
```

This leads to "lost updates" if both objects are saved back to the database.

## Solution

The Identity Map intercepts the load request:

```typescript
const map = new IdentityMap();

function findById(id) {
  if (map.has(id)) return map.get(id); // Returns same instance ✅
  const user = db.query(...);
  map.set(id, user);
  return user;
}
```

## Implementation

::: code-group

```typescript [typescript]
class User {
  constructor(public id: number, public name: string) {}
}

class IdentityMap {
  private static instanceMap = new Map<number, any>();

  static get<T>(id: number): T | undefined {
    return this.instanceMap.get(id);
  }

  static add(id: number, object: any): void {
    this.instanceMap.set(id, object);
  }

  static clear(): void {
    this.instanceMap.clear();
  }
}

class UserRepository {
  findById(id: number): User {
    // 1. Check Identity Map
    const cached = IdentityMap.get<User>(id);
    if (cached) {
      console.log(`[Cache] Found user ${id} in map`);
      return cached;
    }

    // 2. Fetch from DB
    console.log(`[DB] Fetching user ${id} from database...`);
    const user = new User(id, "User " + id);
    
    // 3. Store in Map
    IdentityMap.add(id, user);
    return user;
  }
}

// Usage
const repo = new UserRepository();
const u1 = repo.findById(1);
const u2 = repo.findById(1);

console.log(u1 === u2); // true ✅
```

```python [python]
class User:
    def __init__(self, id_val, name):
        self.id = id_val
        self.name = name

class IdentityMap:
    _instance_map = {}

    @classmethod
    def get(cls, id_val):
        return cls._instance_map.get(id_val)

    @classmethod
    def add(cls, id_val, obj):
        cls._instance_map[id_val] = obj

    @classmethod
    def clear(cls):
        cls._instance_map.clear()

class UserRepository:
    def find_by_id(self, id_val):
        # 1. Check Identity Map
        cached = IdentityMap.get(id_val)
        if cached:
            print(f"[Cache] Found user {id_val} in map")
            return cached

        # 2. Fetch from DB
        print(f"[DB] Fetching user {id_val} from database...")
        user = User(id_val, f"User {id_val}")
        
        # 3. Store in Map
        IdentityMap.add(id_val, user)
        return user

# Usage
repo = UserRepository()
u1 = repo.find_by_id(1)
u2 = repo.find_by_id(1)

print(u1 is u2) # True ✅
```

:::

## Real-World Examples

### Hibernate / JPA
The "First-Level Cache" in Hibernate is a classic Identity Map. It is scoped to the `Session`.

### SQLAlchemy
SQLAlchemy's `Session` maintains an Identity Map for all objects loaded within its scope.

### JavaScript ORMs (TypeORM, MikroORM)
MikroORM uses an Identity Map by default within its `EntityManager` to ensure object uniqueness.

## Advantages ✅

- **Data Consistency**: Prevents multiple objects from representing the same database row.
- **Performance**: Reduces database load by acting as a short-lived cache.
- **Cyclic Reference Support**: Allows loading of complex, circular object structures.

## Disadvantages ❌

- **Memory Usage**: All loaded objects are kept in memory for the duration of the session.
- **Stale Data**: If the database changes externally, the map might hold outdated versions.
- **Scope Management**: Must be carefully scoped (usually per-request) to avoid memory leaks.

## When to Use ✅

- **Session-Based Applications**: Web requests where a transaction spans multiple queries.
- **Complex Object Graphs**: When many objects reference each other.
- **Consistency Critical Apps**: When "lost updates" must be avoided.

## Related Patterns

- **Unit of Work**: Uses Identity Map to track which objects it needs to manage.
- **Data Mapper**: Uses Identity Map to manage the lifecycle of objects it maps.
- **Active Record**: Often implements an internal Identity Map.
