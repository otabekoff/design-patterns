---
title: Scheduler (Rejalashtiruvchi)
description: Vazifalarni rejalashtirish orqali oqimlar (thread) resurslariga kirishni boshqaradi
icon: Clock
---

# Scheduler (Rejalashtiruvchi)

<CoverImage src="/covers/architectural/scheduler.png" alt="Cover">
  <h1>Scheduler</h1>
  <p>A tiny conductor robot sitting on top of a giant clockwork machine, holding a checklist and pointing a baton at different worker robots, telling them exactly when to start running.</p>
</CoverImage>

## Umumiy ko'rinish (Overview)

**Scheduler (Rejalashtiruvchi)** patterni oqimlarning (threads) qachon bajarilishini boshqarish orqali umumiy resurslarga kirishni muvofiqlashtiradi. U qaysi oqim va qachon resursdan foydalanishini belgilaydi.

Asosiy tushunchalar:

- **Scheduler (Rejalashtiruvchi)**: Oqimlarni bajarish tartibini boshqaradi
- **Resource (Resurs)**: Rejalashtirilayotgan umumiy resurs
- **Threads (Oqimlar)**: Resursga kirish uchun raqobatchilar
- **Fairness (Adolatlilik)**: Resurslarni teng taqsimlash

## Maqsad (Purpose)

Scheduler patternining maqsadi:

- Resurslar ziddiyatlarini (conflicts) oldini olish
- Resurslarni adolatli taqsimlashni ta'minlash
- Resurslardan foydalanishni (utilization) maksimal darajaga ko'tarish
- Bajarilish tartibini (execution order) boshqarish
- Oqimlarning "och qolishini" (starvation) oldini olish
- Hamkorlikdagi ko'p vazifalilikni (cooperative multitasking) ta'minlash

## Muammo (Problem)

Rejalashtirishsiz tizimlardagi muammolar:

- Oqimlar resurslar uchun raqobatlashadi
- Ba'zi oqimlar umuman resursga ega bo'lmaydi (starve)
- Resurslardan samarasiz foydalanish
- Oldindan aytib bo'lmaydigan xatti-harakatlar
- Ehtimoliy tiqilib qolishlar (deadlocks)

```
❌ Rejalashtirilmagan Kirish
Thread1 ─┐
Thread2 ─┼─→ [Resurs] ← Ziddiyatlar!
Thread3 ─┘
```

## Yechim (Solution)

Scheduler kirishni boshqaradi:

```
✅ Rejalashtirilgan Kirish
Thread1 ─┐
Thread2 ─┼─→ [Scheduler] ─→ [Resurs]
Thread3 ─┘    (Adolatli kirish)
```

## Amalga oshirish (Implementation)

::: code-group

```typescript [TypeScript]
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

```python [Python]
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

## Afzalliklari (Advantages) ✅

- **Adolatli kirish (Fair Access)**: Resurslardan teng darajada foydalanish
- **Ziddiyatlar yo'q (No Conflicts)**: Poyga holatlarini (race conditions) oldini oladi
- **Oldindan aytish mumkin (Predictable)**: Boshqariladigan bajarilish jarayoni
- **Ustuvorlikni qo'llab-quvvatlash (Priority Support)**: Muhim vazifalarni birinchi bajarish imkoniyati
- **"Och qolish"ni oldini olish (Starvation Prevention)**: Barcha vazifalarga navbat yetib keladi
- **Resurs tejamkorligi (Resource Efficient)**: Yaxshiroq utilitizatsiya
- **Sodda (Simple)**: Tushunish oson
- **Moslashuvchan (Flexible)**: Turli xil strategiyalarni qo'llash imkoniyati

## Kamchiliklari (Disadvantages) ❌

- **Murakkablik (Complexity)**: Amalga oshirish (implementation) murakkab bo'lishi mumkin
- **Qo'shimcha yuklama (Overhead)**: Rejalashtirish kechikish (latency) qo'shadi
- **Kontekstni almashtirish (Context Switching)**: Ishlash tezligiga (performance) ta'sir qiladi
- **Nosozliklarni topish (Debugging)**: Muammolarni qidirish va kuzatish qiyin
- **Parallel emas (Not Parallel)**: Ketma-ket (sequential) bajarilish ehtimoli
- **Ishlash tezligi (Performance)**: Haqiqiy parallellikdan ko'ra sekinroq
- **Sinxronizatsiya (Synchronization)**: Murakkab qulflarni (locking) talab qiladi
- **Kengayuvchanlik (Scalability)**: Bitta oqim bilan (single thread) cheklangan

## Qachon foydalanish kerak (When to Use) ✅

- **Umumiy resurslar (Shared Resources)**: Cheklangan resursga kirish zarur bo'lganda
- **Adolatli taqsimot (Fair Distribution)**: Resursni hammaga yetkazish kerak bo'lganda
- **Ustuvor vazifalar (Priority Tasks)**: Ba'zi vazifalar muhimroq bo'lganda
- **Bitta oqimli (Single Threaded)**: Voqealar halqasi (event loop) kerak bo'lganda
- **Hamkorlik (Cooperative)**: Oqimlar o'zaro hamkorlik qilganda
- **Resurslar hovuzi (Resource Pooling)**: Resurslar soni cheklangan bo'lganda
- **Vazifalarni boshqarish (Task Management)**: Markazlashtirilgan boshqaruv kerak bo'lganda
- **Voqealarga asoslangan (Event-Driven)**: Voqealar halqasi (event loop) patternlarida

## Qachon foydalanmaslik kerak (When NOT to Use) ❌

- **Parallel bajarish (Parallel Execution)**: Haqiqiy parallellikka ehtiyoj bo'lganda
- **Ishlash tezligi kritik bo'lganda (Performance-Critical)**: Qo'shimcha yuklama (overhead) qabul qilib bo'lmaydigan darajada bo'lsa
- **Oddiy holatlar**: Haddan tashqari muhandislik (over-engineering)
- **Real vaqt rejimida (Real-Time)**: Vaqtni oldindan aytib bo'lmaydigan darajada noaniq bo'lsa
- **Taqsimlangan (Distributed)**: Bir nechta mashinalar ishtirok etganda
- **Mikroservislar (Microservices)**: Ular allaqachon taqsimlangan tuzilishga ega
- **Zamonaviy Async**: Agar `async/await` o'zi yetarli bo'lsa
- **Qulflarsiz (Lock-Free)**: Qulflarsiz yondashuv yaxshiroq ishlaganda

## Aloqador Patternlar (Related Patterns)

- **Thread Pool Pattern**: Rejalashtirishning eng keng tarqalgan qo'llanilishi
- **Producer-Consumer**: Rejalashtirish bilan birga qo'llanilishi mumkin
- **Observer Pattern**: Voqealarni rejalashtirish (event scheduling)
- **Command Pattern**: Navbatdagi buyruqlar uchun
