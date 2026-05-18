---
title: Read-Write Lock Pattern
description: A concurrency design pattern that allows concurrent reads but requires exclusive access for writes to a shared resource.
icon: Lock
---

# Read-Write Lock Pattern

<CoverImage src="/covers/architectural/read-write-lock.png" alt="Cover">
  <h1>Read Write Lock</h1>
  <p>A giant library door with a lock that allows twenty scholar robots with books to enter simultaneously, but slams shut and turns bright red when a single construction robot with a paintbrush wants to enter.</p>
</CoverImage>

## Overview

The **Read-Write Lock** pattern is a fundamental concurrency design pattern that optimizes access to shared resources in multi-threaded environments. Unlike a standard mutual exclusion lock (Mutex) which serializes all access, a Read-Write Lock distinguishes between read-only operations and modifying (write) operations. It allows multiple threads to read the resource simultaneously but strictly enforces that a write operation requires exclusive access.

In modern systems, where caching, configuration management, and in-memory data grids are prevalent, read operations usually vastly outnumber write operations. Using a standard lock in these scenarios creates an artificial bottleneck. The Read-Write Lock drastically improves throughput by parallelizing reads while safely coordinating writes.

## Purpose

- **Maximize Concurrency:** Allow an arbitrary number of readers to access the shared data concurrently.
- **Ensure Data Integrity:** Prevent readers from viewing partially updated data by providing exclusive access to writers.
- **Prevent Race Conditions:** Guarantee thread safety when multiple threads compete for the same resource.
- **Optimize Read-Heavy Workloads:** Significantly reduce lock contention in applications where reads are much more frequent than writes.

## Problem

Imagine a high-traffic web server caching user profiles in memory. Thousands of requests per second need to read these profiles, while background jobs update them only occasionally.

If you use a simple Mutex to protect the cache, every single read operation must acquire the lock, wait for it if it's held by another thread, and block all other incoming read requests. This essentially forces your application to process requests sequentially, destroying the benefits of multi-threading and severely degrading performance.

```typescript
// Without Read-Write Lock - All access serialized
class SimpleCache {
  private data: Map<string, any> = new Map();
  // A simple boolean or mutex
  private locked = false;

  async get(key: string): Promise<any> {
    // ❌ BAD: Even concurrent reads block each other
    while (this.locked) await sleep(10);
    this.locked = true;
    try {
      return this.data.get(key);
    } finally {
      this.locked = false;
    }
  }

  // ...
}
```

## Solution

The Read-Write Lock splits the locking mechanism into two distinct roles:

1.  **Read Lock (Shared Lock):** Can be acquired by multiple threads simultaneously as long as no thread holds or is waiting for the write lock.
2.  **Write Lock (Exclusive Lock):** Can only be acquired by a single thread when no other threads hold _either_ the read lock or the write lock.

To prevent **Writer Starvation** (a scenario where a constant stream of new readers prevents a waiting writer from ever acquiring the lock), production-grade implementations often include fairness policies or writer-preference queues. This ensures that once a writer requests access, new readers are blocked until the writer completes its task.

## Structure / Flow

1.  **Thread A (Reader)** requests a read lock. It's granted because no writer is active.
2.  **Thread B (Reader)** requests a read lock. It's granted concurrently with Thread A.
3.  **Thread C (Writer)** requests a write lock. It blocks, waiting for Thread A and B to release their read locks.
4.  **Thread D (Reader)** requests a read lock. It blocks (in a writer-preference implementation) to avoid starving Thread C.
5.  **Threads A & B** release their locks.
6.  **Thread C** acquires the write lock exclusively, modifies the data, and releases the lock.
7.  **Thread D** finally acquires its read lock.

## Implementation

Modern languages often provide native, highly optimized implementations of Read-Write locks. Below are implementations demonstrating how to use them idiomatically in enterprise environments.

::: code-group

```typescript [TypeScript]
// In Node.js/TypeScript, concurrency issues typically arise when
// dealing with asynchronous operations (promises) interleaving.
// We implement an async-aware Read-Write Lock.

class AsyncReadWriteLock {
  private readersActive = 0;
  private writerActive = false;
  private readQueue: Array<() => void> = [];
  private writeQueue: Array<() => void> = [];

  async acquireRead(): Promise<void> {
    return new Promise((resolve) => {
      // If a writer is active or waiting, queue the reader (Writer Preference)
      if (this.writerActive || this.writeQueue.length > 0) {
        this.readQueue.push(resolve);
      } else {
        this.readersActive++;
        resolve();
      }
    });
  }

  releaseRead(): void {
    if (this.readersActive === 0) throw new Error("No read locks to release");
    this.readersActive--;

    // If no readers left and a writer is waiting, wake up the next writer
    if (this.readersActive === 0 && this.writeQueue.length > 0) {
      const nextWriter = this.writeQueue.shift();
      this.writerActive = true;
      if (nextWriter) nextWriter();
    }
  }

  async acquireWrite(): Promise<void> {
    return new Promise((resolve) => {
      // If anyone is reading or writing, queue the writer
      if (this.readersActive > 0 || this.writerActive) {
        this.writeQueue.push(resolve);
      } else {
        this.writerActive = true;
        resolve();
      }
    });
  }

  releaseWrite(): void {
    if (!this.writerActive) throw new Error("No write lock to release");
    this.writerActive = false;

    // Wake up all waiting readers or the next waiting writer
    if (this.readQueue.length > 0) {
      const readers = [...this.readQueue];
      this.readQueue = [];
      this.readersActive += readers.length;
      readers.forEach((resolve) => resolve());
    } else if (this.writeQueue.length > 0) {
      const nextWriter = this.writeQueue.shift();
      this.writerActive = true;
      if (nextWriter) nextWriter();
    }
  }
}

// Usage in a Cache Service
class ConfigCache {
  private config: Map<string, any> = new Map();
  private lock = new AsyncReadWriteLock();

  async getConfig(key: string): Promise<any> {
    await this.lock.acquireRead();
    try {
      // Simulate async read operation
      return this.config.get(key);
    } finally {
      this.lock.releaseRead();
    }
  }

  async updateConfig(key: string, value: any): Promise<void> {
    await this.lock.acquireWrite();
    try {
      // Simulate async write operation
      this.config.set(key, value);
    } finally {
      this.lock.releaseWrite();
    }
  }
}
```

```python [Python]
# Python's standard library doesn't have a built-in read-write lock,
# but we can implement a thread-safe one using threading primitives,
# or use third-party libraries like `fasteners`. Here is an implementation
# prioritizing writers to prevent starvation.

import threading
import time
from typing import Dict, Any

class ReadWriteLock:
    def __init__(self):
        self._read_ready = threading.Condition(threading.Lock())
        self._readers_active = 0
        self._writers_waiting = 0
        self._writer_active = False

    def acquire_read(self):
        with self._read_ready:
            # Wait if a writer is active OR waiting (writer preference)
            while self._writer_active or self._writers_waiting > 0:
                self._read_ready.wait()
            self._readers_active += 1

    def release_read(self):
        with self._read_ready:
            self._readers_active -= 1
            if self._readers_active == 0:
                # Notify waiting writers that they can proceed
                self._read_ready.notify_all()

    def acquire_write(self):
        with self._read_ready:
            self._writers_waiting += 1
            # Wait if anyone is reading or writing
            while self._readers_active > 0 or self._writer_active:
                self._read_ready.wait()
            self._writers_waiting -= 1
            self._writer_active = True

    def release_write(self):
        with self._read_ready:
            self._writer_active = False
            # Wake up everyone (readers and writers)
            self._read_ready.notify_all()

# Using a Context Manager for clean syntax
class ReadLockManager:
    def __init__(self, rw_lock: ReadWriteLock):
        self.lock = rw_lock
    def __enter__(self):
        self.lock.acquire_read()
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.lock.release_read()

class WriteLockManager:
    def __init__(self, rw_lock: ReadWriteLock):
        self.lock = rw_lock
    def __enter__(self):
        self.lock.acquire_write()
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.lock.release_write()

# Usage
class SharedDictionary:
    def __init__(self):
        self._data: Dict[str, Any] = {}
        self._lock = ReadWriteLock()

    def get(self, key: str) -> Any:
        with ReadLockManager(self._lock):
            return self._data.get(key)

    def set(self, key: str, value: Any) -> None:
        with WriteLockManager(self._lock):
            self._data[key] = value
```

```java [Java]
// Java provides a highly optimized ReentrantReadWriteLock natively
// in the java.util.concurrent.locks package.

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.Optional;

public class ConcurrentConfigCache {
    private final Map<String, String> cache = new HashMap<>();
    // true enables fairness policy to prevent writer starvation
    private final ReadWriteLock lock = new ReentrantReadWriteLock(true);

    public Optional<String> get(String key) {
        lock.readLock().lock();
        try {
            // Multiple threads can execute this simultaneously
            return Optional.ofNullable(cache.get(key));
        } finally {
            // Always release locks in a finally block!
            lock.readLock().unlock();
        }
    }

    public void put(String key, String value) {
        lock.writeLock().lock();
        try {
            // Only ONE thread can execute this at a time.
            // All readers are blocked until complete.
            cache.put(key, value);
        } finally {
            lock.writeLock().unlock();
        }
    }

    public void clear() {
        lock.writeLock().lock();
        try {
            cache.clear();
        } finally {
            lock.writeLock().unlock();
        }
    }
}
```

```go [Go]
// Go provides sync.RWMutex natively, which is highly idiomatic
// and efficient for protecting shared structs or maps.

package main

import (
	"fmt"
	"sync"
	"time"
)

// UserCache safely handles concurrent reads and writes
type UserCache struct {
	mu    sync.RWMutex
	users map[string]string
}

func NewUserCache() *UserCache {
	return &UserCache{
		users: make(map[string]string),
	}
}

// Get acquires a read lock. Multiple readers can execute this concurrently.
func (c *UserCache) Get(id string) (string, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock() // Defer ensures unlock even on panic

	user, exists := c.users[id]
	return user, exists
}

// Set acquires a write lock. Exclusive access is guaranteed.
func (c *UserCache) Set(id string, data string) {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.users[id] = data
}

func main() {
	cache := NewUserCache()
	cache.Set("u1", "Alice")

	var wg sync.WaitGroup

	// Spawn 100 concurrent readers
	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func(readerID int) {
			defer wg.Done()
			if user, ok := cache.Get("u1"); ok {
				fmt.Printf("Reader %d saw: %s\n", readerID, user)
			}
		}(i)
	}

	// Spawn a concurrent writer
	wg.Add(1)
	go func() {
		defer wg.Done()
		time.Sleep(10 * time.Millisecond) // Let some reads happen
		cache.Set("u1", "Alice Updated")
	}()

	wg.Wait()
}
```

```rust [Rust]
// Rust's standard library provides std::sync::RwLock.
// Due to Rust's ownership model, the RwLock actually owns the data it protects.
// You cannot access the data without locking it, making race conditions impossible at compile time!

use std::collections::HashMap;
use std::sync::{Arc, RwLock};
use std::thread;

// Use Arc to share ownership across threads
type SharedCache = Arc<RwLock<HashMap<String, String>>>;

fn main() {
    let cache: SharedCache = Arc::new(RwLock::new(HashMap::new()));

    // Initial write
    {
        let mut write_guard = cache.write().unwrap();
        write_guard.insert("config_a".to_string(), "value_a".to_string());
        // Write lock released automatically when write_guard drops
    }

    let mut handles = vec![];

    // Spawn concurrent readers
    for i in 0..5 {
        let cache_clone = Arc::clone(&cache);
        let handle = thread::spawn(move || {
            // Acquire read lock. Multiple threads can hold this simultaneously.
            let read_guard = cache_clone.read().unwrap();

            if let Some(val) = read_guard.get("config_a") {
                println!("Reader {} saw: {}", i, val);
            }
        });
        handles.push(handle);
    }

    // Spawn a writer
    let cache_clone_write = Arc::clone(&cache);
    let write_handle = thread::spawn(move || {
        // Acquire write lock. Blocks until all read_guards are dropped.
        let mut write_guard = cache_clone_write.write().unwrap();
        write_guard.insert("config_b".to_string(), "value_b".to_string());
        println!("Writer updated the cache.");
    });

    handles.push(write_handle);

    for handle in handles {
        handle.join().unwrap();
    }
}
```

:::

## Pros and Cons

### Advantages

- **Superior Read Performance:** Dramatically increases throughput in systems where reads exceed writes.
- **Data Consistency:** Prevents dirty reads and state corruption by locking writers exclusively.
- **Reduced Latency:** Readers don't wait for other readers, eliminating unnecessary bottlenecks.
- **Compile-Time Safety (in Rust/Go):** Modern languages bind the lock to the data, ensuring developers cannot bypass the lock.

### Disadvantages

- **Complexity and Overhead:** Managing two states (read and write) requires more CPU cycles and memory than a simple Mutex. If the lock is held for less time than it takes to acquire the lock, a standard Mutex might be faster.
- **Writer Starvation:** Without a fairness policy, continuous read requests can prevent a writer from ever acquiring the lock.
- **Lock Upgrades are Dangerous:** Attempting to upgrade a read lock to a write lock without dropping the read lock first frequently leads to deadlocks.

## When to Use

- **Read-Heavy Caches:** In-memory caching layers (like application-level configurations or routing tables) where data is read hundreds of times for every one write.
- **Configuration Management:** Dynamic application settings that are constantly queried but rarely changed.
- **Shared Read-Only State:** Serving large, mostly static datasets across multiple worker threads.

## When NOT to Use

- **Write-Heavy Workloads:** If writes happen as often or more often than reads, a Read-Write lock provides no benefit and actually adds overhead compared to a standard Mutex.
- **Extremely Fast Critical Sections:** If the critical section (the code inside the lock) executes in a few nanoseconds (e.g., an integer increment), the overhead of coordinating the read-write queues is higher than the lock time itself. Use atomics or a simple Mutex instead.
- **Single-Threaded Contexts:** Node.js (in non-worker contexts) is single-threaded. True multi-threading issues don't exist, though async interleaving issues do (which require async locks).

## Related Patterns

- **Mutex (Mutual Exclusion):** The simpler alternative. Good for write-heavy or extremely brief locking scenarios.
- **Producer-Consumer:** Often works in tandem with Read-Write locks; Consumers read, Producers write.
- **Double-Checked Locking:** Another optimization pattern to reduce locking overhead during lazy initialization.
- **CQRS:** At an architectural level, CQRS splits read and write models, much like this pattern splits read and write locking.
