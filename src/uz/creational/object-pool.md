---
title: Object Pool Pattern
description: Reuses a set of initialized objects rather than creating and destroying them on demand.
icon: Database
---

# Object Pool Pattern

<CoverImage src="/covers/creational/object-pool.png" alt="Cover">
  <h1>Object Pool</h1>
  <p>A luxury swimming pool where cute, tired little robot workers are resting on floaties, while a manager robot stands at the edge with a clipboard, sending one out to work and welcoming another back to rest.</p>
</CoverImage>

## Overview

The Object Pool pattern is a creational design pattern that uses a set of initialized objects kept in a pool instead of allocating and deallocating them on demand. This pattern is particularly useful for expensive object creation.

### Purpose

- Reduce object creation and destruction overhead
- Reuse expensive objects
- Improve performance in resource-constrained environments
- Manage limited resources efficiently

## Problem

Creating and destroying objects frequently can be expensive, especially for:

- Database connections
- Thread instances
- Complex heavy objects
- Memory-intensive objects

This can lead to performance degradation, particularly in high-throughput scenarios.

## Solution

The Object Pool pattern solves this by:

1. Pre-creating a pool of reusable objects
2. Reusing objects instead of creating new ones
3. Returning objects to the pool when done
4. Resetting object state before reuse

## Implementation

::: code-group

```typescript [TypeScript]
// Poolable object interface
interface Poolable {
  reset(): void;
}

// Concrete poolable object
class DatabaseConnection implements Poolable {
  private isInUse: boolean = false;

  connect(url: string): void {
    console.log(`Connecting to ${url}`);
  }

  query(sql: string): void {
    if (!this.isInUse) {
      throw new Error("Connection not acquired from pool");
    }
    console.log(`Executing: ${sql}`);
  }

  reset(): void {
    this.isInUse = false;
    console.log("Connection reset");
  }

  setInUse(inUse: boolean): void {
    this.isInUse = inUse;
  }
}

// Object Pool
class ConnectionPool {
  private available: DatabaseConnection[] = [];
  private inUse: Set<DatabaseConnection> = new Set();
  private maxSize: number;

  constructor(maxSize: number = 10) {
    this.maxSize = maxSize;
    this.initialize();
  }

  private initialize(): void {
    for (let i = 0; i < this.maxSize; i++) {
      const conn = new DatabaseConnection();
      conn.connect("localhost:5432");
      this.available.push(conn);
    }
    console.log(`Pool initialized with ${this.maxSize} connections`);
  }

  acquire(): DatabaseConnection {
    if (this.available.length === 0) {
      throw new Error("No connections available");
    }
    const conn = this.available.pop()!;
    conn.setInUse(true);
    this.inUse.add(conn);
    return conn;
  }

  release(conn: DatabaseConnection): void {
    if (!this.inUse.has(conn)) {
      throw new Error("Connection not from this pool");
    }
    this.inUse.delete(conn);
    conn.reset();
    this.available.push(conn);
  }

  getStatus(): string {
    return `Available: ${this.available.length}, In Use: ${this.inUse.size}`;
  }
}

// Usage
const pool = new ConnectionPool(5);

const conn1 = pool.acquire();
const conn2 = pool.acquire();

conn1.query("SELECT * FROM users");
conn2.query("SELECT * FROM products");

console.log(pool.getStatus()); // Available: 3, In Use: 2

pool.release(conn1);
pool.release(conn2);

console.log(pool.getStatus()); // Available: 5, In Use: 0
```

```python [Python]
from abc import ABC, abstractmethod

    class Poolable(ABC):
        @abstractmethod
        def reset(self):
            pass

    class DatabaseConnection(Poolable):
        def __init__(self):
            self._in_use = False

        def connect(self, url):
            print(f"Connecting to {url}")

        def query(self, sql):
            if not self._in_use:
                raise Exception("Connection not acquired from pool")
            print(f"Executing: {sql}")

        def reset(self):
            self._in_use = False
            print("Connection reset")

        def set_in_use(self, in_use):
            self._in_use = in_use

    class ConnectionPool:
        def __init__(self, max_size=10):
            self.available = []
            self.in_use = set()
            self.max_size = max_size
            self._initialize()

        def _initialize(self):
            for _ in range(self.max_size):
                conn = DatabaseConnection()
                conn.connect("localhost:5432")
                self.available.append(conn)
            print(f"Pool initialized with {self.max_size} connections")

        def acquire(self):
            if not self.available:
                raise Exception("No connections available")
            conn = self.available.pop()
            conn.set_in_use(True)
            self.in_use.add(conn)
            return conn

        def release(self, conn):
            if conn not in self.in_use:
                raise Exception("Connection not from this pool")
            self.in_use.remove(conn)
            conn.reset()
            self.available.append(conn)

        def get_status(self):
            return f"Available: {len(self.available)}, In Use: {len(self.in_use)}"

    # Usage
    pool = ConnectionPool(5)
    conn1 = pool.acquire()
    conn2 = pool.acquire()

    conn1.query("SELECT * FROM users")
    conn2.query("SELECT * FROM products")

    print(pool.get_status())  # Available: 3, In Use: 2

    pool.release(conn1)
    pool.release(conn2)

    print(pool.get_status())  # Available: 5, In Use: 0
```

:::

## Real-World Example: Thread Pool

```typescript
class WorkerThread implements Poolable {
  private taskQueue: Array<() => void> = [];
  private isRunning: boolean = false;

  execute(task: () => void): void {
    this.taskQueue.push(task);
    if (!this.isRunning) {
      this.processQueue();
    }
  }

  private processQueue(): void {
    this.isRunning = true;
    while (this.taskQueue.length > 0) {
      const task = this.taskQueue.shift();
      if (task) {
        task();
      }
    }
    this.isRunning = false;
  }

  reset(): void {
    this.taskQueue = [];
    this.isRunning = false;
    console.log("Worker thread reset");
  }
}

class ThreadPool {
  private available: WorkerThread[] = [];
  private inUse: Set<WorkerThread> = new Set();
  private maxThreads: number;

  constructor(maxThreads: number = 4) {
    this.maxThreads = maxThreads;
    this.initializePool();
  }

  private initializePool(): void {
    for (let i = 0; i < this.maxThreads; i++) {
      this.available.push(new WorkerThread());
    }
  }

  execute(task: () => void): void {
    if (this.available.length > 0) {
      const thread = this.available.pop()!;
      this.inUse.add(thread);
      thread.execute(task);
      this.available.push(thread);
      this.inUse.delete(thread);
    }
  }
}

// Usage
const threadPool = new ThreadPool(4);
threadPool.execute(() => console.log("Task 1"));
threadPool.execute(() => console.log("Task 2"));
threadPool.execute(() => console.log("Task 3"));
```

## Advantages

- ✅ Improved performance through object reuse
- ✅ Reduced garbage collection pressure
- ✅ Better resource management
- ✅ Predictable performance in production
- ✅ Prevents resource exhaustion

## Disadvantages

- ❌ More complex code
- ❌ Requires careful state management
- ❌ Difficult to debug
- ❌ Memory overhead (objects always allocated)
- ❌ Can introduce synchronization issues in concurrent environments

::: warn
Ensure proper state reset when returning objects to the pool. Leftover state can cause subtle
bugs.
:::

## When to Use

- Object creation is expensive
- Objects are frequently created and destroyed
- Resource limits are strict (connections, threads)
- Performance is critical
- High-throughput scenarios

## When NOT to Use

- Object creation is cheap
- Memory is limited
- Objects have complex, hard-to-reset state
- Single-threaded applications
- Few concurrent operations

## Thread Safety

For multi-threaded environments:

```typescript
class ThreadSafeConnectionPool {
  private available: DatabaseConnection[] = [];
  private inUse: Set<DatabaseConnection> = new Set();
  private mutex = { locked: false };

  async acquire(): Promise<DatabaseConnection> {
    // Wait for lock
    while (this.mutex.locked) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    this.mutex.locked = true;
    try {
      if (this.available.length === 0) {
        throw new Error("No connections available");
      }
      const conn = this.available.pop()!;
      this.inUse.add(conn);
      return conn;
    } finally {
      this.mutex.locked = false;
    }
  }
}
```

## Related Patterns

- **Singleton**: Pool instance is often a Singleton
- **Factory Method**: Can create pool objects
- **Prototype**: Can clone objects for the pool
