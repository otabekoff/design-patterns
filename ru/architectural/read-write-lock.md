---
title: Read-Write Lock Pattern
description: Allows concurrent reads but exclusive writes to a shared resource.
icon: Lock
---

import { Callout } from "fumadocs-ui/components/callout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "fumadocs-ui/components/tabs";

# Read-Write Lock Pattern

## Overview

The Read-Write Lock pattern is a concurrency design pattern that allows multiple readers to access a shared resource simultaneously while ensuring exclusive access for writers. This improves performance in scenarios with frequent reads and infrequent writes.

### Purpose

- Allow multiple concurrent read operations
- Ensure exclusive write access
- Maximize throughput in read-heavy scenarios
- Prevent race conditions while minimizing contention

## Problem

When multiple threads need to access a shared resource:

- Simple locks serialize all access, including reads
- This wastes parallelism when multiple readers could safely access simultaneously
- Performance degrades in read-heavy workloads
- Threads are blocked unnecessarily

```typescript
// Without Read-Write Lock - All access serialized
class SimpleCache {
  private data: Map<string, any> = new Map();
  private locked = false;

  async get(key: string): Promise<any> {
    // Even reads have to wait for exclusive lock
    while (this.locked) await sleep(10);
    this.locked = true;
    try {
      return this.data.get(key);
    } finally {
      this.locked = false;
    }
  }

  async set(key: string, value: any): Promise<void> {
    while (this.locked) await sleep(10);
    this.locked = true;
    try {
      this.data.set(key, value);
    } finally {
      this.locked = false;
    }
  }
}
```

## Solution

The Read-Write Lock pattern solves this by:

1. Allowing multiple readers simultaneously
2. Granting exclusive access to writers
3. Blocking readers when a writer is active
4. Preventing new readers when a writer is waiting

## Implementation

::: code-group

```typescript [typescript]
class ReadWriteLock {
      private readersCount: number = 0;
      private writersCount: number = 0;
      private readersWaiting: number = 0;
      private writersWaiting: number = 0;
      private conditions = {
        canRead: true,
        canWrite: true
      };

      async acquireRead(): Promise<void> {
        this.readersWaiting++;
        while (this.writersCount > 0 || this.writersWaiting > 0) {
          await new Promise(resolve => setTimeout(resolve, 10));
        }
        this.readersWaiting--;
        this.readersCount++;
      }

      releaseRead(): void {
        this.readersCount--;
      }

      async acquireWrite(): Promise<void> {
        this.writersWaiting++;
        while (this.readersCount > 0 || this.writersCount > 0) {
          await new Promise(resolve => setTimeout(resolve, 10));
        }
        this.writersWaiting--;
        this.writersCount++;
      }

      releaseWrite(): void {
        this.writersCount--;
      }
    }

    // Usage
    class Cache {
      private data: Map<string, any> = new Map();
      private lock = new ReadWriteLock();

      async get(key: string): Promise<any> {
        await this.lock.acquireRead();
        try {
          console.log(`Reading ${key}`);
          return this.data.get(key);
        } finally {
          this.lock.releaseRead();
        }
      }

      async set(key: string, value: any): Promise<void> {
        await this.lock.acquireWrite();
        try {
          console.log(`Writing ${key}`);
          this.data.set(key, value);
        } finally {
          this.lock.releaseWrite();
        }
      }
    }

    // Example
    const cache = new Cache();

    // Multiple concurrent reads - allowed
    Promise.all([
      cache.get('key1'),
      cache.get('key2'),
      cache.get('key3')
    ]);

    // Write blocks readers
    await cache.set('key1', 'value1');
```

  
  
```python [python]
import threading
    import time

    class ReadWriteLock:
        def __init__(self):
            self.readers_count = 0
            self.writers_count = 0
            self.readers_waiting = 0
            self.writers_waiting = 0
            self.lock = threading.Lock()
            self.read_event = threading.Event()
            self.write_event = threading.Event()

        def acquire_read(self):
            with self.lock:
                self.readers_waiting += 1

            while True:
                with self.lock:
                    if self.writers_count == 0 and self.writers_waiting == 0:
                        self.readers_waiting -= 1
                        self.readers_count += 1
                        break
                time.sleep(0.01)

        def release_read(self):
            with self.lock:
                self.readers_count -= 1

        def acquire_write(self):
            with self.lock:
                self.writers_waiting += 1

            while True:
                with self.lock:
                    if self.readers_count == 0 and self.writers_count == 0:
                        self.writers_waiting -= 1
                        self.writers_count += 1
                        break
                time.sleep(0.01)

        def release_write(self):
            with self.lock:
                self.writers_count -= 1

    class Cache:
        def __init__(self):
            self.data = {}
            self.lock = ReadWriteLock()

        def get(self, key):
            self.lock.acquire_read()
            try:
                print(f"Reading {key}")
                return self.data.get(key)
            finally:
                self.lock.release_read()

        def set(self, key, value):
            self.lock.acquire_write()
            try:
                print(f"Writing {key}")
                self.data[key] = value
            finally:
                self.lock.release_write()

    # Example usage
    import concurrent.futures
    cache = Cache()

    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        futures = [
            executor.submit(cache.get, 'key1'),
            executor.submit(cache.get, 'key2'),
            executor.submit(cache.get, 'key3')
        ]
        concurrent.futures.wait(futures)
```

:::

## Real-World Example: Thread-Safe Cache with Read-Write Lock

```typescript
class ThreadSafeCache<T> {
  private cache: Map<string, T> = new Map();
  private lock = new ReadWriteLock();
  private hits: number = 0;
  private misses: number = 0;

  async get(key: string): Promise<T | undefined> {
    await this.lock.acquireRead();
    try {
      const value = this.cache.get(key);
      if (value) {
        this.hits++;
        console.log(`Cache hit for ${key} (total hits: ${this.hits})`);
      } else {
        this.misses++;
        console.log(`Cache miss for ${key} (total misses: ${this.misses})`);
      }
      return value;
    } finally {
      this.lock.releaseRead();
    }
  }

  async set(key: string, value: T): Promise<void> {
    await this.lock.acquireWrite();
    try {
      this.cache.set(key, value);
      console.log(`Cached ${key}`);
    } finally {
      this.lock.releaseWrite();
    }
  }

  async getStats(): Promise<{ hits: number; misses: number; ratio: number }> {
    await this.lock.acquireRead();
    try {
      return {
        hits: this.hits,
        misses: this.misses,
        ratio: this.misses > 0 ? this.hits / this.misses : 0,
      };
    } finally {
      this.lock.releaseRead();
    }
  }

  async clear(): Promise<void> {
    await this.lock.acquireWrite();
    try {
      this.cache.clear();
      console.log("Cache cleared");
    } finally {
      this.lock.releaseWrite();
    }
  }
}

// Usage
const cache = new ThreadSafeCache<string>();

// Simulate multiple concurrent reads
const readOperations = Array(10)
  .fill(null)
  .map((_, i) => cache.get(`key${i % 3}`));

// Single write operation
cache.set("key0", "value0");

// More reads
cache.get("key0");
cache.get("key1");
```

## Advantages

- ✅ Maximizes parallelism for read-heavy workloads
- ✅ Prevents race conditions safely
- ✅ Better performance than simple locks
- ✅ Fair writer scheduling prevents writer starvation
- ✅ Scalable with many readers

## Disadvantages

- ❌ More complex implementation
- ❌ Potential writer starvation if many readers exist
- ❌ Higher overhead than simple locks
- ❌ Context switching overhead with many threads
- ❌ Difficult to debug

::: warn
Ensure proper exception handling in lock-protected regions. Use try-finally to guarantee lock
  release.
:::

## When to Use

- Read-heavy workloads (many more reads than writes)
- Shared cache or lookup table
- Configuration data accessed frequently
- Database connection pools
- Thread-safe collections

## When NOT to Use

- Write-heavy workloads
- Simple single-threaded applications
- Few concurrent accesses
- Lock contention is high
- Simple mutex is sufficient

## Related Patterns

- **Mutex**: Simpler locking mechanism
- **Semaphore**: Lower-level synchronization
- **Producer-Consumer**: Often uses read-write locks
- **Active Object**: Handles concurrency differently
