---
title: Quick Reference
description: Tables, decision trees, and pattern combinations for all 41 design patterns.
icon: BookMarked
---

# Quick Reference

<CoverImage src="/covers/getting-started/quick-reference.png" alt="Cover">
  <h1>Quick Reference</h1>
  <p>A massive, clean control panel containing a beautiful array of color-coded glowing buttons, each with a mini graphic icon representing a design pattern, with a tiny operator robot happily sliding a slider.</p>
</CoverImage>

A concise reference for all 41 patterns in this documentation. Use the decision tree when you know what you need but not which pattern fits. Use the tables when you want to compare options side by side.

## Creational Patterns

| Pattern              | Purpose                                            | Best For                                 |
| -------------------- | -------------------------------------------------- | ---------------------------------------- |
| **Singleton**        | Single instance with global access                 | Loggers, configs, database connections   |
| **Factory Method**   | Object creation without specifying the exact class | Document types, payment methods          |
| **Abstract Factory** | Families of related objects                        | UI themes, multi-database support        |
| **Builder**          | Step-by-step object construction                   | Complex objects, fluent APIs             |
| **Prototype**        | Clone existing objects                             | Document templates, configuration copies |
| **Object Pool**      | Reuse expensive objects                            | Database connections, thread pools       |

## Structural Patterns

| Pattern       | Purpose                                                | Best For                                   |
| ------------- | ------------------------------------------------------ | ------------------------------------------ |
| **Adapter**   | Convert incompatible interfaces                        | Third-party APIs, legacy integrations      |
| **Bridge**    | Decouple abstraction from implementation               | Graphics rendering, cross-platform drivers |
| **Composite** | Uniform treatment of single objects and compositions   | File systems, UI component trees           |
| **Decorator** | Add responsibilities to objects at runtime             | Middleware pipelines, data streams         |
| **Facade**    | Simplify a complex subsystem behind a single interface | SDK wrappers, home automation APIs         |
| **Flyweight** | Share common state across many fine-grained objects    | Text editors, particle systems             |
| **Proxy**     | Control access to another object                       | Caching, lazy loading, access control      |

## Behavioral Patterns

| Pattern                     | Purpose                                                                 | Best For                              |
| --------------------------- | ----------------------------------------------------------------------- | ------------------------------------- |
| **Chain of Responsibility** | Pass a request along a chain until one handler processes it             | Middleware, logging pipelines         |
| **Command**                 | Encapsulate a request as an object                                      | Undo/redo, job queues, macros         |
| **Interpreter**             | Define and evaluate a grammar                                           | Expression parsers, DSLs              |
| **Iterator**                | Sequential access to elements without exposing the underlying structure | Custom collections, lazy sequences    |
| **Mediator**                | Centralize communication between objects                                | Dialog boxes, chat systems            |
| **Memento**                 | Capture and restore an object's internal state                          | Undo/redo, save points                |
| **Null Object**             | Provide a do-nothing default to eliminate null checks                   | Fallback handlers, test stubs         |
| **Observer**                | Notify dependents automatically when an object changes                  | Event systems, data binding           |
| **State**                   | Change an object's behavior when its internal state changes             | Workflow engines, UI state machines   |
| **Strategy**                | Define a family of interchangeable algorithms                           | Sorting, compression, authentication  |
| **Template Method**         | Define an algorithm's skeleton; defer steps to subclasses               | Frameworks, data processing pipelines |
| **Visitor**                 | Add operations to objects without modifying their classes               | AST traversal, report generation      |

## Architectural Patterns

| Pattern                  | Purpose                                                                 | Best For                                   |
| ------------------------ | ----------------------------------------------------------------------- | ------------------------------------------ |
| **MVC**                  | Separate model, view, and controller                                    | Web applications, desktop apps             |
| **MVP**                  | Presenter mediates between view and model                               | Test-heavy UIs, complex view logic         |
| **MVVM**                 | Bind UI declaratively to a reactive view model                          | Data-binding frameworks, reactive apps     |
| **MVT**                  | Model-View-Template (Django's variant of MVC)                           | Django applications                        |
| **Repository**           | Abstract data access behind a collection-like interface                 | Any persistence layer                      |
| **Active Record**        | Map a database row directly to a domain object                          | Simple CRUD operations                     |
| **Data Mapper**          | Keep domain objects fully independent of the database schema            | Complex object-relational mapping          |
| **Identity Map**         | Cache loaded objects to prevent duplicate database reads                | ORM internals, unit-of-work scenarios      |
| **Unit of Work**         | Track changes to domain objects and commit them atomically              | Complex multi-entity transactions          |
| **CQRS**                 | Separate read and write models                                          | High-scale reads, event-driven systems     |
| **Event Sourcing**       | Persist state as an append-only sequence of events                      | Audit logs, temporal queries               |
| **Dependency Injection** | Supply dependencies externally rather than constructing them internally | Testable code, loosely coupled services    |
| **Service Locator**      | Resolve dependencies from a central registry                            | Plugin systems, legacy DI retrofits        |
| **Producer-Consumer**    | Decouple work generation from work processing via a shared queue        | Message brokers, data pipelines            |
| **Scheduler**            | Control when and how threads access shared resources                    | Thread synchronization, rate-limited tasks |
| **Read-Write Lock**      | Allow concurrent reads; serialize writes                                | High-read caches, configuration stores     |

---

## Decision Tree

### Creating objects

| Need                                          | Pattern          |
| --------------------------------------------- | ---------------- |
| One instance shared globally                  | Singleton        |
| Different types, decided at runtime           | Factory Method   |
| Families of related types                     | Abstract Factory |
| Complex construction with many optional parts | Builder          |
| Cheap copies of an existing object            | Prototype        |
| Reuse costly-to-create objects                | Object Pool      |

### Adapting or composing existing objects

| Need                                              | Pattern   |
| ------------------------------------------------- | --------- |
| Connect incompatible interfaces                   | Adapter   |
| Swap implementations independently of abstraction | Bridge    |
| Treat individual items and groups uniformly       | Composite |
| Add behavior without subclassing                  | Decorator |
| Hide a complex subsystem                          | Facade    |
| Share memory-heavy common state                   | Flyweight |
| Control or intercept access to an object          | Proxy     |

### Managing events and communication

| Need                                      | Pattern                 |
| ----------------------------------------- | ----------------------- |
| Notify many objects when one changes      | Observer                |
| Pass a request through ordered handlers   | Chain of Responsibility |
| Decouple many-to-many communication       | Mediator                |
| Encapsulate a request for later execution | Command                 |

### Managing state and behavior

| Need                                                    | Pattern         |
| ------------------------------------------------------- | --------------- |
| Different behavior depending on internal state          | State           |
| Swap algorithms at runtime                              | Strategy        |
| Enforce a fixed algorithm structure with flexible steps | Template Method |
| Save and restore object state                           | Memento         |

### Structuring an application

| Need                                     | Pattern        |
| ---------------------------------------- | -------------- |
| Standard web or desktop application      | MVC            |
| Highly testable UI                       | MVP            |
| Reactive/data-binding frontend           | MVVM           |
| Django application                       | MVT            |
| Isolate database access                  | Repository     |
| Simple ActiveRecord-style persistence    | Active Record  |
| Domain objects independent of schema     | Data Mapper    |
| Manage complex multi-object transactions | Unit of Work   |
| Separate read and write concerns         | CQRS           |
| Full event history and time travel       | Event Sourcing |

### Concurrency and resource management

| Need                                        | Pattern           |
| ------------------------------------------- | ----------------- |
| Decouple producers and consumers            | Producer-Consumer |
| Schedule thread access to shared resources  | Scheduler         |
| Maximize read concurrency, serialize writes | Read-Write Lock   |

---

## Pattern Combinations

Some patterns are naturally complementary and appear together frequently in real systems.

| Combination                                       | Why They Work Together                                                                     |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Repository + Unit of Work + Identity Map          | Complete persistence layer: abstract access, batch writes, avoid duplicate loads           |
| Factory Method + Template Method                  | The factory defines _what_ to create; the template defines _how_ to use it                 |
| Abstract Factory + Factory Method                 | Abstract Factory uses Factory Methods to produce each product in a family                  |
| MVC + Observer + Strategy                         | View observes model changes; controller delegates behavior via strategy                    |
| Dependency Injection + Singleton + Factory Method | DI wires components together; Singleton manages shared instances; Factory handles creation |
| CQRS + Event Sourcing                             | Natural fit: commands produce events, queries read projections                             |
| Composite + Iterator + Visitor                    | Traverse a composite tree with an iterator; apply operations with a visitor                |
| Decorator + Strategy                              | Decorators add structural layers; Strategy swaps algorithmic behavior                      |

---

## Performance Notes

**Patterns with potential overhead:**

- **Prototype** — deep cloning can be expensive for large object graphs
- **Composite** — recursive tree traversal adds call stack depth
- **Visitor** — may require multiple traversals for complex operations
- **Read-Write Lock** — lock acquisition has latency; profile before assuming it helps

**Patterns that are generally lightweight:**

- Singleton, Strategy, Decorator, Null Object — minimal indirection once in place
- Proxy — negligible unless lazy-loading triggers expensive initialization

---

## Testing Notes

**Easier to test:**

- Strategy, Template Method, Dependency Injection, Factory Method — dependencies are explicit and replaceable

**Harder to test:**

- Singleton — global state couples tests together; prefer DI over direct access
- Service Locator — hides dependencies, making tests fragile
- Static factory methods — cannot be overridden or mocked without extra tooling

---

## Common Mistakes

| Pattern        | Common Mistake                                          | Better Approach                                                          |
| -------------- | ------------------------------------------------------- | ------------------------------------------------------------------------ |
| Singleton      | Used as global state, causing hidden coupling           | Inject it as a dependency instead                                        |
| Observer       | Subscriptions not cleaned up, causing memory leaks      | Always provide and call an unsubscribe mechanism                         |
| Composite      | Leaf-specific operations pushed into the base interface | Keep the interface minimal; handle leaf behavior in subclasses           |
| Decorator      | Order of decoration creates implicit dependencies       | Design decorators to be order-independent where possible                 |
| Factory Method | Factory hardcodes the list of types it can create       | Use a registry or configuration to map types dynamically                 |
| Strategy       | Strategy classes proliferate for trivial variations     | Use lambdas or closures for simple cases; classes for complex ones       |
| State          | State explosion as conditions multiply                  | Group related state transitions; consider a state table                  |
| CQRS           | Applied to simple CRUD where it adds no value           | Reserve CQRS for domains with genuinely asymmetric read/write complexity |

---

::: tip
Patterns are tools, not requirements. If the simpler solution is clear and maintainable, use it.
:::
