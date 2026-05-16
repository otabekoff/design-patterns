---
title: Unit of Work Pattern
description: Tracks all changes to objects during a transaction and writes them atomically.
icon: Boxes
---

# Unit of Work Pattern

## Overview

The **Unit of Work** pattern is an architectural pattern that maintains a list of objects affected by a business transaction and coordinates the writing out of changes and the resolution of concurrency problems.

Key concepts:

- **Transaction Tracking**: Keeps track of all changes (create, update, delete) to objects during a single transaction.
- **Atomic Operations**: Commits all changes to the database in a single batch.
- **Efficiency**: Reduces database calls by grouping operations.
- **Concurrency Control**: Manages multiple changes to the same data.

## Purpose

Unit of Work aims to:

- Ensure data integrity by committing changes atomically.
- Improve performance by minimizing database round-trips.
- Centralize the logic for handling database transactions.
- Keep the domain model clean of persistence-tracking logic.

## Problem

Without Unit of Work, database interaction can lead to issues:

- Inconsistent data if one update fails while another succeeds.
- Poor performance due to numerous small database calls.
- Complex code to track which objects have changed and need saving.
- Difficulty in managing database transactions across multiple repository calls.

```
❌ Manual Tracking
repo1.update(user);
repo2.update(order);
// What if order fails? user is already saved.
```

## Solution

Unit of Work manages the transaction lifecycle:

```
✅ Unit of Work
uow.registerDirty(user);
uow.registerNew(newOrder);
uow.commit(); // Saves both or neither
```

## Implementation

::: code-group

```typescript [typescript]
// Entities
class Entity {
  id: string;
  constructor(id: string) { this.id = id; }
}

class User extends Entity {
  name: string;
  constructor(id: string, name: string) {
    super(id);
    this.name = name;
  }
}

// Unit of Work
class UnitOfWork {
  private newEntities: Set<Entity> = new Set();
  private dirtyEntities: Set<Entity> = new Set();
  private removedEntities: Set<Entity> = new Set();

  registerNew(entity: Entity): void {
    this.newEntities.add(entity);
  }

  registerDirty(entity: Entity): void {
    if (!this.newEntities.has(entity)) {
      this.dirtyEntities.add(entity);
    }
  }

  registerRemoved(entity: Entity): void {
    if (this.newEntities.has(entity)) {
      this.newEntities.delete(entity);
      return;
    }
    this.dirtyEntities.delete(entity);
    this.removedEntities.add(entity);
  }

  commit(): void {
    console.log("--- Starting Transaction ---");
    
    this.newEntities.forEach(e => console.log(`[DB] INSERT: ${e.id}`));
    this.dirtyEntities.forEach(e => console.log(`[DB] UPDATE: ${e.id}`));
    this.removedEntities.forEach(e => console.log(`[DB] DELETE: ${e.id}`));
    
    console.log("✅ Transaction Committed Successfully");
    
    this.clear();
  }

  private clear(): void {
    this.newEntities.clear();
    this.dirtyEntities.clear();
    this.removedEntities.clear();
  }
}

// Usage
const uow = new UnitOfWork();
const user1 = new User("1", "John");
const user2 = new User("2", "Jane");

uow.registerNew(user1);
user2.name = "Jane Doe";
uow.registerDirty(user2);

uow.commit();
```

```python [python]
class Entity:
    def __init__(self, id: str):
        self.id = id

class User(Entity):
    def __init__(self, id: str, name: str):
        super().__init__(id)
        self.name = name

class UnitOfWork:
    def __init__(self):
        self.new_entities = set()
        self.dirty_entities = set()
        self.removed_entities = set()

    def register_new(self, entity):
        self.new_entities.add(entity)

    def register_dirty(self, entity):
        if entity not in self.new_entities:
            self.dirty_entities.add(entity)

    def register_removed(self, entity):
        if entity in self.new_entities:
            self.new_entities.remove(entity)
            return
        self.dirty_entities.discard(entity)
        self.removed_entities.add(entity)

    def commit(self):
        print("--- Starting Transaction ---")
        
        for e in self.new_entities:
            print(f"[DB] INSERT: {e.id}")
        for e in self.dirty_entities:
            print(f"[DB] UPDATE: {e.id}")
        for e in self.removed_entities:
            print(f"[DB] DELETE: {e.id}")
            
        print("✅ Transaction Committed Successfully")
        self.clear()

    def clear(self):
        self.new_entities.clear()
        self.dirty_entities.clear()
        self.removed_entities.clear()

# Usage
uow = UnitOfWork()
user1 = User("1", "John")
user2 = User("2", "Jane")

uow.register_new(user1)
user2.name = "Jane Doe"
uow.register_dirty(user2)

uow.commit()
```

:::

## Real-World Examples

### Entity Framework (C# / .NET)
The `DbContext` acts as both a Unit of Work and a Repository container. Calling `SaveChanges()` commits all tracked changes.

### Hibernate / JPA (Java)
The `Session` (Hibernate) or `EntityManager` (JPA) tracks entities and synchronizes them with the database during a transaction.

### SQLAlchemy (Python)
The `Session` object is a classic Unit of Work implementation that manages object state and flushing to the database.

## Advantages ✅

- **Consistency**: Changes are atomic; either everything is saved or nothing is.
- **Performance**: Groups database operations to reduce network latency.
- **Simplified Client Code**: Clients don't need to manually track changes.
- **Concurrency Management**: Provides a central place to handle versioning and locks.

## Disadvantages ❌

- **Complexity**: Adds an abstraction layer that can be hard to debug.
- **Memory Overhead**: Keeps all affected objects in memory until commit.
- **Long Transactions**: Holding a transaction open for too long can block others.

## When to Use ✅

- **Complex Business Transactions**: When multiple objects are modified together.
- **Performance Critical**: When you need to minimize database round-trips.
- **Consistency Critical**: When atomic updates are mandatory.

## Related Patterns

- **Repository Pattern**: Often used in conjunction with Unit of Work.
- **Data Mapper**: Works behind the scenes to persist tracked objects.
- **Identity Map**: Used by Unit of Work to ensure object uniqueness.
