---
title: Decorator Pattern
description: Dynamically attaches additional responsibilities to objects, providing a flexible alternative to subclassing
icon: Wand
---

# Decorator Pattern

## Overview

The Decorator Pattern is a structural design pattern that dynamically attaches additional responsibilities to objects. It provides a flexible alternative to subclassing for extending functionality by allowing you to "decorate" objects with new behavior at runtime.

## Purpose

- **Add new responsibilities** to objects dynamically without modifying their classes
- **Provide flexible alternative to subclassing** by using composition
- **Avoid class explosion** that occurs with inheritance-based extensions
- **Combine features** through multiple decorators
- **Maintain single responsibility** while building complex behavior

## Problem

Consider a coffee shop that needs to calculate prices for different beverages with various add-ons:

- Base coffee: $3
- Coffee with milk: $3.50
- Coffee with milk and sugar: $3.75
- Coffee with milk, sugar, and vanilla: $4.25

Without the Decorator Pattern, you might create classes like:

- `SimpleCoffee`
- `CoffeeWithMilk`
- `CoffeeWithMilkAndSugar`
- `CoffeeWithMilkSugarAndVanilla`
- ...many more combinations

With N options and each having 2 states (present/absent), you'd need 2^N classes—exponential growth! The Decorator Pattern solves this through composition.

## Solution

The Decorator Pattern provides a solution by:

1. **Component Interface**: Define interface that both real objects and decorators implement
2. **Concrete Component**: The original object being decorated
3. **Decorator Classes**: Wrap the component and add functionality
4. **Wrapping**: Each decorator holds a reference to the component it decorates
5. **Transparent Replacement**: Decorators can wrap components or other decorators

This allows unlimited combinations of features through composition instead of inheritance explosion.

## Implementation

::: code-group

```typescript [typescript]
// ========== Component Interface ==========
interface Beverage {
  getDescription(): string;
  getCost(): number;
}

// ========== Concrete Component ==========
class SimpleCoffee implements Beverage {
getDescription(): string {
return 'Simple Coffee';
}

getCost(): number {
return 3.0;
}
}

class Tea implements Beverage {
getDescription(): string {
return 'Tea';
}

getCost(): number {
return 2.5;
}
}

// ========== Decorator Classes ==========
abstract class BeverageDecorator implements Beverage {
constructor(protected beverage: Beverage) {}

abstract getDescription(): string;

getCost(): number {
return this.beverage.getCost();
}
}

class MilkDecorator extends BeverageDecorator {
getDescription(): string {
return `${this.beverage.getDescription()}, Milk`;
}

getCost(): number {
return this.beverage.getCost() + 0.5;
}
}

class SugarDecorator extends BeverageDecorator {
getDescription(): string {
return `${this.beverage.getDescription()}, Sugar`;
}

getCost(): number {
return this.beverage.getCost() + 0.25;
}
}

class VanillaDecorator extends BeverageDecorator {
getDescription(): string {
return `${this.beverage.getDescription()}, Vanilla`;
}

getCost(): number {
return this.beverage.getCost() + 0.75;
}
}

class WhippedCreamDecorator extends BeverageDecorator {
getDescription(): string {
return `${this.beverage.getDescription()}, Whipped Cream`;
}

getCost(): number {
return this.beverage.getCost() + 0.5;
}
}

// ========== Usage ==========
let beverage: Beverage = new SimpleCoffee();
console.log(`${beverage.getDescription()}: $${beverage.getCost()}`);

// Decorate with milk
beverage = new MilkDecorator(beverage);
console.log(`${beverage.getDescription()}: $${beverage.getCost()}`);

// Add sugar
beverage = new SugarDecorator(beverage);
console.log(`${beverage.getDescription()}: $${beverage.getCost()}`);

// Add vanilla
beverage = new VanillaDecorator(beverage);
console.log(`${beverage.getDescription()}: $${beverage.getCost()}`);

// Add whipped cream
beverage = new WhippedCreamDecorator(beverage);
console.log(`${beverage.getDescription()}: $${beverage.getCost()}\n`);

// Different combination
let tea: Beverage = new Tea();
tea = new MilkDecorator(tea);
tea = new WhippedCreamDecorator(tea);
console.log(`${tea.getDescription()}: $${tea.getCost()}`);

// ========== Real-world example: Data Stream Encryption & Compression ==========

interface DataStream {
read(): string;
write(data: string): void;
}

class FileDataStream implements DataStream {
constructor(private filename: string) {}

read(): string {
return `Reading from ${this.filename}`;
}

write(data: string): void {
console.log(`Writing to ${this.filename}: ${data}`);
}
}

// Decorator for compression
class CompressionDecorator implements DataStream {
constructor(private stream: DataStream) {}

read(): string {
return `[Compressed] ${this.stream.read()}`;
}

write(data: string): void {
const compressed = this.compressData(data);
this.stream.write(compressed);
}

private compressData(data: string): string {
return `compressed(${data})`;
}
}

// Decorator for encryption
class EncryptionDecorator implements DataStream {
constructor(private stream: DataStream) {}

read(): string {
return `[Encrypted] ${this.stream.read()}`;
}

write(data: string): void {
const encrypted = this.encryptData(data);
this.stream.write(encrypted);
}

private encryptData(data: string): string {
return `encrypted(${data})`;
}
}

// Decorator for logging
class LoggingDecorator implements DataStream {
constructor(private stream: DataStream) {}

read(): string {
const data = this.stream.read();
console.log(`[LOG] Reading: ${data}`);
return data;
}

write(data: string): void {
console.log(`[LOG] Writing: ${data}`);
this.stream.write(data);
}
}

// ========== Stream Usage ==========
console.log('\n--- Stream Decorators ---');
let stream: DataStream = new FileDataStream('data.txt');
stream = new CompressionDecorator(stream);
stream = new EncryptionDecorator(stream);
stream = new LoggingDecorator(stream);

stream.write('sensitive data');
stream.read();

// ========== Real-world example: UI Components ==========

interface UIComponent {
render(): string;
}

class Button implements UIComponent {
constructor(private label: string) {}

render(): string {
return `<button>${this.label}</button>`;
}
}

class BorderDecorator implements UIComponent {
constructor(private component: UIComponent) {}

render(): string {
return `<div style="border: 1px solid black;">${this.component.render()}</div>`;
}
}

class PaddingDecorator implements UIComponent {
constructor(private component: UIComponent, private padding: number = 10) {}

render(): string {
return `<div style="padding: ${this.padding}px;">${this.component.render()}</div>`;
}
}

class ShadowDecorator implements UIComponent {
constructor(private component: UIComponent) {}

render(): string {
return `<div style="box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">${this.component.render()}</div>`;
}
}

// ========== UI Component Usage ==========
console.log('\n--- UI Component Decorators ---');
let button: UIComponent = new Button('Click me');
button = new PaddingDecorator(button, 15);
button = new BorderDecorator(button);
button = new ShadowDecorator(button);

console.log(button.render());
```

  
```python [python]
from abc import ABC, abstractmethod

# ========== Component Interface ==========

class Beverage(ABC):
    @abstractmethod
    def get_description(self) -> str:
        pass

    @abstractmethod
    def get_cost(self) -> float:
        pass

# ========== Concrete Component ==========

class SimpleCoffee(Beverage):
    def get_description(self) -> str:
        return "Simple Coffee"

    def get_cost(self) -> float:
        return 3.0

class Tea(Beverage):
    def get_description(self) -> str:
        return "Tea"

    def get_cost(self) -> float:
        return 2.5

# ========== Decorator Classes ==========

class BeverageDecorator(Beverage):
    def __init__(self, beverage: Beverage):
        self._beverage = beverage

    @abstractmethod
    def get_description(self) -> str:
        pass

    def get_cost(self) -> float:
        return self._beverage.get_cost()

class MilkDecorator(BeverageDecorator):
    def get_description(self) -> str:
        return f"{self._beverage.get_description()}, Milk"

    def get_cost(self) -> float:
        return self._beverage.get_cost() + 0.5

class SugarDecorator(BeverageDecorator):
    def get_description(self) -> str:
        return f"{self._beverage.get_description()}, Sugar"

    def get_cost(self) -> float:
        return self._beverage.get_cost() + 0.25

class VanillaDecorator(BeverageDecorator):
    def get_description(self) -> str:
        return f"{self._beverage.get_description()}, Vanilla"

    def get_cost(self) -> float:
        return self._beverage.get_cost() + 0.75

class WhippedCreamDecorator(BeverageDecorator):
    def get_description(self) -> str:
        return f"{self._beverage.get_description()}, Whipped Cream"

    def get_cost(self) -> float:
        return self._beverage.get_cost() + 0.5

# ========== Usage ==========

beverage: Beverage = SimpleCoffee()
print(f"{beverage.get_description()}: ${beverage.get_cost()}")

# Decorate with milk
beverage = MilkDecorator(beverage)
print(f"{beverage.get_description()}: ${beverage.get_cost()}")

# Add sugar
beverage = SugarDecorator(beverage)
print(f"{beverage.get_description()}: ${beverage.get_cost()}")

# Add vanilla
beverage = VanillaDecorator(beverage)
print(f"{beverage.get_description()}: ${beverage.get_cost()}")

# Add whipped cream
beverage = WhippedCreamDecorator(beverage)
print(f"{beverage.get_description()}: ${beverage.get_cost()}\n")

# Different combination
tea: Beverage = Tea()
tea = MilkDecorator(tea)
tea = WhippedCreamDecorator(tea)
print(f"{tea.get_description()}: ${tea.get_cost()}")

# ========== Real-world example: Data Stream Encryption & Compression ==========

class DataStream(ABC):
    @abstractmethod
    def read(self) -> str:
        pass

    @abstractmethod
    def write(self, data: str) -> None:
        pass

class FileDataStream(DataStream):
    def __init__(self, filename: str):
        self._filename = filename

    def read(self) -> str:
        return f"Reading from {self._filename}"

    def write(self, data: str) -> None:
        print(f"Writing to {self._filename}: {data}")

# Decorator for compression
class CompressionDecorator(DataStream):
    def __init__(self, stream: DataStream):
        self._stream = stream

    def read(self) -> str:
        return f"[Compressed] {self._stream.read()}"

    def write(self, data: str) -> None:
        compressed = self._compress_data(data)
        self._stream.write(compressed)

    @staticmethod
    def _compress_data(data: str) -> str:
        return f"compressed({data})"

# Decorator for encryption
class EncryptionDecorator(DataStream):
    def __init__(self, stream: DataStream):
        self._stream = stream

    def read(self) -> str:
        return f"[Encrypted] {self._stream.read()}"

    def write(self, data: str) -> None:
        encrypted = self._encrypt_data(data)
        self._stream.write(encrypted)

    @staticmethod
    def _encrypt_data(data: str) -> str:
        return f"encrypted({data})"

# Decorator for logging
class LoggingDecorator(DataStream):
    def __init__(self, stream: DataStream):
        self._stream = stream

    def read(self) -> str:
        data = self._stream.read()
        print(f"[LOG] Reading: {data}")
        return data

    def write(self, data: str) -> None:
        print(f"[LOG] Writing: {data}")
        self._stream.write(data)

# ========== Stream Usage ==========

print("\n--- Stream Decorators ---")
stream: DataStream = FileDataStream("data.txt")
stream = CompressionDecorator(stream)
stream = EncryptionDecorator(stream)
stream = LoggingDecorator(stream)

stream.write("sensitive data")
stream.read()

# ========== Real-world example: UI Components ==========

class UIComponent(ABC):
    @abstractmethod
    def render(self) -> str:
        pass

class Button(UIComponent):
    def __init__(self, label: str):
        self._label = label

    def render(self) -> str:
        return f"<button>{self._label}</button>"

class BorderDecorator(UIComponent):
    def __init__(self, component: UIComponent):
        self._component = component

    def render(self) -> str:
        return f'<div style="border: 1px solid black;">{self._component.render()}</div>'

class PaddingDecorator(UIComponent):
    def __init__(self, component: UIComponent, padding: int = 10):
        self._component = component
        self._padding = padding

    def render(self) -> str:
        return f'<div style="padding: {self._padding}px;">{self._component.render()}</div>'

class ShadowDecorator(UIComponent):
    def __init__(self, component: UIComponent):
        self._component = component

    def render(self) -> str:
        return f'<div style="box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">{self._component.render()}</div>'

# ========== UI Component Usage ==========

print("\n--- UI Component Decorators ---")
button: UIComponent = Button("Click me")
button = PaddingDecorator(button, 15)
button = BorderDecorator(button)
button = ShadowDecorator(button)

print(button.render())
```

:::

## Real-World Example

**Text Processing Pipeline**: Decorators can be used to build flexible text processing:

- **Base**: `PlainTextDocument`
- **Decorators**:
  - `SpellCheckerDecorator` - adds spell checking
  - `GrammarCheckerDecorator` - adds grammar checking
  - `FormatterDecorator` - adds formatting capabilities
  - `EncryptionDecorator` - adds encryption

You can combine any decorators to create a document with exactly the features you need, in any order, without modifying the base class or creating new subclasses.

## Advantages

::: tip
✅ **Avoids Class Explosion**: Combine features through composition instead of inheritance

✅ **Dynamic Functionality**: Add or remove responsibilities at runtime

✅ **Single Responsibility**: Each decorator handles one specific responsibility

✅ **Flexible Combinations**: Combine multiple decorators in any order

✅ **Open/Closed Principle**: Open for extension, closed for modification

✅ **More Transparent than Subclassing**: Decorators are transparent to clients

✅ **Stackable Enhancement**: Layer multiple decorators for progressive enhancement
:::

## Disadvantages

::: warning
❌ **Increased Complexity**: Many small classes and objects to manage

❌ **Harder to Debug**: Multiple layers of wrapping make debugging difficult

❌ **Performance Overhead**: Each decorator adds a method call layer

❌ **Order Matters**: Decorator order can affect behavior and results

❌ **Complex Initialization**: Initialization code can become complex

❌ **Difficult to Understand**: The final behavior depends on decorator order

❌ **Not Suitable for All Cases**: Simpler alternatives might be better for simple cases
:::

## When to Use

- You need to add responsibilities to objects dynamically
- You need flexible combinations of features without class explosion
- You want to avoid modifying existing classes with new functionality
- You need to apply features in different combinations
- You want single responsibility and open/closed principle
- You're building plugin or middleware systems

## When NOT to Use

- You only need a few simple variations (inheritance might be simpler)
- You need different method signatures for different objects
- Performance is critical and overhead is unacceptable
- The ordering of decorators is complex and confusing
- The implementation is simpler with inheritance or composition
- You need strong type safety and compile-time checking

## Related Patterns

- **Adapter Pattern**: Both use wrapping, but Adapter converts interfaces while Decorator adds responsibilities
- **Composite Pattern**: Both use recursive composition, but Composite represents hierarchies while Decorator adds functionality
- **Strategy Pattern**: Both encapsulate variations, but Strategy swaps algorithms while Decorator adds responsibilities
- **Proxy Pattern**: Similar structure, but Proxy controls access while Decorator adds functionality
- **Factory Pattern**: Often used to create complex decorator chains
