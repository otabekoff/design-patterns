---
title: Strategy
description: Define a family of algorithms, encapsulate each one, and make them interchangeable. Promote algorithm flexibility.
icon: ScrollText
---

# Strategy

![Cover](/covers/behavioral/strategy.png)

## Overview

The **Strategy** pattern is a behavioral design pattern that defines a family of algorithms, encapsulates each one, and makes them interchangeable. It lets the algorithm vary independently from clients that use it. This pattern promotes open/closed principle and makes code more flexible.

## Purpose

The Strategy pattern aims to:

- Define a family of algorithms
- Encapsulate each algorithm in separate classes
- Make algorithms interchangeable
- Allow clients to choose algorithms at runtime
- Eliminate conditional logic for algorithm selection
- Promote code reuse and flexibility

## Problem

Consider a payment processor with different payment methods:

```typescript
// Without Strategy pattern - complex conditionals
class PaymentProcessor {
  processPayment(amount: number, method: string): void {
    if (method === "credit_card") {
      // Process credit card payment
    } else if (method === "paypal") {
      // Process PayPal payment
    } else if (method === "bitcoin") {
      // Process Bitcoin payment
    }
  }
}
```

Issues with this approach:

- Adding new payment methods requires modifying the class
- Complex nested conditionals
- Algorithms are tightly coupled to the processor
- Hard to test individual algorithms
- Violates open/closed principle

## Solution

The Strategy pattern encapsulates each algorithm in its own class:

```typescript
// Strategy interface
interface PaymentStrategy {
  pay(amount: number): void;
}

// Concrete strategies
class CreditCardStrategy implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Processing credit card payment: $${amount}`);
  }
}

// Context
class PaymentProcessor {
  private strategy: PaymentStrategy;

  setStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy;
  }

  processPayment(amount: number): void {
    this.strategy.pay(amount);
  }
}
```

## Implementation

::: code-group

```typescript [typescript]
// Strategy interface
    interface SortingStrategy {
      sort(array: number[]): number[];
      getName(): string;
    }

    // Concrete strategies
    class BubbleSortStrategy implements SortingStrategy {
      sort(array: number[]): number[] {
        const result = [...array];
        for (let i = 0; i < result.length; i++) {
          for (let j = 0; j < result.length - i - 1; j++) {
            if (result[j] > result[j + 1]) {
              [result[j], result[j + 1]] = [result[j + 1], result[j]];
            }
          }
        }
        return result;
      }

      getName(): string {
        return 'Bubble Sort';
      }
    }

    class QuickSortStrategy implements SortingStrategy {
      sort(array: number[]): number[] {
        if (array.length <= 1) return array;

        const pivot = array[Math.floor(array.length / 2)];
        const left = array.filter(x => x < pivot);
        const middle = array.filter(x => x === pivot);
        const right = array.filter(x => x > pivot);

        return [
          ...this.sort(left),
          ...middle,
          ...this.sort(right)
        ];
      }

      getName(): string {
        return 'Quick Sort';
      }
    }

    class MergeSortStrategy implements SortingStrategy {
      sort(array: number[]): number[] {
        if (array.length <= 1) return array;

        const mid = Math.floor(array.length / 2);
        const left = this.sort(array.slice(0, mid));
        const right = this.sort(array.slice(mid));

        return this.merge(left, right);
      }

      private merge(left: number[], right: number[]): number[] {
        const result: number[] = [];
        let i = 0, j = 0;

        while (i < left.length && j < right.length) {
          if (left[i] <= right[j]) {
            result.push(left[i++]);
          } else {
            result.push(right[j++]);
          }
        }

        return [...result, ...left.slice(i), ...right.slice(j)];
      }

      getName(): string {
        return 'Merge Sort';
      }
    }

    // Context
    class Sorter {
      private strategy: SortingStrategy;

      constructor(strategy: SortingStrategy) {
        this.strategy = strategy;
      }

      setStrategy(strategy: SortingStrategy): void {
        this.strategy = strategy;
      }

      sort(array: number[]): number[] {
        console.log(`Sorting with ${this.strategy.getName()}`);
        const startTime = performance.now();
        const result = this.strategy.sort([...array]);
        const endTime = performance.now();
        console.log(`Time: ${(endTime - startTime).toFixed(2)}ms`);
        return result;
      }
    }

    // Usage
    const data = [64, 34, 25, 12, 22, 11, 90];
    const sorter = new Sorter(new BubbleSortStrategy());

    console.log('Original:', data);
    console.log('Sorted:', sorter.sort(data));

    sorter.setStrategy(new QuickSortStrategy());
    console.log('Sorted:', sorter.sort(data));

    sorter.setStrategy(new MergeSortStrategy());
    console.log('Sorted:', sorter.sort(data));
```

  
```python [python]
from abc import ABC, abstractmethod
    from typing import List
    import time

    class SortingStrategy(ABC):
        @abstractmethod
        def sort(self, array: List[int]) -> List[int]:
            pass

        @abstractmethod
        def get_name(self) -> str:
            pass

    class BubbleSortStrategy(SortingStrategy):
        def sort(self, array: List[int]) -> List[int]:
            result = array.copy()
            for i in range(len(result)):
                for j in range(len(result) - i - 1):
                    if result[j] > result[j + 1]:
                        result[j], result[j + 1] = result[j + 1], result[j]
            return result

        def get_name(self) -> str:
            return "Bubble Sort"

    class QuickSortStrategy(SortingStrategy):
        def sort(self, array: List[int]) -> List[int]:
            if len(array) <= 1:
                return array

            pivot = array[len(array) // 2]
            left = [x for x in array if x < pivot]
            middle = [x for x in array if x == pivot]
            right = [x for x in array if x > pivot]

            return self.sort(left) + middle + self.sort(right)

        def get_name(self) -> str:
            return "Quick Sort"

    class MergeSortStrategy(SortingStrategy):
        def sort(self, array: List[int]) -> List[int]:
            if len(array) <= 1:
                return array

            mid = len(array) // 2
            left = self.sort(array[:mid])
            right = self.sort(array[mid:])

            return self.merge(left, right)

        def merge(self, left: List[int], right: List[int]) -> List[int]:
            result = []
            i = j = 0

            while i < len(left) and j < len(right):
                if left[i] <= right[j]:
                    result.append(left[i])
                    i += 1
                else:
                    result.append(right[j])
                    j += 1

            return result + left[i:] + right[j:]

        def get_name(self) -> str:
            return "Merge Sort"

    class Sorter:
        def __init__(self, strategy: SortingStrategy):
            self.strategy = strategy

        def set_strategy(self, strategy: SortingStrategy) -> None:
            self.strategy = strategy

        def sort(self, array: List[int]) -> List[int]:
            print(f"Sorting with {self.strategy.get_name()}")
            start_time = time.time()
            result = self.strategy.sort(array.copy())
            end_time = time.time()
            print(f"Time: {(end_time - start_time) * 1000:.2f}ms")
            return result

    # Usage
    data = [64, 34, 25, 12, 22, 11, 90]
    sorter = Sorter(BubbleSortStrategy())

    print("Original:", data)
    print("Sorted:", sorter.sort(data))

    sorter.set_strategy(QuickSortStrategy())
    print("Sorted:", sorter.sort(data))

    sorter.set_strategy(MergeSortStrategy())
    print("Sorted:", sorter.sort(data))
```

:::

## Real-World Example

### Payment Processing with Multiple Strategies

```typescript
interface PaymentStrategy {
  validate(): boolean;
  pay(amount: number): boolean;
}

class CreditCardStrategy implements PaymentStrategy {
  constructor(
    private cardNumber: string,
    private cvv: string,
  ) {}

  validate(): boolean {
    return this.cardNumber.length === 16 && this.cvv.length === 3;
  }

  pay(amount: number): boolean {
    if (!this.validate()) return false;
    console.log(`Charging ${amount} to credit card`);
    return true;
  }
}

class PayPalStrategy implements PaymentStrategy {
  constructor(private email: string) {}

  validate(): boolean {
    return this.email.includes("@");
  }

  pay(amount: number): boolean {
    if (!this.validate()) return false;
    console.log(`Charging ${amount} via PayPal`);
    return true;
  }
}

class CryptoStrategy implements PaymentStrategy {
  constructor(private walletAddress: string) {}

  validate(): boolean {
    return this.walletAddress.length > 20;
  }

  pay(amount: number): boolean {
    if (!this.validate()) return false;
    console.log(`Charging ${amount} to crypto wallet`);
    return true;
  }
}

class Order {
  private strategy: PaymentStrategy;

  setPaymentStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy;
  }

  checkout(amount: number): void {
    if (this.strategy.pay(amount)) {
      console.log("Payment successful");
    } else {
      console.log("Payment failed");
    }
  }
}

// Usage
const order = new Order();
order.setPaymentStrategy(new CreditCardStrategy("1234567890123456", "123"));
order.checkout(99.99);
```

## Advantages

✅ **Algorithm Flexibility** - Easy to switch algorithms at runtime
✅ **Open/Closed Principle** - Open for extension, closed for modification
✅ **Eliminates Conditionals** - No long if-else chains
✅ **Reusability** - Strategies can be reused in different contexts
✅ **Testability** - Each strategy can be tested independently
✅ **Separation of Concerns** - Algorithm logic is separated from client
✅ **Dynamic Selection** - Choose algorithm based on runtime conditions

## Disadvantages

❌ **Complexity** - Can be overkill for simple conditionals
❌ **Number of Classes** - Creates many strategy classes
❌ **Context Awareness** - Clients must be aware of different strategies
❌ **Communication** - Strategies may need complex data from context
❌ **Performance** - Extra indirection may impact performance
❌ **Learning Curve** - Developers must understand strategy pattern

## When to Use

- You have multiple algorithms for a task
- You want to switch algorithms at runtime
- You want to avoid long conditional statements
- You want to reuse algorithms in different contexts
- Algorithm logic changes frequently
- You need to test algorithms independently
- You want to follow open/closed principle

## When NOT to Use

- Only one algorithm exists
- Algorithms are simple and rarely change
- The overhead isn't worth it for few algorithms
- Performance is critical
- Algorithms share significant state
- You can use polymorphism without extra complexity

## Related Patterns

- **State** - Similar structure but state-driven behavior
- **Template Method** - Defines algorithm skeleton, Strategy varies entire algorithm
- **Factory** - Can be used to create strategies
- **Decorator** - Can wrap strategies
