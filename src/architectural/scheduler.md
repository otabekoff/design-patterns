---
title: Scheduler Pattern
description: An architectural pattern that coordinates and controls the execution timing of tasks and access to shared resources.
icon: Clock
---

# Scheduler Pattern

<CoverImage src="/covers/architectural/scheduler.png" alt="Cover">
  <h1>Scheduler</h1>
  <p>A tiny conductor robot sitting on top of a giant clockwork machine, holding a checklist and pointing a baton at different worker robots, telling them exactly when to start running.</p>
</CoverImage>

## Overview

The **Scheduler** pattern is a fundamental system-level architectural pattern. It manages a pool of pending tasks and determines exactly **when** and **in what order** they should be executed by worker threads or processes.

While the *Producer-Consumer* pattern focuses on decoupling data flow, the *Scheduler* pattern focuses on **Time**, **Priority**, and **Resource Limits**.

Key concepts:
- **Task**: An encapsulated unit of work to be executed.
- **Queue**: Where tasks wait before execution.
- **Dispatcher/Scheduler**: The engine that evaluates priorities, checks available resources, and triggers execution.
- **Workers**: The threads or processes that actually do the work.

## The Problem

If you allow every request or task in an application to execute immediately upon arrival, you lose control over your hardware.

```javascript
// ❌ Bad: Immediate unbounded execution
function handleRequest(req) {
    // If 10,000 requests hit at once, we spawn 10,000 threads.
    // The CPU thrashes, Memory runs out, and the Server crashes.
    new Thread(() => processHeavyData(req)).start(); 
}
```

This causes:
1. **Resource Exhaustion**: Out Of Memory (OOM) errors and CPU thrashing due to too many active threads.
2. **Priority Inversion**: A massive batch of low-priority background analytics jobs might consume all CPU, preventing a high-priority user login request from completing.
3. **Starvation**: Some tasks might never get CPU time if other aggressive tasks keep dominating the system.

## The Solution

Route all tasks through a **Scheduler**. The Scheduler applies policies (like FIFO, Round-Robin, Priority-based, or Rate-Limiting) to control the flow of execution.

```mermaid
flowchart TD
    T1[High Priority Task] --> S
    T2[Low Priority Task] --> S
    T3[Delayed Task] --> S
    
    subgraph Engine
        S{Scheduler Logic\n(Priority / Time)}
        Q[Priority Queue]
    end
    
    S --> Q
    
    Q -- "Dispatches based\n on policy" --> W1[Worker Thread 1]
    Q --> W2[Worker Thread 2]
```

## Real-World Analogy

Think of an **Airport Control Tower**.
- **The Tasks**: Airplanes wanting to land.
- **The Resources**: The runways.
- **The Scheduler**: The Air Traffic Controller.

If 10 planes arrive at once, they cannot all land immediately. The Controller puts them in a holding pattern (Queue). The Controller decides the order: a plane running low on fuel (High Priority) gets to land first, while cargo planes (Low Priority) wait. The Controller ensures the runway is never overloaded.

## Step-by-Step Implementation

We will implement a **Priority Scheduler** that limits the maximum number of concurrent tasks running at once.

1. **Define the Task Interface**: Needs a unique ID, a priority level, and an execution function.
2. **Create the Scheduler State**: Needs a list of pending tasks (sorted by priority) and a counter for currently running tasks.
3. **Implement the Dispatcher**: A function that checks if we are under the concurrency limit. If so, it pops the highest priority task and executes it.
4. **Handle Completion**: When a task finishes, it must notify the Scheduler so the dispatcher can trigger the next task.

## Code Examples

::: code-group

```typescript [TypeScript (Async/Promise Scheduler)]
type TaskFn = () => Promise<void>;

interface ScheduledTask {
  id: string;
  priority: number;
  execute: TaskFn;
}

class PriorityConcurrencyScheduler {
  private queue: ScheduledTask[] = [];
  private activeCount: number = 0;

  constructor(private maxConcurrent: number) {}

  public schedule(id: string, priority: number, execute: TaskFn) {
    this.queue.push({ id, priority, execute });
    // Sort descending by priority (higher number = runs first)
    this.queue.sort((a, b) => b.priority - a.priority);
    
    console.log(`[Scheduled] ${id} (Priority: ${priority})`);
    this.tick();
  }

  private tick() {
    // If we have available "worker slots" and tasks waiting
    while (this.activeCount < this.maxConcurrent && this.queue.length > 0) {
      const task = this.queue.shift()!;
      this.activeCount++;
      
      console.log(`[Executing] ${task.id} (Active: ${this.activeCount}/${this.maxConcurrent})`);
      
      // Execute asynchronously, don't await here!
      task.execute()
        .catch(err => console.error(`[Error] ${task.id}:`, err))
        .finally(() => {
          this.activeCount--;
          console.log(`[Completed] ${task.id}`);
          this.tick(); // Task finished, trigger the next one
        });
    }
  }
}

// Execution
const scheduler = new PriorityConcurrencyScheduler(2); // Max 2 tasks at once

const makeTask = (timeMs: number) => () => new Promise<void>(res => setTimeout(res, timeMs));

// Submit tasks out of order
scheduler.schedule("Task A (Low)", 1, makeTask(1000));
scheduler.schedule("Task B (Low)", 1, makeTask(1000));
// Queue is now full (Max 2). Task C will wait.
scheduler.schedule("Task C (HIGH)", 10, makeTask(500)); 

// Output:
// [Executing] Task A (Low)
// [Executing] Task B (Low)
// [Scheduled] Task C (HIGH)
// ... 1 second later ...
// [Completed] Task A
// [Executing] Task C (HIGH) <- Jumped the queue!
```

```python [Python (Asyncio)]
import asyncio
from dataclasses import dataclass, field
from typing import Callable, Awaitable

@dataclass(order=True)
class PrioritizedTask:
    # Negative priority so higher numbers sort first in min-heap
    priority: int
    id: str = field(compare=False)
    execute: Callable[[], Awaitable[None]] = field(compare=False)

class AsyncScheduler:
    def __init__(self, max_concurrent: int):
        self.queue = asyncio.PriorityQueue()
        self.max_concurrent = max_concurrent
        self.active_count = 0

    async def schedule(self, task_id: str, priority: int, coro_fn: Callable):
        print(f"[Scheduled] {task_id} (Priority: {priority})")
        # Invert priority for min-heap
        await self.queue.put(PrioritizedTask(-priority, task_id, coro_fn))
        asyncio.create_task(self._tick())

    async def _tick(self):
        if self.active_count >= self.max_concurrent or self.queue.empty():
            return

        self.active_count += 1
        task = await self.queue.get()
        print(f"[Executing] {task.id}")

        try:
            await task.execute()
        except Exception as e:
            print(f"[Error] {task.id}: {e}")
        finally:
            print(f"[Completed] {task.id}")
            self.active_count -= 1
            self.queue.task_done()
            asyncio.create_task(self._tick()) # Trigger next

async def dummy_work(time_sec: float):
    await asyncio.sleep(time_sec)

async def main():
    scheduler = AsyncScheduler(max_concurrent=2)
    
    await scheduler.schedule("Task A (Low)", 1, lambda: dummy_work(1))
    await scheduler.schedule("Task B (Low)", 1, lambda: dummy_work(1))
    # Will execute before any other tasks added after it, once a slot frees up
    await scheduler.schedule("Task C (HIGH)", 10, lambda: dummy_work(0.5))
    
    # Wait for queue to empty
    await scheduler.queue.join()

if __name__ == "__main__":
    asyncio.run(main())
```

```java [Java (ExecutorService)]
import java.util.concurrent.*;

// In Java, ScheduledThreadPoolExecutor is the enterprise standard
public class SchedulerDemo {
    public static void main(String[] args) throws InterruptedException {
        // Create a scheduler with exactly 2 worker threads
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(2);

        System.out.println("Submitting tasks...");

        // Task 1: Execute after 2 seconds delay
        scheduler.schedule(() -> {
            System.out.println("[Executed] Delayed Task");
        }, 2, TimeUnit.SECONDS);

        // Task 2: Execute repeatedly every 1 second
        scheduler.scheduleAtFixedRate(() -> {
            System.out.println("[Executed] Recurring Task / Heartbeat");
        }, 0, 1, TimeUnit.SECONDS);

        // Let it run for 4 seconds
        Thread.sleep(4000);
        System.out.println("Shutting down...");
        scheduler.shutdown();
    }
}
```

```go [Go (Worker Pool + Priority Queue)]
package main

import (
	"fmt"
	"sort"
	"sync"
	"time"
)

type Task struct {
	id       string
	priority int
	execute  func()
}

type Scheduler struct {
	queue         []Task
	maxConcurrent int
	activeCount   int
	mu            sync.Mutex
}

func NewScheduler(max int) *Scheduler {
	return &Scheduler{maxConcurrent: max}
}

func (s *Scheduler) Schedule(id string, priority int, fn func()) {
	s.mu.Lock()
	s.queue = append(s.queue, Task{id, priority, fn})
	// Sort highest priority first
	sort.Slice(s.queue, func(i, j int) bool {
		return s.queue[i].priority > s.queue[j].priority
	})
	fmt.Printf("[Scheduled] %s\n", id)
	s.mu.Unlock()
	
	s.tick()
}

func (s *Scheduler) tick() {
	s.mu.Lock()
	if s.activeCount >= s.maxConcurrent || len(s.queue) == 0 {
		s.mu.Unlock()
		return
	}

	task := s.queue[0]
	s.queue = s.queue[1:]
	s.activeCount++
	fmt.Printf("[Executing] %s\n", task.id)
	s.mu.Unlock()

	// Execute in a goroutine (worker)
	go func() {
		task.execute()
		fmt.Printf("[Completed] %s\n", task.id)
		
		s.mu.Lock()
		s.activeCount--
		s.mu.Unlock()
		
		s.tick() // Trigger next
	}()
}

func main() {
	s := NewScheduler(2)

	work := func() { time.Sleep(1 * time.Second) }

	s.Schedule("Task A (Low)", 1, work)
	s.Schedule("Task B (Low)", 1, work)
	s.Schedule("Task C (HIGH)", 10, work)

	time.Sleep(3 * time.Second) // wait for completion
}
```

```rust [Rust (Tokio Tasks)]
use std::time::Duration;
use tokio::time;

// In Rust enterprise apps, Tokio acts as the global async scheduler.
// We don't usually write custom schedulers; we use concurrency limits.

#[tokio::main]
async fn main() {
    // A Semaphore enforces the "max concurrent tasks" rule
    let semaphore = std::sync::Arc::new(tokio::sync::Semaphore::new(2));
    let mut handles = vec![];

    for i in 1..=4 {
        let permit = semaphore.clone().acquire_owned().await.unwrap();
        
        let handle = tokio::spawn(async move {
            println!("[Executing] Task {}", i);
            time::sleep(Duration::from_millis(500)).await;
            println!("[Completed] Task {}", i);
            
            // Drop permit so next task can run
            drop(permit); 
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.await.unwrap();
    }
}
```

:::

## Pros and Cons

### Advantages
- **System Stability**: By limiting maximum concurrency, the server is protected from traffic spikes and OOM crashes.
- **Fairness & Prioritization**: Critical systems (like processing payments) can bypass non-critical systems (like sending analytics logs).
- **Resource Efficiency**: Thread pools combined with schedulers avoid the massive OS overhead of constantly creating and destroying threads.

### Disadvantages
- **Complexity**: Writing a custom, thread-safe, priority-based scheduler is notoriously difficult and prone to race conditions.
- **Single Point of Bottleneck**: The scheduler itself evaluates every task. If the scheduler algorithm is slow, the entire application grinds to a halt.
- **Starvation**: If a system constantly receives High Priority tasks, the Low Priority tasks will sit in the queue forever and never execute.

## When to Use

- **Operating Systems & Compilers**: At the core of OS thread management and CPU allocation.
- **Background Job Processing**: Systems like Celery, Sidekiq, or BullMQ are distributed schedulers.
- **Rate Limiting**: When calling third-party APIs that only allow 5 requests per second, you must use a scheduler to throttle your outbound requests.
- **Database Connection Pooling**: A connection pool is a scheduler that restricts how many queries can hit the database simultaneously.

## When NOT to Use

- **Trivial Apps**: If your app naturally handles low load, adding a scheduler is premature optimization.
- **When Frameworks Provide It**: Never write your own thread pool scheduler in Java/Go/Rust. Use `ExecutorService`, `goroutines`, or `Tokio`. Only write a custom logic scheduler if you need highly specific business prioritization rules.

## Common Mistakes

- **Not handling Starvation**: Failing to implement "Aging" (gradually increasing the priority of tasks that have been waiting in the queue too long) resulting in abandoned low-priority tasks.
- **Blocking the Scheduler Thread**: If a task executes synchronously *on* the dispatcher thread instead of a worker thread, the entire system freezes.

## Related Patterns

- **Producer-Consumer**: The Scheduler is an advanced variation of Producer-Consumer where the queue is sorted by priority and execution is strictly monitored.
- **Thread Pool**: The underlying mechanism that the Scheduler uses to execute tasks.
- **Command Pattern**: The tasks placed into the Scheduler queue are usually Command objects.
