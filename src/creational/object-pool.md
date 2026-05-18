---
title: Object Pool Pattern
description: Reuses a pool of initialized objects rather than creating and destroying them on demand, reducing initialization overhead.
icon: Database
---

# Object Pool Pattern

<CoverImage src="/covers/creational/object-pool.png" alt="Cover">
  <h1>Object Pool</h1>
  <p>A luxury swimming pool where cute, tired little robot workers are resting on floaties, while a manager robot stands at the edge with a clipboard, sending one out to work and welcoming another back to rest.</p>
</CoverImage>

## Overview

The **Object Pool** pattern is a creational design pattern that manages a pool of reusable objects rather than creating new instances and destroying them on demand. Pre-initialized objects are kept in a pool and reused when needed, then returned to the pool.

**Key advantage**: Dramatically improves performance in resource-constrained or high-throughput scenarios by eliminating expensive initialization and garbage collection overhead.

**Modern perspective**: Often replaced by:

- Async/await and connection pooling built into frameworks
- Cloud-native resource management (containers, auto-scaling)
- Language-level object pooling (Java's `ObjectPool`)
- Stream processing frameworks with built-in pooling

However, Object Pool remains essential for:

- Database connection management
- Thread pool executors
- Memory-constrained embedded systems
- Real-time systems with predictable latency

## Real-World Analogy

Consider **a car rental service**:

- Cars (objects) are expensive to manufacture
- Instead of building a new car per customer, maintain a fleet
- Customer "acquires" a car from the available pool
- When done, customer returns it to the pool
- Pool "resets" the car (refuel, clean, inspect)
- Next customer gets the ready-to-use car

This avoids manufacturing overhead and improves utilization.

## The Problem

Creating and destroying objects repeatedly causes multiple issues:

### Scenario: Database Connection Overhead

```typescript
// ❌ Problem: Creating connections is expensive
class Application {
  async processRequest(query: string): Promise<void> {
    // Creating a new connection each time is EXPENSIVE:
    // - TCP handshake (10ms)
    // - Authentication (50ms)
    // - Initial setup (30ms)
    // - Total: ~90ms per request

    const conn = new DatabaseConnection();
    await conn.connect("postgres://db.example.com");
    const result = await conn.query(query);
    await conn.close(); // Cleanup overhead: ~20ms

    // For 1000 req/sec = 90ms * 1000 = 90 seconds of just connection overhead!
  }
}
```

### Scenario: Thread Creation Bottleneck

```typescript
// ❌ Problem: Creating threads is expensive
class WebServer {
  handleRequest(request: Request): void {
    // Creating new thread for each request is expensive:
    // - Thread allocation (50-100KB memory)
    // - Stack initialization
    // - Context switching overhead

    // Result: Slow startup, high memory, limited scalability
    const worker = new Thread(() => {
      processRequest(request);
    });
    worker.start();
  }
}
```

## The Solution

The Object Pool pattern solves this by:

1. **Pre-initializing expensive objects** once during startup
2. **Maintaining a pool of ready-to-use objects**
3. **Acquiring objects from pool** instead of creating
4. **Resetting objects** before return to pool
5. **Returning objects to pool** for reuse

```typescript
// ✅ Solution: Reuse from pool
class Application {
  private connectionPool: ConnectionPool;

  constructor() {
    // One-time expensive initialization
    this.connectionPool = new ConnectionPool(10);
  }

  async processRequest(query: string): Promise<void> {
    // Acquisition is O(1) - just get from pool (~0.1ms)
    const conn = this.connectionPool.acquire();

    try {
      const result = await conn.query(query); // Reuse existing connection
    } finally {
      this.connectionPool.release(conn); // Return to pool for reuse
    }

    // For 1000 req/sec = 0.1ms * 1000 = 100ms total (vs. 90sec without pooling)
  }
}
```

## Implementation

::: code-group

```typescript [TypeScript]
// Poolable interface
interface Poolable {
  reset(): void;
  isAvailable(): boolean;
}

// Reusable connection object
class PooledConnection implements Poolable {
  private id: string;
  private connection: any;
  private inUse: boolean = false;
  private createdAt: number = Date.now();

  constructor(id: string) {
    this.id = id;
    this.connection = this.initializeConnection();
  }

  private initializeConnection(): any {
    // Simulate expensive connection setup
    return {
      url: "postgres://localhost:5432",
      authenticated: true,
      queryCount: 0,
    };
  }

  acquire(): void {
    if (this.inUse) {
      throw new Error(`Connection ${this.id} already in use`);
    }
    this.inUse = true;
  }

  isAvailable(): boolean {
    return !this.inUse;
  }

  async execute(sql: string): Promise<any[]> {
    if (!this.inUse) {
      throw new Error("Connection not acquired from pool");
    }
    this.connection.queryCount++;
    // Simulate query execution
    return [];
  }

  reset(): void {
    this.inUse = false;
    this.connection.queryCount = 0;
    // Clear any prepared statements, result sets, etc.
  }

  getId(): string {
    return this.id;
  }

  getAge(): number {
    return Date.now() - this.createdAt;
  }
}

// Object pool implementation
class ConnectionPool {
  private available: PooledConnection[] = [];
  private inUse: Set<PooledConnection> = new Set();
  private maxSize: number;
  private connectionCounter: number = 0;
  private acquireWaiters: Array<(conn: PooledConnection) => void> = [];

  constructor(maxSize: number = 10) {
    this.maxSize = maxSize;
    this.initializePool();
  }

  private initializePool(): void {
    for (let i = 0; i < this.maxSize; i++) {
      const conn = new PooledConnection(`conn-${++this.connectionCounter}`);
      this.available.push(conn);
    }
    console.log(`ConnectionPool: Initialized with ${this.maxSize} connections`);
  }

  acquire(): PooledConnection {
    if (this.available.length > 0) {
      const conn = this.available.pop()!;
      conn.acquire();
      this.inUse.add(conn);
      return conn;
    }

    if (this.inUse.size < this.maxSize) {
      const conn = new PooledConnection(`conn-${++this.connectionCounter}`);
      conn.acquire();
      this.inUse.add(conn);
      return conn;
    }

    throw new Error(
      `Pool exhausted: ${this.inUse.size}/${this.maxSize} connections in use`,
    );
  }

  release(conn: PooledConnection): void {
    if (!this.inUse.has(conn)) {
      throw new Error("Connection not from this pool");
    }
    this.inUse.delete(conn);
    conn.reset();

    // Check for aged connections
    if (conn.getAge() > 3600000) {
      // 1 hour
      console.log(`Discarding aged connection: ${conn.getId()}`);
      return;
    }

    this.available.push(conn);

    // Notify waiting threads if any
    if (this.acquireWaiters.length > 0) {
      const waiter = this.acquireWaiters.shift();
      if (waiter) waiter(conn);
    }
  }

  getStatus(): {
    available: number;
    inUse: number;
    total: number;
  } {
    return {
      available: this.available.length,
      inUse: this.inUse.size,
      total: this.available.length + this.inUse.size,
    };
  }

  async acquireAsync(timeout: number = 5000): Promise<PooledConnection> {
    try {
      return this.acquire();
    } catch (e) {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          reject(new Error("Pool acquire timeout"));
        }, timeout);

        this.acquireWaiters.push((conn) => {
          clearTimeout(timer);
          resolve(conn);
        });
      });
    }
  }

  drainPool(): void {
    this.available = [];
    this.inUse.clear();
    console.log("ConnectionPool: Drained");
  }
}

// Usage
const pool = new ConnectionPool(5);

try {
  const conn1 = pool.acquire();
  const conn2 = pool.acquire();

  console.log(pool.getStatus()); // { available: 3, inUse: 2, total: 5 }

  pool.release(conn1);
  console.log(pool.getStatus()); // { available: 4, inUse: 1, total: 5 }

  pool.release(conn2);
  console.log(pool.getStatus()); // { available: 5, inUse: 0, total: 5 }
} catch (error) {
  console.error(error);
}
```

```python [Python]
from abc import ABC, abstractmethod
from threading import Lock, Event
from time import time
from typing import List, Optional

class Poolable(ABC):
    @abstractmethod
    def reset(self) -> None:
        pass

    @abstractmethod
    def is_available(self) -> bool:
        pass

class PooledConnection(Poolable):
    def __init__(self, connection_id: str):
        self.id = connection_id
        self.connection = self._initialize_connection()
        self.in_use = False
        self.created_at = time()

    def _initialize_connection(self) -> dict:
        # Simulate expensive connection setup
        return {
            "url": "postgres://localhost:5432",
            "authenticated": True,
            "query_count": 0,
        }

    def acquire(self) -> None:
        if self.in_use:
            raise RuntimeError(f"Connection {self.id} already in use")
        self.in_use = True

    def is_available(self) -> bool:
        return not self.in_use

    def execute(self, sql: str) -> list:
        if not self.in_use:
            raise RuntimeError("Connection not acquired from pool")
        self.connection["query_count"] += 1
        return []

    def reset(self) -> None:
        self.in_use = False
        self.connection["query_count"] = 0

    def get_id(self) -> str:
        return self.id

    def get_age(self) -> float:
        return time() - self.created_at

class ConnectionPool:
    def __init__(self, max_size: int = 10):
        self.available: List[PooledConnection] = []
        self.in_use: set = set()
        self.max_size = max_size
        self.connection_counter = 0
        self.lock = Lock()
        self.available_event = Event()
        self._initialize_pool()

    def _initialize_pool(self) -> None:
        for _ in range(self.max_size):
            conn = PooledConnection(f"conn-{self.connection_counter}")
            self.connection_counter += 1
            self.available.append(conn)
        print(f"ConnectionPool: Initialized with {self.max_size} connections")

    def acquire(self, timeout: Optional[float] = None) -> PooledConnection:
        with self.lock:
            if self.available:
                conn = self.available.pop()
                conn.acquire()
                self.in_use.add(conn)
                return conn

            if len(self.in_use) < self.max_size:
                conn = PooledConnection(f"conn-{self.connection_counter}")
                self.connection_counter += 1
                conn.acquire()
                self.in_use.add(conn)
                return conn

        raise RuntimeError(
            f"Pool exhausted: {len(self.in_use)}/{self.max_size} in use"
        )

    def release(self, conn: PooledConnection) -> None:
        with self.lock:
            if conn not in self.in_use:
                raise RuntimeError("Connection not from this pool")
            self.in_use.remove(conn)

            # Check for aged connections
            if conn.get_age() > 3600:  # 1 hour
                print(f"Discarding aged connection: {conn.get_id()}")
                return

            conn.reset()
            self.available.append(conn)
            self.available_event.set()

    def get_status(self) -> dict:
        with self.lock:
            return {
                "available": len(self.available),
                "in_use": len(self.in_use),
                "total": len(self.available) + len(self.in_use),
            }

    def drain_pool(self) -> None:
        with self.lock:
            self.available.clear()
            self.in_use.clear()
        print("ConnectionPool: Drained")

# Usage
pool = ConnectionPool(5)
conn1 = pool.acquire()
conn2 = pool.acquire()
print(pool.get_status())  # {'available': 3, 'in_use': 2, 'total': 5}

pool.release(conn1)
pool.release(conn2)
print(pool.get_status())  # {'available': 5, 'in_use': 0, 'total': 5}
```

```java [Java]
import java.util.*;
import java.util.concurrent.*;

interface Poolable {
    void reset();
    boolean isAvailable();
}

class PooledConnection implements Poolable {
    private final String id;
    private final Map<String, Object> connection;
    private boolean inUse = false;
    private long createdAt = System.currentTimeMillis();

    public PooledConnection(String id) {
        this.id = id;
        this.connection = initializeConnection();
    }

    private Map<String, Object> initializeConnection() {
        Map<String, Object> conn = new HashMap<>();
        conn.put("url", "postgres://localhost:5432");
        conn.put("authenticated", true);
        conn.put("queryCount", 0);
        return conn;
    }

    public void acquire() {
        if (inUse) throw new RuntimeException("Connection already in use");
        inUse = true;
    }

    @Override
    public boolean isAvailable() {
        return !inUse;
    }

    public List<Object> execute(String sql) {
        if (!inUse) throw new RuntimeException("Connection not acquired from pool");
        Integer count = (Integer) connection.get("queryCount");
        connection.put("queryCount", count + 1);
        return new ArrayList<>();
    }

    @Override
    public void reset() {
        inUse = false;
        connection.put("queryCount", 0);
    }

    public String getId() {
        return id;
    }

    public long getAge() {
        return System.currentTimeMillis() - createdAt;
    }
}

class ConnectionPool {
    private final Queue<PooledConnection> available = new LinkedList<>();
    private final Set<PooledConnection> inUse = Collections.synchronizedSet(
        new HashSet<>()
    );
    private final int maxSize;
    private int connectionCounter = 0;
    private final Object lock = new Object();

    public ConnectionPool(int maxSize) {
        this.maxSize = maxSize;
        initializePool();
    }

    private void initializePool() {
        for (int i = 0; i < maxSize; i++) {
            available.offer(
                new PooledConnection("conn-" + (++connectionCounter))
            );
        }
        System.out.println(
            "ConnectionPool: Initialized with " + maxSize + " connections"
        );
    }

    public PooledConnection acquire() {
        synchronized (lock) {
            PooledConnection conn = available.poll();
            if (conn != null) {
                conn.acquire();
                inUse.add(conn);
                return conn;
            }

            if (inUse.size() < maxSize) {
                conn = new PooledConnection("conn-" + (++connectionCounter));
                conn.acquire();
                inUse.add(conn);
                return conn;
            }
        }
        throw new RuntimeException("Pool exhausted");
    }

    public void release(PooledConnection conn) {
        synchronized (lock) {
            if (!inUse.remove(conn)) {
                throw new RuntimeException("Connection not from this pool");
            }

            if (conn.getAge() > 3600000) { // 1 hour
                System.out.println(
                    "Discarding aged connection: " + conn.getId()
                );
                return;
            }

            conn.reset();
            available.offer(conn);
        }
    }

    public Map<String, Integer> getStatus() {
        synchronized (lock) {
            Map<String, Integer> status = new HashMap<>();
            status.put("available", available.size());
            status.put("inUse", inUse.size());
            status.put("total", available.size() + inUse.size());
            return status;
        }
    }
}
```

```go [Go]
package main

import (
    "sync"
    "time"
)

type Poolable interface {
    Reset()
    IsAvailable() bool
}

type PooledConnection struct {
    ID        string
    inUse     bool
    createdAt time.Time
    conn      map[string]interface{}
    mu        sync.Mutex
}

func NewPooledConnection(id string) *PooledConnection {
    return &PooledConnection{
        ID:        id,
        inUse:     false,
        createdAt: time.Now(),
        conn: map[string]interface{}{
            "url":        "postgres://localhost:5432",
            "query_count": 0,
        },
    }
}

func (pc *PooledConnection) Acquire() {
    pc.mu.Lock()
    defer pc.mu.Unlock()
    if pc.inUse {
        panic("Connection already in use")
    }
    pc.inUse = true
}

func (pc *PooledConnection) IsAvailable() bool {
    pc.mu.Lock()
    defer pc.mu.Unlock()
    return !pc.inUse
}

func (pc *PooledConnection) Execute(sql string) []interface{} {
    pc.mu.Lock()
    defer pc.mu.Unlock()
    if !pc.inUse {
        panic("Connection not acquired from pool")
    }
    count := pc.conn["query_count"].(int)
    pc.conn["query_count"] = count + 1
    return []interface{}{}
}

func (pc *PooledConnection) Reset() {
    pc.mu.Lock()
    defer pc.mu.Unlock()
    pc.inUse = false
    pc.conn["query_count"] = 0
}

func (pc *PooledConnection) GetAge() time.Duration {
    return time.Since(pc.createdAt)
}

type ConnectionPool struct {
    available chan *PooledConnection
    inUse    *sync.Map
    maxSize  int
    mu       sync.Mutex
}

func NewConnectionPool(maxSize int) *ConnectionPool {
    pool := &ConnectionPool{
        available: make(chan *PooledConnection, maxSize),
        inUse:     &sync.Map{},
        maxSize:   maxSize,
    }
    pool.initializePool()
    return pool
}

func (cp *ConnectionPool) initializePool() {
    for i := 0; i < cp.maxSize; i++ {
        cp.available <- NewPooledConnection(
            "conn-" + string(rune(i)),
        )
    }
}

func (cp *ConnectionPool) Acquire() *PooledConnection {
    select {
    case conn := <-cp.available:
        conn.Acquire()
        cp.inUse.Store(conn.ID, conn)
        return conn
    default:
        panic("Pool exhausted")
    }
}

func (cp *ConnectionPool) Release(conn *PooledConnection) {
    if _, ok := cp.inUse.LoadAndDelete(conn.ID); !ok {
        panic("Connection not from this pool")
    }

    if conn.GetAge() > time.Hour {
        return
    }

    conn.Reset()
    cp.available <- conn
}
```

```rust [Rust]
use std::sync::{Arc, Mutex, mpsc};
use std::time::{SystemTime, UNIX_EPOCH};
use std::collections::VecDeque;

trait Poolable {
    fn reset(&mut self);
    fn is_available(&self) -> bool;
}

#[derive(Clone)]
pub struct PooledConnection {
    id: String,
    in_use: bool,
    created_at: u64,
}

impl Poolable for PooledConnection {
    fn reset(&mut self) {
        self.in_use = false;
    }

    fn is_available(&self) -> bool {
        !self.in_use
    }
}

impl PooledConnection {
    pub fn new(id: String) -> Self {
        PooledConnection {
            id,
            in_use: false,
            created_at: SystemTime::now()
                .duration_since(UNIX_EPOCH)
                .unwrap()
                .as_secs(),
        }
    }

    pub fn acquire(&mut self) {
        if self.in_use {
            panic!("Connection already in use");
        }
        self.in_use = true;
    }

    pub fn get_age(&self) -> u64 {
        let now = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_secs();
        now - self.created_at
    }
}

pub struct ConnectionPool {
    available: Arc<Mutex<VecDeque<PooledConnection>>>,
    max_size: usize,
    counter: Arc<Mutex<usize>>,
}

impl ConnectionPool {
    pub fn new(max_size: usize) -> Self {
        let mut available = VecDeque::new();
        for i in 0..max_size {
            available.push_back(PooledConnection::new(
                format!("conn-{}", i),
            ));
        }

        ConnectionPool {
            available: Arc::new(Mutex::new(available)),
            max_size,
            counter: Arc::new(Mutex::new(max_size)),
        }
    }

    pub fn acquire(&self) -> PooledConnection {
        let mut pool = self.available.lock().unwrap();
        if let Some(mut conn) = pool.pop_front() {
            conn.acquire();
            conn
        } else {
            panic!("Pool exhausted");
        }
    }

    pub fn release(&self, conn: PooledConnection) {
        let mut pool = self.available.lock().unwrap();
        if conn.get_age() > 3600 {
            // 1 hour
            return; // Discard aged connections
        }
        pool.push_back(conn);
    }
}

fn main() {
    let pool = ConnectionPool::new(5);
    let mut conn1 = pool.acquire();
    let mut conn2 = pool.acquire();

    conn1.reset();
    pool.release(conn1);

    conn2.reset();
    pool.release(conn2);
}
```

:::

## Real-World Example: Database Connection Pool

A production database connection pool with monitoring and dynamic sizing:

```typescript
class MonitoredConnectionPool {
  private available: PooledConnection[] = [];
  private inUse: Map<string, PooledConnection> = new Map();
  private minSize: number;
  private maxSize: number;
  private currentSize: number;
  private stats = {
    totalAcquired: 0,
    totalReleased: 0,
    peakConnections: 0,
    failedAcquisitions: 0,
  };

  constructor(minSize: number = 5, maxSize: number = 20) {
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.currentSize = 0;
    this.ensureMinConnections();
  }

  private ensureMinConnections(): void {
    while (this.currentSize < this.minSize) {
      this.createConnection();
    }
  }

  private createConnection(): PooledConnection {
    const id = `conn-${Date.now()}-${Math.random()}`;
    const conn = new PooledConnection(id);
    this.available.push(conn);
    this.currentSize++;
    return conn;
  }

  acquire(timeout: number = 5000): Promise<PooledConnection> {
    return new Promise((resolve, reject) => {
      // Try immediate acquisition
      if (this.available.length > 0) {
        const conn = this.available.pop()!;
        conn.acquire();
        this.inUse.set(conn.getId(), conn);
        this.stats.totalAcquired++;
        this.updatePeak();
        resolve(conn);
        return;
      }

      // Try creating new connection if under limit
      if (this.currentSize < this.maxSize) {
        const conn = this.createConnection();
        conn.acquire();
        this.inUse.set(conn.getId(), conn);
        this.stats.totalAcquired++;
        this.updatePeak();
        resolve(conn);
        return;
      }

      // Queue wait for available connection
      const startWait = Date.now();
      const checkInterval = setInterval(() => {
        if (this.available.length > 0) {
          clearInterval(checkInterval);
          const conn = this.available.pop()!;
          conn.acquire();
          this.inUse.set(conn.getId(), conn);
          this.stats.totalAcquired++;
          resolve(conn);
          return;
        }

        if (Date.now() - startWait > timeout) {
          clearInterval(checkInterval);
          this.stats.failedAcquisitions++;
          reject(new Error("Connection pool timeout"));
        }
      }, 50);
    });
  }

  release(conn: PooledConnection): void {
    if (!this.inUse.has(conn.getId())) {
      throw new Error("Connection not from this pool");
    }

    this.inUse.delete(conn.getId());
    conn.reset();
    this.stats.totalReleased++;

    // Shrink pool if over minimum and connection aged
    if (
      this.available.length + this.inUse.size > this.minSize &&
      conn.getAge() > 600000
    ) {
      this.currentSize--;
      return;
    }

    this.available.push(conn);
  }

  private updatePeak(): void {
    const current = this.inUse.size + this.available.length;
    this.stats.peakConnections = Math.max(this.stats.peakConnections, current);
  }

  getStatistics() {
    return {
      ...this.stats,
      available: this.available.length,
      inUse: this.inUse.size,
      currentSize: this.currentSize,
      utilizationPercent: ((this.inUse.size / this.currentSize) * 100).toFixed(
        2,
      ),
    };
  }
}

// Usage
const pool = new MonitoredConnectionPool(5, 20);

async function handleDatabaseRequests() {
  for (let i = 0; i < 100; i++) {
    try {
      const conn = await pool.acquire(5000);
      try {
        await conn.execute("SELECT * FROM users");
      } finally {
        pool.release(conn);
      }
    } catch (e) {
      console.error("Database error:", e);
    }
  }

  console.log("Pool statistics:", pool.getStatistics());
  // Output:
  // {
  //   totalAcquired: 100,
  //   totalReleased: 100,
  //   peakConnections: 20,
  //   failedAcquisitions: 0,
  //   available: 5,
  //   inUse: 0,
  //   currentSize: 20,
  //   utilizationPercent: 0.00
  // }
}
```

## Pool Lifecycle and States

Understanding object states in a pool is critical:

```
[Not Created]
    ↓ (create)
[Available] ← [In Use] ← [Acquire]
    ↓         ↑
  [Reset] ← [Release]
    ↓
  [Discarded]
```

Key states:

- **Available**: Ready for acquisition, reset and clean
- **In Use**: Acquired from pool, performing work
- **Reset**: Transitioning back to Available (cleanup)
- **Discarded**: Removed from pool (aged, failed, etc.)

## Advantages and Disadvantages

### ✅ Advantages

- **Performance**: Eliminates expensive initialization per use
- **Scalability**: Predictable resource usage, handles high throughput
- **Predictability**: Latency is consistent (no GC surprises)
- **Resource management**: Prevents resource exhaustion
- **Reduced memory churn**: Fewer objects for GC to manage
- **Connection pooling**: Essential for database and network operations

### ❌ Disadvantages

- **Complexity**: Requires careful state management and synchronization
- **Memory overhead**: All objects allocated even if unused
- **State pollution**: Easy to introduce bugs with incomplete resets
- **Debugging difficulty**: Hard to trace issues across reused objects
- **Stale data risk**: Improper reset can leave sensitive data in objects
- **Thread safety**: Requires synchronization in concurrent environments

## Variations

### 1. Dynamic Sizing Pool

Automatically grows/shrinks based on demand:

```typescript
class DynamicPool {
  private minSize: number;
  private maxSize: number;

  acquireWithGrowth(): PooledConnection {
    if (this.available.length === 0 && this.currentSize < this.maxSize) {
      return this.createConnection();
    }
    if (this.available.length === 0) {
      throw new Error("Pool exhausted");
    }
    return this.available.pop()!;
  }

  releaseWithShrink(conn: PooledConnection): void {
    if (this.available.length > this.minSize) {
      // Discard excess connections
      this.currentSize--;
      return;
    }
    this.available.push(conn);
  }
}
```

### 2. Blocking Pool with Timeout

Wait for available connection instead of throwing:

```typescript
async acquireAsync(timeout: number): Promise<PooledConnection> {
  const startTime = Date.now();
  while (true) {
    if (this.available.length > 0) {
      return this.available.pop()!;
    }
    if (Date.now() - startTime > timeout) {
      throw new Error("Acquire timeout");
    }
    await new Promise((r) => setTimeout(r, 10));
  }
}
```

## Thread Safety

For multi-threaded environments, ensure proper synchronization:

```typescript
class ThreadSafePool {
  private mutex = new Mutex();

  async acquire(): Promise<PooledConnection> {
    return this.mutex.lock(async () => {
      if (this.available.length > 0) {
        const conn = this.available.pop()!;
        conn.acquire();
        this.inUse.add(conn);
        return conn;
      }
      throw new Error("Pool exhausted");
    });
  }

  async release(conn: PooledConnection): Promise<void> {
    return this.mutex.lock(async () => {
      this.inUse.delete(conn);
      conn.reset();
      this.available.push(conn);
    });
  }
}
```

## When to Use

- Object creation/initialization is expensive
- High-throughput scenarios with many temporary objects
- Limited resources (connections, ports, memory)
- Performance-critical real-time systems
- Database/network connections management
- Thread pool implementations

## When NOT to Use

- Object creation is cheap
- Memory is severely limited
- Objects have complex, hard-to-reset state
- Single-use objects
- Long-lived, stateful objects

## Common Mistakes

### ❌ Mistake 1: Incomplete State Reset

```typescript
// ❌ Bad: Forgot to reset sensitive data
class PooledUser implements Poolable {
  public userId: string = "";
  public authToken: string = "";

  reset(): void {
    // Oops, forgot to clear sensitive data!
    this.userId = "";
    // authToken still has old value - security leak!
  }
}

// ✅ Good: Complete reset
class PooledUser implements Poolable {
  public userId: string = "";
  public authToken: string = "";

  reset(): void {
    this.userId = "";
    this.authToken = ""; // Don't forget sensitive fields
  }
}
```

### ❌ Mistake 2: Not Handling Acquisition Failures

```typescript
// ❌ Bad: No fallback
const conn = pool.acquire(); // Throws, crashes app

// ✅ Good: Handle gracefully
try {
  const conn = await pool.acquireAsync(5000);
  // Use connection
} catch (e) {
  console.error("Pool exhausted, using fallback");
  // Use slower direct connection or queue request
}
```

### ❌ Mistake 3: Forgetting to Return Objects

```typescript
// ❌ Bad: Connection leak
function processRequest(pool: ConnectionPool) {
  const conn = pool.acquire();
  if (someCondition) {
    return; // Forgot to release!
  }
  pool.release(conn);
}

// ✅ Good: Guaranteed release
function processRequest(pool: ConnectionPool) {
  const conn = pool.acquire();
  try {
    // Use connection
  } finally {
    pool.release(conn); // Always releases
  }
}
```

### ❌ Mistake 4: Pool Size Misconfiguration

```typescript
// ❌ Bad: Too small
const pool = new ConnectionPool(1); // Bottleneck!

// ❌ Bad: Too large
const pool = new ConnectionPool(1000); // Memory waste, slow acquisition

// ✅ Good: Based on measured load
const pool = new ConnectionPool(10, 50); // Min 10, max 50
```

## Related Patterns

- **Singleton**: Pool instance is often a Singleton
- **Factory Method**: Can create poolable objects
- **Prototype**: Objects in pool are prototypes for reuse

## Modern Alternatives

### Framework-Level Pooling

- **Node.js**: `pg.Pool`, `mysql2/promise`
- **Python**: `sqlalchemy.pool`, `asyncpg.create_pool`
- **Java**: HikariCP, Apache DBCP
- **Go**: `database/sql` with built-in pooling
- **Rust**: `sqlx` with connection pooling

### Cloud-Native Solutions

- **Container orchestration**: Let Kubernetes manage scale
- **Serverless**: Function-as-a-Service handles pooling
- **Managed services**: Cloud DB handles connection pooling
- **Message queues**: Use async instead of connection pools

## Interview Insights

**Q1: Why not just create connections on demand?**

A: Object creation has overhead (TCP handshake, authentication, initialization). In high-throughput systems, this overhead is multiplied by request count, creating a bottleneck. Pooling pays the initialization cost once, then amortizes it across many uses.

**Q2: How do you prevent stale data in pooled objects?**

A: Implement thorough reset() methods that clear all mutable state. Use code reviews and tests to verify reset behavior. Consider immutable poolable objects when possible.

**Q3: What's the optimal pool size?**

A: Depends on context: `pool_size = (db_connections * (application_threads - application_core_threads))`. Too small = bottleneck. Too large = memory waste. Monitor and adjust based on metrics.

**Q4: How do you handle connection timeouts?**

A: Use acquireAsync() with timeout. When timeout occurs, either reject, queue the request, or fall back to creating temporary connection. Log failures for monitoring.

**Q5: Is pooling still needed with async/await?**

A: Yes! Async/await changes threading model, not resource costs. Database connection creation is still expensive. Pooling is even more important with high concurrency.

**Q6: How do pools relate to resource limits?**

A: Pools enforce resource limits by limiting active objects. Without pooling, unlimited resource creation can exhaust system (file descriptors, sockets, memory). Pools provide predictable resource usage.
