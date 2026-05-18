---
title: Abstract Factory Pattern
description: Creates families of related objects without specifying their concrete classes.
icon: Boxes
---

# Abstract Factory Pattern

<CoverImage src="/covers/creational/abstract-factory.png" alt="Cover">
  <h1>Abstract Factory</h1>
  <p>A high-tech mega-factory with two distinct assembly lines: one producing "Cute Pastel Pink Cyber-Gears and Buttons" and the other producing "Sleek Dark Cyberpunk Gears and Buttons", illustrating families of related products.</p>
</CoverImage>

## Overview

The **Abstract Factory** pattern is a creational design pattern that lets you produce families of related or dependent objects without specifying their concrete classes. It works by defining abstract interfaces for a set of related objects, then creating concrete factories for each family.

Unlike **Factory Method** (which creates one type of object), Abstract Factory creates multiple related types together. Think of it as a factory of factories.

**Key distinction**: Use Factory Method when you need to create a single product type that varies. Use Abstract Factory when you need to create families of products that must work together.

**Modern perspective**: Abstract Factory remains relevant for cross-platform UI frameworks, database abstraction layers, and theme systems. However, dependency injection and composition often replace it in modern code.

## Real-World Analogy

Consider a **furniture manufacturer** that makes complete living room sets. The manufacturer has multiple styles: Modern, Victorian, and Rustic. Each style includes chairs, tables, and sofas designed to work together.

You don't ask for "a chair"—you ask for "a modern living room set," which gives you a modern chair, modern table, and modern sofa that all coordinate. If you later need a Victorian set, you get a completely different family of coordinated pieces.

Similarly, an application might need a complete set of UI components (buttons, checkboxes, scrollbars) for different operating systems. You don't mix Windows buttons with macOS checkboxes; you use the appropriate family for the target OS.

## The Problem

When a system needs to work with multiple families of related objects, code becomes tightly coupled and hard to extend:

### Scenario: Cross-Platform UI

```typescript
// ❌ Problem: Mixing different families of components
class Application {
  createUI() {
    if (this.os === "windows") {
      const button = new WindowsButton();
      const checkbox = new WindowsCheckbox();
      const scrollbar = new MacScrollbar(); // Wrong family!
    }
  }
}
```

**Problems:**

- Components from different families don't coordinate properly
- Adding a new OS requires modifying multiple places
- Hard to ensure UI consistency within a family

### Scenario: Database Abstraction

```typescript
// ❌ Problem: Mixing connection, query, and transaction objects from different databases
const connection = new MySQLConnection();
const queryBuilder = new PostgreSQLQueryBuilder(); // Incompatible!
const transaction = new MongoDBTransaction();

// These objects weren't designed to work together
connection.execute(queryBuilder.build());
```

## The Solution

Abstract Factory solves this by:

1. **Defining abstract interfaces** for each product family (Button, Checkbox, Scrollbar).
2. **Creating concrete factories** for each family (WindowsUIFactory, MacUIFactory).
3. **Client code depends on the factory interface**, not concrete implementations.
4. **Entire families stay coordinated** because they come from the same factory.

```typescript
// ✅ Solution: Families of coordinated objects
const factory: UIFactory = getFactory(currentOS); // Returns appropriate factory
const button = factory.createButton(); // Windows or Mac button
const checkbox = factory.createCheckbox(); // Matching checkbox
const scrollbar = factory.createScrollbar(); // Matching scrollbar

// All components are from the same family and work together
```

**Key principle**: The factory encapsulates the selection logic. Client code doesn't know or care which concrete implementations it's using.

## Implementation

::: code-group

```typescript [typescript]
/**
 * Product interfaces: Define what each component type must support.
 */
interface Button {
  click(): void;
  render(): string;
}

interface Checkbox {
  toggle(): void;
  render(): string;
}

interface Scrollbar {
  scroll(delta: number): void;
  render(): string;
}

/**
 * Windows family: All components styled for Windows.
 */
class WindowsButton implements Button {
  click(): void {
    console.log("Windows button clicked");
  }
  render(): string {
    return '<button style="windows">Click me</button>';
  }
}

class WindowsCheckbox implements Checkbox {
  toggle(): void {
    console.log("Windows checkbox toggled");
  }
  render(): string {
    return '<input type="checkbox" style="windows">';
  }
}

class WindowsScrollbar implements Scrollbar {
  scroll(delta: number): void {
    console.log(`Windows scrollbar scrolled by ${delta}`);
  }
  render(): string {
    return '<scrollbar style="windows"></scrollbar>';
  }
}

/**
 * macOS family: All components styled for macOS.
 */
class MacButton implements Button {
  click(): void {
    console.log("Mac button clicked");
  }
  render(): string {
    return '<button style="mac">Click me</button>';
  }
}

class MacCheckbox implements Checkbox {
  toggle(): void {
    console.log("Mac checkbox toggled");
  }
  render(): string {
    return '<input type="checkbox" style="mac">';
  }
}

class MacScrollbar implements Scrollbar {
  scroll(delta: number): void {
    console.log(`Mac scrollbar scrolled by ${delta}`);
  }
  render(): string {
    return '<scrollbar style="mac"></scrollbar>';
  }
}

/**
 * Abstract factory: Defines the interface for creating product families.
 */
interface UIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
  createScrollbar(): Scrollbar;
}

/**
 * Concrete factories: Each creates a complete family.
 */
class WindowsUIFactory implements UIFactory {
  createButton(): Button {
    return new WindowsButton();
  }
  createCheckbox(): Checkbox {
    return new WindowsCheckbox();
  }
  createScrollbar(): Scrollbar {
    return new WindowsScrollbar();
  }
}

class MacUIFactory implements UIFactory {
  createButton(): Button {
    return new MacButton();
  }
  createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
  createScrollbar(): Scrollbar {
    return new MacScrollbar();
  }
}

/**
 * Client: Works with factories, not concrete classes.
 */
class Application {
  private factory: UIFactory;

  constructor(factory: UIFactory) {
    this.factory = factory;
  }

  render(): string {
    const button = this.factory.createButton();
    const checkbox = this.factory.createCheckbox();
    const scrollbar = this.factory.createScrollbar();

    return `${button.render()}\n${checkbox.render()}\n${scrollbar.render()}`;
  }
}

// Usage
const osType = "mac";
const factory: UIFactory =
  osType === "windows" ? new WindowsUIFactory() : new MacUIFactory();
const app = new Application(factory);
console.log(app.render());
```

```python [python]
from abc import ABC, abstractmethod

class Button(ABC):
    @abstractmethod
    def click(self) -> None:
        pass

    @abstractmethod
    def render(self) -> str:
        pass

class Checkbox(ABC):
    @abstractmethod
    def toggle(self) -> None:
        pass

    @abstractmethod
    def render(self) -> str:
        pass

class Scrollbar(ABC):
    @abstractmethod
    def scroll(self, delta: int) -> None:
        pass

    @abstractmethod
    def render(self) -> str:
        pass

class WindowsButton(Button):
    def click(self) -> None:
        print("Windows button clicked")

    def render(self) -> str:
        return '<button style="windows">Click me</button>'

class WindowsCheckbox(Checkbox):
    def toggle(self) -> None:
        print("Windows checkbox toggled")

    def render(self) -> str:
        return '<input type="checkbox" style="windows">'

class WindowsScrollbar(Scrollbar):
    def scroll(self, delta: int) -> None:
        print(f"Windows scrollbar scrolled by {delta}")

    def render(self) -> str:
        return '<scrollbar style="windows"></scrollbar>'

class MacButton(Button):
    def click(self) -> None:
        print("Mac button clicked")

    def render(self) -> str:
        return '<button style="mac">Click me</button>'

class MacCheckbox(Checkbox):
    def toggle(self) -> None:
        print("Mac checkbox toggled")

    def render(self) -> str:
        return '<input type="checkbox" style="mac">'

class MacScrollbar(Scrollbar):
    def scroll(self, delta: int) -> None:
        print(f"Mac scrollbar scrolled by {delta}")

    def render(self) -> str:
        return '<scrollbar style="mac"></scrollbar>'

class UIFactory(ABC):
    @abstractmethod
    def create_button(self) -> Button:
        pass

    @abstractmethod
    def create_checkbox(self) -> Checkbox:
        pass

    @abstractmethod
    def create_scrollbar(self) -> Scrollbar:
        pass

class WindowsUIFactory(UIFactory):
    def create_button(self) -> Button:
        return WindowsButton()

    def create_checkbox(self) -> Checkbox:
        return WindowsCheckbox()

    def create_scrollbar(self) -> Scrollbar:
        return WindowsScrollbar()

class MacUIFactory(UIFactory):
    def create_button(self) -> Button:
        return MacButton()

    def create_checkbox(self) -> Checkbox:
        return MacCheckbox()

    def create_scrollbar(self) -> Scrollbar:
        return MacScrollbar()

class Application:
    def __init__(self, factory: UIFactory) -> None:
        self.factory = factory

    def render(self) -> str:
        button = self.factory.create_button()
        checkbox = self.factory.create_checkbox()
        scrollbar = self.factory.create_scrollbar()

        return f"{button.render()}\n{checkbox.render()}\n{scrollbar.render()}"

if __name__ == "__main__":
    os_type = "mac"
    factory = MacUIFactory() if os_type == "mac" else WindowsUIFactory()
    app = Application(factory)
    print(app.render())
```

```java [java]
interface Button {
    void click();
    String render();
}

interface Checkbox {
    void toggle();
    String render();
}

interface Scrollbar {
    void scroll(int delta);
    String render();
}

class WindowsButton implements Button {
    @Override
    public void click() {
        System.out.println("Windows button clicked");
    }

    @Override
    public String render() {
        return "<button style=\"windows\">Click me</button>";
    }
}

class WindowsCheckbox implements Checkbox {
    @Override
    public void toggle() {
        System.out.println("Windows checkbox toggled");
    }

    @Override
    public String render() {
        return "<input type=\"checkbox\" style=\"windows\">";
    }
}

class WindowsScrollbar implements Scrollbar {
    @Override
    public void scroll(int delta) {
        System.out.println("Windows scrollbar scrolled by " + delta);
    }

    @Override
    public String render() {
        return "<scrollbar style=\"windows\"></scrollbar>";
    }
}

class MacButton implements Button {
    @Override
    public void click() {
        System.out.println("Mac button clicked");
    }

    @Override
    public String render() {
        return "<button style=\"mac\">Click me</button>";
    }
}

class MacCheckbox implements Checkbox {
    @Override
    public void toggle() {
        System.out.println("Mac checkbox toggled");
    }

    @Override
    public String render() {
        return "<input type=\"checkbox\" style=\"mac\">";
    }
}

class MacScrollbar implements Scrollbar {
    @Override
    public void scroll(int delta) {
        System.out.println("Mac scrollbar scrolled by " + delta);
    }

    @Override
    public String render() {
        return "<scrollbar style=\"mac\"></scrollbar>";
    }
}

interface UIFactory {
    Button createButton();
    Checkbox createCheckbox();
    Scrollbar createScrollbar();
}

class WindowsUIFactory implements UIFactory {
    @Override
    public Button createButton() {
        return new WindowsButton();
    }

    @Override
    public Checkbox createCheckbox() {
        return new WindowsCheckbox();
    }

    @Override
    public Scrollbar createScrollbar() {
        return new WindowsScrollbar();
    }
}

class MacUIFactory implements UIFactory {
    @Override
    public Button createButton() {
        return new MacButton();
    }

    @Override
    public Checkbox createCheckbox() {
        return new MacCheckbox();
    }

    @Override
    public Scrollbar createScrollbar() {
        return new MacScrollbar();
    }
}

class Application {
    private UIFactory factory;

    public Application(UIFactory factory) {
        this.factory = factory;
    }

    public String render() {
        Button button = factory.createButton();
        Checkbox checkbox = factory.createCheckbox();
        Scrollbar scrollbar = factory.createScrollbar();

        return button.render() + "\n" + checkbox.render() + "\n" + scrollbar.render();
    }
}

public class Main {
    public static void main(String[] args) {
        UIFactory factory = new MacUIFactory();
        Application app = new Application(factory);
        System.out.println(app.render());
    }
}
```

```go [go]
package main

import "fmt"

type Button interface {
    Click()
    Render() string
}

type Checkbox interface {
    Toggle()
    Render() string
}

type Scrollbar interface {
    Scroll(delta int)
    Render() string
}

type WindowsButton struct{}

func (b *WindowsButton) Click() {
    fmt.Println("Windows button clicked")
}

func (b *WindowsButton) Render() string {
    return `<button style="windows">Click me</button>`
}

type WindowsCheckbox struct{}

func (c *WindowsCheckbox) Toggle() {
    fmt.Println("Windows checkbox toggled")
}

func (c *WindowsCheckbox) Render() string {
    return `<input type="checkbox" style="windows">`
}

type WindowsScrollbar struct{}

func (s *WindowsScrollbar) Scroll(delta int) {
    fmt.Printf("Windows scrollbar scrolled by %d\n", delta)
}

func (s *WindowsScrollbar) Render() string {
    return `<scrollbar style="windows"></scrollbar>`
}

type MacButton struct{}

func (b *MacButton) Click() {
    fmt.Println("Mac button clicked")
}

func (b *MacButton) Render() string {
    return `<button style="mac">Click me</button>`
}

type MacCheckbox struct{}

func (c *MacCheckbox) Toggle() {
    fmt.Println("Mac checkbox toggled")
}

func (c *MacCheckbox) Render() string {
    return `<input type="checkbox" style="mac">`
}

type MacScrollbar struct{}

func (s *MacScrollbar) Scroll(delta int) {
    fmt.Printf("Mac scrollbar scrolled by %d\n", delta)
}

func (s *MacScrollbar) Render() string {
    return `<scrollbar style="mac"></scrollbar>`
}

type UIFactory interface {
    CreateButton() Button
    CreateCheckbox() Checkbox
    CreateScrollbar() Scrollbar
}

type WindowsFactory struct{}

func (f *WindowsFactory) CreateButton() Button {
    return &WindowsButton{}
}

func (f *WindowsFactory) CreateCheckbox() Checkbox {
    return &WindowsCheckbox{}
}

func (f *WindowsFactory) CreateScrollbar() Scrollbar {
    return &WindowsScrollbar{}
}

type MacFactory struct{}

func (f *MacFactory) CreateButton() Button {
    return &MacButton{}
}

func (f *MacFactory) CreateCheckbox() Checkbox {
    return &MacCheckbox{}
}

func (f *MacFactory) CreateScrollbar() Scrollbar {
    return &MacScrollbar{}
}

type Application struct {
    factory UIFactory
}

func NewApplication(factory UIFactory) *Application {
    return &Application{factory: factory}
}

func (a *Application) Render() string {
    button := a.factory.CreateButton()
    checkbox := a.factory.CreateCheckbox()
    scrollbar := a.factory.CreateScrollbar()

    return fmt.Sprintf("%s\n%s\n%s",
        button.Render(),
        checkbox.Render(),
        scrollbar.Render())
}

func main() {
    var factory UIFactory = &MacFactory{}
    app := NewApplication(factory)
    fmt.Println(app.Render())
}
```

```rust [rust]
pub trait Button {
    fn click(&self);
    fn render(&self) -> String;
}

pub trait Checkbox {
    fn toggle(&self);
    fn render(&self) -> String;
}

pub trait Scrollbar {
    fn scroll(&self, delta: i32);
    fn render(&self) -> String;
}

pub struct WindowsButton;

impl Button for WindowsButton {
    fn click(&self) {
        println!("Windows button clicked");
    }

    fn render(&self) -> String {
        r#"<button style="windows">Click me</button>"#.to_string()
    }
}

pub struct WindowsCheckbox;

impl Checkbox for WindowsCheckbox {
    fn toggle(&self) {
        println!("Windows checkbox toggled");
    }

    fn render(&self) -> String {
        r#"<input type="checkbox" style="windows">"#.to_string()
    }
}

pub struct WindowsScrollbar;

impl Scrollbar for WindowsScrollbar {
    fn scroll(&self, delta: i32) {
        println!("Windows scrollbar scrolled by {}", delta);
    }

    fn render(&self) -> String {
        r#"<scrollbar style="windows"></scrollbar>"#.to_string()
    }
}

pub struct MacButton;

impl Button for MacButton {
    fn click(&self) {
        println!("Mac button clicked");
    }

    fn render(&self) -> String {
        r#"<button style="mac">Click me</button>"#.to_string()
    }
}

pub struct MacCheckbox;

impl Checkbox for MacCheckbox {
    fn toggle(&self) {
        println!("Mac checkbox toggled");
    }

    fn render(&self) -> String {
        r#"<input type="checkbox" style="mac">"#.to_string()
    }
}

pub struct MacScrollbar;

impl Scrollbar for MacScrollbar {
    fn scroll(&self, delta: i32) {
        println!("Mac scrollbar scrolled by {}", delta);
    }

    fn render(&self) -> String {
        r#"<scrollbar style="mac"></scrollbar>"#.to_string()
    }
}

pub trait UIFactory {
    fn create_button(&self) -> Box<dyn Button>;
    fn create_checkbox(&self) -> Box<dyn Checkbox>;
    fn create_scrollbar(&self) -> Box<dyn Scrollbar>;
}

pub struct WindowsUIFactory;

impl UIFactory for WindowsUIFactory {
    fn create_button(&self) -> Box<dyn Button> {
        Box::new(WindowsButton)
    }

    fn create_checkbox(&self) -> Box<dyn Checkbox> {
        Box::new(WindowsCheckbox)
    }

    fn create_scrollbar(&self) -> Box<dyn Scrollbar> {
        Box::new(WindowsScrollbar)
    }
}

pub struct MacUIFactory;

impl UIFactory for MacUIFactory {
    fn create_button(&self) -> Box<dyn Button> {
        Box::new(MacButton)
    }

    fn create_checkbox(&self) -> Box<dyn Checkbox> {
        Box::new(MacCheckbox)
    }

    fn create_scrollbar(&self) -> Box<dyn Scrollbar> {
        Box::new(MacScrollbar)
    }
}

pub struct Application {
    factory: Box<dyn UIFactory>,
}

impl Application {
    pub fn new(factory: Box<dyn UIFactory>) -> Self {
        Application { factory }
    }

    pub fn render(&self) -> String {
        let button = self.factory.create_button();
        let checkbox = self.factory.create_checkbox();
        let scrollbar = self.factory.create_scrollbar();

        format!(
            "{}\n{}\n{}",
            button.render(),
            checkbox.render(),
            scrollbar.render()
        )
    }
}

fn main() {
    let factory: Box<dyn UIFactory> = Box::new(MacUIFactory);
    let app = Application::new(factory);
    println!("{}", app.render());
}
```

:::

### TypeScript: Classic Abstract Factory

TypeScript uses `interface` declarations to define both the product contracts (`Button`, `Checkbox`, `Scrollbar`) and the factory contract (`UIFactory`). Concrete factories like `WindowsUIFactory` and `MacUIFactory` implement the factory interface, and the compiler statically verifies that every factory method returns the correct product type. The client receives a `UIFactory` reference and never touches concrete classes — swapping families is a one-line change at the injection point.

### Python: Leveraging Duck Typing and Protocols

Python uses `ABC` (Abstract Base Class) to enforce the factory and product contracts at class-definition time. Each abstract method decorated with `@abstractmethod` prevents instantiation of incomplete factories. Despite this formal structure, Python's duck typing means the client code (`Application`) only cares that the factory *has* `create_button()`, `create_checkbox()`, and `create_scrollbar()` methods — no type annotation is strictly required at runtime. The `if __name__ == "__main__"` guard keeps the wiring logic clean and testable.

### Java: Generics for Type Safety

Java relies on `interface` declarations and `@Override` annotations to lock down the contract at compile time. Every concrete product class explicitly implements its product interface, and every concrete factory implements `UIFactory`. The `@Override` annotation catches typos and signature mismatches early. Java's strict nominal typing guarantees that a `WindowsUIFactory` can never accidentally return a `MacButton` — the compiler rejects it before the code ever runs.

### Go: Struct Composition with Functions

Go has no classes or inheritance — instead, product contracts are defined as interfaces (`Button`, `Checkbox`, `Scrollbar`), and any struct with matching methods satisfies them implicitly. Concrete factories are plain structs whose methods return interface types. This implicit interface satisfaction means you never write `implements`; if the methods match, the type qualifies. The `Application` struct stores a `UIFactory` interface and calls its methods without knowing the underlying type, achieving full decoupling through structural typing.

### Rust: Trait Objects with Dynamic Dispatch

Rust defines product and factory contracts as `trait` declarations. Concrete types (`WindowsButton`, `MacButton`, etc.) implement these traits explicitly with `impl Trait for Type`. The factory returns `Box<dyn Trait>` — heap-allocated trait objects that enable dynamic dispatch at runtime. The client holds a `Box<dyn UIFactory>` and calls factory methods through vtable indirection. Rust's ownership system guarantees memory safety without a garbage collector, and the `dyn` keyword makes the runtime polymorphism explicit and intentional.

## Real-World Example: Database Abstraction Layer

A real-world system must work with multiple databases (MySQL, PostgreSQL, MongoDB), but each requires different connection, query building, and transaction handling:

```typescript
/**
 * Product interfaces for database families.
 */
interface Connection {
  connect(): Promise<void>;
  execute(sql: string): Promise<any[]>;
  close(): Promise<void>;
}

interface QueryBuilder {
  select(...columns: string[]): QueryBuilder;
  from(table: string): QueryBuilder;
  where(condition: string): QueryBuilder;
  build(): string;
}

interface Transaction {
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

/**
 * MySQL family
 */
class MySQLConnection implements Connection {
  async connect(): Promise<void> {
    console.log("Connecting to MySQL...");
  }
  async execute(sql: string): Promise<any[]> {
    console.log(`MySQL executing: ${sql}`);
    return [];
  }
  async close(): Promise<void> {
    console.log("Closing MySQL connection");
  }
}

class MySQLQueryBuilder implements QueryBuilder {
  private sql: string = "";
  select(...columns: string[]): QueryBuilder {
    this.sql = `SELECT ${columns.join(", ")}`;
    return this;
  }
  from(table: string): QueryBuilder {
    this.sql += ` FROM ${table}`;
    return this;
  }
  where(condition: string): QueryBuilder {
    this.sql += ` WHERE ${condition}`;
    return this;
  }
  build(): string {
    return this.sql;
  }
}

class MySQLTransaction implements Transaction {
  async begin(): Promise<void> {
    console.log("MySQL: BEGIN TRANSACTION");
  }
  async commit(): Promise<void> {
    console.log("MySQL: COMMIT");
  }
  async rollback(): Promise<void> {
    console.log("MySQL: ROLLBACK");
  }
}

/**
 * PostgreSQL family
 */
class PostgreSQLConnection implements Connection {
  async connect(): Promise<void> {
    console.log("Connecting to PostgreSQL...");
  }
  async execute(sql: string): Promise<any[]> {
    console.log(`PostgreSQL executing: ${sql}`);
    return [];
  }
  async close(): Promise<void> {
    console.log("Closing PostgreSQL connection");
  }
}

class PostgreSQLQueryBuilder implements QueryBuilder {
  private sql: string = "";
  select(...columns: string[]): QueryBuilder {
    this.sql = `SELECT ${columns.join(", ")}`;
    return this;
  }
  from(table: string): QueryBuilder {
    this.sql += ` FROM ${table}`;
    return this;
  }
  where(condition: string): QueryBuilder {
    this.sql += ` WHERE ${condition}`;
    return this;
  }
  build(): string {
    return this.sql;
  }
}

class PostgreSQLTransaction implements Transaction {
  async begin(): Promise<void> {
    console.log("PostgreSQL: BEGIN");
  }
  async commit(): Promise<void> {
    console.log("PostgreSQL: COMMIT");
  }
  async rollback(): Promise<void> {
    console.log("PostgreSQL: ROLLBACK");
  }
}

/**
 * Abstract factory
 */
interface DatabaseFactory {
  createConnection(): Connection;
  createQueryBuilder(): QueryBuilder;
  createTransaction(): Transaction;
}

class MySQLFactory implements DatabaseFactory {
  createConnection(): Connection {
    return new MySQLConnection();
  }
  createQueryBuilder(): QueryBuilder {
    return new MySQLQueryBuilder();
  }
  createTransaction(): Transaction {
    return new MySQLTransaction();
  }
}

class PostgreSQLFactory implements DatabaseFactory {
  createConnection(): Connection {
    return new PostgreSQLConnection();
  }
  createQueryBuilder(): QueryBuilder {
    return new PostgreSQLQueryBuilder();
  }
  createTransaction(): Transaction {
    return new PostgreSQLTransaction();
  }
}

/**
 * Client: Uses the factory to work with a database family.
 */
class Repository {
  private factory: DatabaseFactory;

  constructor(factory: DatabaseFactory) {
    this.factory = factory;
  }

  async findAll(table: string) {
    const connection = this.factory.createConnection();
    const query = this.factory.createQueryBuilder();
    const transaction = this.factory.createTransaction();

    await connection.connect();
    await transaction.begin();

    try {
      const sql = query.select("*").from(table).build();
      const results = await connection.execute(sql);
      await transaction.commit();
      return results;
    } catch (error) {
      await transaction.rollback();
      throw error;
    } finally {
      await connection.close();
    }
  }
}

// Usage
const dbType = process.env.DB_TYPE || "mysql";
const factory: DatabaseFactory =
  dbType === "postgres" ? new PostgreSQLFactory() : new MySQLFactory();

const repo = new Repository(factory);
repo.findAll("users").then((users) => console.log(users));
```

## Advantages and Disadvantages

### ✅ Advantages

- **Ensures family consistency**: All related objects come from the same family, guaranteed to work together.
- **Isolates concrete classes**: Client code depends on interfaces, not implementations.
- **Easier to swap families**: Switching from Windows UI to Mac UI requires only changing the factory.
- **Enforces constraints**: The factory interface ensures all required products are created.
- **Scales to new families**: Adding a new OS or database requires only creating a new factory class.

### ❌ Disadvantages

- **Increased complexity**: More classes and interfaces than simpler approaches.
- **Overkill for small families**: For 2-3 related objects, Abstract Factory adds overhead.
- **Difficult to add new products**: If you need to add a new product type (e.g., menu bar), you must update all factories.
- **Runtime factory selection**: You still need logic to determine which factory to use.
- **Can hide dependencies**: The factory abstracts away what products you're actually using.

## When to Use

::: tip USE IT WHEN...

- **You have families of related objects** that must work together (UI components across OSes, database components, etc.).
- **You want to ensure consistency** within families and prevent mixing incompatible objects.
- **You expect to add new families** but not new product types frequently.
- **Client code should not depend on concrete classes** of any family member.
- **You're building a framework or library** that must support multiple implementations.

:::

::: warning AVOID IT WHEN...

- **You have only one family** or families are unlikely to grow.
- **New product types will be added frequently** but new families won't.
- **The product families are loosely related** or don't need coordinated behavior.
- **Simple conditionals or lookup tables** would suffice (risk of over-engineering).
- **You can use Dependency Injection** to pass individual products instead.

:::

## Common Mistakes

### ❌ Mistake 1: Confusing Abstract Factory with Factory Method

```typescript
// ❌ Mistake: This is Factory Method, not Abstract Factory
abstract class DocumentFactory {
  abstract createDocument(): Document; // Creates ONE type
}

// ✅ Abstract Factory creates MULTIPLE related types
interface UIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
  createScrollbar(): Scrollbar;
}
```

### ❌ Mistake 2: Adding New Product Types Without Updating All Factories

```typescript
// ❌ Problem: Adding Menu requires updating every factory
interface UIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
  createMenu(): Menu; // New product type
}

// All existing factories must implement createMenu()
class WindowsUIFactory implements UIFactory {
  createButton(): Button {
    /* ... */
  }
  createCheckbox(): Checkbox {
    /* ... */
  }
  createMenu(): Menu {
    /* ... */
  }
}

// ✅ Alternative: Use composition
interface UIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}
```

### ❌ Mistake 3: Runtime Factory Selection Logic Too Complex

```typescript
// ❌ Problem: Logic scattered everywhere
if (os === "windows") {
  const factory = new WindowsUIFactory();
} else if (os === "mac") {
  const factory = new MacUIFactory();
}

// ✅ Solution: Centralize
const factoryRegistry = {
  windows: WindowsUIFactory,
  mac: MacUIFactory,
};
const factory = new factoryRegistry[os]();
```

## Related Patterns

- **Factory Method**: Often used within each concrete factory to create individual products.
- **Singleton**: Factories are often implemented as singletons.
- **Strategy**: Similar structure but Strategy is for algorithms, Abstract Factory is for object families.
- **Composite**: Often used together to create hierarchical families of objects.

## Modern Alternatives

### Configuration-Based Factory Registry

```typescript
const factories: Record<string, UIFactory> = {
  windows: new WindowsUIFactory(),
  mac: new MacUIFactory(),
};

const factory = factories[currentOS];
```

### Dependency Injection Container

```typescript
container.register("UIFactory", () => {
  return currentOS === "mac" ? new MacUIFactory() : new WindowsUIFactory();
});

const factory = container.resolve("UIFactory");
```

## Interview Insights

**Q: What's the difference between Abstract Factory and Factory Method?**

A: Factory Method creates a single product type through inheritance. Abstract Factory creates families of related products. Use Factory Method for simple cases; use Abstract Factory when you need coordinated families.

**Q: How do you add a new product type to an Abstract Factory?**

A: You must update the factory interface and all concrete factories. This is a downside. If new product types are added frequently, Abstract Factory becomes painful.

**Q: Can Abstract Factory and Factory Method work together?**

A: Yes. Concrete factories often use Factory Method internally to create individual products.

**Q: How does Abstract Factory relate to Dependency Injection?**

A: Both solve the problem of decoupling code from concrete classes. DI is often simpler and more flexible.

## References

- Gang of Four: "Design Patterns: Elements of Reusable Object-Oriented Software"
- Refactoring.Guru: Abstract Factory pattern guide
- Dependency Injection frameworks: Spring (Java), .NET Core DI, Angular (TypeScript)
