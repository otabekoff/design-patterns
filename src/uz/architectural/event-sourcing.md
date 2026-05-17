---
title: Event Sourcing
description: Obyekt holatini holat o'zgartiruvchi voqealar (events) ketma-ketligi sifatida saqlaydi
icon: Zap
---

# Event Sourcing

<CoverImage src="/covers/architectural/event-sourcing.png" alt="Cover">
  <h1>Event Sourcing</h1>
  <p>A neat, glowing ledger book where each page lists a simple transactional event ("+1 Apple", "-2 Apples", "+5 Apples"), and next to it, a basket of apples updates automatically as a robot plays back the pages.</p>
</CoverImage>

## Umumiy ko'rinish (Overview)

**Event Sourcing** ilova holatidagi barcha o'zgarishlarni o'zgarmas voqealar ketma-ketligi sifatida saqlanishini ta'minlaydigan arxitektura patternidir. Tizim faqat joriy holatni saqlash o'rniga, holat o'zgarishiga sabab bo'lgan barcha voqealarni (events) saqlaydi.

Asosiy tushunchalar:

- **Voqealar (Events)**: Holat o'zgarishlarining o'zgarmas yozuvlari
- **Voqealar ombori (Event Store)**: Faqat qo'shish (append-only) imkoniyati bo'lgan barcha voqealar saqlanadigan ma'lumotlar bazasi
- **Holat tasviri (Snapshots)**: Muayyan vaqtlardagi keshlangan holat
- **Voqealarni qayta o'ynash (Event Replay)**: Voqealarni qayta o'ynash orqali holatni tiklash

## Maqsad (Purpose)

Event Sourcing quyidagilarni maqsad qiladi:

- Barcha o'zgarishlarning to'liq audit tarixini saqlab qolish
- Vaqt bo'ylab sayohat qilib xatolarni topishni (time-travel debugging) ta'minlash (istalgan nuqtaga qaytish)
- Tizim ishonchliligi va tiklanish qobiliyatini yaxshilash
- Voqealarga asoslangan arxitekturalarni (event-driven) qo'llab-quvvatlash
- CQRS patternini amalga oshirishni ta'minlash
- Vaqtinchalik so'rovlar (temporal queries) uchun asos yaratish
- Bitta voqealar oqimidan (event stream) bir nechta ko'rinishlarni (views) qo'llab-quvvatlash

## Muammo (Problem)

An'anaviy holatni boshqarish quyidagi kamchiliklarga ega:

- Holat qanday o'zgargani haqida audit tarixi yo'q
- Holatdagi nomuvofiqliklarni tekshirish qiyin
- Xatolardan keyin tiklanish mexanizmi yo'q
- Biznes mantiq oqimini tushunish qiyin
- Hisobot funksiyalarini yaratish murakkab
- Qarama-qarshiliklarni hal qilish (conflict resolution) murakkab
- Tashqi tizimlar bilan integratsiya qilish qiyin

```
❌ An'anaviy holatni saqlash
Yangilash: John (yoshi: 30) → yoshi: 31
Yangilash: John (yoshi: 31) → yoshi: 32
O'chirish: Yozuv butunlay yo'qoldi (tarix yo'q)
```

## Yechim (Solution)

Event Sourcing barcha o'zgarishlarni saqlab qoladi:

```
✅ Event Sourcing
┌─────────────────────────────────────┐
│    Voqealar Ombori (Faqat-Qo'shish) │
├─────────────────────────────────────┤
│ Voqea 1: FoydalanuvchiYaratildi     │
│ Voqea 2: FoydalanuvchiYoshiOzgardi  │
│ Voqea 3: FoydalanuvchiYoshiOzgardi  │
│ Voqea 4: FoydalanuvchiIsmiOzgardi   │
└─────────────────────────────────────┘
         ▼
Holatni tiklash uchun voqealarni qayta o'ynash
```

## Amalga oshirish (Implementation)

::: code-group

```typescript [typescript]
// Domain Events
interface DomainEvent {
  eventId: string;
  timestamp: Date;
  aggregateId: string;
  eventType: string;
  version: number;
}

interface UserCreatedEvent extends DomainEvent {
  eventType: "UserCreated";
  name: string;
  email: string;
}

interface UserAgedEvent extends DomainEvent {
  eventType: "UserAged";
  newAge: number;
}

// Aggregate Root
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  version: number;
}

// Event Store
class EventStore {
  private events: DomainEvent[] = [];

  appendEvent(event: DomainEvent): void {
    this.events.push(event);
    console.log(`[Event Store] Event appended: ${event.eventType}`);
  }

  getEventsByAggregateId(aggregateId: string): DomainEvent[] {
    return this.events.filter((e) => e.aggregateId === aggregateId);
  }

  getAllEvents(): DomainEvent[] {
    return [...this.events];
  }
}

// User Aggregate
class UserAggregate {
  private id: string;
  private name: string = "";
  private email: string = "";
  private age: number = 0;
  private version: number = 0;
  private uncommittedEvents: DomainEvent[] = [];

  constructor(id: string) {
    this.id = id;
  }

  createUser(name: string, email: string, age: number): void {
    const event: UserCreatedEvent = {
      eventId: `event-${Date.now()}`,
      timestamp: new Date(),
      aggregateId: this.id,
      eventType: "UserCreated",
      version: this.version + 1,
      name,
      email,
    };

    this.applyEvent(event);
    this.uncommittedEvents.push(event);
  }

  ageUser(years: number): void {
    const event: UserAgedEvent = {
      eventId: `event-${Date.now()}`,
      timestamp: new Date(),
      aggregateId: this.id,
      eventType: "UserAged",
      version: this.version + 1,
      newAge: this.age + years,
    };

    this.applyEvent(event);
    this.uncommittedEvents.push(event);
  }

  private applyEvent(event: DomainEvent): void {
    if (event.eventType === "UserCreated") {
      const e = event as UserCreatedEvent;
      this.name = e.name;
      this.email = e.email;
      this.age = 0;
      this.version = e.version;
    } else if (event.eventType === "UserAged") {
      const e = event as UserAgedEvent;
      this.age = e.newAge;
      this.version = e.version;
    }
  }

  loadFromHistory(events: DomainEvent[]): void {
    events.forEach((event) => this.applyEvent(event));
  }

  getUncommittedEvents(): DomainEvent[] {
    return this.uncommittedEvents;
  }

  markEventsAsCommitted(): void {
    this.uncommittedEvents = [];
  }

  getState(): User {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      age: this.age,
      version: this.version,
    };
  }
}

// Repository
class UserRepository {
  constructor(private eventStore: EventStore) {}

  save(aggregate: UserAggregate): void {
    const events = aggregate.getUncommittedEvents();
    events.forEach((event) => this.eventStore.appendEvent(event));
    aggregate.markEventsAsCommitted();
  }

  getById(id: string): UserAggregate {
    const aggregate = new UserAggregate(id);
    const events = this.eventStore.getEventsByAggregateId(id);
    aggregate.loadFromHistory(events);
    return aggregate;
  }
}

// Usage
const eventStore = new EventStore();
const repository = new UserRepository(eventStore);

const user = new UserAggregate("user-1");
user.createUser("John Doe", "john@example.com", 30);
repository.save(user);

user.ageUser(1);
user.ageUser(1);
repository.save(user);

console.log("\n=== Current State ===");
console.log(user.getState());

console.log("\n=== Event History ===");
const events = eventStore.getEventsByAggregateId("user-1");
events.forEach((e) => console.log(`${e.timestamp.toISOString()}: ${e.eventType}`));

console.log("\n=== Replay to Rebuild State ===");
const replayedUser = repository.getById("user-1");
console.log(replayedUser.getState());
```

```python [python]
from abc import ABC, abstractmethod
from typing import List, Optional
from dataclasses import dataclass, field
from datetime import datetime

# Domain Events
@dataclass
class DomainEvent:
    event_id: str
    timestamp: datetime
    aggregate_id: str
    event_type: str
    version: int

@dataclass
class UserCreatedEvent(DomainEvent):
    name: str = ""
    email: str = ""

@dataclass
class UserAgedEvent(DomainEvent):
    new_age: int = 0

# User State
@dataclass
class User:
    id: str
    name: str
    email: str
    age: int
    version: int

# Event Store
class EventStore:
    def __init__(self):
        self.events: List[DomainEvent] = []

    def append_event(self, event: DomainEvent) -> None:
        self.events.append(event)
        print(f"[Event Store] Event appended: {event.event_type}")

    def get_events_by_aggregate_id(self, aggregate_id: str) -> List[DomainEvent]:
        return [e for e in self.events if e.aggregate_id == aggregate_id]

    def get_all_events(self) -> List[DomainEvent]:
        return self.events.copy()

# User Aggregate
class UserAggregate:
    def __init__(self, user_id: str):
        self.id = user_id
        self.name = ""
        self.email = ""
        self.age = 0
        self.version = 0
        self.uncommitted_events: List[DomainEvent] = []

    def create_user(self, name: str, email: str, age: int = 0) -> None:
        event = UserCreatedEvent(
            event_id=f"event-{int(datetime.now().timestamp())}",
            timestamp=datetime.now(),
            aggregate_id=self.id,
            event_type="UserCreated",
            version=self.version + 1,
            name=name,
            email=email
        )
        self.apply_event(event)
        self.uncommitted_events.append(event)

    def age_user(self, years: int) -> None:
        event = UserAgedEvent(
            event_id=f"event-{int(datetime.now().timestamp())}",
            timestamp=datetime.now(),
            aggregate_id=self.id,
            event_type="UserAged",
            version=self.version + 1,
            new_age=self.age + years
        )
        self.apply_event(event)
        self.uncommitted_events.append(event)

    def apply_event(self, event: DomainEvent) -> None:
        if event.event_type == "UserCreated":
            self.name = event.name
            self.email = event.email
            self.age = 0
            self.version = event.version
        elif event.event_type == "UserAged":
            self.age = event.new_age
            self.version = event.version

    def load_from_history(self, events: List[DomainEvent]) -> None:
        for event in events:
            self.apply_event(event)

    def get_uncommitted_events(self) -> List[DomainEvent]:
        return self.uncommitted_events.copy()

    def mark_events_as_committed(self) -> None:
        self.uncommitted_events = []

    def get_state(self) -> User:
        return User(
            id=self.id,
            name=self.name,
            email=self.email,
            age=self.age,
            version=self.version
        )

# Repository
class UserRepository:
    def __init__(self, event_store: EventStore):
        self.event_store = event_store

    def save(self, aggregate: UserAggregate) -> None:
        events = aggregate.get_uncommitted_events()
        for event in events:
            self.event_store.append_event(event)
        aggregate.mark_events_as_committed()

    def get_by_id(self, user_id: str) -> UserAggregate:
        aggregate = UserAggregate(user_id)
        events = self.event_store.get_events_by_aggregate_id(user_id)
        aggregate.load_from_history(events)
        return aggregate

# Usage
if __name__ == "__main__":
    event_store = EventStore()
    repository = UserRepository(event_store)

    user = UserAggregate("user-1")
    user.create_user("John Doe", "john@example.com", 30)
    repository.save(user)

    user.age_user(1)
    user.age_user(1)
    repository.save(user)

    print("\n=== Current State ===")
    print(user.get_state())

    print("\n=== Event History ===")
    events = event_store.get_events_by_aggregate_id("user-1")
    for e in events:
        print(f"{e.timestamp.isoformat()}: {e.event_type}")

    print("\n=== Replay to Rebuild State ===")
    replayed_user = repository.get_by_id("user-1")
    print(replayed_user.get_state())
```

:::

## Afzalliklari (Advantages) ✅

- **To'liq audit tarixi (Complete Audit Trail)**: Barcha o'zgarishlarning to'liq tarixi
- **Vaqt bo'ylab sayohat (Time-Travel)**: Istalgan nuqtadagi holatni qayta qurish mumkin
- **Nosozliklarni topish (Debugging)**: Nima sodir bo'lganini tushunish oson
- **Tiklanish (Recovery)**: Xatolardan tiklanish uchun voqealarni qayta o'ynatish
- **Voqealarga asoslangan (Event-Driven)**: Voqealarga asoslangan tizimlar uchun poydevor
- **Vaqtinchalik so'rovlar (Temporal Queries)**: Muayyan vaqtlardagi holatni so'rash
- **Bir nechta ko'rinishlar (Multiple Views)**: Bir xil voqealardan turli xil proyeksiyalar yaratish
- **Muvofiqlik (Compliance)**: Qonuniy talablar uchun juda mos

## Kamchiliklari (Disadvantages) ❌

- **Murakkablik (Complexity)**: Murakkab kod bazasi
- **Saqlash xotirasi (Storage)**: Voqealar katta joy talab qiladi
- **O'rganish vaqti (Learning Curve)**: Dasturchilar uchun boshqacha paradigma
- **So'rov ishlashi (Query Performance)**: Murakkab so'rovlarni optimallashtirish qiyin
- **Kechikkan muvofiqlik (Eventual Consistency)**: Proyeksiyalar ma'lum vaqtdan keyingina yangilanadi
- **Voqea versiyasi (Event Versioning)**: Rivojlanayotgan voqea sxemalarini boshqarish qiyin
- **Snapshot boshqaruvi**: Katta voqealar oqimi uchun murakkab
- **Nosozliklarni topish**: Asosiy sabablarni qidirish maydoni kattaroq

## Qachon foydalanish kerak (When to Use) ✅

- **Audit talablari**: To'liq o'zgarishlar tarixi kerak bo'lsa
- **Murakkab domenlar**: Qiyin biznes mantig'iga ega tizimlar
- **Vaqtinchalik so'rovlar**: Tarixiy holat talab qilinganda
- **Voqealarga asoslangan tizimlar**: Tizim allaqachon voqealarga asoslangan bo'lsa
- **Muvofiqlik (Compliance)**: Me'yoriy va qonuniy talablar
- **CQRS**: CQRS patternidan foydalanilganda
- **Xatolarni o'rganish**: Nima sodir bo'lganini aniq tushunish kerak bo'lsa
- **Bir nechta proyeksiyalar**: Turli xil ko'rinishlar kerak bo'lsa

## Qachon foydalanmaslik kerak (When NOT to Use) ❌

- **Oddiy CRUD ilovalari**: Oddiy ilovalarni o'ta murakkablashtirish
- **Real vaqtda ishlash**: Qat'iy kechikish (latency) talablari bo'lganda
- **Tezlik muhim bo'lganda**: Qo'shimcha yuklama (overhead) sezilarli ta'sir qilsa
- **Xotira cheklangan**: Diskda joy kam bo'lganda
- **O'rganish vaqti**: Jamoa bu pattern bilan tanish bo'lmasa
- **Oddiy holat (Simple State)**: To'g'ridan-to'g'ri talablar bo'lsa
- **Tezkor prototiplash**: Tez yaratib tashlanadigan kodlar uchun
- **Eski tizimlar (Legacy Systems)**: Eski loyihalarga qo'shish qiyin

## Aloqador Patternlar (Related Patterns)

- **CQRS**: Ko'pincha birgalikda ishlatiladi
- **Saga Pattern**: Taqsimlangan tranzaksiyalar uchun
- **Snapshot Pattern**: Tezlikni optimallashtirish uchun
- **Observer Pattern**: Voqealar haqida xabar berish uchun
- **Memento Pattern**: Holatni tiklash uchun
