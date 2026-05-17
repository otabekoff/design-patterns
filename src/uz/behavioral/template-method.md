---
title: Template Method
description: Define the skeleton of an algorithm in a base class and let subclasses override specific steps.
icon: BookMarked
---

# Template Method

<CoverImage src="/covers/behavioral/template-method.png" alt="Cover">
  <h1>Template Method</h1>
  <p>A cookie baking pan with rigid heart-shaped molds; a chef robot pours different types of dough (chocolate, vanilla, strawberry) into the molds, showing a fixed structure with custom steps.</p>
</CoverImage>

## Overview

The **Template Method** pattern is a behavioral design pattern that defines the skeleton of an algorithm in a base class and lets subclasses override specific steps without changing the algorithm's structure. This pattern promotes code reuse and follows the Hollywood Principle: "Don't call us, we'll call you."

## Purpose

The Template Method pattern aims to:

- Define common algorithm structure in base class
- Allow subclasses to customize specific steps
- Promote code reuse across similar algorithms
- Prevent code duplication
- Enforce a consistent algorithm structure
- Support the Hollywood Principle

## Problem

Consider different data processors (CSV, JSON, XML) with similar overall processing steps:

```typescript
// Without Template Method - duplicated code
class CSVProcessor {
  process(data: string): void {
    const parsed = this.parseData(data);
    const validated = this.validateData(parsed);
    const transformed = this.transformData(validated);
    this.saveData(transformed);
  }

  private parseData(data: string): any {}
  private validateData(data: any): any {}
  private transformData(data: any): any {}
  private saveData(data: any): void {}
}

class JSONProcessor {
  process(data: string): void {
    const parsed = this.parseData(data);
    const validated = this.validateData(parsed);
    const transformed = this.transformData(validated);
    this.saveData(transformed);
  }

  private parseData(data: string): any {}
  private validateData(data: any): any {}
  private transformData(data: any): any {}
  private saveData(data: any): void {}
}
```

Issues with this approach:

- Duplicated process logic
- Hard to maintain consistent behavior
- Code duplication across similar classes
- Difficult to modify common steps

## Solution

The Template Method defines the common structure in the base class:

```typescript
abstract class DataProcessor {
  // Template method - defines algorithm skeleton
  process(data: string): void {
    const parsed = this.parseData(data);
    const validated = this.validateData(parsed);
    const transformed = this.transformData(validated);
    this.saveData(transformed);
  }

  // Steps to override in subclasses
  protected abstract parseData(data: string): any;
  protected abstract validateData(data: any): any;
  protected abstract transformData(data: any): any;
  protected abstract saveData(data: any): void;
}

class CSVProcessor extends DataProcessor {
  protected parseData(data: string): any {}
  protected validateData(data: any): any {}
  protected transformData(data: any): any {}
  protected saveData(data: any): void {}
}
```

## Implementation

::: code-group

```typescript [typescript]
// Template Method abstract class
    abstract class CoffeeRecipe {
      // Template method
      brew(): void {
        console.log('Starting coffee brewing...');
        this.boilWater();
        this.brewCoffee();
        this.pourInCup();
        this.addCondiments();
        console.log('Coffee ready!\n');
      }

      private boilWater(): void {
        console.log('1. Boiling water');
      }

      private pourInCup(): void {
        console.log('3. Pouring into cup');
      }

      // Steps that subclasses must implement
      protected abstract brewCoffee(): void;
      protected abstract addCondiments(): void;
    }

    // Concrete implementations
    class AmericanoCoffee extends CoffeeRecipe {
      protected brewCoffee(): void {
        console.log('2. Brewing espresso shots');
      }

      protected addCondiments(): void {
        console.log('4. Adding hot water');
      }
    }

    class CappuccinoCoffee extends CoffeeRecipe {
      protected brewCoffee(): void {
        console.log('2. Brewing espresso');
      }

      protected addCondiments(): void {
        console.log('4. Adding steamed milk');
        console.log('4a. Adding milk foam');
      }
    }

    class MacchiatoCoffee extends CoffeeRecipe {
      protected brewCoffee(): void {
        console.log('2. Brewing espresso');
      }

      protected addCondiments(): void {
        console.log('4. Adding splash of milk');
      }
    }

    // Usage
    const americano = new AmericanoCoffee();
    americano.brew();

    const cappuccino = new CappuccinoCoffee();
    cappuccino.brew();

    const macchiato = new MacchiatoCoffee();
    macchiato.brew();
```

  
```python [python]
from abc import ABC, abstractmethod

    class CoffeeRecipe(ABC):
        def brew(self) -> None:
            print("Starting coffee brewing...")
            self.boil_water()
            self.brew_coffee()
            self.pour_in_cup()
            self.add_condiments()
            print("Coffee ready!\n")

        def boil_water(self) -> None:
            print("1. Boiling water")

        def pour_in_cup(self) -> None:
            print("3. Pouring into cup")

        @abstractmethod
        def brew_coffee(self) -> None:
            pass

        @abstractmethod
        def add_condiments(self) -> None:
            pass

    class AmericanoCoffee(CoffeeRecipe):
        def brew_coffee(self) -> None:
            print("2. Brewing espresso shots")

        def add_condiments(self) -> None:
            print("4. Adding hot water")

    class CappuccinoCoffee(CoffeeRecipe):
        def brew_coffee(self) -> None:
            print("2. Brewing espresso")

        def add_condiments(self) -> None:
            print("4. Adding steamed milk")
            print("4a. Adding milk foam")

    class MacchiatoCoffee(CoffeeRecipe):
        def brew_coffee(self) -> None:
            print("2. Brewing espresso")

        def add_condiments(self) -> None:
            print("4. Adding splash of milk")

    # Usage
    americano = AmericanoCoffee()
    americano.brew()

    cappuccino = CappuccinoCoffee()
    cappuccino.brew()

    macchiato = MacchiatoCoffee()
    macchiato.brew()
```

:::

## Real-World Example

### Data Processing Pipeline

```typescript
abstract class DataPipeline {
  process(input: string): void {
    console.log("Starting data processing...");
    const loaded = this.load(input);
    const parsed = this.parse(loaded);
    const validated = this.validate(parsed);
    const transformed = this.transform(validated);
    this.save(transformed);
    console.log("Processing complete!");
  }

  private load(input: string): string {
    console.log("Loading data from file");
    return input;
  }

  private save(data: any): void {
    console.log("Saving processed data");
  }

  protected abstract parse(data: string): any;
  protected abstract validate(data: any): boolean;
  protected abstract transform(data: any): any;
}

class JSONPipeline extends DataPipeline {
  protected parse(data: string): any {
    return JSON.parse(data);
  }

  protected validate(data: any): boolean {
    return data !== null && typeof data === "object";
  }

  protected transform(data: any): any {
    return { ...data, processed: true };
  }
}
```

## Advantages

✅ **Code Reuse** - Common algorithm steps are not duplicated
✅ **Consistency** - All subclasses follow same algorithm structure
✅ **Single Responsibility** - Each class handles one algorithm variant
✅ **Easy Maintenance** - Changes to common steps in one place
✅ **Testability** - Can test both template and specific implementations
✅ **Control Inversion** - Hollywood Principle - framework calls subclass methods
✅ **Extensibility** - Easy to add new variants

## Disadvantages

❌ **Complexity** - Adds abstraction that might not be necessary
❌ **Limited Flexibility** - Algorithm structure is fixed
❌ **Inheritance Overhead** - Requires inheritance chain
❌ **Method Visibility** - Protected methods can be confusing
❌ **Over-Engineering** - May be overkill for simple cases
❌ **Rigid Structure** - Can't easily reorder algorithm steps in subclasses

## When to Use

- You have multiple classes with similar algorithm structure
- You want to eliminate duplicate code
- Different implementations share common processing steps
- You want to control which parts can be overridden
- You want to enforce a specific algorithm structure
- Code varies only in specific parts of a process
- You want to follow the Hollywood Principle

## When NOT to Use

- Algorithms are completely different
- Inheritance is not appropriate
- Template structure is too rigid for the use case
- Only one implementation exists
- Subclasses need different algorithm orders
- You can use composition or delegation instead
- The common steps are trivial

## Related Patterns

- **Strategy** - Entire algorithm is interchangeable
- **Hook Methods** - Extension points in template method
- **Factory** - Can create appropriate subclass
- **State** - Can work with template method for state-specific behavior
