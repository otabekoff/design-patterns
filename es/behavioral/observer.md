---
title: Observer
description: Define a one-to-many dependency between objects. When one object changes state, all dependents are notified automatically.
icon: Bell
---

# Observer



## Overview

The **Observer** pattern is a behavioral design pattern that defines a one-to-many relationship between objects so that when one object changes state, all its dependents are notified automatically. It promotes loose coupling between objects that need to communicate.

## Purpose

The Observer pattern aims to:

- Establish a one-to-many dependency between objects
- Notify multiple objects about state changes automatically
- Promote loose coupling between objects
- Support event-driven programming
- Enable dynamic subscription/unsubscription
- Facilitate real-time updates across the system

## Problem

Consider updating multiple UI components when data changes:

```typescript
// Without Observer pattern - tightly coupled
class DataModel {
  private data: string = "";
  private displays: Display[] = [];

  setData(data: string): void {
    this.data = data;
    // Manually update each display - tightly coupled
    displays[0].update(data);
    displays[1].update(data);
    displays[2].update(data);
  }
}
```

Issues with this approach:

- Tight coupling between model and views
- Adding new views requires modifying the model
- Views can't dynamically subscribe or unsubscribe
- Hard to manage multiple views
- Not scalable for systems with many observers

## Solution

The Observer pattern decouples observers from the subject:

```typescript
// Observer interface
interface Observer {
  update(data: any): void;
}

// Subject interface
interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

// Concrete subject
class DataModel implements Subject {
  private observers: Observer[] = [];
  private data: string = "";

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(): void {
    this.observers.forEach((obs) => obs.update(this.data));
  }

  setData(data: string): void {
    this.data = data;
    this.notify();
  }
}
```

## Implementation

::: code-group

```typescript [typescript]
// Observer interface
    interface Observer {
      update(subject: Subject): void;
      getId(): string;
    }

    // Subject interface
    interface Subject {
      attach(observer: Observer): void;
      detach(observer: Observer): void;
      notify(): void;
    }

    // Concrete Subject
    class Stock implements Subject {
      private observers: Observer[] = [];
      private symbol: string;
      private price: number = 0;

      constructor(symbol: string) {
        this.symbol = symbol;
      }

      attach(observer: Observer): void {
        if (!this.observers.includes(observer)) {
          this.observers.push(observer);
          console.log(`${observer.getId()} subscribed to ${this.symbol}`);
        }
      }

      detach(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
          this.observers.splice(index, 1);
          console.log(`${observer.getId()} unsubscribed from ${this.symbol}`);
        }
      }

      notify(): void {
        this.observers.forEach(observer => observer.update(this));
      }

      setPrice(price: number): void {
        console.log(`\nStock price changed: ${this.symbol} -> $${price}`);
        this.price = price;
        this.notify();
      }

      getPrice(): number {
        return this.price;
      }

      getSymbol(): string {
        return this.symbol;
      }
    }

    // Concrete Observer 1
    class PortfolioObserver implements Observer {
      private id: string;
      private portfolio: Map<string, number> = new Map();

      constructor(id: string) {
        this.id = id;
      }

      update(subject: Stock): void {
        const symbol = subject.getSymbol();
        const price = subject.getPrice();
        this.portfolio.set(symbol, price);
        console.log(`Portfolio ${this.id}: ${symbol} price updated to $${price}`);
      }

      getId(): string {
        return this.id;
      }
    }

    // Concrete Observer 2
    class AlertObserver implements Observer {
      private id: string;
      private threshold: number;

      constructor(id: string, threshold: number) {
        this.id = id;
        this.threshold = threshold;
      }

      update(subject: Stock): void {
        const price = subject.getPrice();
        if (price > this.threshold) {
          console.log(`ALERT ${this.id}: ${subject.getSymbol()} price ($${price}) exceeds threshold ($${this.threshold})`);
        }
      }

      getId(): string {
        return this.id;
      }
    }

    // Concrete Observer 3
    class AnalystObserver implements Observer {
      private id: string;
      private priceHistory: Map<string, number[]> = new Map();

      constructor(id: string) {
        this.id = id;
      }

      update(subject: Stock): void {
        const symbol = subject.getSymbol();
        const price = subject.getPrice();

        if (!this.priceHistory.has(symbol)) {
          this.priceHistory.set(symbol, []);
        }
        this.priceHistory.get(symbol)!.push(price);

        const history = this.priceHistory.get(symbol)!;
        const average = history.reduce((a, b) => a + b) / history.length;
        console.log(`Analyst ${this.id}: ${symbol} moving average: $${average.toFixed(2)}`);
      }

      getId(): string {
        return this.id;
      }
    }

    // Usage
    const stock = new Stock('ACME');

    const portfolio = new PortfolioObserver('Portfolio1');
    const alert = new AlertObserver('Alert1', 100);
    const analyst = new AnalystObserver('Analyst1');

    stock.attach(portfolio);
    stock.attach(alert);
    stock.attach(analyst);

    stock.setPrice(95);
    stock.setPrice(105);
    stock.setPrice(98);

    stock.detach(alert);
    stock.setPrice(110);
```


  
```python [python]
from abc import ABC, abstractmethod
    from typing import List, Dict

    class Observer(ABC):
        @abstractmethod
        def update(self, subject: 'Subject') -> None:
            pass

        @abstractmethod
        def get_id(self) -> str:
            pass

    class Subject(ABC):
        @abstractmethod
        def attach(self, observer: Observer) -> None:
            pass

        @abstractmethod
        def detach(self, observer: Observer) -> None:
            pass

        @abstractmethod
        def notify(self) -> None:
            pass

    class Stock(Subject):
        def __init__(self, symbol: str):
            self.observers: List[Observer] = []
            self.symbol = symbol
            self.price = 0

        def attach(self, observer: Observer) -> None:
            if observer not in self.observers:
                self.observers.append(observer)
                print(f"{observer.get_id()} subscribed to {self.symbol}")

        def detach(self, observer: Observer) -> None:
            if observer in self.observers:
                self.observers.remove(observer)
                print(f"{observer.get_id()} unsubscribed from {self.symbol}")

        def notify(self) -> None:
            for observer in self.observers:
                observer.update(self)

        def set_price(self, price: float) -> None:
            print(f"\nStock price changed: {self.symbol} -> ${price}")
            self.price = price
            self.notify()

        def get_price(self) -> float:
            return self.price

        def get_symbol(self) -> str:
            return self.symbol

    class PortfolioObserver(Observer):
        def __init__(self, observer_id: str):
            self.id = observer_id
            self.portfolio: Dict[str, float] = {}

        def update(self, subject: Stock) -> None:
            symbol = subject.get_symbol()
            price = subject.get_price()
            self.portfolio[symbol] = price
            print(f"Portfolio {self.id}: {symbol} price updated to ${price}")

        def get_id(self) -> str:
            return self.id

    class AlertObserver(Observer):
        def __init__(self, observer_id: str, threshold: float):
            self.id = observer_id
            self.threshold = threshold

        def update(self, subject: Stock) -> None:
            price = subject.get_price()
            if price > self.threshold:
                print(
                    f"ALERT {self.id}: {subject.get_symbol()} price (${price}) exceeds threshold (${self.threshold})"
                )

        def get_id(self) -> str:
            return self.id

    class AnalystObserver(Observer):
        def __init__(self, observer_id: str):
            self.id = observer_id
            self.price_history: Dict[str, List[float]] = {}

        def update(self, subject: Stock) -> None:
            symbol = subject.get_symbol()
            price = subject.get_price()

            if symbol not in self.price_history:
                self.price_history[symbol] = []

            self.price_history[symbol].append(price)

            history = self.price_history[symbol]
            average = sum(history) / len(history)
            print(f"Analyst {self.id}: {symbol} moving average: ${average:.2f}")

        def get_id(self) -> str:
            return self.id

    # Usage
    stock = Stock("ACME")

    portfolio = PortfolioObserver("Portfolio1")
    alert = AlertObserver("Alert1", 100)
    analyst = AnalystObserver("Analyst1")

    stock.attach(portfolio)
    stock.attach(alert)
    stock.attach(analyst)

    stock.set_price(95)
    stock.set_price(105)
    stock.set_price(98)

    stock.detach(alert)
    stock.set_price(110)
```

:::

## Real-World Example

### Event-Driven UI System

```typescript
interface UIObserver {
  onThemeChange(theme: "light" | "dark"): void;
}

class ThemeManager {
  private observers: UIObserver[] = [];
  private currentTheme: "light" | "dark" = "light";

  subscribe(observer: UIObserver): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: UIObserver): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  setTheme(theme: "light" | "dark"): void {
    if (this.currentTheme !== theme) {
      this.currentTheme = theme;
      this.notifyAll();
    }
  }

  private notifyAll(): void {
    this.observers.forEach((obs) => obs.onThemeChange(this.currentTheme));
  }
}

class Button implements UIObserver {
  constructor(private name: string) {}

  onThemeChange(theme: "light" | "dark"): void {
    const color = theme === "light" ? "black" : "white";
    console.log(`${this.name} button text color: ${color}`);
  }
}

class Panel implements UIObserver {
  constructor(private name: string) {}

  onThemeChange(theme: "light" | "dark"): void {
    const bgColor = theme === "light" ? "white" : "gray";
    console.log(`${this.name} panel background: ${bgColor}`);
  }
}

// Usage
const themeManager = new ThemeManager();
const button = new Button("Submit");
const panel = new Panel("MainPanel");

themeManager.subscribe(button);
themeManager.subscribe(panel);

themeManager.setTheme("dark");
```

## Advantages

✅ **Loose Coupling** - Subjects and observers are loosely coupled
✅ **Dynamic Relationships** - Observers can subscribe/unsubscribe at runtime
✅ **Scalability** - Easy to add new observers without changing existing code
✅ **Event-Driven** - Supports reactive, event-driven architectures
✅ **Separation of Concerns** - Subjects focus on business logic, observers on responses
✅ **Reusability** - Observers and subjects can be reused independently
✅ **One-to-Many** - Efficiently supports one-to-many communication

## Disadvantages

❌ **Order of Notification** - No control over order observers are notified
❌ **Memory Leaks** - Forgetting to unsubscribe can cause memory leaks
❌ **Performance** - Notifying many observers can be slow
❌ **Debugging Complexity** - Hard to trace which observer is causing issues
❌ **Unexpected Updates** - Observers might receive updates they don't expect
❌ **Testing Difficulty** - Can be complex to test observer interactions
❌ **Over-Engineering** - May be overkill for simple systems

## When to Use

- You need to update multiple objects based on state changes
- An object should notify others without assuming who those objects are
- You want to support dynamic subscription/unsubscription
- You're building event-driven systems
- You want to create loosely coupled components
- You need real-time notifications
- You're building publish-subscribe systems

## When NOT to Use

- Only one or two objects need to know about state changes
- Direct method calls would be more efficient
- The system is simple enough that loose coupling isn't needed
- You need guaranteed notification order
- Performance is critical with many observers
- You can use simpler mechanisms like callbacks
- Observers always need to be created at compile time

## Related Patterns

- **Mediator** - Alternative for complex object interactions
- **Event Aggregator** - Centralized event management
- **Reactive Extensions** - Advanced event handling
- **Publisher-Subscriber** - Similar but typically with separate infrastructure
- **Weak References** - Can help prevent memory leaks in observers
