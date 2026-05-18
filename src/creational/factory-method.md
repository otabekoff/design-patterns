---
title: Factory Method Pattern
description: Defines an interface for creating objects, allowing subclasses to decide which class to instantiate.
icon: Package
---

# Factory Method Pattern

<CoverImage src="/covers/creational/factory-method.png" alt="Cover">
  <h1>Factory Method</h1>
  <p>A quirky assembly line with a single mechanical arm stamping out different shapes of little toy cars (sedan, truck) depending on which blueprint card is fed into it.</p>
</CoverImage>

## Overview

The **Factory Method** pattern is a creational design pattern that defines an interface for creating objects but lets subclasses decide which concrete class to instantiate. This pattern promotes loose coupling by eliminating the need for code to specify the exact classes of objects it creates.

Instead of calling `new ConcreteProduct()` directly (tightly coupled), you call a factory method that returns an object implementing a common interface. The actual type is determined by the subclass implementing the factory method.

**Modern perspective**: Factory Method is less prominent in functional and dynamic languages where functions are first-class objects. However, it remains vital in typed languages (Java, TypeScript) and is often combined with dependency injection frameworks.

## Real-World Analogy

Consider a **logistics company**. Whether you ship by truck, ship, or plane, the company provides a unified shipping interface. The specific transport method is determined at runtime based on criteria like distance, weight, and cost—not hardcoded in client code.

Similarly, in code, you might have different database adapters (MySQL, PostgreSQL, MongoDB), but client code just calls a factory method without knowing or caring which implementation is returned.

## The Problem

When code directly instantiates concrete classes, it becomes tightly coupled and hard to extend:

### Scenario: Multiple Document Types

```typescript
// ❌ Problem: Tight coupling to concrete classes
function createDocument(type: string): Document {
  if (type === "pdf") {
    return new PDFDocument(); // Direct instantiation
  } else if (type === "word") {
    return new WordDocument();
  } else if (type === "excel") {
    return new ExcelDocument();
  }
  throw new Error("Unknown type");
}

// Adding a new document type requires modifying this function (violates Open/Closed Principle)
```

**Problems:**

- Adding a new document type requires modifying the factory function.
- The function knows about all concrete implementations.
- Hard to test; you can't easily substitute mock implementations.
- Logic is scattered; not extensible for team-based development.

### Scenario: Payment Processing

```typescript
// ❌ Problem: Adding payment methods is painful
class OrderProcessor {
  processPayment(method: string, amount: number) {
    if (method === "credit_card") {
      const processor = new CreditCardProcessor();
      processor.charge(amount);
    } else if (method === "paypal") {
      const processor = new PayPalProcessor();
      processor.charge(amount);
    } else if (method === "apple_pay") {
      const processor = new ApplePayProcessor();
      processor.charge(amount);
    }
    // Every new payment method requires modifying this class!
  }
}
```

## The Solution

The Factory Method pattern solves this by:

1. **Defining a common interface** (abstract class or interface) for all products.
2. **Creating a factory method** in an abstract creator class that returns the interface type.
3. **Having subclasses override the factory method** to return their specific concrete type.
4. Client code **depends on the interface**, not concrete implementations.

```typescript
// ✅ Solution: Depend on interfaces, not implementations
abstract class DocumentHandler {
  abstract createDocument(): Document;

  openDocument(): void {
    const doc = this.createDocument(); // Factory method
    doc.open(); // Use the interface
  }
}

class PDFHandler extends DocumentHandler {
  createDocument(): Document {
    return new PDFDocument(); // Subclass decides the type
  }
}

class WordHandler extends DocumentHandler {
  createDocument(): Document {
    return new WordDocument();
  }
}

// Adding a new document type:
class ExcelHandler extends DocumentHandler {
  createDocument(): Document {
    return new ExcelDocument(); // No existing code modified!
  }
}
```

**Key principle**: The factory method allows new concrete products to be added without modifying existing client code—this is the **Open/Closed Principle**.

## Implementation

::: code-group

```typescript [TypeScript]
/**
 * Product interface: All documents must implement this.
 */
interface Document {
  open(): void;
  save(): void;
  close(): void;
}

/**
 * Concrete products: Specific document implementations.
 */
class PDFDocument implements Document {
  open(): void {
    console.log("Opening PDF document...");
  }
  save(): void {
    console.log("Saving as PDF...");
  }
  close(): void {
    console.log("Closing PDF document");
  }
}

class WordDocument implements Document {
  open(): void {
    console.log("Opening Word document...");
  }
  save(): void {
    console.log("Saving as Word...");
  }
  close(): void {
    console.log("Closing Word document");
  }
}

class ExcelDocument implements Document {
  open(): void {
    console.log("Opening Excel document...");
  }
  save(): void {
    console.log("Saving as Excel...");
  }
  close(): void {
    console.log("Closing Excel document");
  }
}

/**
 * Creator abstract class: Defines the factory method.
 * Subclasses implement createDocument() to return specific types.
 */
abstract class Application {
  protected documents: Document[] = [];

  /**
   * Factory method: Subclasses override this to return their product type.
   */
  abstract createDocument(): Document;

  /**
   * Business logic: Uses the product interface, not concrete types.
   */
  openDocument(): void {
    const doc = this.createDocument();
    doc.open();
    this.documents.push(doc);
  }

  listDocuments(): void {
    console.log(`Total documents: ${this.documents.length}`);
  }
}

/**
 * Concrete creators: Each determines which product to create.
 */
class PDFApplication extends Application {
  createDocument(): Document {
    return new PDFDocument();
  }
}

class WordApplication extends Application {
  createDocument(): Document {
    return new WordDocument();
  }
}

class ExcelApplication extends Application {
  createDocument(): Document {
    return new ExcelDocument();
  }
}

// Usage
function main() {
  const apps: Application[] = [
    new PDFApplication(),
    new WordApplication(),
    new ExcelApplication(),
  ];

  apps.forEach((app) => {
    app.openDocument();
    app.listDocuments();
  });
}

main();
```

```python [Python]
from abc import ABC, abstractmethod

class Document(ABC):
    """Product interface: All documents implement this."""

    @abstractmethod
    def open(self) -> None:
        pass

    @abstractmethod
    def save(self) -> None:
        pass

    @abstractmethod
    def close(self) -> None:
        pass

class PDFDocument(Document):
    """Concrete product: PDF document."""

    def open(self) -> None:
        print("Opening PDF document...")

    def save(self) -> None:
        print("Saving as PDF...")

    def close(self) -> None:
        print("Closing PDF document")

class WordDocument(Document):
    """Concrete product: Word document."""

    def open(self) -> None:
        print("Opening Word document...")

    def save(self) -> None:
        print("Saving as Word...")

    def close(self) -> None:
        print("Closing Word document")

class ExcelDocument(Document):
    """Concrete product: Excel document."""

    def open(self) -> None:
        print("Opening Excel document...")

    def save(self) -> None:
        print("Saving as Excel...")

    def close(self) -> None:
        print("Closing Excel document")

class Application(ABC):
    """Creator: Abstract base class defining the factory method."""

    def __init__(self) -> None:
        self.documents: list[Document] = []

    @abstractmethod
    def create_document(self) -> Document:
        """Factory method: Subclasses override this."""
        pass

    def open_document(self) -> None:
        """Business logic: Uses the product interface."""
        doc = self.create_document()
        doc.open()
        self.documents.append(doc)

    def list_documents(self) -> None:
        print(f"Total documents: {len(self.documents)}")

class PDFApplication(Application):
    """Concrete creator: Creates PDF documents."""

    def create_document(self) -> Document:
        return PDFDocument()

class WordApplication(Application):
    """Concrete creator: Creates Word documents."""

    def create_document(self) -> Document:
        return WordDocument()

# Usage
if __name__ == "__main__":
    apps: list[Application] = [
        PDFApplication(),
        WordApplication(),
        ExcelApplication(),
    ]

    for app in apps:
        app.open_document()
        app.list_documents()
```

```java [Java]
import java.util.*;

/**
 * Product interface: All documents implement this.
 */
interface Document {
    void open();
    void save();
    void close();
}

/**
 * Concrete products.
 */
class PDFDocument implements Document {
    @Override
    public void open() {
        System.out.println("Opening PDF document...");
    }

    @Override
    public void save() {
        System.out.println("Saving as PDF...");
    }

    @Override
    public void close() {
        System.out.println("Closing PDF document");
    }
}

class WordDocument implements Document {
    @Override
    public void open() {
        System.out.println("Opening Word document...");
    }

    @Override
    public void save() {
        System.out.println("Saving as Word...");
    }

    @Override
    public void close() {
        System.out.println("Closing Word document");
    }
}

/**
 * Creator abstract class: Defines the factory method.
 */
abstract class Application {
    protected List<Document> documents = new ArrayList<>();

    /**
     * Factory method: Subclasses override this.
     */
    abstract Document createDocument();

    /**
     * Business logic: Uses the product interface.
     */
    public void openDocument() {
        Document doc = createDocument();
        doc.open();
        documents.add(doc);
    }

    public void listDocuments() {
        System.out.println("Total documents: " + documents.size());
    }
}

/**
 * Concrete creators.
 */
class PDFApplication extends Application {
    @Override
    Document createDocument() {
        return new PDFDocument();
    }
}

class WordApplication extends Application {
    @Override
    Document createDocument() {
        return new WordDocument();
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        Application[] apps = {
            new PDFApplication(),
            new WordApplication(),
        };

        for (Application app : apps) {
            app.openDocument();
            app.listDocuments();
        }
    }
}
```

```go [Go]
package main

import "fmt"

// Document interface: All documents implement this.
type Document interface {
    Open()
    Save()
    Close()
}

// Concrete products.
type PDFDocument struct{}

func (d *PDFDocument) Open() {
    fmt.Println("Opening PDF document...")
}

func (d *PDFDocument) Save() {
    fmt.Println("Saving as PDF...")
}

func (d *PDFDocument) Close() {
    fmt.Println("Closing PDF document")
}

type WordDocument struct{}

func (d *WordDocument) Open() {
    fmt.Println("Opening Word document...")
}

func (d *WordDocument) Save() {
    fmt.Println("Saving as Word...")
}

func (d *WordDocument) Close() {
    fmt.Println("Closing Word document")
}

// Application: Uses the factory method pattern.
type Application struct {
    documents []Document
    factory   DocumentFactory
}

// DocumentFactory: Function type for creating documents.
type DocumentFactory func() Document

// NewApplication: Constructor that accepts a factory.
func NewApplication(factory DocumentFactory) *Application {
    return &Application{
        documents: []Document{},
        factory:   factory,
    }
}

// OpenDocument: Uses the factory method.
func (a *Application) OpenDocument() {
    doc := a.factory()
    doc.Open()
    a.documents = append(a.documents, doc)
}

func (a *Application) ListDocuments() {
    fmt.Printf("Total documents: %d\n", len(a.documents))
}

// Factory functions: These are the factory methods.
func CreatePDFDocument() Document {
    return &PDFDocument{}
}

func CreateWordDocument() Document {
    return &WordDocument{}
}

// Usage
func main() {
    apps := []*Application{
        NewApplication(CreatePDFDocument),
        NewApplication(CreateWordDocument),
    }

    for _, app := range apps {
        app.OpenDocument()
        app.ListDocuments()
    }
}
```

```rust [Rust]
// Product trait: All documents implement this.
trait Document {
    fn open(&self);
    fn save(&self);
    fn close(&self);
}

// Concrete products.
struct PDFDocument;

impl Document for PDFDocument {
    fn open(&self) {
        println!("Opening PDF document...");
    }

    fn save(&self) {
        println!("Saving as PDF...");
    }

    fn close(&self) {
        println!("Closing PDF document");
    }
}

struct WordDocument;

impl Document for WordDocument {
    fn open(&self) {
        println!("Opening Word document...");
    }

    fn save(&self) {
        println!("Saving as Word...");
    }

    fn close(&self) {
        println!("Closing Word document");
    }
}

// DocumentType enum: Determines which factory to use.
enum DocumentType {
    PDF,
    Word,
}

// Factory function: Returns a trait object.
fn create_document(doc_type: DocumentType) -> Box<dyn Document> {
    match doc_type {
        DocumentType::PDF => Box::new(PDFDocument),
        DocumentType::Word => Box::new(WordDocument),
    }
}

// Application: Uses the factory.
struct Application {
    documents: Vec<Box<dyn Document>>,
    document_type: DocumentType,
}

impl Application {
    fn new(document_type: DocumentType) -> Self {
        Application {
            documents: Vec::new(),
            document_type,
        }
    }

    fn open_document(&mut self) {
        let doc = create_document(self.document_type.clone());
        doc.open();
        self.documents.push(doc);
    }

    fn list_documents(&self) {
        println!("Total documents: {}", self.documents.len());
    }
}

// Usage (requires Clone for DocumentType)
#[derive(Clone)]
enum DocumentType {
    PDF,
    Word,
}

fn main() {
    let mut pdf_app = Application::new(DocumentType::PDF);
    pdf_app.open_document();
    pdf_app.list_documents();

    let mut word_app = Application::new(DocumentType::Word);
    word_app.open_document();
    word_app.list_documents();
}
```

:::

### TypeScript: Classic Factory Method

**Advantages of TypeScript approach:**

- Explicit interface contracts via TypeScript interfaces.
- Subclasses clearly override the factory method.
- Easy to add new types without modifying existing code.

### Python: Using Subclasses and Abstract Base Classes

**Advantages of Python approach:**

- Uses `@abstractmethod` decorator for clear contracts.
- Pythonic syntax with type hints.
- Subclass override pattern is idiomatic.

### Java: Factory Method with Generics

**Advantages of Java approach:**

- Clear separation of abstract and concrete classes.
- Interfaces define contracts explicitly.
- Works well in enterprise codebases.

### Go: Using Functions as Factories

**Advantages of Go approach:**

- Functions as first-class values replace the need for subclassing.
- Composition over inheritance: Applications are composed with factories.
- Idiomatic Go: simpler, more functional approach.

### Rust: Using Trait Objects and Enum Dispatch

**Advantages of Rust approach:**

- Trait objects provide polymorphism safely.
- Enum dispatch is type-safe and efficient.
- Rust's pattern matching for factory selection is idiomatic.

## Real-World Example: Payment Processor

A payment system needs to support multiple payment methods. Using Factory Method, adding a new method doesn't require modifying existing code:

```typescript
// Product interface
interface PaymentProcessor {
  validate(data: any): boolean;
  charge(amount: number): Promise<boolean>;
  refund(transactionId: string): Promise<boolean>;
}

// Concrete processors
class CreditCardProcessor implements PaymentProcessor {
  validate(data: any): boolean {
    return data.cardNumber && data.cvv && data.expiry;
  }

  async charge(amount: number): Promise<boolean> {
    console.log(`Charging credit card: $${amount}`);
    return true;
  }

  async refund(transactionId: string): Promise<boolean> {
    console.log(`Refunding credit card transaction: ${transactionId}`);
    return true;
  }
}

class PayPalProcessor implements PaymentProcessor {
  validate(data: any): boolean {
    return data.email && data.password;
  }

  async charge(amount: number): Promise<boolean> {
    console.log(`Charging PayPal account: $${amount}`);
    return true;
  }

  async refund(transactionId: string): Promise<boolean> {
    console.log(`Refunding PayPal transaction: ${transactionId}`);
    return true;
  }
}

class ApplePayProcessor implements PaymentProcessor {
  validate(data: any): boolean {
    return data.token;
  }

  async charge(amount: number): Promise<boolean> {
    console.log(`Charging via Apple Pay: $${amount}`);
    return true;
  }

  async refund(transactionId: string): Promise<boolean> {
    console.log(`Refunding Apple Pay transaction: ${transactionId}`);
    return true;
  }
}

// Creator: Payment gateway
abstract class PaymentGateway {
  abstract createProcessor(): PaymentProcessor;

  async processPayment(amount: number, data: any): Promise<boolean> {
    const processor = this.createProcessor();

    if (!processor.validate(data)) {
      console.error("Invalid payment data");
      return false;
    }

    return await processor.charge(amount);
  }
}

class CreditCardGateway extends PaymentGateway {
  createProcessor(): PaymentProcessor {
    return new CreditCardProcessor();
  }
}

class PayPalGateway extends PaymentGateway {
  createProcessor(): PaymentProcessor {
    return new PayPalProcessor();
  }
}

class ApplePayGateway extends PaymentGateway {
  createProcessor(): PaymentProcessor {
    return new ApplePayProcessor();
  }
}

// Usage
async function handleCheckout(method: string, amount: number, data: any) {
  let gateway: PaymentGateway;

  switch (method) {
    case "credit-card":
      gateway = new CreditCardGateway();
      break;
    case "paypal":
      gateway = new PayPalGateway();
      break;
    case "apple-pay":
      gateway = new ApplePayGateway();
      break;
    default:
      throw new Error("Unknown payment method");
  }

  const success = await gateway.processPayment(amount, data);
  console.log(`Payment ${success ? "successful" : "failed"}`);
}

// Adding a new payment method (e.g., Stripe) requires only:
// 1. Create StripeProcessor
// 2. Create StripeGateway
// No existing code is modified!
```

## Advantages and Disadvantages

### ✅ Advantages

- **Eliminates direct class dependencies**: Code depends on interfaces, not concrete implementations.
- **Follows Open/Closed Principle**: New products can be added without modifying existing code.
- **Improves testability**: Easy to create mock implementations for testing.
- **Enables runtime decisions**: The product type can be determined at runtime based on conditions.
- **Supports plugin architectures**: New factories can be loaded dynamically.

### ❌ Disadvantages

- **Increased code complexity**: Requires creating abstract classes and subclasses even for simple cases.
- **More files and classes**: Simple object creation now requires a factory class and a product interface.
- **Overhead for small projects**: Can feel over-engineered for applications with few product types.
- **Learning curve**: Junior developers may find the indirection confusing.
- **Performance**: Slight overhead from virtual method calls (minor in practice).

## Variations

### Simple Factory (Antipattern)

Some codebases use a static `SimpleFactory` class instead of subclassing:

```typescript
class DocumentFactory {
  static create(type: string): Document {
    switch (type) {
      case "pdf":
        return new PDFDocument();
      case "word":
        return new WordDocument();
      default:
        throw new Error("Unknown type");
    }
  }
}

const doc = DocumentFactory.create("pdf");
```

**Note**: This violates the Open/Closed Principle—adding a new type requires modifying the factory method. Use true Factory Method (with subclassing) instead.

## When to Use

::: tip USE IT WHEN...

- **Multiple related product types** exist and you might add more in the future.
- **Client code should not depend on concrete product classes**.
- **The specific product type is determined at runtime** based on conditions.
- **You want to support a plugin architecture** where new products are loaded dynamically.
- **You want to follow the Open/Closed Principle** (open for extension, closed for modification).

:::

::: warning AVOID IT WHEN...

- **You have only one or two product types** and won't add more; simple construction is fine.
- **The product logic is trivial** or the indirection adds unnecessary complexity.
- **Using a functional approach** (passing factory functions) is simpler in your language.
- **You can use dependency injection** to pass the product directly without a factory.

:::

## Common Mistakes

### ❌ Mistake 1: Using Simple Factory Instead of Factory Method

```typescript
// ❌ Antipattern: Adding a new type requires modifying the factory
class DocumentFactory {
  static create(type: string): Document {
    if (type === "pdf") return new PDFDocument();
    if (type === "word") return new WordDocument();
    if (type === "excel") return new ExcelDocument(); // Modification required!
    throw new Error("Unknown type");
  }
}

// ✅ Better: Use factory method pattern with subclasses
abstract class Application {
  abstract createDocument(): Document; // Subclasses override
}

class ExcelApplication extends Application {
  createDocument(): Document {
    return new ExcelDocument(); // No existing code modified
  }
}
```

### ❌ Mistake 2: Returning the Wrong Type from Factory Method

```typescript
// ❌ Factory method should return the interface, not concrete type
abstract class Application {
  abstract createDocument(): WordDocument; // Wrong!
}

// ✅ Return the interface
abstract class Application {
  abstract createDocument(): Document; // Correct!
}
```

### ❌ Mistake 3: Mixing Business Logic with Factory Logic

```typescript
// ❌ Factory method doing too much
class PaymentGateway {
  private processor: PaymentProcessor;

  processPayment(method: string, amount: number) {
    if (method === "card") {
      this.processor = new CreditCardProcessor();
    } else {
      this.processor = new PayPalProcessor();
    }
    // ... 100 lines of validation, logging, error handling
  }
}

// ✅ Separate concerns
abstract class PaymentGateway {
  abstract createProcessor(): PaymentProcessor;

  async processPayment(amount: number, data: any): Promise<boolean> {
    const processor = this.createProcessor();
    return await processor.charge(amount);
  }
}
```

## Related Patterns

- **Abstract Factory**: Often uses Factory Method to create product families.
- **Template Method**: Factory Method is often called by Template Method to create objects.
- **Singleton**: Can be combined with Factory Method to ensure products are singletons.
- **Strategy**: Similar intent but different purpose; Strategy chooses algorithms, Factory Method creates objects.
- **Dependency Injection**: Modern alternative; pass dependencies rather than create them internally.

## Modern Alternatives

### Configuration-Based Factory (Declarative)

```typescript
// Instead of subclassing, configure factories:
const factoryConfig = {
  pdf: () => new PDFDocument(),
  word: () => new WordDocument(),
  excel: () => new ExcelDocument(),
};

function createDocument(type: keyof typeof factoryConfig): Document {
  return factoryConfig[type]();
}
```

### Dependency Injection Container

```typescript
const container = new Container();
container.register("pdf", PDFDocument);
container.register("word", WordDocument);

const doc = container.resolve("pdf");
```

This approach is more flexible and testable than traditional Factory Method.

## Interview Insights

**Q: What is the difference between Factory Method and Abstract Factory?**

A: Factory Method creates a single product type through inheritance. Abstract Factory creates families of related products through composition. Use Factory Method when you have one type hierarchy; use Abstract Factory when you have multiple related hierarchies (e.g., UI elements for different OSes).

**Q: Why use Factory Method instead of Simple Factory?**

A: Simple Factory violates the Open/Closed Principle—adding a new type requires modifying existing code. Factory Method uses subclassing, so new types can be added without modifying existing code.

**Q: How does Factory Method relate to Dependency Injection?**

A: Both solve the problem of decoupling code from concrete implementations. Factory Method uses inheritance; Dependency Injection passes dependencies. DI is usually preferable in modern code because it's more flexible and testable.

**Q: When would you use Factory Method in a dynamic language like Python?**

A: Even in dynamic languages, Factory Method is useful when you want to enforce a contract (interface) and control object creation. However, functions as first-class objects sometimes replace the need for explicit factories.

**Q: Can you combine Factory Method with Singleton?**

A: Yes. Each factory method could create a singleton instance, ensuring only one product of each type exists.

## References

- Gang of Four: "Design Patterns: Elements of Reusable Object-Oriented Software"
- Refactoring.Guru: Factory Method pattern guide
- Dependency Injection frameworks: Spring (Java), Angular (TypeScript), Django (Python)
