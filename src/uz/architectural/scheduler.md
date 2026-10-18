---
title: Scheduler Pattern (Rejalashtiruvchi)
description: Vazifalarning bajarilish vaqtini va umumiy resurslarga kirishni muvofiqlashtiradigan hamda nazorat qiladigan arxitektura patterni.
icon: Clock
---

# Scheduler Pattern (Rejalashtiruvchi)

<CoverImage src="/covers/architectural/scheduler.webp" alt="Cover">
  <h1>Scheduler</h1>
  <p>Ulkan soat mexanizmi ustida o'tirgan, qo'lida nazorat ro'yxatini tutgan kichkina dirijyor robot; u tayoqchasi bilan turli ishchi robotlarni ko'rsatib, ularga aynan qachon ishga tushishni aytmoqda.</p>
</CoverImage>

## Umumiy ko'rinish (Overview)

**Scheduler (Rejalashtiruvchi)** patterni - tizim darajasidagi fundamental arxitektura patternidir. U kutilayotgan vazifalar to'plamini boshqaradi va ular ishchi oqimlar (threads) yoki jarayonlar tomonidan aynan **qachon** va **qanday tartibda** bajarilishi kerakligini aniqlaydi.

*Producer-Consumer* patterni ma'lumotlar oqimini ajratishga e'tibor qaratsa, *Scheduler* patterni **Vaqt**, **Ustuvorlik (Priority)** va **Resurs cheklovlari**ga e'tibor qaratadi.

Asosiy tushunchalar:
- **Task (Vazifa)**: Bajarilishi kerak bo'lgan inkapsulyatsiya qilingan ish birligi.
- **Queue (Navbat)**: Vazifalar bajarilishdan oldin kutib turadigan joy.
- **Dispatcher/Scheduler**: Ustuvorliklarni baholaydigan, mavjud resurslarni tekshiradigan va bajarishni ishga tushiradigan mexanizm.
- **Workers (Ishchilar)**: Ishni amalda bajaradigan oqimlar yoki jarayonlar.

## Muammo (The Problem)

Agar ilovadagi har bir so'rov yoki vazifaga kelishi bilanoq darhol bajarilishiga ruxsat bersangiz, apparat resurslaringiz ustidan nazoratni yo'qotasiz.

```javascript
// ❌ Yomon: Darhol, cheklanmagan bajarish
function handleRequest(req) {
    // Agar bir vaqtda 10 000 ta so'rov kelsa, 10 000 ta thread yaratamiz.
    // CPU haddan tashqari yuklanadi, xotira tugaydi va server qulaydi.
    new Thread(() => processHeavyData(req)).start(); 
}
```

Bu quyidagilarga olib keladi:
1. **Resurslarning tugashi (Resource Exhaustion)**: Juda ko'p faol oqimlar tufayli Out Of Memory (OOM) xatolari va CPU thrashing.
2. **Ustuvorlik inversiyasi (Priority Inversion)**: Past ustuvorlikka ega ulkan fon analitika vazifalari butun CPU ni egallab, yuqori ustuvorlikka ega foydalanuvchi login so'rovining bajarilishiga to'sqinlik qilishi mumkin.
3. **Ochlik (Starvation)**: Agar boshqa agressiv vazifalar tizimda doimiy hukmronlik qilsa, ba'zi vazifalar hech qachon CPU vaqtini ololmasligi mumkin.

## Yechim (The Solution)

Barcha vazifalarni **Scheduler** orqali yo'naltiring. Scheduler bajarilish oqimini nazorat qilish uchun siyosatlarni (FIFO, Round-Robin, ustuvorlikka asoslangan yoki Rate-Limiting kabi) qo'llaydi.

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

## Hayotiy o'xshatish (Real-World Analogy)

**Aeroport boshqaruv minorasi**ni tasavvur qiling.
- **Vazifalar**: Qo'nishni xohlayotgan samolyotlar.
- **Resurslar**: Uchish-qo'nish yo'laklari.
- **Scheduler**: Havo harakati dispetcheri.

Agar bir vaqtning o'zida 10 ta samolyot yetib kelsa, ularning barchasi darhol qo'na olmaydi. Dispetcher ularni kutish aylanasiga (Navbat) qo'yadi. Tartibni dispetcher belgilaydi: yoqilg'isi tugayotgan samolyot (Yuqori ustuvorlik) birinchi bo'lib qo'nadi, yuk samolyotlari (Past ustuvorlik) esa kutib turadi. Dispetcher yo'lakning hech qachon ortiqcha yuklanmasligini ta'minlaydi.

## Bosqichma-bosqich amalga oshirish (Step-by-Step Implementation)

Biz bir vaqtda ishlayotgan vazifalarning maksimal sonini cheklaydigan **Priority Scheduler** (ustuvorlikka asoslangan rejalashtiruvchi) ni amalga oshiramiz.

1. **Task interfeysini aniqlang**: Unga noyob ID, ustuvorlik darajasi va bajarish funksiyasi kerak.
2. **Scheduler holatini yarating**: Kutilayotgan vazifalar ro'yxati (ustuvorlik bo'yicha saralangan) va hozir ishlayotgan vazifalar hisoblagichi kerak.
3. **Dispatcher'ni amalga oshiring**: Parallellik chegarasidan oshmaganimizni tekshiradigan funksiya. Agar oshmagan bo'lsa, u eng yuqori ustuvorlikdagi vazifani olib, bajaradi.
4. **Yakunlanishni qayta ishlang**: Vazifa tugagach, u Scheduler'ga xabar berishi kerak, shunda dispatcher keyingi vazifani ishga tushira oladi.

## Kod misollari (Code Examples)

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
    // Ustuvorlik bo'yicha kamayish tartibida saralash (katta raqam = birinchi ishlaydi)
    this.queue.sort((a, b) => b.priority - a.priority);
    
    console.log(`[Scheduled] ${id} (Priority: ${priority})`);
    this.tick();
  }

  private tick() {
    // Bo'sh "worker slot"lar va kutayotgan vazifalar bo'lsa
    while (this.activeCount < this.maxConcurrent && this.queue.length > 0) {
      const task = this.queue.shift()!;
      this.activeCount++;
      
      console.log(`[Executing] ${task.id} (Active: ${this.activeCount}/${this.maxConcurrent})`);
      
      // Asinxron bajarish, bu yerda await qilmang!
      task.execute()
        .catch(err => console.error(`[Error] ${task.id}:`, err))
        .finally(() => {
          this.activeCount--;
          console.log(`[Completed] ${task.id}`);
          this.tick(); // Vazifa tugadi, keyingisini ishga tushirish
        });
    }
  }
}

// Ishga tushirish
const scheduler = new PriorityConcurrencyScheduler(2); // Bir vaqtda maksimal 2 ta vazifa

const makeTask = (timeMs: number) => () => new Promise<void>(res => setTimeout(res, timeMs));

// Vazifalarni tartibsiz yuborish
scheduler.schedule("Task A (Low)", 1, makeTask(1000));
scheduler.schedule("Task B (Low)", 1, makeTask(1000));
// Queue endi to'la (maks. 2). Task C kutadi.
scheduler.schedule("Task C (HIGH)", 10, makeTask(500)); 

// Natija:
// [Executing] Task A (Low)
// [Executing] Task B (Low)
// [Scheduled] Task C (HIGH)
// ... 1 soniyadan keyin ...
// [Completed] Task A
// [Executing] Task C (HIGH) <- Navbatdan sakrab o'tdi!
```

```python [Python (Asyncio)]
import asyncio
from dataclasses import dataclass, field
from typing import Callable, Awaitable

@dataclass(order=True)
class PrioritizedTask:
    # Min-heap'da katta raqamlar birinchi turishi uchun manfiy ustuvorlik
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
        # Min-heap uchun ustuvorlikni teskari qilish
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
            asyncio.create_task(self._tick()) # Keyingisini ishga tushirish

async def dummy_work(time_sec: float):
    await asyncio.sleep(time_sec)

async def main():
    scheduler = AsyncScheduler(max_concurrent=2)
    
    await scheduler.schedule("Task A (Low)", 1, lambda: dummy_work(1))
    await scheduler.schedule("Task B (Low)", 1, lambda: dummy_work(1))
    # Slot bo'shashi bilan undan keyin qo'shilgan har qanday vazifadan oldin bajariladi
    await scheduler.schedule("Task C (HIGH)", 10, lambda: dummy_work(0.5))
    
    # Queue bo'shashini kutish
    await scheduler.queue.join()

if __name__ == "__main__":
    asyncio.run(main())
```

```java [Java (ExecutorService)]
import java.util.concurrent.*;

// Java'da ScheduledThreadPoolExecutor korporativ standart hisoblanadi
public class SchedulerDemo {
    public static void main(String[] args) throws InterruptedException {
        // Aynan 2 ta worker thread'li scheduler yaratish
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(2);

        System.out.println("Submitting tasks...");

        // 1-vazifa: 2 soniya kechikishdan keyin bajarish
        scheduler.schedule(() -> {
            System.out.println("[Executed] Delayed Task");
        }, 2, TimeUnit.SECONDS);

        // 2-vazifa: har 1 soniyada takroran bajarish
        scheduler.scheduleAtFixedRate(() -> {
            System.out.println("[Executed] Recurring Task / Heartbeat");
        }, 0, 1, TimeUnit.SECONDS);

        // 4 soniya ishlashiga imkon berish
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
	// Eng yuqori ustuvorlikni birinchi qo'yib saralash
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

	// Goroutine'da (worker) bajarish
	go func() {
		task.execute()
		fmt.Printf("[Completed] %s\n", task.id)
		
		s.mu.Lock()
		s.activeCount--
		s.mu.Unlock()
		
		s.tick() // Keyingisini ishga tushirish
	}()
}

func main() {
	s := NewScheduler(2)

	work := func() { time.Sleep(1 * time.Second) }

	s.Schedule("Task A (Low)", 1, work)
	s.Schedule("Task B (Low)", 1, work)
	s.Schedule("Task C (HIGH)", 10, work)

	time.Sleep(3 * time.Second) // tugashini kutish
}
```

```rust [Rust (Tokio Tasks)]
use std::time::Duration;
use tokio::time;

// Rust korporativ ilovalarida Tokio global async scheduler vazifasini bajaradi.
// Odatda maxsus scheduler yozmaymiz; parallellik cheklovlaridan foydalanamiz.

#[tokio::main]
async fn main() {
    // Semaphore "maksimal parallel vazifalar" qoidasini ta'minlaydi
    let semaphore = std::sync::Arc::new(tokio::sync::Semaphore::new(2));
    let mut handles = vec![];

    for i in 1..=4 {
        let permit = semaphore.clone().acquire_owned().await.unwrap();
        
        let handle = tokio::spawn(async move {
            println!("[Executing] Task {}", i);
            time::sleep(Duration::from_millis(500)).await;
            println!("[Completed] Task {}", i);
            
            // Keyingi vazifa ishlay olishi uchun permit'ni drop qilish
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

## Afzalliklari va kamchiliklari (Pros and Cons)

### Afzalliklari (Advantages)
- **Tizim barqarorligi**: Maksimal parallellikni cheklash orqali server trafik keskin oshishlari va OOM qulashlaridan himoyalanadi.
- **Adolatlilik va ustuvorlik**: Muhim tizimlar (masalan, to'lovlarni qayta ishlash) muhim bo'lmagan tizimlardan (masalan, analitika loglarini yuborish) oldinga o'ta oladi.
- **Resurslardan samarali foydalanish**: Scheduler'lar bilan birlashtirilgan thread pool'lar oqimlarni doimiy yaratish va yo'q qilishdagi katta OT (OS) xarajatlaridan qochadi.

### Kamchiliklari (Disadvantages)
- **Murakkablik**: Maxsus, thread-safe, ustuvorlikka asoslangan scheduler yozish juda qiyinligi bilan mashhur va race condition'larga moyil.
- **Yagona tor joy (Single Point of Bottleneck)**: Scheduler'ning o'zi har bir vazifani baholaydi. Agar scheduler algoritmi sekin bo'lsa, butun ilova to'xtab qoladi.
- **Ochlik (Starvation)**: Agar tizim doimiy ravishda Yuqori ustuvorlikdagi vazifalarni qabul qilsa, Past ustuvorlikdagi vazifalar navbatda abadiy qolib, hech qachon bajarilmaydi.

## Qachon foydalanish kerak (When to Use)

- **Operatsion tizimlar va kompilyatorlar**: OT oqimlarini boshqarish va CPU ajratishning markazida.
- **Fon vazifalarini qayta ishlash (Background Job Processing)**: Celery, Sidekiq yoki BullMQ kabi tizimlar taqsimlangan scheduler'lardir.
- **Rate Limiting**: Soniyasiga atigi 5 ta so'rovga ruxsat beradigan uchinchi tomon API'larini chaqirganda, chiquvchi so'rovlaringizni cheklash uchun scheduler ishlatishingiz shart.
- **Ma'lumotlar bazasi ulanishlar pul'i (Connection Pooling)**: Connection pool - bu bir vaqtning o'zida ma'lumotlar bazasiga nechta so'rov yuborilishini cheklaydigan scheduler'dir.

## Qachon foydalanmaslik kerak (When NOT to Use)

- **Oddiy ilovalar**: Agar ilovangiz tabiiy ravishda past yuklamani ko'tarsa, scheduler qo'shish erta optimallashtirish (premature optimization) hisoblanadi.
- **Freymvorklar buni taqdim etganda**: Java/Go/Rust da hech qachon o'z thread pool scheduler'ingizni yozmang. `ExecutorService`, `goroutines` yoki `Tokio` dan foydalaning. Maxsus scheduler mantig'ini faqat juda o'ziga xos biznes ustuvorlik qoidalari kerak bo'lganda yozing.

## Keng tarqalgan xatolar (Common Mistakes)

- **Ochlikni (Starvation) hisobga olmaslik**: "Aging" (navbatda juda uzoq kutib qolgan vazifalarning ustuvorligini asta-sekin oshirish) ni amalga oshirmaslik, natijada past ustuvorlikdagi vazifalar tashlab qo'yiladi.
- **Scheduler oqimini bloklash**: Agar vazifa ishchi oqimda emas, balki dispatcher oqimi*ning o'zida* sinxron bajarilsa, butun tizim qotib qoladi.

## Aloqador patternlar (Related Patterns)

- **[Producer-Consumer](/uz/architectural/producer-consumer)**: Scheduler - bu Producer-Consumer ning ilg'or varianti bo'lib, unda navbat ustuvorlik bo'yicha saralanadi va bajarilish qat'iy nazorat qilinadi.
- **Thread Pool**: Scheduler vazifalarni bajarish uchun foydalanadigan asosiy mexanizm.
- **[Command Pattern](/uz/behavioral/command)**: Scheduler navbatiga qo'yiladigan vazifalar odatda Command obyektlari bo'ladi.
