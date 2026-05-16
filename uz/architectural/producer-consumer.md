---
title: Producer-Consumer (Ishlab chiqaruvchi-Iste'molchi)
description: Buffer yoki navbat yordamida ishlab chiqaruvchilar va iste'molchilarni ajratadi
icon: Play
---

# Producer-Consumer (Ishlab chiqaruvchi-Iste'molchi)



## Umumiy ko'rinish (Overview)

**Producer-Consumer (Ishlab chiqaruvchi-Iste'molchi)** patterni bufer (buffer) yoki navbatdan (queue) foydalangan holda ma'lumotlarni ishlab chiqarishni ularni iste'mol qilishdan ajratadi (decouples). Ishlab chiqaruvchilar (producers) buferga elementlar qo'shadilar, iste'molchilar (consumers) esa ularni mustaqil ravishda olib, qayta ishlashadi.

Asosiy tushunchalar:

- **Producer (Ishlab chiqaruvchi)**: Ma'lumotlarni yoki ish elementlarini yaratadi
- **Consumer (Iste'molchi)**: Ma'lumotlarni yoki ish elementlarini qayta ishlaydi
- **Buffer/Queue (Bufer/Navbat)**: Oraliq ma'lumot saqlash joyi
- **Decoupling (Ajratish)**: Ishlab chiqarish va iste'mol qilishning mustaqil tezliklari

## Maqsad (Purpose)

Producer-Consumer patternining maqsadi:

- Ishlab chiqarishni iste'mol qilishdan ajratish
- Turli xil ishlab chiqarish va iste'mol tezliklarini boshqarish
- Tizimning o'tkazuvchanligini (throughput) yaxshilash
- Parallel qayta ishlashga imkon berish
- Resurslarning bloklanishini kamaytirish
- Asinxron ish jarayonlarini (workflows) qo'llab-quvvatlash

## Muammo (Problem)

Bu ajratishsiz tizimlardagi muammolar:

- Ishlab chiqaruvchilar iste'molchilarni kutib bloklanib qoladi
- Iste'molchilar ishlab chiqaruvchilarni kutib bloklanib qoladi
- Resurslardan samarasiz foydalanish
- Ish yukini muvozanatlash (balance) qiyin
- Ishlash tezligida muammolar (Performance bottlenecks)

```
❌ To'g'ridan-to'g'ri Producer-Consumer
Producer → bloklangan → Consumer
```

## Yechim (Solution)

Bufer (buffer) ishlab chiqaruvchi va iste'molchini ajratadi:

```
✅ Buferga ega Producer-Consumer
Producer → [Buffer/Queue] → Consumer
        (Mustaqil tezliklar)
```

## Amalga oshirish (Implementation)

::: code-group

```typescript [typescript]
// Queue implementation
class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

// Work item
interface WorkItem {
  id: number;
  data: string;
}

// Producer
class DataProducer {
  constructor(private queue: Queue<WorkItem>) {}

  produce(count: number): void {
    for (let i = 0; i < count; i++) {
      const item: WorkItem = {
        id: i,
        data: `Item ${i}`,
      };
      this.queue.enqueue(item);
      console.log(`✅ Produced: ${item.data}`);
    }
  }
}

// Consumer
class DataConsumer {
  constructor(private queue: Queue<WorkItem>) {}

  consume(maxItems: number = 10): void {
    let count = 0;
    while (!this.queue.isEmpty() && count < maxItems) {
      const item = this.queue.dequeue();
      if (item) {
        this.processItem(item);
        count++;
      }
    }
  }

  private processItem(item: WorkItem): void {
    console.log(`👤 Consumed: ${item.data}`);
  }
}

// Usage
const queue = new Queue<WorkItem>();
const producer = new DataProducer(queue);
const consumer = new DataConsumer(queue);

console.log("=== Producing items ===");
producer.produce(5);

console.log("\n=== Consuming items ===");
consumer.consume();

console.log(`\nQueue size: ${queue.size()}`);
```



```python [python]
from typing import TypeVar, Generic, List, Optional
from dataclasses import dataclass
import time

T = TypeVar('T')

# Queue implementation
class Queue(Generic[T]):
    def __init__(self):
        self.items: List[T] = []

    def enqueue(self, item: T) -> None:
        self.items.append(item)

    def dequeue(self) -> Optional[T]:
        return self.items.pop(0) if self.items else None

    def is_empty(self) -> bool:
        return len(self.items) == 0

    def size(self) -> int:
        return len(self.items)

# Work item
@dataclass
class WorkItem:
    id: int
    data: str

# Producer
class DataProducer:
    def __init__(self, queue: Queue):
        self.queue = queue

    def produce(self, count: int) -> None:
        for i in range(count):
            item = WorkItem(id=i, data=f"Item {i}")
            self.queue.enqueue(item)
            print(f"✅ Produced: {item.data}")

# Consumer
class DataConsumer:
    def __init__(self, queue: Queue):
        self.queue = queue

    def consume(self, max_items: int = 10) -> None:
        count = 0
        while not self.queue.is_empty() and count < max_items:
            item = self.queue.dequeue()
            if item:
                self.process_item(item)
                count += 1

    def process_item(self, item: WorkItem) -> None:
        print(f"👤 Consumed: {item.data}")

# Usage
if __name__ == "__main__":
    queue: Queue[WorkItem] = Queue()
    producer = DataProducer(queue)
    consumer = DataConsumer(queue)

    print("=== Producing items ===")
    producer.produce(5)

    print("\n=== Consuming items ===")
    consumer.consume()

    print(f"\nQueue size: {queue.size()}")
```

:::

## Haqiqiy hayotdagi misollar (Real-World Examples)

- **Thread Pools (Oqimlar hovuzi)**: Oqimlar vazifalarni (tasks) ishlab chiqaradi va iste'mol qiladi
- **Xabarlar navbati (Message Queues)**: RabbitMQ, Kafka
- **Ma'lumotlar quvurlari (Data Pipelines)**: ETL jarayonlari
- **Veb Serverlar**: So'rov/javoblarni (request/response) qayta ishlash
- **Oqimni qayta ishlash (Stream Processing)**: Spark, Flink

## Afzalliklari (Advantages) ✅

- **Ajratish (Decoupling)**: Mustaqil ishlab chiqarish va iste'mol qilish
- **O'tkazuvchanlik (Throughput)**: Yaxshiroq tizim tezligi
- **Kengayuvchanlik (Scalability)**: Ishlab chiqaruvchilar yoki iste'molchilarni oson qo'shish
- **Bufer (Buffer)**: Tezlikdagi nomuvofiqliklarni hal qiladi
- **Moslashuvchanlik (Flexibility)**: Turli xil ishlash ritmi
- **Reaksiya (Responsive)**: Bloklanishlarni kamaytiradi
- **Yuklamani taqsimlash (Load Balancing)**: Ishni teng taqsimlaydi
- **Chidamlilik (Resilience)**: Kutilmagan yuklama (spikes) bilan ishlash imkoniyati

## Kamchiliklari (Disadvantages) ❌

- **Murakkablik (Complexity)**: Ko'proq kod yozish kerak
- **Xotira (Memory)**: Bufer xotira talab qiladi
- **Kechikish (Latency)**: Navbat ma'lumot uzatishda kechikish qo'shishi mumkin
- **Tartib (Ordering)**: Har doim ham tartibni saqlab qolmasligi mumkin
- **Nosozliklarni topish (Debugging)**: Muammolarni qidirish qiyinroq
- **To'lib ketish (Overflow)**: Bufer to'lib ketishi mumkin
- **Bo'sh qolish (Underflow)**: Navbatda ma'lumot yetishmasligi mumkin
- **Sinxronizatsiya (Synchronization)**: Murakkab oqimlarni boshqarish (threading)

## Qachon foydalanish kerak (When to Use) ✅

- **Parallel qayta ishlash**: Bir nechta oqimlarda (threads) ishlaganda
- **Tezlik nomuvofiqligi**: Ishlab chiqarish va iste'mol qilish turli tezliklarda bo'lganda
- **Asinxron vazifalar**: Bir-biridan ajratilgan ishlar uchun
- **Buferlash (Buffering)**: Ish yukini silliqlashda
- **Thread Pools**: Vazifalar navbatini (work queues) yaratishda
- **Xabarlar tizimi (Message Systems)**: Xabarlar navbatidan foydalanilganda
- **Real vaqt tizimlari (Real-Time Systems)**: Kutilmagan katta so'rovlarni (bursts) boshqarishda
- **Ma'lumotlar quvurlari (Data Pipelines)**: ETL jarayonlarida

## Qachon foydalanmaslik kerak (When NOT to Use) ❌

- **Oddiy ketma-ketlikda (Simple Sequential)**: Ishlar birma-bir bajarilsa
- **Kechikish muhim bo'lsa (Real-Time Critical)**: Latency o'ta muhim bo'lgan hollarda
- **Xotira cheklangan bo'lsa (Limited Memory)**: Bufer uchun xotira yetishmasa
- **Tartib muhim bo'lsa (Ordering Critical)**: Voqealar aniq tartibda saqlanishi shart bo'lsa
- **Oddiy vazifalar**: Ortiqcha muhandislik (over-engineering) bo'lsa
- **Past o'tkazuvchanlik (Low Throughput)**: Ushbu patterndan hech qanday foyda bo'lmasa
- **Sinxron API (Synchronous API)**: So'rovlarga darhol javob qaytarish kerak bo'lsa
- **Bitta oqimda (Single Threaded)**: Hech qanday parallel ishlash talab etilmasa

## Aloqador Patternlar (Related Patterns)

- **Observer Pattern**: Voqealar (event) xabarnomalari
- **Mediator Pattern**: Markazlashtirilgan aloqa uchun
- **Command Pattern**: Navbatdagi buyruqlar uchun
- **Thread Pool Pattern**: Producer-consumer variantlaridan biri
