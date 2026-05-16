---
title: Scheduler Pattern
description: Controls thread resource access by scheduling tasks
icon: Clock
---

# Scheduler Pattern



## Overview

The **Scheduler** pattern coordinates controlled access to shared resources by managing when threads can execute. It determines which thread gets to use a resource and when.

Key concepts:

- **Scheduler**: Manages thread execution order
- **Resource**: Shared resource being scheduled
- **Threads**: Competitors for resource access
- **Fairness**: Equitable resource distribution

## Purpose

Scheduler aims to:

- Prevent resource conflicts
- Ensure fair resource distribution
- Maximize resource utilization
- Control execution order
- Prevent starvation
- Enable cooperative multitasking

## Problem

Without scheduling:

- Threads compete for resources
- Some threads starve
- Inefficient resource usage
- Unpredictable behavior
- Possible deadlocks

```
❌ Unscheduled Access
Thread1 ─┐
Thread2 ─┼─→ [Resource] ← Conflicts!
Thread3 ─┘
```

## Solution

Scheduler controls access:

```
✅ Scheduled Access
Thread1 ─┐
Thread2 ─┼─→ [Scheduler] ─→ [Resource]
Thread3 ─┘    (Fair access)
```

## Implementation

::: code-group

```typescript [typescript]
// Task to schedule
interface Task {
  id: string;
  execute: () => void;
  priority?: number;
}

// Simple Scheduler
class Scheduler {
  private taskQueue: Task[] = [];
  private running = false;

  schedule(task: Task): void {
    this.taskQueue.push(task);
    console.log(`📅 Scheduled task: ${task.id}`);
    this.executeNext();
  }

  private executeNext(): void {
    if (this.running || this.taskQueue.length === 0) return;

    this.running = true;
    const task = this.taskQueue.shift()!;

    console.log(`▶️ Executing: ${task.id}`);
    try {
      task.execute();
      console.log(`✅ Completed: ${task.id}`);
    } catch (error) {
      console.error(`❌ Error in ${task.id}: ${error}`);
    }

    this.running = false;
    if (this.taskQueue.length > 0) {
      setImmediate(() => this.executeNext());
    }
  }

  getPendingCount(): number {
    return this.taskQueue.length;
  }
}

// Priority Scheduler
class PriorityScheduler {
  private taskQueue: Task[] = [];
  private running = false;

  schedule(task: Task): void {
    task.priority = task.priority || 0;
    this.taskQueue.push(task);
    this.taskQueue.sort((a, b) => (b.priority || 0) - (a.priority || 0));
    console.log(`📅 Scheduled task: ${task.id} (priority: ${task.priority})`);
    this.executeNext();
  }

  private executeNext(): void {
    if (this.running || this.taskQueue.length === 0) return;

    this.running = true;
    const task = this.taskQueue.shift()!;

    console.log(`▶️ Executing: ${task.id}`);
    task.execute();
    console.log(`✅ Completed: ${task.id}`);

    this.running = false;
    if (this.taskQueue.length > 0) {
      setImmediate(() => this.executeNext());
    }
  }
}

// Usage
const scheduler = new Scheduler();

scheduler.schedule({
  id: "Task 1",
  execute: () => console.log("  Doing work 1..."),
});

scheduler.schedule({
  id: "Task 2",
  execute: () => console.log("  Doing work 2..."),
});

scheduler.schedule({
  id: "Task 3",
  execute: () => console.log("  Doing work 3..."),
});

console.log(`\nPending tasks: ${scheduler.getPendingCount()}`);
```



```python [python]
from typing import Callable, List
from dataclasses import dataclass
import time

# Task to schedule
@dataclass
class Task:
    id: str
    execute: Callable
    priority: int = 0

# Simple Scheduler
class Scheduler:
    def __init__(self):
        self.task_queue: List[Task] = []
        self.running = False

    def schedule(self, task: Task) -> None:
        self.task_queue.append(task)
        print(f"📅 Scheduled task: {task.id}")
        self.execute_next()

    def execute_next(self) -> None:
        if self.running or not self.task_queue:
            return

        self.running = True
        task = self.task_queue.pop(0)

        print(f"▶️ Executing: {task.id}")
        try:
            task.execute()
            print(f"✅ Completed: {task.id}")
        except Exception as e:
            print(f"❌ Error in {task.id}: {e}")

        self.running = False
        if self.task_queue:
            self.execute_next()

    def get_pending_count(self) -> int:
        return len(self.task_queue)

# Priority Scheduler
class PriorityScheduler:
    def __init__(self):
        self.task_queue: List[Task] = []
        self.running = False

    def schedule(self, task: Task) -> None:
        self.task_queue.append(task)
        self.task_queue.sort(key=lambda t: t.priority, reverse=True)
        print(f"📅 Scheduled task: {task.id} (priority: {task.priority})")
        self.execute_next()

    def execute_next(self) -> None:
        if self.running or not self.task_queue:
            return

        self.running = True
        task = self.task_queue.pop(0)

        print(f"▶️ Executing: {task.id}")
        task.execute()
        print(f"✅ Completed: {task.id}")

        self.running = False
        if self.task_queue:
            self.execute_next()

# Usage
if __name__ == "__main__":
    scheduler = Scheduler()

    scheduler.schedule(Task("Task 1", lambda: print("  Doing work 1...")))
    scheduler.schedule(Task("Task 2", lambda: print("  Doing work 2...")))
    scheduler.schedule(Task("Task 3", lambda: print("  Doing work 3...")))

    print(f"\nPending tasks: {scheduler.get_pending_count()}")

    print("\n=== Priority Scheduler ===")
    priority_scheduler = PriorityScheduler()

    priority_scheduler.schedule(Task("Low", lambda: print("  Low priority"), 1))
    priority_scheduler.schedule(Task("High", lambda: print("  High priority"), 10))
    priority_scheduler.schedule(Task("Medium", lambda: print("  Medium priority"), 5))
```

:::

## Advantages ✅

- **Fair Access**: Equitable resource use
- **No Conflicts**: Prevents race conditions
- **Predictable**: Controlled execution
- **Priority Support**: Important tasks first
- **Starvation Prevention**: All tasks get a turn
- **Resource Efficient**: Better utilization
- **Simple**: Easy to understand
- **Flexible**: Different strategies

## Disadvantages ❌

- **Complexity**: Complex implementation
- **Overhead**: Scheduling adds latency
- **Context Switching**: Performance cost
- **Debugging**: Hard to trace issues
- **Not Parallel**: Sequential execution
- **Performance**: Slower than parallel
- **Synchronization**: Complex locking
- **Scalability**: Limited by single thread

## When to Use ✅

- **Shared Resources**: Limited resource access
- **Fair Distribution**: Need fairness
- **Priority Tasks**: Some more important
- **Single Threaded**: Event loop required
- **Cooperative**: Threads cooperate
- **Resource Pooling**: Limited resources
- **Task Management**: Centralized control
- **Event-Driven**: Event loop patterns

## When NOT to Use ❌

- **Parallel Execution**: Need true parallelism
- **Performance-Critical**: Overhead unacceptable
- **Simple Cases**: Over-engineering
- **Real-Time**: Unpredictable timing
- **Distributed**: Multiple machines
- **Microservices**: Already distributed
- **Modern Async**: Use async/await
- **Lock-Free**: Lock-free better

## Related Patterns

- **Thread Pool**: Common use of scheduling
- **Producer-Consumer**: With scheduling
- **Observer Pattern**: Event scheduling
- **Command Pattern**: Queued commands
